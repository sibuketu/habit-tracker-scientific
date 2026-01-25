import sys
import pkg_resources
from youtube_transcript_api import YouTubeTranscriptApi

print(f"Python Executable: {sys.executable}")
print(f"Python Version: {sys.version}")

try:
    dist = pkg_resources.get_distribution("youtube-transcript-api")
    print(f"Installed youtube-transcript-api version: {dist.version}")
    print(f"Location: {dist.location}")
except Exception as e:
    print(f"Could not determine version: {e}")

print(f"\nYouTubeTranscriptApi attributes: {dir(YouTubeTranscriptApi)}")

try:
    print("\nTesting get_transcript for a known video (dQw4w9WgXcQ)...")
    tx = YouTubeTranscriptApi.get_transcript("dQw4w9WgXcQ", languages=['en'])
    print("Success!")
except Exception as e:
    print(f"Failure: {e}")
