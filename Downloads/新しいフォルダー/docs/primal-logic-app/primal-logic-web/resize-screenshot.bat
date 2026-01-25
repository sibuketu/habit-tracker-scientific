@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo App Store用スクリーンショットリサイズ
echo.
echo スクリーンショットをリサイズ中...
echo.
call npm run resize-screenshot 2>nul
if errorlevel 1 (
    call npx tsx scripts/resize-screenshot.ts
)
echo.
echo 完了！
echo リサイズ後のファイルは screenshots\app-store フォルダに保存されました
echo.
pause
