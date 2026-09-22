import os
import json
from dotenv import load_dotenv

env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(dotenv_path=env_path)

from rag.pipeline import RAGPipeline

def run_tests(provider):
    os.environ["LLM_PROVIDER"] = provider
    pipeline = RAGPipeline()
    print(f"--- TESTING {provider.upper()} ---")

    print("\n1. Maitri/Bharati/Himadri comparison")
    res1 = pipeline.answer_query("How are Maitri, Bharati and Himadri different?")
    print("Answer snippet:", res1.get("answer", "")[:100], "...")
    print("Grounded?", not res1.get("isUngrounded", False))

    print("\n2. Sea ice chart")
    res2 = pipeline.answer_query("Show Antarctic sea ice extent over time")
    print("Chart generated?", "chart" in res2)

    print("\n3. Population of Japan")
    res3 = pipeline.answer_query("What is the population of Japan?")
    print("Rejected?", res3.get("error") == "NO_RELEVANT_INFORMATION")

run_tests("ollama")
