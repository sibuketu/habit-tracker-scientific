'use client';

import React, { useState } from 'react';
import { Plus, Clock, Target, MapPin, Cloud, Zap, Tag, Save, X } from 'lucide-react';
import { useMiniAppStore } from '@/store';
import { ExtendedRecord } from '@/types';

interface ExtendedRecordMiniAppProps {
  onClose: () => void;
  habitId?: string;
  initialAction?: string;
}

export default function ExtendedRecordMiniApp({ onClose, habitId, initialAction }: ExtendedRecordMiniAppProps) {
  const { addExtendedRecord } = useMiniAppStore();
  const [formData, setFormData] = useState({
    action: initialAction || '',
    record_type: 'simple' as 'simple' | 'time_attack' | 'score_attack',
    target_duration: 30,
    actual_duration: 0,
    score: 0,
    predicted_mood: 3,
    actual_mood: 3,
    difficulty: 3,
    notes: '',
    tags: [] as string[],
    location: '',
    weather: '',
    energy_level: 3,
  });
  
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const record: ExtendedRecord = {
        id: Date.now().toString(),
        user_id: 'current-user', // 実際の実装では認証されたユーザーIDを使用
        habit_id: habitId,
        action: formData.action,
        record_type: formData.record_type,
        target_duration: formData.record_type !== 'simple' ? formData.target_duration : undefined,
        actual_duration: formData.actual_duration || undefined,
        score: formData.record_type === 'score_attack' ? formData.score : undefined,
        predicted_mood: formData.predicted_mood,
        actual_mood: formData.actual_mood,
        difficulty: formData.difficulty,
        notes: formData.notes || undefined,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        location: formData.location || undefined,
        weather: formData.weather || undefined,
        energy_level: formData.energy_level,
        created_at: new Date().toISOString(),
      };

      addExtendedRecord(record);
      onClose();
    } catch (error) {
      console.error('拡張記録の保存エラー:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">拡張記録</h2>
              <p className="text-sm text-gray-400">より詳細な記録を残しましょう</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <X size={16} className="text-gray-300" />
          </button>
        </div>

        <div className="space-y-6">
          {/* 基本情報 */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">基本情報</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  行動内容
                </label>
                <input
                  type="text"
                  value={formData.action}
                  onChange={(e) => setFormData(prev => ({ ...prev, action: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="実行した行動を入力"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  記録タイプ
                </label>
                <select
                  value={formData.record_type}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    record_type: e.target.value as any 
                  }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="simple">単純記録</option>
                  <option value="time_attack">タイムアタック</option>
                  <option value="score_attack">スコアアタック</option>
                </select>
              </div>
            </div>
          </div>

          {/* 時間・スコア情報 */}
          {(formData.record_type === 'time_attack' || formData.record_type === 'score_attack') && (
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">時間・スコア</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.record_type === 'time_attack' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        目標時間（分）
                      </label>
                      <input
                        type="number"
                        value={formData.target_duration}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          target_duration: parseInt(e.target.value) || 0 
                        }))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        実際の時間（分）
                      </label>
                      <input
                        type="number"
                        value={formData.actual_duration}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          actual_duration: parseInt(e.target.value) || 0 
                        }))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </>
                )}

                {formData.record_type === 'score_attack' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      スコア
                    </label>
                    <input
                      type="number"
                      value={formData.score}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        score: parseInt(e.target.value) || 0 
                      }))}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 気分・難易度 */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">気分・難易度</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  予測気分 (1-5)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData(prev => ({ ...prev, predicted_mood: level as any }))}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        formData.predicted_mood === level
                          ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-blue-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  実際の気分 (1-5)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData(prev => ({ ...prev, actual_mood: level as any }))}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        formData.actual_mood === level
                          ? 'border-green-500 bg-green-500 bg-opacity-20 text-green-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  難易度 (1-5)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData(prev => ({ ...prev, difficulty: level as any }))}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        formData.difficulty === level
                          ? 'border-orange-500 bg-orange-500 bg-opacity-20 text-orange-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">詳細情報</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  場所
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="実行した場所"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Cloud size={16} className="inline mr-1" />
                  天気
                </label>
                <select
                  value={formData.weather}
                  onChange={(e) => setFormData(prev => ({ ...prev, weather: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">選択してください</option>
                  <option value="sunny">晴れ</option>
                  <option value="cloudy">曇り</option>
                  <option value="rainy">雨</option>
                  <option value="snowy">雪</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Zap size={16} className="inline mr-1" />
                エネルギーレベル (1-5)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData(prev => ({ ...prev, energy_level: level as any }))}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      formData.energy_level === level
                        ? 'border-yellow-500 bg-yellow-500 bg-opacity-20 text-yellow-400'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Tag size={16} className="inline mr-1" />
                タグ
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm flex items-center space-x-1"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-300"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="タグを入力してEnter"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* メモ */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">メモ</h3>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="感想や気づきを記録..."
            />
          </div>

          {/* 保存ボタン */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.action.trim() || isSubmitting}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>保存中...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>保存</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

