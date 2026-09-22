import os
import glob
from ingestion.chunker import SemanticChunker
from ingestion.pdf_loader import PDFLoader
from ingestion.txt_loader import TxtLoader
from ingestion.dataset_loader import DatasetLoader
from retrieval.embeddings import Embedder
from retrieval.vector_store import VectorStore

def ingest_all():
    print("Initializing components...")
    chunker = SemanticChunker()
    pdf_loader = PDFLoader(chunker)
    txt_loader = TxtLoader(chunker)
    dataset_loader = DatasetLoader()
    embedder = Embedder()
    vector_store = VectorStore()
    
    # Fast idempotency check
    if vector_store.collection.count() > 0:
        print(f"ChromaDB already has {vector_store.collection.count()} chunks. Skipping full ingestion to save boot time.")
        return

    
    docs_dir = "./knowledge/documents"
    datasets_dir = "./knowledge/datasets"
    
    os.makedirs(docs_dir, exist_ok=True)
    os.makedirs(datasets_dir, exist_ok=True)
    
    import json
    sources_meta = {}
    try:
        with open("./config/sources.json", "r") as f:
            sources = json.load(f)
            for s in sources:
                filename = os.path.basename(s["destination"])
                sources_meta[filename] = {
                    "organization": s.get("organization", ""),
                    "source_url": s.get("url", ""),
                    "source_name": s.get("name", ""),
                    "resource_type": s.get("type", ""),
                    "description": s.get("description", ""),
                    "title": s.get("title", s.get("name", ""))
                }
    except Exception as e:
        print(f"Warning: could not load sources.json metadata: {e}")
    
    all_chunks = []
    
    # Process PDFs
    print("Processing PDFs...")
    pdf_files = glob.glob(os.path.join(docs_dir, "*.pdf"))
    for f in pdf_files:
        print(f"  Loading {os.path.basename(f)}")
        meta = sources_meta.get(os.path.basename(f), {})
        chunks = pdf_loader.extract_document(f, metadata=meta)
        all_chunks.extend(chunks)
        
    # Process TXTs
    print("Processing TXTs...")
    txt_files = glob.glob(os.path.join(docs_dir, "*.txt"))
    for f in txt_files:
        print(f"  Loading {os.path.basename(f)}")
        meta = sources_meta.get(os.path.basename(f), {})
        chunks = txt_loader.load_document(f, metadata=meta)
        all_chunks.extend(chunks)
        
    # Process Datasets
    print("Processing Datasets...")
    dataset_files = glob.glob(os.path.join(datasets_dir, "*.csv")) + glob.glob(os.path.join(datasets_dir, "*.xlsx"))
    for f in dataset_files:
        print(f"  Loading {os.path.basename(f)}")
        meta = sources_meta.get(os.path.basename(f), {})
        chunks = dataset_loader.load_dataset(f, metadata=meta)
        all_chunks.extend(chunks)
        
    if not all_chunks:
        print("No documents or datasets found in polar-ai/knowledge/ directories.")
        return
        
    print(f"Generated {len(all_chunks)} total chunks. Embedding...")
    
    # We embed in batches to avoid OOM
    texts = [c["content"] for c in all_chunks]
    batch_size = 32
    embeddings = []
    
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        emb_batch = embedder.embed_texts(batch)
        embeddings.extend(emb_batch)
        print(f"  Embedded {len(embeddings)}/{len(texts)} chunks")
        
    print("Storing in ChromaDB...")
    vector_store.add_chunks(all_chunks, embeddings)
    
    print("Ingestion complete!")

if __name__ == "__main__":
    ingest_all()
