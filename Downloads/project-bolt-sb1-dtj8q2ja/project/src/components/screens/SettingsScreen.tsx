import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Smartphone, 
  Clock, 
  Focus, 
  Shield, 
  Ban,
  CheckCircle,
  Plus,
  Trash2,
  Play,
  Pause,
  Settings as SettingsIcon,
  Timer,
  Coffee,
  X,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  User,
  Key,
  Mail,
  Palette
} from 'lucide-react';
import BottomNavButton from '../BottomNavButton';
import { BarChart3, MessageCircle, PenTool, Target, Settings } from 'lucide-react';

interface BlockMode {
  id: string;
  name: string;
  type: 'routine' | 'focus';
  method: 'whitelist' | 'blacklist';
  apps: string[];
  settings: {
    // ルーティンブロック用
    timeSlots?: { start: string; end: string }[];
    usageLimit?: number; // 分単位
    restrictionType?: 'timeSlot' | 'usageTime';
    
    // 集中モード用
    focusDuration?: number; // 分単位
    breakDuration?: number; // 分単位
    cycles?: number;
  };
  isActive: boolean;
  createdAt: string;
}

interface NotificationSettings {
  habitReminders: boolean;
  achievementCelebrations: boolean;
  weeklyReports: boolean;
  motivationalMessages: boolean;
  streakAlerts: boolean;
  recoveryReminders: boolean;
  soundEnabled: boolean;
}

interface DisplaySettings {
  showBlockModes: boolean;
  showNotifications: boolean;
  showAccount: boolean;
  showSubscription: boolean;
  showAdvanced: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  monthlyEquivalent?: string;
  description: string;
  emoji: string;
  isRecommended?: boolean;
}

interface SubscriptionStatus {
  isActive: boolean;
  currentPlan?: SubscriptionPlan;
  nextRenewalDate?: string;
  purchaseDate?: string;
}

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [blockModes, setBlockModes] = useState<BlockMode[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMode, setEditingMode] = useState<BlockMode | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    habitReminders: true,
    achievementCelebrations: true,
    weeklyReports: true,
    motivationalMessages: false,
    streakAlerts: true,
    recoveryReminders: true,
    soundEnabled: true
  });
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    showBlockModes: true,
    showNotifications: true,
    showAccount: true,
    showSubscription: true,
    showAdvanced: false
  });
  const [showNotificationDemo, setShowNotificationDemo] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    isActive: false
  });
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isProcessingSubscription, setIsProcessingSubscription] = useState(false);
  
  // フォーム状態
  const [modeName, setModeName] = useState('');
  const [modeType, setModeType] = useState<'routine' | 'focus'>('routine');
  const [method, setMethod] = useState<'whitelist' | 'blacklist'>('blacklist');
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [restrictionType, setRestrictionType] = useState<'timeSlot' | 'usageTime'>('timeSlot');
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([{ start: '22:00', end: '06:00' }]);
  const [usageLimit, setUsageLimit] = useState(120);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [cycles, setCycles] = useState(4);

  // サブスクリプションプラン定義
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'weekly',
      name: 'Weekly プラン',
      price: '¥680',
      period: '週',
      monthlyEquivalent: '月あたり約 ¥2,924',
      description: '気軽に試したい方向け',
      emoji: '🔰'
    },
    {
      id: 'monthly',
      name: 'Monthly プラン',
      price: '¥1,980',
      period: '月',
      description: 'スタンダードな選択',
      emoji: '📅',
      isRecommended: true
    },
    {
      id: 'yearly',
      name: 'Yearly プラン',
      price: '¥15,800',
      period: '年',
      monthlyEquivalent: '月あたり約 ¥1,316',
      description: '最もお得｜本気で続けたい方へ',
      emoji: '🌟'
    }
  ];

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

  // よく使われるアプリのリスト
  const commonApps = [
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'facebook', name: 'Facebook', icon: '👥' },
    { id: 'line', name: 'LINE', icon: '💬' },
    { id: 'chrome', name: 'Chrome', icon: '🌐' },
    { id: 'safari', name: 'Safari', icon: '🧭' },
    { id: 'netflix', name: 'Netflix', icon: '🎬' },
    { id: 'spotify', name: 'Spotify', icon: '🎧' },
    { id: 'games', name: 'ゲーム全般', icon: '🎮' },
    { id: 'shopping', name: 'ショッピングアプリ', icon: '🛒' }
  ];

  // データ読み込み
  useEffect(() => {
    const stored = localStorage.getItem('habitTracker_blockModes');
    if (stored) {
      setBlockModes(JSON.parse(stored));
    }
    
    const storedNotifications = localStorage.getItem('habitTracker_notifications');
    if (storedNotifications) {
      setNotificationSettings(JSON.parse(storedNotifications));
    }
    
    const storedDisplay = localStorage.getItem('habitTracker_displaySettings');
    if (storedDisplay) {
      setDisplaySettings(JSON.parse(storedDisplay));
    }
    
    const storedSubscription = localStorage.getItem('habitTracker_subscription');
    if (storedSubscription) {
      setSubscriptionStatus(JSON.parse(storedSubscription));
    }
  }, []);

  // フォームリセット
  const resetForm = () => {
    setModeName('');
    setModeType('routine');
    setMethod('blacklist');
    setSelectedApps([]);
    setRestrictionType('timeSlot');
    setTimeSlots([{ start: '22:00', end: '06:00' }]);
    setUsageLimit(120);
    setFocusDuration(25);
    setBreakDuration(5);
    setCycles(4);
  };

  // モード保存
  const saveMode = () => {
    const newMode: BlockMode = {
      id: editingMode?.id || Date.now().toString(),
      name: modeName,
      type: modeType,
      method,
      apps: selectedApps,
      settings: modeType === 'routine' ? {
        restrictionType,
        timeSlots: restrictionType === 'timeSlot' ? timeSlots : undefined,
        usageLimit: restrictionType === 'usageTime' ? usageLimit : undefined
      } : {
        focusDuration,
        breakDuration,
        cycles
      },
      isActive: editingMode?.isActive || false,
      createdAt: editingMode?.createdAt || new Date().toISOString()
    };

    let updatedModes;
    if (editingMode) {
      updatedModes = blockModes.map(mode => mode.id === editingMode.id ? newMode : mode);
    } else {
      updatedModes = [...blockModes, newMode];
    }

    setBlockModes(updatedModes);
    localStorage.setItem('habitTracker_blockModes', JSON.stringify(updatedModes));
    
    setShowCreateModal(false);
    setEditingMode(null);
    resetForm();
  };

  // モード削除
  const deleteMode = (modeId: string) => {
    const updatedModes = blockModes.filter(mode => mode.id !== modeId);
    setBlockModes(updatedModes);
    localStorage.setItem('habitTracker_blockModes', JSON.stringify(updatedModes));
  };

  // モード切り替え
  const toggleMode = (modeId: string) => {
    const updatedModes = blockModes.map(mode => 
      mode.id === modeId ? { ...mode, isActive: !mode.isActive } : mode
    );
    setBlockModes(updatedModes);
    localStorage.setItem('habitTracker_blockModes', JSON.stringify(updatedModes));
  };

  // 通知設定の更新
  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...notificationSettings, [key]: value };
    setNotificationSettings(newSettings);
    localStorage.setItem('habitTracker_notifications', JSON.stringify(newSettings));
  };

  // 表示設定の更新
  const updateDisplaySetting = (key: keyof DisplaySettings, value: boolean) => {
    const newSettings = { ...displaySettings, [key]: value };
    setDisplaySettings(newSettings);
    localStorage.setItem('habitTracker_displaySettings', JSON.stringify(newSettings));
  };

  // サブスクリプション処理
  const handleSubscriptionPurchase = async (plan: SubscriptionPlan) => {
    setIsProcessingSubscription(true);
    setSelectedPlan(plan);
    
    try {
      // Google Play Billing処理のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 購読成功時の処理
      const newSubscriptionStatus: SubscriptionStatus = {
        isActive: true,
        currentPlan: plan,
        purchaseDate: new Date().toISOString(),
        nextRenewalDate: getNextRenewalDate(plan.id)
      };
      
      setSubscriptionStatus(newSubscriptionStatus);
      localStorage.setItem('habitTracker_subscription', JSON.stringify(newSubscriptionStatus));
      
      setShowSubscriptionModal(false);
      alert(`${plan.name}の購読が開始されました！プレミアム機能をお楽しみください。`);
      
    } catch (error) {
      alert('購読処理中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsProcessingSubscription(false);
      setSelectedPlan(null);
    }
  };
  
  const getNextRenewalDate = (planId: string): string => {
    const now = new Date();
    switch (planId) {
      case 'weekly':
        now.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() + 1);
        break;
      case 'yearly':
        now.setFullYear(now.getFullYear() + 1);
        break;
    }
    return now.toISOString();
  };
  
  const openGooglePlaySubscriptionManagement = () => {
    // Google Play Storeの購読管理画面へのリダイレクト
    window.open('https://play.google.com/store/account/subscriptions', '_blank');
  };

  // 通知デモ表示
  const showNotificationDemoMessage = () => {
    setShowNotificationDemo(true);
    setTimeout(() => setShowNotificationDemo(false), 3000);
  };

  // 編集開始
  const startEdit = (mode: BlockMode) => {
    setEditingMode(mode);
    setModeName(mode.name);
    setModeType(mode.type);
    setMethod(mode.method);
    setSelectedApps(mode.apps);
    
    if (mode.type === 'routine') {
      setRestrictionType(mode.settings.restrictionType || 'timeSlot');
      setTimeSlots(mode.settings.timeSlots || [{ start: '22:00', end: '06:00' }]);
      setUsageLimit(mode.settings.usageLimit || 120);
    } else {
      setFocusDuration(mode.settings.focusDuration || 25);
      setBreakDuration(mode.settings.breakDuration || 5);
      setCycles(mode.settings.cycles || 4);
    }
    
    setShowCreateModal(true);
  };

  // アプリ選択切り替え
  const toggleApp = (appId: string) => {
    setSelectedApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  // 時間スロット追加
  const addTimeSlot = () => {
    setTimeSlots(prev => [...prev, { start: '09:00', end: '17:00' }]);
  };

  // 時間スロット削除
  const removeTimeSlot = (index: number) => {
    setTimeSlots(prev => prev.filter((_, i) => i !== index));
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
              <h1 className="text-xl font-bold text-gray-900">設定</h1>
              <p className="text-sm text-gray-600">スマホブロック機能</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
              setEditingMode(null);
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
        {/* Notification Settings */}
        {displaySettings.showNotifications && (
          <div className={`space-y-4 mb-6 transition-opacity duration-200 ${displaySettings.showNotifications ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">通知設定</h2>
              <button
                onClick={() => updateDisplaySetting('showNotifications', !displaySettings.showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
              >
                {displaySettings.showNotifications ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {/* 通知音設定 */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {notificationSettings.soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-blue-600" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">通知音</h3>
                      <p className="text-sm text-gray-500">アプリからの通知音をオン・オフできます</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateNotificationSetting('soundEnabled', !notificationSettings.soundEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.soundEnabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 各種通知設定 */}
              <div className="divide-y divide-gray-100">
                {[
                  { key: 'habitReminders', label: '習慣リマインダー', desc: '設定した時間に習慣実行を通知' },
                  { key: 'achievementCelebrations', label: '達成お祝い', desc: '習慣達成時のお祝いメッセージ' },
                  { key: 'weeklyReports', label: '週次レポート', desc: '週の振り返りと進捗レポート' },
                  { key: 'motivationalMessages', label: 'モチベーションメッセージ', desc: 'AIからの励ましメッセージ' },
                  { key: 'streakAlerts', label: '連続記録アラート', desc: '連続記録の節目をお知らせ' },
                  { key: 'recoveryReminders', label: '立て直しリマインダー', desc: '2日ルール適用時の復帰サポート' }
                ].map((item) => (
                  <div key={item.key} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {notificationSettings[item.key as keyof NotificationSettings] ? (
                          <Bell className="w-5 h-5 text-blue-600" />
                        ) : (
                          <BellOff className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                          <p className="text-xs text-gray-400 mt-1">長押しで通知オフができます</p>
                        </div>
                      </div>
                      <button
                        onClick={() => updateNotificationSetting(item.key as keyof NotificationSettings, !notificationSettings[item.key as keyof NotificationSettings])}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notificationSettings[item.key as keyof NotificationSettings] ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notificationSettings[item.key as keyof NotificationSettings] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 通知テスト */}
              <div className="p-4 bg-gray-50">
                <button
                  onClick={showNotificationDemoMessage}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  通知をテストする
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Block Modes List */}
        {displaySettings.showBlockModes && (
          <div className={`space-y-4 mb-6 transition-opacity duration-200 ${displaySettings.showBlockModes ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">ブロックモード</h2>
              <button
                onClick={() => updateDisplaySetting('showBlockModes', !displaySettings.showBlockModes)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
              >
                {displaySettings.showBlockModes ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          
            {blockModes.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">ブロックモードがありません</h3>
                <p className="text-gray-500 mb-4">スマホの使用を制限するモードを作成しましょう</p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowCreateModal(true);
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  最初のモードを作成
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {blockModes.map((mode) => (
                  <div key={mode.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {mode.type === 'routine' ? (
                              <Clock className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Focus className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <h3 className="font-medium text-gray-900">{mode.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            mode.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {mode.isActive ? 'アクティブ' : '停止中'}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <p className="mb-1">
                            {mode.type === 'routine' ? 'ルーティンブロック' : '集中モード'} • 
                            {mode.method === 'whitelist' ? ' 許可アプリ選択' : ' 禁止アプリ選択'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {mode.apps.length}個のアプリを
                            {mode.method === 'whitelist' ? '許可' : '禁止'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleMode(mode.id)}
                          className={`p-2 rounded-full transition-colors ${
                            mode.isActive
                              ? 'text-green-600 hover:bg-green-50'
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {mode.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => startEdit(mode)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('このモードを削除しますか？')) {
                              deleteMode(mode.id);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subscription Management */}
        {displaySettings.showSubscription && (
          <div className={`space-y-4 mb-6 transition-opacity duration-200 ${displaySettings.showSubscription ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">サブスクリプション</h2>
              <button
                onClick={() => updateDisplaySetting('showSubscription', !displaySettings.showSubscription)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
              >
                {displaySettings.showSubscription ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {subscriptionStatus.isActive ? (
                // 既存購読者向け表示
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👑</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">プレミアム会員</h3>
                      <p className="text-sm text-green-600">すべての機能をご利用いただけます</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">現在のプラン</p>
                        <p className="font-semibold text-gray-900">
                          {subscriptionStatus.currentPlan?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">次回更新日</p>
                        <p className="font-semibold text-gray-900">
                          {subscriptionStatus.nextRenewalDate && 
                            new Date(subscriptionStatus.nextRenewalDate).toLocaleDateString('ja-JP')
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={openGooglePlaySubscriptionManagement}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    購読を管理する
                  </button>
                </div>
              ) : (
                // 未購読者向け表示
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">⭐</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">プレミアム機能を解放</h3>
                    <p className="text-gray-600 text-sm">
                      すべての機能を使って、習慣化をもっと効果的に
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">無制限の習慣登録</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">高度な分析機能</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">カスタム通知設定</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">データのクラウド同期</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                  >
                    プランを選択する
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Account Management */}
        {displaySettings.showAccount && (
          <div className={`space-y-4 mb-6 transition-opacity duration-200 ${displaySettings.showAccount ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">アカウント管理</h2>
              <button
                onClick={() => updateDisplaySetting('showAccount', !displaySettings.showAccount)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
              >
                {displaySettings.showAccount ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">プロフィール情報</h3>
                    <p className="text-sm text-gray-500">アカウント情報の確認・編集</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <span className="text-sm">編集</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">メールアドレス</h3>
                    <p className="text-sm text-gray-500">user@example.com</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <span className="text-sm">変更</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-orange-600" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">パスワード</h3>
                    <p className="text-sm text-gray-500">パスワードの変更</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <span className="text-sm">変更</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Display Settings */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">設定項目表示切替</h2>
            <Palette className="w-5 h-5 text-purple-600" />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {[
              { key: 'showNotifications', label: '通知設定', desc: '通知のオン・オフ設定' },
              { key: 'showBlockModes', label: 'ブロックモード', desc: 'スマホ使用制限機能' },
              { key: 'showSubscription', label: 'サブスクリプション', desc: 'プレミアム機能の購読管理' },
              { key: 'showAccount', label: 'アカウント管理', desc: 'プロフィール・パスワード設定' },
              { key: 'showAdvanced', label: '高度な設定', desc: '開発者向け設定項目' }
            ].map((item) => (
              <div key={item.key} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {displaySettings[item.key as keyof DisplaySettings] ? (
                      <Eye className="w-5 h-5 text-blue-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <h3 className={`font-medium ${displaySettings[item.key as keyof DisplaySettings] ? 'text-gray-900' : 'text-gray-400'}`}>
                        {item.label}
                      </h3>
                      <p className={`text-sm ${displaySettings[item.key as keyof DisplaySettings] ? 'text-gray-500' : 'text-gray-400'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateDisplaySetting(item.key as keyof DisplaySettings, !displaySettings[item.key as keyof DisplaySettings])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      displaySettings[item.key as keyof DisplaySettings] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        displaySettings[item.key as keyof DisplaySettings] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingMode ? 'モードを編集' : '新しいモードを作成'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingMode(null);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* モード名 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  モード名
                </label>
                <input
                  type="text"
                  value={modeName}
                  onChange={(e) => setModeName(e.target.value)}
                  placeholder="例: 夜間ブロック、勉強集中モード"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 制限モード選択 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  制限モード
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setModeType('routine')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      modeType === 'routine'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">ルーティンブロック</div>
                        <div className="text-xs text-gray-500 mt-1">特定の時間帯や使用時間で制限</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setModeType('focus')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      modeType === 'focus'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Focus className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">集中モード</div>
                        <div className="text-xs text-gray-500 mt-1">集中したい時間に特定のアプリのみ許可</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 制限方法選択 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  制限方法
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setMethod('whitelist')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      method === 'whitelist'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">許可アプリ選択（ホワイトリスト）</div>
                        <div className="text-xs text-gray-500 mt-1">選んだアプリだけ使える</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setMethod('blacklist')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      method === 'blacklist'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Ban className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">禁止アプリ選択（ブラックリスト）</div>
                        <div className="text-xs text-gray-500 mt-1">選んだアプリを使えなくする</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* アプリ選択 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  {method === 'whitelist' ? '許可するアプリ' : '禁止するアプリ'}
                  <span className="text-xs text-gray-500 ml-2">
                    ({selectedApps.length}個選択中)
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {commonApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => toggleApp(app.id)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        selectedApps.includes(app.id)
                          ? method === 'whitelist'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{app.icon}</span>
                        <span className="text-sm font-medium">{app.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ルーティンブロック設定 */}
              {modeType === 'routine' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    制限方法
                  </label>
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <button
                      onClick={() => setRestrictionType('timeSlot')}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        restrictionType === 'timeSlot'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">時間帯で制限</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setRestrictionType('usageTime')}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        restrictionType === 'usageTime'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Timer className="w-4 h-4" />
                        <span className="font-medium">使用時間で制限</span>
                      </div>
                    </button>
                  </div>

                  {restrictionType === 'timeSlot' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        制限時間帯
                      </label>
                      <div className="space-y-2">
                        {timeSlots.map((slot, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={slot.start}
                              onChange={(e) => {
                                const newSlots = [...timeSlots];
                                newSlots[index].start = e.target.value;
                                setTimeSlots(newSlots);
                              }}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-gray-500">〜</span>
                            <input
                              type="time"
                              value={slot.end}
                              onChange={(e) => {
                                const newSlots = [...timeSlots];
                                newSlots[index].end = e.target.value;
                                setTimeSlots(newSlots);
                              }}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {timeSlots.length > 1 && (
                              <button
                                onClick={() => removeTimeSlot(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={addTimeSlot}
                          className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
                        >
                          + 時間帯を追加
                        </button>
                      </div>
                    </div>
                  )}

                  {restrictionType === 'usageTime' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        1日の使用制限時間: {usageLimit}分
                      </label>
                      <input
                        type="range"
                        min="30"
                        max="480"
                        step="30"
                        value={usageLimit}
                        onChange={(e) => setUsageLimit(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>30分</span>
                        <span>8時間</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 集中モード設定 */}
              {modeType === 'focus' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      集中時間: {focusDuration}分
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={focusDuration}
                      onChange={(e) => setFocusDuration(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5分</span>
                      <span>2時間</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      休憩時間: {breakDuration}分
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={breakDuration}
                      onChange={(e) => setBreakDuration(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1分</span>
                      <span>30分</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      セット数: {cycles}回
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={cycles}
                      onChange={(e) => setCycles(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1回</span>
                      <span>10回</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-blue-800">
                      <Coffee className="w-4 h-4" />
                      <span className="text-sm font-medium">プレビュー</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      {focusDuration}分集中 → {breakDuration}分休憩 を {cycles}回繰り返し
                      （合計: {focusDuration * cycles + breakDuration * (cycles - 1)}分）
                    </p>
                  </div>
                </div>
              )}

              {/* 保存ボタン */}
              <div className="flex space-x-3">
                <button
                  onClick={saveMode}
                  disabled={!modeName || selectedApps.length === 0}
                  className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {editingMode ? '更新' : '作成'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingMode(null);
                    resetForm();
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">プランを選択</h2>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {subscriptionPlans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handleSubscriptionPurchase(plan)}
                  disabled={isProcessingSubscription}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
                    plan.isRecommended
                      ? 'border-purple-500 bg-purple-50 hover:bg-purple-100'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${isProcessingSubscription ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{plan.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                        {plan.isRecommended && (
                          <span className="inline-block bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                            おすすめ
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {plan.price}
                      </div>
                      <div className="text-sm text-gray-600">/{plan.period}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                  
                  {plan.monthlyEquivalent && (
                    <p className="text-xs text-gray-500">{plan.monthlyEquivalent}</p>
                  )}
                  
                  {isProcessingSubscription && selectedPlan?.id === plan.id && (
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span className="text-sm text-gray-600">処理中...</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                • Google Playの返金ポリシーが適用されます<br />
                • 購読はいつでもキャンセル可能です<br />
                • 価格は税込み表示です<br />
                • 自動更新されます（設定で変更可能）
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notification Demo */}
      {showNotificationDemo && (
        <div className="fixed top-4 left-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5" />
              <div>
                <p className="font-medium">習慣リマインダー</p>
                <p className="text-sm text-blue-100">朝の読書の時間です！</p>
              </div>
            </div>
            <div className="text-xs text-blue-200">
              長押しで通知オフ
            </div>
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
              isActive={item.path === '/settings'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;