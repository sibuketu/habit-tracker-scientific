import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * App Store用スクリーンショットリサイズスクリプト
 * iPhone 6.5インチディスプレイ用: 1242 × 2688px (縦向き)
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

const TARGET_SIZE = {
  width: 1242,
  height: 2688,
};

const INPUT_DIR = join(PROJECT_ROOT, 'screenshots'); // スクリーンショットを置くフォルダ
const OUTPUT_DIR = join(PROJECT_ROOT, 'screenshots', 'app-store'); // リサイズ後の出力フォルダ

async function resizeScreenshot(inputPath: string, outputPath: string) {
  try {
    await sharp(inputPath)
      .resize(TARGET_SIZE.width, TARGET_SIZE.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 }, // 黒背景
      })
      .toFile(outputPath);
    
    console.log(`✅ Resized: ${inputPath} → ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error resizing ${inputPath}:`, error);
    return false;
  }
}

async function main() {
  try {
    // 出力ディレクトリを作成
    const { mkdir } = await import('fs/promises');
    await mkdir(OUTPUT_DIR, { recursive: true });

    // 入力ディレクトリのファイルを取得
    const files = await readdir(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg)$/i.test(file)
    );

    if (imageFiles.length === 0) {
      console.log('❌ No image files found in', INPUT_DIR);
      console.log('📝 Please place your screenshots in the', INPUT_DIR, 'folder');
      return;
    }

    console.log(`📸 Found ${imageFiles.length} image file(s)`);
    console.log(`📐 Resizing to ${TARGET_SIZE.width} × ${TARGET_SIZE.height}px\n`);

    // 各ファイルをリサイズ
    for (const file of imageFiles) {
      const inputPath = join(INPUT_DIR, file);
      const outputPath = join(OUTPUT_DIR, `app-store-${file}`);
      await resizeScreenshot(inputPath, outputPath);
    }

    console.log(`\n✅ All screenshots resized!`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
