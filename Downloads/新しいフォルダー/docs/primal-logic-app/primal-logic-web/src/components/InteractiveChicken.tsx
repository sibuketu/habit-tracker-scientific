/**
 * CarnivoreOS - Interactive Chicken Component
 *
 * 繧ｯ繝ｪ繝・き繝悶ΝSVG隗｣蜑門峙: 鮓上・驛ｨ菴阪ｒ逶ｴ謗･繧ｿ繝・・縺励※驕ｸ謚・ * 繝・じ繧､繝ｳ縺ｮ繝医・繝ｳ・・・繝翫・縺ｯ迚幢ｼ・nteractiveCow・峨→蜷後§
 */

import './InteractiveButcher.css';

interface InteractiveChickenProps {
  selectedPart: string | null;
  onSelectPart: (part: string) => void;
}

export default function InteractiveChicken({
  selectedPart,
  onSelectPart,
}: InteractiveChickenProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">驛ｨ菴阪ｒ繧ｿ繝・・縺励※縺上□縺輔＞</h2>

      <svg
        viewBox="0 0 500 300"
        className="w-full h-auto drop-shadow-xl cursor-pointer interactive-butcher-svg"
      >
        {/* Chicken silhouette definition */}
        <g stroke="white" strokeWidth="2">
          {/* 1. Breast */}
          <path
            d="M150,80 Q200,60 250,80 L260,150 L150,150 Z"
            fill={selectedPart === 'breast' ? '#ff6b6b' : '#e11d48'}
            className="interactive-butcher-path"
            onClick={() => onSelectPart('breast')}
          />
          <text
            x="205"
            y="120"
            fill="white"
            fontSize="14"
            textAnchor="middle"
            pointerEvents="none"
            fontWeight="bold"
          >
            Breast
          </text>

          {/* 2. Thigh */}
          <path
            d="M260,80 Q320,85 360,120 L360,200 L260,150 Z"
            fill={selectedPart === 'thigh' ? '#ff6b6b' : '#be123c'}
            className="interactive-butcher-path"
            onClick={() => onSelectPart('thigh')}
          />
          <text
            x="310"
            y="150"
            fill="white"
            fontSize="14"
            textAnchor="middle"
            pointerEvents="none"
            fontWeight="bold"
          >
            Thigh
          </text>

          {/* 3. Wing */}
          <path
            d="M100,100 Q120,70 140,90 L145,130 L100,130 Z"
            fill={selectedPart === 'wing' ? '#ff6b6b' : '#9f1239'}
            className="interactive-butcher-path"
            onClick={() => onSelectPart('wing')}
          />
          <text
            x="120"
            y="110"
            fill="white"
            fontSize="12"
            textAnchor="middle"
            pointerEvents="none"
            fontWeight="bold"
          >
            Wing
          </text>

          {/* 4. Liver - Organ */}
          <circle
            cx="205"
            cy="165"
            r="25"
            fill={selectedPart === 'liver' ? '#ff6b6b' : '#881337'}
            className="interactive-butcher-path"
            onClick={() => onSelectPart('liver')}
          />
          <text
            x="205"
            y="170"
            fill="white"
            fontSize="12"
            textAnchor="middle"
            pointerEvents="none"
            fontWeight="bold"
          >
            繝ｬ繝舌・
          </text>
        </g>
      </svg>

      <p className="text-center text-gray-500 mt-4 text-sm interactive-butcher-hint">
        蝗ｳ縺ｮ驛ｨ菴阪ｒ逶ｴ謗･繧ｿ繝・・縺励※驕ｸ謚・      </p>
    </div>
  );
}

