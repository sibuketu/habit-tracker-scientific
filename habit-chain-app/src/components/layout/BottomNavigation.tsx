'use client';

import { 
  Home, 
  BookOpen, 
  Settings, 
  Timer, 
  Calendar,
  Lightbulb
} from 'lucide-react';
import { useNavigationStore } from '@/store';
import { MainTab } from '@/types';
import { useTranslation } from '../../hooks/useTranslation';

const getNavigationItems = (t: any) => [
  {
    id: 'home' as MainTab,
    label: t.nav.home,
    icon: Home,
  },
  {
    id: 'record' as MainTab,
    label: t.nav.record,
    icon: BookOpen,
  },
  {
    id: 'habit-setting' as MainTab,
    label: t.nav.settings,
    icon: Settings,
  },
  {
    id: 'time-attack' as MainTab,
    label: t.nav.timeAttack,
    icon: Timer,
  },
  {
    id: 'my-routine' as MainTab,
    label: t.nav.routine,
    icon: Calendar,
  },
  {
    id: 'knowledge-comparison' as MainTab,
    label: '知識対比',
    icon: Lightbulb,
  },
];

const BottomNavigation = () => {
  const { currentTab, setCurrentTab } = useNavigationStore();
  const { t } = useTranslation();
  const navigationItems = getNavigationItems(t);

  return (
    <nav className="bg-gray-900 border-t border-gray-700 px-1 py-3 w-full">
      <div className="flex items-center">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex-1 flex flex-col items-center py-2 px-1 transition-all duration-200 rounded-lg ${
                isActive
                  ? 'text-green-400 bg-gray-800'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon 
                size={20} 
                className={isActive ? 'text-green-400' : 'text-gray-400'} 
              />
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-green-400' : 'text-gray-400'
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
