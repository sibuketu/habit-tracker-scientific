'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, Cell } from 'recharts';
import { TrendingUp, Clock, Target, Award, Calendar, Zap } from 'lucide-react';

type Period = 'day' | 'week' | 'month' | 'year';

// モックデータ
const moodDifficultyData = [
  { day: '1/8', mood: 4.2, difficulty: 2.8, habit: '朝の散歩' },
  { day: '1/9', mood: 3.8, difficulty: 3.2, habit: '読書' },
  { day: '1/10', mood: 4.5, difficulty: 2.5, habit: '朝の散歩' },
  { day: '1/11', mood: 3.2, difficulty: 3.8, habit: '筋トレ' },
  { day: '1/12', mood: 4.8, difficulty: 2.0, habit: '瞑想' },
  { day: '1/13', mood: 4.0, difficulty: 3.0, habit: '朝の散歩' },
  { day: '1/14', mood: 3.5, difficulty: 3.5, habit: '読書' },
];

const executionTimeData = [
  { habit: '朝の散歩', avgTime: 25, targetTime: 20, trend: 'up' },
  { habit: '読書', avgTime: 45, targetTime: 60, trend: 'down' },
  { habit: '筋トレ', avgTime: 35, targetTime: 30, trend: 'up' },
  { habit: '瞑想', avgTime: 15, targetTime: 15, trend: 'stable' },
];

const completionRateData = [
  { week: '1週目', rate: 85 },
  { week: '2週目', rate: 92 },
  { week: '3週目', rate: 78 },
  { week: '4週目', rate: 95 },
];

const AnalyticsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');
  
  const getPeriodStats = () => {
    const stats = {
      day: { totalExecutions: 3, totalDays: 1, pbCount: 0, avgRate: 100 },
      week: { totalExecutions: 21, totalDays: 7, pbCount: 3, avgRate: 85 },
      month: { totalExecutions: 90, totalDays: 30, pbCount: 12, avgRate: 78 },
      year: { totalExecutions: 1095, totalDays: 365, pbCount: 145, avgRate: 82 },
    };
    return stats[selectedPeriod];
  };

  const currentStats = getPeriodStats();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
          <p className="text-white font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">📊 分析</h1>
          <p className="text-gray-400">習慣の傾向と改善点を詳しく分析</p>
        </div>
        
        {/* 期間切替 */}
        <div className="flex space-x-2 mb-6">
          {(['day', 'week', 'month', 'year'] as Period[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {period === 'day' ? '日' : period === 'week' ? '週' : period === 'month' ? '月' : '年'}
            </button>
          ))}
        </div>

        {/* 数値サマリー */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">総実行回数</p>
                <p className="text-2xl font-bold text-green-400">{currentStats.totalExecutions}</p>
              </div>
              <Target className="w-6 h-6 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">総連続日数</p>
                <p className="text-2xl font-bold text-blue-400">{currentStats.totalDays}</p>
              </div>
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">PB更新回数</p>
                <p className="text-2xl font-bold text-purple-400">{currentStats.pbCount}</p>
              </div>
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">平均達成率</p>
                <p className="text-2xl font-bold text-yellow-400">{currentStats.avgRate}%</p>
              </div>
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* 気分と難易度の相関グラフ */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            気分と難易度の相関
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={moodDifficultyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="difficulty" 
                  name="難易度" 
                  stroke="#9CA3AF"
                  domain={[1, 5]}
                  label={{ value: '難易度 (1-5)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                />
                <YAxis 
                  dataKey="mood" 
                  name="気分" 
                  stroke="#9CA3AF"
                  domain={[1, 5]}
                  label={{ value: '気分 (1-5)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter 
                  dataKey="mood" 
                  fill="#3B82F6"
                  r={8}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">📈 分析結果</h3>
            <p className="text-sm text-gray-300">
              難易度が低い習慣ほど気分が良くなる傾向が見られます。
              特に瞑想（難易度2.0）では気分が4.8と最高値を記録しています。
              習慣の難易度を適度に調整することで、継続率の向上が期待できます。
            </p>
          </div>
        </div>

        {/* 実行時間の傾向 */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-400" />
            実行時間の傾向
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executionTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="habit" 
                  stroke="#9CA3AF"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  label={{ value: '時間 (分)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avgTime" fill="#10B981" name="平均時間" />
                <Bar dataKey="targetTime" fill="#3B82F6" name="目標時間" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="text-sm font-semibold text-green-400 mb-2">⚡ 効率的な習慣</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• 瞑想: 目標時間と一致</li>
                <li>• 読書: 目標より短時間で完了</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="text-sm font-semibold text-yellow-400 mb-2">⏰ 改善が必要</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• 朝の散歩: 目標より5分長い</li>
                <li>• 筋トレ: 目標より5分長い</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 達成率の推移 */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
            達成率の推移
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={completionRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis 
                  stroke="#9CA3AF"
                  domain={[0, 100]}
                  label={{ value: '達成率 (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  name="達成率"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">📊 傾向分析</h3>
            <p className="text-sm text-gray-300">
              全体的に高い達成率を維持していますが、3週目に一時的な低下が見られます。
              これは新しい習慣の追加時期と重なっており、習慣の複雑化が影響している可能性があります。
              4週目には回復し、95%の達成率を記録しています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
