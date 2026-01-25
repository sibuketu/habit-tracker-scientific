#!/bin/bash
# Cloud Shellで一気にファイルを作成するスクリプト

# ディレクトリを作成
mkdir -p scripts

# Dockerfileを作成
cat > Dockerfile << 'EOF'
# FFmpeg実行環境（Cloud Run用）
FROM python:3.11-slim

# FFmpegをインストール
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Flaskをインストール
RUN pip install flask flask-cors

# 作業ディレクトリを設定
WORKDIR /app

# Pythonスクリプトをコピー
COPY scripts/cloud-run-api-server.py /app/app.py

# ポートを公開
EXPOSE 8080

# エントリーポイント
CMD ["python3", "/app/app.py"]
EOF

# cloud-run-api-server.pyを作成
cat > scripts/cloud-run-api-server.py << 'ENDOFFILE'
#!/usr/bin/env python3
"""
Cloud Run用APIサーバー（FFmpeg実行）
HTTPリクエストを受け取り、動画を生成して返す
"""

import os
import sys
import json
import subprocess
import tempfile
from pathlib import Path
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def check_ffmpeg():
    """FFmpegがインストールされているか確認"""
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def create_video_with_images(
    audio_path: str,
    images: list,
    output_path: str,
    subtitles: list = None,
    width: int = 1080,
    height: int = 1920,
    fps: int = 30
):
    """音声 + 画像を自動合成して動画を生成"""
    if not check_ffmpeg():
        raise RuntimeError("FFmpegがインストールされていません")
    
    # 画像を動画に変換（各画像を指定時間表示）
    filter_complex_parts = []
    inputs = []
    
    for i, img_info in enumerate(images):
        img_path = img_info['path']
        start_time = img_info.get('start', 0)
        img_duration = img_info.get('duration', 3)
        
        # 画像を解像度にリサイズ
        filter_complex_parts.append(
            f"[{i}:v]scale={width}:{height}:force_original_aspect_ratio=decrease,"
            f"pad={width}:{height}:(ow-iw)/2:(oh-ih)/2,"
            f"setpts=PTS-STARTPTS,"
            f"fps={fps}[v{i}]"
        )
        inputs.extend(['-loop', '1', '-t', str(img_duration), '-i', img_path])
    
    # 画像を時系列で結合
    if len(images) > 1:
        concat_parts = []
        for i in range(len(images)):
            concat_parts.append(f"[v{i}]")
        filter_complex_parts.append(f"{''.join(concat_parts)}concat=n={len(images)}:v=1:a=0[outv]")
    else:
        filter_complex_parts.append("[v0]copy[outv]")
    
    # 音声を追加
    inputs.extend(['-i', audio_path])
    
    # 字幕を追加（指定されている場合）
    if subtitles:
        srt_path = output_path.replace('.mp4', '.srt')
        with open(srt_path, 'w', encoding='utf-8') as f:
            for i, sub in enumerate(subtitles, 1):
                start = sub['start']
                duration = sub.get('duration', 3)
                end = start + duration
                text = sub['text']
                
                start_str = format_time(start)
                end_str = format_time(end)
                
                f.write(f"{i}\n")
                f.write(f"{start_str} --> {end_str}\n")
                f.write(f"{text}\n\n")
        
        # 字幕を動画に焼き込む
        filter_complex_parts.append(
            f"[outv]subtitles={srt_path}:force_style='FontName=Arial,FontSize=24,PrimaryColour=&Hffffff,OutlineColour=&H000000,Outline=2'[outv_sub]"
        )
        filter_complex_parts.append("[outv_sub][{}:a]concat=n=1:v=1:a=1[out]".format(len(images)))
    else:
        filter_complex_parts.append("[outv][{}:a]concat=n=1:v=1:a=1[out]".format(len(images)))
    
    filter_complex = ";".join(filter_complex_parts)
    
    # FFmpegコマンドを実行
    cmd = [
        'ffmpeg',
        '-y',
        *inputs,
        '-filter_complex', filter_complex,
        '-map', '[out]',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_path
    ]
    
    subprocess.run(cmd, check=True)
    
    if subtitles:
        os.remove(srt_path)

def format_time(seconds: float) -> str:
    """秒数をSRT形式の時間文字列に変換"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

@app.route('/health', methods=['GET'])
def health():
    """ヘルスチェック"""
    return jsonify({'status': 'ok', 'ffmpeg': check_ffmpeg()})

@app.route('/generate', methods=['POST'])
def generate_video():
    """動画生成エンドポイント"""
    try:
        data = request.json
        
        # バリデーション
        if not data.get('audio') and not data.get('audioUrl'):
            return jsonify({'error': 'audio or audioUrl is required'}), 400
        
        if not data.get('images') or len(data['images']) == 0:
            return jsonify({'error': 'images is required'}), 400
        
        # 一時ディレクトリを作成
        with tempfile.TemporaryDirectory() as temp_dir:
            # 音声ファイルをダウンロード
            audio_path = os.path.join(temp_dir, 'audio.mp3')
            if data.get('audio'):
                # Base64デコード
                import base64
                audio_bytes = base64.b64decode(data['audio'])
                with open(audio_path, 'wb') as f:
                    f.write(audio_bytes)
            else:
                # URLからダウンロード
                import urllib.request
                urllib.request.urlretrieve(data['audioUrl'], audio_path)
            
            # 画像をダウンロード
            for img_info in data['images']:
                img_url = img_info['path']
                img_filename = os.path.basename(img_url)
                img_path = os.path.join(temp_dir, img_filename)
                import urllib.request
                urllib.request.urlretrieve(img_url, img_path)
                img_info['path'] = img_path
            
            # 動画を生成
            output_path = os.path.join(temp_dir, 'output.mp4')
            create_video_with_images(
                audio_path=audio_path,
                images=data['images'],
                output_path=output_path,
                subtitles=data.get('subtitles'),
                width=data.get('width', 1080),
                height=data.get('height', 1920),
                fps=data.get('fps', 30)
            )
            
            # 動画を返す
            return send_file(
                output_path,
                mimetype='video/mp4',
                as_attachment=True,
                download_name='video.mp4'
            )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
ENDOFFILE

# auto_video_editor.pyを作成
cat > scripts/auto_video_editor.py << 'ENDOFFILE2'
#!/usr/bin/env python3
"""
自動動画編集スクリプト（FFmpeg使用）
音声 + 実際の文書画像を自動合成して動画を生成
"""

import os
import sys
import json
import subprocess
from pathlib import Path
from typing import Dict, List, Optional
import argparse

def check_ffmpeg():
    """FFmpegがインストールされているか確認"""
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ FFmpegがインストールされていません。")
        print("インストール方法: https://ffmpeg.org/download.html")
        return False

def create_video_with_images(
    audio_path: str,
    images: List[Dict[str, any]],
    output_path: str,
    duration: Optional[float] = None,
    fps: int = 30,
    resolution: tuple = (1080, 1920)  # 縦型（9:16）
):
    """
    音声 + 画像を自動合成して動画を生成
    
    Args:
        audio_path: 音声ファイルのパス（MP3）
        images: 画像情報のリスト [{"path": "...", "start": 0, "duration": 5}, ...]
        output_path: 出力動画のパス
        duration: 動画の総時間（秒）。Noneの場合は音声の長さを使用
        fps: フレームレート
        resolution: 解像度 (width, height)
    """
    if not check_ffmpeg():
        sys.exit(1)
    
    # 音声の長さを取得
    if duration is None:
        result = subprocess.run(
            ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', audio_path],
            capture_output=True,
            text=True
        )
        duration = float(result.stdout.strip())
    
    # 画像を動画に変換（各画像を指定時間表示）
    filter_complex_parts = []
    inputs = []
    
    for i, img_info in enumerate(images):
        img_path = img_info['path']
        start_time = img_info.get('start', 0)
        img_duration = img_info.get('duration', 3)  # デフォルト3秒
        
        # 画像を解像度にリサイズ
        filter_complex_parts.append(
            f"[{i}:v]scale={resolution[0]}:{resolution[1]}:force_original_aspect_ratio=decrease,"
            f"pad={resolution[0]}:{resolution[1]}:(ow-iw)/2:(oh-ih)/2,"
            f"setpts=PTS-STARTPTS,"
            f"fps={fps}[v{i}]"
        )
        inputs.extend(['-loop', '1', '-t', str(img_duration), '-i', img_path])
    
    # 画像を時系列で結合
    if len(images) > 1:
        concat_parts = []
        for i in range(len(images)):
            concat_parts.append(f"[v{i}]")
        filter_complex_parts.append(f"{''.join(concat_parts)}concat=n={len(images)}:v=1:a=0[outv]")
    else:
        filter_complex_parts.append("[v0]copy[outv]")
    
    # 音声を追加
    inputs.extend(['-i', audio_path])
    
    # 音声と動画を結合
    filter_complex_parts.append("[outv][{}:a]concat=n=1:v=1:a=1[out]".format(len(images)))
    
    filter_complex = ";".join(filter_complex_parts)
    
    # FFmpegコマンドを実行
    cmd = [
        'ffmpeg',
        '-y',  # 上書き
        *inputs,
        '-filter_complex', filter_complex,
        '-map', '[out]',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_path
    ]
    
    print(f"🎬 動画生成中: {output_path}")
    print(f"📊 コマンド: {' '.join(cmd)}")
    
    try:
        subprocess.run(cmd, check=True)
        print(f"✅ 動画生成完了: {output_path}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 動画生成失敗: {e}")
        return False

def add_subtitles(
    video_path: str,
    subtitles: List[Dict[str, any]],
    output_path: str
):
    """
    動画に字幕を追加
    
    Args:
        video_path: 入力動画のパス
        subtitles: 字幕情報のリスト [{"text": "...", "start": 0, "duration": 3}, ...]
        output_path: 出力動画のパス
    """
    if not check_ffmpeg():
        sys.exit(1)
    
    # SRTファイルを作成
    srt_path = output_path.replace('.mp4', '.srt')
    with open(srt_path, 'w', encoding='utf-8') as f:
        for i, sub in enumerate(subtitles, 1):
            start = sub['start']
            duration = sub.get('duration', 3)
            end = start + duration
            text = sub['text']
            
            # 時間フォーマット: HH:MM:SS,mmm
            start_str = format_time(start)
            end_str = format_time(end)
            
            f.write(f"{i}\n")
            f.write(f"{start_str} --> {end_str}\n")
            f.write(f"{text}\n\n")
    
    # 字幕を動画に焼き込む
    cmd = [
        'ffmpeg',
        '-y',
        '-i', video_path,
        '-vf', f"subtitles={srt_path}:force_style='FontName=Arial,FontSize=24,PrimaryColour=&Hffffff,OutlineColour=&H000000,Outline=2'",
        '-c:a', 'copy',
        output_path
    ]
    
    print(f"📝 字幕追加中: {output_path}")
    
    try:
        subprocess.run(cmd, check=True)
        os.remove(srt_path)  # 一時ファイルを削除
        print(f"✅ 字幕追加完了: {output_path}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 字幕追加失敗: {e}")
        return False

def format_time(seconds: float) -> str:
    """秒数をSRT形式の時間文字列に変換"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

def main():
    parser = argparse.ArgumentParser(description='自動動画編集スクリプト')
    parser.add_argument('--audio', required=True, help='音声ファイルのパス（MP3）')
    parser.add_argument('--images', required=True, help='画像情報のJSONファイル')
    parser.add_argument('--subtitles', help='字幕情報のJSONファイル（オプション）')
    parser.add_argument('--output', required=True, help='出力動画のパス')
    parser.add_argument('--duration', type=float, help='動画の総時間（秒）')
    parser.add_argument('--fps', type=int, default=30, help='フレームレート（デフォルト: 30）')
    parser.add_argument('--width', type=int, default=1080, help='動画の幅（デフォルト: 1080）')
    parser.add_argument('--height', type=int, default=1920, help='動画の高さ（デフォルト: 1920）')
    
    args = parser.parse_args()
    
    # 画像情報を読み込む
    with open(args.images, 'r', encoding='utf-8') as f:
        images = json.load(f)
    
    # 動画を生成
    success = create_video_with_images(
        args.audio,
        images,
        args.output,
        args.duration,
        args.fps,
        (args.width, args.height)
    )
    
    if not success:
        sys.exit(1)
    
    # 字幕を追加（指定されている場合）
    if args.subtitles:
        with open(args.subtitles, 'r', encoding='utf-8') as f:
            subtitles = json.load(f)
        
        temp_output = args.output.replace('.mp4', '_temp.mp4')
        os.rename(args.output, temp_output)
        
        add_subtitles(temp_output, subtitles, args.output)
        os.remove(temp_output)  # 一時ファイルを削除
    
    print(f"🎉 完了: {args.output}")

if __name__ == '__main__':
    main()
ENDOFFILE2

echo "✅ ファイル作成完了"
ls -la
ls -la scripts/
