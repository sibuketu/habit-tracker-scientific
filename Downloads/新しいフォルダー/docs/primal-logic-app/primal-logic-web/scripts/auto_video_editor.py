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
