'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  User, 
  Palette, 
  Download, 
  Upload, 
  HelpCircle, 
  Menu,
  ChevronRight,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useNavigationStore } from '@/store';

interface SettingsScreenProps {
  onOpenSidebar?: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onOpenSidebar }) => {
  const [notifications, setNotifications] = useState({
    ifThenReminder: true,
    achievement: true,
    weeklyReport: false,
    streakWarning: true,
    resetReminder: false,
    incompleteRecord: true,
    news: false,
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-white tracking-wide">設定</h1>
          <button
            onClick={() => onOpenSidebar?.()}
            className="w-8 h-8 flex items-center justify-center"
          >
            <Menu size={20} />
          </button>
        </div>
        <p className="text-gray-300 text-sm font-medium">アプリの設定を管理</p>
      </div>

      {/* 通知設定 */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="text-blue-400" size={20} />
            <h2 className="text-lg font-semibold text-white">通知設定</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => {
              const labels: Record<string, string> = {
                ifThenReminder: 'If-Thenリマインダー',
                achievement: '達成祝い',
                weeklyReport: '週報',
                streakWarning: 'ストリーク警告',
                resetReminder: 'リセットリマインダー',
                incompleteRecord: '記録未完了通知',
                news: 'ニュース通知',
              };
              
              return (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{labels[key]}</span>
                  <button
                    onClick={() => toggleNotification(key as keyof typeof notifications)}
                    className="text-blue-400"
                  >
                    {value ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* プロフィール設定 */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-green-400" size={20} />
            <h2 className="text-lg font-semibold text-white">プロフィール</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">プロフィール編集</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">アカウント管理</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* テーマ・表示設定 */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="text-purple-400" size={20} />
            <h2 className="text-lg font-semibold text-white">テーマ・表示</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">テーマ</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1 rounded text-xs ${
                    theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  ライト
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1 rounded text-xs ${
                    theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  ダーク
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">フォントサイズ</span>
              <div className="flex space-x-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-3 py-1 rounded text-xs ${
                      fontSize === size ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MiniApp進行状況 */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="text-orange-400" size={20} />
            <h2 className="text-lg font-semibold text-white">MiniApp進行状況</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-white text-sm">習慣スピードラン</div>
                <div className="text-gray-400 text-xs">現在アクティブ</div>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-300 text-sm">日記</div>
                <div className="text-gray-400 text-xs">60日達成でアンロック</div>
              </div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-300 text-sm">コミュニティ</div>
                <div className="text-gray-400 text-xs">60日達成でアンロック</div>
              </div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* データ管理 */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Download className="text-cyan-400" size={20} />
            <h2 className="text-lg font-semibold text-white">データ管理</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">データエクスポート</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">データインポート</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">バックアップとリストア</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ヘルプ・サポート */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="text-yellow-400" size={20} />
            <h2 className="text-lg font-semibold text-white">ヘルプ・サポート</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">ヘルプ・FAQ</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">習慣設定のテクニック集</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">お問い合わせ</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* アプリ情報 */}
      <div className="px-4 pb-6">
        <div className="text-center text-gray-400 text-xs">
          <div>IF-THEN Habit Chain Speedrun</div>
          <div>Version 1.0.0</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
