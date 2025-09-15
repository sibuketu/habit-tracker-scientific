'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Calendar, 
  Clock, 
  Target, 
  Settings, 
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNavigationStore } from '@/store';

interface HabitSettingScreenProps {}

const HabitSettingScreen: React.FC<HabitSettingScreenProps> = () => {
  const { setCurrentTab } = useNavigationStore();
  const [showSubFeatures, setShowSubFeatures] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [formData, setFormData] = useState({
    ifCondition: '',
    thenAction: '',
    recordType: 'simple' as 'simple' | 'time_attack' | 'score_attack',
    targetDuration: '',
    alternativeAction: '',
    frequency: 'daily',
    endDate: '',
    phase: 'rookie' as 'rookie' | 'starter' | 'challenger' | 'master',
    predictedMood: 3,
    bigGoal: '',
    customReward: '',
    notificationEnabled: true,
    notificationTime: '09:00'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showMyRoutine, setShowMyRoutine] = useState(false);

  // Myルーティーンのモックデータ
  const mockRoutineEvents = [
    { id: '1', name: '朝の日光浴', time: '07:00', color: '#FFB300' },
    { id: '2', name: '読書', time: '20:00', color: '#9C27B0' },
    { id: '3', name: '筋トレ', time: '19:00', color: '#E53935' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.ifCondition.trim()) {
      newErrors.ifCondition = 'IF条件は必須です';
    } else if (!formData.ifCondition.includes('したら') && !formData.ifCondition.includes('の後')) {
      newErrors.ifCondition = '「◯◯したら」「◯◯の後」のような接続詞を含むことが望ましいです';
    }

    if (!formData.thenAction.trim()) {
      newErrors.thenAction = 'THEN行動は必須です';
    } else if (formData.thenAction.length < 1) {
      newErrors.thenAction = '具体的な行動を入力してください';
    }

    if (formData.recordType === 'time_attack' && !formData.targetDuration) {
      newErrors.targetDuration = '目標時間を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('習慣登録:', formData);
      // 実際の実装ではAPIに送信
      setCurrentTab('home');
    }
  };

  const handleIfConditionSelect = (event: any) => {
    setFormData(prev => ({
      ...prev,
      ifCondition: `${event.name}（${event.time}）`
    }));
    setShowMyRoutine(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={() => setCurrentTab('home')}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold text-white tracking-wide">習慣設定</h1>
          <div className="w-8"></div>
        </div>
        <p className="text-gray-300 text-sm font-medium">If-Then Planningで習慣を作成</p>
      </div>

      {/* メイン項目 */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-4">メイン項目</h2>
          
          {/* IF条件 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">IF（トリガー）</label>
              <button
                onClick={() => setShowMyRoutine(!showMyRoutine)}
                className="flex items-center space-x-1 text-blue-400 text-sm"
              >
                <Calendar size={14} />
                <span>Myルーティーンから選択</span>
              </button>
            </div>
            
            {showMyRoutine && (
              <div className="mb-3 p-3 bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-white mb-2">Myルーティーンイベント</h4>
                <div className="space-y-2">
                  {mockRoutineEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => handleIfConditionSelect(event)}
                      className="w-full p-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: event.color }}
                        ></div>
                        <span className="text-white text-sm">{event.name}</span>
                        <span className="text-gray-400 text-xs">{event.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <input
              type="text"
              value={formData.ifCondition}
              onChange={(e) => setFormData(prev => ({ ...prev, ifCondition: e.target.value }))}
              placeholder="例：朝7時に目覚ましが鳴ったら"
              className={`w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border ${
                errors.ifCondition ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.ifCondition && (
              <div className="flex items-center space-x-1 mt-1">
                <AlertCircle size={14} className="text-red-400" />
                <span className="text-red-400 text-xs">{errors.ifCondition}</span>
              </div>
            )}
            <p className="text-gray-400 text-xs mt-1">
              具体的な行動やタイミングを入力してください。「◯◯したら」「◯◯の後」のような接続詞を含むことが望ましいです。
            </p>
          </div>

          {/* THEN行動 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">THEN（行動内容）</label>
            <input
              type="text"
              value={formData.thenAction}
              onChange={(e) => setFormData(prev => ({ ...prev, thenAction: e.target.value }))}
              placeholder="例：ベッドから起き上がる"
              className={`w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border ${
                errors.thenAction ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.thenAction && (
              <div className="flex items-center space-x-1 mt-1">
                <AlertCircle size={14} className="text-red-400" />
                <span className="text-red-400 text-xs">{errors.thenAction}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* サブ機能 */}
      <div className="px-4 mb-6">
        <button
          onClick={() => setShowSubFeatures(!showSubFeatures)}
          className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Settings className="text-blue-400" size={20} />
            <span className="text-white font-medium">サブ機能</span>
          </div>
          {showSubFeatures ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showSubFeatures && (
          <div className="mt-4 bg-gray-800 rounded-xl p-4 space-y-4">
            {/* 記録方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">記録方式</label>
              <select
                value={formData.recordType}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  recordType: e.target.value as 'simple' | 'time_attack' | 'score_attack' 
                }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600"
              >
                <option value="simple">単純記録</option>
                <option value="time_attack">習慣スピードラン</option>
                <option value="score_attack">スコアアタック</option>
              </select>
            </div>

            {/* 目標時間（習慣スピードランの場合） */}
            {formData.recordType === 'time_attack' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">目標時間（分）</label>
                <input
                  type="number"
                  value={formData.targetDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetDuration: e.target.value }))}
                  placeholder="例：5"
                  className={`w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border ${
                    errors.targetDuration ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.targetDuration && (
                  <div className="flex items-center space-x-1 mt-1">
                    <AlertCircle size={14} className="text-red-400" />
                    <span className="text-red-400 text-xs">{errors.targetDuration}</span>
                  </div>
                )}
              </div>
            )}

            {/* 代替行動 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">代替行動（任意）</label>
              <input
                type="text"
                value={formData.alternativeAction}
                onChange={(e) => setFormData(prev => ({ ...prev, alternativeAction: e.target.value }))}
                placeholder="例：深呼吸を3回する"
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600"
              />
              <p className="text-gray-400 text-xs mt-1">
                IF条件を満たせなかった場合に代替で行う行動
              </p>
            </div>

            {/* 実行頻度 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">実行頻度</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600"
              >
                <option value="daily">毎日</option>
                <option value="weekdays">平日のみ</option>
                <option value="weekends">週末のみ</option>
                <option value="custom">カスタム</option>
              </select>
            </div>

            {/* 終了日 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">終了日（任意）</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600"
              />
            </div>

            {/* 習慣化フェーズ */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">習慣化フェーズ</label>
              <select
                value={formData.phase}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  phase: e.target.value as 'rookie' | 'starter' | 'challenger' | 'master' 
                }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600"
              >
                <option value="rookie">ルーキー</option>
                <option value="starter">スターター</option>
                <option value="challenger">チャレンジャー</option>
                <option value="master">マスター</option>
              </select>
            </div>

            {/* 予測気分 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">予測気分（1-5）</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData(prev => ({ ...prev, predictedMood: level }))}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      formData.predictedMood === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* 大目標設定 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">大目標設定（任意）</label>
              <input
                type="text"
                value={formData.bigGoal}
                onChange={(e) => setFormData(prev => ({ ...prev, bigGoal: e.target.value }))}
                placeholder="例：健康な体を作る"
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600"
              />
            </div>

            {/* ご褒美設定 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ご褒美設定（任意）</label>
              <input
                type="text"
                value={formData.customReward}
                onChange={(e) => setFormData(prev => ({ ...prev, customReward: e.target.value }))}
                placeholder="例：ゲーム時間を30分増やす"
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600"
              />
            </div>

            {/* 通知設定 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">通知設定</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">If-Thenリマインダー</span>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, notificationEnabled: !prev.notificationEnabled }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      formData.notificationEnabled ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      formData.notificationEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
                
                {formData.notificationEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">通知時間</label>
                    <input
                      type="time"
                      value={formData.notificationTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, notificationTime: e.target.value }))}
                      className="w-full p-2 bg-gray-700 rounded-lg text-white border border-gray-600"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ヘルプ */}
      <div className="px-4 mb-6">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Lightbulb className="text-yellow-400" size={20} />
            <span className="text-white font-medium">ヘルプ・ヒント</span>
          </div>
          {showHelp ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showHelp && (
          <div className="mt-4 bg-gray-800 rounded-xl p-4">
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <h4 className="text-white font-medium mb-1">If-Then Planningとは？</h4>
                <p>「もし◯◯したら、△△する」という形式で習慣を設定する手法です。具体的なトリガーと行動を結びつけることで、習慣化が容易になります。</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">IF条件のコツ</h4>
                <p>時間、場所、状況など、具体的で明確なトリガーを設定してください。曖昧な表現は避けましょう。</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">THEN行動のコツ</h4>
                <p>小さく、具体的で、実行可能な行動に分解してください。大きな目標は小さなステップに分けましょう。</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 登録ボタン */}
      <div className="px-4 pb-6">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <CheckCircle size={20} />
          <span>習慣を登録</span>
        </button>
      </div>
    </div>
  );
};

export default HabitSettingScreen;