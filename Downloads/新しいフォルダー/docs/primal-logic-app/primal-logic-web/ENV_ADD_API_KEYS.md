# .envファイルにAPIキーを追加する方況E

## 📍 .envファイルの場所

```
C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web\.env
```

## ✁E追加するAPIキー�E�E案用�E�E

`.env`ファイルの**最後に**以下を追加してください�E�E

```env
# ============================================
# A桁E Makefilm優允E+ 音声生�Eサービス
# ============================================

# ElevenLabs APIキー�E�音声生�E用�E�E
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Google TTS APIキー�E�音声生�E用・オプション�E�E
VITE_GOOGLE_TTS_API_KEY=your_google_tts_api_key_here

# Makefilm APIキー�E�動画生�E用�E�E
VITE_MAKEFILM_API_KEY=your_makefilm_api_key_here
```

## 📝 設定手頁E

1. `.env`ファイルを開ぁE
2. **ファイルの最征E*に上記�E3行を追加
3. `your_elevenlabs_api_key_here` を実際のAPIキーに置き換ぁE
4. `your_makefilm_api_key_here` を実際のAPIキーに置き換ぁE
5. Google TTSはオプション�E�ElevenLabsが失敗した場合�Eフォールバック用�E�E

## ⚠�E�E重要E

- `=` の前後にスペ�Eスを�EれなぁE
- コメント！E#`�E�を同じ行に入れなぁE
- 実際のAPIキーを貼り付ける！Eyour_..._here` の部刁E��削除�E�E

## 🔍 既存�E.envファイルの構造侁E

既存�E`.env`ファイルには以下�Eような構造になってぁE��はずです！E

```env
# Gemini APIキー�E�既存！E
VITE_GEMINI_API_KEY=AIzaSy...

# Supabase�E�既存�Eオプション�E�E
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# 以下を追加 ↁE
VITE_ELEVENLABS_API_KEY=your_key
VITE_MAKEFILM_API_KEY=your_key
```

**どこに追加�E�E*: ファイルの**最征E*に追加すればOKです。行番号は気にしなくて大丈夫です、E

