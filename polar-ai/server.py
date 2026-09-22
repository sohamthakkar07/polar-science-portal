from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from dotenv import load_dotenv

# Navigate up one directory to load the root .env file
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(dotenv_path=env_path)

from rag.pipeline import RAGPipeline

app = FastAPI(title="Polar AI Local RAG Engine")

# Configure CORS
frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3005")
# Allow both FRONTEND_ORIGIN and localhost
origins = [frontend_origin, "http://localhost:3005", "http://localhost:3006"]
if frontend_origin not in origins:
    origins.append(frontend_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pipeline = RAGPipeline()

class ChatRequest(BaseModel):
    message: str
    mode: str = "researcher"
    conversationId: str = None

def handle_chat(req: ChatRequest):
    try:
        result = pipeline.answer_query(req.message, top_k=15)
        
        success = result.get("success", True)
        error_code = result.get("error")
        answer = result.get("answer", "")
        
        # Check for LLM unavailable based on the error code or standard client error strings
        if error_code == "LOCAL_LLM_UNAVAILABLE" or "Could not connect to local Ollama" in answer or str(answer).startswith("Error:"):
            from fastapi.responses import JSONResponse
            
            error_msg = answer if str(answer).startswith("Error:") else "PolarVerse AI is currently unavailable because the local Ollama server is not running."
            
            return JSONResponse(status_code=503, content={
                "success": False,
                "error": "LLM_PROVIDER_ERROR",
                "answer": error_msg,
                "mode": req.mode,
                "intent": "explanation",
                "entities": [],
                "sources": [],
                "relatedTopics": [],
                "relatedDatasets": [],
                "relatedPapers": [],
                "relatedStations": [],
                "confidence": "high",
                "isUngrounded": True
            })
            
        if not success:
            return {
                "success": False,
                "error": error_code or "UNKNOWN_ERROR",
                "answer": answer,
                "mode": req.mode,
                "intent": "explanation",
                "entities": [],
                "sources": [],
                "relatedTopics": [],
                "relatedDatasets": [],
                "relatedPapers": [],
                "relatedStations": [],
                "confidence": "high",
                "isUngrounded": True
            }
        
        # Format sources for the frontend
        formatted_sources = []
        for s in result.get("sources", []):
            formatted_sources.append({
                "name": s.get("source_name") or s.get("document_title") or s.get("source_file", "Unknown Source"),
                "org": s.get("organization", "Local Knowledge Base"),
                "url": s.get("source_url", "#"),
                "page": s.get("page_number", "")
            })
            
        response_data = {
            "success": True,
            "error": None,
            "answer": answer,
            "mode": req.mode,
            "intent": "explanation",
            "entities": [],
            "sources": formatted_sources,
            "relatedTopics": [],
            "relatedDatasets": [],
            "relatedPapers": [],
            "relatedStations": [],
            "confidence": "high",
            "isUngrounded": False
        }
        
        if "chart" in result:
            response_data["chart"] = result["chart"]
            
        return response_data
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    return handle_chat(req)

@app.post("/api/v1/polar-ai/chat")
def chat_endpoint_prod(req: ChatRequest):
    return handle_chat(req)

@app.get("/health")
def health():
    # Verify ChromaDB initialization by doing a dummy search or just checking the object
    try:
        col = pipeline.vector_store.collection
        count = col.count()
        return {"status": "ok", "service": "PolarVerse Backend", "chroma_chunks": count}
    except Exception as e:
        return {"status": "ok", "service": "PolarVerse Backend", "chroma_error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3007)
