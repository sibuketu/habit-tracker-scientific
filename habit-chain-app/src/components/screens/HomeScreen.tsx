'use client';

import { useState } from 'react';
import { useHabitsStore, useRecordsStore } from '@/store';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, TrendingUp, Target, Award, Clock, Plus, Settings, Lightbulb, Gift } from 'lucide-react';

type ViewPeriod = 'day' | 'week' | 'month' | 'year';

const HomeScreen = () => {
  const { habits } = useHabitsStore();
  const { habitRecords, simpleRecords } = useRecordsStore();
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>('week');

  const getDateRange = (period: ViewPeriod) => {
    const now = new Date();
    switch (period) {
      case 'day':
        return { start: now, end: now };
      case 'week':
        return { start: startOfWeek(now, { locale: ja }), end: endOfWeek(now, { locale: ja }) };
      case 'month':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'year':
        return { start: startOfYear(now), end: endOfYear(now) };
      default:
        return { start: startOfWeek(now, { locale: ja }), end: endOfWeek(now, { locale: ja }) };
    }
  };

  const { start, end } = getDateRange(viewPeriod);

  const filteredRecords = habitRecords.filter(record => {
    const recordDate = new Date(record.created_at);
    return recordDate >= start && recordDate <= end;
  });

  const filteredSimpleRecords = simpleRecords.filter(record => {
    const recordDate = new Date(record.created_at);
    return recordDate >= start && recordDate <= end;
  });

  const totalRecords = filteredRecords.length + filteredSimpleRecords.length;
  const uniqueHabits = new Set(filteredRecords.map(r => r.habit_id)).size;
  const averageMood = filteredRecords.length > 0 
    ? filteredRecords.reduce((sum, r) => sum + (r.actual_mood || 0), 0) / filteredRecords.length 
    : 0;

  const periodLabels = {
    day: '今日',
    week: '今週',
    month: '今月',
    year: '今年'
  };

  // 電球アイコンの説明（フレンドリー版）
  const getLightbulbExplanation = () => {
    const explanations = [
      "💡 今日も一歩前進！小さな習慣が大きな変化を生みます",
      "🌟 継続は力なり！あなたの努力が実を結んでいます",
      "✨ 習慣の力で人生を変えていきましょう",
      "🎯 目標に向かって着実に進んでいますね！"
    ];
    return explanations[Math.floor(Math.random() * explanations.length)];
  };

  // 電球アイコンの説明（学術的版）
  const getAcademicExplanation = () => {
    const explanations = [
      "📊 行動変容理論に基づく習慣形成の進捗を示しています",
      "🧠 認知行動療法の原則に沿った継続的な改善プロセスです",
      "📈 統計的に有意な行動変化の兆候が観察されています",
      "🔬 行動科学の観点から見た持続可能な習慣確立の段階です"
    ];
    return explanations[Math.floor(Math.random() * explanations.length)];
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">ホーム</h1>
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <Settings size={20} />
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex space-x-2">
        {Object.entries(periodLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setViewPeriod(key as ViewPeriod)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              viewPeriod === key
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lightbulb Explanation */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-3">
          <Lightbulb className="text-yellow-500" size={24} />
          <div>
            <div className="text-sm font-medium text-gray-900">今日のヒント</div>
            <div className="text-sm text-gray-700 mt-1">{getLightbulbExplanation()}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2">
            <Target className="text-green-500" size={20} />
            <span className="text-sm text-gray-600">実行回数</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{totalRecords}</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2">
            <Calendar className="text-blue-500" size={20} />
            <span className="text-sm text-gray-600">習慣数</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{uniqueHabits}</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-purple-500" size={20} />
            <span className="text-sm text-gray-600">平均気分</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {averageMood > 0 ? averageMood.toFixed(1) : '-'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2">
            <Award className="text-yellow-500" size={20} />
            <span className="text-sm text-gray-600">達成率</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {habits.length > 0 ? Math.round((totalRecords / habits.length) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-center space-x-3 mb-3">
          <Gift className="text-purple-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">ご褒美</h3>
        </div>
        <div className="text-sm text-gray-700">
          継続的な努力により、新しいバッジやアチーブメントが解除されました！
        </div>
      </div>

      {/* Recent Records */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">最近の記録</h2>
        <div className="space-y-2">
          {[...filteredRecords, ...filteredSimpleRecords]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 5)
            .map((record, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Target size={16} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {'habit_id' in record ? '習慣記録' : 'シンプル記録'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(record.created_at), 'MM/dd HH:mm', { locale: ja })}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {'actual_mood' in record ? `気分: ${record.actual_mood}` : '記録完了'}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-500 text-white p-4 rounded-lg shadow-sm hover:bg-green-600 transition-colors">
          <div className="flex items-center space-x-2">
            <Plus size={20} />
            <span className="font-medium">記録を追加</span>
          </div>
        </button>
        <button className="bg-blue-500 text-white p-4 rounded-lg shadow-sm hover:bg-blue-600 transition-colors">
          <div className="flex items-center space-x-2">
            <Clock size={20} />
            <span className="font-medium">タイムアタック</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;