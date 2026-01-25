/**
 * CarnivoreOS - Food Category Screen
 *
 * 蟾ｨ螟ｧ繧｢繧､繧ｳ繝ｳ5縺､・育央繝ｻ雎壹・鮓上・蜊ｵ繝ｻ鬲夲ｼ峨〒鬟溷刀繧帝∈謚・ */

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { searchFoodsByCategory, type FoodData } from '../data/foodsDatabase';
import './FoodCategoryScreen.css';

type Category = 'beef' | 'pork' | 'chicken' | 'egg' | 'fish';

interface CategoryInfo {
  id: Category;
  name: string;
  emoji: string;
  color: string;
}

const CATEGORIES: CategoryInfo[] = [
  { id: 'beef', name: '迚幄ｉ', emoji: '推', color: '#8B4513' },
  { id: 'pork', name: '雎夊ｉ', emoji: '盛', color: '#FFB6C1' },
  { id: 'chicken', name: '鮓剰ｉ', emoji: '数', color: '#FFD700' },
  { id: 'egg', name: '蜊ｵ', emoji: '･・, color: '#FFF8DC' },
  { id: 'fish', name: '鬲・, emoji: '澄', color: '#4682B4' },
];

export default function FoodCategoryScreen() {
  const { addFood } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);
  const [amount, setAmount] = useState('300'); // 繧ｫ繝ｼ繝九・繧｢繧ｵ繧､繧ｺ縺ｮ繝・ヵ繧ｩ繝ｫ繝・  const [unit, setUnit] = useState<'g' | '蛟・>('g');

  const foods = selectedCategory ? searchFoodsByCategory(selectedCategory) : [];

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedFood(null);
    setAmount('300'); // 繧ｫ繝ｼ繝九・繧｢繧ｵ繧､繧ｺ縺ｮ繝・ヵ繧ｩ繝ｫ繝・    setUnit('g');
  };

  const handleFoodSelect = (food: FoodData) => {
    setSelectedFood(food);
    // 鬟溷刀縺ｫ蠢懊§縺ｦ繝・ヵ繧ｩ繝ｫ繝亥､繧定ｨｭ螳・    if (food.preferredUnit === 'piece' && food.pieceWeight) {
      setAmount('1');
      setUnit('蛟・);
    } else {
      // 繧ｫ繝ｼ繝九・繧｢繧ｵ繧､繧ｺ縺ｮ繝・ヵ繧ｩ繝ｫ繝茨ｼ医せ繝・・繧ｭ縺ｯ300g縲√・縺崎ｉ縺ｯ450g縺ｪ縺ｩ・・      if (food.id.includes('ribeye') || food.id.includes('sirloin')) {
        setAmount('300');
      } else if (food.id.includes('ground')) {
        setAmount('450'); // 1繝昴Φ繝・      } else {
        setAmount('300');
      }
      setUnit('g');
    }
  };

  const handleAddFood = () => {
    if (!selectedFood) return;

    const inputAmount = Number(amount) || (unit === '蛟・ ? 1 : 300);
    let actualAmount: number;
    let displayUnit: 'g' | '蛟・;

    if (unit === '蛟・ && selectedFood.pieceWeight) {
      actualAmount = inputAmount * selectedFood.pieceWeight;
      displayUnit = '蛟・;
    } else {
      actualAmount = inputAmount;
      displayUnit = 'g';
    }

    const ratio = actualAmount / 100;
    const foodItem = {
      item: selectedFood.name,
      amount: unit === '蛟・ ? inputAmount : actualAmount,
      unit: displayUnit,
      type: selectedFood.type,
      nutrients: {
        protein: (selectedFood.nutrientsRaw.protein || 0) * ratio,
        fat: (selectedFood.nutrientsRaw.fat || 0) * ratio,
        carbs: (selectedFood.nutrientsRaw.carbs || 0) * ratio,
        netCarbs:
          ((selectedFood.nutrientsRaw.carbs || 0) - (selectedFood.nutrientsRaw.fiber || 0)) * ratio,
        fiber: (selectedFood.nutrientsRaw.fiber || 0) * ratio,
        hemeIron: (selectedFood.nutrientsRaw.hemeIron || 0) * ratio,
        nonHemeIron: (selectedFood.nutrientsRaw.nonHemeIron || 0) * ratio,
        vitaminA: (selectedFood.nutrientsRaw.vitaminA || 0) * ratio,
        vitaminC: (selectedFood.nutrientsRaw.vitaminC || 0) * ratio,
        vitaminK: (selectedFood.nutrientsRaw.vitaminK || 0) * ratio,
        zinc: (selectedFood.nutrientsRaw.zinc || 0) * ratio,
        sodium: (selectedFood.nutrientsRaw.sodium || 0) * ratio,
        magnesium: (selectedFood.nutrientsRaw.magnesium || 0) * ratio,
        vitaminB1: (selectedFood.nutrientsRaw.vitaminB1 || 0) * ratio,
        vitaminB2: (selectedFood.nutrientsRaw.vitaminB2 || 0) * ratio,
        vitaminB3: (selectedFood.nutrientsRaw.vitaminB3 || 0) * ratio,
        vitaminB6: (selectedFood.nutrientsRaw.vitaminB6 || 0) * ratio,
        vitaminB12: (selectedFood.nutrientsRaw.vitaminB12 || 0) * ratio,
        vitaminE: (selectedFood.nutrientsRaw.vitaminE || 0) * ratio,
        calcium: (selectedFood.nutrientsRaw.calcium || 0) * ratio,
        phosphorus: (selectedFood.nutrientsRaw.phosphorus || 0) * ratio,
        selenium: (selectedFood.nutrientsRaw.selenium || 0) * ratio,
        copper: (selectedFood.nutrientsRaw.copper || 0) * ratio,
        manganese: (selectedFood.nutrientsRaw.manganese || 0) * ratio,
      },
    };

    addFood(foodItem);
    // 繝ｪ繧ｻ繝・ヨ
    setSelectedCategory(null);
    setSelectedFood(null);
    setAmount('300');
    setUnit('g');
  };

  if (!selectedCategory) {
    return (
      <div className="food-category-screen">
        <div className="food-category-grid">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className="food-category-button"
              onClick={() => handleCategorySelect(category.id)}
              style={{ backgroundColor: category.color }}
            >
              <span className="food-category-emoji">{category.emoji}</span>
              <span className="food-category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="food-category-screen">
      <button
        className="food-category-back"
        onClick={() => {
          setSelectedCategory(null);
          setSelectedFood(null);
        }}
      >
        竊・謌ｻ繧・      </button>
      <h2 className="food-category-title">
        {CATEGORIES.find((c) => c.id === selectedCategory)?.name}繧帝∈謚・      </h2>
      <div className="food-category-list">
        {foods.map((food) => (
          <button
            key={food.id}
            className={`food-item-button ${selectedFood?.id === food.id ? 'active' : ''}`}
            onClick={() => handleFoodSelect(food)}
          >
            <span className="food-item-name">{food.name}</span>
            <span className="food-item-type">{food.type}</span>
          </button>
        ))}
      </div>
      {selectedFood && (
        <div className="food-category-input">
          <div className="food-category-amount-row">
            <input
              type="number"
              className="food-category-amount-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step={unit === '蛟・ ? '1' : '1'}
            />
            <select
              className="food-category-unit-select"
              value={unit}
              onChange={(e) => {
                const newUnit = e.target.value as 'g' | '蛟・;
                setUnit(newUnit);
                if (newUnit === '蛟・) {
                  setAmount('1');
                } else {
                  setAmount('300');
                }
              }}
            >
              <option value="g">g</option>
              <option value="蛟・>蛟・/option>
            </select>
          </div>
          <button className="food-category-add-button" onClick={handleAddFood}>
            霑ｽ蜉
          </button>
        </div>
      )}
    </div>
  );
}

