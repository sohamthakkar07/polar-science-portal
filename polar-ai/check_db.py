import chromadb

c1 = chromadb.PersistentClient(path="./database")
print("DB1 (./database) count:", c1.get_collection("polar_knowledge").count() if "polar_knowledge" in [c.name for c in c1.list_collections()] else "No collection")

c2 = chromadb.PersistentClient(path="./polar-ai/database")
print("DB2 (./polar-ai/database) count:", c2.get_collection("polar_knowledge").count() if "polar_knowledge" in [c.name for c in c2.list_collections()] else "No collection")
