import { useState } from 'react';
import { useTranslation } from '../utils/i18n';
import Toast from './common/Toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: {
    title: string;
    text: string;
    url?: string;
  };
  onShareSuccess?: () => void;
}

export default function ShareModal({ isOpen, onClose, shareData, onShareSuccess }: ShareModalProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleShareX = () => {
    const text = encodeURIComponent(shareData.text);
    const url = shareData.url || window.location.href;
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=550,height=420');
    onShareSuccess?.();
    onClose();
  };

  const handleShareLINE = () => {
    const text = encodeURIComponent(shareData.text);
    const url = shareData.url || window.location.href;
    const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${text}`;
    window.open(shareUrl, '_blank', 'width=550,height=420');
    onShareSuccess?.();
    onClose();
  };

  const handleCopyLink = async () => {
    try {
      // navigator.clipboard縺悟ｭ伜惠縺励↑縺・ｴ蜷医・繝√ぉ繝・け
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
      }

      const textToCopy = shareData.url || `${shareData.title}\n${shareData.text}\n${window.location.href}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onShareSuccess?.();
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Toast騾夂衍縺ｧ繧ｨ繝ｩ繝ｼ繧定｡ｨ遉ｺ
      const errorMsg = t('common.copyFailed') || 'Failed to copy to clipboard. Please copy manually.';
      setErrorMessage(errorMsg);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url || window.location.href,
        });
        onShareSuccess?.();
        onClose();
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#18181b',
          borderRadius: '12px',
          padding: '1.5rem',
          width: '90%',
          maxWidth: '400px',
          border: '1px solid #27272a',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 繝倥ャ繝繝ｼ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', margin: 0 }}>
            {t('common.share')}
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#a1a1aa',
              fontSize: '24px',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
            }}
          >
            ﾃ・
          </button>
        </div>

        {/* 繧ｷ繧ｧ繧｢繝懊ち繝ｳ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {navigator.share && (
            <button
              onClick={handleWebShare}
              style={{
                padding: '1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              豆 {t('common.share')}
            </button>
          )}

          <button
            onClick={handleShareX}
            style={{
              padding: '1rem',
              backgroundColor: '#000000',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
            }}
          >
            凄 X (Twitter) {t('common.share')}
          </button>

          <button
            onClick={handleShareLINE}
            style={{
              padding: '1rem',
              backgroundColor: '#06c755',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#05b048';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#06c755';
            }}
          >
            町 LINE {t('common.share')}
          </button>

          <button
            onClick={handleCopyLink}
            style={{
              padding: '1rem',
              backgroundColor: copied ? '#10b981' : '#27272a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s',
            }}
          >
            {copied ? '笨・ : '搭'} {copied ? t('common.copied') : t('common.copyLink')}
          </button>
        </div>
      </div>
      {errorMessage && (
        <Toast
          message={errorMessage}
          type="error"
          duration={3000}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
}

