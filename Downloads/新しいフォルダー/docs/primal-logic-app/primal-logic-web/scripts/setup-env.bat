@echo off
REM 環境変数設定ガイド（Windows用）

echo 📋 環境変数設定ガイド
echo.
echo 以下の環境変数を設定してください:
echo.
echo 1. GCPプロジェクトID:
echo    set GCP_PROJECT_ID=your-project-id
echo.
echo 2. Cloud Runリージョン（オプション、デフォルト: asia-northeast1）:
echo    set CLOUD_RUN_REGION=asia-northeast1
echo.
echo 3. Supabase環境変数（.envファイルに追加）:
echo    VITE_SUPABASE_URL=https://your-project.supabase.co
echo    VITE_SUPABASE_ANON_KEY=your-anon-key
echo.
echo 4. Supabase Secrets（Supabase Functions用）:
echo    npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
echo.
echo ✅ 設定完了後、以下を実行:
echo    scripts\deploy-cloud-run.bat
