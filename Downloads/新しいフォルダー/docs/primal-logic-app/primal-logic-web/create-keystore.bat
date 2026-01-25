@echo off
REM Primal Logic - Android署名キーストア作成スクリプト
REM PlayStoreリリース用の署名キーストアを作成します

echo ========================================
echo Primal Logic - 署名キーストア作成
echo ========================================
echo.

REM キーストアの保存先
set KEYSTORE_PATH=android\app\release.keystore
set KEYSTORE_ALIAS=primal-logic-release

REM 既存のキーストアがあるか確認
if exist "%KEYSTORE_PATH%" (
    echo [警告] 既存のキーストアが見つかりました: %KEYSTORE_PATH%
    echo.
    set /p OVERWRITE="上書きしますか？ (y/N): "
    if /i not "%OVERWRITE%"=="y" (
        echo 処理をキャンセルしました。
        pause
        exit /b
    )
    del "%KEYSTORE_PATH%"
)

echo.
echo キーストアを作成します...
echo 以下の情報を入力してください:
echo.

REM キーストアのパスワードを入力
set /p KEYSTORE_PASSWORD="キーストアのパスワード: "
set /p KEY_PASSWORD="キーのパスワード（同じでOK）: "

if "%KEY_PASSWORD%"=="" set KEY_PASSWORD=%KEYSTORE_PASSWORD%

REM keytoolコマンドのパスを確認
where keytool >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [エラー] keytoolが見つかりません。
    echo Java JDKがインストールされているか確認してください。
    echo.
    echo 通常、keytoolは以下のパスにあります:
    echo   C:\Program Files\Java\jdk-*\bin\keytool.exe
    echo   または
    echo   C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe
    echo.
    pause
    exit /b 1
)

REM キーストアを作成
keytool -genkeypair ^
    -v ^
    -storetype PKCS12 ^
    -keystore "%KEYSTORE_PATH%" ^
    -alias "%KEYSTORE_ALIAS%" ^
    -keyalg RSA ^
    -keysize 2048 ^
    -validity 10000 ^
    -storepass "%KEYSTORE_PASSWORD%" ^
    -keypass "%KEY_PASSWORD%" ^
    -dname "CN=Primal Logic, OU=Development, O=Primal Logic, L=Tokyo, ST=Tokyo, C=JP"

if %ERRORLEVEL% NEQ 0 (
    echo [エラー] キーストアの作成に失敗しました。
    pause
    exit /b 1
)

echo.
echo ========================================
echo キーストアが正常に作成されました！
echo ========================================
echo.
echo キーストアパス: %KEYSTORE_PATH%
echo エイリアス: %KEYSTORE_ALIAS%
echo.
echo [重要] 以下の情報を安全に保管してください:
echo   - キーストアパス: %KEYSTORE_PATH%
echo   - エイリアス: %KEYSTORE_ALIAS%
echo   - キーストアパスワード: （入力したパスワード）
echo   - キーパスワード: （入力したパスワード）
echo.
echo このキーストアを紛失すると、アプリの更新ができなくなります。
echo.
pause
