/**
 * Gemini Style Chat Input - Gemini風のチャット入力UI
 *
 * 大きな入力フィールド、ツールメニュー、思考モード選択を含む
 */

import { useState, useRef, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';

interface GeminiStyleChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoiceInput: () => void;
  isVoiceInputActive: boolean;
  isLoading: boolean;
  placeholder?: string;
  onFileUpload?: (file: File) => void;
  onPhotoClick?: () => void;
}

export default function GeminiStyleChatInput({
  value,
  onChange,
  onSend,
  onVoiceInput,
  isVoiceInputActive,
  isLoading,
  placeholder = 'CarnivOS に相談',
  onFileUpload,
  onPhotoClick,
}: GeminiStyleChatInputProps) {
  const { aiMode } = useSettings();
  const [thinkingMode, setThinkingMode] = useState<'fast' | 'thinking' | 'pro'>(() => {
    const saved = localStorage.getItem('ai_thinking_mode');
    return (saved as 'fast' | 'thinking' | 'pro') || 'fast';
  });
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showThinkingModeMenu, setShowThinkingModeMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const thinkingModeMenuRef = useRef<HTMLDivElement>(null);

  // 思考モードをlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('ai_thinking_mode', thinkingMode);
  }, [thinkingMode]);

  // クリックアウトサイドでメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target as Node)) {
        setShowFileMenu(false);
      }
      if (thinkingModeMenuRef.current && !thinkingModeMenuRef.current.contains(event.target as Node)) {
        setShowThinkingModeMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
    // リセット（同じファイルを再度選択できるように）
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowFileMenu(false);
  };

  const thinkingModeLabels = {
    fast: '高速モード',
    thinking: '思考モード',
    pro: 'Pro',
  };

  const thinkingModeDescriptions = {
    fast: '素早く回答',
    thinking: '複雑な問題を解決',
    pro: '高度な数学とコードについて、さらに深く思考',
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderRadius: '24px',
        border: '1px solid #e5e7eb',
        position: 'relative',
      }}
    >
      {/* メイン入力エリア */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '0.75rem 1rem',
          border: '1px solid #e5e7eb',
          minHeight: '56px',
        }}
      >
        {/* "+"ボタン（ファイルアップロード、フォトなど） */}
        <button
          onClick={() => setShowFileMenu(!showFileMenu)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          title="ファイルを追加"
        >
          +
        </button>

        {/* ファイルメニュー（ドロップダウン） */}
        {showFileMenu && (
          <div
            ref={fileMenuRef}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '1rem',
              marginBottom: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              padding: '0.5rem',
              minWidth: '200px',
              zIndex: 1000,
            }}
          >
            <button
              onClick={() => {
                fileInputRef.current?.click();
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '14px',
                color: '#374151',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span style={{ fontSize: '18px' }}>📎</span>
              <span>ファイルアップロード</span>
            </button>
            <button
              onClick={() => {
                if (onPhotoClick) {
                  onPhotoClick();
                }
                setShowFileMenu(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '14px',
                color: '#374151',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span style={{ fontSize: '18px' }}>📷</span>
              <span>フォト</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.csv,.txt"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
        )}


        {/* 入力フィールド */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
              e.preventDefault();
              onSend();
            }
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
          }}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            fontFamily: 'inherit',
            resize: 'none',
            minHeight: '24px',
            maxHeight: '200px',
            backgroundColor: 'transparent',
            color: '#111827',
            lineHeight: '1.5',
            padding: '0.25rem 0',
          }}
          rows={1}
        />

        {/* 思考モード選択 */}
        <div style={{ position: 'relative' }} ref={thinkingModeMenuRef}>
          <button
            onClick={() => setShowThinkingModeMenu(!showThinkingModeMenu)}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#374151',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            title="思考モードを選択"
          >
            <span>{thinkingModeLabels[thinkingMode]}</span>
            <span style={{ fontSize: '12px' }}>▼</span>
          </button>

          {/* 思考モードメニュー（ドロップダウン） */}
          {showThinkingModeMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                right: 0,
                marginBottom: '0.5rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                padding: '0.5rem',
                minWidth: '240px',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  borderBottom: '1px solid #e5e7eb',
                  marginBottom: '0.25rem',
                }}
              >
                CarnivOS
              </div>
              {(['fast', 'thinking', 'pro'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setThinkingMode(mode);
                    setShowThinkingModeMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: thinkingMode === mode ? '#f0f9ff' : 'transparent',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    color: '#374151',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (thinkingMode !== mode) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (thinkingMode !== mode) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: thinkingMode === mode ? '600' : '500' }}>
                      {thinkingModeLabels[mode]}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {thinkingModeDescriptions[mode]}
                    </span>
                  </div>
                  {thinkingMode === mode && (
                    <span style={{ fontSize: '16px', color: '#3b82f6' }}>✓</span>
                  )}
                  {mode === 'fast' && thinkingMode !== 'fast' && (
                    <span
                      style={{
                        fontSize: '10px',
                        padding: '0.125rem 0.375rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        borderRadius: '4px',
                        fontWeight: '600',
                      }}
                    >
                      New
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* マイクアイコン（音声入力） */}
        <button
          onClick={onVoiceInput}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: isVoiceInputActive ? '#dc2626' : 'transparent',
            color: isVoiceInputActive ? 'white' : '#374151',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!isVoiceInputActive) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (!isVoiceInputActive) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          title={isVoiceInputActive ? '音声入力を停止' : '音声入力を開始'}
        >
          🎤
        </button>
      </div>

      {/* モバイル対応: ボトムシート形式のメニュー */}
      <style>{`
        @media (max-width: 768px) {
          /* モバイルではドロップダウンをボトムシート形式に変更 */
        }
      `}</style>
    </div>
  );
}

