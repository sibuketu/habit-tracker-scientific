#!/bin/bash
# Cloud RunにFFmpeg実行環境をデプロイ

# 環境変数を確認
if [ -z "$GCP_PROJECT_ID" ]; then
  echo "❌ GCP_PROJECT_IDが設定されていません"
  exit 1
fi

if [ -z "$CLOUD_RUN_REGION" ]; then
  CLOUD_RUN_REGION="asia-northeast1"
fi

# Dockerイメージをビルド
echo "🔨 Dockerイメージをビルド中..."
docker build -t gcr.io/${GCP_PROJECT_ID}/video-editor .

# GCRにプッシュ
echo "📤 GCRにプッシュ中..."
docker push gcr.io/${GCP_PROJECT_ID}/video-editor

# Cloud Runにデプロイ
echo "🚀 Cloud Runにデプロイ中..."
gcloud run deploy video-editor \
  --image gcr.io/${GCP_PROJECT_ID}/video-editor \
  --platform managed \
  --region ${CLOUD_RUN_REGION} \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300

# Cloud Run URLを取得
CLOUD_RUN_URL=$(gcloud run services describe video-editor --region ${CLOUD_RUN_REGION} --format 'value(status.url)')

echo "✅ デプロイ完了"
echo "📋 Cloud Run URL: ${CLOUD_RUN_URL}"
echo ""
echo "次のステップ:"
echo "1. Supabase Secretsに設定: npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=${CLOUD_RUN_URL}"
