/**
 * 繧｢繝励Μ繧｢繧､繧ｳ繝ｳ逕滓・UI繧ｳ繝ｳ繝昴・繝阪Φ繝・ *
 * 髢狗匱逕ｨ: 繧｢繝励Μ繧｢繧､繧ｳ繝ｳ縺ｮ逕滓・縺ｨ遒ｺ隱阪ｒ陦後≧縺溘ａ縺ｮUI
 */

import { useState } from 'react';
// 閾ｪ蜍慕函謌千沿繧剃ｽｿ逕ｨ・・eplicate API・・import {
  generateAppIconAuto,
  generateMultipleAppIconsAuto,
} from '../services/imageGenerationServiceAuto';
// 謇句虚逕滓・迚茨ｼ医・繝ｭ繝ｳ繝励ヨ縺ｮ縺ｿ・峨ｂ谿九＠縺ｦ縺翫￥
import { generateAppIcon, generateMultipleAppIcons } from '../services/imageGenerationService';

export function AppIconGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<
    Array<{ style: number; variation: number; url: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // 閾ｪ蜍慕函謌千沿繧定ｩｦ縺呻ｼ・eplicate API・・      const results = await generateMultipleAppIconsAuto();
      setGeneratedImages(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '逕ｻ蜒冗函謌舌↓螟ｱ謨励＠縺ｾ縺励◆';

      // Replicate API縺瑚ｨｭ螳壹＆繧後※縺・↑縺・ｴ蜷医・縲∵焔蜍慕函謌千沿縺ｫ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ
      if (errorMessage.includes('Replicate API繝医・繧ｯ繝ｳ縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ')) {
        try {
          // 謇句虚逕滓・迚医ｒ菴ｿ逕ｨ・医・繝ｭ繝ｳ繝励ヨ繧堤函謌撰ｼ・          await generateMultipleAppIcons();
          // 謇句虚逕滓・迚医・繧ｨ繝ｩ繝ｼ繧偵せ繝ｭ繝ｼ縺吶ｋ・医・繝ｭ繝ｳ繝励ヨ陦ｨ遉ｺ縺ｮ縺溘ａ・・        } catch {
          // 繧ｨ繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ縺ｯ謇句虚逕滓・迚医・throw縺ｧ陦ｨ遉ｺ縺輔ｌ繧・          setError(errorMessage);
        }
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSingle = async (style: 1 | 2 | 3, variation: 1 | 2 | 3 | 4 = 1) => {
    setIsGenerating(true);
    setError(null);

    try {
      // 閾ｪ蜍慕函謌千沿繧定ｩｦ縺呻ｼ・eplicate API・・      const url = await generateAppIconAuto(style, variation);
      setGeneratedImages((prev) => [...prev, { style, variation, url }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '逕ｻ蜒冗函謌舌↓螟ｱ謨励＠縺ｾ縺励◆';

      // Replicate API縺瑚ｨｭ螳壹＆繧後※縺・↑縺・ｴ蜷医・縲∵焔蜍慕函謌千沿縺ｫ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ
      if (errorMessage.includes('Replicate API繝医・繧ｯ繝ｳ縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ')) {
        try {
          await generateAppIcon(style, variation);
          // 謇句虚逕滓・迚医・繧ｨ繝ｩ繝ｼ繧偵せ繝ｭ繝ｼ縺吶ｋ・医・繝ｭ繝ｳ繝励ヨ陦ｨ遉ｺ縺ｮ縺溘ａ・・        } catch {
          // 繧ｨ繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ縺ｯ謇句虚逕滓・迚医・throw縺ｧ陦ｨ遉ｺ縺輔ｌ繧・          setError(errorMessage);
        }
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">繧｢繝励Μ繧｢繧､繧ｳ繝ｳ逕滓・</h1>

      <div className="mb-4 space-x-2">
        <button
          onClick={handleGenerateAll}
          disabled={isGenerating}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? '逕滓・荳ｭ...' : '10蛟倶ｸ諡ｬ逕滓・'}
        </button>

        <button
          onClick={() => handleGenerateSingle(1, 1)}
          disabled={isGenerating}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          繧ｹ繧ｿ繧､繝ｫ1-1繧堤函謌・        </button>

        <button
          onClick={() => handleGenerateSingle(2, 1)}
          disabled={isGenerating}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          繧ｹ繧ｿ繧､繝ｫ2-1繧堤函謌・        </button>

        <button
          onClick={() => handleGenerateSingle(3, 1)}
          disabled={isGenerating}
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
        >
          繧ｹ繧ｿ繧､繝ｫ3-1繧堤函謌・        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded whitespace-pre-line">
          <div className="font-bold mb-2">搭 逕ｻ蜒冗函謌舌・繝ｭ繝ｳ繝励ヨ・育┌譁咏沿・・/div>
          <div className="mb-3">{error}</div>
          <div className="text-sm">
            <p className="font-bold mb-1">笨・辟｡譁吶〒逕ｻ蜒冗函謌舌☆繧区婿豕・</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <a
                  href="https://replicate.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Replicate (Stable Diffusion)
                </a>{' '}
                - 辟｡譁呎棧縺ゅｊ
              </li>
              <li>
                <a
                  href="https://huggingface.co/spaces/stabilityai/stable-diffusion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Hugging Face
                </a>{' '}
                - 螳悟・辟｡譁・              </li>
              <li>
                <a
                  href="https://www.craiyon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Craiyon
                </a>{' '}
                - 螳悟・辟｡譁・              </li>
            </ul>
            <p className="mt-2 text-xs text-gray-600">
              繝励Ο繝ｳ繝励ヨ縺ｯ繧ｯ繝ｪ繝・・繝懊・繝峨↓繧ｳ繝斐・縺輔ｌ縺ｦ縺・∪縺吶ゆｸ願ｨ倥・繧ｵ繝ｼ繝薙せ縺ｫ雋ｼ繧贋ｻ倥￠縺ｦ逕滓・縺励※縺上□縺輔＞縲・            </p>
          </div>
        </div>
      )}

      {generatedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {generatedImages.map((result, index) => (
            <div key={index} className="border rounded p-2">
              <img
                src={result.url}
                alt={`繧ｹ繧ｿ繧､繝ｫ${result.style} - 繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ${result.variation}`}
                className="w-full aspect-square object-cover rounded mb-2"
              />
              <div className="text-sm text-gray-600">
                繧ｹ繧ｿ繧､繝ｫ{result.style} - 繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ{result.variation}
              </div>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                譁ｰ縺励＞繧ｿ繝悶〒髢九￥
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

