@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "scripts\download-all-netlify-files.ps1"
pause
