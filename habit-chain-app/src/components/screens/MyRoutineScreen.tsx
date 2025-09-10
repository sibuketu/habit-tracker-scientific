'use client';

import { useState } from 'react';
import { useHabitsStore } from '@/store';
import { Calendar } from 'lucide-react';

interface RoutineItem {
  id: string;
  habit_id?: string;
  action: string;
  day_of_week: number;
  time_slot: string;
  color: string;
  is_new_habit: boolean;
}

const MyRoutineScreen = () => {
  const { habits } = useHabitsStore();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    action: '',
    day_of_week: 0,
    time_slot: '',
    color: 'black',
    is_new_habit: false,
  });

  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const getWeekDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekStart = getWeekStart(currentWeek);
  const weekDates = getWeekDates(weekStart);

  const handleAddItem = () => {
    const item: RoutineItem = {
      id: Date.now().toString(),
      action: newItem.action,
      day_of_week: newItem.day_of_week,
      time_slot: newItem.time_slot,
      color: newItem.color,
      is_new_habit: newItem.is_new_habit,
    };

    setRoutineItems([...routineItems, item]);
    setNewItem({
      action: '',
      day_of_week: 0,
      time_slot: '',
      color: 'black',
      is_new_habit: false,
    });
    setIsAdding(false);
  };

  const handleLinkHabit = (itemId: string, habitId: string) => {
    setRoutineItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, habit_id: habitId } : item
      )
    );
  };

  const copyFromTemplate = () => {
    // テンプレートからコピーする処理（実装は後で）
    console.log('Copy from template');
  };

  const getItemsForDay = (dayIndex: number) => {
    return routineItems.filter(item => item.day_of_week === dayIndex);
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      black: 'bg-gray-800 text-white',
      green: 'bg-green-500 text-white',
      blue: 'bg-blue-500 text-white',
      red: 'bg-red-500 text-white',
      yellow: 'bg-yellow-500 text-black',
      purple: 'bg-purple-500 text-white',
    };
    return colorMap[color] || 'bg-gray-800 text-white';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Myルーティーン</h1>
        <p className="text-gray-600 mt-1">週間スケジュールを管理</p>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          ← 前週
        </button>
        
        <div className="text-center">
          <div className="font-medium text-gray-900">
            {weekStart.getMonth() + 1}月 {weekStart.getDate()}日 - {weekDates[6].getMonth() + 1}月 {weekDates[6].getDate()}日
          </div>
          <div className="text-sm text-gray-600">{weekStart.getFullYear()}年</div>
        </div>
        
        <button
          onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          次週 →
        </button>
      </div>

      {/* 自然な案内 */}
      <div className="text-center py-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={copyFromTemplate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            テンプレートからコピー
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            項目を追加
          </button>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="p-3 text-center font-medium text-gray-900 border-r border-gray-200 last:border-r-0">
              {day}
              <div className="text-sm text-gray-600 mt-1">
                {weekDates[index].getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-7 min-h-96">
          {daysOfWeek.map((_, dayIndex) => {
            const dayItems = getItemsForDay(dayIndex);
            
            return (
              <div key={dayIndex} className="border-r border-gray-200 last:border-r-0 p-2 min-h-96">
                <div className="space-y-2">
                  {dayItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2 rounded text-xs ${getColorClass(item.color)}`}
                    >
                      <div className="font-medium">{item.action}</div>
                      {item.time_slot && (
                        <div className="opacity-80">{item.time_slot}</div>
                      )}
                      {item.is_new_habit && (
                        <div className="text-xs opacity-80 mt-1">🆕 新習慣</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Item Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">項目を追加</h3>
            
            <div className="space-y-4">
              {/* Action */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  行動内容
                </label>
                <input
                  type="text"
                  value={newItem.action}
                  onChange={(e) => setNewItem({ ...newItem, action: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例: 朝の瞑想、読書"
                />
              </div>

              {/* Day of Week */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  曜日
                </label>
                <select
                  value={newItem.day_of_week}
                  onChange={(e) => setNewItem({ ...newItem, day_of_week: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {daysOfWeek.map((day, index) => (
                    <option key={index} value={index}>
                      {day}曜日
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  時間帯
                </label>
                <input
                  type="text"
                  value={newItem.time_slot}
                  onChange={(e) => setNewItem({ ...newItem, time_slot: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例: 7:00-7:30"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  色
                </label>
                <div className="flex space-x-2">
                  {['black', 'green', 'blue', 'red', 'yellow', 'purple'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewItem({ ...newItem, color })}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newItem.color === color ? 'border-gray-400' : 'border-gray-200'
                      } ${getColorClass(color)}`}
                    />
                  ))}
                </div>
              </div>

              {/* New Habit Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_new_habit"
                  checked={newItem.is_new_habit}
                  onChange={(e) => setNewItem({ ...newItem, is_new_habit: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="is_new_habit" className="text-sm text-gray-700">
                  新しい習慣としてマーク
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleAddItem}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                追加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Habit Linking */}
      {habits.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h3 className="font-medium text-gray-900 mb-3">習慣との紐付け</h3>
          <div className="space-y-2">
            {routineItems.filter(item => !item.habit_id).map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">{item.action}</span>
                <select
                  onChange={(e) => handleLinkHabit(item.id, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">習慣を選択</option>
                  {habits.map((habit) => (
                    <option key={habit.id} value={habit.id}>
                      {habit.if_condition} → {habit.then_action}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRoutineScreen;
