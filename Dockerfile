FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY polar-ai/requirements.txt /app/polar-ai/
RUN pip install --no-cache-dir -r /app/polar-ai/requirements.txt

COPY polar-ai/ /app/polar-ai/

WORKDIR /app/polar-ai
RUN python ingest.py

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT}"]
