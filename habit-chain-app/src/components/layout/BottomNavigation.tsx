'use client';

import { 
  Home, 
  BookOpen, 
  Settings, 
  Timer, 
  Calendar 
} from 'lucide-react';
import { useNavigationStore } from '@/store';
import { MainTab } from '@/types';

const navigationItems = [
  {
    id: 'home' as MainTab,
    label: 'ホーム',
    icon: Home,
  },
  {
    id: 'record' as MainTab,
    label: '記録',
    icon: BookOpen,
  },
  {
    id: 'habit-setting' as MainTab,
    label: '習慣設定',
    icon: Settings,
  },
  {
    id: 'time-attack' as MainTab,
    label: 'タイムアタック',
    icon: Timer,
  },
  {
    id: 'my-routine' as MainTab,
    label: 'Myルーティーン',
    icon: Calendar,
  },
];

const BottomNavigation = () => {
  const { currentTab, setCurrentTab } = useNavigationStore();

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center py-2 px-3 transition-all duration-200 ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon 
                size={24} 
                className={isActive ? 'text-blue-600' : 'text-gray-400'} 
              />
              <span className={`text-xs mt-1 ${
                isActive ? 'text-blue-600 font-medium' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
