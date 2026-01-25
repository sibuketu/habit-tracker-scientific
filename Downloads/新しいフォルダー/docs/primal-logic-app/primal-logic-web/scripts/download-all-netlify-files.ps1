# Netlifyデプロイファイルを一括ダウンロードするスクリプト

$siteName = "carnivos"
$baseUrl = "https://$siteName.netlify.app"
$downloadDir = "netlify-deploy-backup"

# ダウンロード先ディレクトリを作成
New-Item -ItemType Directory -Force -Path $downloadDir | Out-Null
New-Item -ItemType Directory -Force -Path "$downloadDir/assets" | Out-Null

Write-Host "Downloading Netlify deploy files..." -ForegroundColor Green
Write-Host "Site: $baseUrl" -ForegroundColor Cyan
Write-Host ""

# 主要ファイルのリスト
$rootFiles = @(
    "index.html",
    "manifest.json",
    "manifest.webmanifest",
    "sw.js",
    "registersw.js",
    "vite.svg"
)

# アイコンファイル
$iconFiles = @(
    "apple-touch-icon.png",
    "favicon.ico",
    "icon-spear-gold.png",
    "icon-steak-fire.png",
    "icon-v2-192.png",
    "icon-v2-512.png",
    "pwa-192x192.png",
    "pwa-512x512.png",
    "pwa-v2-192.png",
    "pwa-v2-512.png"
)

# assetsフォルダのファイル（Netlifyのindex.htmlから取得したファイル名）
$assetsFiles = @(
    "assets/index-Itu--OF1.js",
    "assets/react-vendor-OvXVS5lI.js",
    "assets/chart-vendor-BKK2UjWf.js",
    "assets/index-CW5E81Lq.css"
)

# ダウンロード関数
function Download-File {
    param(
        [string]$Url,
        [string]$OutputPath,
        [string]$FileName
    )
    
    try {
        Write-Host "Downloading: $FileName" -ForegroundColor Yellow -NoNewline
        $response = Invoke-WebRequest -Uri $Url -OutFile $OutputPath -ErrorAction Stop
        $fileSize = (Get-Item $OutputPath).Length / 1KB
        Write-Host " OK ($([math]::Round($fileSize, 1)) KB)" -ForegroundColor Green
        return $true
    } catch {
        Write-Host " FAILED: $_" -ForegroundColor Red
        return $false
    }
}

# Download root files
Write-Host "=== Root Files ===" -ForegroundColor Cyan
$rootSuccess = 0
foreach ($file in $rootFiles) {
    $url = "$baseUrl/$file"
    $outputPath = Join-Path $downloadDir $file
    if (Download-File -Url $url -OutputPath $outputPath -FileName $file) {
        $rootSuccess++
    }
    Start-Sleep -Milliseconds 200
}

# Download icon files
Write-Host ""
Write-Host "=== Icon Files ===" -ForegroundColor Cyan
$iconSuccess = 0
foreach ($file in $iconFiles) {
    $url = "$baseUrl/$file"
    $outputPath = Join-Path $downloadDir $file
    if (Download-File -Url $url -OutputPath $outputPath -FileName $file) {
        $iconSuccess++
    }
    Start-Sleep -Milliseconds 200
}

# Download assets files
Write-Host ""
Write-Host "=== Assets Files ===" -ForegroundColor Cyan
$assetsSuccess = 0
foreach ($file in $assetsFiles) {
    $url = "$baseUrl/$file"
    $outputPath = Join-Path $downloadDir $file
    $dir = Split-Path $outputPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    if (Download-File -Url $url -OutputPath $outputPath -FileName $file) {
        $assetsSuccess++
    }
    Start-Sleep -Milliseconds 200
}

# 結果サマリー
Write-Host ""
Write-Host "=== Download Complete ===" -ForegroundColor Green
Write-Host "Root files: $rootSuccess/$($rootFiles.Count)" -ForegroundColor Cyan
Write-Host "Icon files: $iconSuccess/$($iconFiles.Count)" -ForegroundColor Cyan
Write-Host "Assets files: $assetsSuccess/$($assetsFiles.Count)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Files saved to: $downloadDir" -ForegroundColor Green
