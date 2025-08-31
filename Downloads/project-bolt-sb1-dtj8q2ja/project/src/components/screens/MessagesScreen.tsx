import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, AlertTriangle, Gift, Clock, Bot, User, X } from 'lucide-react';
import BottomNavButton from '../BottomNavButton';
import { BarChart3, MessageCircle, PenTool, Target, Settings } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  isEmergency?: boolean;
}

interface SavedHabit {
  id: string;
  type: 'regular' | 'if-then' | 'timed' | 'irregular';
  name: string;
  ifCondition: string;
  thenAction: string;
  difficulty: number;
  impact: number;
  createdAt: string;
}

interface HabitRecord {
  habitId: string;
  date: string;
  result: 'victory' | 'alternative' | 'defeat' | null;
  actualDifficulty: number;
  timestamp: string;
}

const MessagesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [savedHabits, setSavedHabits] = useState<SavedHabit[]>([]);
  const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
  const [nextReplyTime, setNextReplyTime] = useState<Date | null>(null);
  const [timeUntilReply, setTimeUntilReply] = useState<string>('');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

        // 習慣記録を読み込み
        const storedRecords = localStorage.getItem('habitTracker_records');
        if (storedRecords) {
          setHabitRecords(JSON.parse(storedRecords));
        }

        // メッセージ履歴を読み込み
        const storedMessages = localStorage.getItem('habitTracker_messages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          // 初回訪問時のウェルカムメッセージ
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'こんにちは！習慣トラッカーのAIアシスタントです🤖\n\n習慣の継続について何でも相談してください。科学的根拠に基づいたアドバイスをお届けします！',
            timestamp: new Date().toISOString()
          };
          setMessages([welcomeMessage]);
          localStorage.setItem('habitTracker_messages', JSON.stringify([welcomeMessage]));
        }

        // 次回返信時間を読み込み
        const storedReplyTime = localStorage.getItem('habitTracker_nextReply');
        if (storedReplyTime) {
          setNextReplyTime(new Date(storedReplyTime));
        }
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    };
    loadData();
  }, []);

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 返信時間のカウントダウン
  useEffect(() => {
    if (!nextReplyTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextReplyTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeUntilReply('');
        setNextReplyTime(null);
        localStorage.removeItem('habitTracker_nextReply');
        
        // AIからの自動返信
        generateAIReply();
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntilReply(`${hours}時間${minutes}分後に返信予定`);
      }
    }, 60000); // 1分ごとに更新

    return () => clearInterval(interval);
  }, [nextReplyTime]);

  // AIメッセージ生成
  const generateAIReply = () => {
    const encouragementMessages = [
      '素晴らしい継続力ですね！小さな積み重ねが大きな変化を生み出します。',
      '習慣の定着には平均66日かかると研究で示されています。あなたは順調に進んでいます！',
      '完璧を目指さず、継続を目指しましょう。80%の実行でも十分な効果があります。',
      '脳科学的に、習慣は繰り返すことで神経回路が強化されます。今日も一歩前進です！',
      '「もし〜なら〜する」という条件付き計画は、実行率を2-3倍高めることが証明されています。'
    ];

    const adviceMessages = [
      '習慣が続かない時は、行動を小さく分解してみてください。「本を読む」→「本を開く」のように。',
      '環境デザインが重要です。良い習慣をしやすく、悪い習慣をしにくい環境を作りましょう。',
      '習慣スタッキング：既存の習慣の後に新しい習慣を組み合わせると定着しやすくなります。',
      '報酬システムを活用しましょう。小さな達成でも自分を褒めることが継続の鍵です。',
      '失敗は学習の機会です。なぜうまくいかなかったかを分析し、次に活かしましょう。'
    ];

    // 習慣データに基づくパーソナライズメッセージ
    const personalizedMessages = [];
    
    if (savedHabits.length > 0) {
      const avgDifficulty = savedHabits.reduce((sum, habit) => sum + habit.difficulty, 0) / savedHabits.length;
      if (avgDifficulty > 7) {
        personalizedMessages.push('設定された習慣の難易度が高めですね。まずは簡単なバージョンから始めることをお勧めします。');
      }
      
      const recentRecords = habitRecords.filter(record => {
        const recordDate = new Date(record.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return recordDate >= weekAgo;
      });
      
      if (recentRecords.length > 0) {
        const successRate = recentRecords.filter(r => r.result === 'victory' || r.result === 'alternative').length / recentRecords.length;
        if (successRate > 0.8) {
          personalizedMessages.push('この1週間の達成率が素晴らしいです！この調子で継続していきましょう。');
        } else if (successRate < 0.5) {
          personalizedMessages.push('最近少し苦戦されているようですね。習慣の難易度を下げるか、実行タイミングを見直してみませんか？');
        }
      }
    }

    // メッセージをランダムに選択
    const allMessages = [...encouragementMessages, ...adviceMessages, ...personalizedMessages];
    const randomMessage = allMessages[Math.floor(Math.random() * allMessages.length)];

    const aiReply: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: randomMessage,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, aiReply];
    setMessages(updatedMessages);
    localStorage.setItem('habitTracker_messages', JSON.stringify(updatedMessages));
  };

  // メッセージ送信
  const sendMessage = (isEmergency = false) => {
    if (!inputMessage.trim() && !isEmergency) return;

    const messageContent = isEmergency 
      ? '🚨 緊急メッセージ：今すぐサポートが必要です' 
      : inputMessage.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date().toISOString(),
      isEmergency
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem('habitTracker_messages', JSON.stringify(updatedMessages));

    // 24時間後の返信時間を設定（緊急メッセージの場合は即座に返信）
    if (isEmergency) {
      setTimeout(() => {
        const emergencyReply: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: '緊急メッセージを受信しました。大丈夫ですか？\n\n習慣が続かない時は自分を責めないでください。明日は新しい日です。小さな一歩から始めましょう。\n\n必要であれば専門家への相談もお勧めします。',
          timestamp: new Date().toISOString()
        };
        const emergencyUpdatedMessages = [...updatedMessages, emergencyReply];
        setMessages(emergencyUpdatedMessages);
        localStorage.setItem('habitTracker_messages', JSON.stringify(emergencyUpdatedMessages));
      }, 2000);
    } else {
      const replyTime = new Date();
      replyTime.setHours(replyTime.getHours() + 24);
      setNextReplyTime(replyTime);
      localStorage.setItem('habitTracker_nextReply', replyTime.toISOString());
    }

    setInputMessage('');
  };

  // ギフト送信
  const openDonationModal = () => {
    setShowDonationModal(true);
  };
  
  // 推奨金額の設定
  const suggestedAmounts = [100, 500, 1000, 3000, 5000];
  
  // 金額選択
  const selectAmount = (amount: number) => {
    setDonationAmount(amount.toString());
  };
  
  // 決済処理
  const processDonation = async () => {
    const amount = parseInt(donationAmount);
    
    if (amount < 100) {
      alert('最低寄付金額は100円です。');
      return;
    }
    
    if (!selectedPaymentMethod) {
      alert('支払い方法を選択してください。');
      return;
    }
    
    setIsProcessingPayment(true);
    
    try {
      // 実際の決済処理（デモ用に2秒待機）
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 成功時の処理
      setShowDonationModal(false);
      setShowSuccessAnimation(true);
      
      // AIからの感謝メッセージ
      const thankYouMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `¥${amount.toLocaleString()}のご寄付をありがとうございます！🎉\n\nあなたの温かいご支援により、このアプリをより良いものにしていくことができます。心から感謝いたします。\n\n今後ともよろしくお願いいたします！`,
        timestamp: new Date().toISOString()
      };
      
      const updatedMessages = [...messages, thankYouMessage];
      setMessages(updatedMessages);
      localStorage.setItem('habitTracker_messages', JSON.stringify(updatedMessages));
      
      // 成功アニメーションを3秒後に非表示
      setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 3000);
      
      // フォームリセット
      setDonationAmount('');
      setSelectedPaymentMethod(null);
      
    } catch (error) {
      alert('決済処理中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">AIアシスタント</h1>
                <p className="text-sm text-green-500 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  オンライン
                </p>
              </div>
            </div>
          </div>
          
          {/* 返信時間表示 */}
          {timeUntilReply && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{timeUntilReply}</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`relative px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? message.isEmergency
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' 
                    ? 'text-blue-100' 
                    : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
                
                {/* Message tail */}
                <div className={`absolute bottom-0 w-3 h-3 ${
                  message.type === 'user' 
                    ? '-right-1 bg-blue-500' 
                    : '-left-1 bg-white border-l border-b border-gray-200'
                } transform rotate-45`} />
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Gift Button */}
      <button
        onClick={openDonationModal}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        title="開発者への寄付"
      >
        <Gift className="w-6 h-6 text-white" />
      </button>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="メッセージを入力..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>
          
          <button
            onClick={() => sendMessage(true)}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="緊急メッセージ"
          >
            <AlertTriangle className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim()}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">開発者への寄付</h2>
              <button
                onClick={() => setShowDonationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 寄付の説明 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  このアプリの継続的な開発・運営をサポートしていただけませんか？
                  皆様からの温かいご支援が、より良いアプリ作りの原動力となります。
                </p>
              </div>

              {/* 金額選択 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  寄付金額を選択してください（最低100円から）
                </label>
                
                {/* 推奨金額ボタン */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => selectAmount(amount)}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        donationAmount === amount.toString()
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-semibold">¥{amount.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
                
                {/* 自由入力 */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="寄付したい金額を入力（最低100円から）"
                    min="100"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                {donationAmount && parseInt(donationAmount) < 100 && (
                  <p className="text-red-500 text-xs mt-1">最低寄付金額は100円です</p>
                )}
              </div>

              {/* 支払い方法選択 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  支払い方法を選択してください
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedPaymentMethod('credit')}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      selectedPaymentMethod === 'credit'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        💳
                      </div>
                      <div>
                        <div className="font-medium">クレジットカード</div>
                        <div className="text-xs text-gray-500">Visa, Mastercard, JCB対応</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedPaymentMethod('apple')}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      selectedPaymentMethod === 'apple'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        🍎
                      </div>
                      <div>
                        <div className="font-medium">Apple Pay</div>
                        <div className="text-xs text-gray-500">Touch ID / Face IDで簡単決済</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedPaymentMethod('google')}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      selectedPaymentMethod === 'google'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        🟢
                      </div>
                      <div>
                        <div className="font-medium">Google Pay</div>
                        <div className="text-xs text-gray-500">Androidデバイスで簡単決済</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 寄付実行ボタン */}
              <div className="space-y-3">
                <button
                  onClick={processDonation}
                  disabled={!donationAmount || parseInt(donationAmount) < 100 || !selectedPaymentMethod || isProcessingPayment}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>処理中...</span>
                    </>
                  ) : (
                    <>
                      <Gift className="w-5 h-5" />
                      <span>
                        {donationAmount ? `¥${parseInt(donationAmount).toLocaleString()}を寄付する` : '寄付する'}
                      </span>
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  決済は安全に暗号化されて処理されます。<br />
                  寄付は任意であり、アプリの機能に影響はありません。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="animate-bounce mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">🎉</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              寄付が完了しました！
            </h3>
            <p className="text-gray-600 text-sm">
              ありがとうございます！<br />
              あなたのご支援に心から感謝いたします。
            </p>
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
              isActive={item.path === '/messages'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesScreen;