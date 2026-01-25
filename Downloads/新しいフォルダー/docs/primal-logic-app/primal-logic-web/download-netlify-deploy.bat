@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "scripts\download-netlify-deploy.ps1"
pause
