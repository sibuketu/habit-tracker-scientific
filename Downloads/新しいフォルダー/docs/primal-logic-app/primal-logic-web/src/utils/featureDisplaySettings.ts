/**
 * CarnivoreOS - Feature Display Settings
 *
 * 各機能の表示/非表示を制御する設定
 * 将来的に課金状況やユーザー設定で制御可能にする
 */

import { logError } from './errorHandler';

export type FeatureKey =
  // 必須要素
  | 'streakDisplay' // ストリーク表示
  | 'phaseDisplay' // Phase表示
  | 'transitionBanner' // 移行期間バナー
  | 'transitionGuide' // 移行期間ガイド
  | 'pfRatioGauge' // P:F比率ゲージ
  | 'omegaRatioGauge' // オメガ比率ゲージ
  | 'calciumPhosphorusRatioGauge' // カルシウム:リン比率ゲージ
  | 'glycineMethionineRatioGauge' // グリシン:メチオニン比率ゲージ
  | 'argumentCard' // 議論（知識）カード
  | 'recoveryProtocol' // リカバリープロトコル
  | 'myFoodsTab' // 「よく使う」登録タブ
  | 'historyTab' // 履歴タブ
  | 'aiSpeedDial' // AI Speed Dial
  | 'photoUpload' // 写真アップロード
  | 'avoidZone' // Avoid Zone（非推奨食材警告）
  // 拡張機能
  | 'nutrientTrendGraph' // 栄養トレンドグラフ
  | 'weeklySummary' // 週間サマリー
  | 'monthlySummary' // 月間サマリー
  | 'statisticsCard' // 統計カード
  // 通知系
  | 'electrolyteAlert' // 電解質アラート
  | 'fatDeficiencyReminder' // 脂質不足リマインダー
  | 'streakReminder' // ストリークリマインダー
  // 開発者用
  | 'debugMode' // デバッグモード
  | 'customFoodRegistration' // カスタム食材登録
  | 'bodyCompositionSettings' // 体組成設定
  | 'metabolicStressIndicators' // 代謝ストレス指標
  | 'nutrientTargetCustomization'; // 栄養目標値のカスタム

export interface FeatureDisplayConfig {
  key: FeatureKey;
  label: string;
  category: 'screenElement' | 'analysis' | 'notification' | 'other';
  defaultVisible: boolean; // デフォルトで表示するか
  description?: string;
}

/**
 * 全機能の表示設定（デフォルト値）
 */
export const ALL_FEATURE_DISPLAY_CONFIGS: FeatureDisplayConfig[] = [
  // 必須要素
  {
    key: 'streakDisplay',
    label: 'ストリーク表示',
    category: 'screenElement',
    defaultVisible: true,
    description: '継続日数の表示',
  },
  {
    key: 'phaseDisplay',
    label: 'Phase表示',
    category: 'screenElement',
    defaultVisible: true,
    description: '現在の習熟度フェーズを表示',
  },
  {
    key: 'transitionBanner',
    label: '移行ガイドバナー',
    category: 'screenElement',
    defaultVisible: true,
    description: '初心者のための移行ガイドへのリンク',
  },
  {
    key: 'transitionGuide',
    label: '移行ガイド詳細',
    category: 'screenElement',
    defaultVisible: true,
    description: '移行期間のアドバイスモーダル',
  },
  {
    key: 'pfRatioGauge',
    label: 'P:F比率ゲージ',
    category: 'analysis',
    defaultVisible: true,
    description: 'タンパク質と脂質の比率',
  },
  {
    key: 'omegaRatioGauge',
    label: 'オメガ比率ゲージ',
    category: 'analysis',
    defaultVisible: true,
    description: 'オメガ3とオメガ6のバランス',
  },
  {
    key: 'calciumPhosphorusRatioGauge',
    label: 'Ca:P比率ゲージ',
    category: 'analysis',
    defaultVisible: true,
    description: 'カルシウムとリンのバランス',
  },
  {
    key: 'argumentCard',
    label: '知識カード',
    category: 'screenElement',
    defaultVisible: false, // 一時的に非表示推奨
    description: '栄養に関する豆知識や議論のヒント',
  },
  {
    key: 'recoveryProtocol',
    label: 'リカバリープロトコル',
    category: 'analysis',
    defaultVisible: true,
    description: '体調不良時の自動提案',
  },
  {
    key: 'aiSpeedDial',
    label: 'AIアシスタントメニュー',
    category: 'screenElement',
    defaultVisible: true,
    description: '右下のAIアクションボタン',
  },
  {
    key: 'photoUpload',
    label: '食事写真解析',
    category: 'screenElement',
    defaultVisible: true,
    description: '写真を撮ってAI解析',
  },
  // 以下略
];

const STORAGE_KEY = 'carnivos_feature_settings';

export function getFeatureDisplaySettings(): Record<FeatureKey, boolean> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // マージして返す（新機能追加時のため）
      const defaults = ALL_FEATURE_DISPLAY_CONFIGS.reduce((acc, config) => {
        acc[config.key] = config.defaultVisible;
        return acc;
      }, {} as Record<FeatureKey, boolean>);
      return { ...defaults, ...parsed };
    }
  } catch (e) {
    logError(e, { component: 'featureDisplaySettings', action: 'getSettings' });
  }

  // デフォルト
  return ALL_FEATURE_DISPLAY_CONFIGS.reduce((acc, config) => {
    acc[config.key] = config.defaultVisible;
    return acc;
  }, {} as Record<FeatureKey, boolean>);
}

export function saveFeatureDisplaySettings(settings: Record<FeatureKey, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    logError(e, { component: 'featureDisplaySettings', action: 'saveSettings' });
  }
}
