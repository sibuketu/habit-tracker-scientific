'use client';

import React from 'react';
import { Home, Clock, Settings, Target, Calendar } from 'lucide-react';

type TabType = 'home' | 'record' | 'habit-setting' | 'time-attack' | 'my-routine';

interface MainNavigationProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function MainNavigation({ currentTab, onTabChange }: MainNavigationProps) {
  const tabs = [
    { id: 'home' as TabType, label: 'ホーム', icon: Home },
    { id: 'record' as TabType, label: '記録', icon: Clock },
    { id: 'habit-setting' as TabType, label: '習慣設定', icon: Settings },
    { id: 'time-attack' as TabType, label: 'タイムアタック', icon: Target },
    { id: 'my-routine' as TabType, label: 'Myルーティーン', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 safe-area-pb z-50">
      <div className="flex justify-around py-3">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-2 min-w-0 flex-1 transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <IconComponent size={22} />
              <span className="text-xs mt-1 truncate font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}