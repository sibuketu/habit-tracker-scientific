import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

// 型定義
type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
type ColorType = 'existing' | 'new' | 'fun' | 'work' | 'study' | 'exercise' | 'custom1' | 'custom2' | 'custom3' | 'custom4';
type RoutineItem = {
  text: string;
  color: ColorType;
  type: string;
  startTime?: string;
  endTime?: string;
};
type Routines = {
  [K in DayOfWeek]: RoutineItem[];
};
type DayTimeSlots = {
  [K in DayOfWeek]: string[];
};
type DragState = {
  isDragging: boolean;
  draggedFrom: { day: DayOfWeek; timeIndex: number } | null;
  draggedTo: { day: DayOfWeek; timeIndex: number } | null;
};

// 改善されたカラーパレット（要件定義に基づく）
const COLOR_PALETTE = {
  existing: { bg: '#1E88E5', text: '#FFFFFF', name: '既存の習慣' }, // 濃い青 - Google Material Design Blue 600
  new: { bg: '#4CAF50', text: '#FFFFFF', name: '新しい習慣' }, // 鮮やかな緑 - Google Material Design Green 500
  fun: { bg: '#FFB300', text: '#000000', name: '楽しみ' }, // 明るいオレンジ - Google Material Design Amber 600
  work: { bg: '#757575', text: '#FFFFFF', name: '仕事' }, // 落ち着いたグレー - Google Material Design Grey 600
  study: { bg: '#9C27B0', text: '#FFFFFF', name: '学習' }, // 紫 - Google Material Design Purple 500
  exercise: { bg: '#E53935', text: '#FFFFFF', name: '運動' }, // 赤 - Google Material Design Red 600
  custom1: { bg: '#00BCD4', text: '#000000', name: 'カスタム1' }, // シアン - Google Material Design Cyan 500
  custom2: { bg: '#CDDC39', text: '#000000', name: 'カスタム2' }, // ライムグリーン - Google Material Design Lime 500
  custom3: { bg: '#FF7043', text: '#FFFFFF', name: 'カスタム3' }, // ディープオレンジ - Google Material Design Deep Orange 400
  custom4: { bg: '#3F51B5', text: '#FFFFFF', name: 'カスタム4' }, // インディゴ - Google Material Design Indigo 500
};

// 型ガード関数
const isDayOfWeek = (day: string): day is DayOfWeek => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(day);
};

const isColorType = (color: string): color is ColorType => {
  return Object.keys(COLOR_PALETTE).includes(color);
};

const WeeklyRoutineSchedule = () => {
  const { t } = useTranslation();
  // タブの状態
  const [activeTab, setActiveTab] = useState<'weekly' | 'thisWeek'>('weekly');
  
  // 普段の1週間のルーティーン（リアルなサンプル）
  const [weeklyRoutines, setWeeklyRoutines] = useState({
    Sunday: [
      { text: '起床・朝食', color: 'green', type: 'existing', startTime: '08:00', endTime: '09:00' },
      { text: '家族と過ごす', color: 'yellow', type: 'fun', startTime: '09:30', endTime: '11:00' },
      { text: '散歩', color: 'green', type: 'existing', startTime: '11:30', endTime: '12:00' },
      { text: '昼食', color: 'green', type: 'existing', startTime: '12:30', endTime: '13:00' },
      { text: 'カフェタイム', color: 'yellow', type: 'fun', startTime: '14:00', endTime: '15:30' },
      { text: '読書', color: 'orange', type: 'new', startTime: '16:00', endTime: '17:30' },
      { text: '夕食', color: 'green', type: 'existing', startTime: '18:00', endTime: '18:30' },
      { text: '映画鑑賞', color: 'yellow', type: 'fun', startTime: '20:00', endTime: '22:00' }
    ],
    Monday: [
      { text: '起床・朝食', color: 'green', type: 'existing', startTime: '06:30', endTime: '07:15' },
      { text: '通学', color: 'green', type: 'existing', startTime: '07:45', endTime: '08:20' },
      { text: '授業', color: 'green', type: 'existing', startTime: '08:30', endTime: '12:15' },
      { text: '昼食', color: 'green', type: 'existing', startTime: '12:30', endTime: '13:00' },
      { text: '授業', color: 'green', type: 'existing', startTime: '13:15', endTime: '16:45' },
      { text: '帰宅', color: 'green', type: 'existing', startTime: '17:15', endTime: '17:45' },
      { text: '夕食', color: 'green', type: 'existing', startTime: '18:00', endTime: '18:30' },
      { text: '宿題', color: 'green', type: 'existing', startTime: '19:00', endTime: '20:30' }
    ],
    Tuesday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '部活', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '読書', color: 'orange', type: 'new' }
    ],
    Wednesday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '塾', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' }
    ],
    Thursday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '英語学習', color: 'orange', type: 'new' }
    ],
    Friday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '映画鑑賞', color: 'yellow', type: 'fun', startTime: '20:00', endTime: '22:00' }
    ],
    Saturday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '家族と過ごす', color: 'yellow', type: 'fun' },
      { text: '散歩', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: 'カフェタイム', color: 'yellow', type: 'fun' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '読書', color: 'orange', type: 'new' }
    ],
    Sunday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '掃除', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '買い物', color: 'blue', type: 'schedule' },
      { text: '宿題', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: 'リラックス', color: 'yellow', type: 'fun' }
    ]
  });

  // 今週のルーティーン（リアルなサンプル - 普段の1週間 + 今週の特別な予定）
  const [thisWeekRoutines, setThisWeekRoutines] = useState({
    Monday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '散髪', color: 'blue', type: 'schedule', startTime: '15:00', endTime: '16:00' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '宿題', color: 'green', type: 'existing' }
    ],
    Tuesday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '部活', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '読書', color: 'orange', type: 'new' }
    ],
    Wednesday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '塾', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' }
    ],
    Thursday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '英語学習', color: 'orange', type: 'new' }
    ],
    Friday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '通学', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '授業', color: 'green', type: 'existing' },
      { text: '帰宅', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '映画鑑賞', color: 'yellow', type: 'fun', startTime: '20:00', endTime: '22:00' }
    ],
    Saturday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '家族と過ごす', color: 'yellow', type: 'fun' },
      { text: '散歩', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: 'カフェタイム', color: 'yellow', type: 'fun' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: '読書', color: 'orange', type: 'new' }
    ],
    Sunday: [
      { text: '起床・朝食', color: 'green', type: 'existing' },
      { text: '掃除', color: 'green', type: 'existing' },
      { text: '昼食', color: 'green', type: 'existing' },
      { text: '買い物', color: 'blue', type: 'schedule' },
      { text: '宿題', color: 'green', type: 'existing' },
      { text: '夕食', color: 'green', type: 'existing' },
      { text: 'リラックス', color: 'yellow', type: 'fun' }
    ]
  });

  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<{day: DayOfWeek, timeIndex: number, text: string, startTime?: string, endTime?: string} | null>(null);
  const [newRoutine, setNewRoutine] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ColorType>('green');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [customColors, setCustomColors] = useState<{[key: string]: string}>({});
  const [showColorModal, setShowColorModal] = useState<boolean>(false);
  const [newColorName, setNewColorName] = useState<string>('');
  const [newColorValue, setNewColorValue] = useState<string>('purple');
  const [editingColorKey, setEditingColorKey] = useState<string | null>(null);
  const [editingColorName, setEditingColorName] = useState<string>('');

  // 各曜日ごとの時間軸
  const [dayTimeSlots, setDayTimeSlots] = useState({
    Monday: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    Tuesday: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    Wednesday: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    Thursday: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    Friday: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    Saturday: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    Sunday: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
  });

  // ドラッグ&ドロップ用のstate
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedFrom: null,
    draggedTo: null
  });

  // 現在表示中のルーティーンを取得
  const currentRoutines = activeTab === 'weekly' ? weeklyRoutines : thisWeekRoutines;
  const setCurrentRoutines = activeTab === 'weekly' ? setWeeklyRoutines : setThisWeekRoutines;

  // 色分けシステム - ダークテーマ色分け（翻訳対応）
  const colorSystem = {
    green: { bg: 'bg-green-800', border: 'border-green-600', text: 'text-green-100', name: t.categories.existing },
    orange: { bg: 'bg-orange-800', border: 'border-orange-600', text: 'text-orange-100', name: t.categories.new },
    blue: { bg: 'bg-blue-800', border: 'border-blue-600', text: 'text-blue-100', name: t.categories.schedule },
    yellow: { bg: 'bg-yellow-800', border: 'border-yellow-600', text: 'text-yellow-100', name: t.categories.fun },
    purple: { bg: 'bg-purple-800', border: 'border-purple-600', text: 'text-purple-100', name: customColors.purple || t.categories.custom1 },
    pink: { bg: 'bg-pink-800', border: 'border-pink-600', text: 'text-pink-100', name: customColors.pink || t.categories.custom2 },
    red: { bg: 'bg-red-800', border: 'border-red-600', text: 'text-red-100', name: customColors.red || t.categories.custom3 },
    indigo: { bg: 'bg-indigo-800', border: 'border-indigo-600', text: 'text-indigo-100', name: customColors.indigo || t.categories.custom4 }
  };

  const daysOfWeek: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDayLabels = [t.weekdays.sunday, t.weekdays.monday, t.weekdays.tuesday, t.weekdays.wednesday, t.weekdays.thursday, t.weekdays.friday, t.weekdays.saturday];

  // ルーティーン追加機能
  const addRoutine = (day: DayOfWeek, timeIndex: number) => {
    if (newRoutine.trim()) {
      setCurrentRoutines((prev: any) => {
        const dayRoutines = prev[day] || [];
        
        // 配列が時間インデックスより短い場合は拡張
        const newRoutines = [...dayRoutines];
        while (newRoutines.length <= timeIndex) {
          newRoutines.push({ text: '', color: 'green', type: 'empty', startTime: undefined, endTime: undefined });
        }
        
        // 指定された時間インデックスに新しいルーティーンを追加
        newRoutines[timeIndex] = { 
          text: newRoutine.trim(), 
          color: selectedColor, 
          type: colorSystem[selectedColor].name,
          startTime: startTime || undefined,
          endTime: endTime || undefined
        };
        
        return {
          ...prev,
          [day]: newRoutines
        };
      });
        setNewRoutine('');
        setStartTime('');
        setEndTime('');
        setSelectedDay(null);
        setSelectedTimeIndex(null);
    }
  };

  const removeRoutine = (day: DayOfWeek, index: number) => {
    setCurrentRoutines((prev: any) => ({
      ...prev,
      [day]: prev[day].filter((_: any, i: number) => i !== index)
    }));
  };

  // 普段の1週間を今週にコピーする機能
  const copyWeeklyToThisWeek = () => {
    setThisWeekRoutines(JSON.parse(JSON.stringify(weeklyRoutines)));
  };

  // 月曜日のスケジュールを他の曜日にコピーする機能
  const copyMondayToOtherDays = () => {
    const mondayRoutines = currentRoutines.Monday || [];
    setCurrentRoutines((prev: any) => {
      const updated = { ...prev };
      daysOfWeek.forEach(day => {
        if (day !== 'Monday') {
          updated[day as DayOfWeek] = [...mondayRoutines] as any;
        }
      });
      return updated;
    });
  };

  // ドラッグ&ドロップのハンドラー
  const handleDragStart = (e: React.DragEvent, day: DayOfWeek, timeIndex: number) => {
    setDragState({
      isDragging: true,
      draggedFrom: { day, timeIndex },
      draggedTo: null
    });
    
    const routineData = currentRoutines[day][timeIndex];
    e.dataTransfer.setData('text/plain', JSON.stringify(routineData));
  };

  const handleDragOver = (e: React.DragEvent, day: DayOfWeek, timeIndex: number) => {
    e.preventDefault();
    setDragState(prev => ({
      ...prev,
      draggedTo: { day, timeIndex }
    }));
  };

  const handleDragLeave = () => {
    setDragState(prev => ({
      ...prev,
      draggedTo: null
    }));
  };

  const handleDrop = (e: React.DragEvent, day: DayOfWeek, timeIndex: number) => {
    e.preventDefault();
    
    if (!dragState.draggedFrom) {
      setDragState({
        isDragging: false,
        draggedFrom: null,
        draggedTo: null
      });
      return;
    }
    
    // 同じ場所にドロップした場合は何もしない
    const { day: fromDay, timeIndex: fromIndex } = dragState.draggedFrom;
    if (fromDay === day && fromIndex === timeIndex) {
      setDragState({
        isDragging: false,
        draggedFrom: null,
        draggedTo: null
      });
      return;
    }
    
    // ルーティーンを移動（間隔を空けて配置）
    const movedItem = currentRoutines[fromDay][fromIndex];
    
    setCurrentRoutines((prev: any) => {
      const newRoutines = { ...prev };
      
      // 元の場所からアイテムを削除
      newRoutines[fromDay] = newRoutines[fromDay].filter((_: any, i: number) => i !== fromIndex);
      
      // 移動先の曜日の配列が存在しない場合は作成
      if (!newRoutines[day]) {
        newRoutines[day] = [];
      }
      
      // 配列を拡張して間隔を確保
      while (newRoutines[day].length <= timeIndex) {
        newRoutines[day].push({ text: '', color: 'green', type: 'empty', startTime: undefined, endTime: undefined });
      }
      
      // 新しい場所にドラッグしたアイテムを配置
      newRoutines[day][timeIndex] = movedItem as any;
      
      return newRoutines;
    });

    // ドラッグ状態をリセット
    setDragState({
      isDragging: false,
      draggedFrom: null,
      draggedTo: null
    });
  };

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      draggedFrom: null,
      draggedTo: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
          {/* ヘッダー - ダークテーマ */}
          <div className="px-6 py-4 border-b border-gray-700 bg-gradient-to-br from-blue-600 to-purple-800 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{t.routine.title}</h1>
                <p className="text-blue-200 mt-1">{t.routine.weeklySchedule}</p>
              </div>
            </div>
          </div>
            
          {/* タブ - ダークテーマ */}
          <div className="px-6 py-4">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'weekly'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t.routine.weeklySchedule}
              </button>
              <button
                onClick={() => setActiveTab('thisWeek')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'thisWeek'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t.routine.thisWeek}
              </button>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={copyMondayToOtherDays}
                className="px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
              >
                {t.routine.copyMondayToOthers}
              </button>
              {activeTab === 'thisWeek' && (
                <button
                  onClick={copyWeeklyToThisWeek}
                  className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t.routine.copyWeeklyToThisWeek}
                </button>
              )}
            </div>
          </div>
            
          {/* 色分けの説明 - 白文字ベース */}
          <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
            <h4 className="text-sm font-semibold text-white mb-2">{t.routine.colorExplanation}</h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(colorSystem).map(([colorKey, colorInfo]) => (
                <div key={colorKey} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full border ${colorInfo.border} ${colorInfo.bg}`}></div>
                  <span className="text-xs text-white">{colorInfo.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* スケジュール表 - 曜日横並び（ダークテーマ） */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* テーブルヘッダー - 曜日を横並び */}
              <thead>
                <tr className="bg-gray-800">
                  {daysOfWeek.map((day) => (
                    <th key={day} className="px-2 py-2 text-center text-xs font-medium text-white border-b border-l border-gray-600 min-w-32">
                      {weekDayLabels[daysOfWeek.indexOf(day)]}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* テーブルボディ - 曜日横並び */}
              <tbody>
                {Array.from({ length: Math.max(10, ...daysOfWeek.map(day => (currentRoutines[day as DayOfWeek] || []).length + 1)) }, (_, timeIndex) => (
                  <tr key={timeIndex} className="hover:bg-gray-700">
                    {daysOfWeek.map((day) => {
                      const dayRoutines = currentRoutines[day as DayOfWeek] || [];
                      const routine = dayRoutines[timeIndex];
                      
                      return (
                        <td key={day} className="px-2 py-2 border-b border-l border-gray-600 align-top min-h-16">
                          <div className="min-h-12">
                            {routine && routine.text && (
                              <div className="relative group">
                                <div 
                                  className={`${colorSystem[routine.color as ColorType].bg} ${colorSystem[routine.color as ColorType].border} ${colorSystem[routine.color as ColorType].text} border rounded px-2 py-1 text-xs cursor-move hover:opacity-80 transition-all duration-200 ${
                                    dragState.isDragging && dragState.draggedFrom?.day === day && dragState.draggedFrom?.timeIndex === timeIndex
                                      ? 'opacity-50 scale-95 shadow-lg'
                                      : ''
                                  }`}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, day as DayOfWeek, timeIndex)}
                                  onDragOver={(e) => handleDragOver(e, day as DayOfWeek, timeIndex)}
                                  onDragLeave={handleDragLeave}
                                  onDrop={(e) => handleDrop(e, day as DayOfWeek, timeIndex)}
                                  onDragEnd={handleDragEnd}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetailModal({
                                      day: day as DayOfWeek, 
                                      timeIndex: timeIndex, 
                                      text: routine.text,
                                          startTime: (routine as any).startTime,
                                          endTime: (routine as any).endTime
                                    });
                                    setNewRoutine(routine.text);
                                    setStartTime((routine as any).startTime || '');
                                    setEndTime((routine as any).endTime || '');
                                    setSelectedColor(routine.color as ColorType);
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    {/* 時間範囲表示（左） - 縦配置 */}
                                    <div className="text-xs font-medium w-16 flex flex-col">
                                      <span className="text-xs text-white">
                                        {(routine as any).startTime || '--:--'}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {(routine as any).endTime || '--:--'}
                                      </span>
                                    </div>
                                    
                                    {/* 行動内容（中央） */}
                                    <div className="flex-1 text-xs mx-2 truncate text-white">
                                      {routine.text}
                                    </div>
                                    
                                    {/* 編集・削除ボタン（右） - 電球アイコンテーマ */}
                                    <div className="flex gap-1 items-center">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowDetailModal({
                                            day: day as DayOfWeek, 
                                            timeIndex: timeIndex, 
                                            text: routine.text,
                                          startTime: (routine as any).startTime,
                                          endTime: (routine as any).endTime
                                          });
                                          setNewRoutine(routine.text);
                                          setStartTime((routine as any).startTime || '');
                                          setEndTime((routine as any).endTime || '');
                                          setSelectedColor(routine.color as ColorType);
                                        }}
                                        className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                                      >
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                                        </svg>
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeRoutine(day as DayOfWeek, timeIndex);
                                        }}
                                        className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                                      >
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* 空のスロットに追加ボタン */}
                            {(!routine || !routine.text) && (
                              <button
                                onClick={() => {
                                  setShowDetailModal({
                                    day: day as DayOfWeek, 
                                    timeIndex: timeIndex, 
                                    text: '',
                                    startTime: '',
                                    endTime: ''
                                  });
                                  setNewRoutine('');
                                  setStartTime('');
                                  setEndTime('');
                                  setSelectedColor('green');
                                }}
                                className="w-full h-12 border-2 border-dashed border-blue-400 rounded-lg text-xs text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-purple-900 hover:border-blue-300 transition-all duration-200 flex items-center justify-center gap-1"
                              >
                                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                                </svg>
                                +
                              </button>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>
      </div>

      {/* ルーティーン編集モーダル - ダークテーマ */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-200">{t.routine.editRoutine}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.common.day}</label>
                <p className="text-gray-100 bg-gray-700 px-3 py-2 rounded">{weekDayLabels[daysOfWeek.indexOf(showDetailModal.day)]}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Routine</label>
                <input
                  type="text"
                  value={newRoutine}
                  onChange={(e) => setNewRoutine(e.target.value)}
                  placeholder="ルーティーンを入力"
                  className="w-full text-sm bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
              </div>
              
              {/* 時間範囲入力 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.time.timeRange}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="text-sm bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
                  />
                  <span className="text-sm text-gray-400">〜</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="text-sm bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              
               {/* 色選択 */}
               <div>
                 <label className="block text-sm font-medium text-white mb-2">カテゴリ</label>
                 <div className="flex gap-2 flex-wrap">
                   {Object.entries(colorSystem).map(([colorKey, colorInfo]) => (
                     <button
                       key={colorKey}
                       onClick={() => setSelectedColor(colorKey as ColorType)}
                       className={`w-8 h-8 rounded-full border-2 ${
                         selectedColor === colorKey ? 'border-yellow-300' : 'border-gray-600'
                       } bg-${colorKey}-400`}
                       title={colorInfo.name}
                     />
                   ))}
                   <button
                     onClick={() => setShowColorModal(true)}
                     className="w-8 h-8 rounded-full border-2 border-dashed border-gray-400 bg-gray-600 hover:bg-gray-500 transition-colors flex items-center justify-center"
                     title="新しい色を追加"
                   >
                     <span className="text-white text-xs">+</span>
                   </button>
                 </div>
                 <p className="text-xs text-white mt-1">{colorSystem[selectedColor].name}</p>
                
                {/* 色分けの説明 - インライン編集 */}
                <div className="mt-3 p-2 bg-gray-700 rounded border border-gray-600">
                  <p className="text-xs text-gray-300 mb-1">色分けの説明（タップで編集）:</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {Object.entries(colorSystem).map(([colorKey, colorInfo]) => (
                      <div key={colorKey} className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full bg-${colorKey}-400`}></div>
                        {editingColorKey === colorKey ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={editingColorName}
                              onChange={(e) => setEditingColorName(e.target.value)}
                              className="text-white bg-gray-600 border border-gray-500 rounded px-1 py-0.5 text-xs w-20"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (['purple', 'pink', 'red', 'indigo'].includes(colorKey)) {
                                    setCustomColors(prev => ({
                                      ...prev,
                                      [colorKey]: editingColorName.trim()
                                    }));
                                  }
                                  setEditingColorKey(null);
                                  setEditingColorName('');
                                } else if (e.key === 'Escape') {
                                  setEditingColorKey(null);
                                  setEditingColorName('');
                                }
                              }}
                              onBlur={() => {
                                if (['purple', 'pink', 'red', 'indigo'].includes(colorKey)) {
                                  setCustomColors(prev => ({
                                    ...prev,
                                    [colorKey]: editingColorName.trim()
                                  }));
                                }
                                setEditingColorKey(null);
                                setEditingColorName('');
                              }}
                            />
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              if (['purple', 'pink', 'red', 'indigo'].includes(colorKey)) {
                                setEditingColorKey(colorKey);
                                setEditingColorName(colorInfo.name);
                              }
                            }}
                            className={`text-white transition-colors text-left ${
                              ['purple', 'pink', 'red', 'indigo'].includes(colorKey) 
                                ? 'hover:text-blue-400' 
                                : 'cursor-default'
                            }`}
                          >
                            {colorInfo.name}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailModal(null);
                  setNewRoutine('');
                  setStartTime('');
                  setEndTime('');
                }}
                className="flex-1 px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => {
                  if (newRoutine.trim()) {
                    setCurrentRoutines((prev: any) => {
                      const dayRoutines = prev[showDetailModal.day] || [];
                      const newRoutines = [...dayRoutines];
                      
                      // 配列が時間インデックスより短い場合は拡張
                      while (newRoutines.length <= showDetailModal.timeIndex) {
                        newRoutines.push({ text: '', color: 'green', type: 'empty', startTime: undefined, endTime: undefined });
                      }
                      
                      newRoutines[showDetailModal.timeIndex] = { 
                        text: newRoutine.trim(), 
                        color: selectedColor, 
                        type: colorSystem[selectedColor].name,
                        startTime: startTime || undefined,
                        endTime: endTime || undefined
                      };
                      
                      return {
                        ...prev,
                        [showDetailModal.day]: newRoutines
                      };
                    });
                  }
                  setShowDetailModal(null);
                  setNewRoutine('');
                  setStartTime('');
                  setEndTime('');
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                {t.common.save}
              </button>
            </div>
          </div>
         </div>
       )}

       {/* カスタム色登録モーダル */}
       {showColorModal && (
         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
           <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
             <div className="flex items-center gap-3 mb-4">
               <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
               </svg>
               <h3 className="text-lg font-semibold text-gray-200">新しい色を追加</h3>
             </div>
             
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">色の名前</label>
                 <input
                   type="text"
                   value={newColorName}
                   onChange={(e) => setNewColorName(e.target.value)}
                   placeholder="例: 運動、勉強、趣味など"
                   className="w-full text-sm bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                   autoFocus
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">色を選択</label>
                 <div className="flex gap-2 flex-wrap">
                   {['purple', 'pink', 'red', 'indigo'].map((color) => (
                     <button
                       key={color}
                       onClick={() => setNewColorValue(color)}
                       className={`w-10 h-10 rounded-full border-2 ${
                         newColorValue === color ? 'border-yellow-300' : 'border-gray-600'
                       } ${color === 'purple' ? 'bg-purple-400 hover:bg-purple-500' : 
                         color === 'pink' ? 'bg-pink-400 hover:bg-pink-500' :
                         color === 'red' ? 'bg-red-400 hover:bg-red-500' :
                         'bg-indigo-400 hover:bg-indigo-500'} transition-colors`}
                       title={color}
                     />
                   ))}
                 </div>
               </div>
             </div>
             
             <div className="flex gap-3 mt-6">
               <button
                 onClick={() => {
                   setShowColorModal(false);
                   setNewColorName('');
                   setNewColorValue('purple');
                 }}
                 className="flex-1 px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
               >
                 キャンセル
               </button>
               <button
                 onClick={() => {
                   if (newColorName.trim() && newColorValue) {
                     setCustomColors(prev => ({
                       ...prev,
                       [newColorValue]: newColorName.trim()
                     }));
                     setSelectedColor(newColorValue as ColorType);
                     setShowColorModal(false);
                     setNewColorName('');
                     setNewColorValue('purple');
                   }
                 }}
                 className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg"
               >
                 追加
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };
 
 export default WeeklyRoutineSchedule;