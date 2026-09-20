import fitz  # PyMuPDF
import os
from typing import List, Dict

class PDFLoader:
    def __init__(self, chunker):
        self.chunker = chunker

    def extract_document(self, file_path: str, metadata: dict = None) -> List[Dict]:
        if metadata is None:
            metadata = {}
        
        filename = os.path.basename(file_path)
        doc_title = metadata.get("title", filename)
        
        doc = fitz.open(file_path)
        chunks = []
        
        # We iterate over pages to preserve page numbers
        for page_num in range(len(doc)):
            page = doc[page_num]
            text = page.get_text("text")
            
            if not text.strip():
                # Detect scanned page
                text = "[SCANNED PAGE OR NO TEXT DETECTED]"
                
            page_chunks = self.chunker.chunk_text(text)
            
            for i, chunk_text in enumerate(page_chunks):
                chunk_id = f"{filename}_p{page_num+1}_c{i}"
                chunks.append({
                    "chunk_id": chunk_id,
                    "document_id": metadata.get("document_id", filename),
                    "document_title": doc_title,
                    "page_number": page_num + 1,
                    "content": chunk_text,
                    "source_file": filename,
                    "document_type": "PDF",
                    "metadata": metadata
                })
                
        doc.close()
        return chunks
