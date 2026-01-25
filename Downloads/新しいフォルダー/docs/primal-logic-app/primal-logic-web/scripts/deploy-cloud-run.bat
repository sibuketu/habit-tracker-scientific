@echo off
REM Cloud RunにFFmpeg実行環境をデプロイ（Windows用）

REM 環境変数を確認
if "%GCP_PROJECT_ID%"=="" (
  echo ❌ GCP_PROJECT_IDが設定されていません
  exit /b 1
)

if "%CLOUD_RUN_REGION%"=="" (
  set CLOUD_RUN_REGION=asia-northeast1
)

REM Dockerイメージをビルド
echo 🔨 Dockerイメージをビルド中...
docker build -t gcr.io/%GCP_PROJECT_ID%/video-editor .

REM GCRにプッシュ
echo 📤 GCRにプッシュ中...
docker push gcr.io/%GCP_PROJECT_ID%/video-editor

REM Cloud Runにデプロイ
echo 🚀 Cloud Runにデプロイ中...
gcloud run deploy video-editor ^
  --image gcr.io/%GCP_PROJECT_ID%/video-editor ^
  --platform managed ^
  --region %CLOUD_RUN_REGION% ^
  --allow-unauthenticated ^
  --memory 2Gi ^
  --cpu 2 ^
  --timeout 300

REM Cloud Run URLを取得
for /f "tokens=*" %%i in ('gcloud run services describe video-editor --region %CLOUD_RUN_REGION% --format "value(status.url)"') do set CLOUD_RUN_URL=%%i

echo ✅ デプロイ完了
echo 📋 Cloud Run URL: %CLOUD_RUN_URL%
echo.
echo 次のステップ:
echo 1. Supabase Secretsに設定: npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=%CLOUD_RUN_URL%
