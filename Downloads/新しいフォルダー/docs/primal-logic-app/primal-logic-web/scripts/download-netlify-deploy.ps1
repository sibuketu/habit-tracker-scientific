# Netlifyデプロイファイルをダウンロードするスクリプト

# デプロイID（NetlifyのURLから取得）
$deployId = "6971caa6b9d0595d0968faaf"
$siteName = "carnivos"
$baseUrl = "https://$siteName.netlify.app"

# ダウンロード先ディレクトリ
$downloadDir = "netlify-deploy-backup"
New-Item -ItemType Directory -Force -Path $downloadDir | Out-Null

Write-Host "Netlifyデプロイファイルをダウンロード中..." -ForegroundColor Green

# 主要ファイルをダウンロード
$files = @(
    "index.html",
    "manifest.json",
    "manifest.webmanifest",
    "sw.js",
    "registersw.js"
)

foreach ($file in $files) {
    $url = "$baseUrl/$file"
    $outputPath = Join-Path $downloadDir $file
    try {
        Write-Host "ダウンロード中: $file" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $outputPath -ErrorAction Stop
        Write-Host "✓ $file ダウンロード完了" -ForegroundColor Green
    } catch {
        Write-Host "✗ $file ダウンロード失敗: $_" -ForegroundColor Red
    }
}

# assetsフォルダのファイルもダウンロード（主要なもの）
$assetsFiles = @(
    "assets/index-Itu--OF1.js",
    "assets/react-vendor-OvXVS5lI.js",
    "assets/chart-vendor-BKK2UjWf.js",
    "assets/index-CW5E81Lq.css"
)

$assetsDir = Join-Path $downloadDir "assets"
New-Item -ItemType Directory -Force -Path $assetsDir | Out-Null

foreach ($file in $assetsFiles) {
    $url = "$baseUrl/$file"
    $outputPath = Join-Path $downloadDir $file
    try {
        Write-Host "ダウンロード中: $file" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $outputPath -ErrorAction Stop
        Write-Host "✓ $file ダウンロード完了" -ForegroundColor Green
    } catch {
        Write-Host "✗ $file ダウンロード失敗: $_" -ForegroundColor Red
    }
}

Write-Host "`nダウンロード完了！" -ForegroundColor Green
Write-Host "ファイルは '$downloadDir' フォルダに保存されました。" -ForegroundColor Cyan
