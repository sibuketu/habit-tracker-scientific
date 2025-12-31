import React, { useState, useEffect } from 'react';
import type { FoodItem } from '../types';
import { refineFoodAnalysis } from '../services/aiService';
import MiniNutrientGauge from './MiniNutrientGauge';

// 目標値の型定義（簡易的）
interface NutrientTarget {
    min: number;
    max?: number;
}

interface PhotoAnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
    analysisResult: {
        foodName: string;
        estimatedWeight: number;
        type?: string;
        nutrients?: Record<string, number>;
        followupQuestions?: string[];
    };
    onConfirm: (foodItem: FoodItem) => void;
    // ゲージ表示に必要な目標値
    dynamicTargets: {
        protein: NutrientTarget;
        fat: NutrientTarget;
        carbs?: NutrientTarget;
    };
}

export default function PhotoAnalysisModal({
    isOpen,
    onClose,
    analysisResult,
    onConfirm,
    dynamicTargets
}: PhotoAnalysisModalProps) {
    // ローカルステートで編集内容を管理
    const [currentResult, setCurrentResult] = useState(analysisResult);
    const [followupAnswers, setFollowupAnswers] = useState<Record<string, string>>({});
    const [isAIProcessing, setIsAIProcessing] = useState(false);

    // analysisResultが更新されたらローカルも更新（初期化）
    useEffect(() => {
        setCurrentResult(analysisResult);
        setFollowupAnswers({});
    }, [analysisResult]);

    if (!isOpen || !currentResult) return null;

    // 栄養素計算（現在の重量に基づく）
    const ratio = currentResult.estimatedWeight / 100;
    const p = (currentResult.nutrients?.protein || 0) * ratio;
    const f = (currentResult.nutrients?.fat || 0) * ratio;
    const pTarget = dynamicTargets.protein.min || 100; // デフォルト値
    const fTarget = dynamicTargets.fat.min || 100;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                backdropFilter: 'blur(5px)'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: '#1f2937',
                    color: '#f9fafb',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    width: '90%',
                    maxWidth: '500px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    border: '1px solid #374151'
                }}
                onClick={e => e.stopPropagation()}
            >
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: '0.75rem' }}>
                    📸 解析結果・調整
                </h2>

                <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* 食品名入力 */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '14px', color: '#9ca3af' }}>
                            食品名
                        </label>
                        <input
                            type="text"
                            value={currentResult.foodName}
                            onChange={(e) => setCurrentResult({ ...currentResult, foodName: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#111827',
                                border: '1px solid #4b5563',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '16px',
                            }}
                        />
                    </div>

                    {/* 量の調整とゲージプレビュー */}
                    <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #374151' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <label style={{ fontWeight: '600', color: '#e5e7eb' }}>食べる量</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="number"
                                    value={currentResult.estimatedWeight}
                                    onChange={(e) => setCurrentResult({ ...currentResult, estimatedWeight: Math.max(0, Number(e.target.value)) })}
                                    style={{
                                        width: '80px',
                                        padding: '0.5rem',
                                        textAlign: 'right',
                                        backgroundColor: '#374151',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <span style={{ color: '#9ca3af' }}>g</span>
                            </div>
                        </div>

                        {/* スライダー */}
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={currentResult.estimatedWeight}
                            onChange={(e) => setCurrentResult({ ...currentResult, estimatedWeight: Number(e.target.value) })}
                            style={{ width: '100%', marginBottom: '1.5rem', accentColor: '#dc2626', cursor: 'pointer' }}
                        />

                        {/* リアルタイム栄養素ゲージ */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                            <MiniNutrientGauge
                                label="タンパク質"
                                currentDailyTotal={0}
                                previewAmount={p}
                                target={pTarget}
                                unit="g"
                                color="#ef4444"
                            />
                            <MiniNutrientGauge
                                label="脂質"
                                currentDailyTotal={0}
                                previewAmount={f}
                                target={fTarget}
                                unit="g"
                                color="#eab308"
                            />
                        </div>
                    </div>

                    {/* AIからの質問 */}
                    {currentResult.followupQuestions && currentResult.followupQuestions.length > 0 && (
                        <div style={{ marginTop: '0.5rem', padding: '1rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fcd34d', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                🤔 AIが気になっていること
                            </h3>
                            {currentResult.followupQuestions.map((question, index) => (
                                <div key={index} style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', color: '#e5e7eb' }}>
                                        {question}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="回答を入力..."
                                        value={followupAnswers[question] || ''}
                                        onChange={(e) => setFollowupAnswers({ ...followupAnswers, [question]: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem',
                                            backgroundColor: '#1f2937',
                                            border: '1px solid #4b5563',
                                            color: 'white',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                        }}
                                    />
                                </div>
                            ))}

                            <button
                                onClick={async () => {
                                    if (isAIProcessing) return;
                                    try {
                                        setIsAIProcessing(true);
                                        const refined = await refineFoodAnalysis(
                                            {
                                                foodName: currentResult.foodName,
                                                estimatedWeight: currentResult.estimatedWeight,
                                                type: currentResult.type
                                            },
                                            followupAnswers
                                        );
                                        setCurrentResult({ ...refined, followupQuestions: [] });
                                    } catch (e) {
                                        alert('再計算に失敗しました');
                                    } finally {
                                        setIsAIProcessing(false);
                                    }
                                }}
                                disabled={isAIProcessing || Object.keys(followupAnswers).length === 0}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: isAIProcessing ? '#4b5563' : '#f59e0b',
                                    color: isAIProcessing ? '#9ca3af' : '#1f2937',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: 'bold',
                                    cursor: isAIProcessing ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    fontSize: '14px'
                                }}
                            >
                                {isAIProcessing ? '計算中...' : '✨ 回答を反映して栄養素を更新'}
                            </button>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #374151' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'transparent',
                            color: '#9ca3af',
                            border: '1px solid #4b5563',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={() => {
                            const ratio = currentResult.estimatedWeight / 100;
                            const nutrients: Record<string, number> = {};
                            if (currentResult.nutrients) {
                                Object.entries(currentResult.nutrients).forEach(([key, value]) => {
                                    nutrients[key] = (value as number) * ratio;
                                });
                            }
                            const foodItem: FoodItem = {
                                item: currentResult.foodName,
                                amount: currentResult.estimatedWeight,
                                unit: 'g' as const,
                                type: (currentResult.type as any) || 'animal',
                                nutrients: Object.keys(nutrients).length > 0 ? nutrients : undefined,
                            };
                            onConfirm(foodItem);
                        }}
                        style={{
                            padding: '0.75rem 2rem',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 6px rgba(220, 38, 38, 0.4)',
                        }}
                    >
                        追加する
                    </button>
                </div>
            </div>
        </div>
    );
}
