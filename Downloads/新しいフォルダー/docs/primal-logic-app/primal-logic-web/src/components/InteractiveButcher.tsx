/**
 * CarnivoreOS - Interactive Butcher Component
 *
 * クリチE��ブルSVG解剖図: 牛�E豚�E鶏などの部位を直接タチE�Eして選抁E */

import { useState, useEffect, useMemo } from 'react';
import {
  getFoodsByPart,
  type AnimalType,
  type PartLocation,
  type DeepFoodItem,
} from '../data/deepNutritionData';
import { getRecommendedAmount } from '../utils/foodHistory';
import { useApp } from '../context/AppContext';
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import {
  getMissingNutrients,
  isRecommendedFood,
  sortFoodsByRecommendation,
} from '../utils/foodRecommendation';
import InteractiveChicken from './InteractiveChicken';
import './InteractiveButcher.css';

interface InteractiveButcherProps {
  animalType: AnimalType;
  onFoodSelect: (food: DeepFoodItem, amount: number, unit: 'g' | '倁E) => void;
  onBack: () => void;
}

// Part mapping (SVG part name ↁEPartLocation)
const PART_MAPPING: Record<string, PartLocation> = {
  ribeye: 'rib',
  belly: 'belly',
  rump: 'leg',
  chuck: 'rib',
  internal: 'internal',
  body: 'body',
  whole: 'whole',
};

export default function InteractiveButcher({
  animalType,
  onFoodSelect,
  onBack,
}: InteractiveButcherProps) {
  const { dailyLog, userProfile } = useApp();
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<DeepFoodItem | null>(null);
  const [amount, setAmount] = useState(300);
  const [unit, setUnit] = useState<'g' | '倁E>('g');
  const [packSize, setPackSize] = useState(300);
  const [portion, setPortion] = useState<number | null>(null);

  const handlePartClick = (partName: string) => {
    setSelectedPart(partName);
    setSelectedFood(null);
  };

  const partLocation = selectedPart ? PART_MAPPING[selectedPart] : null;
  const availableFoodsRaw = partLocation ? getFoodsByPart(animalType, partLocation) : [];

  // 不足栄養素を検出
  const missingNutrients = useMemo(() => {
    if (!dailyLog?.calculatedMetrics || !userProfile) return [];
    const targets = getCarnivoreTargets(
      userProfile.gender,
      userProfile.age,
      userProfile.activityLevel,
      userProfile.isPregnant,
      userProfile.isBreastfeeding,
      userProfile.isPostMenopause,
      userProfile.stressLevel,
      userProfile.sleepHours,
      userProfile.exerciseIntensity,
      userProfile.exerciseFrequency,
      userProfile.thyroidFunction,
      userProfile.sunExposureFrequency,
      userProfile.digestiveIssues,
      userProfile.inflammationLevel
    );
    return getMissingNutrients(dailyLog.calculatedMetrics, targets);
  }, [dailyLog?.calculatedMetrics, userProfile]);

  // 推奨度でソート
  const availableFoods = useMemo(() => {
    return sortFoodsByRecommendation(availableFoodsRaw, missingNutrients);
  }, [availableFoodsRaw, missingNutrients]);

  // Get history recommendation when food is selected
  useEffect(() => {
    if (selectedFood) {
      getRecommendedAmount(
        selectedFood.name_ja,
        selectedFood.part_location,
        selectedFood.animal_type
      ).then((recommended) => {
        setAmount(recommended.amount);
        setUnit(recommended.unit);
        if (recommended.unit === 'g') {
          setPackSize(recommended.amount);
        }
      });
    }
  }, [selectedFood]);

  const handleFoodClick = (food: DeepFoodItem) => {
    setSelectedFood(food);
  };

  const handleConfirm = () => {
    if (selectedFood) {
      onFoodSelect(selectedFood, amount, unit);
    }
  };

  // Smart presets per part
  const getSmartPresets = (): number[] => {
    if (animalType === 'egg') {
      return [2, 3, 5];
    }
    if (partLocation === 'internal') {
      return [100, 150, 200];
    }
    return [200, 300, 450];
  };

  // Pack & Portion calculation
  useEffect(() => {
    if (portion !== null && unit === 'g') {
      const calculatedAmount = Math.round(packSize * portion);
      setAmount(calculatedAmount);
    }
  }, [packSize, portion, unit]);

  // Render SVG based on animal type
  const renderSVG = () => {
    switch (animalType) {
      case 'beef':
        return <BeefSVG selectedPart={selectedPart} onSelectPart={handlePartClick} />;
      case 'pork':
        return <PorkSVG selectedPart={selectedPart} onSelectPart={handlePartClick} />;
      case 'chicken':
        return <ChickenSVG selectedPart={selectedPart} onSelectPart={handlePartClick} />;
      case 'egg':
        return <EggSVG selectedPart={selectedPart} onSelectPart={handlePartClick} />;
      case 'fish':
        return <FishSVG selectedPart={selectedPart} onSelectPart={handlePartClick} />;
      default:
        return <div>SVG for this animal type is not yet implemented</div>;
    }
  };

  return (
    <div className="interactive-butcher-container">
      <button className="interactive-butcher-back" onClick={onBack}>
        ↁEBack
      </button>

      <h2 className="interactive-butcher-title">
        Select {animalType === 'beef'
          ? 'Beef'
          : animalType === 'pork'
            ? 'Pork'
            : animalType === 'chicken'
              ? 'Chicken'
              : animalType === 'egg'
                ? 'Egg'
                : animalType === 'fish'
                  ? 'Fish'
                  : animalType === 'lamb'
                    ? 'Lamb/Goat'
                    : animalType === 'duck'
                      ? 'Poultry'
                      : animalType === 'game'
                        ? 'Game'
                        : 'Animal'} Part
      </h2>

      {/* SVG anatomy diagram */}
      <div className="interactive-butcher-svg-container">
        {renderSVG()}
        <p className="interactive-butcher-hint">Tap parts directly on the diagram to select</p>
      </div>

      {/* Food list for selected part */}
      {selectedPart && availableFoods.length > 0 && !selectedFood && (
        <div className="interactive-butcher-foods-list">
          <h3 className="interactive-butcher-foods-title">Available Foods:</h3>
          {availableFoods.map((food) => {
            const recommendation = isRecommendedFood(food, missingNutrients, 300);
            return (
            <button
              key={food.id}
              className={`interactive-butcher-food-button ${
                recommendation.isRecommended ? 'recommended' : ''
              } ${recommendation.priority === 'high' ? 'recommended-high' : ''} ${
                recommendation.priority === 'medium' ? 'recommended-medium' : ''
              }`}
              onClick={() => handleFoodClick(food)}
              style={{ position: 'relative' }}
            >
              {recommendation.isRecommended && (
                <div className="interactive-butcher-food-badge">
                  ⭐ {recommendation.reason}
                </div>
              )}
              <div className="interactive-butcher-food-name">{food.name_ja}</div>
              <div className="interactive-butcher-food-verdict">{food.primal_verdict}</div>
              <div className="interactive-butcher-food-stats">
                <span>タンパク質: {food.protein}g</span>
                <span>脂質: {food.fat}g</span>
                <span>飽和脂肪酸�E�善�E�E {food.saturated_fat}g</span>
                <span>オメガ6�E�炎痁E��意！E {food.omega_6}g</span>
                <span>亜鉛: {food.zinc}mg</span>
                <span>ビタミンB12: {food.vitamin_b12}μg</span>
              </div>
            </button>
            );
          })}
        </div>
      )}

      {/* Quantity input UI (after food selection) */}
      {selectedFood && (
        <div className="interactive-butcher-quantity-panel">
          <div className="interactive-butcher-quantity-header">
            <h3>Select quantity for {selectedFood.name_ja}</h3>
            <button
              className="interactive-butcher-back-button"
              onClick={() => setSelectedFood(null)}
            >
              ↁEBack
            </button>
          </div>

          {/* A. Smart presets */}
          <div className="interactive-butcher-presets">
            <h4>Standard Amount:</h4>
            <div className="interactive-butcher-preset-buttons">
              {getSmartPresets().map((preset) => (
                <button
                  key={preset}
                  className={`interactive-butcher-preset-button ${amount === preset && unit === (animalType === 'egg' ? '倁E : 'g') ? 'active' : ''}`}
                  onClick={() => {
                    setAmount(preset);
                    setUnit(animalType === 'egg' ? '倁E : 'g');
                    setPortion(null);
                  }}
                >
                  {preset}
                  {animalType === 'egg' ? '倁E : 'g'}
                </button>
              ))}
            </div>
          </div>

          {/* B. Pack & Portion slider (only for g unit) */}
          {unit === 'g' && (
            <div className="interactive-butcher-pack-portion">
              <h4>Pack & Portion:</h4>
              <div className="interactive-butcher-pack-slider">
                <label>Total pack size: {packSize}g</label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={packSize}
                  onChange={(e) => {
                    setPackSize(Number(e.target.value));
                    setPortion(null);
                  }}
                  className="interactive-butcher-slider"
                />
              </div>
              <div className="interactive-butcher-portion-buttons">
                <button
                  className={`interactive-butcher-portion-button ${portion === 0.25 ? 'active' : ''}`}
                  onClick={() => setPortion(0.25)}
                >
                  1/4
                </button>
                <button
                  className={`interactive-butcher-portion-button ${portion === 0.5 ? 'active' : ''}`}
                  onClick={() => setPortion(0.5)}
                >
                  Half
                </button>
                <button
                  className={`interactive-butcher-portion-button ${portion === 1 ? 'active' : ''}`}
                  onClick={() => setPortion(1)}
                >
                  All
                </button>
                <button
                  className={`interactive-butcher-portion-button ${portion === 2 ? 'active' : ''}`}
                  onClick={() => setPortion(2)}
                >
                  x2 (2 packs)
                </button>
              </div>
              {portion !== null && (
                <div className="interactive-butcher-calculated-amount">
                  Calculated: {Math.round(packSize * portion)}g
                </div>
              )}
            </div>
          )}

          {/* Piece count input (for eggs) */}
          {unit === '倁E && animalType === 'egg' && (
            <div className="interactive-butcher-piece-input">
              <h4>Count:</h4>
              <div className="interactive-butcher-piece-buttons">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((count) => (
                  <button
                    key={count}
                    className={`interactive-butcher-piece-button ${amount === count ? 'active' : ''}`}
                    onClick={() => setAmount(count)}
                  >
                    {count} pieces
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Confirm button */}
          <button className="interactive-butcher-confirm-button" onClick={handleConfirm}>
            Add {selectedFood.name_ja} {amount}
            {unit}
          </button>
        </div>
      )}

      {selectedPart && availableFoods.length === 0 && (
        <div className="interactive-butcher-empty">No data available for this part yet</div>
      )}
    </div>
  );
}

// Beef SVG
function BeefSVG({
  selectedPart,
  onSelectPart,
}: {
  selectedPart: string | null;
  onSelectPart: (part: string) => void;
}) {
  return (
    <svg viewBox="0 0 500 300" className="interactive-butcher-svg">
      <g stroke="white" strokeWidth="2">
        {/* 1. Ribeye / Loin (back side) */}
        <path
          d="M120,60 Q200,50 300,60 L320,130 L120,130 Z"
          fill={selectedPart === 'ribeye' ? '#ff6b6b' : '#e11d48'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('ribeye')}
        />
        <text x="220" y="100" fill="white" fontSize="14" textAnchor="middle" pointerEvents="none">
          Ribeye
        </text>

        {/* 2. Belly / Brisket (belly side) */}
        <path
          d="M130,132 L310,132 L300,200 Q200,210 140,200 Z"
          fill={selectedPart === 'belly' ? '#ff6b6b' : '#be123c'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('belly')}
        />
        <text x="220" y="170" fill="white" fontSize="14" textAnchor="middle" pointerEvents="none">
          Belly
        </text>

        {/* 3. Rump / Leg (rear side) */}
        <path
          d="M302,60 Q380,65 420,100 L420,190 L312,130 L322,60 Z"
          fill={selectedPart === 'rump' ? '#ff6b6b' : '#9f1239'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('rump')}
        />
        <text x="370" y="120" fill="white" fontSize="14" textAnchor="middle" pointerEvents="none">
          Rump
        </text>

        {/* 4. Shoulder / Chuck (neck side) */}
        <path
          d="M40,90 Q80,50 118,60 L118,130 L128,132 L138,200 L50,180 Z"
          fill={selectedPart === 'chuck' ? '#ff6b6b' : '#881337'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('chuck')}
        />
        <text x="90" y="140" fill="white" fontSize="14" textAnchor="middle" pointerEvents="none">
          Chuck
        </text>

        {/* 5. Organs */}
        <circle
          cx="220"
          cy="165"
          r="25"
          fill={selectedPart === 'internal' ? '#ff6b6b' : '#7f1d1d'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('internal')}
        />
        <text x="220" y="170" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
          Organs
        </text>
      </g>
    </svg>
  );
}

// Pork SVG
function PorkSVG({
  selectedPart,
  onSelectPart,
}: {
  selectedPart: string | null;
  onSelectPart: (part: string) => void;
}) {
  return (
    <svg viewBox="0 0 500 300" className="interactive-butcher-svg">
      <g stroke="white" strokeWidth="2">
        {/* Loin */}
        <path
          d="M120,60 Q200,50 300,60 L320,130 L120,130 Z"
          fill={selectedPart === 'ribeye' ? '#ffb3ba' : '#ff6b9d'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('ribeye')}
        />
        <text x="220" y="100" fill="white" fontSize="14" textAnchor="middle" pointerEvents="none">
          Loin
        </text>

        {/* Belly */}
        <path
          d="M130,132 L310,132 L300,200 Q200,210 140,200 Z"
          fill={selectedPart === 'belly' ? '#ffb3ba' : '#ff4d8a'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('belly')}
        />
        <text x="220" y="170" fill="white" fontSize="14" textAnchor="middle" pointerEvents="none">
          Belly
        </text>

        {/* Leg */}
        <path
          d="M302,60 Q380,65 420,100 L420,190 L312,130 L322,60 Z"
          fill={selectedPart === 'rump' ? '#ffb3ba' : '#ff1f6b'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('rump')}
        />
        <text x="370" y="120" fill="white" fontSize="14" textAnchor="middle" pointerEvents="none">
          Leg
        </text>

        {/* Organs */}
        <circle
          cx="220"
          cy="165"
          r="25"
          fill={selectedPart === 'internal' ? '#ffb3ba' : '#cc0052'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('internal')}
        />
        <text x="220" y="170" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
          Organs
        </text>
      </g>
    </svg>
  );
}

// Chicken SVG (uses InteractiveChicken.tsx)
function ChickenSVG({
  selectedPart,
  onSelectPart,
}: {
  selectedPart: string | null;
  onSelectPart: (part: string) => void;
}) {
  // Part name mapping (InteractiveChicken part name ↁEPartLocation)
  const handlePartSelect = (part: string) => {
    const partMapping: Record<string, string> = {
      breast: 'body',
      thigh: 'leg',
      wing: 'body',
      liver: 'internal',
    };
    onSelectPart(partMapping[part] || part);
  };

  return (
    <InteractiveChicken
      selectedPart={
        selectedPart === 'body'
          ? 'breast'
          : selectedPart === 'leg'
            ? 'thigh'
            : selectedPart === 'internal'
              ? 'liver'
              : selectedPart
      }
      onSelectPart={handlePartSelect}
    />
  );
}

// Egg SVG
function EggSVG({
  selectedPart,
  onSelectPart,
}: {
  selectedPart: string | null;
  onSelectPart: (part: string) => void;
}) {
  return (
    <svg viewBox="0 0 500 300" className="interactive-butcher-svg">
      <g stroke="white" strokeWidth="2">
        {/* Whole egg */}
        <ellipse
          cx="250"
          cy="150"
          rx="80"
          ry="100"
          fill={selectedPart === 'whole' ? '#fff8dc' : '#f5deb3'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('whole')}
        />
        <text
          x="250"
          y="155"
          fill="#333"
          fontSize="16"
          textAnchor="middle"
          pointerEvents="none"
          fontWeight="bold"
        >
          Whole Egg
        </text>
      </g>
    </svg>
  );
}

// Fish SVG
function FishSVG({
  selectedPart,
  onSelectPart,
}: {
  selectedPart: string | null;
  onSelectPart: (part: string) => void;
}) {
  return (
    <svg viewBox="0 0 500 300" className="interactive-butcher-svg">
      <g stroke="white" strokeWidth="2">
        {/* Flesh */}
        <path
          d="M100,150 Q200,100 300,150 Q200,200 100,150 Z"
          fill={selectedPart === 'body' ? '#87ceeb' : '#4682b4'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('body')}
        />
        <text x="200" y="150" fill="white" fontSize="14" textAnchor="middle" pointerEvents="none">
          Flesh
        </text>

        {/* Organs */}
        <circle
          cx="200"
          cy="150"
          r="20"
          fill={selectedPart === 'internal' ? '#87ceeb' : '#2e5c8a'}
          className="interactive-butcher-path"
          onClick={() => onSelectPart('internal')}
        />
        <text x="200" y="155" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
          Organs
        </text>
      </g>
    </svg>
  );
}

