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
