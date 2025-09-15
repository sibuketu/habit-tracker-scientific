'use client';

import React from 'react';
import { X, Zap, BookOpen, Users, BarChart3, Lock } from 'lucide-react';
import { useMiniAppStore } from '@/store';
import { MiniAppType } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { miniApps, enabledMiniApps, toggleMiniApp } = useMiniAppStore();

  const getMiniAppIcon = (type: MiniAppType) => {
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
    <>
      {/* オーバーレイ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* サイドバー */}
      <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-gray-900 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">メニュー</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* MiniApp選択セクション */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">MiniApp選択</h3>
            <div className="space-y-3">
              {miniApps.map((miniApp) => (
                <div
                  key={miniApp.id}
                  className={`p-4 rounded-lg border transition-all ${
                    miniApp.isActive
                      ? 'bg-blue-900 border-blue-500'
                      : miniApp.isUnlocked
                      ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 cursor-pointer'
                      : 'bg-gray-800 border-gray-700 opacity-50'
                  }`}
                  onClick={() => {
                    if (miniApp.isUnlocked) {
                      toggleMiniApp(miniApp.id);
                      onClose();
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    {getMiniAppIcon(miniApp.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-medium">{miniApp.name}</h4>
                        {miniApp.isActive && (
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        )}
                        {!miniApp.isUnlocked && (
                          <Lock size={14} className="text-gray-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{miniApp.description}</p>
                      {!miniApp.isUnlocked && (
                        <p className="text-yellow-400 text-xs mt-2">
                          60日達成でアンロック
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 習慣設定のテクニック集 */}
          <div className="mb-6">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h3 className="text-white font-medium mb-2">習慣設定のテクニック集</h3>
              <p className="text-gray-400 text-sm">
                If-Then Planningの効果的な使い方や習慣化のコツを学べます
              </p>
            </div>
          </div>

          {/* ヘルプ・FAQ */}
          <div className="mb-6">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h3 className="text-white font-medium mb-2">ヘルプ・FAQ</h3>
              <p className="text-gray-400 text-sm">
                アプリの使い方やトラブルシューティング
              </p>
            </div>
          </div>

          {/* 現在アクティブなMiniAppの情報 */}
          {enabledMiniApps.length > 0 && (
            <div className="mt-8 p-4 bg-green-900 bg-opacity-30 border border-green-500 rounded-lg">
              <h3 className="text-green-400 font-medium mb-2">現在アクティブ</h3>
              {enabledMiniApps.map((miniApp) => (
                <div key={miniApp.id} className="flex items-center space-x-2">
                  {getMiniAppIcon(miniApp.type)}
                  <span className="text-white text-sm">{miniApp.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;