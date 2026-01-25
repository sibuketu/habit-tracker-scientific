@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo 全自動チェックを開始します
echo ========================================
echo.
echo 【注意】このスクリプトは「包括的品質保証プロトコル」の
echo        「コード品質チェック」段階の一部を自動化したものです。
echo        詳細は docs/COMPREHENSIVE_CHECK_PROTOCOL.md を参照してください。
echo.

echo [1/6] ESLintでコード品質をチェックしています...
call npm run lint
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ESLintエラーが見つかりました
    echo    修正するには: npm run lint:fix
    echo.
) else (
    echo ✅ ESLintチェック完了
    echo.
)

echo [2/6] TypeScriptの型チェックを実行しています...
call npx tsc --noEmit
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ TypeScriptの型エラーが見つかりました
    echo.
) else (
    echo ✅ TypeScript型チェック完了
    echo.
)

echo [3/6] Prettierでフォーマットをチェックしています...
call npm run format:check
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ フォーマットエラーが見つかりました
    echo    修正するには: npm run format
    echo.
) else (
    echo ✅ Prettierチェック完了
    echo.
)

echo [4/6] E2Eテスト（動作テスト）を実行しています...
call npm test
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ E2Eテストが失敗しました
    echo    結果を確認するには: npm run test:ui
    echo.
) else (
    echo ✅ E2Eテスト完了
    echo.
)

echo [5/6] Visual Regression Test（UI見た目テスト）を実行しています...
echo     （開発サーバーが起動している必要があります）
call npm run test:visual
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Visual Regression Testが失敗しました
    echo    結果を確認するには: npm run test:ui
    echo.
) else (
    echo ✅ Visual Regression Test完了
    echo.
)

echo [6/6] ビルドチェックを実行しています...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ビルドエラーが見つかりました
    echo.
) else (
    echo ✅ ビルドチェック完了
    echo.
)

echo ========================================
echo 全自動チェック完了
echo ========================================
echo.
echo 【次のステップ】
echo 1. コード品質チェック: 完了（このスクリプトで実行済み）
echo 2. 動作確認チェック: ブラウザで実際の動作を確認してください
echo 3. 仕様適合チェック: ユーザー要求との照合を確認してください
echo 4. セキュリティチェック: 脆弱性の確認をしてください
echo.
echo 詳細は docs/COMPREHENSIVE_CHECK_PROTOCOL.md を参照してください。
echo.
pause

