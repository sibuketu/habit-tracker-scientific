'use client';

import { useState } from 'react';
import { useRecordsStore } from '@/store';
import { MoodLevel } from '@/types';
import { Gift } from 'lucide-react';

const RecordScreen = () => {
  const { addSimpleRecord } = useRecordsStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    action: '',
    predictedMood: 3 as MoodLevel,
    actualMood: 3 as MoodLevel,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord = {
      id: Date.now().toString(),
      user_id: 'current-user', // 実際の実装では認証されたユーザーID
      action: formData.action,
      predicted_mood: formData.predictedMood,
      actual_mood: formData.actualMood,
      notes: formData.notes,
      reward_claimed: false,
      created_at: new Date().toISOString(),
    };

    addSimpleRecord(newRecord);
    
    // フォームリセット
    setFormData({
      action: '',
      predictedMood: 3,
      actualMood: 3,
      notes: '',
    });
    setIsAdding(false);
  };

  const handleRewardClaim = () => {
    // ご褒美獲得演出
    console.log('Reward claimed!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">記録</h1>
        <p className="text-gray-600 mt-1">タイムアタック外のシンプル記録</p>
      </div>

      {/* 自然な案内 */}
      {!isAdding && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">記録を追加</h3>
          <p className="text-gray-600 mb-4">タイムアタック外のシンプルな記録を残しましょう</p>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            記録を追加
          </button>
        </div>
      )}

      {/* Add Record Form */}
      {isAdding && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">記録を追加</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Action */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                行動内容
              </label>
              <input
                type="text"
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例: 読書、散歩、瞑想など"
                required
              />
            </div>

            {/* Predicted Mood */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                予測気分
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, predictedMood: level as MoodLevel })}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-medium ${
                      formData.predictedMood === level
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>悪い</span>
                <span>良い</span>
              </div>
            </div>

            {/* Actual Mood */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                結果気分
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, actualMood: level as MoodLevel })}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-medium ${
                      formData.actualMood === level
                        ? 'border-green-500 bg-green-50 text-green-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>悪い</span>
                <span>良い</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                感想（任意）
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="今日の感想や気づきを記録..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                記録する
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reward Claim Button */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-yellow-800">ご褒美が獲得できました！</h3>
            <p className="text-sm text-yellow-700">記録10日連続達成</p>
          </div>
          <button
            onClick={handleRewardClaim}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
          >
            <Gift size={16} className="mr-1" />
            獲得
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordScreen;
