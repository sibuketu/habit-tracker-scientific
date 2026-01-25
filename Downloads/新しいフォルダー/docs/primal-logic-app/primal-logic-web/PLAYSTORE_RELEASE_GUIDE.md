# PlayStoreリリース準備ガイチE

> CarnivOS - Google Play Storeへのリリース手頁E

---

## 📋 前提条件

1. **Google Play Developer登録**�E�E25 一回！E
   - [Google Play Console](https://play.google.com/console) にアクセス
   - 開発老E��カウントを作�E�E��E回�Eみ$25忁E��E��E

2. **Java JDK** がインスト�EルされてぁE��こと
   - キーストア作�Eに忁E��E
   - Android Studioに含まれてぁE��場合もありまぁE

---

## 🚀 リリース手頁E

### 1. 署名キーストアの作�E

```bash
# プロジェクトルートで実衁E
create-keystore.bat
```

**手頁E**
1. スクリプトを実衁E
2. キーストアのパスワードを入力（安�Eに保管�E�E
3. キーのパスワードを入力（同じでOK�E�E
4. キーストアぁE`android/app/release.keystore` に作�EされめE

**重要E** こ�Eキーストアを紛失すると、アプリの更新ができなくなります。忁E��バックアチE�Eを取ってください、E

### 2. キーストア設定ファイルの作�E

```bash
# android/keystore.properties.example をコピ�E
copy android\keystore.properties.example android\keystore.properties
```

**keystore.properties を編雁E**
```properties
storeFile=app/release.keystore
storePassword=あなた�EキーストアパスワーチE
keyAlias=primal-logic-release
keyPassword=あなた�EキーパスワーチE
```

**注愁E** `keystore.properties` は `.gitignore` に含まれてぁE��ため、Gitにはコミットされません、E

### 3. アプリのビルチE

```bash
# リリースビルドを実衁E
build-android-release.bat
```

**出力ファイル:**
- **APK**: `android/app/build/outputs/apk/release/app-release.apk`
- **AAB** (推奨): `android/app/build/outputs/bundle/release/app-release.aab`

**PlayStoreにはAABファイルをアチE�Eロードしてください**�E�Eoogle推奨�E�E

### 4. Google Play Consoleでの設宁E

#### 4.1 アプリの作�E

1. [Google Play Console](https://play.google.com/console) にログイン
2. 「アプリを作�E」をクリチE��
3. アプリ吁E **CarnivOS**
4. チE��ォルト言誁E **日本誁E*
5. アプリまた�Eゲーム: **アプリ**
6. 無料また�E有料: **無斁E*�E�また�E有料�E�E

#### 4.2 ストア登録惁E��

**忁E��頁E��:**
- アプリ吁E CarnivOS
- 短ぁE��昁E カーニ�EアダイエチE��管琁E��プリ
- 詳細な説昁E �E�アプリの詳細説明を記�E�E�E
- グラフィチE��:
  - アプリアイコン: 512x512px�E�ENG、E��過なし！E
  - 機�E画僁E 少なくとめE枚！E024x500px以上！E
  - スクリーンショチE��: 少なくとめE枚（電話用、EインチタブレチE��用、E0インチタブレチE��用�E�E

**推奨頁E��:**
- プロモーション動画
- プロモーション画僁E

#### 4.3 コンチE��チE��ーチE��ング

1. 「コンチE��チE��ーチE��ング」セクションに移勁E
2. 質問に回答してレーチE��ングを取征E
3. 通常は「Everyone」また�E、E+」になる想宁E

#### 4.4 プライバシーポリシー

1. 「アプリのコンチE��チE��セクションに移勁E
2. プライバシーポリシーのURLを�E劁E
   - 侁E `https://your-domain.com/privacy-policy`
   - また�EGitHub Pages等でホスチE��ング

#### 4.5 アプリのアチE�EローチE

1. 「リリース」�E「本番環墁E���E「新しいリリースを作�E、E
2. 「AABファイルをアチE�Eロード」をクリチE��
3. `app-release.aab` をアチE�EローチE
4. リリース名を入力（侁E "1.0 (1)"�E�E
5. 「変更を保存、E

#### 4.6 審査提�E

1. 全ての忁E��頁E��が完亁E��てぁE��か確誁E
2. 「審査を申請」をクリチE��
3. 審査には通常1-3日かかりまぁE

---

## 📝 チェチE��リスチE

### ビルド前
- [ ] 機�EフラグがPhase 1設定になってぁE��
- [ ] バ�Eジョン番号が正しい�E�Eandroid/app/build.gradle`�E�E
- [ ] アプリアイコンが設定されてぁE��
- [ ] スプラチE��ュスクリーンが設定されてぁE��

### ビルド征E
- [ ] APK/AABが正常に作�EされぁE
- [ ] アプリが正常に動作する（実機テスト推奨�E�E

### Play Console提�E剁E
- [ ] ストア登録惁E��が�Eて入力されてぁE��
- [ ] グラフィチE��素材が全てアチE�EロードされてぁE��
- [ ] プライバシーポリシーのURLが設定されてぁE��
- [ ] コンチE��チE��ーチE��ングが完亁E��てぁE��
- [ ] AABファイルがアチE�EロードされてぁE��

---

## 🔧 トラブルシューチE��ング

### キーストアが見つからなぁE

**エラー:** `Keystore file not found`

**解決方況E**
1. `android/app/release.keystore` が存在するか確誁E
2. `keystore.properties` の `storeFile` パスが正しいか確誁E
3. パスは `app/release.keystore`�E�Eandroid/` からの相対パス�E�E

### ビルドが失敗すめE

**エラー:** `Build failed`

**解決方況E**
1. `npm run build` が�E功するか確誁E
2. `npx cap sync android` が�E功するか確誁E
3. Android Studioで直接ビルドしてエラーメチE��ージを確誁E

### 署名エラー

**エラー:** `Signing config not found`

**解決方況E**
1. `keystore.properties` ぁE`android/` チE��レクトリに存在するか確誁E
2. ファイル冁E�Eパスワードが正しいか確誁E
3. キーストアファイルが存在するか確誁E

---

## 📚 参老E��ンク

- [Google Play Console](https://play.google.com/console)
- [Android App Bundle](https://developer.android.com/guide/app-bundle)
- [Capacitor Android ガイド](https://capacitorjs.com/docs/android)

---

最終更新: 2026-01-19

