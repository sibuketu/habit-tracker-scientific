import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Clock, Target, CheckCircle, X, AlertCircle, Mic, Camera, Type, MicOff, Play, Pause, RotateCcw } from 'lucide-react';
import BottomNavButton from '../BottomNavButton';
import { BarChart3, MessageCircle, PenTool, Settings } from 'lucide-react';

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
  recordType?: 'score' | 'time';
  recordSettings?: {
    unit?: string;
    targetScore?: number;
    targetTime?: number;
  };
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

const RecordsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [savedHabits, setSavedHabits] = useState<SavedHabit[]>([]);
  const [todayRecords, setTodayRecords] = useState<Record<string, HabitRecord>>({});
  const [expandedHabits, setExpandedHabits] = useState<Set<string>>(new Set());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [diaryInputMethod, setDiaryInputMethod] = useState<'text' | 'voice' | 'handwriting'>('text');
  const [diaryText, setDiaryText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDiaryDetail, setShowDiaryDetail] = useState(false);
  const [showHabitsDetail, setShowHabitsDetail] = useState(false);
  const [recordValues, setRecordValues] = useState<Record<string, { score?: number; time?: number }>>({});
  
  // タイムアタック用の状態
  const [timerStates, setTimerStates] = useState<Record<string, {
    isRunning: boolean;
    elapsedTime: number;
    startTime: number | null;
  }>>({});
  const timerRefs = useRef<Record<string, number>>({});

  const today = new Date().toISOString().split('T')[0];

  // タイマー機能
  const startTimer = (habitId: string) => {
    const now = Date.now();
    setTimerStates(prev => ({
      ...prev,
      [habitId]: {
        isRunning: true,
        elapsedTime: prev[habitId]?.elapsedTime || 0,
        startTime: now
      }
    }));

    timerRefs.current[habitId] = setInterval(() => {
      setTimerStates(prev => {
        if (!prev[habitId]?.isRunning) return prev;
        const elapsed = (Date.now() - (prev[habitId]?.startTime || now)) / 1000;
        return {
          ...prev,
          [habitId]: {
            ...prev[habitId],
            elapsedTime: (prev[habitId]?.elapsedTime || 0) + elapsed
          }
        };
      });
    }, 100);
  };

  const stopTimer = (habitId: string) => {
    setTimerStates(prev => ({
      ...prev,
      [habitId]: {
        ...prev[habitId],
        isRunning: false,
        startTime: null
      }
    }));

    if (timerRefs.current[habitId]) {
      clearInterval(timerRefs.current[habitId]);
      delete timerRefs.current[habitId];
    }
  };

  const resetTimer = (habitId: string) => {
    stopTimer(habitId);
    setTimerStates(prev => ({
      ...prev,
      [habitId]: {
        isRunning: false,
        elapsedTime: 0,
        startTime: null
      }
    }));
    setRecordValues(prev => ({
      ...prev,
      [habitId]: {
        ...prev[habitId],
        time: 0
      }
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  // コンポーネントのクリーンアップ
  useEffect(() => {
    return () => {
      Object.values(timerRefs.current).forEach(timer => clearInterval(timer));
    };
  }, []);

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
        // 習慣データを読み込み
        const storedHabits = localStorage.getItem('habitTracker_habits');
        if (storedHabits) {
          setSavedHabits(JSON.parse(storedHabits));
        }

        // 今日の記録を読み込み
        const storedRecords = localStorage.getItem('habitTracker_records');
        if (storedRecords) {
          const allRecords: HabitRecord[] = JSON.parse(storedRecords);
          const todayRecordsMap: Record<string, HabitRecord> = {};
          
          allRecords
            .filter(record => record.date === today)
            .forEach(record => {
              todayRecordsMap[record.habitId] = record;
            });
          
          setTodayRecords(todayRecordsMap);
        }
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    };
    loadData();
  }, [today]);

  // 音声録音機能
  const startVoiceRecording = async () => {
    try {
      setIsRecording(true);
      // 実際の実装では Web Speech API を使用
      // ここではデモ用の処理
      setTimeout(() => {
        setIsRecording(false);
        setIsProcessing(true);
        setTimeout(() => {
          setDiaryText(prev => prev + (prev ? '\n\n' : '') + '[音声入力] 今日は習慣を続けることができて良かったです。明日も頑張りたいと思います。');
          setIsProcessing(false);
        }, 2000);
      }, 3000);
    } catch (error) {
      console.error('Voice recording failed:', error);
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
  };

  // 手書き写真アップロード
  const handleHandwritingUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      // 実際の実装では OCR API を使用
      // ここではデモ用の処理
      setTimeout(() => {
        setDiaryText(prev => prev + (prev ? '\n\n' : '') + '[手書き入力] 今日の習慣記録：朝のストレッチを10分実施。体が軽くなった感じがする。継続していきたい。');
        setIsProcessing(false);
      }, 3000);
    }
  };

  // 日記保存
  const saveDiary = () => {
    try {
      const diaryData = {
        date: today,
        content: diaryText,
        timestamp: new Date().toISOString()
      };
      
      const storedDiaries = localStorage.getItem('habitTracker_diaries');
      let allDiaries = storedDiaries ? JSON.parse(storedDiaries) : [];
      
      const existingIndex = allDiaries.findIndex((d: any) => d.date === today);
      if (existingIndex >= 0) {
        allDiaries[existingIndex] = diaryData;
      } else {
        allDiaries.push(diaryData);
      }
      
      localStorage.setItem('habitTracker_diaries', JSON.stringify(allDiaries));
      
      // 成功フィードバック
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 1500);
    } catch (error) {
      console.error('Failed to save diary:', error);
    }
  };

  // 日記読み込み
  useEffect(() => {
    try {
      const storedDiaries = localStorage.getItem('habitTracker_diaries');
      if (storedDiaries) {
        const allDiaries = JSON.parse(storedDiaries);
        const todayDiary = allDiaries.find((d: any) => d.date === today);
        if (todayDiary) {
          setDiaryText(todayDiary.content);
        }
      }
    } catch (error) {
      console.error('Failed to load diary:', error);
    }
  }, [today]);

  // 記録を保存
  const saveRecord = (habitId: string, result: 'victory' | 'alternative' | 'defeat', actualDifficulty: number, notes: string = '', scoreValue?: number, timeValue?: number) => {
    try {
      const habit = savedHabits.find(h => h.id === habitId);
      const record: HabitRecord = {
        habitId,
        date: today,
        result,
        actualDifficulty,
        notes,
        timestamp: new Date().toISOString(),
        scoreValue,
        timeValue,
        targetScore: habit?.recordSettings?.targetScore,
        targetTime: habit?.recordSettings?.targetTime
      };

      // 既存の記録を読み込み
      const storedRecords = localStorage.getItem('habitTracker_records');
      let allRecords: HabitRecord[] = storedRecords ? JSON.parse(storedRecords) : [];

      // 今日の同じ習慣の記録があれば更新、なければ追加
      const existingIndex = allRecords.findIndex(r => r.habitId === habitId && r.date === today);
      if (existingIndex >= 0) {
        allRecords[existingIndex] = record;
      } else {
        allRecords.push(record);
      }

      // 保存
      localStorage.setItem('habitTracker_records', JSON.stringify(allRecords));

      // 状態更新
      setTodayRecords(prev => ({
        ...prev,
        [habitId]: record
      }));

      // 成功モーダル表示
      if (result === 'victory' || result === 'alternative') {
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 2000);
      }
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };
  
  // Filter irregular habits from saved habits
  const irregularHabits = savedHabits.filter(habit => habit.type === 'irregular');

  // 今日実行すべき習慣をフィルタリング
  const getTodayHabits = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayName = dayNames[dayOfWeek] as keyof SavedHabit['selectedDays'];

    return savedHabits.filter(habit => {
      if (habit.frequency === 'daily') {
        return true;
      } else if (habit.frequency === 'weekly') {
        return habit.selectedDays[todayName];
      } else if (habit.frequency === 'interval') {
        // 簡単な間隔チェック（実際の実装ではより複雑な計算が必要）
        const createdDate = new Date(habit.createdAt);
        const daysDiff = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff % habit.intervalDays === 0;
      }
      return false;
    });
  };

  const todayHabits = getTodayHabits();

  const getResultLabel = (result: string) => {
    switch (result) {
      case 'victory': return '勝利';
      case 'alternative': return '代替勝利';
      case 'defeat': return '敗北';
      default: return '未記録';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'victory': return 'bg-green-500 text-white';
      case 'alternative': return 'bg-yellow-500 text-white';
      case 'defeat': return 'bg-red-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
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

  const toggleHabitExpansion = (habitId: string) => {
    const newExpanded = new Set(expandedHabits);
    if (newExpanded.has(habitId)) {
      newExpanded.delete(habitId);
    } else {
      newExpanded.add(habitId);
    }
    setExpandedHabits(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">今日の記録</h1>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString('ja-JP', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Daily Diary Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          {/* Diary Header */}
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowDiaryDetail(!showDiaryDetail)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm">📝</span>
              </div>
              <div>
                <h2 className="font-medium text-gray-900">今日の日記</h2>
                {diaryText && !showDiaryDetail && (
                  <p className="text-sm text-gray-500 truncate max-w-xs">
                    {diaryText.substring(0, 30)}...
                  </p>
                )}
              </div>
            </div>
            <div className="text-gray-400">
              {showDiaryDetail ? '▼' : '▶'}
            </div>
          </div>
          
          {/* Diary Detail */}
          {showDiaryDetail && (
            <div className="px-4 pb-4 border-t border-gray-100">
              {/* Input Method Selection */}
              <div className="flex space-x-2 my-4">
                <button
                  onClick={() => setDiaryInputMethod('text')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    diaryInputMethod === 'text'
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  <span>テキスト</span>
                </button>
                <button
                  onClick={() => setDiaryInputMethod('voice')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    diaryInputMethod === 'voice'
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>音声</span>
                </button>
                <button
                  onClick={() => setDiaryInputMethod('handwriting')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    diaryInputMethod === 'handwriting'
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>手書き</span>
                </button>
              </div>

              {/* Text Input */}
              {diaryInputMethod === 'text' && (
                <textarea
                  value={diaryText}
                  onChange={(e) => setDiaryText(e.target.value)}
                  placeholder="今日はどんな一日でしたか？習慣への取り組みや気づいたことを自由に書いてください..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              )}

              {/* Voice Input */}
              {diaryInputMethod === 'voice' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    {isRecording ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                          <MicOff className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">録音中...</p>
                        <button
                          onClick={stopVoiceRecording}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                          停止
                        </button>
                      </div>
                    ) : isProcessing ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-sm text-gray-600">AIが文字起こし中...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mic className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">音声で日記を録音</p>
                        <button
                          onClick={startVoiceRecording}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
                        >
                          録音開始
                        </button>
                      </div>
                    )}
                  </div>
                  {diaryText && (
                    <textarea
                      value={diaryText}
                      onChange={(e) => setDiaryText(e.target.value)}
                      placeholder="文字起こし結果を編集できます..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  )}
                </div>
              )}

              {/* Handwriting Input */}
              {diaryInputMethod === 'handwriting' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    {isProcessing ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-sm text-gray-600">AIが手書き文字を認識中...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">手書きメモの写真をアップロード</p>
                        <label className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer">
                          写真を選択
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleHandwritingUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {diaryText && (
                    <textarea
                      value={diaryText}
                      onChange={(e) => setDiaryText(e.target.value)}
                      placeholder="認識結果を編集できます..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  )}
                </div>
              )}
              
              <div className="flex justify-end mt-3">
                <button 
                  onClick={saveDiary}
                  disabled={!diaryText.trim() || isProcessing}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  保存
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Irregular Habits Section */}
        {irregularHabits.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            {/* Irregular Habits Header */}
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setShowIrregularDetail(!showIrregularDetail)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🎯</span>
                </div>
                <div>
                  <h2 className="font-medium text-gray-900">不定期習慣の記録</h2>
                  <p className="text-sm text-gray-500">
                    {irregularHabits.length}個の不定期習慣
                  </p>
                </div>
              </div>
              <div className="text-gray-400">
                {showIrregularDetail ? '▼' : '▶'}
              </div>
            </div>
            
            {/* Irregular Habits Detail */}
            {showIrregularDetail && (
              <div className="border-t border-gray-100">
                {selectedIrregularHabit ? (
                  // 選択された不定期習慣の記録画面
                  <div className="p-4">
                    {(() => {
                      const habit = irregularHabits.find(h => h.id === selectedIrregularHabit);
                      const record = todayRecords[selectedIrregularHabit];
                      const isCompleted = record && record.result !== null;
                      
                      if (!habit) return null;
                      
                      return (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">{habit.name}</h3>
                            <button
                              onClick={() => setSelectedIrregularHabit(null)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">{habit.thenAction}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>タイプ: {habit.irregularSettings?.type === 'avoidance' ? '回避型' : '実行型'}</span>
                              {habit.irregularSettings?.type === 'avoidance' ? (
                                <span>予測気分: {habit.irregularSettings?.predictedMood || 5}/10</span>
                              ) : (
                                <span>予測しんどさ: {habit.irregularSettings?.predictedDifficulty || 5}/10</span>
                              )}
                              <span>影響度: {habit.irregularSettings?.impact || 5}/10</span>
                            </div>
                          </div>

                          {!isCompleted ? (
                            <div className="space-y-4">
                              {habit.irregularSettings?.type === 'avoidance' && (
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                  <h4 className="font-medium text-orange-800 mb-3">回避型習慣</h4>
                                  <p className="text-sm text-orange-700 mb-3">
                                    この行動をしてしまいましたか？
                                  </p>
                                </div>
                              )}
                              
                              {habit.irregularSettings?.type === 'execution' && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                  <h4 className="font-medium text-blue-800 mb-3">実行型習慣</h4>
                                  <p className="text-sm text-blue-700 mb-3">
                                    この習慣を実行しましたか？
                                  </p>
                                </div>
                              )}

                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    saveRecord(habit.id, 'victory', habit.irregularSettings?.predictedDifficulty || 5);
                                    setSelectedIrregularHabit(null);
                                  }}
                                  className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  <span>勝利</span>
                                </button>
                                <button
                                  onClick={() => {
                                    saveRecord(habit.id, 'alternative', habit.irregularSettings?.predictedDifficulty || 5);
                                    setSelectedIrregularHabit(null);
                                  }}
                                  className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2"
                                >
                                  <Target className="w-4 h-4" />
                                  <span>代替勝利</span>
                                </button>
                                <button
                                  onClick={() => {
                                    // 敗北の場合は結果気分を入力するモーダルを表示
                                    if (habit.irregularSettings?.type === 'avoidance') {
                                      const resultMood = prompt('結果気分を1-10で入力してください（1=とても悪い、10=それほど悪くない）:');
                                      if (resultMood && !isNaN(parseInt(resultMood))) {
                                        const mood = Math.max(1, Math.min(10, parseInt(resultMood)));
                                        saveRecord(habit.id, 'defeat', habit.irregularSettings?.predictedDifficulty || 5, '', undefined, undefined, mood);
                                      }
                                    } else {
                                      saveRecord(habit.id, 'defeat', habit.irregularSettings?.predictedDifficulty || 5);
                                    }
                                    setSelectedIrregularHabit(null);
                                  }}
                                  className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                                >
                                  <X className="w-4 h-4" />
                                  <span>敗北</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">記録完了</p>
                                  <p className="text-xs text-gray-500">
                                    結果: {getResultLabel(record.result || '')}
                                  </p>
                                  {record.actualMood && (
                                    <p className="text-xs text-orange-600">
                                      結果気分: {record.actualMood}/10
                                    </p>
                                  )}
                                  <p className="text-xs text-gray-400">
                                    {new Date(record.timestamp).toLocaleTimeString('ja-JP')}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    // 記録を削除して再入力可能にする
                                    const storedRecords = localStorage.getItem('habitTracker_records');
                                    if (storedRecords) {
                                      const allRecords: HabitRecord[] = JSON.parse(storedRecords);
                                      const filteredRecords = allRecords.filter(r => !(r.habitId === habit.id && r.date === today));
                                      localStorage.setItem('habitTracker_records', JSON.stringify(filteredRecords));
                                      
                                      setTodayRecords(prev => {
                                        const newRecords = { ...prev };
                                        delete newRecords[habit.id];
                                        return newRecords;
                                      });
                                    }
                                  }}
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  <AlertCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  // 不定期習慣のタブ一覧
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-3">
                      {irregularHabits.map((habit) => {
                        const record = todayRecords[habit.id];
                        const isCompleted = record && record.result !== null;
                        
                        return (
                          <button
                            key={habit.id}
                            onClick={() => setSelectedIrregularHabit(habit.id)}
                            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                          >
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{habit.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {habit.irregularSettings?.type === 'avoidance' ? '回避型' : '実行型'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {isCompleted && (
                                <>
                                  <span className="text-2xl">{getResultEmoji(record.result || '')}</span>
                                  <span className={`text-xs px-2 py-1 rounded ${getResultColor(record.result || '')}`}>
                                    {getResultLabel(record.result || '')}
                                  </span>
                                </>
                              )}
                              <div className="text-gray-400">▶</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {/* Habits Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          {/* Habits Header */}
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowHabitsDetail(!showHabitsDetail)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm">✅</span>
              </div>
              <div>
                <h2 className="font-medium text-gray-900">今日の記録</h2>
                <p className="text-sm text-gray-500">
                  {Object.keys(todayRecords).length}/{todayHabits.length} 完了
                </p>
              </div>
            </div>
            <div className="text-gray-400">
              {showHabitsDetail ? '▼' : '▶'}
            </div>
          </div>
          
          {/* Habits Detail */}
          {showHabitsDetail && (
            <div className="border-t border-gray-100">
              {todayHabits.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">今日実行する習慣がありません</h3>
                  <p className="text-gray-500 mb-4">習慣設定画面で新しい習慣を作成しましょう</p>
                  <button
                    onClick={() => navigate('/habits')}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    習慣を作成
                  </button>
                </div>
              ) : (
                <div className="space-y-0">
                  {todayHabits.map((habit) => {
                    const record = todayRecords[habit.id];
                    const isCompleted = record && record.result !== null;
                    const isExpanded = expandedHabits.has(habit.id);

                    return (
                      <div key={habit.id} className="border-b border-gray-100 last:border-b-0">
                        <div 
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleHabitExpansion(habit.id)}
                        >
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{habit.name}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isCompleted && (
                              <>
                                <span className="text-2xl">{getResultEmoji(record.result || '')}</span>
                                <span className={`text-xs px-2 py-1 rounded ${getResultColor(record.result || '')}`}>
                                  {getResultLabel(record.result || '')}
                                </span>
                              </>
                            )}
                            <div className="text-gray-400">
                              {isExpanded ? '▼' : '▶'}
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-gray-100">
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-2">{habit.thenAction}</p>
                              {habit.additionalActions && (
                                <div className="text-xs text-gray-500 mb-2">
                                  <p className="font-medium">追加行動:</p>
                                  {habit.additionalActions.split('\n').map((action, index) => (
                                    <p key={index} className="ml-2">• {action}</p>
                                  ))}
                                </div>
                              )}
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>予測しんどさ: {habit.difficulty}/10</span>
                                <span>影響度: {habit.impact}/10</span>
                              </div>
                            </div>

                            {!isCompleted ? (
                              <div className="space-y-4">
                                {/* スコアチャレンジ・タイムアタック入力 */}
                                {habit.recordType === 'score' && (
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-3">
                                      <span className="text-lg">🏆</span>
                                      <h4 className="font-medium text-blue-800">スコアチャレンジ</h4>
                                    </div>
                                    <div className="space-y-3">
                                      <div>
                                        <label className="text-sm font-medium text-blue-700 block mb-1">
                                          今回のスコア
                                        </label>
                                        <div className="flex items-center space-x-2">
                                          <input
                                            type="number"
                                            value={recordValues[habit.id]?.score || ''}
                                            onChange={(e) => setRecordValues(prev => ({
                                              ...prev,
                                              [habit.id]: {
                                                ...prev[habit.id],
                                                score: parseFloat(e.target.value) || 0
                                              }
                                            }))}
                                            placeholder="0"
                                            className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                          <span className="text-sm text-blue-600">{habit.recordSettings?.unit || '回'}</span>
                                        </div>
                                      </div>
                                      {habit.recordSettings?.targetScore && (
                                        <div className="text-xs text-blue-600">
                                          目標: {habit.recordSettings.targetScore}{habit.recordSettings?.unit || '回'}
                                          {recordValues[habit.id]?.score && recordValues[habit.id]?.score >= habit.recordSettings.targetScore && (
                                            <span className="ml-2 text-green-600 font-bold">🎉 目標達成！</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {habit.recordType === 'time' && (
                                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-3">
                                      <span className="text-lg">⏱️</span>
                                      <h4 className="font-medium text-orange-800">タイムアタック</h4>
                                    </div>
                                    <div className="space-y-3">
                                      {/* タイマー表示 */}
                                      <div className="text-center mb-4">
                                        <div className="text-3xl font-mono font-bold text-orange-800 mb-2">
                                          {formatTime(timerStates[habit.id]?.elapsedTime || 0)}
                                        </div>
                                        <div className="flex justify-center space-x-2">
                                          {!timerStates[habit.id]?.isRunning ? (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                startTimer(habit.id);
                                              }}
                                              className="flex items-center space-x-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                            >
                                              <Play className="w-4 h-4" />
                                              <span>開始</span>
                                            </button>
                                          ) : (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                stopTimer(habit.id);
                                                const finalTime = (timerStates[habit.id]?.elapsedTime || 0) / 60; // 分に変換
                                                setRecordValues(prev => ({
                                                  ...prev,
                                                  [habit.id]: {
                                                    ...prev[habit.id],
                                                    time: finalTime
                                                  }
                                                }));
                                              }}
                                              className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                              <Pause className="w-4 h-4" />
                                              <span>停止</span>
                                            </button>
                                          )}
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              resetTimer(habit.id);
                                            }}
                                            className="flex items-center space-x-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                          >
                                            <RotateCcw className="w-4 h-4" />
                                            <span>リセット</span>
                                          </button>
                                        </div>
                                      </div>
                                      
                                      {/* 手動入力（バックアップ） */}
                                      <div>
                                        <label className="text-sm font-medium text-orange-700 block mb-1">
                                          手動入力（分）
                                        </label>
                                        <div className="flex items-center space-x-2">
                                          <input
                                            type="number"
                                            step="0.1"
                                            value={recordValues[habit.id]?.time || ''}
                                            onChange={(e) => setRecordValues(prev => ({
                                              ...prev,
                                              [habit.id]: {
                                                ...prev[habit.id],
                                                time: parseFloat(e.target.value) || 0
                                              }
                                            }))}
                                            placeholder="0.0"
                                            className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                          />
                                          <span className="text-sm text-orange-600">分</span>
                                        </div>
                                      </div>
                                      
                                      {habit.recordSettings?.targetTime && (
                                        <div className="text-xs text-orange-600">
                                          目標: {habit.recordSettings.targetTime}分以内
                                          {recordValues[habit.id]?.time && recordValues[habit.id]?.time <= habit.recordSettings.targetTime && (
                                            <span className="ml-2 text-green-600 font-bold">🎉 目標達成！</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    実際のしんどさ: {record?.actualDifficulty || 5}/10
                                  </label>
                                  <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={record?.actualDifficulty || 5}
                                    onChange={(e) => {
                                      const difficulty = parseInt(e.target.value);
                                      setTodayRecords(prev => ({
                                        ...prev,
                                        [habit.id]: {
                                          ...prev[habit.id],
                                          habitId: habit.id,
                                          date: today,
                                          result: null,
                                          actualDifficulty: difficulty,
                                          notes: prev[habit.id]?.notes || '',
                                          timestamp: new Date().toISOString()
                                        }
                                      }));
                                    }}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                  />
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>楽</span>
                                    <span>しんどい</span>
                                  </div>
                                </div>

                                <div className="flex space-x-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveRecord(
                                        habit.id, 
                                        'victory', 
                                        record?.actualDifficulty || 5, 
                                        '', 
                                        recordValues[habit.id]?.score,
                                        recordValues[habit.id]?.time
                                      );
                                    }}
                                    className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    <span>勝利</span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveRecord(
                                        habit.id, 
                                        'alternative', 
                                        record?.actualDifficulty || 5, 
                                        '', 
                                        recordValues[habit.id]?.score,
                                        recordValues[habit.id]?.time
                                      );
                                    }}
                                    className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2"
                                  >
                                    <Target className="w-4 h-4" />
                                    <span>代替勝利</span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveRecord(
                                        habit.id, 
                                        'defeat', 
                                        record?.actualDifficulty || 5, 
                                        '', 
                                        recordValues[habit.id]?.score,
                                        recordValues[habit.id]?.time
                                      );
                                    }}
                                    className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                                  >
                                    <X className="w-4 h-4" />
                                    <span>敗北</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">記録完了</p>
                                    {/* スコア・タイム表示 */}
                                    {record.scoreValue && (
                                      <p className="text-xs text-blue-600">
                                        スコア: {record.scoreValue}{habit.recordSettings?.unit || '回'}
                                        {habit.recordSettings?.targetScore && record.scoreValue >= habit.recordSettings.targetScore && (
                                          <span className="ml-1 text-green-600">🎉</span>
                                        )}
                                      </p>
                                    )}
                                    {record.timeValue && (
                                      <p className="text-xs text-orange-600">
                                        タイム: {record.timeValue}分
                                        {habit.recordSettings?.targetTime && record.timeValue <= habit.recordSettings.targetTime && (
                                          <span className="ml-1 text-green-600">🎉</span>
                                        )}
                                      </p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                      実際のしんどさ: {record.actualDifficulty}/10
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      {new Date(record.timestamp).toLocaleTimeString('ja-JP')}
                                    </p>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // 記録を削除して再入力可能にする
                                      const storedRecords = localStorage.getItem('habitTracker_records');
                                      if (storedRecords) {
                                        const allRecords: HabitRecord[] = JSON.parse(storedRecords);
                                        const filteredRecords = allRecords.filter(r => !(r.habitId === habit.id && r.date === today));
                                        localStorage.setItem('habitTracker_records', JSON.stringify(filteredRecords));
                                        
                                        setTodayRecords(prev => {
                                          const newRecords = { ...prev };
                                          delete newRecords[habit.id];
                                          return newRecords;
                                        });
                                      }
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                  >
                                    <AlertCircle className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">素晴らしい！</h3>
            <p className="text-gray-600">習慣を実行できました！</p>
          </div>
        </div>
      )}

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
              isActive={item.path === '/records'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordsScreen;