from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import os
from dotenv import load_dotenv

# Navigate up one directory to load the root .env file
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(dotenv_path=env_path)

from rag.pipeline import RAGPipeline

app = FastAPI(title="Polar AI Local RAG Engine")
pipeline = RAGPipeline()

class ChatRequest(BaseModel):
    message: str
    mode: str = "researcher"

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
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
                "sources": [],
                "isUngrounded": True
            })
            
        if not success:
            if error_code == "NO_RELEVANT_INFORMATION":
                return {
                    "success": False,
                    "error": "NO_RELEVANT_INFORMATION",
                    "answer": answer,
                    "sources": [],
                    "isUngrounded": True
                }
            else:
                return {
                    "success": False,
                    "error": error_code or "UNKNOWN_ERROR",
                    "answer": answer,
                    "sources": [],
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
            "answer": answer,
            "sources": formatted_sources,
            "isUngrounded": False
        }
        
        if "chart" in result:
            response_data["chart"] = result["chart"]
            
        return response_data
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3007)
