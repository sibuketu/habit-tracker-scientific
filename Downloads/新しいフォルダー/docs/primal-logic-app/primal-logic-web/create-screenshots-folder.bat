@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "screenshots" (
    mkdir "screenshots"
    echo ✅ screenshotsフォルダを作成しました
) else (
    echo ✅ screenshotsフォルダは既に存在します
)
echo.
echo 📁 フォルダの場所:
cd
echo screenshots
echo.
echo 📝 次のステップ:
echo 1. アプリのスクリーンショットをこのフォルダにコピーしてください
echo 2. resize-screenshot.bat を実行してください
echo.
pause
