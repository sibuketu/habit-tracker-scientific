/**
 * CarnivoreOS - Loading Fallback
 *
 * Suspense用のローチE��ング表示コンポ�EネンチE
 * i18nに対応！EocalStorageから直接言語を取得！E
 */

const LOADING_TEXT: Record<string, string> = {
  ja: '読み込み中...',
  en: 'Loading...',
  fr: 'Chargement...',
  de: 'Laden...',
  zh: '加载中...',
};

function getLoadingText(): string {
  try {
    const lang = localStorage.getItem('primal_logic_language') || 'ja';
    return LOADING_TEXT[lang] || LOADING_TEXT.en;
  } catch {
    return LOADING_TEXT.en;
  }
}

export default function LoadingFallback() {
  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
      }}
    >
      {getLoadingText()}
    </div>
  );
}

