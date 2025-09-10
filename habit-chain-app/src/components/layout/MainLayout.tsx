'use client';

import { useState } from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import QuickLogScreen from '../screens/QuickLogScreen';
import LibraryScreen from '../screens/LibraryScreen';
import TimeAttackScreen from '../screens/TimeAttackScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

type TabType = 'dashboard' | 'quicklog' | 'library' | 'timeattack' | 'analytics';

const MainLayout = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');

  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'quicklog':
        return <QuickLogScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'timeattack':
        return <TimeAttackScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <main className="pb-20">
        {renderCurrentScreen()}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
        <div className="flex justify-around items-center py-2">
          {[
            { id: 'dashboard', label: 'ダッシュボード', icon: '🏠' },
            { id: 'quicklog', label: 'クイックログ', icon: '➕' },
            { id: 'library', label: 'ライブラリ', icon: '📚' },
            { id: 'timeattack', label: 'タイムアタック', icon: '⏱️' },
            { id: 'analytics', label: '分析', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as TabType)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                currentTab === tab.id 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;