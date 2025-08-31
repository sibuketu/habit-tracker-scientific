import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'teal' | 'indigo' | 'emerald' | 'slate';
  onClick: () => void;
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600'
  },
  teal: {
    bg: 'bg-teal-500',
    hover: 'hover:bg-teal-600',
    light: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-600'
  },
  indigo: {
    bg: 'bg-indigo-500',
    hover: 'hover:bg-indigo-600',
    light: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-600'
  },
  emerald: {
    bg: 'bg-emerald-500',
    hover: 'hover:bg-emerald-600',
    light: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-600'
  },
  slate: {
    bg: 'bg-slate-500',
    hover: 'hover:bg-slate-600',
    light: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-600'
  }
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick
}) => {
  const colors = colorVariants[color];

  return (
    <button
      onClick={onClick}
      className={`
        group relative bg-white rounded-xl p-8 shadow-lg border border-gray-100
        hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50
        active:scale-95 active:shadow-md
        text-left w-full
      `}
    >
      {/* Icon Container */}
      <div className={`
        inline-flex items-center justify-center w-18 h-18 rounded-2xl mb-6
        ${colors.light} ${colors.border} border
        group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out
      `}>
        <Icon className={`w-9 h-9 ${colors.text}`} />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
          {description}
        </p>
      </div>

      {/* Hover Indicator */}
      <div className={`
        absolute inset-x-0 bottom-0 h-1 rounded-b-xl
        ${colors.bg} opacity-0 group-hover:opacity-100
        transition-opacity duration-300 ease-out
      `} />
    </button>
  );
};

export default FeatureCard;