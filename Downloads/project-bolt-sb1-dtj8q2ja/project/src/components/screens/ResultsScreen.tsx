import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  TrendingUp,
  Award,
  Target,
  Share2,
  Download,
  Eye
} from 'lucide-react';
import BottomNavButton from '../BottomNavButton';
import { MessageCircle, PenTool, Settings } from 'lucide-react';

interface SavedHabit {
  id: string;
  type: 'regular' | 'if-then' | 'timed' | 'irregular';
  name: string;
  ifCondition: string;
  thenAction: string;
  additionalActions?: string;
  frequency: 'daily' | 'weekly' | 'interval';
  selectedDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  intervalDays: number;
  endDate: string;
  difficulty: number;
  impact: number;
  otherNotes?: string;
  irregularSettings: any[];
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface HabitRecord {
  habitId: string;
  date: string;
  result: 'victory' | 'alternative' | 'defeat' | null;
  actualDifficulty: number;
  notes: string;
  timestamp: string;
  // スコアチャレンジ・タイムアタック用
  scoreValue?: number;
  timeValue?: number;
  targetScore?: number;
  targetTime?: number;
}

type ViewMode = 'daily' | 'weekly' | 'monthly' | 'yearly';

// 習慣ごとの色を生成する関数
const getHabitColor = (habitId: string, habits: SavedHabit[]) => {
  const colors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444',
    '#F97316', '#EAB308', '#84CC16', '#10B981',
    '#14B8A6', '#06B6D4', '#6366F1', '#8B5CF6'
  ];
  
  const habitIndex = habits.findIndex(h => h.id === habitId);
  return colors[habitIndex % colors.length];
};

// 今日実行すべき習慣をフィルタリング
const getTodayHabits = (habits: SavedHabit[], targetDate: Date) => {
  const dayOfWeek = targetDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayName = dayNames[dayOfWeek] as keyof SavedHabit['selectedDays'];

  return habits.filter(habit => {
    if (habit.frequency === 'daily') {
      return true;
    } else if (habit.frequency === 'weekly') {
      return habit.selectedDays[todayName];
    } else if (habit.frequency === 'interval') {
      const createdDate = new Date(habit.createdAt);
      const daysDiff = Math.floor((targetDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff % habit.intervalDays === 0;
    }
    return false;
  });
};

// 2日ルールの適用チェック
const checkTwoDayRule = (records: HabitRecord[], habitId: string, date: string): boolean => {
  const targetDate = new Date(date);
  const habitRecords = records
    .filter(r => r.habitId === habitId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const targetIndex = habitRecords.findIndex(r => r.date === date);
  if (targetIndex <= 0) return false;
  
  const prevRecord = habitRecords[targetIndex - 1];
  const prevDate = new Date(prevRecord.date);
  const daysDiff = Math.floor((targetDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // 2日以内の間隔で、前回が敗北で今回が勝利の場合
  return daysDiff <= 2 && prevRecord.result === 'defeat' && 
         (habitRecords[targetIndex].result === 'victory' || habitRecords[targetIndex].result === 'alternative');
};

const ResultsScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedHabits, setSavedHabits] = useState<SavedHabit[]>([]);
  const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');

  const navItems = [
    {
      id: 'results',
      title: 'リザルト',
      icon: BarChart3,
      emoji: '📊',
      onClick: () => navigate('/results'),
      path: '/results'
    },
    {
      id: 'messages',
      title: 'メッセージ',
      icon: MessageCircle,
      emoji: '💬',
      onClick: () => navigate('/messages'),
      path: '/messages'
    },
    {
      id: 'daily-record',
      title: '今日の記録',
      icon: PenTool,
      emoji: '📝',
      onClick: () => navigate('/records'),
      path: '/records'
    },
    {
      id: 'habit-settings',
      title: '習慣設定',
      icon: Target,
      emoji: '⚙️',
      onClick: () => navigate('/habits'),
      path: '/habits'
    },
    {
      id: 'settings',
      title: '設定',
      icon: Settings,
      emoji: '🔧',
      onClick: () => navigate('/settings'),
      path: '/settings'
    }
  ];

  // データ読み込み
  useEffect(() => {
    const loadData = () => {
      try {
        const storedHabits = localStorage.getItem('habitTracker_habits');
        if (storedHabits) {
          setSavedHabits(JSON.parse(storedHabits));
        }

        const storedRecords = localStorage.getItem('habitTracker_records');
        if (storedRecords) {
          setHabitRecords(JSON.parse(storedRecords));
        }
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    };
    loadData();
  }, []);

  // カレンダー関連の関数
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // 月曜日を0にする
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getRecordsForDate = (dateString: string) => {
    return habitRecords.filter(record => record.date === dateString);
  };

  // 日付の習慣達成状況を取得
  const getDateHabitStatus = (dateString: string) => {
    const targetDate = new Date(dateString);
    const expectedHabits = getTodayHabits(savedHabits, targetDate);
    const records = getRecordsForDate(dateString);
    
    // 休息日（習慣が設定されていない日）
    if (expectedHabits.length === 0) {
      return { type: 'rest', habits: [] };
    }
    
    // 記録がない場合は未実行
    if (records.length === 0) {
      return { type: 'no-record', habits: expectedHabits };
    }
    
    // 各習慣の結果をマッピング
    const habitResults = expectedHabits.map(habit => {
      const record = records.find(r => r.habitId === habit.id);
      const isRecoveryDay = record && checkTwoDayRule(habitRecords, habit.id, dateString);
      
      return {
        habit,
        result: record?.result || null,
        color: getHabitColor(habit.id, savedHabits),
        isRecoveryDay
      };
    });
    
    return { type: 'has-habits', habits: habitResults };
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  // 進捗状況の計算
  const calculateProgress = () => {
    const totalRecords = habitRecords.length;
    const successRecords = habitRecords.filter(r => r.result === 'victory' || r.result === 'alternative').length;
    const successRate = totalRecords > 0 ? Math.round((successRecords / totalRecords) * 100) : 0;
    
    // 記録更新回数の計算
    let recordUpdateCount = 0;
    const habitBestRecords: Record<string, { bestScore?: number; bestTime?: number }> = {};
    
    habitRecords
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .forEach(record => {
        if (record.scoreValue || record.timeValue) {
          const habitId = record.habitId;
          if (!habitBestRecords[habitId]) {
            habitBestRecords[habitId] = {};
          }
          
          // スコア記録更新チェック
          if (record.scoreValue) {
            if (!habitBestRecords[habitId].bestScore || record.scoreValue > habitBestRecords[habitId].bestScore!) {
              habitBestRecords[habitId].bestScore = record.scoreValue;
              recordUpdateCount++;
            }
          }
          
          // タイム記録更新チェック（短い方が良い）
          if (record.timeValue) {
            if (!habitBestRecords[habitId].bestTime || record.timeValue < habitBestRecords[habitId].bestTime!) {
              habitBestRecords[habitId].bestTime = record.timeValue;
              recordUpdateCount++;
            }
          }
        }
      });
    
    // 連続記録の計算
    const today = new Date().toISOString().split('T')[0];
    let consecutiveDays = 0;
    let currentStreak = 0;
    let twoDayRuleApplied = 0;
    
    // 各習慣の連続記録を計算
    savedHabits.forEach(habit => {
      const habitRecords_filtered = habitRecords
        .filter(r => r.habitId === habit.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      let streak = 0;
      let lastDate = new Date(today);
      
      for (const record of habitRecords_filtered) {
        const recordDate = new Date(record.date);
        const daysDiff = Math.floor((lastDate.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 1 && (record.result === 'victory' || record.result === 'alternative')) {
          streak++;
          lastDate = recordDate;
        } else if (daysDiff <= 2 && record.result === 'defeat') {
          // 2日ルール適用
          twoDayRuleApplied++;
          lastDate = recordDate;
        } else {
          break;
        }
      }
      
      currentStreak = Math.max(currentStreak, streak);
    });
    
    consecutiveDays = currentStreak;
    
    return {
      totalRecords,
      successRecords,
      successRate,
      consecutiveDays,
      twoDayRuleApplied,
      recordUpdateCount
    };
  };

  const progress = calculateProgress();

  // SNSシェア機能
  const shareToSNS = () => {
    const avgPredicted = habitRecords.length > 0 ? 
      Math.round(savedHabits.reduce((sum, habit) => sum + (habit.difficulty || 0), 0) / savedHabits.length * 10) / 10 : 0;
    const avgActual = habitRecords.length > 0 ? 
      Math.round(habitRecords.reduce((sum, record) => sum + record.actualDifficulty, 0) / habitRecords.length * 10) / 10 : 0;
    
    const difficultyComparison = avgActual > avgPredicted ? '予想より大変だった' : 
                                avgActual < avgPredicted ? '予想より楽だった' : '予想通りだった';
    
    const recordUpdateText = progress.recordUpdateCount > 0 ? `記録更新${progress.recordUpdateCount}回！` : '';
    
    const shareText = `習慣トラッカーで${progress.successRecords}回達成！連続記録${progress.consecutiveDays}日継続中🔥
予測しんどさ${avgPredicted}/10 → 実際${avgActual}/10（${difficultyComparison}）
${recordUpdateText}
#習慣化 #継続は力なり #予測vs現実`;
    
    if (navigator.share) {
      navigator.share({
        title: '習慣トラッカーの成果',
        text: shareText,
        url: window.location.href
      });
    } else {
      // フォールバック: クリップボードにコピー
      navigator.clipboard.writeText(shareText);
      alert('シェア用テキストをクリップボードにコピーしました！');
    }
  };

  const renderMonthlyCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date().toISOString().split('T')[0];

    const days = [];
    const dayNames = ['月', '火', '水', '木', '金', '土', '日'];

    // 曜日ヘッダー
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} className="p-2 text-center text-sm font-medium text-gray-500">
          {dayNames[i]}
        </div>
      );
    }

    // 前月の空白日
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1"></div>);
    }

    // 当月の日付
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(year, month, day);
      const dateStatus = getDateHabitStatus(dateString);
      const isToday = dateString === today;
      const hasData = dateStatus.type !== 'no-record';

      days.push(
        <div
          key={day}
          onClick={() => hasData && setSelectedDate(dateString)}
          className={`p-1 text-center text-sm relative cursor-pointer transition-colors ${
            hasData ? 'hover:bg-blue-50' : 'cursor-default'
          } ${selectedDate === dateString ? 'bg-blue-100' : ''}`}
        >
          <div className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto relative ${
            isToday ? 'bg-blue-500 text-white font-bold' : ''
          }`}>
            {day}
          </div>
          
          {/* 習慣の状況表示 */}
          {dateStatus.type === 'rest' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded bg-black"></div>
          )}
          
          {dateStatus.type === 'has-habits' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-0.5 max-w-8">
              {dateStatus.habits.map((habitResult, index) => (
                <div key={index} className="relative">
                  {habitResult.result === 'victory' && (
                    <div 
                      className={`w-1.5 h-1.5 rounded-full ${
                        habitResult.isRecoveryDay ? 'ring-2 ring-yellow-400' : ''
                      }`}
                      style={{ backgroundColor: habitResult.color }}
                    ></div>
                  )}
                  {habitResult.result === 'alternative' && (
                    <div className="relative">
                      <div 
                        className={`w-1.5 h-1.5 rounded-full ${
                          habitResult.isRecoveryDay ? 'ring-2 ring-yellow-400' : ''
                        }`}
                        style={{ backgroundColor: habitResult.color }}
                      ></div>
                      <div className="absolute -top-0.5 -right-0.5 text-xs">♻️</div>
                    </div>
                  )}
                  {habitResult.result === 'defeat' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white border border-gray-300"></div>
                  )}
                  {habitResult.result === null && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getSelectedDateRecords = () => {
    if (!selectedDate) return [];
    return getRecordsForDate(selectedDate);
  };

  const getResultLabel = (result: string) => {
    switch (result) {
      case 'victory': return '達成';
      case 'alternative': return '代替達成';
      case 'defeat': return '敗北';
      default: return '未記録';
    }
  };

  const getResultEmoji = (result: string) => {
    switch (result) {
      case 'victory': return '🏆';
      case 'alternative': return '♻️';
      case 'defeat': return '😔';
      default: return '⏳';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">リザルト</h1>
              <p className="text-sm text-gray-600">習慣の成果と統計</p>
            </div>
          </div>
          
          <button
            onClick={shareToSNS}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>シェア</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* 進捗統計カード */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">現在の達成状況</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {progress.successRecords}回達成
                </p>
                <p className="text-sm text-gray-500">
                  （うち{progress.consecutiveDays}回は連続）
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">連続記録日数</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {progress.consecutiveDays}日
                </p>
                {progress.twoDayRuleApplied > 0 && (
                  <p className="text-sm text-orange-500">
                    （2日ルール適用: {progress.twoDayRuleApplied}回）
                  </p>
                )}
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg">🏆</span>
                  <span className="text-sm font-medium text-gray-600">記録更新回数</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {progress.recordUpdateCount}回
                </p>
                <p className="text-sm text-gray-500">
                  ベストスコア・タイム更新
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">達成率</span>
                <span className="text-lg font-bold text-blue-600">{progress.successRate}%</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.successRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 表示モード切り替え */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-900">カレンダー表示</h2>
              <div className="flex space-x-1">
                {(['daily', 'weekly', 'monthly', 'yearly'] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      viewMode === mode
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {mode === 'daily' ? '日' : 
                     mode === 'weekly' ? '週' : 
                     mode === 'monthly' ? '月' : '年'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* カレンダー表示 */}
          {viewMode === 'monthly' && (
            <div className="p-4">
              {/* カレンダーヘッダー */}
              <div className="flex items-center justify-between py-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold">
                  {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* カレンダーグリッド */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {renderMonthlyCalendar()}
              </div>

              {/* 凡例 */}
              <div className="space-y-3">
                <div className="text-xs font-medium text-gray-700 text-center">凡例</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>習慣達成日</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 text-xs">♻️</div>
                    </div>
                    <span>代替行動日</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div>
                    <span>敗北</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-2 bg-black rounded"></div>
                    <span>休息日</span>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-yellow-400"></div>
                    <span>立て直し日（2日ルール適用）</span>
                  </div>
                </div>
              </div>

              {/* 習慣の色分け表示 */}
              {savedHabits.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-700 mb-2">習慣の色分け</div>
                  <div className="grid grid-cols-2 gap-1">
                    {savedHabits.slice(0, 8).map((habit) => (
                      <div key={habit.id} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getHabitColor(habit.id, savedHabits) }}
                        ></div>
                        <span className="text-xs text-gray-600 truncate">{habit.name}</span>
                      </div>
                    ))}
                    {savedHabits.length > 8 && (
                      <div className="text-xs text-gray-400 col-span-2">
                        他{savedHabits.length - 8}個の習慣
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 選択された日の詳細 */}
              {selectedDate && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {new Date(selectedDate).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })}の記録
                  </h4>
                  <div className="space-y-2">
                    {getSelectedDateRecords().map((record, index) => {
                      const habit = savedHabits.find(h => h.id === record.habitId);
                      const habitColor = habit ? getHabitColor(habit.id, savedHabits) : '#6B7280';
                      const isRecoveryDay = checkTwoDayRule(habitRecords, record.habitId, selectedDate);
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div 
                              className={`w-4 h-4 rounded-full flex-shrink-0 ${
                                isRecoveryDay ? 'ring-2 ring-yellow-400' : ''
                              }`}
                              style={{ backgroundColor: habitColor }}
                            ></div>
                            <span className="text-lg">{getResultEmoji(record.result || '')}</span>
                            <div>
                              <span className="text-sm font-medium">{habit?.name || '不明な習慣'}</span>
                              {/* スコア・タイム表示 */}
                              {record.scoreValue && (
                                <div className="text-xs text-blue-600 mt-1">
                                  スコア: {record.scoreValue}{habit?.recordSettings?.unit || '回'}
                                  {record.targetScore && record.scoreValue >= record.targetScore && (
                                    <span className="ml-1 text-green-600">🎉</span>
                                  )}
                                </div>
                              )}
                              {record.timeValue && (
                                <div className="text-xs text-orange-600 mt-1">
                                  タイム: {record.timeValue}分
                                  {record.targetTime && record.timeValue <= record.targetTime && (
                                    <span className="ml-1 text-green-600">🎉</span>
                                  )}
                                </div>
                              )}
                              {record.result === 'alternative' && (
                                <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                  代替行動
                                </span>
                              )}
                              {isRecoveryDay && (
                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                  立て直し
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {getResultLabel(record.result || '')}
                          </span>
                        </div>
                      );
                    })}
                    {getSelectedDateRecords().length === 0 && (
                      <div className="text-center text-gray-500 text-sm py-4">
                        この日は記録がありません
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 他の表示モード（簡易実装） */}
          {viewMode !== 'monthly' && (
            <div className="p-6">
              {viewMode === 'daily' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">日次分析</h3>
                  
                  {/* 今日の詳細 */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-medium text-gray-900 mb-4">
                      {new Date().toLocaleDateString('ja-JP', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">今日の予定習慣</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {getTodayHabits(savedHabits, new Date()).length}個
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">完了済み</p>
                        <p className="text-2xl font-bold text-green-600">
                          {getRecordsForDate(new Date().toISOString().split('T')[0]).length}個
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => navigate('/records')}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        今日の記録をつける
                      </button>
                    </div>
                  </div>
                  
                  {/* 過去7日間の傾向 */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">過去7日間の傾向</h4>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (6 - i));
                        const dateString = date.toISOString().split('T')[0];
                        const dayRecords = getRecordsForDate(dateString);
                        const expectedHabits = getTodayHabits(savedHabits, date);
                        const completionRate = expectedHabits.length > 0 
                          ? Math.round((dayRecords.length / expectedHabits.length) * 100) 
                          : 0;
                        
                        return (
                          <div key={i} className="text-center">
                            <p className="text-xs text-gray-500 mb-1">
                              {date.toLocaleDateString('ja-JP', { weekday: 'short' })}
                            </p>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              completionRate === 100 ? 'bg-green-500 text-white' :
                              completionRate >= 50 ? 'bg-yellow-500 text-white' :
                              completionRate > 0 ? 'bg-orange-500 text-white' :
                              'bg-gray-200 text-gray-600'
                            }`}>
                              {completionRate}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {viewMode === 'weekly' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">週次分析</h3>
                  
                  {/* 今週の概要 */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-medium text-gray-900 mb-4">今週の概要</h4>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">週間達成率</p>
                        <p className="text-2xl font-bold text-green-600">{progress.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">連続記録</p>
                        <p className="text-2xl font-bold text-blue-600">{progress.consecutiveDays}日</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">総達成回数</p>
                        <p className="text-2xl font-bold text-purple-600">{progress.successRecords}回</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 曜日別パフォーマンス */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">曜日別パフォーマンス</h4>
                    <div className="space-y-3">
                      {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => {
                        // 簡易的な曜日別データ（実際の実装では詳細な計算が必要）
                        const dayRate = Math.floor(Math.random() * 40) + 60; // デモ用
                        return (
                          <div key={day} className="flex items-center space-x-4">
                            <span className="w-8 text-sm font-medium text-gray-700">{day}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                                style={{ width: `${dayRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 w-12">{dayRate}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {viewMode === 'yearly' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">年次分析</h3>
                  
                  {/* 年間概要 */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <h4 className="font-medium text-gray-900 mb-4">2025年の成果</h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">年間総達成回数</p>
                        <p className="text-3xl font-bold text-purple-600">{progress.successRecords}</p>
                        <p className="text-xs text-gray-500 mt-1">昨年比 +{Math.floor(Math.random() * 50) + 20}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">最長連続記録</p>
                        <p className="text-3xl font-bold text-pink-600">{progress.consecutiveDays}</p>
                        <p className="text-xs text-gray-500 mt-1">個人ベスト更新中</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 月別パフォーマンス */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">月別パフォーマンス</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({ length: 12 }, (_, i) => {
                        const monthRate = Math.floor(Math.random() * 40) + 50; // デモ用
                        const monthName = new Date(2025, i, 1).toLocaleDateString('ja-JP', { month: 'short' });
                        return (
                          <div key={i} className="text-center">
                            <p className="text-xs text-gray-500 mb-2">{monthName}</p>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold mx-auto ${
                              monthRate >= 80 ? 'bg-green-500 text-white' :
                              monthRate >= 60 ? 'bg-yellow-500 text-white' :
                              monthRate >= 40 ? 'bg-orange-500 text-white' :
                              'bg-red-500 text-white'
                            }`}>
                              {monthRate}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {/* 共通のSNSシェアボタン */}
              <div className="mt-6 text-center">
                <button
                  onClick={shareToSNS}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <Share2 className="w-4 h-4 inline mr-2" />
                  成果をシェアする
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-2 py-2 safe-area-pb sticky bottom-0">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <BottomNavButton
              key={item.id}
              title={item.title}
              icon={item.icon}
              emoji={item.emoji}
              onClick={item.onClick}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;