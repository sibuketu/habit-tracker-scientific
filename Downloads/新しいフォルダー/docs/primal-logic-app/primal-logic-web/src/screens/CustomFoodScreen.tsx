/**
 * Primal Logic - Custom Food Screen
 * 
 * Phase 2: カスタム食品機能（半自動）
 * 食品名を入力 → AI推測 → ユーザー修正 → 保存
 */

import { useState, useEffect } from 'react';
import { analyzeFoodName } from '../services/aiService';
import { addCustomFood, updateCustomFood, getCustomFoodById, type MyFoodItem } from '../utils/myFoodsStorage';
import { getRandomTip, getRandomTipExcluding, type Tip } from '../data/tips';
import { saveTip, unsaveTip, isTipSaved } from '../utils/savedTips';
import { useTranslation } from '../utils/i18n';
import { useApp } from '../context/AppContext';
import MiniNutrientGauge from '../components/MiniNutrientGauge';
import type { FoodItem } from '../types';
import './CustomFoodScreen.css';

interface CustomFoodScreenProps {
  foodId?: string; // 編集モードの場合
  onClose: () => void;
  onSave?: () => void;
}

export default function CustomFoodScreen({ foodId, onClose, onSave }: CustomFoodScreenProps) {
  const { t } = useTranslation();
  const { addFood } = useApp();
  const [foodName, setFoodName] = useState('');
  const [displayName, setDisplayName] = useState(''); // 登録名
  const [type, setType] = useState<'animal' | 'trash' | 'ruminant' | 'dairy'>('animal');
  const [nutrients, setNutrients] = useState<MyFoodItem['nutrients']>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAdvancedNutrients, setShowAdvancedNutrients] = useState(false); // UI表示ON/OFF（デフォルトOFF）
  const [showAdvancedAntiNutrients, setShowAdvancedAntiNutrients] = useState(false); // 抗栄養素詳細表示ON/OFF（デフォルトOFF）
  const [aiFollowupQuestions, setAiFollowupQuestions] = useState<string[]>([]); // AI追加質問
  const [showFollowupInput, setShowFollowupInput] = useState(false); // 追加質問入力表示
  const [followupAnswers, setFollowupAnswers] = useState<Record<string, string>>({}); // 追加質問への回答
  const [loadingTip, setLoadingTip] = useState<Tip | null>(null); // ローディング中のTips
  const [isTipSavedState, setIsTipSavedState] = useState(false); // Tipsの保存状態
  const [addToTodayLog, setAddToTodayLog] = useState(false); // 今日のログに追加するかどうか
  const [previousTips, setPreviousTips] = useState<Tip[]>([]); // Tips履歴管理

  // 編集モードの場合、既存データを読み込む
  useEffect(() => {
    if (foodId) {
      const existingFood = getCustomFoodById(foodId);
      if (existingFood) {
        setFoodName(existingFood.foodName);
        setDisplayName(existingFood.displayName || existingFood.foodName);
        setType((existingFood.type === 'plant' ? 'animal' : existingFood.type) || 'animal');
        setNutrients(existingFood.nutrients || {});
      }
    }
  }, [foodId]);


  // 食品名から栄養素を推測（半自動）
  const handleAnalyze = async () => {
    if (!foodName.trim()) {
      setError(t('customFood.enterFoodName'));
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    // ローディング中のTipsを表示
    // 現在のTipsを履歴に追加（戻るボタン用）
    if (loadingTip) {
      setPreviousTips(prev => [...prev, loadingTip]);
    }
    const randomTip = loadingTip ? getRandomTipExcluding(loadingTip.id) : getRandomTip();
    setLoadingTip(randomTip);
    setIsTipSavedState(isTipSaved(randomTip.id));

    try {
      const result = await analyzeFoodName(foodName, Object.keys(followupAnswers).length > 0 ? followupAnswers : undefined);
      setFoodName(result.foodName);
      setType(result.type === 'plant' ? 'animal' : result.type);
      setNutrients(result.nutrients || {});
      
      // 追加質問がある場合は表示
      if (result.followupQuestions && result.followupQuestions.length > 0) {
        setAiFollowupQuestions(result.followupQuestions);
        setShowFollowupInput(true);
      } else {
        setAiFollowupQuestions([]);
        setShowFollowupInput(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('customFood.analyzeFailed'));
    } finally {
      setIsAnalyzing(false);
      setLoadingTip(null); // ローディング終了時にTipsを非表示
    }
  };

  // 保存
  const handleSave = () => {
    if (!foodName.trim()) {
      setError(t('customFood.enterFoodName'));
      return;
    }

    try {
      const customFood: MyFoodItem = {
        foodName,
        displayName: displayName || foodName, // 登録名が空の場合は食品名を使用
        amount: 100, // デフォルト値（100gあたりの栄養素データ）
        unit: 'g',
        type,
        nutrients,
      };

      if (foodId) {
        // 更新
        updateCustomFood(foodId, customFood);
      } else {
        // 新規追加
        addCustomFood(customFood);
      }

      // 今日のログに追加する場合
      if (addToTodayLog) {
        const foodItem: FoodItem = {
          item: displayName || foodName,
          amount: 100, // デフォルト100g
          unit: 'g',
          type,
          nutrients: nutrients as FoodItem['nutrients'],
        };
        addFood(foodItem);
        // 履歴更新を確実にするため、少し遅延させてからイベントを発火
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('dailyLogUpdated'));
        }, 200);
      }

      onSave?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('customFood.saveFailed'));
    }
  };

  // 栄養素の値を更新
  const updateNutrient = (key: keyof NonNullable<MyFoodItem['nutrients']>, value: number | undefined) => {
    setNutrients(prev => ({
      ...prev,
      [key]: value === undefined || value === 0 ? undefined : value,
    }));
  };

  return (
    <div className="custom-food-screen">
      <div className="custom-food-content">
        <div className="custom-food-header">
          <h2>{foodId ? t('customFood.edit') : t('customFood.add')}</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        {error && (
          <div className="error-message" style={{ color: '#dc2626', padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        {/* 食品名入力とAI推測 */}
        <div className="custom-food-section">
          <label>
            <strong>{t('customFood.foodName')}</strong>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
              {t('customFood.foodNameDescription')}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="text"
                value={foodName}
                onChange={(e) => {
                  const newFoodName = e.target.value;
                  setFoodName(newFoodName);
                  // 食品名と登録名を常に同期
                  setDisplayName(newFoodName);
                }}
                placeholder={t('customFood.foodNamePlaceholder')}
                style={{ flex: 1, padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !foodName.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isAnalyzing ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                }}
              >
                {isAnalyzing ? t('customFood.analyzing') : t('customFood.aiSuggest')}
              </button>
            </div>
          </label>
          
          <label style={{ marginTop: '1rem', display: 'block' }}>
            <strong>{t('customFood.displayName')}</strong>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
              {t('customFood.displayNameDescription')}
            </div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={foodName || t('customFood.displayNamePlaceholder')}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', marginTop: '0.5rem' }}
            />
          </label>
          
          {/* AIローディング中のTips表示 */}
          {isAnalyzing && loadingTip && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: '600', color: '#92400e', flex: 1 }}>
                  💡 {loadingTip.title}
                </div>
                <button
                  onClick={() => {
                    if (isTipSavedState) {
                      unsaveTip(loadingTip.id);
                    } else {
                      saveTip(loadingTip.id);
                    }
                    setIsTipSavedState(!isTipSavedState);
                  }}
                  style={{
                    background: isTipSavedState ? '#fef3c7' : 'none',
                    border: isTipSavedState ? '1px solid #f59e0b' : '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    color: isTipSavedState ? '#f59e0b' : '#6b7280',
                    padding: '0.25rem 0.5rem',
                    minWidth: '32px',
                    height: '32px',
                  }}
                >
                  ⭐
                </button>
              </div>
              <div style={{ fontSize: '12px', color: '#78350f', lineHeight: '1.5', marginBottom: '0.5rem' }}>
                {loadingTip.content.substring(0, 150)}...
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                {previousTips.length > 0 && (
                  <button
                    onClick={() => {
                      const prevTip = previousTips[previousTips.length - 1];
                      setPreviousTips(prev => prev.slice(0, -1));
                      setLoadingTip(prevTip);
                      setIsTipSavedState(isTipSaved(prevTip.id));
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    戻る
                  </button>
                )}
                <button
                  onClick={() => {
                    if (loadingTip) {
                      setPreviousTips(prev => [...prev, loadingTip]);
                    }
                    const nextTip = getRandomTipExcluding(loadingTip.id);
                    setLoadingTip(nextTip);
                    setIsTipSavedState(isTipSaved(nextTip.id));
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  {t('customFood.nextTip')}
                </button>
              </div>
              <div style={{ clear: 'both' }} />
            </div>
          )}
        </div>

        {/* AI追加質問（食品名だけでは推測が難しい場合） */}
        {showFollowupInput && aiFollowupQuestions.length > 0 && (
          <div className="custom-food-section" style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #fbbf24' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ backgroundColor: '#f59e0b', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>?</span>
              <strong style={{ fontSize: '16px' }}>{t('customFood.additionalInfoNeeded')}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {aiFollowupQuestions.map((question, index) => (
                <div key={index}>
                  <label style={{ fontSize: '14px', color: '#374151', display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    {question}
                  </label>
                  <input
                    type="text"
                    value={followupAnswers[question] || ''}
                    onChange={(e) => setFollowupAnswers({ ...followupAnswers, [question]: e.target.value })}
                    placeholder={t('customFood.answerPlaceholder')}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  />
                </div>
              ))}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isAnalyzing ? '#9ca3af' : '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                }}
              >
                {isAnalyzing ? t('customFood.reanalyzing') : t('customFood.reanalyzeWithAnswer')}
              </button>
            </div>
          </div>
        )}

        {/* ステップ2: 食品タイプ */}
        <div className="custom-food-section" style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ backgroundColor: '#3b82f6', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>2</span>
            <strong style={{ fontSize: '16px' }}>{t('customFood.foodType')}</strong>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            {(['animal', 'trash'] as const).map((foodType) => (
              <button
                key={foodType}
                onClick={() => setType(foodType)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: type === foodType ? '#3b82f6' : '#f3f4f6',
                  color: type === foodType ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {foodType === 'animal' ? t('customFood.foodTypeAnimal') : t('customFood.foodTypeTrash')}
              </button>
            ))}
          </div>
        </div>

        {/* ステップ3: 栄養素（必須） */}
        <div className="custom-food-section" style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ backgroundColor: '#3b82f6', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>3</span>
            <strong style={{ fontSize: '16px' }}>{t('customFood.nutrientsRequired')}</strong>
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '0.75rem' }}>
            {t('customFood.nutrientsPer100g')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            {/* タンパク質 */}
            <div>
              <MiniNutrientGauge
                label={t('customFood.protein')}
                currentDailyTotal={nutrients?.protein || 0}
                previewAmount={0}
                target={100}
                color="#64748b"
                unit="g/100g"
              />
              <input
                type="number"
                value={nutrients?.protein || ''}
                onChange={(e) => updateNutrient('protein', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </div>
            
            {/* 脂質 */}
            <div>
              <MiniNutrientGauge
                label={t('customFood.fat')}
                currentDailyTotal={nutrients?.fat || 0}
                previewAmount={0}
                target={100}
                color="#64748b"
                unit="g/100g"
              />
              <input
                type="number"
                value={nutrients?.fat || ''}
                onChange={(e) => updateNutrient('fat', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </div>
            
            {/* 炭水化物 */}
            <div>
              <MiniNutrientGauge
                label={t('customFood.carbs')}
                currentDailyTotal={nutrients?.carbs || 0}
                previewAmount={0}
                target={100}
                color="#64748b"
                unit="g/100g"
              />
              <input
                type="number"
                value={nutrients?.carbs || ''}
                onChange={(e) => updateNutrient('carbs', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </div>
          </div>
        </div>

        {/* ステップ4: 栄養素（詳細） */}
        <div className="custom-food-section" style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ backgroundColor: '#3b82f6', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>4</span>
              <strong style={{ fontSize: '16px' }}>{t('customFood.nutrientsDetailed')}</strong>
            </div>
            <button
              onClick={() => setShowAdvancedNutrients(!showAdvancedNutrients)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: showAdvancedNutrients ? '#3b82f6' : '#f3f4f6',
                color: showAdvancedNutrients ? 'white' : '#374151',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {showAdvancedNutrients ? t('customFood.hideDetails') : t('customFood.showDetails')}
            </button>
          </div>
          {showAdvancedNutrients && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <label>
              {t('customFood.sodium')} (mg/100g)
              <MiniNutrientGauge
                label={t('customFood.sodium')}
                currentDailyTotal={nutrients?.sodium || 0}
                previewAmount={0}
                target={5000}
                color="#64748b"
                unit="mg/100g"
                nutrientKey="sodium"
              />
              <input
                type="number"
                value={nutrients?.sodium || ''}
                onChange={(e) => updateNutrient('sodium', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.magnesium')} (mg/100g)
              <MiniNutrientGauge
                label={t('customFood.magnesium')}
                currentDailyTotal={nutrients?.magnesium || 0}
                previewAmount={0}
                target={600}
                color="#64748b"
                unit="mg/100g"
                nutrientKey="magnesium"
              />
              <input
                type="number"
                value={nutrients?.magnesium || ''}
                onChange={(e) => updateNutrient('magnesium', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.potassium')} (mg/100g)
              <MiniNutrientGauge
                label={t('customFood.potassium')}
                currentDailyTotal={nutrients?.potassium || 0}
                previewAmount={0}
                target={4500}
                color="#64748b"
                unit="mg/100g"
                nutrientKey="potassium"
              />
              <input
                type="number"
                value={nutrients?.potassium || ''}
                onChange={(e) => updateNutrient('potassium', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.zinc')} (mg/100g)
              <MiniNutrientGauge
                label={t('customFood.zinc')}
                currentDailyTotal={nutrients?.zinc || 0}
                previewAmount={0}
                target={11}
                color="#64748b"
                unit="mg/100g"
                nutrientKey="zinc"
              />
              <input
                type="number"
                value={nutrients?.zinc || ''}
                onChange={(e) => updateNutrient('zinc', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.iron')} (mg/100g)
              <MiniNutrientGauge
                label={t('customFood.iron')}
                currentDailyTotal={nutrients?.iron || 0}
                previewAmount={0}
                target={8}
                color="#64748b"
                unit="mg/100g"
                nutrientKey="iron"
              />
              <input
                type="number"
                value={nutrients?.iron || ''}
                onChange={(e) => updateNutrient('iron', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.vitaminA')} (IU/100g)
              <MiniNutrientGauge
                label={t('customFood.vitaminA')}
                currentDailyTotal={nutrients?.vitaminA || 0}
                previewAmount={0}
                target={5000}
                color="#64748b"
                unit="IU/100g"
                nutrientKey="vitamin_a"
              />
              <input
                type="number"
                value={nutrients?.vitaminA || ''}
                onChange={(e) => updateNutrient('vitaminA', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.vitaminD')} (IU/100g)
              <MiniNutrientGauge
                label={t('customFood.vitaminD')}
                currentDailyTotal={nutrients?.vitaminD || 0}
                previewAmount={0}
                target={2000}
                color="#64748b"
                unit="IU/100g"
                nutrientKey="vitamin_d"
              />
              <input
                type="number"
                value={nutrients?.vitaminD || ''}
                onChange={(e) => updateNutrient('vitaminD', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.vitaminK2')} (μg/100g)
              <MiniNutrientGauge
                label={t('customFood.vitaminK2')}
                currentDailyTotal={nutrients?.vitaminK2 || 0}
                previewAmount={0}
                target={200}
                color="#64748b"
                unit="μg/100g"
                nutrientKey="vitamin_k2"
              />
              <input
                type="number"
                value={nutrients?.vitaminK2 || ''}
                onChange={(e) => updateNutrient('vitaminK2', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.vitaminB12')} (μg/100g)
              <MiniNutrientGauge
                label={t('customFood.vitaminB12')}
                currentDailyTotal={nutrients?.vitaminB12 || 0}
                previewAmount={0}
                target={2.4}
                color="#64748b"
                unit="μg/100g"
                nutrientKey="vitamin_b12"
              />
              <input
                type="number"
                value={nutrients?.vitaminB12 || ''}
                onChange={(e) => updateNutrient('vitaminB12', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.omega3')} (g/100g)
              <MiniNutrientGauge
                label={t('customFood.omega3')}
                currentDailyTotal={nutrients?.omega3 || 0}
                previewAmount={0}
                target={2}
                color="#64748b"
                unit="g/100g"
                nutrientKey="omega3"
              />
              <input
                type="number"
                value={nutrients?.omega3 || ''}
                onChange={(e) => updateNutrient('omega3', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.omega6')} (g/100g)
              <MiniNutrientGauge
                label={t('customFood.omega6')}
                currentDailyTotal={nutrients?.omega6 || 0}
                previewAmount={0}
                target={5}
                color="#64748b"
                unit="g/100g"
                nutrientKey="omega6"
              />
              <input
                type="number"
                value={nutrients?.omega6 || ''}
                onChange={(e) => updateNutrient('omega6', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.calcium')} (mg/100g)
              <MiniNutrientGauge
                label={t('customFood.calcium')}
                currentDailyTotal={nutrients?.calcium || 0}
                previewAmount={0}
                target={1000}
                color="#64748b"
                unit="mg/100g"
                nutrientKey="calcium"
              />
              <input
                type="number"
                value={nutrients?.calcium || ''}
                onChange={(e) => updateNutrient('calcium', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.phosphorus')} (mg/100g)
              <MiniNutrientGauge
                label={t('customFood.phosphorus')}
                currentDailyTotal={nutrients?.phosphorus || 0}
                previewAmount={0}
                target={700}
                color="#64748b"
                unit="mg/100g"
                nutrientKey="phosphorus"
              />
              <input
                type="number"
                value={nutrients?.phosphorus || ''}
                onChange={(e) => updateNutrient('phosphorus', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.glycine')} (g/100g)
              <MiniNutrientGauge
                label={t('customFood.glycine')}
                currentDailyTotal={nutrients?.glycine || 0}
                previewAmount={0}
                target={10}
                color="#64748b"
                unit="g/100g"
                nutrientKey="glycine"
              />
              <input
                type="number"
                value={nutrients?.glycine || ''}
                onChange={(e) => updateNutrient('glycine', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.methionine')} (g/100g)
              <MiniNutrientGauge
                label={t('customFood.methionine')}
                currentDailyTotal={nutrients?.methionine || 0}
                previewAmount={0}
                target={2}
                color="#64748b"
                unit="g/100g"
                nutrientKey="methionine"
              />
              <input
                type="number"
                value={nutrients?.methionine || ''}
                onChange={(e) => updateNutrient('methionine', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.taurine')} (mg/100g)
              <MiniNutrientGauge
                label={t('customFood.taurine')}
                currentDailyTotal={nutrients?.taurine || 0}
                previewAmount={0}
                target={500}
                color="#64748b"
                unit="mg/100g"
                nutrientKey="taurine"
              />
              <input
                type="number"
                value={nutrients?.taurine || ''}
                onChange={(e) => updateNutrient('taurine', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.vitaminB5')} (mg/100g)
              <input
                type="number"
                value={nutrients?.vitaminB5 || ''}
                onChange={(e) => updateNutrient('vitaminB5', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.vitaminB9')} (μg/100g)
              <input
                type="number"
                value={nutrients?.vitaminB9 || ''}
                onChange={(e) => updateNutrient('vitaminB9', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.chromium')} (μg/100g)
              <input
                type="number"
                value={nutrients?.chromium || ''}
                onChange={(e) => updateNutrient('chromium', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.molybdenum')} (μg/100g)
              <input
                type="number"
                value={nutrients?.molybdenum || ''}
                onChange={(e) => updateNutrient('molybdenum', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.fluoride')} (mg/100g)
              <input
                type="number"
                value={nutrients?.fluoride || ''}
                onChange={(e) => updateNutrient('fluoride', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.chloride')} (mg/100g)
              <input
                type="number"
                value={nutrients?.chloride || ''}
                onChange={(e) => updateNutrient('chloride', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.boron')} (mg/100g)
              <input
                type="number"
                value={nutrients?.boron || ''}
                onChange={(e) => updateNutrient('boron', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.nickel')} (mg/100g)
              <input
                type="number"
                value={nutrients?.nickel || ''}
                onChange={(e) => updateNutrient('nickel', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.silicon')} (mg/100g)
              <input
                type="number"
                value={nutrients?.silicon || ''}
                onChange={(e) => updateNutrient('silicon', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            <label>
              {t('customFood.vanadium')} (μg/100g)
              <input
                type="number"
                value={nutrients?.vanadium || ''}
                onChange={(e) => updateNutrient('vanadium', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0"
                step="0.1"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
              />
            </label>
            </div>
          )}
        </div>

        {/* ステップ5: 抗栄養素 */}
        {(
          <div className="custom-food-section" style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ backgroundColor: '#3b82f6', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>5</span>
              <strong style={{ fontSize: '16px' }}>{t('customFood.antiNutrients')}</strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              <label>
                {t('customFood.phytates')} (mg/100g)
                <MiniNutrientGauge
                  label={t('customFood.phytates')}
                  currentDailyTotal={nutrients?.phytates || 0}
                  previewAmount={0}
                  target={0}
                  color="#ef4444"
                  unit="mg/100g"
                  nutrientKey="phytates"
                />
                <input
                  type="number"
                  value={nutrients?.phytates || ''}
                  onChange={(e) => updateNutrient('phytates', e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="0"
                  step="0.1"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                />
              </label>
              <label>
                {t('customFood.oxalates')} (mg/100g)
                <MiniNutrientGauge
                  label={t('customFood.oxalates')}
                  currentDailyTotal={nutrients?.oxalates || 0}
                  previewAmount={0}
                  target={0}
                  color="#ef4444"
                  unit="mg/100g"
                  nutrientKey="oxalates"
                />
                <input
                  type="number"
                  value={nutrients?.oxalates || ''}
                  onChange={(e) => updateNutrient('oxalates', e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="0"
                  step="0.1"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                />
              </label>
              <label>
                {t('customFood.lectins')} (mg/100g)
                <MiniNutrientGauge
                  label={t('customFood.lectins')}
                  currentDailyTotal={nutrients?.lectins || 0}
                  previewAmount={0}
                  target={0}
                  color="#ef4444"
                  unit="mg/100g"
                  nutrientKey="lectins"
                />
                <input
                  type="number"
                  value={nutrients?.lectins || ''}
                  onChange={(e) => updateNutrient('lectins', e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="0"
                  step="0.1"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                />
              </label>
            </div>
          </div>
        )}

        {/* ステップ6: 抗栄養素（詳細） */}
        {(
          <div className="custom-food-section" style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ backgroundColor: '#3b82f6', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>6</span>
                <strong style={{ fontSize: '16px' }}>{t('customFood.antiNutrientsDetailed')}</strong>
              </div>
              <button
                onClick={() => setShowAdvancedAntiNutrients(!showAdvancedAntiNutrients)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: showAdvancedAntiNutrients ? '#3b82f6' : '#f3f4f6',
                  color: showAdvancedAntiNutrients ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                {showAdvancedAntiNutrients ? t('customFood.hideDetails') : t('customFood.showDetails')}
              </button>
            </div>
            {showAdvancedAntiNutrients && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <label>
                  {t('customFood.polyphenols')} (mg/100g)
                  <MiniNutrientGauge
                    label={t('customFood.polyphenols')}
                    currentDailyTotal={nutrients?.polyphenols || 0}
                    previewAmount={0}
                    target={0}
                    color="#ef4444"
                    unit="mg/100g"
                    nutrientKey="polyphenols"
                  />
                  <input
                    type="number"
                    value={nutrients?.polyphenols || ''}
                    onChange={(e) => updateNutrient('polyphenols', e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="0"
                    step="0.1"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  />
                </label>
                <label>
                  {t('customFood.flavonoids')} (mg/100g)
                  <MiniNutrientGauge
                    label={t('customFood.flavonoids')}
                    currentDailyTotal={nutrients?.flavonoids || 0}
                    previewAmount={0}
                    target={0}
                    color="#ef4444"
                    unit="mg/100g"
                    nutrientKey="flavonoids"
                  />
                  <input
                    type="number"
                    value={nutrients?.flavonoids || ''}
                    onChange={(e) => updateNutrient('flavonoids', e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="0"
                    step="0.1"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  />
                </label>
                <label>
                  {t('customFood.saponins')} (mg/100g)
                  <MiniNutrientGauge
                    label={t('customFood.saponins')}
                    currentDailyTotal={nutrients?.saponins || 0}
                    previewAmount={0}
                    target={0}
                    color="#ef4444"
                    unit="mg/100g"
                    nutrientKey="saponins"
                  />
                  <input
                    type="number"
                    value={nutrients?.saponins || ''}
                    onChange={(e) => updateNutrient('saponins', e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="0"
                    step="0.1"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  />
                </label>
                <label>
                  {t('customFood.goitrogens')} (mg/100g)
                  <MiniNutrientGauge
                    label={t('customFood.goitrogens')}
                    currentDailyTotal={nutrients?.goitrogens || 0}
                    previewAmount={0}
                    target={0}
                    color="#ef4444"
                    unit="mg/100g"
                    nutrientKey="goitrogens"
                  />
                  <input
                    type="number"
                    value={nutrients?.goitrogens || ''}
                    onChange={(e) => updateNutrient('goitrogens', e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="0"
                    step="0.1"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  />
                </label>
                <label>
                  {t('customFood.tannins')} (mg/100g)
                  <MiniNutrientGauge
                    label={t('customFood.tannins')}
                    currentDailyTotal={nutrients?.tannins || 0}
                    previewAmount={0}
                    target={0}
                    color="#ef4444"
                    unit="mg/100g"
                    nutrientKey="tannins"
                  />
                  <input
                    type="number"
                    value={nutrients?.tannins || ''}
                    onChange={(e) => updateNutrient('tannins', e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="0"
                    step="0.1"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  />
                </label>
              </div>
            )}
          </div>
        )}

        {/* 今日のログに追加するオプション */}
        {!foodId && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={addToTodayLog}
                onChange={(e) => setAddToTodayLog(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: '#374151' }}>
                {t('customFood.addToTodayLog')}
              </span>
            </label>
          </div>
        )}

        {/* 保存ボタン */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
            }}
          >
            {isLoading ? t('customFood.saving') : t('customFood.save')}
          </button>
        </div>
      </div>
    </div>
  );
}

