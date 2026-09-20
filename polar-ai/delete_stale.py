import chromadb

client = chromadb.PersistentClient(path="./polar-ai/database")
collection = client.get_collection("polar_knowledge")

files_to_delete = [
    "nsidc_sea_ice_index.txt",
    "comnap_antarctic_facilities.txt",
    "ncpor_maitri_station.txt",
    "nsidc_cryosphere_glossary.txt"
]

print(f"Total documents before deletion: {collection.count()}")

for f in files_to_delete:
    collection.delete(where={"source_file": f})
    print(f"Deleted chunks for {f}")

print(f"Total documents after deletion: {collection.count()}")
