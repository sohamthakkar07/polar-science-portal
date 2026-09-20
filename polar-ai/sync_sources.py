import json
import os
import requests
from bs4 import BeautifulSoup
import subprocess

CONFIG_FILE = "config/sources.json"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def clean_html_to_text(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    # Remove script, style, nav, footer, header elements
    for element in soup(["script", "style", "nav", "footer", "header", "aside"]):
        element.decompose()
        
    # Remove NCPOR specific boilerplate divs
    for element in soup.find_all('div', class_=['topNav', 'footer', 'header', 'breadCrumb', 'bottom-link', 'rightPannel', 'noScript', 'topStripe', 'topborder', 'header', 'siteDescription', 'news']):
        element.decompose()
    for element in soup.find_all('div', id=['top', 'footer', 'header']):
        element.decompose()
        
    return soup.get_text(separator="\n", strip=True)

def sync_sources():
    config_path = os.path.join(BASE_DIR, CONFIG_FILE)
    if not os.path.exists(config_path):
        print(f"Error: Config file not found at {config_path}")
        return

    with open(config_path, "r") as f:
        sources = json.load(f)

    downloaded = 0
    skipped = 0
    failed = 0

    for source in sources:
        if not source.get("enabled", False):
            continue

        url = source["url"]
        dest = os.path.join(BASE_DIR, source["destination"])
        os.makedirs(os.path.dirname(dest), exist_ok=True)

        print(f"Syncing {source['name']} from {url}...")
        try:
            headers = {"User-Agent": "PolarVerse/1.0"}
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            content_to_save = None
            if source["type"] == "html":
                content_to_save = clean_html_to_text(response.text).encode('utf-8')
            else:
                content_to_save = response.content

            # Skip if unchanged (simple size check or content check)
            if os.path.exists(dest):
                with open(dest, "rb") as f:
                    existing_content = f.read()
                if existing_content == content_to_save:
                    print(f"  Skipped (no changes): {dest}")
                    skipped += 1
                    continue
            
            with open(dest, "wb") as f:
                f.write(content_to_save)
            print(f"  Downloaded: {dest}")
            downloaded += 1

        except Exception as e:
            print(f"  Failed: {e}")
            failed += 1

    print("\n--- Sync Summary ---")
    print(f"Downloaded: {downloaded}")
    print(f"Skipped: {skipped}")
    print(f"Failed: {failed}")

    print("\nStarting ingestion process...")
    # Run the existing ingest pipeline
    subprocess.run(["python", os.path.join(BASE_DIR, "ingest.py")], check=True)

if __name__ == "__main__":
    sync_sources()
