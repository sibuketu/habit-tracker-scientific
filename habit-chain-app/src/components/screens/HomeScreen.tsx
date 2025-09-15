'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Menu,
  Gift,
  Bell,
  Zap,
  BookOpen,
  Users,
  BarChart3,
  Plus,
  X,
  ChevronRight
} from 'lucide-react';
import { useMiniAppStore, useNavigationStore } from '@/store';

interface HomeScreenProps {
  onShowResult?: () => void;
  onOpenSidebar?: () => void;
}

export default function HomeScreen({ onShowResult, onOpenSidebar }: HomeScreenProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { miniApps, enabledMiniApps } = useMiniAppStore();
  const { setCurrentTab } = useNavigationStore();

  // 初期表示の最小化：基本的なカードのみ表示
  const [availableCards, setAvailableCards] = useState([
    { id: 'current-habit', name: '今日の習慣', visible: true },
    { id: 'miniapp-access', name: 'MiniAppアクセス', visible: true },
    { id: 'progress', name: '今日の進捗', visible: false },
    { id: 'result-summary', name: 'リザルトサマリー', visible: false },
    { id: 'mood-graph', name: '予測気分vs結果気分', visible: false },
    { id: 'reward-system', name: 'ご褒美システム', visible: false },
    { id: 'pb-update', name: 'PB更新', visible: false },
    { id: 'streak-record', name: '記録連続', visible: false },
    { id: 'habit-performance', name: '習慣別パフォーマンス', visible: false },
    { id: 'community-status', name: 'コミュニティ状況', visible: false },
  ]);

  const toggleCardVisibility = (cardId: string) => {
    setAvailableCards(prev => 
      prev.map(card => 
        card.id === cardId ? { ...card, visible: !card.visible } : card
      )
    );
  };

  const visibleCards = availableCards.filter(card => card.visible);
  const hiddenCards = availableCards.filter(card => !card.visible);

  const getMiniAppIcon = (type: string) => {
    switch (type) {
      case 'speedrun':
        return <Zap className="text-yellow-400" size={24} />;
      case 'diary':
        return <BookOpen className="text-blue-400" size={24} />;
      case 'community':
        return <Users className="text-green-400" size={24} />;
      case 'analytics':
        return <BarChart3 className="text-purple-400" size={24} />;
      default:
        return <Zap className="text-gray-400" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-white tracking-wide">今日の習慣</h1>
          <div className="flex items-center gap-2">
            {/* 通知ボタン */}
            <button
              onClick={() => {/* 通知モーダルを開く */}}
              className="relative w-8 h-8 flex items-center justify-center"
            >
              <Bell size={18} className="text-gray-400" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
                3
                </span>
            </button>
            
            {/* Gift寄付ボタン */}
            <button
              onClick={() => setCurrentTab('gift')}
              className="w-8 h-8 flex items-center justify-center"
            >
              <Gift size={18} className="text-gray-400" />
            </button>
            
            {/* 設定ボタン */}
            <button
              onClick={() => setCurrentTab('settings')}
              className="w-8 h-8 flex items-center justify-center"
            >
              <Settings size={18} className="text-gray-400" />
            </button>
            
            {/* ハンバーガーメニュー（サイドバー） */}
            <button
              onClick={() => onOpenSidebar?.()}
              className="w-8 h-8 flex items-center justify-center"
            >
              <Menu size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
        <p className="text-gray-300 text-sm font-medium">2024年1月15日</p>
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

      {/* 今日の習慣カード */}
      {visibleCards.find(card => card.id === 'current-habit') && (
      <div className="px-4 mb-4">
          <div className="bg-gray-800 rounded-xl p-4 relative">
            {isEditMode && (
              <button
                onClick={() => toggleCardVisibility('current-habit')}
                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <X size={14} />
              </button>
            )}
            <h2 className="text-lg font-bold text-white mb-3 tracking-wide">今日の習慣</h2>
            
            {/* If-Then習慣の表示 */}
            <div className="space-y-3">
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">IF:</span>
                  <span className="text-xs text-gray-400">朝7時に目覚ましが鳴ったら</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">THEN:</span>
                  <span className="text-sm text-white">ベッドから起き上がる</span>
              </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">ステータス:</span>
                  <span className="text-xs text-green-400">完了済み</span>
                </div>
              </div>
              
              <button
                onClick={() => setCurrentTab('record')}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                記録を追加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MiniAppアクセスカード */}
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
            
            {/* アプリ内アプリの案内（要件定義通り） */}
            <div className="space-y-3">
              {/* 習慣スピードラン */}
              <div className="bg-gradient-to-r from-yellow-900 to-orange-900 rounded-lg p-4 border border-yellow-500">
                <div className="flex items-center space-x-3">
                  <Zap className="text-yellow-400" size={32} />
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">習慣スピードラン</h3>
                    <p className="text-gray-300 text-sm mt-1">
                      習慣をスピードラン形式で実行し、タイムを競う機能です。
                      より速く、より効率的に習慣を身につけましょう。
                    </p>
                  </div>
            </div>
                <button
                  onClick={() => {/* スピードラン画面へ */}}
                  className="w-full mt-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                >
                  スピードランを開始
                </button>
              </div>

              {/* 日記 */}
              <div className={`rounded-lg p-4 border ${
                miniApps.find(app => app.type === 'diary')?.isUnlocked 
                  ? 'bg-gradient-to-r from-blue-900 to-indigo-900 border-blue-500' 
                  : 'bg-gray-700 border-gray-600 opacity-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <BookOpen className="text-blue-400" size={32} />
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">日記</h3>
                    <p className="text-gray-300 text-sm mt-1">
                      成功・失敗・反省・感謝の記録を通じて、習慣の振り返りと内省を深める機能です。
                    </p>
                    {!miniApps.find(app => app.type === 'diary')?.isUnlocked && (
                      <p className="text-yellow-400 text-xs mt-2">60日達成でアンロック</p>
                    )}
              </div>
              </div>
                {miniApps.find(app => app.type === 'diary')?.isUnlocked && (
                  <button
                    onClick={() => {/* 日記画面へ */}}
                    className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    日記を開く
                  </button>
                )}
              </div>
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

      {/* 編集ボタン（非編集モード時のみ表示） */}
      {!isEditMode && (
        <div className="px-4 pb-6">
          <button
            onClick={() => setIsEditMode(true)}
            className="w-full py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-600"
          >
            ホーム画面をカスタマイズ
          </button>
        </div>
      )}
    </div>
  );
}