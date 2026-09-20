import requests
import json
import os

class OllamaClient:
    def __init__(self, model_name: str = "llama3.1:8b", base_url: str = "http://localhost:11434"):
        self.model_name = os.getenv("OLLAMA_MODEL", model_name)
        self.base_url = base_url

    def generate(self, prompt: str, system_prompt: str = None) -> str:
        payload = {
            "model": self.model_name,
            "prompt": prompt,
            "stream": False
        }
        if system_prompt:
            payload["system"] = system_prompt
            
        try:
            response = requests.post(f"{self.base_url}/api/generate", json=payload)
            response.raise_for_status()
            data = response.json()
            return data.get("response", "")
        except Exception as e:
            print(f"Ollama generation error: {e}")
            return "Error: Could not connect to local Ollama instance."
