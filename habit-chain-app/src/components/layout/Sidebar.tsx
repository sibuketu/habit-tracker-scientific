'use client';

import { BarChart3, Settings, User, Grid3X3 } from 'lucide-react';
import { useNavigationStore } from '@/store';

const Sidebar = () => {
  const { setCurrentTab } = useNavigationStore();

  const sidebarItems = [
    {
      id: 'result',
      label: 'リザルト',
      icon: BarChart3,
      onClick: () => {
        // リザルト画面への遷移
        window.open('/result', '_blank');
      },
    },
    {
      id: 'settings',
      label: '設定',
      icon: Settings,
      onClick: () => {
        // 設定画面への遷移（後で実装）
        console.log('Navigate to settings');
      },
    },
    {
      id: 'profile',
      label: 'プロフィール',
      icon: User,
      onClick: () => {
        // プロフィール編集画面への遷移（後で実装）
        console.log('Navigate to profile');
      },
    },
    {
      id: 'miniapps',
      label: 'MiniApp',
      icon: Grid3X3,
      onClick: () => {
        // MiniApp選択画面への遷移（後で実装）
        console.log('Navigate to miniapps');
      },
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Icon size={18} className="mr-3" />
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
