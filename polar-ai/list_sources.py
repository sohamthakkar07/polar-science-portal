import chromadb

client = chromadb.PersistentClient(path="./polar-ai/database")
collection = client.get_collection("polar_knowledge")

docs = collection.get()
sources = set()
for meta in docs['metadatas']:
    if meta and 'source_file' in meta:
        sources.add(meta['source_file'])

print("Current sources in DB:")
for s in sorted(list(sources)):
    print(s)
