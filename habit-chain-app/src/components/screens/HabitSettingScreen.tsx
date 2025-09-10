'use client';

import { useState } from 'react';
import { useHabitsStore } from '@/store';
import { Habit, MoodLevel } from '@/types';
import { Settings, Target, Clock } from 'lucide-react';

const HabitSettingScreen = () => {
  const { habits, addHabit, updateHabit } = useHabitsStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [formData, setFormData] = useState({
    if_condition: '',
    then_action: '',
    target_duration_minutes: 0,
    target_duration_seconds: 0,
    big_goal: '',
    predicted_mood: 3 as MoodLevel,
    predicted_difficulty: 3 as MoodLevel,
    alternative_action: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const targetDurationSeconds = formData.target_duration_minutes * 60 + formData.target_duration_seconds;
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      user_id: 'current-user',
      if_condition: formData.if_condition,
      then_action: formData.then_action,
      target_duration_seconds: targetDurationSeconds,
      version: '1.0',
      is_active: true,
      big_goal: formData.big_goal,
      predicted_mood: formData.predicted_mood,
      predicted_difficulty: formData.predicted_difficulty,
      alternative_action: formData.alternative_action,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (editingHabit) {
      updateHabit(editingHabit.id, newHabit);
      setEditingHabit(null);
    } else {
      addHabit(newHabit);
    }

    // フォームリセット
    setFormData({
      if_condition: '',
      then_action: '',
      target_duration_minutes: 0,
      target_duration_seconds: 0,
      big_goal: '',
      predicted_mood: 3,
      predicted_difficulty: 3,
      alternative_action: '',
    });
    setIsAdding(false);
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setFormData({
      if_condition: habit.if_condition,
      then_action: habit.then_action,
      target_duration_minutes: Math.floor(habit.target_duration_seconds / 60),
      target_duration_seconds: habit.target_duration_seconds % 60,
      big_goal: habit.big_goal || '',
      predicted_mood: (habit.predicted_mood && habit.predicted_mood >= 1 && habit.predicted_mood <= 5) ? habit.predicted_mood as MoodLevel : (3 as MoodLevel),
      predicted_difficulty: (habit.predicted_difficulty && habit.predicted_difficulty >= 1 && habit.predicted_difficulty <= 5) ? habit.predicted_difficulty as MoodLevel : (3 as MoodLevel),
      alternative_action: habit.alternative_action || '',
    });
    setIsAdding(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">習慣設定</h1>
        <p className="text-gray-600 mt-1">IF-THEN習慣チェーンを作成</p>
      </div>

      {/* 自然な案内 */}
      {!isAdding && habits.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">最初の習慣を作成</h3>
          <p className="text-gray-600 mb-4">IF-THEN習慣チェーンで習慣化を始めましょう</p>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            習慣を作成
          </button>
        </div>
      )}
      
      {!isAdding && habits.length > 0 && (
        <div className="text-center py-4">
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            新しい習慣を追加
          </button>
        </div>
      )}

      {/* Add/Edit Habit Form */}
      {isAdding && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingHabit ? '習慣を編集' : '新しい習慣を追加'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* IF Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target size={16} className="inline mr-1" />
                IF（きっかけ）
              </label>
              <input
                type="text"
                value={formData.if_condition}
                onChange={(e) => setFormData({ ...formData, if_condition: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例: 朝起きたら、コーヒーを淹れたら"
                required
              />
            </div>

            {/* THEN Action */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Settings size={16} className="inline mr-1" />
                THEN（行動）
              </label>
              <input
                type="text"
                value={formData.then_action}
                onChange={(e) => setFormData({ ...formData, then_action: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例: 10分間瞑想する、本を1ページ読む"
                required
              />
            </div>

            {/* Target Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-1" />
                所要時間
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  value={formData.target_duration_minutes}
                  onChange={(e) => setFormData({ ...formData, target_duration_minutes: parseInt(e.target.value) || 0 })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="分"
                />
                <span className="flex items-center text-gray-500">分</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formData.target_duration_seconds}
                  onChange={(e) => setFormData({ ...formData, target_duration_seconds: parseInt(e.target.value) || 0 })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="秒"
                />
                <span className="flex items-center text-gray-500">秒</span>
              </div>
            </div>

            {/* Big Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                大目標
              </label>
              <textarea
                value={formData.big_goal}
                onChange={(e) => setFormData({ ...formData, big_goal: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="なぜその習慣に挑戦するか（例: 痩せて海に行きたい）"
              />
            </div>

            {/* Predicted Mood - アンロック機能 */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                予測気分
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  記録5回で解放
                </span>
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, predicted_mood: level as MoodLevel })}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-medium ${
                      formData.predicted_mood === level
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Predicted Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                予測難易度
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, predicted_difficulty: level as MoodLevel })}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-medium ${
                      formData.predicted_difficulty === level
                        ? 'border-orange-500 bg-orange-50 text-orange-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Alternative Action */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                代替行動
              </label>
              <input
                type="text"
                value={formData.alternative_action}
                onChange={(e) => setFormData({ ...formData, alternative_action: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例: 時間がない時は3分だけ瞑想する"
              />
            </div>

            {/* Form Actions */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingHabit(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingHabit ? '更新' : '作成'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Habits */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">設定済みの習慣</h2>
        
        {habits.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>まだ習慣が設定されていません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => (
              <div key={habit.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {habit.if_condition} → {habit.then_action}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      目標時間: {Math.floor(habit.target_duration_seconds / 60)}分
                      {habit.target_duration_seconds % 60 > 0 && 
                        ` ${habit.target_duration_seconds % 60}秒`
                      }
                    </div>
                    {habit.big_goal && (
                      <div className="text-sm text-gray-500 mt-1">
                        目標: {habit.big_goal}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-2">
                      バージョン: {habit.version}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleEdit(habit)}
                    className="ml-4 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    編集
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitSettingScreen;
