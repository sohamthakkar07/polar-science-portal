import chromadb
from chromadb.config import Settings
import os

class VectorStore:
    def __init__(self, db_path: str = "./polar-ai/database"):
        os.makedirs(db_path, exist_ok=True)
        self.client = chromadb.PersistentClient(path=db_path)
        self.collection = self.client.get_or_create_collection(name="polar_knowledge")

    def add_chunks(self, chunks: list, embeddings: list):
        if not chunks:
            return
            
        ids = [c["chunk_id"] for c in chunks]
        documents = [c["content"] for c in chunks]
        metadatas = []
        for c in chunks:
            # ChromaDB metadata must be string, int, float, or bool
            meta = {
                "document_id": str(c.get("document_id", "")),
                "document_title": str(c.get("document_title", "")),
                "page_number": int(c.get("page_number", 1)),
                "source_file": str(c.get("source_file", "")),
                "document_type": str(c.get("document_type", ""))
            }
            
            # Preserve extra metadata from loaders
            extra_meta = c.get("metadata", {})
            if "organization" in extra_meta:
                meta["organization"] = str(extra_meta["organization"])
            if "source_url" in extra_meta:
                meta["source_url"] = str(extra_meta["source_url"])
            if "source_name" in extra_meta:
                meta["source_name"] = str(extra_meta["source_name"])
            if "download_date" in extra_meta:
                meta["download_date"] = str(extra_meta["download_date"])
                
            metadatas.append(meta)
            
        self.collection.upsert(
            ids=ids,
            embeddings=embeddings,
            documents=documents,
            metadatas=metadatas
        )

    def search(self, query_embedding: list, top_k: int = 5):
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        return results
