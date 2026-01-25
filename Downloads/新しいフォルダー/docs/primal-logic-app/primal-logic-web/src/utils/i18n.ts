/**
 * CarnivoreOS - i18n (Internationalization)
 *
 * Translation functionality for multi-language support
 *
 * [Policy Change] Implement translation functionality
 * - Implement translation functionality now per user request
 * - Priority: English -> French -> German -> Japanese -> Chinese
 * - Reason for prioritizing English: Less competition, easier global market expansion
 */

import { useState, useEffect } from 'react';

export type Language = 'fr' | 'de' | 'en' | 'ja' | 'zh';

// Translation data
const translations: Record<Language, Record<string, string>> = {
  ja: {
    // Common
    'common.back': '戻る',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.english': 'English',
    'common.japanese': '日本語',
    'common.delete': '削除',
    'common.edit': '編集',
    'common.close': '閉じる',
    'common.confirm': '確認',
    'common.loading': '読み込み中...',
    'common.error': 'エラー',
    'common.backAriaLabel': '戻る',
    'common.languageChangeFailed': '言語変更に失敗しました',
    'common.days': '日',
    'common.consecutive': '連続',
    'common.items': '件',
    'common.send': '送信',
    'common.current': '現在',
    'common.locale': 'ja-JP',
    'common.share': 'シェア',
    'common.copied': 'コピーしました',
    'common.copyLink': 'リンクをコピー',
    'common.copyFailed': 'コピーに失敗しました。手動でコピーしてください。',
    'common.retry': '再試行',

    // Navigation
    'nav.mainNavigationAriaLabel': 'メインナビゲーション',
    'nav.home': 'ホーム',
    'nav.homeAriaLabel': 'ホーム画面',
    'nav.history': '履歴',
    'nav.historyAriaLabel': '履歴画面',
    'nav.labs': 'その他',
    'nav.labsAriaLabel': 'その他画面',
    'nav.profile': '設定',
    'nav.profileAriaLabel': '設定画面',

    // Language settings
    'language.title': '言語',
    'language.description': 'アプリの表示言語',
    'language.japanese': '日本語',
    'language.english': 'English',
    'language.french': 'Français',
    'language.german': 'Deutsch',
    'language.chinese': '中文',

    // Onboarding
    'onboarding.welcome': 'CarnivOSへようこそ',
    'onboarding.next': '次へ',
    'onboarding.start': '始める',
    'onboarding.step1.title': '言語設定',
    'onboarding.step1.description': '使用する言語を選択してください',
    'onboarding.step2.title': 'ペルソナ設定',
    'onboarding.step2.description': 'あなたのCarnivoreスタイルを選択してください',
    'onboarding.step3.title': '通知設定',
    'onboarding.step3.description': '食事や断食のリマインダーを受け取りますか？',
    'onboarding.step4.title': 'アカウント設定',
    'onboarding.step4.description': 'データを同期するためにサインインしてください（スキップ可）',
    'onboarding.persona.practitioner': 'カーニボア実践者',
    'onboarding.persona.practitionerDesc': '厳格なカーニボアダイエットを実践中',
    'onboarding.persona.beginner': '初心者',
    'onboarding.persona.beginnerDesc': 'これから始める、または始めたばかり',
    'onboarding.persona.data': 'データ重視',
    'onboarding.persona.dataDesc': '詳細な栄養データや分析を重視',
    'onboarding.notification.hint': '通知は設定画面からいつでも変更できます',

    // Home
    'home.todaysLog': '今日の食事ログ',
    'home.noLogsYet': 'まだ記録がありません',
    'home.nutrientBreakdown': '栄養素詳細',
    'home.electrolytes': '電解質',
    'home.macros': 'マクロ栄養素',
    'home.otherNutrients': 'その他の栄養素',
    'home.showMoreNutrients': '詳細を表示',
    'home.recoveryActive': 'リカバリープロトコル実行中',
    'home.foodAdded': '追加しました',
    'home.foodUpdated': '更新しました',
    'home.foodDeleted': '削除しました',
    'home.productNotFound': '商品が見つかりませんでした',
    'home.confirmDelete': '本当に削除しますか？',
    'home.photoAnalysisComplete': '写真解析完了',
    'home.notifications': '通知',
    'home.markAllRead': 'すべて既読にする',
    'home.noNotifications': '通知はありません',
    'home.notificationDesc': '重要なリマインダーやアラートを受け取れます',
    'home.notificationDeniedDesc': '通知が許可されていません',
    'home.enableNotifications': '通知を有効にする',
    'home.openSettings': '設定を開く',
    'home.notificationLoadError': '通知の読み込みに失敗しました',

    // History
    'history.title': '履歴',
    'history.noLogs': 'まだ記録がありません',
    'history.startLogging': '食事を記録すると、ここに履歴が表示されます。',
    'history.foods': '食べたもの',

    // Nutrients
    'nutrients.protein': 'タンパク質',
    'nutrients.fat': '脂質',
    'nutrients.carbs': '炭水化物',
    'nutrients.calories': 'カロリー',
    'nutrients.sodium': 'ナトリウム',
    'nutrients.magnesium': 'マグネシウム',
    'nutrients.potassium': 'カリウム',
    'nutrients.iron': '鉄',
    'nutrients.zinc': '亜鉛',
    'nutrients.vitaminA': 'ビタミンA',
    'nutrients.choline': 'コリン',
    'nutrients.omegaRatio': 'オメガ比',
    'nutrients.glycineMethionineRatio': 'グリシン:メチオニン比',
    'nutrients.calciumPhosphorusRatio': 'カルシウム:リン比',
    // Settings
    'settings.title': '設定',
    'settings.dataManagement': 'データ管理',
    'settings.customFoods': 'カスタム食品',
    'settings.developerOptions': '開発者オプション',
    'settings.exportData': 'データをエクスポート (JSON)',
    'settings.importData': 'データをインポート',
    'settings.manageCustomFoods': 'カスタム食品を管理',
    'settings.debugMode': 'デバッグモード',
    // ... add more as needed
  },
  en: {
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.english': 'English',
    'common.japanese': 'Japanese',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.backAriaLabel': 'Go back',
    'common.languageChangeFailed': 'Failed to change language',
    'common.days': 'days',
    'common.consecutive': 'streak',
    'common.items': 'items',
    'common.send': 'Send',
    'common.current': 'Current',
    'common.locale': 'en-US',
    'common.share': 'Share',
    'common.copied': 'Copied!',
    'common.copyLink': 'Copy Link',
    'common.copyFailed': 'Copy failed. Please copy manually.',
    'common.retry': 'Retry',

    // Navigation
    'nav.mainNavigationAriaLabel': 'Main Navigation',
    'nav.home': 'Home',
    'nav.homeAriaLabel': 'Home Screen',
    'nav.history': 'History',
    'nav.historyAriaLabel': 'History Screen',
    'nav.labs': 'Labs',
    'nav.labsAriaLabel': 'Labs Screen',
    'nav.profile': 'Profile',
    'nav.profileAriaLabel': 'Profile Screen',

    'language.title': 'Language',
    'language.description': 'App Language',
    'language.japanese': '日本語',
    'language.english': 'English',
    'language.french': 'Français',
    'language.german': 'Deutsch',
    'language.chinese': '中文',

    'onboarding.welcome': 'Welcome to CarnivOS',
    'onboarding.next': 'Next',
    'onboarding.start': 'Start',
    'onboarding.step1.title': 'Language',
    'onboarding.step1.description': 'Select your preferred language',
    'onboarding.step2.title': 'Persona',
    'onboarding.step2.description': 'Choose your Carnivore style',
    'onboarding.step3.title': 'Notifications',
    'onboarding.step3.description': 'Receive meal and fasting reminders?',
    'onboarding.step4.title': 'Account',
    'onboarding.step4.description': 'Sign in to sync data (Optional)',
    'onboarding.persona.practitioner': 'Practitioner',
    'onboarding.persona.practitionerDesc': 'Strict Carnivore Diet practitioner',
    'onboarding.persona.beginner': 'Beginner',
    'onboarding.persona.beginnerDesc': 'Just starting out',
    'onboarding.persona.data': 'Data Focused',
    'onboarding.persona.dataDesc': 'Focus on detailed nutrition data',
    'onboarding.notification.hint': 'You can change notification settings anytime',

    'home.todaysLog': 'Today\'s Log',
    'home.noLogsYet': 'No logs yet',
    'home.nutrientBreakdown': 'Nutrient Breakdown',
    'home.electrolytes': 'Electrolytes',
    'home.macros': 'Macros',
    'home.otherNutrients': 'Other Nutrients',
    'home.showMoreNutrients': 'Show More',
    'home.recoveryActive': 'Recovery Protocol Active',
    'home.foodAdded': 'Food Added',
    'home.foodUpdated': 'Food Updated',
    'home.foodDeleted': 'Food Deleted',
    'home.productNotFound': 'Product not found',
    'home.confirmDelete': 'Are you sure?',
    'home.photoAnalysisComplete': 'Analysis Complete',
    'home.notifications': 'Notifications',
    'home.markAllRead': 'Mark all as read',
    'home.noNotifications': 'No notifications',
    'home.notificationDesc': 'Receive important reminders and alerts',
    'home.notificationDeniedDesc': 'Notifications denied',
    'home.enableNotifications': 'Enable Notifications',
    'home.openSettings': 'Open Settings',
    'home.notificationLoadError': 'Failed to load notifications',

    // History
    'history.title': 'History',
    'history.noLogs': 'No logs yet',
    'history.startLogging': 'Start logging your meals to see history here.',
    'history.foods': 'Foods',

    'nutrients.protein': 'Protein',
    'nutrients.fat': 'Fat',
    'nutrients.carbs': 'Carbs',
    'nutrients.calories': 'Calories',
    'nutrients.sodium': 'Sodium',
    'nutrients.magnesium': 'Magnesium',
    'nutrients.potassium': 'Potassium',
    'nutrients.iron': 'Iron',
    'nutrients.zinc': 'Zinc',
    'nutrients.vitaminA': 'Vitamin A',
    'nutrients.choline': 'Choline',
    'nutrients.omegaRatio': 'Omega Ratio',
    'nutrients.glycineMethionineRatio': 'Glycine:Methionine Ratio',
    'nutrients.calciumPhosphorusRatio': 'Calcium:Phosphorus Ratio',
    // Settings
    'settings.title': 'Setting',
    'settings.dataManagement': 'Data Management',
    'settings.customFoods': 'Custom Foods',
    'settings.developerOptions': 'Developer Options',
    'settings.exportData': 'Export Data (JSON)',
    'settings.importData': 'Import Data',
    'settings.manageCustomFoods': 'Manage Custom Foods',
    'settings.debugMode': 'Debug Mode',
  },
  fr: {
    'common.back': 'Retour',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.close': 'Fermer',
    'common.confirm': 'Confirmer',
    'common.loading': 'Chargement...',
    'home.electrolytes': 'Électrolytes',
    'home.macros': 'Macros',
    'home.otherNutrients': 'Autres nutriments',
    // ... minimal set for FR
  },
  de: {
    'common.back': 'Zurück',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.close': 'Schließen',
    'common.confirm': 'Bestätigen',
    'common.loading': 'Laden...',
    'home.electrolytes': 'Elektrolyte',
    'home.macros': 'Makros',
    'home.otherNutrients': 'Andere Nährstoffe',
    // ... minimal set for DE
  },
  zh: {
    'common.back': '返回',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.close': '关闭',
    'common.confirm': '确认',
    'common.loading': '加载中...',
    'home.electrolytes': '电解质',
    'home.macros': '宏量营养素',
    'home.otherNutrients': '其他营养素',
    // ... minimal set for ZH
  },
};

const DEFAULT_LANGUAGE: Language = 'en';

export const getLanguage = (): Language => {
  const saved = localStorage.getItem('app_language') as Language;
  if (saved && translations[saved]) return saved;

  const browserLang = navigator.language.split('-')[0] as Language;
  return translations[browserLang] ? browserLang : DEFAULT_LANGUAGE;
};

export const setLanguage = (lang: Language) => {
  if (translations[lang]) {
    localStorage.setItem('app_language', lang);
    return true;
  }
  return false;
};

export const useTranslation = () => {
  // Simple hook to force update when language changes
  const [lang, setLang] = useState<Language>(getLanguage());

  // Listen for storage events (if changed in another tab) or custom event
  // For simplicity in this vanilla-ish implementation, we rely on component re-render or explicit key

  const t = (key: string): string => {
    const currentLang = getLanguage();
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
  };

  return { t, lang };
};
