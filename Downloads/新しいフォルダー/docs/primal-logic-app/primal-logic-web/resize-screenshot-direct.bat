@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo App Store用スクリーンショットリサイズ
echo.
echo スクリーンショットをリサイズ中...
echo.
call npx tsx scripts/resize-screenshot.ts
echo.
if exist "screenshots\app-store" (
    echo ✅ 完了！
    echo リサイズ後のファイルは screenshots\app-store フォルダに保存されました
) else (
    echo ❌ エラーが発生しました
)
echo.
pause
