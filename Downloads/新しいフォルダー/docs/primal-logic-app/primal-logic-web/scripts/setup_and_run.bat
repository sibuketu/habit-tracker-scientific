@echo off
echo ========================================
echo YouTube文字起こし収集セットアップ
echo ========================================
echo.

REM Pythonがインストールされているか確認
python --version >nul 2>&1
if errorlevel 1 (
    echo [エラー] Pythonがインストールされていません
    echo Python 3.7以上をインストールしてください
    echo https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [1/3] 必要なライブラリをインストール中...
pip install -r scripts/requirements.txt

echo.
echo [2/3] 出力ディレクトリを作成中...
if not exist "..\src\data\youtube-transcripts" mkdir "..\src\data\youtube-transcripts"

echo.
echo [3/3] スクリプトを実行中...
echo.
python scripts/youtube_transcript_collector.py

echo.
echo ========================================
echo 完了
echo ========================================
pause
