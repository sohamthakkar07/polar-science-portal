from rag.pipeline import RAGPipeline

query = "What are the major Indian polar research facilities?"
pipeline = RAGPipeline()
query_emb = pipeline.embedder.embed_query(query)
search_results = pipeline.vector_store.search(query_emb, top_k=10)

print(f"DIAGNOSIS FOR QUERY: {query}\n")

if search_results and search_results.get("documents") and len(search_results["documents"]) > 0:
    docs = search_results["documents"][0]
    metas = search_results["metadatas"][0]
    distances = search_results.get("distances", [[0]*len(docs)])[0]
    
    for i, (doc, meta, dist) in enumerate(zip(docs, metas, distances)):
        passed = "PASS" if dist <= 1.2 else "FAIL"
        print(f"Rank {i+1}:")
        print(f"  Source File: {meta.get('source_file')}")
        print(f"  Distance:    {dist:.4f} ({passed})")
