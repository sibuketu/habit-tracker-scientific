/**
 * CarnivoreOS - Butcher Chart Component
 *
 * ビジュアル�E�解剖図�E�選抁E 牛�E豚�E鶏�E部位をクリチE��で選抁E * 数量�E劁E スマ�Eト�EリセチE�� + Pack & Portion スライダー
 */

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
import './ButcherChart.css';

interface ButcherChartProps {
  animalType: AnimalType;
  onFoodSelect: (food: DeepFoodItem, amount: number, unit: 'g' | '倁E) => void;
  onBack: () => void;
}

// 部位�E定義�E�EVG座標また�EクリチE��ブルマップ用�E�Econst PART_AREAS: Record<
  AnimalType,
  Array<{ location: PartLocation; label: string; foods: string[] }>
> = {
  beef: [
    { location: 'rib', label: '背中', foods: ['beef_ribeye'] },
    { location: 'belly', label: 'お�E', foods: ['beef_belly'] },
    { location: 'leg', label: 'もも', foods: [] },
    { location: 'internal', label: '冁E��', foods: [] },
  ],
  pork: [
    { location: 'rib', label: 'ロース', foods: [] },
    { location: 'belly', label: 'バラ', foods: ['pork_belly'] },
    { location: 'leg', label: 'もも', foods: [] },
    { location: 'internal', label: '冁E��', foods: [] },
  ],
  chicken: [
    { location: 'body', label: '胸肁E, foods: [] },
    { location: 'leg', label: 'もも', foods: [] },
    { location: 'internal', label: '冁E��', foods: ['chicken_liver'] },
    { location: 'whole', label: '丸ごと', foods: [] },
  ],
  egg: [{ location: 'whole', label: '全卵', foods: [] }],
  fish: [
    { location: 'body', label: '身', foods: ['salmon'] },
    { location: 'internal', label: '冁E��', foods: [] },
  ],
  lamb: [
    { location: 'rib', label: 'ラムチョチE�E', foods: [] },
    { location: 'leg', label: 'もも', foods: [] },
    { location: 'internal', label: '冁E��', foods: [] },
  ],
  duck: [
    { location: 'body', label: '胸肁E, foods: [] },
    { location: 'leg', label: 'もも', foods: [] },
    { location: 'internal', label: '冁E��', foods: [] },
  ],
  game: [
    { location: 'body', label: '肁E, foods: [] },
    { location: 'leg', label: 'もも', foods: [] },
    { location: 'internal', label: '冁E��', foods: [] },
  ],
};

export default function ButcherChart({ animalType, onFoodSelect, onBack }: ButcherChartProps) {
  const [selectedPart, setSelectedPart] = useState<PartLocation | null>(null);
  const [selectedFood, setSelectedFood] = useState<DeepFoodItem | null>(null);
  const [amount, setAmount] = useState(300);
  const [unit, setUnit] = useState<'g' | '倁E>('g');
  const [packSize, setPackSize] = useState(300); // パックの総量
  const [portion, setPortion] = useState<number | null>(null); // 割合！E/4, 1/2, 1, 2など�E�E
  const parts = PART_AREAS[animalType] || [];
  const availableFoodsRaw = selectedPart ? getFoodsByPart(animalType, selectedPart) : [];

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

  // 食品選択時にヒストリーレコメンドを取征E  useEffect(() => {
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

  // 部位ごとのスマ�Eト�EリセチE��
  const getSmartPresets = (): number[] => {
    if (animalType === 'egg') {
      return [2, 3, 5];
    }
    if (selectedPart === 'internal') {
      return [100, 150, 200];
    }
    return [200, 300, 450]; // 肉類�E標準量
  };

  // Pack & Portion計箁E  useEffect(() => {
    if (portion !== null && unit === 'g') {
      const calculatedAmount = Math.round(packSize * portion);
      setAmount(calculatedAmount);
    }
  }, [packSize, portion, unit]);

  const handlePartClick = (location: PartLocation) => {
    setSelectedPart(location);
  };

  const handleFoodClick = (food: DeepFoodItem) => {
    setSelectedFood(food);
    // 食品選択時は数量�E力画面に移行（モーダルまた�E下部パネル�E�E  };

  const handleConfirm = () => {
    if (selectedFood) {
      onFoodSelect(selectedFood, amount, unit);
    }
  };

  return (
    <div className="butcher-chart-container">
      <button className="butcher-chart-back" onClick={onBack}>
        ↁE戻めE      </button>
      <h2 className="butcher-chart-title">
        {animalType === 'beef'
          ? '牛肉'
          : animalType === 'pork'
            ? '豚肉'
            : animalType === 'chicken'
              ? '鶏肉'
              : animalType === 'egg'
                ? '卵'
                : animalType === 'fish'
                  ? '魁E
                  : animalType === 'lamb'
                    ? '羁E山羁E
                    : animalType === 'duck'
                      ? '鳥顁E
                      : animalType === 'game'
                        ? 'ゲーム'
                        : '動物'}
        の部位を選抁E      </h2>

      {/* 簡易的な部位選択UI�E�封E��皁E��SVGクリチE��ブルマップに置き換え！E*/}
      <div className="butcher-chart-parts-grid">
        {parts.map((part) => (
          <button
            key={part.location}
            className={`butcher-chart-part-button ${selectedPart === part.location ? 'active' : ''}`}
            onClick={() => handlePartClick(part.location)}
          >
            <div className="butcher-chart-part-label">{part.label}</div>
            {part.foods.length > 0 && (
              <div className="butcher-chart-part-count">{part.foods.length}種顁E/div>
            )}
          </button>
        ))}
      </div>

      {/* 選択した部位�E食品リスチE*/}
      {selectedPart && availableFoods.length > 0 && !selectedFood && (
        <div className="butcher-chart-foods-list">
          <h3 className="butcher-chart-foods-title">選択可能な食品:</h3>
          {availableFoods.map((food) => {
            const recommendation = isRecommendedFood(food, missingNutrients, 300);
            return (
            <button
              key={food.id}
              className={`butcher-chart-food-button ${
                recommendation.isRecommended ? 'recommended' : ''
              } ${recommendation.priority === 'high' ? 'recommended-high' : ''} ${
                recommendation.priority === 'medium' ? 'recommended-medium' : ''
              }`}
              onClick={() => handleFoodClick(food)}
              style={{ position: 'relative' }}
            >
              {recommendation.isRecommended && (
                <div className="butcher-chart-food-badge">
                  ⭐ {recommendation.reason}
                </div>
              )}
              <div className="butcher-chart-food-name">{food.name_ja}</div>
              <div className="butcher-chart-food-verdict">{food.primal_verdict}</div>
              <div className="butcher-chart-food-stats">
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

      {/* 数量�E力UI�E�食品選択後！E*/}
      {selectedFood && (
        <div className="butcher-chart-quantity-panel">
          <div className="butcher-chart-quantity-header">
            <h3>{selectedFood.name_ja} の数量を選抁E/h3>
            <button className="butcher-chart-back-button" onClick={() => setSelectedFood(null)}>
              ↁE戻めE            </button>
          </div>

          {/* A. スマ�Eト�EリセチE�� */}
          <div className="butcher-chart-presets">
            <h4>標準量:</h4>
            <div className="butcher-chart-preset-buttons">
              {getSmartPresets().map((preset) => (
                <button
                  key={preset}
                  className={`butcher-chart-preset-button ${amount === preset && unit === (animalType === 'egg' ? '倁E : 'g') ? 'active' : ''}`}
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

          {/* B. Pack & Portion スライダー�E�E単位�E場合�Eみ�E�E*/}
          {unit === 'g' && (
            <div className="butcher-chart-pack-portion">
              <h4>パック & 割吁E</h4>
              <div className="butcher-chart-pack-slider">
                <label>パックの総量: {packSize}g</label>
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
                  className="butcher-chart-slider"
                />
              </div>
              <div className="butcher-chart-portion-buttons">
                <button
                  className={`butcher-chart-portion-button ${portion === 0.25 ? 'active' : ''}`}
                  onClick={() => setPortion(0.25)}
                >
                  1/4
                </button>
                <button
                  className={`butcher-chart-portion-button ${portion === 0.5 ? 'active' : ''}`}
                  onClick={() => setPortion(0.5)}
                >
                  Half
                </button>
                <button
                  className={`butcher-chart-portion-button ${portion === 1 ? 'active' : ''}`}
                  onClick={() => setPortion(1)}
                >
                  All (全部)
                </button>
                <button
                  className={`butcher-chart-portion-button ${portion === 2 ? 'active' : ''}`}
                  onClick={() => setPortion(2)}
                >
                  x2 (2パック)
                </button>
              </div>
              {portion !== null && (
                <div className="butcher-chart-calculated-amount">
                  計算結果: {Math.round(packSize * portion)}g
                </div>
              )}
            </div>
          )}

          {/* 個数入力（卵の場合！E*/}
          {unit === '倁E && animalType === 'egg' && (
            <div className="butcher-chart-piece-input">
              <h4>個数:</h4>
              <div className="butcher-chart-piece-buttons">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((count) => (
                  <button
                    key={count}
                    className={`butcher-chart-piece-button ${amount === count ? 'active' : ''}`}
                    onClick={() => setAmount(count)}
                  >
                    {count}倁E                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 確認�Eタン */}
          <button className="butcher-chart-confirm-button" onClick={handleConfirm}>
            {selectedFood.name_ja} {amount}
            {unit} を追加
          </button>
        </div>
      )}

      {selectedPart && availableFoods.length === 0 && (
        <div className="butcher-chart-empty">こ�E部位�EチE�Eタはまだありません</div>
      )}
    </div>
  );
}

