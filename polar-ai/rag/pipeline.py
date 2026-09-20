from typing import List, Dict
from llm.ollama_client import OllamaClient
from llm.prompts import SYSTEM_PROMPT
from retrieval.vector_store import VectorStore
from retrieval.embeddings import Embedder
from analysis.dataset_profiler import DatasetProfiler

class RAGPipeline:
    def __init__(self):
        self.ollama = OllamaClient()
        self.embedder = Embedder()
        self.vector_store = VectorStore()
        self.profiler = DatasetProfiler(self.vector_store)

    def answer_query(self, query: str, top_k: int = 5) -> Dict:
        # 1. Embed query
        query_emb = self.embedder.embed_query(query)
        
        # 2. Retrieve top-k chunks
        search_results = self.vector_store.search(query_emb, top_k=top_k)
        
        DISTANCE_THRESHOLD = 1.2
        
        chunks = []
        if search_results and search_results.get("documents") and len(search_results["documents"]) > 0:
            docs = search_results["documents"][0]
            metas = search_results["metadatas"][0]
            distances = search_results.get("distances", [[0]*len(docs)])[0]
            
            for doc, meta, dist in zip(docs, metas, distances):
                if dist <= DISTANCE_THRESHOLD:
                    print(f"[RAG Logger] Query: '{query}' | ACCEPTED Chunk '{meta.get('document_title', 'Unknown')}' | Distance: {dist:.4f} <= {DISTANCE_THRESHOLD}")
                    chunks.append({
                        "content": doc,
                        **meta
                    })
                else:
                    print(f"[RAG Logger] Query: '{query}' | REJECTED Chunk '{meta.get('document_title', 'Unknown')}' | Distance: {dist:.4f} > {DISTANCE_THRESHOLD}")
                    
        if not chunks:
            print("[RAG Logger] No chunks passed the relevance threshold. Skipping Ollama.")
            return {
                "success": False,
                "error": "NO_RELEVANT_INFORMATION",
                "answer": "I couldn't find this information in the PolarVerse knowledge base.",
                "sources": []
            }
                
        # 3. Check for dataset computational answers
        computed_answer = self.profiler.try_answer_computationally(query, chunks)
        if computed_answer:
            # We skip the LLM entirely or ask the LLM to explain the computed answer
            prompt = f"The user asked: {query}\nThe dataset profiler computed this exact result:\n{computed_answer}\nExplain this result briefly to the user."
            response = self.ollama.generate(prompt, system_prompt=SYSTEM_PROMPT)
            return {
                "answer": response,
                "sources": chunks,
                "is_computed": True
            }
            
        # 4. Standard RAG formulation
        context_str = ""
        for i, c in enumerate(chunks):
            context_str += f"--- SOURCE {i+1} ---\n"
            context_str += f"Title: {c.get('document_title', 'Unknown')}\n"
            context_str += f"File: {c.get('source_file', 'Unknown')}\n"
            if c.get("page_number"):
                context_str += f"Page: {c.get('page_number')}\n"
            context_str += f"Content: {c.get('content', '')}\n\n"
            
        final_prompt = f"Context Information:\n{context_str}\nUser Question: {query}\nProvide a grounded answer citing the sources."
        
        # 5. Generate with Ollama
        response = self.ollama.generate(final_prompt, system_prompt=SYSTEM_PROMPT)
        
        # 6. Check for Visualization
        chart_data = self.profiler.try_generate_chart(query, chunks)
        
        result = {
            "answer": response,
            "sources": chunks,
            "is_computed": False
        }
        
        if chart_data:
            result["chart"] = chart_data
            
        return result
