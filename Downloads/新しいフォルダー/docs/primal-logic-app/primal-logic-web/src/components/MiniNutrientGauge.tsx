/**
 * Primal Logic - Mini Nutrient Gauge Component
 * 
 * ButcherSelectで使用されている栄養素ゲージコンポーネントを共通化
 * 4-Zone Gradientスタイルで、摂取基準との距離を視覚的に表示
 */

import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { calculateNutrientImpactFactors, applySortOrder, getCategoryName, type SortOrder, type NutrientImpactFactor } from '../utils/nutrientImpactFactors';
import { useTranslation } from '../utils/i18n';
import { getNutrientExplanation } from '../utils/nutrientExplanationHelper';
import { CARNIVORE_NUTRIENT_TARGETS } from '../data/carnivoreTargets';

interface MiniNutrientGaugeProps {
  label: string;
  currentDailyTotal?: number; // Layer 1: Base
  previewAmount?: number; // Layer 2: Preview
  target: number;
  color: string;
  unit?: string;
  logic?: string; // Logic Armor: 栄養目標値の根拠を表示するための準備
  hint?: string; // 不足時の提案テキスト
  showLowIsOk?: boolean; // Vitamin Cなど、低くてもOKな場合
  nutrientKey?: string; // 栄養素キー（例: 'protein', 'iron', 'magnesium'）
}

export default function MiniNutrientGauge({
  label,
  currentDailyTotal = 0, // Layer 1: 今日すでに確定した摂取量
  previewAmount = 0, // Layer 2: 今選択している食材の増加分
  target,
  color,
  unit = '',
  logic,
  hint,
  showLowIsOk = false,
  nutrientKey
}: MiniNutrientGaugeProps) {
  const { userProfile } = useApp();
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('impact');
  const [explanationMode, setExplanationMode] = useState<'simple' | 'detailed'>('simple'); // 簡易/詳細表示モード

  // 栄養素キーを推測（labelから）
  const inferredNutrientKey = useMemo(() => {
    if (nutrientKey) return nutrientKey;
    const labelLower = label.toLowerCase();
    if (labelLower.includes('タンパク質') || labelLower.includes('protein')) return 'protein';
    if (labelLower.includes('脂質') || labelLower.includes('fat')) return 'fat';
    if (labelLower.includes('鉄') || labelLower.includes('iron')) return 'iron';
    if (labelLower.includes('マグネシウム') || labelLower.includes('magnesium')) return 'magnesium';
    if (labelLower.includes('ビタミンd') || labelLower.includes('vitamin d')) return 'vitamin_d';
    if (labelLower.includes('ナトリウム') || labelLower.includes('sodium')) return 'sodium';
    if (labelLower.includes('カリウム') || labelLower.includes('potassium')) return 'potassium';
    if (labelLower.includes('亜鉛') || labelLower.includes('zinc')) return 'zinc';
    if (labelLower.includes('ビタミンc') || labelLower.includes('vitamin c')) return 'vitamin_c';
    if (labelLower.includes('ビタミンa') || labelLower.includes('vitamin a')) return 'vitamin_a';
    if (labelLower.includes('ビタミンk') || labelLower.includes('vitamin k')) return 'vitamin_k2';
    if (labelLower.includes('ビタミンb12') || labelLower.includes('vitamin b12')) return 'vitamin_b12';
    if (labelLower.includes('コリン') || labelLower.includes('choline')) return 'choline';
    return null;
  }, [label, nutrientKey]);

  // 影響要因を計算
  const impactFactors = useMemo(() => {
    if (!inferredNutrientKey || !userProfile) return [];
    try {
      const factors = calculateNutrientImpactFactors(
        inferredNutrientKey as any,
        userProfile
      );
      return applySortOrder(factors, sortOrder);
    } catch (error) {
      console.error('Error calculating impact factors:', error);
      return [];
    }
  }, [inferredNutrientKey, userProfile, sortOrder]);

  const totalValue = currentDailyTotal + previewAmount;
  const basePercent = target > 0 ? Math.min((currentDailyTotal / target) * 100, 100) : 0;
  const previewPercent = target > 0 ? Math.min((previewAmount / target) * 100, 100) : 0;
  const totalPercent = target > 0 ? Math.min((totalValue / target) * 100, 200) : 0; // 200%まで表示可能

  const displayValue = totalValue.toFixed(1);
  const displayTarget = target.toFixed(1);
  const isLow = totalValue < target * 0.5; // 目標の50%未満を「低い」と判定

  // 自動ヒント生成（不足時）
  const autoHint = useMemo(() => {
    if (hint) return hint; // 既にhintがある場合はそれを使用
    if (impactFactors.length > 0) return null; // impactFactorsがある場合はモーダルで表示

    // 不足時の自動ヒント生成
    if (totalValue < target * 0.8) {
      const deficit = target - totalValue;
      if (inferredNutrientKey === 'sodium') {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。ミネラルウォーターや塩で補給可能`;
      } else if (inferredNutrientKey === 'magnesium') {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。ミネラルウォーターやサプリメントで補給可能`;
      } else if (inferredNutrientKey === 'potassium') {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。肉や魚を増やすことで補給可能`;
      } else if (inferredNutrientKey === 'protein') {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。肉や魚を増やすことで補給可能`;
      } else if (inferredNutrientKey === 'fat') {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。脂身の多い肉やバターを増やすことで補給可能`;
      } else if (inferredNutrientKey === 'iron') {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。赤身肉やレバーを増やすことで補給可能`;
      } else if (inferredNutrientKey === 'zinc') {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。赤身肉や内臓を増やすことで補給可能`;
      } else if (inferredNutrientKey === 'vitamin_b12') {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。肉や魚、内臓を増やすことで補給可能`;
      } else {
        return `現状: 不足気味（${deficit.toFixed(0)}${unit}不足）。食品を追加して補給してください`;
      }
    }
    return null;
  }, [hint, impactFactors.length, totalValue, target, unit, inferredNutrientKey]);

  // 4ゾーンのグラデーション色を生成する関数
  const getZoneGradient = (percent: number, isPastFood: boolean): string => {
    // 過去に追加した食品は黒色
    if (isPastFood) {
      return '#1f2937'; // 黒色
    }

    // 4ゾーンのグラデーション（段階的に色が変わる）
    // 0-50%: 赤系、50-100%: オレンジ系、100-120%: 緑系、120%以上: 紫系
    if (percent < 50) {
      // 0-50%: 赤からオレンジへのグラデーション
      const ratio = percent / 50;
      return `linear-gradient(to right, #ef4444 0%, #f97316 ${ratio * 100}%)`;
    } else if (percent < 100) {
      // 50-100%: オレンジから緑へのグラデーション
      const ratio = (percent - 50) / 50;
      return `linear-gradient(to right, #f97316 0%, #22c55e ${ratio * 100}%)`;
    } else if (percent < 120) {
      // 100-120%: 緑から紫へのグラデーション
      const ratio = (percent - 100) / 20;
      return `linear-gradient(to right, #22c55e 0%, #a855f7 ${ratio * 100}%)`;
    } else {
      // 120%以上: 紫
      return '#a855f7';
    }
  };

  const isPastFood = currentDailyTotal > 0; // 過去に追加した食品かどうか

  // Logic Armor: ロジックがある場合はコンソールに出力（将来はツールチップで表示）
  useEffect(() => {
    if (logic && import.meta.env.DEV) {
      console.log(`[Logic Armor] ${label}: ${logic}`);
    }
  }, [label, logic]);

  // 栄養素説明を取得
  const nutrientExplanation = useMemo(() => {
    if (!inferredNutrientKey || !userProfile) return null;
    const validKeys: ('protein' | 'fat' | 'iron' | 'magnesium' | 'vitamin_d')[] = ['protein', 'fat', 'iron', 'magnesium', 'vitamin_d'];
    if (validKeys.includes(inferredNutrientKey as any)) {
      try {
        return getNutrientExplanation(inferredNutrientKey as 'protein' | 'fat' | 'iron' | 'magnesium' | 'vitamin_d', userProfile);
      } catch (error) {
        console.error('Error getting nutrient explanation:', error);
        return null;
      }
    }
    return null;
  }, [inferredNutrientKey, userProfile]);

  // 栄養素のロジックを取得
  const nutrientLogic = useMemo(() => {
    if (!inferredNutrientKey) return logic || null;
    const targetKey = inferredNutrientKey === 'vitamin_d' ? 'vitamin_d' : inferredNutrientKey;
    const targetData = CARNIVORE_NUTRIENT_TARGETS[targetKey];
    return targetData?.logic || logic || null;
  }, [inferredNutrientKey, logic]);

  // ツールチップ表示用のハンドラ
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素のクリックイベントを防ぐ
    // 常にモーダルを表示（影響要因がある場合は影響要因モーダル、ない場合は「なぜこの数値なのか」説明モーダル）
    setShowModal(true);
  };

  // ゲージ全体のクリックハンドラ（ロジック表示用）
  const handleGaugeClick = (e: React.MouseEvent) => {
    // ツールチップのクリックイベントを防ぐ
    const target = e.target as HTMLElement;
    // 💡アイコンをクリックした場合は処理しない
    if (target.closest('span[style*="cursor: pointer"]') || target.textContent === '💡' || target.closest('span[data-cursor-element-id]')) {
      return;
    }
    if (target.closest('[style*="pointerEvents: none"]') || target.closest('[style*="pointer-events: none"]')) {
      return;
    }
    if (logic) {
      // ロジックをモーダルまたはアラートで表示（将来はArgument Cardに統合）
      alert(`${label}の目標値の根拠:\n\n${logic}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        position: 'relative',
        cursor: logic ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      onClick={handleGaugeClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#78716c' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: color, fontWeight: '500' }}>
            {displayValue} / {displayTarget} {unit}
          </span>
          {/* ヒントアイコン（ツールチップ表示） - 全てのゲージに常に表示 */}
          <span
            style={{ fontSize: '12px', cursor: 'pointer', position: 'relative', zIndex: 10 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleIconClick(e);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseEnter={(e) => {
              if (impactFactors.length === 0 && autoHint) {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPosition({ x: rect.left, y: rect.top });
                setShowTooltip(true);
              }
            }}
            onMouseLeave={() => {
              if (impactFactors.length === 0) {
                setShowTooltip(false);
              }
            }}
          >
            💡
            {showTooltip && impactFactors.length === 0 && autoHint && (
              <div style={{
                position: 'fixed',
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y + 20}px`,
                backgroundColor: '#1f2937',
                color: 'white',
                padding: '6px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                zIndex: 10005,
                pointerEvents: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                maxWidth: '300px',
                whiteSpace: 'normal'
              }}>
                {autoHint}
              </div>
            )}
          </span>
          {showLowIsOk && isLow && (
            <span
              style={{ fontSize: '12px', cursor: 'pointer', position: 'relative' }}
              onClick={handleIconClick}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPosition({ x: rect.left, y: rect.top });
                setShowTooltip(true);
              }}
              onMouseLeave={() => setShowTooltip(false)}
            >
              ℹ️
              {showTooltip && (
                <div style={{
                  position: 'fixed',
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y + 20}px`,
                  backgroundColor: '#1f2937',
                  color: 'white',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  whiteSpace: 'nowrap',
                  zIndex: 10005,
                  pointerEvents: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  Low is OK (カーニボアロジック)
                </div>
              )}
            </span>
          )}
        </div>
      </div>
      {/* Stacked Gauge with 4-Zone Colors */}
      <div style={{
        height: '10px',
        borderRadius: '9999px',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        backgroundColor: '#e5e7eb', // 背景色（グレー）
      }}>
        {/* Layer 1: Base (currentDailyTotal) - 過去に追加した食品は黒色、それ以外は4ゾーングラデーション */}
        {basePercent > 0 && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              width: `${Math.min(basePercent, 200)}%`,
              background: isPastFood ? '#1f2937' : getZoneGradient(basePercent, false),
              height: '100%',
              borderRadius: '9999px',
              transition: 'width 0.3s ease',
              zIndex: 2
            }}
          />
        )}

        {/* Layer 2: Preview (previewAmount) - 4ゾーングラデーション */}
        {previewPercent > 0 && (
          <div
            style={{
              position: 'absolute',
              left: `${Math.min(basePercent, 200)}%`,
              width: `${Math.min(previewPercent, Math.max(0, 200 - Math.min(basePercent, 200)))}%`,
              background: getZoneGradient(totalPercent, false), // プレビューは常に4ゾーングラデーション
              height: '100%',
              borderRadius: '9999px',
              transition: 'width 0.3s ease',
              zIndex: 2,
              borderLeft: basePercent > 0 ? '1px solid rgba(255,255,255,0.3)' : 'none'
            }}
          />
        )}
      </div>

      {/* 影響要因モーダル / なぜこの数値なのか説明モーダル */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10010,
            padding: '16px'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              maxWidth: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#78716c',
                padding: '4px 8px'
              }}
            >
              ×
            </button>

            {/* タイトル */}
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              {impactFactors.length > 0 ? `${label}の目標値に影響する要因` : `【${label}: ${displayTarget}${unit}】なぜこの数値なのか`}
            </h2>

            {/* 簡易/詳細切り替えタブ */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setExplanationMode('simple')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  background: explanationMode === 'simple' ? '#1f2937' : 'transparent',
                  color: explanationMode === 'simple' ? 'white' : '#78716c',
                  cursor: 'pointer',
                  borderRadius: '8px 8px 0 0',
                  fontSize: '14px',
                  fontWeight: explanationMode === 'simple' ? '600' : '400'
                }}
              >
                簡易
              </button>
              <button
                onClick={() => setExplanationMode('detailed')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  background: explanationMode === 'detailed' ? '#1f2937' : 'transparent',
                  color: explanationMode === 'detailed' ? 'white' : '#78716c',
                  cursor: 'pointer',
                  borderRadius: '8px 8px 0 0',
                  fontSize: '14px',
                  fontWeight: explanationMode === 'detailed' ? '600' : '400'
                }}
              >
                詳細
              </button>
            </div>

            {impactFactors.length > 0 ? (
              <>
                {explanationMode === 'detailed' && (
                  /* タブ（並び順切り替え） */
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
                    <button
                      onClick={() => setSortOrder('impact')}
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        background: sortOrder === 'impact' ? '#1f2937' : 'transparent',
                        color: sortOrder === 'impact' ? 'white' : '#78716c',
                        cursor: 'pointer',
                        borderRadius: '8px 8px 0 0',
                        fontSize: '14px',
                        fontWeight: sortOrder === 'impact' ? '600' : '400'
                      }}
                    >
                      影響度順
                    </button>
                    <button
                      onClick={() => setSortOrder('alphabetical')}
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        background: sortOrder === 'alphabetical' ? '#1f2937' : 'transparent',
                        color: sortOrder === 'alphabetical' ? 'white' : '#78716c',
                        cursor: 'pointer',
                        borderRadius: '8px 8px 0 0',
                        fontSize: '14px',
                        fontWeight: sortOrder === 'alphabetical' ? '600' : '400'
                      }}
                    >
                      アルファベット順
                    </button>
                    <button
                      onClick={() => setSortOrder('category')}
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        background: sortOrder === 'category' ? '#1f2937' : 'transparent',
                        color: sortOrder === 'category' ? 'white' : '#78716c',
                        cursor: 'pointer',
                        borderRadius: '8px 8px 0 0',
                        fontSize: '14px',
                        fontWeight: sortOrder === 'category' ? '600' : '400'
                      }}
                    >
                      カテゴリ順
                    </button>
                  </div>
                )}

                {/* 影響要因リスト */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {explanationMode === 'simple' ? (
                    /* 簡易表示：影響度順でソートして最初の3つの要因のみ表示 */
                    applySortOrder(impactFactors, 'impact').slice(0, 3).map((factor, index) => (
                      <div
                        key={factor.id}
                        style={{
                          padding: '12px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                          {index + 1}. {factor.factor}
                        </div>
                        <div style={{ fontSize: '13px', color: '#78716c' }}>
                          {factor.reason}
                        </div>
                      </div>
                    ))
                  ) : (
                    /* 詳細表示：全ての要因を表示 */
                    impactFactors.map((factor, index) => (
                      <div
                        key={factor.id}
                        style={{
                          padding: '12px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          {/* ナンバリング */}
                          <div
                            style={{
                              minWidth: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: '#1f2937',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '600',
                              flexShrink: 0
                            }}
                          >
                            {index + 1}
                          </div>

                          {/* 内容 */}
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                                {factor.factor}
                              </span>
                              <span
                                style={{
                                  fontSize: '12px',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  backgroundColor: '#e5e7eb',
                                  color: '#78716c'
                                }}
                              >
                                {getCategoryName(factor.category)}
                              </span>
                            </div>
                            <div style={{ fontSize: '13px', color: '#78716c', marginBottom: '4px' }}>
                              {factor.reason}
                            </div>
                            <div
                              style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: factor.impact > 0 ? '#22c55e' : factor.impact < 0 ? '#ef4444' : '#78716c'
                              }}
                            >
                              {factor.impactText}の変化
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              /* なぜこの数値なのか説明 */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {explanationMode === 'simple' ? (
                  /* 簡易表示 */
                  nutrientExplanation ? (
                    <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.6' }}>
                        {nutrientExplanation.humanExplanation}
                      </p>
                    </div>
                  ) : nutrientLogic ? (
                    <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.6' }}>
                        {nutrientLogic}
                      </p>
                    </div>
                  ) : (
                    <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '14px', color: '#78716c' }}>
                        標準的な目標値（{displayTarget}{unit}）が適用されています。
                      </p>
                    </div>
                  )
                ) : (
                  /* 詳細表示 */
                  <>
                    {nutrientExplanation ? (
                      <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '12px' }}>
                        <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.6', marginBottom: '8px' }}>
                          {nutrientExplanation.humanExplanation}
                        </p>
                        {nutrientExplanation.adjustments.length > 0 && (
                          <div style={{ marginTop: '12px' }}>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#78716c', marginBottom: '8px' }}>調整内容:</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {nutrientExplanation.adjustments.map((adj, index) => (
                                <li key={index} style={{ fontSize: '13px', color: '#78716c', marginBottom: '4px', paddingLeft: '16px', position: 'relative' }}>
                                  <span style={{ position: 'absolute', left: 0 }}>•</span>
                                  {adj.reason}: {adj.impact}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : null}
                    {nutrientLogic ? (
                      <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #3b82f6', marginBottom: '12px' }}>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>計算式・ロジック:</p>
                        <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                          {nutrientLogic}
                        </p>
                        {inferredNutrientKey && userProfile && (() => {
                          // 計算式を生成
                          const getCalculationFormula = (nutrient: string, profile: typeof userProfile): string => {
                            if (nutrient === 'protein') {
                              const weight = profile?.weight || 70;
                              const base = weight * 1.6;
                              let formula = `基本計算: 体重(${weight}kg) × 1.6g/kg = ${base.toFixed(1)}g`;
                              if (profile?.activityLevel === 'active') {
                                formula += `\n活動量調整: +10g → ${(base + 10).toFixed(1)}g`;
                              }
                              if (profile?.age && profile.age > 50) {
                                formula += `\n年齢調整: +10g → ${(base + 10).toFixed(1)}g`;
                              }
                              return formula;
                            } else if (nutrient === 'fat') {
                              const protein = profile?.weight ? (profile.weight * 1.6) : 110;
                              const base = protein * 1.4;
                              let formula = `基本計算: タンパク質(${protein.toFixed(1)}g) × 1.4 = ${base.toFixed(1)}g`;
                              if (profile?.activityLevel === 'active') {
                                formula += `\n活動量調整: +30g → ${(base + 30).toFixed(1)}g`;
                              }
                              return formula;
                            } else if (nutrient === 'magnesium') {
                              let formula = '基本値: 600mg';
                              if (profile?.stressLevel === 'high') {
                                formula += `\nストレス調整: +100mg → 700mg`;
                              }
                              if (profile?.activityLevel === 'active') {
                                formula += `\n活動量調整: +100mg → 700mg`;
                              }
                              return formula;
                            } else if (nutrient === 'iron') {
                              let formula = '基本値: 8mg（男性）';
                              if (profile?.gender === 'female' && !profile.isPostMenopause) {
                                formula += `\n性別調整: 女性（月経あり）→ 18mg`;
                              } else if (profile?.isPostMenopause) {
                                formula += `\n閉経後調整: 8mg（月経なし）`;
                              }
                              return formula;
                            } else if (nutrient === 'vitamin_d') {
                              let formula = '基本値: 2000IU';
                              if (profile?.age && profile.age > 50) {
                                formula += `\n年齢調整: +1000IU → 3000IU`;
                              }
                              if (profile?.sunExposureFrequency === 'none') {
                                formula += `\n日光暴露なし: +1000IU（サプリメント推奨）`;
                              }
                              return formula;
                            }
                            return '';
                          };
                          const formula = getCalculationFormula(inferredNutrientKey, userProfile);
                          return formula ? (
                            <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#e0f2fe', borderRadius: '4px' }}>
                              <p style={{ fontSize: '12px', fontWeight: '600', color: '#0369a1', marginBottom: '4px' }}>計算式:</p>
                              <p style={{ fontSize: '13px', color: '#0c4a6e', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                {formula}
                              </p>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    ) : null}
                    {!nutrientExplanation && !nutrientLogic && (
                      <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                        <p style={{ fontSize: '14px', color: '#78716c' }}>
                          標準的な目標値（{displayTarget}{unit}）が適用されています。
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

