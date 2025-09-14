'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import HabitCard, { Habit } from '../HabitCard';
import RewardSystem from '../RewardSystem';
import ExtendedRecordMiniApp from '../miniapps/ExtendedRecordMiniApp';
import TimeAttackChainMiniApp from '../miniapps/TimeAttackChainMiniApp';
import { Calendar, TrendingUp, Target, Award, Clock, Heart, Trophy, Star, Settings, Plus, X, Zap } from 'lucide-react';
import { useMiniAppStore, useNavigationStore } from '@/store';

// モックデータ
const mockHabits: Habit[] = [
  { id: '1', icon: 'sun', name: '朝の日光浴', time: '07:00', status: 'completed' },
  { id: '2', icon: 'book', name: '読書', time: '20:00', status: 'pending' },
  { id: '3', icon: 'dumbbell', name: '筋トレ', time: '19:00', status: 'skipped' },
];

const mockProgressData = [
  { name: '完了', value: 1, color: '#10B981' },
  { name: '未完了', value: 2, color: '#6B7280' },
];

// 気分比較データ（過去7日）
const moodComparisonData = [
  { day: '月', predicted: 4, actual: 3 },
  { day: '火', predicted: 3, actual: 4 },
  { day: '水', predicted: 4, actual: 4 },
  { day: '木', predicted: 3, actual: 2 },
  { day: '金', predicted: 4, actual: 5 },
  { day: '土', predicted: 5, actual: 4 },
  { day: '日', predicted: 4, actual: 4 },
];

type ViewPeriod = 'day' | 'week' | 'month';

interface HomeScreenProps {
  onShowResult?: () => void;
}

export default function HomeScreen({ onShowResult }: HomeScreenProps) {
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>('day');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // 仮の通知数
  const [isEditMode, setIsEditMode] = useState(false);
  const [showExtendedRecord, setShowExtendedRecord] = useState(false);
  const [showTimeAttackChain, setShowTimeAttackChain] = useState(false);
  const [availableCards, setAvailableCards] = useState([
    { id: 'progress', name: '今日の進捗', visible: true },
    { id: 'result-summary', name: 'リザルトサマリー', visible: true },
    { id: 'mood-graph', name: '予測気分vs結果気分', visible: true },
    { id: 'reward-system', name: 'ご褒美システム', visible: true },
    { id: 'pb-update', name: 'PB更新', visible: false },
    { id: 'streak-record', name: '記録連続', visible: false },
    { id: 'habit-performance', name: '習慣別パフォーマンス', visible: false },
    { id: 'community-status', name: 'コミュニティ状況', visible: false },
    { id: 'miniapp-access', name: 'MiniAppアクセス', visible: true },
  ]);

  const { miniApps, enabledMiniApps } = useMiniAppStore();
  const { setCurrentTab } = useNavigationStore();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // オンライン/オフライン状態の監視
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // モック統計データ
  const stats = {
    day: {
      totalHabits: 3,
      completedHabits: 1,
      cumulativeDifference: -45, // 秒（負の値は遅れ）
      streakDays: 7,
      rewardsEarned: 2,
      startTimeEvaluation: 'on-time' as 'early' | 'on-time' | 'late',
    },
    week: {
      totalHabits: 21,
      completedHabits: 18,
      cumulativeDifference: -120,
      streakDays: 7,
      rewardsEarned: 5,
      startTimeEvaluation: 'early' as 'early' | 'on-time' | 'late',
    },
    month: {
      totalHabits: 90,
      completedHabits: 75,
      cumulativeDifference: -300,
      streakDays: 7,
      rewardsEarned: 12,
      startTimeEvaluation: 'late' as 'early' | 'on-time' | 'late',
    },
  };

  const currentStats = stats[viewPeriod];

  const getStartTimeIcon = (evaluation: string) => {
    switch (evaluation) {
      case 'early': return <Clock className="w-5 h-5 text-green-400" />;
      case 'on-time': return <Clock className="w-5 h-5 text-blue-400" />;
      case 'late': return <Clock className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatTimeDifference = (seconds: number) => {
    const absSeconds = Math.abs(seconds);
    const minutes = Math.floor(absSeconds / 60);
    const remainingSeconds = absSeconds % 60;
    const sign = seconds < 0 ? '-' : '+';
    return `${sign}${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleCardVisibility = (cardId: string) => {
    setAvailableCards(prev => 
      prev.map(card => 
        card.id === cardId ? { ...card, visible: !card.visible } : card
      )
    );
  };

  const visibleCards = availableCards.filter(card => card.visible);
  const hiddenCards = availableCards.filter(card => !card.visible);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-white tracking-wide">今日の習慣</h1>
          <div className="flex items-center gap-2">
            {/* 通知ボタン */}
            <button
              onClick={() => setShowNotificationModal(true)}
              className="relative w-8 h-8 flex items-center justify-center"
            >
              <span className="text-lg">🔔</span>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {notificationCount}
                </span>
              )}
            </button>
            {/* Gift寄付ボタン */}
            <button
              onClick={() => {
                // Gift寄付ページに遷移
                console.log('Gift寄付ページへ');
                // 実際の画面遷移を実装
                window.location.href = '/gift-donation';
              }}
              className="w-8 h-8 flex items-center justify-center"
            >
              <span className="text-lg">🎁</span>
            </button>
            {/* サブスクリプションボタン */}
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="w-8 h-8 flex items-center justify-center"
            >
              <span className="text-lg">💎</span>
            </button>
            {/* 編集ボタン */}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
                    <p className="text-gray-300 text-sm font-medium">2024年1月15日</p>
                    {/* オフラインインジケーター */}
                    {!isOnline && (
                      <div className="mt-2 px-3 py-1 bg-yellow-600 bg-opacity-20 border border-yellow-500 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-yellow-400 text-xs">オフライン - モック決済モード</span>
                        </div>
                      </div>
                    )}
                  </div>

      {/* 期間切替 */}
      <div className="px-4 mb-4">
        <div className="flex space-x-1 bg-gray-800 rounded-xl p-1">
          {(['day', 'week', 'month'] as ViewPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setViewPeriod(period)}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                viewPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400'
              }`}
            >
              {period === 'day' ? '日' : period === 'week' ? '週' : '月'}
            </button>
          ))}
        </div>
      </div>

      {/* 編集モード説明 */}
      {isEditMode && (
        <div className="px-4 mb-4">
          <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">編集モード</h3>
            <p className="text-sm text-gray-300 mb-3">
              カードの表示/非表示を切り替えて、ホーム画面をカスタマイズできます。
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditMode(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                完了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* リザルトサマリー */}
      {visibleCards.find(card => card.id === 'result-summary') && (
        <div className="px-4 mb-4">
          <div className="bg-gray-800 rounded-xl p-4 relative">
            {isEditMode && (
              <button
                onClick={() => toggleCardVisibility('result-summary')}
                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <X size={14} />
              </button>
            )}
            <h2 className="text-lg font-bold text-white mb-3 tracking-wide">リザルトサマリー</h2>
          
          {/* 統計カード */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-700 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-300 font-medium">完了率</p>
                  <p className="text-xl font-bold text-green-400">
                    {Math.round((currentStats.completedHabits / currentStats.totalHabits) * 100)}%
                  </p>
                </div>
                <Target className="w-6 h-6 text-green-400" />
              </div>
            </div>

            <div className="bg-gray-700 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-300 font-medium">累計差分</p>
                  <p className={`text-xl font-bold ${currentStats.cumulativeDifference < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {formatTimeDifference(currentStats.cumulativeDifference)}
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="bg-gray-700 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-300 font-medium">連続日数</p>
                  <p className="text-xl font-bold text-blue-400">{currentStats.streakDays}日</p>
                </div>
                <Trophy className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="bg-gray-700 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-300 font-medium">ご褒美獲得</p>
                  <p className="text-xl font-bold text-yellow-400">{currentStats.rewardsEarned}個</p>
                </div>
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* 開始時間評価 */}
          <div className="bg-gray-700 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">開始時間評価</h3>
                <p className="text-xs text-gray-400">
                  {currentStats.startTimeEvaluation === 'early' && '早めに開始'}
                  {currentStats.startTimeEvaluation === 'on-time' && 'オンタイム'}
                  {currentStats.startTimeEvaluation === 'late' && '遅れて開始'}
                </p>
              </div>
              {getStartTimeIcon(currentStats.startTimeEvaluation)}
            </div>
          </div>

          {/* 気分比較グラフ */}
          <div className="bg-gray-700 rounded-xl p-3">
            <h3 className="text-sm font-bold text-white mb-3">予測気分 vs 結果気分</h3>
            <div className="w-full h-36">
              <LineChart width={300} height={144} data={moodComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" domain={[1, 5]} fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                    fontSize: '12px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="予測気分"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="結果気分"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* 進捗サマリー */}
      {visibleCards.find(card => card.id === 'progress') && (
        <div className="px-4 mb-4">
          <div className="bg-gray-800 rounded-xl p-4 relative">
            {isEditMode && (
              <button
                onClick={() => toggleCardVisibility('progress')}
                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <X size={14} />
              </button>
            )}
            <h2 className="text-lg font-bold text-white mb-3 tracking-wide">今日の進捗</h2>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="w-full h-24">
                <PieChart width={200} height={96}>
                  <Pie
                    data={mockProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-green-400">1/3</div>
              <div className="text-xs text-gray-400">完了</div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* 習慣リスト */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-bold text-white mb-3 tracking-wide">今日のルーティーン</h2>
        <div className="space-y-3">
          {mockHabits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </div>

          {/* ご褒美システム */}
          {visibleCards.find(card => card.id === 'reward-system') && (
            <div className="px-4 mb-4">
              <RewardSystem
                streakDays={currentStats.streakDays}
                pbCount={0}
                recordCount={0}
                onRewardClaimed={(rewardId) => {
                  console.log('Reward claimed:', rewardId);
                  // 実際の実装では状態更新やデータベース保存
                }}
              />
            </div>
          )}

          {/* MiniAppアクセス */}
          {visibleCards.find(card => card.id === 'miniapp-access') && (
            <div className="px-4 mb-4">
              <div className="bg-gray-800 rounded-xl p-4 relative">
                {isEditMode && (
                  <button
                    onClick={() => toggleCardVisibility('miniapp-access')}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
                <h2 className="text-lg font-bold text-white mb-3 tracking-wide">MiniAppアクセス</h2>
                <div className="grid grid-cols-2 gap-3">
                  {enabledMiniApps.map((miniApp) => (
                    <button
                      key={miniApp.id}
                      onClick={() => {
                        if (miniApp.type === 'extended_record') {
                          setShowExtendedRecord(true);
                        } else if (miniApp.type === 'time_attack_chain') {
                          setShowTimeAttackChain(true);
                        }
                      }}
                      className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{miniApp.icon}</span>
                        <div>
                          <div className="text-white font-medium text-sm">{miniApp.name}</div>
                          <div className="text-gray-400 text-xs">{miniApp.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {miniApps.filter(app => !app.isUnlocked).map((miniApp) => (
                    <div
                      key={miniApp.id}
                      className="p-4 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600 text-left relative"
                    >
                      <div className="flex items-center space-x-3 opacity-50">
                        <span className="text-2xl">{miniApp.icon}</span>
                        <div>
                          <div className="text-white font-medium text-sm">{miniApp.name}</div>
                          <div className="text-gray-400 text-xs">{miniApp.description}</div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">🔒</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

      {/* 追加カードセクション（編集モード時） */}
      {isEditMode && hiddenCards.length > 0 && (
        <div className="px-4 mb-4">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-3">追加できるカード</h3>
            <div className="grid grid-cols-2 gap-3">
              {hiddenCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => toggleCardVisibility(card.id)}
                  className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Plus size={16} className="text-green-400" />
                    <span className="text-sm text-white">{card.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

          {/* リザルトボタン */}
          <div className="px-4 pb-6">
            <button
              onClick={onShowResult}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              詳細リザルトを見る
            </button>
          </div>

          {/* MiniApp Modals */}
          {showExtendedRecord && (
            <ExtendedRecordMiniApp
              onClose={() => setShowExtendedRecord(false)}
            />
          )}

          {showTimeAttackChain && (
            <TimeAttackChainMiniApp
              onClose={() => setShowTimeAttackChain(false)}
              habitId="default-habit"
            />
          )}

      {/* 通知モーダル */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-11/12 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">通知</h2>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                <span className="text-2xl">🏆</span>
                <div>
                  <h3 className="font-semibold">PB更新!</h3>
                  <p className="text-sm text-gray-400">新しい自己ベストを記録しました!</p>
                  <p className="text-xs text-gray-500">2時間前</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="font-semibold">連続記録達成!</h3>
                  <p className="text-sm text-gray-400">7日間連続で習慣を達成しました</p>
                  <p className="text-xs text-gray-500">1日前</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                <span className="text-2xl">🎉</span>
                <div>
                  <h3 className="font-semibold">マイルストーン達成!</h3>
                  <p className="text-sm text-gray-400">100回目の習慣達成おめでとう!</p>
                  <p className="text-xs text-gray-500">3日前</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setNotificationCount(0);
                  setShowNotificationModal(false);
                }}
                className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition-colors"
              >
                すべて削除
              </button>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* サブスクリプションモーダル */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-11/12 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">プレミアムプラン</h2>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">¥4,500/月</div>
              <p className="text-gray-400">すべての機能が利用可能</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>無制限の習慣管理</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>詳細な進捗分析</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>カスタムルーティーン</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>タイムアタック機能</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowSubscriptionModal(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              今すぐ始める
            </button>
          </div>
        </div>
      )}
    </div>
  );
}