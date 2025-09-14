import React from 'react';
import { Sun, BookOpen, Dumbbell, Bed, PlayCircle } from 'lucide-react';

// カードに渡すデータの型定義
export type Habit = {
  id: string;
  icon: 'sun' | 'book' | 'dumbbell' | 'bed';
  name: string;
  time: string; // "15:00" や "朝食後" など
  status: 'pending' | 'completed' | 'skipped';
};

type HabitCardProps = {
  habit: Habit;
};

const iconMap = {
  sun: Sun,
  book: BookOpen,
  dumbbell: Dumbbell,
  bed: Bed,
};

export default function HabitCard({ habit }: HabitCardProps) {
  const IconComponent = iconMap[habit.icon];
  const statusColor = habit.status === 'completed' ? '#6AEEB2' : habit.status === 'skipped' ? '#FF6B6B' : '#FFFFFF';

  return (
    <div className="bg-gray-800 rounded-xl p-4 flex items-center mb-3 hover:bg-gray-750 transition-colors">
      <div className="mr-4">
        <IconComponent size={28} color={statusColor} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold" style={{ color: statusColor }}>
          {habit.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{habit.time}</p>
      </div>
      <button className="ml-4 hover:scale-110 transition-transform">
        <PlayCircle size={36} color="#6AEEB2" />
      </button>
    </div>
  );
}