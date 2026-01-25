# Step 0: PCを�E起動（忁E��！E

> **状況E*: Docker DesktopとGoogle Cloud SDKをインスト�Eルした直征E

---

## ⚠�E�E重要E PCを�E起動してください

**インスト�Eル後、PCを�E起動しなぁE��、以下�Eコマンドが認識されません**:
- `gcloud` コマンチE
- `docker` コマンチE

---

## 🔄 再起動後�E手頁E

### 1. 新しいターミナルを開ぁE

**再起動後、新しいPowerShellターミナルを開ぁE��ください**

---

### 2. コマンドが認識されるか確誁E

**新しいターミナルで実衁E*:

```bash
gcloud --version
docker --version
```

**両方のコマンドが認識されればOK**

---

### 3. PowerShell実行�Eリシーの変更�E�Epx用�E�E

**npxが実行できなぁE��合、以下を実衁E*:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**確認�Eロンプトが表示されたら「Y」を押ぁE*

---

### 4. 次のスチE��プに進む

**コマンドが認識されたら、`STEP1_GET_PROJECT_ID.md` を参照してください**

---

**最終更新**: 2026-01-22

