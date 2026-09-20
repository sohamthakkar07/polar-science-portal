import re
from typing import List

class SemanticChunker:
    def __init__(self, max_chunk_size=400, overlap_size=50):
        self.max_chunk_size = max_chunk_size
        self.overlap_size = overlap_size

    def chunk_text(self, text: str) -> List[str]:
        # Basic semantic chunking: split by paragraphs, then sentences if needed.
        paragraphs = re.split(r'\n\s*\n', text.strip())
        chunks = []
        current_chunk = ""

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue
            
            # If a single paragraph is larger than max chunk size, split by sentences
            if len(para) > self.max_chunk_size:
                sentences = re.split(r'(?<=\.)\s+', para)
                for sentence in sentences:
                    if len(current_chunk) + len(sentence) > self.max_chunk_size and current_chunk:
                        chunks.append(current_chunk.strip())
                        # Keep some overlap
                        overlap_start = max(0, len(current_chunk) - self.overlap_size)
                        current_chunk = current_chunk[overlap_start:] + " " + sentence
                    else:
                        current_chunk += " " + sentence
            else:
                if len(current_chunk) + len(para) > self.max_chunk_size and current_chunk:
                    chunks.append(current_chunk.strip())
                    # Overlap
                    overlap_start = max(0, len(current_chunk) - self.overlap_size)
                    # We approximate overlap by taking the end of the previous chunk
                    overlap_text = current_chunk[overlap_start:]
                    current_chunk = overlap_text + "\n\n" + para
                else:
                    if current_chunk:
                        current_chunk += "\n\n" + para
                    else:
                        current_chunk = para
                        
        if current_chunk:
            chunks.append(current_chunk.strip())
            
        return chunks
