# PolarVerse AI (Local RAG Pipeline)

This directory contains the 100% local Python RAG (Retrieval-Augmented Generation) backend for the PolarVerse project. It is designed to ingest local scientific datasets and documents, and answer questions using local open-source LLMs via Ollama, ensuring complete data privacy and zero external API costs.

## Prerequisites

1. **Python 3.10+**
2. **Ollama**: Installed and running on the host machine. [Download Ollama](https://ollama.com)
3. Pull the required model:
   ```bash
   ollama run llama3.1:8b
   ```

## Setup Instructions

### 1. Install Dependencies
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Add Knowledge
Drop your documents into the respective folders:
- **PDFs**: Place inside `knowledge/documents/`
- **CSV/Excel**: Place inside `knowledge/datasets/`

### 3. Ingest Data
Run the ingestion script to parse the files, chunk them, embed them, and store them in the local ChromaDB vector database.
```bash
python ingest.py
```

### 4. Start the Server
Start the FastAPI server (runs on port 3007 by default):
```bash
python server.py
```
The main Express backend (`polar-science-portal-main/server`) automatically proxies AI requests to this port.

## Deployment Notes (SIH 2026)

If you are deploying this project for a hackathon presentation, you have a few options:

1. **Local Demonstration (Recommended for Hackathons)**
   Run the entire stack (Node.js backend, React frontend, Python FastAPI, and Ollama) on your laptop. You won't have to worry about cloud infrastructure limits or internet connection issues during your pitch.
   
2. **Cloud Virtual Machine (VPS)**
   Deploy to a cloud provider like AWS (EC2), Google Cloud, or DigitalOcean. You will need a VM with at least 8GB-16GB of RAM to run Ollama and the LLM comfortably in the background.

3. **Hybrid (Cloud Frontend + Local AI)**
   You can deploy the React frontend to Vercel or GitHub Pages, but use a tool like `ngrok` to expose your local Python FastAPI/Ollama port to the internet. The frontend would then make requests to your ngrok URL.
