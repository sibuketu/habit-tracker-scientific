@echo off
REM Docker DesktopとGoogle Cloud SDKをインストール

echo 📦 Docker DesktopとGoogle Cloud SDKをインストール中...
echo.

REM Docker Desktopをインストール
echo 🔨 Docker Desktopをインストール中...
winget install -e --id Docker.DockerDesktop

REM Google Cloud SDKをインストール
echo 🔨 Google Cloud SDKをインストール中...
winget install -e --id Google.CloudSDK

echo.
echo ✅ インストール完了
echo.
echo ⚠️ 注意事項:
echo 1. インストール中に何度か「Y」を押して承認する必要がある場合があります
echo 2. 完了後、PCの再起動が必要になることがあります
echo 3. 再起動後、Antigravityで以下を実行:
echo    - gcloud auth login
echo    - gcloud config set project YOUR_PROJECT_ID
echo    - scripts\deploy-cloud-run.bat
echo.

pause
