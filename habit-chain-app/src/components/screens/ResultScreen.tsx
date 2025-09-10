'use client';

import { useState } from 'react';
import { useRecordsStore, useHabitsStore } from '@/store';
import { HabitRecord } from '@/types';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, TrendingUp, Target, Award, Clock } from 'lucide-react';

type ViewPeriod = 'day' | 'week' | 'month' | 'year';

const ResultScreen = () => {
  const { habitRecords, simpleRecords } = useRecordsStore();
  const { habits } = useHabitsStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>('day');

  const getDateRange = (date: Date, period: ViewPeriod) => {
    switch (period) {
      case 'day':
        return { start: date, end: date };
      case 'week':
        return { start: startOfWeek(date, { weekStartsOn: 1 }), end: endOfWeek(date, { weekStartsOn: 1 }) };
      case 'month':
        return { start: startOfMonth(date), end: endOfMonth(date) };
      case 'year':
        return { start: startOfYear(date), end: endOfYear(date) };
    }
  };

  const { start, end } = getDateRange(currentDate, viewPeriod);

  const getRecordsInRange = () => {
    return {
      habitRecords: habitRecords.filter(record => {
        const recordDate = new Date(record.start_time);
        return recordDate >= start && recordDate <= end;
      }),
      simpleRecords: simpleRecords.filter(record => {
        const recordDate = new Date(record.created_at);
        return recordDate >= start && recordDate <= end;
      })
    };
  };

  const records = getRecordsInRange();

  // 統計計算
  const totalHabits = habits.length;
  const completedHabits = records.habitRecords.filter(r => r.is_completed).length;
  const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
  
  const totalTime = records.habitRecords.reduce((sum, record) => 
    sum + (record.actual_duration_seconds || 0), 0
  );
  
  const averageMood = records.habitRecords.length > 0 
    ? Math.round(records.habitRecords.reduce((sum, record) => 
        sum + (record.actual_mood || 3), 0) / records.habitRecords.length)
    : 0;

  // 連続日数計算（簡易版）
  const streakDays = 7; // 実際の実装ではデータベースから取得
  
  // PB更新数（簡易版）
  const newPBs = 2; // 実際の実装ではデータベースから取得
  
  // ご褒美獲得数（簡易版）
  const rewardsEarned = 1; // 実際の実装ではデータベースから取得

  const formatDateRange = () => {
    switch (viewPeriod) {
      case 'day':
        return format(currentDate, 'yyyy年MM月dd日(E)', { locale: ja });
      case 'week':
        return `${format(start, 'MM/dd')} - ${format(end, 'MM/dd')}`;
      case 'month':
        return format(currentDate, 'yyyy年MM月', { locale: ja });
      case 'year':
        // 1周年到達時のSpotify Wrapped風演出
        const isFirstYear = new Date().getFullYear() - new Date('2024-01-01').getFullYear() === 1;
        return isFirstYear 
          ? `${format(currentDate, 'yyyy年', { locale: ja })} 🎉 1周年記念！`
          : format(currentDate, 'yyyy年', { locale: ja });
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (viewPeriod) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return '😊';
    if (mood >= 3) return '😐';
    if (mood >= 2) return '😕';
    return '😢';
  };

  const getStartTimeStatus = (record: HabitRecord) => {
    // 実際の実装では、予定時間との比較を行う
    return { status: 'on-time', icon: '🟢' }; // 簡易版
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">リザルト</h1>
        <p className="text-gray-600 mt-1">習慣化の成果を確認</p>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateDate('prev')}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          ←
        </button>
        
        <div className="text-center">
          <div className="font-medium text-gray-900">{formatDateRange()}</div>
        </div>
        
        <button
          onClick={() => navigateDate('next')}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          →
        </button>
      </div>

      {/* View Period Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {(['day', 'week', 'month', 'year'] as ViewPeriod[]).map((period) => (
          <button
            key={period}
            onClick={() => setViewPeriod(period)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              viewPeriod === period
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {period === 'day' && '日'}
            {period === 'week' && '週'}
            {period === 'month' && '月'}
            {period === 'year' && '年'}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <Target size={20} className="text-blue-600 mr-2" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
              <div className="text-sm text-gray-600">達成率</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <TrendingUp size={20} className="text-green-600 mr-2" />
            <div>
              <div className="text-2xl font-bold text-green-600">{streakDays}日</div>
              <div className="text-sm text-gray-600">連続記録</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <Clock size={20} className="text-purple-600 mr-2" />
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.floor(totalTime / 60)}分
              </div>
              <div className="text-sm text-gray-600">総時間</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <Award size={20} className="text-yellow-600 mr-2" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{rewardsEarned}</div>
              <div className="text-sm text-gray-600">ご褒美獲得</div>
            </div>
          </div>
        </div>
      </div>

      {/* Habit Records */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">習慣記録</h2>
        
        {records.habitRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <p>この期間の記録はありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.habitRecords.map((record) => {
              const habit = habits.find(h => h.id === record.habit_id);
              const startTimeStatus = getStartTimeStatus(record);
              
              return (
                <div key={record.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {habit?.if_condition} → {habit?.then_action}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        開始時間: {format(new Date(record.start_time), 'HH:mm')}
                        <span className="ml-2">{startTimeStatus.icon}</span>
                      </div>
                      {record.actual_duration_seconds && (
                        <div className="text-sm text-gray-600">
                          所要時間: {Math.floor(record.actual_duration_seconds / 60)}分
                          {record.actual_duration_seconds % 60 > 0 && 
                            ` ${record.actual_duration_seconds % 60}秒`
                          }
                        </div>
                      )}
                      {record.actual_mood && (
                        <div className="text-sm text-gray-600 mt-1">
                          気分: {getMoodIcon(record.actual_mood)} {record.actual_mood}/5
                        </div>
                      )}
                    </div>
                    
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      record.is_completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {record.is_completed ? '完了' : '未完了'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Simple Records */}
      {records.simpleRecords.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">シンプル記録</h2>
          
          <div className="space-y-2">
            {records.simpleRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-900">{record.action}</div>
                  {record.actual_mood && (
                    <div className="text-sm text-gray-600">
                      {getMoodIcon(record.actual_mood)} {record.actual_mood}/5
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(record.created_at), 'HH:mm')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mood Comparison Chart (Placeholder) */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">気分の変化</h2>
        <div className="text-center py-8 text-gray-500">
          <p>グラフ表示エリア</p>
          <p className="text-sm mt-1">予測気分 vs 結果気分の比較グラフ</p>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">達成バッジ</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              🏆
            </div>
            <div className="text-sm font-medium text-gray-900">連続10日</div>
            <div className="text-xs text-gray-600">達成済み</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              🎯
            </div>
            <div className="text-sm font-medium text-gray-900">PB更新</div>
            <div className="text-xs text-gray-600">未達成</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              📝
            </div>
            <div className="text-sm font-medium text-gray-900">記録10日</div>
            <div className="text-xs text-gray-600">未達成</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
