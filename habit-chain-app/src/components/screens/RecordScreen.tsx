'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Heart, Star, Plus, Gift, CheckCircle } from 'lucide-react';
import { MoodLevel } from '@/types';

interface SimpleRecord {
  id: string;
  action: string;
  predictedMood: MoodLevel;
  actualMood: MoodLevel;
  notes: string;
  rewardClaimed: boolean;
  createdAt: string;
}

export default function RecordScreen() {
  const [records, setRecords] = useState<SimpleRecord[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    action: '',
    predictedMood: 3 as MoodLevel,
    actualMood: 3 as MoodLevel,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: SimpleRecord = {
      id: Date.now().toString(),
      action: formData.action,
      predictedMood: formData.predictedMood,
      actualMood: formData.actualMood,
      notes: formData.notes,
      rewardClaimed: false,
      createdAt: new Date().toISOString(),
    };

    setRecords(prev => [newRecord, ...prev]);
    
    // フォームリセット
    setFormData({
      action: '',
      predictedMood: 3,
      actualMood: 3,
      notes: '',
    });
    setIsAdding(false);
  };

  const handleRewardClaim = (recordId: string) => {
    setRecords(prev => 
      prev.map(record => 
        record.id === recordId 
          ? { ...record, rewardClaimed: true }
          : record
      )
    );
    
    // ご褒美獲得演出
    console.log('Reward claimed!', recordId);
  };

  const getMoodIcon = (mood: MoodLevel) => {
    const icons = ['😢', '😕', '😐', '😊', '😄'];
    return icons[mood - 1];
  };

  const getMoodColor = (mood: MoodLevel) => {
    const colors = ['text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400', 'text-blue-400'];
    return colors[mood - 1];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-6">
      {/* ヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">**記録**</h1>
        <p className="text-gray-400">タイムアタック外のシンプル記録や不定期習慣を記録</p>
      </div>

      {/* ルール説明 */}
      <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">**記録ルール**</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• 前日の分は不可 → 記録自体を習慣化</li>
          <li>• 予測気分・結果気分の入力</li>
          <li>• 感想も任意で入力</li>
          <li>• 記述タイプの場合は「獲得ボタン」で演出発動</li>
        </ul>
      </div>

      {/* 記録追加ボタン */}
      <div className="mb-6">
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>**新しい記録を追加**</span>
        </button>
      </div>

      {/* 記録追加フォーム */}
      {isAdding && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">**記録を追加**</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                **行動内容**
              </label>
              <input
                type="text"
                value={formData.action}
                onChange={(e) => setFormData(prev => ({ ...prev, action: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例: 散歩、読書、瞑想など"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  **予測気分**
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, predictedMood: mood as MoodLevel }))}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${
                        formData.predictedMood === mood
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      {getMoodIcon(mood as MoodLevel)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  **結果気分**
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, actualMood: mood as MoodLevel }))}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${
                        formData.actualMood === mood
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      {getMoodIcon(mood as MoodLevel)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                **感想（任意）**
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="実行後の感想や気づきを記録..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                **記録を保存**
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 記録リスト */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">**記録履歴**</h2>
        
        {records.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">まだ記録がありません</p>
            <p className="text-sm text-gray-500 mt-2">最初の記録を追加してみましょう</p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <div key={record.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{record.action}</h3>
                      <span className="text-sm text-gray-400">
                        {formatDate(record.createdAt)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">予測:</span>
                        <span className={`text-lg ${getMoodColor(record.predictedMood)}`}>
                          {getMoodIcon(record.predictedMood)} {record.predictedMood}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">結果:</span>
                        <span className={`text-lg ${getMoodColor(record.actualMood)}`}>
                          {getMoodIcon(record.actualMood)} {record.actualMood}
                        </span>
                      </div>
                    </div>

                    {record.notes && (
                      <div className="bg-gray-700 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-300">{record.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      {record.rewardClaimed ? (
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircle size={16} />
                          <span className="text-sm font-medium">**ご褒美獲得済み**</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRewardClaim(record.id)}
                          className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                        >
                          <Gift size={16} />
                          <span>**ご褒美獲得**</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}