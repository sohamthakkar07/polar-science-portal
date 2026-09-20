import os
from typing import List, Dict

class TxtLoader:
    def __init__(self, chunker):
        self.chunker = chunker

    def load_document(self, file_path: str, metadata: dict = None) -> List[Dict]:
        if metadata is None:
            metadata = {}
            
        filename = os.path.basename(file_path)
        doc_title = metadata.get("title", filename)
        
        chunks = []
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read()
                
            if not text.strip():
                return chunks
                
            page_chunks = self.chunker.chunk_text(text)
            
            for i, chunk_text in enumerate(page_chunks):
                chunk_id = f"{filename}_c{i}"
                
                # Enrich text with metadata to improve embedding semantic matching
                org = metadata.get("organization", "")
                desc = metadata.get("description", doc_title)
                context_prefix = ""
                if org and desc:
                    context_prefix = f"Context: {org} - {desc}. "
                
                enriched_text = context_prefix + chunk_text
                
                chunks.append({
                    "chunk_id": chunk_id,
                    "document_id": metadata.get("document_id", filename),
                    "document_title": doc_title,
                    "page_number": 1,
                    "content": enriched_text,
                    "source_file": filename,
                    "document_type": "TXT",
                    "metadata": metadata
                })
        except Exception as e:
            print(f"Error loading TXT {file_path}: {e}")
            
        return chunks
