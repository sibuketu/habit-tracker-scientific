# .cursorrules シンボリックリンク作成スクリプト
# 管理者権限で実行してください

$masterFile = "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web\.cursorrules"
$targets = @(
    "C:\Users\susam\Downloads\新しいフォルダー\.cursorrules",
    "C:\Users\susam\Downloads\新しいフォルダー\docs\.cursorrules",
    "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\.cursorrules"
)

# マスターファイルの存在確認
if (-not (Test-Path $masterFile)) {
    Write-Host "エラー: マスターファイルが見つかりません: $masterFile" -ForegroundColor Red
    exit 1
}

Write-Host "マスターファイル: $masterFile" -ForegroundColor Green
Write-Host ""

# 既存のファイルを削除
foreach ($target in $targets) {
    if (Test-Path $target) {
        $item = Get-Item $target
        $isSymbolicLink = $false
        
        # LinkTypeプロパティが存在する場合のみ確認
        if ($item | Get-Member -Name "LinkType" -ErrorAction SilentlyContinue) {
            if ($item.LinkType -eq "SymbolicLink") {
                $isSymbolicLink = $true
            }
        } elseif ($item.Attributes -match "ReparsePoint") {
            # LinkTypeプロパティが存在しない場合は、ReparsePoint属性で判定
            $isSymbolicLink = $true
        }
        
        if ($isSymbolicLink) {
            Remove-Item $target -Force
            Write-Host "既存のシンボリックリンクを削除: $target" -ForegroundColor Yellow
        } else {
            # バックアップを作成
            $backup = "$target.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
            Copy-Item $target $backup -Force
            Remove-Item $target -Force
            Write-Host "既存のファイルをバックアップして削除: $target -> $backup" -ForegroundColor Yellow
        }
    }
}

Write-Host ""

# シンボリックリンクを作成
foreach ($target in $targets) {
    try {
        New-Item -ItemType SymbolicLink -Path $target -Target $masterFile -Force | Out-Null
        Write-Host "[OK] シンボリックリンクを作成: $target -> $masterFile" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] エラー: $target の作成に失敗しました" -ForegroundColor Red
        Write-Host "   エラーメッセージ: $_" -ForegroundColor Red
        Write-Host "   管理者権限で実行してください。" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "完了！" -ForegroundColor Green
Write-Host ""
Write-Host "注意: シンボリックリンクが正しく作成されたか確認してください。" -ForegroundColor Yellow
Write-Host "確認方法: 各ワークスペースで .cursorrules を開き、内容が同じか確認してください。" -ForegroundColor Yellow
