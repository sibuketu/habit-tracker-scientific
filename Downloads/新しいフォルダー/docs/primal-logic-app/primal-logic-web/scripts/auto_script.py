import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

# Setup
# Correct path to .env relative to this script
# this script is in docs/primal-logic-app/primal-logic-web/scripts
# .env is in docs/primal-logic-app/primal-logic-web
script_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(script_dir, '../.env')
load_dotenv(env_path)

genai.configure(api_key=os.getenv("VITE_GEMINI_API_KEY"))

# Configuration
MODEL_NAME = "gemini-pro"

def generate_script(topic):
    """
    NEO Persona script generator based on VIDEO_STRATEGY_FINAL.md
    """
    prompt = f"""
    You are a professional scriptwriter for the "CarnivOS" channel (NEO Persona).
    Create a Short Video Script (30-60s) about: {topic}

    Target Audience: High Income, Rational, Bio-hackers.
    Tone: Direct, Data-driven, "My body is an asset".

    Structure (JSON output only):
    {{
        "title": "Catchy Title",
        "hook": "0-3s attention grabber",
        "body": "Main argument with logic/data",
        "cta": "Call to action (Check description)"
    }}
    """
    
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
        script_data = json.loads(response.text)
        
        # Save to file for easy copy-paste
        output_file = os.path.join(os.path.dirname(__file__), "generated_script.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(script_data, f, ensure_ascii=False, indent=2)
            
        print(f"Script saved to: {output_file}")
        return script_data
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # Test Run
    test_topic = "Oxalates are causing your brain fog"
    print(f"Generating script for: {test_topic}...")
    script = generate_script(test_topic)
    print(json.dumps(script, indent=2, ensure_ascii=False))
