import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../utils/i18n';
// Remove unused imports to prevent linter warnings
// import { generateVideo, type VideoScript, type ContentType, type VideoGenerationOptions } from '../services/videoGeneration';
import { logError } from '../utils/errorHandler';

interface VideoGeneratorScreenProps {
  onBack: () => void;
}

type MessageType = 'user' | 'ai';
type AttachmentType = 'story_list' | 'meal_card' | 'video_script' | null;

interface Message {
  id: string;
  type: MessageType;
  text: string;
  attachmentType?: AttachmentType;
  attachmentData?: any;
  timestamp: Date;
}

export default function VideoGeneratorScreen({ onBack }: VideoGeneratorScreenProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'ai',
      text: 'SNSコンチE��チE��タジオへようこそ�E�\n日記からネタを探したり、E��事をシェアしたり、動画を作ったりできます、En下�Eボタンからアクションを選んでください 👇',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Context for refinement (what are we talking about?)
  // 'last_content' holds the data of the most recent AI generation for context-aware refinement
  const [lastContent, setLastContent] = useState<{ type: AttachmentType; data: any } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (
    type: MessageType,
    text: string,
    attachmentType: AttachmentType = null,
    attachmentData: any = null
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      text,
      attachmentType,
      attachmentData,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    if (type === 'ai' && attachmentType) {
      setLastContent({ type: attachmentType, data: attachmentData });
    }
  };

  // --- Actions ---

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    addMessage('user', userText);
    setIsTyping(true);

    try {
      // Check context for refinement
      if (lastContent) {
        if (lastContent.type === 'story_list') {
          const { refineStory } = await import('../services/aiServiceStory');
          // Refine the FIRST story in the list for now (simplification)
          // In a full chat, we might want to know WHICH story the user refers to
          // For now, we assume user wants to refine the first/primary story or all of them?
          // Let's just refine the first one for MVP or ask user.
          // Or better: Iterate and find which one?
          // Let's refine the one that was most likely viewed.
          // Simplest: Refine the first one.
          const targetStoryIndex = 0;
          const targetStory = lastContent.data[targetStoryIndex];

          if (!targetStory) {
            // Should not happen, but fallback
            addMessage('ai', '修正するスト�Eリーが見つかりませんでした、E);
            setIsTyping(false);
            return;
          }

          const refinedText = await refineStory(targetStory.text, userText);

          // Update data - Create a NEW message with updated content
          const newStories = [...lastContent.data];
          newStories[targetStoryIndex] = { ...targetStory, text: refinedText };

          addMessage('ai', '修正しました�E�E, 'story_list', newStories);
        } else if (lastContent.type === 'meal_card') {
          // Regenerate Meal Text
          const { refineStory } = await import('../services/aiServiceStory');
          const refinedText = await refineStory(
            lastContent.data.text,
            userText + ' (食事シェアの投稿斁E��して)'
          );

          const newMealData = { ...lastContent.data, text: refinedText };
          addMessage('ai', '投稿斁E��調整しました🍴', 'meal_card', newMealData);
        } else if (lastContent.type === 'video_script') {
          addMessage(
            'ai',
            'すみません、動画スクリプトの直接修正はまだ対応してぁE��せんが、もぁE��度条件を変えて生�Eすることは可能です、E
          );
        } else {
          addMessage(
            'ai',
            'そ�E持E��につぁE��は、対象のコンチE��チE��再生成�Eタンから作り直す�Eが早道かもしれません🤁E
          );
        }
      } else {
        addMessage('ai', 'まず�E下�Eメニューから、やりたぁE��とを選んでね👇');
      }
    } catch (err) {
      console.error(err);
      addMessage('ai', 'すみません、エラーが発生しました、E);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDiscoverStories = async () => {
    if (isTyping) return;
    setIsTyping(true);
    // addMessage('user', '日記からネタを探して'); // Optional

    try {
      const { analyzeDiaryForStories } = await import('../services/aiServiceStory');
      const { getDailyLogs } = await import('../utils/storage');

      const allLogs = await getDailyLogs();

      const logsForAnalysis = allLogs
        .filter((log) => log.diary || (log.fuel && log.fuel.length > 0))
        .map((log) => ({
          date: log.date,
          diary: log.diary || '',
          foods: log.fuel.map((f) => f.item),
          physicalCondition: log.status,
        }));

      const recentLogs = logsForAnalysis
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 30);

      if (recentLogs.length === 0) {
        addMessage('ai', '日記データが見つかりませんでした。まず�E日記を書ぁE��みましょぁE��E);
        setIsTyping(false);
        return;
      }

      const stories = await analyzeDiaryForStories(recentLogs);

      if (stories.length === 0) {
        addMessage(
          'ai',
          '直近�E日記から�E、特筁E��べきBefore/Afterスト�Eリーが見つかりませんでした💦\nもっと日記を書き溜めてからまた試してみてね�E�E
        );
      } else {
        addMessage(
          'ai',
          '日記を刁E��して、いくつか�Eスト�Eリーを見つけました�E�\n修正したぁE��合�E、�E体的に持E��を�Eしてください�E�侁E 「もっと関西弁で」！E,
          'story_list',
          stories
        );
      }
    } catch (err) {
      logError(err, { component: 'VideoGeneratorScreen', action: 'handleDiscoverStories' });
      addMessage('ai', 'エラーが発生しました。もぁE��度試してください、E);
    } finally {
      setIsTyping(false);
    }
  };

  const handleMealShare = async () => {
    if (isTyping) return;
    setIsTyping(true);

    try {
      const { getDailyLogs } = await import('../utils/storage');
      const allLogs = await getDailyLogs();

      // Sort by date descending
      const sortedLogs = allLogs.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Find first log with foods
      const lastMealLog = sortedLogs.find((log) => log.fuel && log.fuel.length > 0);

      if (!lastMealLog) {
        addMessage(
          'ai',
          '最近�E食事記録が見つかりませんでした。�Eーム画面で食事を記録してください🍖'
        );
      } else {
        const { generateMealShare } = await import('../services/aiServiceStory');

        const mealForService = {
          date: lastMealLog.date,
          foods: lastMealLog.fuel.map((f) => f.item),
          diary: lastMealLog.diary,
        };

        const content = await generateMealShare(mealForService);
        const mealData = { ...mealForService, ...content };
        addMessage(
          'ai',
          '直近�E食事からカードを作�Eしました�E�\n気に入らなければ「もっとワイルドに」とか指示してね、E,
          'meal_card',
          mealData
        );
      }
    } catch (err) {
      logError(err, { component: 'VideoGeneratorScreen', action: 'handleMealShare' });
      addMessage('ai', '食事カード�E作�Eに失敗しました、E);
    } finally {
      setIsTyping(false);
    }
  };

  /*
    const handleCreateVideo = () => {
        addMessage('ai', '動画の作�Eです�E�E�\nどんなトピチE��で作りますか�E�（侁E 「グリシンの効果につぁE��」「私�E体験諁E��！E, 'video_script', { step: 'ask_topic' });
    };
    */

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('コピ�Eしました�E�E);
  };

  return (
    <div
      className="video-generator-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f3f4f6',
        zIndex: 1500,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          flexShrink: 0, // Prevent header shrinking
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          ↁE        </button>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>🤁ESNS Content Studio</h1>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Powered by Gemini 2.5</p>
        </div>
      </div>

      {/* Chat History */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {/* Text Bubble */}
            <div
              style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: '18px',
                backgroundColor: msg.type === 'user' ? '#2563eb' : 'white',
                color: msg.type === 'user' ? 'white' : '#1f2937',
                borderBottomRightRadius: msg.type === 'user' ? '4px' : '18px',
                borderBottomLeftRadius: msg.type === 'ai' ? '4px' : '18px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.5',
                fontSize: '14px',
              }}
            >
              {msg.text}
            </div>

            {/* Attachments */}
            {msg.attachmentType === 'story_list' && (
              <div
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {msg.attachmentData.map((story: any, idx: number) => (
                  <StoryCard key={idx} story={story} onCopy={() => copyToClipboard(story.text)} />
                ))}
              </div>
            )}

            {msg.attachmentType === 'meal_card' && (
              <MealCard
                data={msg.attachmentData}
                onCopy={() =>
                  copyToClipboard(
                    `${msg.attachmentData.text} ${msg.attachmentData.hashtags.join(' ')}`
                  )
                }
              />
            )}

            <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px', margin: '0 4px' }}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {isTyping && (
          <div
            style={{
              alignSelf: 'flex-start',
              padding: '12px 16px',
              backgroundColor: 'white',
              borderRadius: '18px',
              borderBottomLeftRadius: '4px',
            }}
          >
            <span className="animate-pulse">...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ backgroundColor: 'white', padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
        {/* Tools */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          <ToolButton
            icon="📖"
            label="日記発要E
            onClick={handleDiscoverStories}
            disabled={isTyping}
          />
          <ToolButton icon="🥩" label="食事シェア" onClick={handleMealShare} disabled={isTyping} />
          {/* <ToolButton icon="🎥" label="動画作�E" onClick={handleCreateVideo} disabled={isTyping} /> */}
        </div>

        {/* Text Entry */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={lastContent ? '修正の持E��を�E劁E..' : 'AIに持E��を�EぁE..'}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '24px',
              border: '1px solid #d1d5db',
              backgroundColor: '#f9fafb',
              outline: 'none',
            }}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: inputValue.trim() ? '#2563eb' : '#e5e7eb',
              color: 'white',
              cursor: inputValue.trim() ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Components ---

function ToolButton({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#374151',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StoryCard({ story, onCopy }: { story: any; onCopy: () => void }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f9fafb',
          borderBottom: '1px solid #e5e7eb',
          fontWeight: 'bold',
          fontSize: '15px',
        }}
      >
        {story.title}
      </div>
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', fontSize: '12px' }}>
          <div
            style={{
              flex: 1,
              padding: '6px',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '4px',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>BEFORE:</span> {story.before}
          </div>
          <div
            style={{
              flex: 1,
              padding: '6px',
              background: '#dcfce7',
              color: '#166534',
              borderRadius: '4px',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>AFTER:</span> {story.after}
          </div>
        </div>
        <div
          style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#374151',
            whiteSpace: 'pre-wrap',
            marginBottom: '0.5rem',
          }}
        >
          {story.text}
        </div>
        <div style={{ fontSize: '13px', color: '#2563eb', marginBottom: '1rem' }}>
          {story.hashtags.join(' ')}
        </div>
        <button
          onClick={onCopy}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '6px',
            color: '#4b5563',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          📋 チE��ストをコピ�E
        </button>
      </div>
    </div>
  );
}

function MealCard({ data, onCopy }: { data: any; onCopy: () => void }) {
  return (
    <div
      style={{
        maxWidth: '300px',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ padding: '1.5rem' }}>
        <div
          style={{
            fontSize: '10px',
            opacity: 0.6,
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Now Eating
        </div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '0.5rem',
          }}
        >
          {data.foods.join('\n')}
        </div>
        <p
          style={{
            fontSize: '13px',
            lineHeight: '1.5',
            marginBottom: '0.5rem',
            fontStyle: 'italic',
            opacity: 0.9,
          }}
        >
          "{data.text}"
        </p>
        <div style={{ fontSize: '11px', color: '#93c5fd' }}>{data.hashtags.join(' ')}</div>
      </div>
      <div
        style={{
          padding: '0.75rem',
          backgroundColor: 'rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <button
          onClick={onCopy}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '12px',
            cursor: 'pointer',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          📋 Copy Text
        </button>
      </div>
    </div>
  );
}

