@echo off
REM 画像アセットのディレクトリ構造を作成

echo 📁 画像アセットディレクトリを作成中...

REM ディレクトリを作成
if not exist "assets" mkdir assets
if not exist "assets\images" mkdir assets\images

echo ✅ ディレクトリ作成完了
echo.
echo 📋 次のステップ:
echo 1. assets\images\ に以下の画像を配置:
echo    - government_guidelines_doc.jpg (政府文書)
echo    - anatomy_diagram.jpg (解剖図)
echo    - research_graph.jpg (研究グラフ)
echo.
echo 2. Supabase Storageにアップロード:
echo    supabase storage upload images/government_guidelines_doc.jpg assets/images/government_guidelines_doc.jpg
