import os
import time
from dotenv import load_dotenv
from google import genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

def ask_llm(prompt: str, retries: int = 3, delay: int = 10) -> str:
    for attempt in range(retries):
        try:
            response = client.models.generate_content(
                model="gemini-3-flash-preview",
                contents=prompt
            )
            return response.text
        except Exception as e:
            if attempt < retries - 1:
                print(f"      Gemini busy. Retrying in {delay}s... (attempt {attempt + 1}/{retries})")
                time.sleep(delay)
            else:
                raise e