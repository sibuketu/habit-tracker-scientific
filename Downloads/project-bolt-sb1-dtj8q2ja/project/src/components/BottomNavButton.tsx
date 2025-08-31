import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface BottomNavButtonProps {
  title: string;
  icon: LucideIcon;
  emoji: string;
  onClick: () => void;
  isActive?: boolean;
}

const BottomNavButton: React.FC<BottomNavButtonProps> = ({
  title,
  icon: Icon,
  emoji,
  onClick,
  isActive = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200
        ${isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }
        active:scale-95 min-w-0 flex-1 max-w-[80px]
      `}
    >
      <div className={`
        text-xl mb-1 transition-transform duration-200
        ${isActive ? 'scale-110' : 'group-hover:scale-105'}
      `}>
        {emoji}
      </div>
      <span className={`
        text-xs font-medium leading-tight text-center
        ${isActive ? 'text-blue-600' : 'text-gray-500'}
      `}>
        {title}
      </span>
    </button>
  );
};

export default BottomNavButton;