import sys
import os

try:
    from youtube_transcript_api import YouTubeTranscriptApi
    print(f"Import success: {YouTubeTranscriptApi}")
    print(f"Attributes: {dir(YouTubeTranscriptApi)}")
except Exception as e:
    print(f"Import failed: {e}")

try:
    print("Attempting to fetch transcript for video ID: dQw4w9WgXcQ (Rick Roll)")
    transcript = YouTubeTranscriptApi.get_transcript("dQw4w9WgXcQ")
    print("Success! Transcript length:", len(transcript))
except Exception as e:
    print(f"Fetch failed: {e}")
