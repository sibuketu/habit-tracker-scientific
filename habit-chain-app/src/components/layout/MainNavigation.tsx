'use client';

import { useState } from 'react';
import { useNavigationStore } from '@/store';
import { MainTab } from '@/types';
import { Home, BookOpen, Settings, Timer, Calendar } from 'lucide-react';

const MainNavigation = () => {
  const { currentTab, setCurrentTab } = useNavigationStore();

  const tabs = [
    { id: 'home' as MainTab, label: 'ホーム', icon: Home },
    { id: 'record' as MainTab, label: '記録', icon: BookOpen },
    { id: 'habit-setting' as MainTab, label: '習慣設定', icon: Settings },
    { id: 'time-attack' as MainTab, label: 'タイムアタック', icon: Timer },
    { id: 'my-routine' as MainTab, label: 'Myルーティーン', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MainNavigation;
