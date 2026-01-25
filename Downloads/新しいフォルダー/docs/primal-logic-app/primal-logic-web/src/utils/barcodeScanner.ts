/**
 * CarnivoreOS - Barcode Scanner Utility
 *
 * 繝舌・繧ｳ繝ｼ繝芽ｪｭ縺ｿ蜿悶ｊ讖溯・
 * Web API: BarcodeDetector API・・hrome/Edge蟇ｾ蠢懶ｼ・ * 繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ: @zxing/library
 */

import { logError } from './errorHandler';

export interface BarcodeResult {
  code: string; // 繝舌・繧ｳ繝ｼ繝牙､
  format: string; // 繝舌・繧ｳ繝ｼ繝牙ｽ｢蠑擾ｼ・AN-13, UPC-A遲会ｼ・}

/**
 * BarcodeDetector API縺悟茜逕ｨ蜿ｯ閭ｽ縺九メ繧ｧ繝・け
 * 繝｢繝舌う繝ｫ繝悶Λ繧ｦ繧ｶ・育音縺ｫiOS Safari・峨〒縺ｯ蛻ｩ逕ｨ縺ｧ縺阪↑縺・◆繧√√ｈ繧雁宍蟇・↓繝√ぉ繝・け
 */
export function isBarcodeDetectorAvailable(): boolean {
  // 繝｢繝舌う繝ｫ繝悶Λ繧ｦ繧ｶ縺ｮ讀懷・
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // iOS Safari縺ｧ縺ｯBarcodeDetector API縺悟茜逕ｨ縺ｧ縺阪↑縺・  if (isIOS) {
    return false;
  }

  // Android Chrome縺ｧ繧ゅ∝ｮ滄圀縺ｫAPI縺悟茜逕ｨ蜿ｯ閭ｽ縺狗｢ｺ隱・  if (isMobile && 'BarcodeDetector' in window) {
    try {
      // 螳滄圀縺ｫBarcodeDetector繧偵う繝ｳ繧ｹ繧ｿ繝ｳ繧ｹ蛹悶＠縺ｦ遒ｺ隱・      const testDetector = new (
        window as typeof window & { BarcodeDetector: typeof BarcodeDetector }
      ).BarcodeDetector({ formats: ['qr_code'] });
      return !!testDetector;
    } catch {
      return false;
    }
  }

  // 繝・せ繧ｯ繝医ャ繝励ヶ繝ｩ繧ｦ繧ｶ・・hrome縲・dge・峨〒縺ｯ蛻ｩ逕ｨ蜿ｯ閭ｽ
  return 'BarcodeDetector' in window;
}

/**
 * 繝舌・繧ｳ繝ｼ繝峨ｒ繧ｹ繧ｭ繝｣繝ｳ・・arcodeDetector API菴ｿ逕ｨ・・ */
export async function scanBarcodeFromImage(file: File): Promise<BarcodeResult | null> {
  try {
    if (!isBarcodeDetectorAvailable()) {
      throw new Error('BarcodeDetector API is not available');
    }

    const imageBitmap = await createImageBitmap(file);
    const BarcodeDetectorClass = (
      window as typeof window & { BarcodeDetector: typeof BarcodeDetector }
    ).BarcodeDetector;
    const barcodeDetector = new BarcodeDetectorClass({
      formats: [
        'ean_13',
        'ean_8',
        'upc_a',
        'upc_e',
        'code_128',
        'code_39',
        'code_93',
        'codabar',
        'itf',
        'qr_code',
        'data_matrix',
        'aztec',
        'pdf417',
      ],
    });

    const barcodes = await barcodeDetector.detect(imageBitmap);

    if (barcodes.length === 0) {
      return null;
    }

    return {
      code: barcodes[0].rawValue,
      format: barcodes[0].format,
    };
  } catch (error) {
    logError(error, { component: 'barcodeScanner', action: 'scanBarcodeFromImage' });
    throw error;
  }
}

/**
 * 繧ｫ繝｡繝ｩ縺九ｉ繝舌・繧ｳ繝ｼ繝峨ｒ繧ｹ繧ｭ繝｣繝ｳ
 *
 * @param videoElement 譌｢縺ｫ蛻晄悄蛹悶＆繧後◆video隕∫ｴ・医が繝励す繝ｧ繝ｳ・・ * @param onProgress 繧ｹ繧ｭ繝｣繝ｳ荳ｭ縺ｮ騾ｲ謐励さ繝ｼ繝ｫ繝舌ャ繧ｯ・医が繝励す繝ｧ繝ｳ・・ */
export async function scanBarcodeFromCamera(
  videoElement?: HTMLVideoElement,
  onProgress?: (progress: number) => void
): Promise<BarcodeResult | null> {
  try {
    if (!isBarcodeDetectorAvailable()) {
      throw new Error('BarcodeDetector API is not available');
    }

    let stream: MediaStream;
    let video: HTMLVideoElement;
    let shouldCleanup = false;

    if (videoElement) {
      // 譌｢縺ｫ蛻晄悄蛹悶＆繧後◆video隕∫ｴ繧剃ｽｿ逕ｨ
      video = videoElement;
      stream = video.srcObject as MediaStream;
    } else {
      // 譁ｰ縺励＞繧ｫ繝｡繝ｩ繧ｹ繝医Μ繝ｼ繝繧帝幕蟋・      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      shouldCleanup = true;
    }

    const BarcodeDetectorClass = (
      window as typeof window & { BarcodeDetector: typeof BarcodeDetector }
    ).BarcodeDetector;
    const barcodeDetector = new BarcodeDetectorClass({
      formats: [
        'ean_13',
        'ean_8',
        'upc_a',
        'upc_e',
        'code_128',
        'code_39',
        'code_93',
        'codabar',
        'itf',
        'qr_code',
        'data_matrix',
        'aztec',
        'pdf417',
      ],
    });

    return new Promise((resolve, reject) => {
      let scanCount = 0;
      const maxScans = 20; // 10遘帝俣・・00ms ﾃ・20蝗橸ｼ・
      const scanInterval = setInterval(async () => {
        try {
          scanCount++;
          if (onProgress) {
            onProgress((scanCount / maxScans) * 100);
          }

          const barcodes = await barcodeDetector.detect(video);
          if (barcodes.length > 0) {
            clearInterval(scanInterval);
            if (shouldCleanup) {
              stream.getTracks().forEach((track) => track.stop());
              video.remove();
            }
            resolve({
              code: barcodes[0].rawValue,
              format: barcodes[0].format,
            });
          } else if (scanCount >= maxScans) {
            // 繧ｿ繧､繝繧｢繧ｦ繝・            clearInterval(scanInterval);
            if (shouldCleanup) {
              stream.getTracks().forEach((track) => track.stop());
              video.remove();
            }
            resolve(null);
          }
        } catch (error) {
          // 繧ｹ繧ｭ繝｣繝ｳ荳ｭ縺ｮ繧ｨ繝ｩ繝ｼ縺ｯ辟｡隕厄ｼ医き繝｡繝ｩ縺梧ｺ門ｙ縺ｧ縺阪※縺・↑縺・ｴ蜷医↑縺ｩ・・          if (import.meta.env.DEV) {
            console.log('Barcode scan attempt failed:', error);
          }
        }
      }, 500);
    });
  } catch (error: unknown) {
    logError(error, { component: 'barcodeScanner', action: 'scanBarcodeFromCamera' });

    // 繧ｨ繝ｩ繝ｼ縺ｮ遞ｮ鬘槭↓蠢懊§縺ｦ驕ｩ蛻・↑繝｡繝・そ繝ｼ繧ｸ繧定ｿ斐☆
    const err = error as { name?: string; message?: string };
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      throw new Error('繧ｫ繝｡繝ｩ縺ｮ險ｱ蜿ｯ縺悟ｿ・ｦ√〒縺吶ゅヶ繝ｩ繧ｦ繧ｶ縺ｮ險ｭ螳壹°繧峨き繝｡繝ｩ繧定ｨｱ蜿ｯ縺励※縺上□縺輔＞縲・);
    } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      throw new Error('繧ｫ繝｡繝ｩ縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縺ｧ縺励◆縲・);
    } else if (err.message?.includes('BarcodeDetector')) {
      throw new Error(
        '縺薙・繝悶Λ繧ｦ繧ｶ縺ｯ繝舌・繧ｳ繝ｼ繝芽ｪｭ縺ｿ蜿悶ｊ縺ｫ蟇ｾ蠢懊＠縺ｦ縺・∪縺帙ｓ縲・hrome縺ｾ縺溘・Edge繧偵＃蛻ｩ逕ｨ縺上□縺輔＞縲・
      );
    }

    throw error;
  }
}

/**
 * Open Food Facts API縺九ｉ鬟溷刀諠・ｱ繧貞叙蠕・ */
export interface OpenFoodFactsProduct {
  product_name?: string;
  product_name_en?: string;
  nutriments?: {
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    sodium?: number;
    magnesium?: number;
    zinc?: number;
    iron?: number;
    vitamin_b12?: number;
    vitamin_a?: number;
    vitamin_d?: number;
    omega_3_fat?: number;
    omega_6_fat?: number;
    [key: string]: number | undefined;
  };
  [key: string]: unknown;
}

export async function getFoodInfoFromBarcode(
  barcode: string
): Promise<OpenFoodFactsProduct | null> {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await response.json();

    if (data.status === 0) {
      return null; // 蝠・刀縺瑚ｦ九▽縺九ｉ縺ｪ縺・    }

    return data.product;
  } catch (error) {
    logError(error, { component: 'barcodeScanner', action: 'getFoodInfoFromBarcode' });
    throw error;
  }
}

