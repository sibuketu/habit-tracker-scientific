'use client';

import React, { useState } from 'react';
import { Calendar, TrendingUp, Target, Award, Clock, Heart, ArrowLeft, Trophy, Star, Lightbulb, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

type ViewPeriod = 'day' | 'week' | 'month' | 'year';

interface ResultScreenProps {
  onBack?: () => void;
}

export default function ResultScreen({ onBack }: ResultScreenProps) {
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTipModal, setShowTipModal] = useState(false);
  const [currentTip, setCurrentTip] = useState<{
    title: string;
    content: {
      effect: string;
      tip: string;
      pitfall: string;
      trivia: string;
      source: string;
    };
  } | null>(null);

  // モックデータ
  const mockData = {
    day: {
      totalHabits: 3,
      completedHabits: 2,
      cumulativeDifference: -45, // 秒
      streakDays: 7,
      rewardsEarned: 1,
      startTimeEvaluation: 'on-time' as 'early' | 'on-time' | 'late',
      moodComparison: [
        { time: '07:00', predicted: 4, actual: 3 },
        { time: '19:00', predicted: 3, actual: 4 },
        { time: '21:00', predicted: 4, actual: 4 },
      ],
      habitRecords: [
        { habit: '朝の散歩', startTime: '07:00', duration: '15分', mood: 3, status: 'completed' },
        { habit: '読書', startTime: '21:00', duration: '30分', mood: 4, status: 'completed' },
        { habit: '筋トレ', startTime: '19:00', duration: '0分', mood: 0, status: 'skipped' },
      ],
    },
    week: {
      totalHabits: 21,
      completedHabits: 18,
      cumulativeDifference: -120,
      streakDays: 7,
      rewardsEarned: 3,
      startTimeEvaluation: 'early' as 'early' | 'on-time' | 'late',
      moodComparison: [
        { day: '月', predicted: 4, actual: 3 },
        { day: '火', predicted: 3, actual: 4 },
        { day: '水', predicted: 4, actual: 4 },
        { day: '木', predicted: 3, actual: 2 },
        { day: '金', predicted: 4, actual: 5 },
        { day: '土', predicted: 5, actual: 4 },
        { day: '日', predicted: 4, actual: 4 },
      ],
      habitRecords: [
        { habit: '朝の散歩', count: 7, avgDuration: '12分', avgMood: 3.5, status: 'excellent' },
        { habit: '読書', count: 6, avgDuration: '25分', avgMood: 4.2, status: 'good' },
        { habit: '筋トレ', count: 4, avgDuration: '20分', avgMood: 3.8, status: 'fair' },
        { habit: '瞑想', count: 5, avgDuration: '10分', avgMood: 4.0, status: 'good' },
      ],
    },
    month: {
      totalHabits: 90,
      completedHabits: 75,
      cumulativeDifference: -300,
      streakDays: 7,
      rewardsEarned: 8,
      startTimeEvaluation: 'late' as 'early' | 'on-time' | 'late',
      moodComparison: [
        { week: '第1週', predicted: 3.8, actual: 3.5 },
        { week: '第2週', predicted: 4.0, actual: 3.8 },
        { week: '第3週', predicted: 4.2, actual: 4.0 },
        { week: '第4週', predicted: 4.1, actual: 4.2 },
      ],
      habitRecords: [
        { habit: '朝の散歩', count: 28, avgDuration: '13分', avgMood: 3.6, status: 'excellent' },
        { habit: '読書', count: 25, avgDuration: '28分', avgMood: 4.1, status: 'good' },
        { habit: '筋トレ', count: 18, avgDuration: '22分', avgMood: 3.9, status: 'fair' },
        { habit: '瞑想', count: 22, avgDuration: '12分', avgMood: 4.0, status: 'good' },
      ],
    },
  };

  const currentData = mockData[viewPeriod];

  const getStartTimeIcon = (evaluation: string) => {
    switch (evaluation) {
      case 'early': return <Clock className="w-5 h-5 text-green-400" />;
      case 'on-time': return <Clock className="w-5 h-5 text-blue-400" />;
      case 'late': return <Clock className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  // 電球の説明データ
  const tipData = {
    'streak': {
      title: 'ストリーク（連続記録）と猶予',
      content: {
        tip: '1. 3日サボりはOUT、2日までセーフとルール明記。\n2. 月数回の免除枠を最初から設計。\n3. ストリークは承認付きと自己判断を別集計。',
        effect: '(1) 現実的なルールで持続可能。\n\n(2) 承認付きは社会的証明で継続力が高まる。\n\n(3) 自己判断も並行で管理することで"無視された"感を防ぐ。',
        pitfall: '数字至上主義になり質が落ちる。\n免除枠が多すぎて緊張感ゼロになる。',
        trivia: '火を絶やさないという文化的価値観は世界中にあります。',
        source: '連続可視化研究\nCialdini（社会的証明）'
      }
    },
    'mood-tracking': {
      title: '気分トラッキング（予測 vs 結果）',
      content: {
        tip: '1. 実行前の予測気分を1タップで入力。\n2. 終了後の結果気分も1タップで入力。\n3. 差分を見て次回の開始ハードルを調整。',
        effect: '(1) "予想より良かった"は期待値を更新し次回の開始を軽くする。\n\n(2) ネガティブが続けば行動サイズや環境を変える材料になる。\n\n(3) 感情データが残ることで振り返りの質が上がる。',
        pitfall: '気分が悪い＝失敗と誤解しやすい。\n記録抜けでデータが痩せる。',
        trivia: '「やってみたら意外と良かった」を数で証明できるのが強み。',
        source: 'Bandura（自己効力感と継続）\n感情と行動持続の関連研究'
      }
    }
  };

  const handleTipClick = (tipKey: keyof typeof tipData) => {
    setCurrentTip(tipData[tipKey]);
    setShowTipModal(true);
  };

  const closeTipModal = () => {
    setShowTipModal(false);
    setCurrentTip(null);
  };

  const getStartTimeText = (evaluation: string) => {
    switch (evaluation) {
      case 'early': return '早めに開始';
      case 'on-time': return 'オンタイム';
      case 'late': return '遅れて開始';
      default: return '不明';
    }
  };

  const formatTimeDifference = (seconds: number) => {
    const absSeconds = Math.abs(seconds);
    const minutes = Math.floor(absSeconds / 60);
    const remainingSeconds = absSeconds % 60;
    const sign = seconds < 0 ? '-' : '+';
    return `${sign}${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return '優秀';
      case 'good': return '良好';
      case 'fair': return '普通';
      case 'poor': return '要改善';
      default: return '不明';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-6">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-3xl font-bold">**リザルト & 履歴**</h1>
        </div>
        <p className="text-gray-400">詳細な分析と履歴データ</p>
      </div>

      {/* 期間切替 */}
      <div className="mb-6">
        <div className="flex space-x-2 bg-gray-800 rounded-lg p-1">
          {(['day', 'week', 'month', 'year'] as ViewPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setViewPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {period === 'day' ? '日' : period === 'week' ? '週' : period === 'month' ? '月' : '年'}
            </button>
          ))}
        </div>
      </div>

      {/* メイン統計 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">完了率</p>
              <p className="text-2xl font-bold text-green-400">
                {Math.round((currentData.completedHabits / currentData.totalHabits) * 100)}%
              </p>
            </div>
            <Target className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">累計差分</p>
              <p className={`text-2xl font-bold ${currentData.cumulativeDifference < 0 ? 'text-red-400' : 'text-green-400'}`}>
                {formatTimeDifference(currentData.cumulativeDifference)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div>
                <p className="text-sm text-gray-400">連続日数</p>
                <p className="text-2xl font-bold text-blue-400">{currentData.streakDays}日</p>
              </div>
              <button
                onClick={() => handleTipClick('streak')}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Lightbulb size={16} />
              </button>
            </div>
            <Trophy className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">ご褒美獲得</p>
              <p className="text-2xl font-bold text-yellow-400">{currentData.rewardsEarned}個</p>
            </div>
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* 開始時間評価 */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">**開始時間評価**</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg">
              {getStartTimeText(currentData.startTimeEvaluation)}
            </p>
            <p className="text-sm text-gray-400">
              {viewPeriod === 'day' && '今日の開始時間'}
              {viewPeriod === 'week' && '今週の平均開始時間'}
              {viewPeriod === 'month' && '今月の平均開始時間'}
            </p>
          </div>
          {getStartTimeIcon(currentData.startTimeEvaluation)}
        </div>
      </div>

      {/* 気分比較グラフ */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-xl font-semibold">**予測気分 vs 結果気分**</h3>
          <button
            onClick={() => handleTipClick('mood-tracking')}
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <Lightbulb size={16} />
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currentData.moodComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey={viewPeriod === 'day' ? 'time' : viewPeriod === 'week' ? 'day' : 'week'} 
              stroke="#9CA3AF" 
            />
            <YAxis stroke="#9CA3AF" domain={[1, 5]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="予測気分"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#10B981" 
              strokeWidth={3}
              name="結果気分"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 習慣別パフォーマンス */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">**習慣別パフォーマンス**</h3>
        <div className="space-y-4">
          {currentData.habitRecords.map((record, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">{record.habit}</h4>
                <span className={`text-sm font-medium ${getStatusColor(record.status)}`}>
                  {getStatusText(record.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">実行回数:</span>
                  <span className="ml-2 font-semibold">{record.count}回</span>
                </div>
                <div>
                  <span className="text-gray-400">平均時間:</span>
                  <span className="ml-2 font-semibold">{record.avgDuration}</span>
                </div>
                <div>
                  <span className="text-gray-400">平均気分:</span>
                  <span className="ml-2 font-semibold">{record.avgMood}/5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 達成バッジ */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">**達成バッジ**</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              🏆
            </div>
            <div className="text-sm font-medium text-gray-900">連続10日</div>
            <div className="text-xs text-gray-600">達成済み</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              🎯
            </div>
            <div className="text-sm font-medium text-gray-900">PB更新</div>
            <div className="text-xs text-gray-600">未達成</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              📝
            </div>
            <div className="text-sm font-medium text-gray-900">記録10日</div>
            <div className="text-xs text-gray-600">未達成</div>
          </div>
        </div>
      </div>

      {/* 電球モーダル */}
      {showTipModal && currentTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-yellow-400 flex items-center space-x-2">
                <Lightbulb size={20} />
                <span>{currentTip.title}</span>
              </h3>
              <button
                onClick={closeTipModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**実践のコツ**</p>
                <p className="text-sm text-gray-300 whitespace-pre-line">{currentTip.content.tip}</p>
              </div>
              
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**なぜ効果的か**</p>
                <p className="text-sm text-gray-300 whitespace-pre-line">{currentTip.content.effect}</p>
              </div>
              
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**落とし穴**</p>
                <p className="text-sm text-gray-300 whitespace-pre-line">{currentTip.content.pitfall}</p>
              </div>
              
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**余談（もっと見る）**</p>
                <p className="text-sm text-gray-300">{currentTip.content.trivia}</p>
              </div>
              
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**効果の裏付け（参考）**</p>
                <p className="text-xs text-gray-400">{currentTip.content.source}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeTipModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}