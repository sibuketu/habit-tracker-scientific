/**
 * CarnivoreOS - Feature Flags
 *
 * Feature flag management for phased release
 * "Hide Strategy" - Gradually release implemented features
 *
 * v1.0 Release targets:
 * - Core: home, input, history, profile, settings, aiFeatures
 * - Additional: stats, recipe, diary (no integration)
 *
 * To be added in future updates:
 * - Labs, Community, Shop, Gift, StreakTracker
 * - Diary integration (healthDevice, etc.)
 */

export interface FeatureFlags {
  // Core features (v1.0)
  home: boolean;
  input: boolean;
  history: boolean;
  profile: boolean;
  settings: boolean;
  aiFeatures: boolean;

  // v1.0 additional features
  stats: boolean;
  diary: boolean;
  recipe: boolean;

  // To be added later (v1.x)
  labs: boolean;
  streakTracker: boolean;
  healthDevice: boolean;  // For Diary integration
  community: boolean;
  shop: boolean;
  gift: boolean;

  // Development
  paywall: boolean;
  ifThenRules: boolean;
  
  // Hidden features (implemented but hidden in production)
  karmaCounter: boolean;  // Karma Counter (hidden in production, for future update)
}

/**
 * Current feature flag settings
 * Phase 1 release settings (initial release)
 * 
 * Features to display:
 * - Home screen, meal input, history, profile, settings
 * - AI features (enabled as core feature)
 * - Labs (for accessing Stats/Diary)
 * - Stats (statistics and charts, accessed from Labs)
 * - Diary (diary, no integration, accessed from Labs)
 * 
 * Features to hide:
 * - Community, Shop, Gift, Recipe details
 */
export const FEATURE_FLAGS: FeatureFlags = {
  // Core features: enabled (Phase 1)
  home: true,
  input: true,
  history: true,
  profile: true,
  settings: true,
  aiFeatures: false,  // AI機能は現在無効

  // Features used within Labs: enabled
  stats: true,  // Accessed from Labs (statistics and charts)
  diary: true,  // Accessed from Labs (diary, no integration)
  labs: true,  // For accessing Stats/Diary

  // To be added in Phase 2 and later: disabled
  recipe: false,  // To be added in Phase 2
  streakTracker: false,
  healthDevice: false,  // Diary integration to be added later
  community: false,  // To be added in Phase 4
  shop: false,  // To be added in Phase 4
  gift: false,  // To be added in Phase 4

  // Development
  paywall: true,  // Payment feature enabled (required for release)
  ifThenRules: false,
  
  // Hidden features (implemented but hidden in production)
  karmaCounter: false,  // Karma Counter (hidden in production, for future update)
};

/**
 * Get feature flags
 * Use same settings as production even in dev mode (for testing)
 * Set VITE_ENABLE_ALL_FEATURES=true to enable all features
 */
export function getFeatureFlags(): FeatureFlags {
  // Enable all features via environment variable (for debugging during development)
  if (import.meta.env.VITE_ENABLE_ALL_FEATURES === 'true') {
    return Object.keys(FEATURE_FLAGS).reduce((acc, key) => {
      acc[key as keyof FeatureFlags] = true;
      return acc;
    }, {} as FeatureFlags);
  }
  return FEATURE_FLAGS;
}

/**
 * Check if a specific feature is enabled
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  return getFeatureFlags()[feature];
}

/**
 * Check feature flag from screen name
 */
export function isScreenEnabled(screen: string): boolean {
  const screenToFeature: Record<string, keyof FeatureFlags> = {
    home: 'home',
    input: 'input',
    history: 'history',
    profile: 'profile',
    settings: 'settings',
    stats: 'stats',
    diary: 'diary',
    recipe: 'recipe',
    labs: 'labs',
    streakTracker: 'streakTracker',
    healthDevice: 'healthDevice',
    community: 'community',
    shop: 'shop',
    gift: 'gift',
    paywall: 'paywall',
    ifThenRules: 'ifThenRules',
    karmaCounter: 'karmaCounter',
  };

  const feature = screenToFeature[screen];
  if (!feature) {
    // Allow screens not in mapping (consent, onboarding, auth, etc.)
    return true;
  }

  return isFeatureEnabled(feature);
}

