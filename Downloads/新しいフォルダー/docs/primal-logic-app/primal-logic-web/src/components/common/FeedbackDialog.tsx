import { useCallback, useEffect, useMemo, useState } from 'react';

type FeedbackDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  placeholder?: string;
};

/**
 * Browser ↁEn8n direct call fails due to CORS, so always go through same-origin API.
 * - Development: Vite proxy (vite.config.ts)
 * - Production: Netlify redirect (netlify.toml)
 */
const FEEDBACK_API_PATH = '/api/feedback';

type N8nErrorResponse = {
  message?: unknown;
  hint?: unknown;
};

function showToast(message: string) {
  if (typeof window !== 'undefined' && (window as any).showToast) {
    (window as any).showToast(message);
    return;
  }
  alert(message);
}

async function getReadableErrorMessage(res: Response): Promise<string> {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    // Case where Vite/Netlify relay is down (not n8n JSON)
    return 'Failed to relay the request (dev server/proxy). Please reload the page, and if it persists, restart the dev server.';
  }

  // Display n8n typical errors (inactive workflow, etc.) in human-readable short form
  try {
    const data = (await res.json()) as N8nErrorResponse;
    const msg = typeof data?.message === 'string' ? data.message : '';
    const hint = typeof data?.hint === 'string' ? data.hint : '';
    const combined = `${msg}\n${hint}`.trim();
    if (combined.includes('workflow must be active') || combined.includes('must be active')) {
      return 'The destination (n8n) is not running. Please activate the workflow on the n8n side.';
    }
    if (combined.includes('proxy_error')) {
      return 'Failed to relay the request (dev server/proxy). Please check the dev server logs.';
    }
    if (combined) return combined;
  } catch {
    // ignore
  }
  return `Failed to send (HTTP ${res.status})`;
}

export default function FeedbackDialog({
  open,
  onClose,
  title = 'Feedback & Bug Report',
  placeholder = 'Please write freely about what you noticed (e.g., screen goes blank, nutrients are off, I want this feature...)',
}: FeedbackDialogProps) {
  const endpoint = useMemo(() => FEEDBACK_API_PATH, []);
  const [feedback, setFeedback] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Don't keep previous input when opened (prevent leakage/mis-sending)
    setFeedback('');
    setIsSending(false);
  }, [open]);

  const canSend = useMemo(() => feedback.trim().length > 0 && !isSending, [feedback, isSending]);

  const handleSend = useCallback(async () => {
    const text = feedback.trim();
    if (!text) return;

    setIsSending(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: text }),
      });

      if (!res.ok) {
        const message = await getReadableErrorMessage(res);
        showToast(message);
        return;
      }

      // Count feedback submissions
      try {
        const currentCount = parseInt(localStorage.getItem('primal_logic_feedback_count') || '0', 10);
        const newCount = currentCount + 1;
        localStorage.setItem('primal_logic_feedback_count', newCount.toString());
        
        // Generate feedback ID (for future adoption determination)
        const feedbackId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const feedbackIds = JSON.parse(localStorage.getItem('primal_logic_feedback_ids') || '[]');
        feedbackIds.push({ id: feedbackId, text: text, timestamp: new Date().toISOString() });
        localStorage.setItem('primal_logic_feedback_ids', JSON.stringify(feedbackIds));
        
        // Fire event to notify Achievements component
        window.dispatchEvent(new CustomEvent('feedbackCountUpdated', { detail: newCount }));
      } catch (error) {
        // Ignore localStorage errors (feedback sending succeeded)
        console.warn('Failed to save feedback count:', error);
      }

      showToast('Sent');
      onClose();
    } catch {
      showToast('Failed to send');
    } finally {
      setIsSending(false);
    }
  }, [endpoint, feedback, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 'min(560px, 100%)',
          borderRadius: 12,
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
          padding: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              borderRadius: 8,
              padding: '8px 10px',
              cursor: 'pointer',
            }}
          >
            ÁE
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={placeholder}
            rows={8}
            style={{
              width: '100%',
              resize: 'vertical',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              padding: 12,
              fontSize: 14,
              lineHeight: 1.5,
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSending}
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              borderRadius: 10,
              padding: '10px 12px',
              cursor: isSending ? 'not-allowed' : 'pointer',
              opacity: isSending ? 0.6 : 1,
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            style={{
              border: '1px solid var(--color-accent)',
              background: 'var(--color-accent)',
              color: '#fff',
              borderRadius: 10,
              padding: '10px 12px',
              cursor: canSend ? 'pointer' : 'not-allowed',
              opacity: canSend ? 1 : 0.5,
              fontWeight: 700,
            }}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}


