@echo off
REM .cursorrules シンボリックリンク作成スクリプト（BAT版）
REM 管理者権限で実行してください

echo ========================================
echo .cursorrules シンボリックリンク作成
echo ========================================
echo.

REM PowerShellスクリプトを実行
powershell -ExecutionPolicy Bypass -File "%~dp0create-cursorrules-symlinks.ps1"

pause
