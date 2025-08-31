import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Clock, 
  Target, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import BottomNavButton from '../BottomNavButton';
import TooltipButton from '../TooltipButton';
import { BarChart3, MessageCircle, PenTool, Settings } from 'lucide-react';

interface SavedHabit {
  id: string;
  type: 'if-then' | 'timed' | 'irregular-avoidance' | 'irregular-execution';
  name: string;
  ifCondition: string;
  thenAction: string;
  thenChain: string[]; // 連鎖する行動
  estimatedTime?: string; // だいたい何時に発生するか
  enableTimeNotification?: boolean; // 時間通知を有効にするか
  recordType?: 'time-attack' | 'score-challenge'; // 記録タイプ
  timeAttackTarget?: string; // タイムアタック目標
  scoreTarget?: string; // スコア目標
  startTime?: string; // 時間指定型の開始時間
  graceMinutes?: number; // 猶予時間（分）
  enableStartNotification?: boolean; // 開始時間通知
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
  mood?: number; // 回避型の予測気分
  badImpact?: number; // 回避型の悪影響度
  impact: number;
  otherNotes?: string;
  irregularSettings: any[];
  version: number;
  actualMood?: number; // 回避型の結果気分
  timeRecord?: string; // タイムアタック記録
  scoreRecord?: string; // スコア記録
  startTimeResult?: 'early' | 'on-time' | 'late'; // 時間指定型の開始時間評価
  createdAt: string;
  updatedAt: string;
}

const HabitsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [savedHabits, setSavedHabits] = useState<SavedHabit[]>([]);
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<SavedHabit | null>(null);
  const [expandedHabits, setExpandedHabits] = useState<Set<string>>(new Set());
  
  // その他の工夫点のプレースホルダー生成
  const getOtherNotesPlaceholder = () => {
    const goalLower = finalGoal.toLowerCase();
    const actionLower = thenAction.toLowerCase();
    const conditionLower = ifCondition.toLowerCase();
    
    // 目標や行動内容に基づいて具体例を生成
    if (goalLower.includes('英語') || actionLower.includes('英語') || actionLower.includes('単語')) {
      return "例: 単語帳を枕元に置いておく、英語アプリを開きやすい場所に配置、好きな洋楽を聞きながら学習";
    } else if (goalLower.includes('運動') || goalLower.includes('筋トレ') || actionLower.includes('腕立て') || actionLower.includes('運動')) {
      return "例: 前日にウェアを準備、好きな音楽プレイリストを作成、運動後のプロテインを用意";
    } else if (goalLower.includes('読書') || actionLower.includes('本') || actionLower.includes('読')) {
      return "例: 読む本を見えるところに置く、読書灯を準備、読書記録アプリを活用";
    } else if (goalLower.includes('ダイエット') || actionLower.includes('水') || actionLower.includes('食事')) {
      return "例: 水筒を常に持ち歩く、健康的なおやつを準備、食事記録アプリを使用";
    } else if (goalLower.includes('早起き') || conditionLower.includes('起き') || conditionLower.includes('朝')) {
      return "例: 前日に早く寝る、アラームを遠くに置く、朝の楽しみ（コーヒーなど）を用意";
    } else if (actionLower.includes('瞑想') || actionLower.includes('深呼吸') || actionLower.includes('リラックス')) {
      return "例: 静かな場所を確保、瞑想アプリを使用、アロマやキャンドルで雰囲気作り";
    } else if (actionLower.includes('日記') || actionLower.includes('書く') || actionLower.includes('記録')) {
      return "例: 専用のノートを用意、お気に入りのペンを使用、書く時間を決める";
    } else if (actionLower.includes('掃除') || actionLower.includes('片付け')) {
      return "例: 掃除道具を手の届く場所に配置、音楽をかけながら実行、小さなエリアから始める";
    } else if (actionLower.includes('勉強') || actionLower.includes('学習')) {
      return "例: 勉強机を整理整頓、集中できる環境作り、勉強後のご褒美を設定";
    }
    
    // デフォルト例文
    return "例: 前日に準備しておく、音楽を聞きながらやる、ご褒美を設定する など";
  };

  // Form states
  const [selectedType, setSelectedType] = useState<'regular' | 'if-then' | 'timed' | 'irregular'>('if-then');
  const [primaryType, setPrimaryType] = useState<'regular' | 'irregular' | null>(null);
  const [secondaryType, setSecondaryType] = useState<'if-then' | 'timed' | 'execution' | 'avoidance' | null>(null);
  const [finalGoal, setFinalGoal] = useState('');
  const [ifCondition, setIfCondition] = useState('');
  const [thenAction, setThenAction] = useState('');
  const [thenChain, setThenChain] = useState<string[]>(['']);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [enableTimeNotification, setEnableTimeNotification] = useState(false);
  const [recordType, setRecordType] = useState<'time-attack' | 'score-challenge'>('time-attack');
  const [timeAttackTarget, setTimeAttackTarget] = useState('');
  const [scoreTarget, setScoreTarget] = useState('');
  const [startTime, setStartTime] = useState('');
  const [graceMinutes, setGraceMinutes] = useState(5);
  const [enableStartNotification, setEnableStartNotification] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'interval'>('daily');
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });
  const [additionalActionsList, setAdditionalActionsList] = useState<string[]>(['']);
  
  // 記録タイプ設定
  const [targetScore, setTargetScore] = useState<number>(0);
  const [targetTime, setTargetTime] = useState<number>(0);
  const [scoreUnit, setScoreUnit] = useState('回');
  const [intervalDays, setIntervalDays] = useState(1);
  const [endDate, setEndDate] = useState('');
  const [difficulty, setDifficulty] = useState(5);
  const [impact, setImpact] = useState(5);
  const [mood, setMood] = useState(5);
  const [badImpact, setBadImpact] = useState(5);
  const [otherNotes, setOtherNotes] = useState('');
  const [irregularSettings, setIrregularSettings] = useState<any[]>([]);
  const [irregularCountermeasures, setIrregularCountermeasures] = useState<{condition: string, action: string}[]>([{condition: '', action: ''}]);
  const [timeTolerance, setTimeTolerance] = useState(15);

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

  // Load saved habits
  useEffect(() => {
    const loadHabits = () => {
      try {
        const stored = localStorage.getItem('habitTracker_habits');
        if (stored) {
          setSavedHabits(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load habits:', error);
      }
    };
    loadHabits();
  }, []);

  // 例文選択のイベントリスナー
  useEffect(() => {
    const handleSelectExample = (event: any) => {
      const { example, field } = event.detail;
      if (field === 'ifCondition') {
        setIfCondition(example);
      } else if (field === 'thenAction') {
        setThenAction(example);
      }
    };

    window.addEventListener('selectExample', handleSelectExample);
    return () => window.removeEventListener('selectExample', handleSelectExample);
  }, []);
  // Reset form
  const resetForm = () => {
    setPrimaryType(null);
    setSecondaryType(null);
    setSelectedType('if-then');
    setFinalGoal('');
    setIfCondition('');
    setThenAction('');
    setThenChain(['']);
    setEstimatedTime('');
    setEnableTimeNotification(false);
    setRecordType('time-attack');
    setTimeAttackTarget('');
    setScoreTarget('');
    setStartTime('');
    setGraceMinutes(5);
    setEnableStartNotification(false);
    setFrequency('daily');
    setSelectedDays({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    });
    setIntervalDays(1);
    setEndDate('');
    setDifficulty(5);
    setImpact(5);
    setMood(5);
    setBadImpact(5);
    setOtherNotes('');
    setIrregularSettings([]);
    setIrregularCountermeasures([{condition: '', action: ''}]);
    setRecordType('normal');
    setTargetScore(0);
    setTargetTime(0);
    setScoreUnit('回');
    setTimeTolerance(15);
  };

  // Handle primary type selection
  const handlePrimaryTypeSelect = (type: 'regular' | 'irregular') => {
    setPrimaryType(type);
    setSecondaryType(null);
  };

  // Handle secondary type selection
  const handleSecondaryTypeSelect = (type: 'if-then' | 'timed' | 'execution' | 'avoidance') => {
    setSecondaryType(type);
    // Map to the new selectedType
    if (type === 'if-then') {
      setSelectedType('if-then');
    } else if (type === 'timed') {
      setSelectedType('timed');
    } else if (type === 'execution') {
      setSelectedType('irregular-execution');
    } else if (type === 'avoidance') {
      setSelectedType('irregular-avoidance');
    }
  };

  // Save habit
  const saveHabit = () => {
    try {
      const habitData: SavedHabit = {
        id: editingHabit?.id || Date.now().toString(),
        type: selectedType as 'if-then' | 'timed' | 'irregular-avoidance' | 'irregular-execution',
        name: ifCondition,
        ifCondition,
        thenAction,
        thenChain: thenChain.filter(action => action.trim()),
        estimatedTime: selectedType === 'if-then' ? estimatedTime : undefined,
        enableTimeNotification: selectedType === 'if-then' ? enableTimeNotification : undefined,
        recordType: selectedType === 'if-then' ? recordType : undefined,
        timeAttackTarget: selectedType === 'if-then' && recordType === 'time-attack' ? timeAttackTarget : undefined,
        scoreTarget: selectedType === 'if-then' && recordType === 'score-challenge' ? scoreTarget : undefined,
        startTime: selectedType === 'timed' ? startTime : undefined,
        graceMinutes: selectedType === 'timed' ? graceMinutes : undefined,
        enableStartNotification: selectedType === 'timed' ? enableStartNotification : undefined,
        frequency,
        selectedDays,
        intervalDays,
        endDate,
        difficulty,
        mood: selectedType === 'irregular-avoidance' ? mood : undefined,
        badImpact: selectedType === 'irregular-avoidance' ? badImpact : undefined,
        impact,
        otherNotes,
        irregularSettings: irregularCountermeasures.filter(item => item.condition.trim() && item.action.trim()),
        version: editingHabit ? editingHabit.version + 0.1 : 1.0,
        createdAt: editingHabit?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      let updatedHabits;
      if (editingHabit) {
        updatedHabits = savedHabits.map(habit => 
          habit.id === editingHabit.id ? habitData : habit
        );
      } else {
        updatedHabits = [...savedHabits, habitData];
      }

      localStorage.setItem('habitTracker_habits', JSON.stringify(updatedHabits));
      setSavedHabits(updatedHabits);
      
      resetForm();
      setShowNewHabitForm(false);
      setEditingHabit(null);
    } catch (error) {
      console.error('Failed to save habit:', error);
    }
  };

  // Delete habit
  const deleteHabit = (habitId: string) => {
    try {
      const updatedHabits = savedHabits.filter(habit => habit.id !== habitId);
      localStorage.setItem('habitTracker_habits', JSON.stringify(updatedHabits));
      setSavedHabits(updatedHabits);
    } catch (error) {
      console.error('Failed to delete habit:', error);
    }
  };

  // Edit habit
  const startEditHabit = (habit: SavedHabit) => {
    setEditingHabit(habit);
    
    // Map habit type back to primary/secondary types
    if (habit.type === 'if-then') {
      setPrimaryType('regular');
      setSecondaryType('if-then');
      setSelectedType('if-then');
    } else if (habit.type === 'timed') {
      setPrimaryType('regular');
      setSecondaryType('timed');
      setSelectedType('timed');
    } else if (habit.type === 'irregular-execution') {
      setPrimaryType('irregular');
      setSecondaryType('execution');
      setSelectedType('irregular-execution');
    } else if (habit.type === 'irregular-avoidance') {
      setPrimaryType('irregular');
      setSecondaryType('avoidance');
      setSelectedType('irregular-avoidance');
    }
    
    setIfCondition(habit.ifCondition);
    setThenAction(habit.thenAction);
    setThenChain(habit.thenChain && habit.thenChain.length > 0 ? habit.thenChain : ['']);
    setEstimatedTime(habit.estimatedTime || '');
    setEnableTimeNotification(habit.enableTimeNotification || false);
    setRecordType(habit.recordType || 'time-attack');
    setTimeAttackTarget(habit.timeAttackTarget || '');
    setScoreTarget(habit.scoreTarget || '');
    setStartTime(habit.startTime || '');
    setGraceMinutes(habit.graceMinutes || 5);
    setEnableStartNotification(habit.enableStartNotification || false);
    setFrequency(habit.frequency);
    setSelectedDays(habit.selectedDays);
    setIntervalDays(habit.intervalDays);
    setEndDate(habit.endDate);
    setDifficulty(habit.difficulty || 5);
    setMood(habit.mood || 5);
    setBadImpact(habit.badImpact || 5);
    setImpact(habit.impact || 5);
    setOtherNotes(habit.otherNotes || '');
    setIrregularCountermeasures(habit.irregularSettings.length > 0 ? habit.irregularSettings : [{condition: '', action: ''}]);
    setShowNewHabitForm(true);
  };

  // Toggle habit expansion
  const toggleHabitExpansion = (habitId: string) => {
    const newExpanded = new Set(expandedHabits);
    if (newExpanded.has(habitId)) {
      newExpanded.delete(habitId);
    } else {
      newExpanded.add(habitId);
    }
    setExpandedHabits(newExpanded);
  };

  const dayLabels = {
    monday: '月',
    tuesday: '火',
    wednesday: '水',
    thursday: '木',
    friday: '金',
    saturday: '土',
    sunday: '日'
  };

  // 目標に基づく例文生成
  const getExamplesForGoal = (goal: string, type: string | null) => {
    const goalLower = goal.toLowerCase();
    
    if (goalLower.includes('英語') || goalLower.includes('english')) {
      if (type === 'if-then') {
        return {
          habitName: '朝の英語学習',
          ifCondition: '朝起きたら',
          thenAction: '英単語を5個覚える'
        };
      } else if (type === 'timed') {
        return {
          habitName: '英語ポッドキャスト',
          ifCondition: '毎朝7時になったら',
          thenAction: '英語ポッドキャストを15分聞く'
        };
      }
    } else if (goalLower.includes('運動') || goalLower.includes('筋トレ') || goalLower.includes('体')) {
      if (type === 'if-then') {
        return {
          habitName: '朝の筋トレ',
          ifCondition: '朝の準備が終わったら',
          thenAction: '腕立て伏せを10回する'
        };
      } else if (type === 'timed') {
        return {
          habitName: 'ジム通い',
          ifCondition: '毎日18時になったら',
          thenAction: 'ジムに向かう準備をする'
        };
      }
    } else if (goalLower.includes('読書') || goalLower.includes('本')) {
      if (type === 'if-then') {
        return {
          habitName: '夜の読書',
          ifCondition: '夕食後に',
          thenAction: '本を10ページ読む'
        };
      } else if (type === 'timed') {
        return {
          habitName: '朝の読書時間',
          ifCondition: '毎朝6時30分になったら',
          thenAction: '読書を30分する'
        };
      }
    } else if (goalLower.includes('ダイエット') || goalLower.includes('痩せ')) {
      if (type === 'if-then') {
        return {
          habitName: '水分補給',
          ifCondition: '食事前に',
          thenAction: 'コップ1杯の水を飲む'
        };
      } else if (type === 'timed') {
        return {
          habitName: '夕方ウォーキング',
          ifCondition: '毎日17時になったら',
          thenAction: 'ウォーキングに出かける'
        };
      }
    } else if (goalLower.includes('早起き') || goalLower.includes('朝')) {
      if (type === 'if-then') {
        return {
          habitName: '早起き習慣',
          ifCondition: 'アラームが鳴ったら',
          thenAction: 'すぐにベッドから出る'
        };
      } else if (type === 'timed') {
        return {
          habitName: '朝の準備',
          ifCondition: '毎朝6時になったら',
          thenAction: '起きて朝の準備を始める'
        };
      }
    }
    
    // デフォルト例文
    if (type === 'if-then') {
      return {
        habitName: '新しい習慣',
        ifCondition: '〜したら',
        thenAction: '〜する'
      };
    } else if (type === 'timed') {
      return {
        habitName: '時間指定習慣',
        ifCondition: '毎日〜時になったら',
        thenAction: '〜する'
      };
    }
    
    return null;
  };

  // プレースホルダー生成
  const getPlaceholderForGoal = (goal: string, field: 'if' | 'then') => {
    if (!goal) return field === 'if' ? '例: 朝起きたら' : '例: 英単語を5個覚える';
    
    const goalLower = goal.toLowerCase();
    
    if (goalLower.includes('英語')) {
      return field === 'if' ? '例: 朝起きたら' : '例: 英単語を5個覚える';
    } else if (goalLower.includes('運動') || goalLower.includes('筋トレ')) {
      return field === 'if' ? '例: 朝の準備が終わったら' : '例: 腕立て伏せを10回する';
    } else if (goalLower.includes('読書')) {
      return field === 'if' ? '例: 夕食後に' : '例: 本を10ページ読む';
    } else if (goalLower.includes('ダイエット')) {
      return field === 'if' ? '例: 食事前に' : '例: コップ1杯の水を飲む';
    } else if (goalLower.includes('早起き')) {
      return field === 'if' ? '例: アラームが鳴ったら' : '例: すぐにベッドから出る';
    }
    
    return field === 'if' ? '例: 〜したら' : '例: 〜する';
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
              <h1 className="text-xl font-bold text-gray-900">習慣設定</h1>
              <p className="text-sm text-gray-600">If-Then習慣の作成と管理</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              resetForm();
              setShowNewHabitForm(true);
              setEditingHabit(null);
            }}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>新規作成</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Existing Habits List */}
        {!showNewHabitForm && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">作成済みの習慣</h2>
            
            {savedHabits.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">習慣がまだありません</h3>
                <p className="text-gray-500 mb-4">新しい習慣を作成して、理想の自分に近づきましょう</p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowNewHabitForm(true);
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  最初の習慣を作成
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedHabits.map((habit) => {
                  const isExpanded = expandedHabits.has(habit.id);
                  
                  // Display type mapping
                  const getDisplayType = (type: string) => {
                    switch (type) {
                      case 'if-then': return 'イフゼン型';
                      case 'timed': return '時間指定型';
                      case 'irregular-execution': return '不定期実行型';
                      case 'irregular-avoidance': return '不定期回避型';
                      default: return type;
                    }
                  };
                  
                  return (
                    <div key={habit.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleHabitExpansion(habit.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {getDisplayType(habit.type)}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              v{habit.version.toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {habit.frequency === 'daily' ? '毎日' : 
                               habit.frequency === 'weekly' ? '週指定' : `${habit.intervalDays}日間隔`}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">{habit.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{habit.thenAction}</p>
                          {habit.thenChain && habit.thenChain.length > 0 && (
                            <div className="text-xs text-gray-500 mb-2">
                              <p className="font-medium">連鎖行動:</p>
                              {habit.thenChain.map((action, index) => (
                                <p key={index} className="ml-2">• {action}</p>
                              ))}
                            </div>
                          )}
                          
                          {habit.estimatedTime && (
                            <div className="text-xs text-gray-500 mb-1">
                              <span className="font-medium">予想時刻:</span> {habit.estimatedTime}
                              {habit.enableTimeNotification && <span className="ml-2 text-blue-600">🔔</span>}
                            </div>
                          )}
                          
                          {habit.startTime && (
                            <div className="text-xs text-gray-500 mb-1">
                              <span className="font-medium">開始時刻:</span> {habit.startTime}
                              <span className="ml-2">猶予: ±{habit.graceMinutes}分</span>
                              {habit.enableStartNotification && <span className="ml-2 text-blue-600">🔔</span>}
                            </div>
                          )}
                          
                          {habit.recordType && (
                            <div className="text-xs text-gray-500 mb-1">
                              <span className="font-medium">記録タイプ:</span> 
                              {habit.recordType === 'time-attack' ? 'タイムアタック' : 'スコアチャレンジ'}
                              {habit.timeAttackTarget && <span className="ml-2">目標: {habit.timeAttackTarget}</span>}
                              {habit.scoreTarget && <span className="ml-2">目標: {habit.scoreTarget}</span>}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditHabit(habit);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('この習慣を削除しますか？')) {
                                deleteHabit(habit.id);
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Then行動</p>
                            <p className="text-sm text-gray-600">{habit.thenAction}</p>
                          </div>
                          
                          {habit.frequency === 'weekly' && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">実行曜日</p>
                              <div className="flex space-x-1">
                                {Object.entries(habit.selectedDays).map(([day, selected]) => (
                                  <span
                                    key={day}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                      selected 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 text-gray-400'
                                    }`}
                                  >
                                    {dayLabels[day as keyof typeof dayLabels]}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {habit.additionalActions && (
                            <div>
                              <p className="text-sm font-medium text-gray-700">追加行動</p>
                              <div className="text-sm text-gray-600">
                                {habit.additionalActions.split('\n').map((action, index) => (
                                  <p key={index} className="ml-2">• {action}</p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            {habit.difficulty && <span>予測しんどさ: {habit.difficulty}/10</span>}
                            {habit.mood && <span>予測気分: {habit.mood}/10</span>}
                            {habit.impact && <span>人生への影響度: {habit.impact}/10</span>}
                            {habit.badImpact && <span>悪影響度: {habit.badImpact}/10</span>}
                            {habit.endDate && <span>終了日: {habit.endDate}</span>}
                          </div>
                          
                          {habit.otherNotes && (
                            <div>
                              <p className="text-sm font-medium text-gray-700">その他の工夫点</p>
                              <p className="text-sm text-gray-600 whitespace-pre-wrap">{habit.otherNotes}</p>
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

        {/* New/Edit Habit Form */}
        {showNewHabitForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingHabit ? '習慣を編集' : '新しい習慣を作成'}
              </h2>
              <button
                onClick={() => {
                  setShowNewHabitForm(false);
                  setEditingHabit(null);
                  resetForm();
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* STEP 0: Final Goal Input */}
              {!editingHabit && (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  STEP 0: 最終目標を入力してください
                  <TooltipButton tooltipKey="finalGoal" />
                </label>
                <input
                  type="text"
                  value={finalGoal}
                  onChange={(e) => setFinalGoal(e.target.value)}
                  placeholder="例: 英語を話せるようになる、健康的な体を作る、読書習慣をつける"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                {finalGoal && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>目標:</strong> {finalGoal}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      この目標に合わせて例文を自動調整します
                    </p>
                  </div>
                )}
              </div>
              )}

              {/* STEP 1: Primary Type Selection */}
              {(finalGoal || editingHabit) && (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  STEP 1: 習慣の大分類を選択
                  <TooltipButton tooltipKey="primaryType" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'regular', label: '定期習慣', desc: '決まった頻度で実行' },
                    { id: 'irregular', label: '不定期習慣', desc: '状況に応じて実行' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handlePrimaryTypeSelect(type.id as 'regular' | 'irregular')}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        primaryType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-semibold text-lg">{type.label}</div>
                      <div className="text-sm text-gray-500 mt-1">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              )}

              {/* STEP 2: Secondary Type Selection */}
              {(finalGoal || editingHabit) && primaryType && (
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    STEP 2: {primaryType === 'regular' ? '定期習慣' : '不定期習慣'}のタイプを選択
                    <TooltipButton tooltipKey="secondaryType" />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {(primaryType === 'regular' ? [
                      { id: 'if-then', label: 'イフゼン型', desc: '「もし〜なら〜する」' },
                      { id: 'timed', label: '時間指定型', desc: '決まった時間に実行' }
                    ] : [
                      { id: 'execution', label: '実行型', desc: '機会があれば実行' },
                      { id: 'avoidance', label: '回避型', desc: '悪い行動を避ける' }
                    ]).map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleSecondaryTypeSelect(type.id as any)}
                        className={`p-4 rounded-lg border text-left transition-colors ${
                          secondaryType === type.id
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-semibold">{type.label}</div>
                        <div className="text-sm text-gray-500 mt-1">{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Form fields only show after both selections */}
              {(finalGoal || editingHabit) && primaryType && secondaryType && (
                <>
              {/* If Condition */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  If（条件）
                  <TooltipButton 
                    tooltipKey="ifCondition" 
                    showExamples={true}
                    exampleData={{
                      finalGoal,
                      field: 'ifCondition'
                    }}
                  />
                </label>
                <input
                  type="text"
                  value={ifCondition}
                  onChange={(e) => setIfCondition(e.target.value)}
                  placeholder={getPlaceholderForGoal(finalGoal, 'if')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Then Action */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Then（行動）
                  <TooltipButton 
                    tooltipKey="thenAction" 
                    showExamples={true}
                    exampleData={{
                      finalGoal,
                      field: 'thenAction'
                    }}
                  />
                </label>
                <input
                  type="text"
                  value={thenAction}
                  onChange={(e) => setThenAction(e.target.value)}
                  placeholder={getPlaceholderForGoal(finalGoal, 'then')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Additional Actions */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  追加行動（任意）- {additionalActionsList.filter(action => action.trim()).length}個
                  <TooltipButton 
                    tooltipKey="additionalActions" 
                    showExamples={true}
                    exampleData={{
                      finalGoal,
                      field: 'additionalActions'
                    }}
                  />
                </label>
                <div className="space-y-2">
                  {additionalActionsList.map((action, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                      <input
                        type="text"
                        value={action}
                        onChange={(e) => {
                          const newActions = [...additionalActionsList];
                          newActions[index] = e.target.value;
                          setAdditionalActionsList(newActions);
                          
                          // 最後の入力欄に文字が入力されたら新しい入力欄を追加
                          if (index === additionalActionsList.length - 1 && e.target.value.trim()) {
                            setAdditionalActionsList([...newActions, '']);
                          }
                        }}
                        placeholder={index === 0 ? "例: 深呼吸を3回する" : "追加の行動があれば入力..."}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {additionalActionsList.length > 1 && action.trim() === '' && index === additionalActionsList.length - 1 && (
                        <button
                          onClick={() => {
                            if (additionalActionsList.length > 1) {
                              setAdditionalActionsList(additionalActionsList.slice(0, -1));
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <p className="mb-2">メイン行動と一緒にやると良い追加の行動を入力してください。入力すると次の欄が現れます。</p>
                  <p className="text-gray-400">例: 深呼吸を3回する、感想を一言メモする、好きな音楽を聞く など</p>
                </div>
              </div>

              {/* 記録タイプ選択 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  記録タイプ
                  <TooltipButton 
                    tooltipKey="recordType"
                    content={{
                      friendly: "習慣の記録方法を選択できます！🎯\n\n📝 通常記録：普通の習慣記録\n🏆 スコアチャレンジ：回数や点数を競う\n⏱️ タイムアタック：時間を測定する\n\nゲーム感覚で習慣を楽しめますよ✨",
                      academic: "記録タイプは習慣の性質に応じて選択します。通常記録は一般的な習慣に、スコアチャレンジは定量的な成果測定に、タイムアタックは時間効率の改善に適用されます。"
                    }}
                  />
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => setRecordType('normal')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      recordType === 'normal'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📝</span>
                      <div>
                        <div className="font-semibold">通常記録</div>
                        <div className="text-xs text-gray-500 mt-1">普通の習慣記録</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setRecordType('score')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      recordType === 'score'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <div className="font-semibold">スコアチャレンジ</div>
                        <div className="text-xs text-gray-500 mt-1">回数や点数を記録して競う</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setRecordType('time')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      recordType === 'time'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">⏱️</span>
                      <div>
                        <div className="font-semibold">タイムアタック</div>
                        <div className="text-xs text-gray-500 mt-1">時間を測定して記録更新を目指す</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* スコアチャレンジ設定 */}
              {recordType === 'score' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl">🏆</span>
                    <h4 className="font-medium text-blue-800">スコアチャレンジ設定</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-blue-700 block mb-2">
                        目標スコア
                      </label>
                      <input
                        type="number"
                        value={targetScore}
                        onChange={(e) => setTargetScore(parseInt(e.target.value) || 0)}
                        placeholder="100"
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-blue-700 block mb-2">
                        単位
                      </label>
                      <input
                        type="text"
                        value={scoreUnit}
                        onChange={(e) => setScoreUnit(e.target.value)}
                        placeholder="回"
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-blue-600">
                    例：腕立て伏せ50回、読書100ページ、英単語20個など
                  </div>
                </div>
              )}

              {/* タイムアタック設定 */}
              {recordType === 'time' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl">⏱️</span>
                    <h4 className="font-medium text-orange-800">タイムアタック設定</h4>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-orange-700 block mb-2">
                      目標時間（分）
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={targetTime}
                      onChange={(e) => setTargetTime(parseFloat(e.target.value) || 0)}
                      placeholder="30.0"
                      className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div className="mt-3 text-xs text-orange-600">
                    例：5km走を30分以内、掃除を15分以内、料理を45分以内など
                  </div>
                </div>
              )}

                    {/* 猶予時間設定 */}
                    {secondaryType === 'timed' && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <label className="text-sm font-medium text-gray-700">
                            猶予時間設定
                          </label>
                          <TooltipButton 
                            tooltipKey="timeTolerance"
                            content={{
                              friendly: "猶予時間を設定すると、指定時間の前後でも「時間通り」として評価できます！🕐\n\n例：朝7時に設定、猶予15分の場合\n• 6:45-7:15の間なら「時間通り」\n• 6:45より早いと「早めにできた」\n• 7:15より遅いと「遅れた」\n\nこれで完璧主義にならず、現実的な評価ができますよ✨",
                              academic: "時間許容度設定により、厳格な時間制約による心理的プレッシャーを軽減し、習慣継続率を向上させることができます。研究によると、±15分程度の許容範囲を設けることで、習慣の定着率が平均34%向上することが確認されています。"
                            }}
                          />
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-4 space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              猶予時間: {timeTolerance}分
                            </label>
                            <div className="flex items-center space-x-4">
                              <input
                                type="range"
                                min="0"
                                max="60"
                                step="5"
                                value={timeTolerance}
                                onChange={(e) => setTimeTolerance(parseInt(e.target.value))}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                              />
                              <input
                                type="number"
                                min="0"
                                max="60"
                                value={timeTolerance}
                                onChange={(e) => setTimeTolerance(Math.max(0, Math.min(60, parseInt(e.target.value) || 0)))}
                                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-500">分</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>なし</span>
                              <span>1時間</span>
                            </div>
                          </div>
                          
                          {/* 評価軸プレビュー */}
                          <div className="bg-white rounded-lg p-3 border border-blue-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">評価軸プレビュー</h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="font-medium text-green-700">早めにできた</span>
                                <span className="text-gray-500">
                                  {timeTolerance > 0 ? `${timeTolerance}分以上早く実行` : '指定時間より早く実行'}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="font-medium text-blue-700">時間通り</span>
                                <span className="text-gray-500">
                                  {timeTolerance > 0 ? `±${timeTolerance}分以内に実行` : '指定時間ちょうどに実行'}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span className="font-medium text-orange-700">遅れた</span>
                                <span className="text-gray-500">
                                  {timeTolerance > 0 ? `${timeTolerance}分以上遅れて実行` : '指定時間より遅く実行'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

              {/* Frequency */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  実行頻度
                  <TooltipButton tooltipKey="frequency" />
                </label>
                <div className="flex space-x-3">
                  {[
                    { id: 'daily', label: '毎日' },
                    { id: 'weekly', label: '週指定' },
                    { id: 'interval', label: '間隔指定' }
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setFrequency(freq.id as any)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        frequency === freq.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly Days Selection */}
              {frequency === 'weekly' && (
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    実行する曜日
                    <TooltipButton tooltipKey="weeklyDays" />
                  </label>
                  <div className="flex space-x-2">
                    {Object.entries(dayLabels).map(([day, label]) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDays(prev => ({
                          ...prev,
                          [day]: !prev[day as keyof typeof prev]
                        }))}
                        className={`w-10 h-10 rounded-full border transition-colors ${
                          selectedDays[day as keyof typeof selectedDays]
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interval Days */}
              {frequency === 'interval' && (
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    間隔: {intervalDays}日ごと
                    <TooltipButton tooltipKey="intervalDays" />
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={intervalDays}
                    onChange={(e) => setIntervalDays(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1日</span>
                    <span>30日</span>
                  </div>
                </div>
              )}

              {/* Difficulty and Impact */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    予測しんどさ: {difficulty}/10
                    <TooltipButton tooltipKey="difficulty" />
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={difficulty}
                    onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>楽</span>
                    <span>しんどい</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    人生への影響度: {impact}/10
                    <TooltipButton tooltipKey="impact" />
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={impact}
                    onChange={(e) => setImpact(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>小</span>
                    <span>大</span>
                  </div>
                </div>
              </div>

              {/* Irregular Countermeasures */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  イレギュラー対策 - {irregularCountermeasures.filter(item => item.condition.trim() && item.action.trim()).length}個
                  <TooltipButton tooltipKey="irregularCountermeasures" />
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  予期せぬ出来事があっても、習慣を続けられるよう、対策を考えましょう。
                </p>
                <div className="space-y-3">
                  {irregularCountermeasures.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">
                            もし：
                          </label>
                          <input
                            type="text"
                            value={item.condition}
                            onChange={(e) => {
                              const newCountermeasures = [...irregularCountermeasures];
                              newCountermeasures[index].condition = e.target.value;
                              setIrregularCountermeasures(newCountermeasures);
                              
                              // 最後の項目に入力があったら新しい項目を追加
                              if (index === irregularCountermeasures.length - 1 && e.target.value.trim()) {
                                setIrregularCountermeasures([...newCountermeasures, { condition: '', action: '' }]);
                              }
                            }}
                            placeholder={index === 0 ? "例: 急な残業が入ったら" : "予期せぬ状況を入力..."}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">
                            なら：
                          </label>
                          <input
                            type="text"
                            value={item.action}
                            onChange={(e) => {
                              const newCountermeasures = [...irregularCountermeasures];
                              newCountermeasures[index].action = e.target.value;
                              setIrregularCountermeasures(newCountermeasures);
                            }}
                            placeholder={index === 0 ? "例: 帰宅後、ストレッチを5分だけする" : "代替行動を入力..."}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                      {irregularCountermeasures.length > 1 && item.condition.trim() === '' && item.action.trim() === '' && index === irregularCountermeasures.length - 1 && (
                        <button
                          onClick={() => {
                            if (irregularCountermeasures.length > 1) {
                              setIrregularCountermeasures(irregularCountermeasures.slice(0, -1));
                            }
                          }}
                          className="mt-2 p-1 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  これは、あなたの不安を減らし、習慣が途切れるのを防ぐパワフルな方法です。
                </div>
              </div>
              {/* End Date */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  終了日（任意）
                  <TooltipButton tooltipKey="endDate" />
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Other Notes */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  その他の工夫点（任意）
                </label>
                <textarea
                  value={otherNotes}
                  onChange={(e) => setOtherNotes(e.target.value)}
                  placeholder={getOtherNotesPlaceholder()}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  習慣を続けるための工夫やコツ、環境設定などを自由に記入してください
                </p>
              </div>

              {/* Save Button */}
              <div className="flex space-x-3">
                <button
                  onClick={saveHabit}
                  disabled={!ifCondition || !thenAction || !primaryType || !secondaryType || (!finalGoal && !editingHabit) || 
                           (selectedType === 'timed' && !startTime)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingHabit ? '更新' : '保存'}</span>
                </button>
                <button
                  onClick={() => {
                    setShowNewHabitForm(false);
                    setEditingHabit(null);
                    resetForm();
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
              </div>
                </>
              )}
            </div>
          </div>
        )}
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
              isActive={item.path === '/habits'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitsScreen;