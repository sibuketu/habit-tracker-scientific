import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, MessageCircle, PenTool, Target, Settings } from 'lucide-react';
import BottomNavButton from './BottomNavButton';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'results',
      title: 'リザルト',
      icon: BarChart3,
      emoji: '📊',
      onClick: () => navigate('/results'),
      path: '/results'
    },
    {
      id: 'messages',
      title: 'メッセージ',
      icon: MessageCircle,
      emoji: '💬',
      onClick: () => navigate('/messages'),
      path: '/messages'
    },
    {
      id: 'daily-record',
      title: '今日の記録',
      icon: PenTool,
      emoji: '📝',
      onClick: () => navigate('/records'),
      path: '/records'
    },
    {
      id: 'habit-settings',
      title: '習慣設定',
      icon: Target,
      emoji: '⚙️',
      onClick: () => navigate('/habits'),
      path: '/habits'
    },
    {
      id: 'settings',
      title: '設定',
      icon: Settings,
      emoji: '🔧',
      onClick: () => navigate('/settings'),
      path: '/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            習慣トラッカー
          </h1>
          <p className="text-sm text-gray-600">
            今日も一歩ずつ、理想の自分に
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Today's Progress Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">今日の進捗</h2>
              <p className="text-blue-100 text-sm">頑張っていますね！</p>
            </div>
            <div className="text-3xl">🎯</div>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">7</div>
              <div className="text-xs text-blue-100">継続日数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3/4</div>
              <div className="text-xs text-blue-100">今日の習慣</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-xs text-blue-100">今月達成率</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 px-2">クイックアクション</h3>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">習慣を記録する</p>
                <p className="text-sm text-gray-500">今日の習慣を記録しましょう</p>
              </div>
              <button 
                onClick={() => navigate('/records')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                記録
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📝</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">日記を書く</p>
                <p className="text-sm text-gray-500">今日の振り返りをしましょう</p>
              </div>
              <button 
                onClick={() => navigate('/records')}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
              >
                書く
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-2 py-2 safe-area-pb sticky bottom-0">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <BottomNavButton
              key={item.id}
              title={item.title}
              icon={item.icon}
              emoji={item.emoji}
              onClick={item.onClick}
              isActive={location.pathname === item.path || (location.pathname === '/' && item.id === 'results')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;