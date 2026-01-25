# AntigravityでのCloud RunチE�EロイガイチE

> **作�E日**: 2026-01-22  
> **目皁E*: ターミナル作業に失敗した場合、Antigravityで実行する手頁E

---

## 🎯 前提条件

### 1. Docker DesktopとGoogle Cloud SDKをインスト�Eル

**Windows**:
```bash
# インスト�Eルスクリプトを実衁E
scripts\install-dependencies.bat
```

**また�E手動で**:
```bash
# Docker Desktopをインスト�Eル
winget install -e --id Docker.DockerDesktop

# Google Cloud SDKをインスト�Eル
winget install -e --id Google.CloudSDK
```

**注意事頁E*:
- インスト�Eル中に何度か「Y」を押して承認する忁E��がある場合がありまぁE
- 完亁E��、PCの再起動が忁E��になることがありまぁE

---

## 🚀 AntigravityでのチE�Eロイ手頁E

### Step 1: Antigravityでプロジェクトを開く

1. Antigravityを起勁E
2. 「Open Folder」をクリチE��
3. 以下�Eパスを選択！E
   ```
   C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web
   ```

### Step 2: GCP認証

**ターミナルで実衁E*:
```bash
# GCPにログイン
gcloud auth login

# プロジェクチEDを設宁E
gcloud config set project YOUR_PROJECT_ID
```

### Step 3: 環墁E��数を設宁E

**PowerShell**:
```powershell
$env:GCP_PROJECT_ID="your-project-id"
$env:CLOUD_RUN_REGION="asia-northeast1"
```

### Step 4: Cloud RunにチE�Eロイ

**方況E: .batファイルを実衁E*
```powershell
.\scripts\deploy-cloud-run.bat
```

**方況E: コマンドを直接実衁E*
```bash
# DockerイメージをビルチE
docker build -t gcr.io/YOUR_PROJECT_ID/video-editor .

# GCRにプッシュ
docker push gcr.io/YOUR_PROJECT_ID/video-editor

# Cloud RunにチE�Eロイ
gcloud run deploy video-editor --image gcr.io/YOUR_PROJECT_ID/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
```

### Step 5: Cloud Run URLを取征E

```bash
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

### Step 6: Supabase Secretsに設宁E

```bash
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
```

### Step 7: チE�Eタベ�Eスマイグレーション実衁E

```bash
supabase db push
```

---

## 📋 コピ�E用コマンド！Entigravity用�E�E

**全コマンドを頁E��に実衁E*:

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
$env:GCP_PROJECT_ID="YOUR_PROJECT_ID"
$env:CLOUD_RUN_REGION="asia-northeast1"
docker build -t gcr.io/$env:GCP_PROJECT_ID/video-editor .
docker push gcr.io/$env:GCP_PROJECT_ID/video-editor
gcloud run deploy video-editor --image gcr.io/$env:GCP_PROJECT_ID/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
supabase db push
```

**ファイルからコピ�E**: `scripts/deploy-cloud-run-copy-paste.txt` を開ぁE��全コマンドをコピ�E

---

## ⚠�E�EトラブルシューチE��ング

### Docker Desktopが起動しなぁE

1. Docker Desktopを起勁E
2. タスクトレイでDockerアイコンを確誁E
3. 「Docker Desktop is running」と表示されるまで征E��

### gcloudコマンドが見つからなぁE

1. PCを�E起動（インスト�Eル後！E
2. 新しいターミナルを開ぁE
3. `gcloud --version` で確誁E

### パスの問題が発生すめE

- Antigravityはパスの問題が発生しにくい
- それでも問題がある場合�E、`.bat`ファイルを使用

---

**最終更新**: 2026-01-22

