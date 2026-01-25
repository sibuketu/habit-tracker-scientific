@echo off
REM Primal Logic - Androidリリースビルドスクリプト
REM PlayStore提出用のAPK/AABを作成します

echo ========================================
echo Primal Logic - Androidリリースビルド
echo ========================================
echo.

REM プロジェクトルートに移動
cd /d "%~dp0"

REM ビルド前の確認
echo [1/4] 依存関係のインストール...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [エラー] npm install に失敗しました。
    pause
    exit /b 1
)

echo.
echo [2/4] Webアプリのビルド...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [エラー] Webアプリのビルドに失敗しました。
    pause
    exit /b 1
)

echo.
echo [3/4] Capacitorの同期...
call npx cap sync android
if %ERRORLEVEL% NEQ 0 (
    echo [エラー] Capacitorの同期に失敗しました。
    pause
    exit /b 1
)

echo.
echo [4/4] Androidリリースビルド...
cd android

REM Gradleラッパーを使用してビルド
call gradlew.bat assembleRelease
if %ERRORLEVEL% NEQ 0 (
    echo [エラー] Androidビルドに失敗しました。
    cd ..
    pause
    exit /b 1
)

REM AAB（App Bundle）も作成（PlayStore推奨）
echo.
echo [5/5] Android App Bundleの作成...
call gradlew.bat bundleRelease
if %ERRORLEVEL% NEQ 0 (
    echo [警告] AABの作成に失敗しました（APKは作成されています）
) else (
    echo.
    echo ========================================
    echo ビルド完了！
    echo ========================================
    echo.
    echo APK: android\app\build\outputs\apk\release\app-release.apk
    echo AAB: android\app\build\outputs\bundle\release\app-release.aab
    echo.
    echo AABファイルをPlay Consoleにアップロードしてください。
    echo.
)

cd ..

pause
