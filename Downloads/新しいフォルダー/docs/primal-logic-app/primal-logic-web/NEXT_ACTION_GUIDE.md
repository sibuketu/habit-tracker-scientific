# 次にめE��ことガイド（�E体的な手頁E��E

> **作�E日**: 2026-01-22  
> **目皁E*: 完�E自動化ワークフロー実裁E�E次のスチE��プを具体的にガイチE

---

## 🎯 現在の実裁E��況E

**完亁E��み**:
- ✁EDockerfile作�E
- ✁ECloud Run APIサーバ�E作�E
- ✁ESupabase Functions更新�E�リトライ・ポ�Eリング追加�E�E
- ✁EチE�Eタベ�Eスマイグレーション作�E
- ✁EリトライロジチE��実裁E
- ✁E統合テストコード作�E

**残作業**:
- ⚠�E�ECloud RunへのチE�Eロイ
- ⚠�E�ESupabase Secrets設宁E
- ⚠�E�EチE�Eタベ�Eスマイグレーション実衁E
- ⚠�E�E画像アセチE��準備

---

## 📋 次のアクション�E�Eつの選択肢�E�E

### A桁E 自刁E�Eターミナルで実行（推奨・最速！E

**手頁E*:

1. **GCPプロジェクチEDを確誁E*
   ```bash
   gcloud config get-value project
   ```

2. **環墁E��数を設宁E*
   ```bash
   set GCP_PROJECT_ID=your-project-id
   set CLOUD_RUN_REGION=asia-northeast1
   ```

3. **DockerイメージをビルチE*
   ```bash
   docker build -t gcr.io/%GCP_PROJECT_ID%/video-editor .
   ```

4. **GCRにプッシュ**
   ```bash
   docker push gcr.io/%GCP_PROJECT_ID%/video-editor
   ```

5. **Cloud RunにチE�Eロイ**
   ```bash
   gcloud run deploy video-editor --image gcr.io/%GCP_PROJECT_ID%/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
   ```

6. **Cloud Run URLを取征E*
   ```bash
   gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
   ```

7. **Supabase Secretsに設宁E*
   ```bash
   npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
   ```

8. **チE�Eタベ�Eスマイグレーション実衁E*
   ```bash
   supabase db push
   ```

**所要時閁E*: 紁E0刁E

---

### B桁E .batファイルをダブルクリチE���E�簡単！E

**手頁E*:

1. **環墁E��数を設宁E*�E�EowerShellで実行！E
   ```powershell
   $env:GCP_PROJECT_ID="your-project-id"
   $env:CLOUD_RUN_REGION="asia-northeast1"
   ```

2. **.batファイルをダブルクリチE��**
   - `scripts\deploy-cloud-run.bat` をダブルクリチE��

3. **完亁E��、表示されたCloud Run URLをコピ�E**

4. **Supabase Secretsに設宁E*
   ```bash
   npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=[コピ�EしたURL]
   ```

5. **チE�Eタベ�Eスマイグレーション実衁E*
   ```bash
   supabase db push
   ```

**所要時閁E*: 紁E0刁E��環墁E��数設定含む�E�E

---

### C桁E Antigravityで実行（実験！E

**手頁E*:

1. **Antigravityでプロジェクトを開く**
   - `C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web`

2. **ターミナルを開ぁE*

3. **環墁E��数を設宁E*
   ```powershell
   $env:GCP_PROJECT_ID="your-project-id"
   $env:CLOUD_RUN_REGION="asia-northeast1"
   ```

4. **.batファイルを実衁E*
   ```powershell
   .\scripts\deploy-cloud-run.bat
   ```

5. **完亁E��、表示されたCloud Run URLをコピ�E**

6. **Supabase Secretsに設宁E*
   ```bash
   npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=[コピ�EしたURL]
   ```

7. **チE�Eタベ�Eスマイグレーション実衁E*
   ```bash
   supabase db push
   ```

**所要時閁E*: 紁E0刁E��Entigravityの動作確認含む�E�E

---

## 🎯 推奨: A案（�E刁E�Eターミナル�E�E

**琁E��**:
- **最送E*: コマンドをコピ�EするだぁE
- **確宁E*: エラーがすぐ確認できる
- **柔軁E*: 途中で調整可能

---

## 📝 実行後�E確認事頁E

1. **Cloud Run URLが取得できたぁE*
   - `https://video-editor-xxxxx.run.app` 形式�EURLが表示されめE

2. **Supabase Secretsが設定できたぁE*
   - `npx supabase secrets list` で確誁E

3. **チE�Eタベ�Eスマイグレーションが�E功したか**
   - `supabase db push` でエラーが�EなぁE��確誁E

4. **統合テストが成功するぁE*
   - `scripts/test-full-workflow.ts` を実衁E

---

## ⚠�E�E注意事頁E

- **GCP認証**: `gcloud auth login` が忁E��な場合あめE
- **Docker起勁E*: Docker Desktopが起動してぁE��忁E��あめE
- **プロジェクチED**: 正しいGCPプロジェクチEDを設宁E

---

**最終更新**: 2026-01-22

