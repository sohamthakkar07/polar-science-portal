import requests
import json
import os

class OpenRouterClient:
    def __init__(self, model_name: str = None, base_url: str = "https://openrouter.ai/api/v1"):
        # Explicitly configure from OPENROUTER_MODEL, fallback to model_name if provided, otherwise error on generation
        self.model_name = os.getenv("OPENROUTER_MODEL", model_name)
        self.base_url = base_url
        self.api_key = os.getenv("OPENROUTER_API_KEY")

    def generate(self, prompt: str, system_prompt: str = None) -> str:
        if not self.api_key:
            return "Error: OPENROUTER_API_KEY is missing. Please configure it in your environment."
            
        if not self.model_name:
            return "Error: OPENROUTER_MODEL is missing. Please configure it in your environment."

        payload = {
            "model": self.model_name,
            "messages": []
        }
        
        if system_prompt:
            payload["messages"].append({
                "role": "system",
                "content": system_prompt
            })
            
        payload["messages"].append({
            "role": "user",
            "content": prompt
        })
            
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": "https://polarverse.ai", # Optional, but good practice for OpenRouter
            "X-Title": "PolarVerse", # Optional, but good practice for OpenRouter
            "Content-Type": "application/json"
        }
            
        try:
            response = requests.post(f"{self.base_url}/chat/completions", headers=headers, json=payload, timeout=30)
            response.raise_for_status()
            data = response.json()
            
            if "choices" in data and len(data["choices"]) > 0:
                return data["choices"][0]["message"]["content"]
            else:
                return "Error: Received malformed response from OpenRouter."
                
        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code
            if status_code == 401:
                return "Error: Invalid OPENROUTER_API_KEY."
            elif status_code == 400:
                return f"Error: Bad request to OpenRouter ({e.response.text})."
            elif status_code == 403:
                return "Error: Access denied by OpenRouter."
            elif status_code == 429:
                return "Error: OpenRouter rate limit exceeded."
            elif status_code >= 500:
                return f"Error: OpenRouter server error ({status_code})."
            return f"Error: OpenRouter HTTP error: {e}"
        except requests.exceptions.Timeout:
            return "Error: Request to OpenRouter timed out."
        except Exception as e:
            print(f"OpenRouter generation error: {e}")
            return f"Error: Could not connect to OpenRouter ({str(e)})."
