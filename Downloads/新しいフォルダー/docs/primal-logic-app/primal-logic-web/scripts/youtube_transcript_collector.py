"""
YouTube文字起こし自動収集スクリプト
カーニボア系YouTuberの動画から文字起こしを一括取得
"""

import os
import json
from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import socket

# Set default socket timeout to prevent API timeouts
socket.setdefaulttimeout(60)

from dotenv import load_dotenv

# Load .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# ===========================
# 設定: YouTube Data API Key
# ===========================
# YouTube Data API v3のAPIキーを取得してください
# https://console.cloud.google.com/apis/credentials
API_KEY = os.getenv("YOUTUBE_API_KEY")

# ===========================
# 収集対象チャンネル
# ===========================
CHANNELS = {
    "Anthony Chaffee": "@anthonychaffeemd",
    "Shawn Baker": "@ShawnBakerMD",
    "Bart Kay": "@bart-kay",
    "Paul Mason": "@DrPaulMason",
    "Dominic D'Agostino": "@ketonutrition-dom4845",
}

# ===========================
# 出力先ディレクトリ
# ===========================
OUTPUT_DIR = "../src/data/youtube-transcripts"

def get_channel_id(youtube, handle):
    """ハンドル名からチャンネルIDを取得"""
    if not handle:
        return None

    try:
        # @を除去
        handle = handle.replace("@", "")

        # 検索でチャンネルを探す
        request = youtube.search().list(
            part="snippet",
            q=handle,
            type="channel",
            maxResults=1
        )
        
        # Simple retry logic
        for _ in range(3):
            try:
                response = request.execute()
                break
            except Exception as retry_err:
                print(f"Retrying channel search due to: {retry_err}")
                time.sleep(2)
        else:
            print(f"Failed to search channel {handle} after retries.")
            return None

        if response['items']:
            return response['items'][0]['snippet']['channelId']
        return None
    except HttpError as e:
        print(f"Error getting channel ID for {handle}: {e}")
        return None

def get_channel_videos(youtube, channel_id, max_results=50):
    """チャンネルの動画リストを取得"""
    try:
        # チャンネルのアップロードプレイリストを取得
        request = youtube.channels().list(
            part="contentDetails",
            id=channel_id
        )
        response = request.execute()

        if not response['items']:
            return []

        uploads_playlist_id = response['items'][0]['contentDetails']['relatedPlaylists']['uploads']

        # プレイリストから動画を取得
        videos = []
        next_page_token = None

        while len(videos) < max_results:
            request = youtube.playlistItems().list(
                part="snippet",
                playlistId=uploads_playlist_id,
                maxResults=min(50, max_results - len(videos)),
                pageToken=next_page_token
            )
            response = request.execute()

            for item in response['items']:
                video_id = item['snippet']['resourceId']['videoId']
                title = item['snippet']['title']
                published_at = item['snippet']['publishedAt']

                videos.append({
                    'video_id': video_id,
                    'title': title,
                    'published_at': published_at
                })

            next_page_token = response.get('nextPageToken')
            if not next_page_token:
                break

        return videos

    except HttpError as e:
        print(f"Error getting videos: {e}")
        return []

def get_transcript(video_id):
    """動画の文字起こしを取得"""
    try:
        # まず利用可能なトランスクリプトのリストを取得
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        
        # 英語のトランスクリプトを検索 (手動作成 -> 自動生成の順)
        transcript = None
        try:
             transcript = transcript_list.find_transcript(['en', 'en-US', 'en-GB'])
        except:
             # 英語が見つからない場合、自動生成の英語を探す
             try:
                 transcript = transcript_list.find_generated_transcript(['en', 'en-US'])
             except:
                 pass

        if not transcript:
            return {
                'success': False,
                'error': "No English transcript found"
            }

        transcript_data = transcript.fetch()
        
        full_text = " ".join([entry['text'] for entry in transcript_data])

        return {
            'success': True,
            'text': full_text,
            'segments': transcript_data
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def save_transcript(channel_name, video_info, transcript_data):
    """文字起こしをファイルに保存"""
    # チャンネルごとのディレクトリを作成
    channel_dir = os.path.join(OUTPUT_DIR, channel_name.replace(" ", "_"))
    os.makedirs(channel_dir, exist_ok=True)

    # ファイル名を生成（日付-ビデオID）
    date_str = video_info['published_at'][:10]  # YYYY-MM-DD
    filename = f"{date_str}_{video_info['video_id']}.json"
    filepath = os.path.join(channel_dir, filename)

    # JSONとして保存
    data = {
        'video_id': video_info['video_id'],
        'title': video_info['title'],
        'published_at': video_info['published_at'],
        'url': f"https://www.youtube.com/watch?v={video_info['video_id']}",
        'channel': channel_name,
        'transcript': transcript_data['text'],
        'segments': transcript_data['segments'],
        'collected_at': datetime.now().isoformat()
    }

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ Saved: {filename}")

def main():
    """メイン処理"""
    print("=== YouTube文字起こし収集開始 ===\n")

    # APIキーチェック
    if API_KEY == "YOUR_YOUTUBE_API_KEY_HERE":
        print("❌ エラー: APIキーを設定してください")
        print("YouTube Data API v3のAPIキーが必要です")
        print("https://console.cloud.google.com/apis/credentials")
        return

    # YouTube APIクライアントを作成
    youtube = build('youtube', 'v3', developerKey=API_KEY)

    # 出力ディレクトリを作成
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 各チャンネルを処理
    for channel_name, handle in CHANNELS.items():
        if not handle:
            print(f"⚠️  {channel_name}: ハンドル名が未設定")
            continue

        print(f"\n📺 処理中: {channel_name} ({handle})")

        # チャンネルIDを取得
        channel_id = get_channel_id(youtube, handle)
        if not channel_id:
            print(f"❌ チャンネルIDが取得できませんでした")
            continue

        print(f"   チャンネルID: {channel_id}")

        # 動画リストを取得（最新50本）
        videos = get_channel_videos(youtube, channel_id, max_results=50)
        print(f"   動画数: {len(videos)}本")

        # 各動画の文字起こしを取得
        success_count = 0
        for i, video in enumerate(videos):
            print(f"   [{i+1}/{len(videos)}] {video['title'][:50]}...")

            # 文字起こしを取得
            transcript_data = get_transcript(video['video_id'])

            if transcript_data['success']:
                save_transcript(channel_name, video, transcript_data)
                success_count += 1
            else:
                print(f"      ⚠️  文字起こし取得失敗: {transcript_data['error']}")

            # APIレート制限対策（少し待つ）
            time.sleep(0.5)

        print(f"   ✅ {success_count}/{len(videos)}本の文字起こしを保存しました")

    print("\n=== 収集完了 ===")

if __name__ == "__main__":
    main()
