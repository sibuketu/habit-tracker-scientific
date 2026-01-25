gcloud auth login
gcloud config set project YOUR_PROJECT_ID
export GCP_PROJECT_ID="YOUR_PROJECT_ID"
export CLOUD_RUN_REGION="asia-northeast1"
docker build -t gcr.io/$GCP_PROJECT_ID/video-editor .
docker push gcr.io/$GCP_PROJECT_ID/video-editor
gcloud run deploy video-editor --image gcr.io/$GCP_PROJECT_ID/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
supabase db push
