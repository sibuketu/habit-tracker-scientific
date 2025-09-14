// 国際化設定
export type SupportedLocale = 'fr' | 'de' | 'en' | 'ja' | 'zh';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['fr', 'de', 'en', 'ja', 'zh'];

export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  fr: 'Français',
  de: 'Deutsch', 
  en: 'English',
  ja: '日本語',
  zh: '中文'
};

// 地域固有の用語設定
export const REGIONAL_TERMS = {
  timeAttack: {
    ja: 'タイムアタック',
    default: 'スピードランニング'
  }
};

export function getRegionalTerm(key: keyof typeof REGIONAL_TERMS, locale: SupportedLocale): string {
  const term = REGIONAL_TERMS[key];
  if (locale === 'ja') {
    return term.ja;
  }
  return term.default;
}

// デフォルトロケール設定
export const DEFAULT_LOCALE: SupportedLocale = 'fr'; // フランス語を最優先

// ロケール検出
export function detectLocale(): SupportedLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  
  const browserLocale = navigator.language.split('-')[0] as SupportedLocale;
  
  // 優先順位: フランス語 → ドイツ語 → 英語 → 日本語 → 中国語
  const priorityOrder: SupportedLocale[] = ['fr', 'de', 'en', 'ja', 'zh'];
  
  // ブラウザのロケールがサポートされている場合
  if (SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale;
  }
  
  // デフォルトはフランス語
  return DEFAULT_LOCALE;
}
