# Cloud Shellでの次のスチE��チE

> **状況E*: Cloud Shellが起動済み

---

## 📋 Step 1: リポジトリをクローンまた�EファイルをアチE�EローチE

### 方法A: GitHubリポジトリからクローン�E�推奨�E�E

**GitHubリポジトリがある場吁E*:

```bash
git clone YOUR_REPOSITORY_URL
cd primal-logic-web
```

**GitHubリポジトリがなぁE��吁E*: 方法Bを使用

---

### 方法B: ファイルをアチE�EローチE

**忁E��なファイル**:
1. `Dockerfile`
2. `scripts/cloud-run-api-server.py`
3. `scripts/auto_video_editor.py`

**手頁E*:
1. **Cloud Shellの「ファイルをアチE�Eロード」をクリチE��**�E�Eつの点のメニュー ↁE「ファイルをアチE�Eロード」！E
2. **忁E��なファイルを選択してアチE�EローチE*
3. **チE��レクトリ構造を作�E**:
   ```bash
   mkdir -p scripts
   ```

---

## 📋 Step 2: チE�Eロイを実衁E

**`scripts/deploy-cloud-shell.txt`** を開ぁE��、�Eコマンドをコピ�E:

```bash
gcloud config set project gen-lang-client-0090221486
docker build -t gcr.io/gen-lang-client-0090221486/video-editor .
docker push gcr.io/gen-lang-client-0090221486/video-editor
gcloud run deploy video-editor --image gcr.io/gen-lang-client-0090221486/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

**吁E��マンドが完亁E��るまで征E��**

---

## 📋 Step 3: Cloud Run URLをコピ�E

**Step 2の最後�Eコマンド�E出劁E*�E�侁E `https://video-editor-xxxxx-xx.a.run.app`�E�をコピ�E

---

## 📋 Step 4: Supabase Secretsに設宁E

**ローカルのPowerShellで実衁E*:

```powershell
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=YOUR_CLOUD_RUN_URL
```

**注愁E*: `YOUR_CLOUD_RUN_URL` をStep 3で取得したURLに置き換える

---

## 📋 Step 5: チE�Eタベ�Eスマイグレーション実衁E

**ローカルのPowerShellで実衁E*:

```powershell
supabase db push
```

---

## ✁E確認チェチE��リスチE

- [ ] Cloud Shellが起動しぁE
- [ ] リポジトリをクローンした�E�また�EファイルをアチE�Eロードした！E
- [ ] Dockerイメージがビルドできた
- [ ] GCRにプッシュできた
- [ ] Cloud RunにチE�Eロイできた
- [ ] Cloud Run URLを取得しぁE
- [ ] Supabase Secretsに設定しぁE
- [ ] チE�Eタベ�Eスマイグレーションが�E功しぁE

---

**最終更新**: 2026-01-22

