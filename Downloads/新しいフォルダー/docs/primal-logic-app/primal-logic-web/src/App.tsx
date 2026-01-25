import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NutritionProvider } from './context/NutritionContext';
import { supabase, isSupabaseAvailable } from './lib/supabaseClient';
import { getUserFriendlyErrorMessage, logError } from './utils/errorHandler';
import { useTranslation } from './utils/i18n';
import type { FoodItem } from './types/index';
import type { Session } from '@supabase/supabase-js';
// Main screens (need to load immediately)
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LabsScreen from './screens/LabsScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomFoodScreen from './screens/CustomFoodScreen';
import AuthScreen from './screens/AuthScreen';
import ConsentScreen from './screens/ConsentScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import Toast from './components/common/Toast';
import LoadingFallback from './components/common/LoadingFallback';
import { getFeatureDisplaySettings } from './utils/featureDisplaySettings';
import { isFeatureEnabled, isScreenEnabled } from './utils/featureFlags';
import DisclaimerModal from './components/DisclaimerModal'; // Import
import './App.css';
import './styles/common.css';
import './styles/pixel-art.css';

// Lazy loading (performance optimization)
const LazyHistoryScreen = lazy(() => import('./screens/HistoryScreen'));
const LazyUserSettingsScreen = lazy(() => import('./screens/UserSettingsScreen'));
const LazyStreakTrackerScreen = lazy(() => import('./screens/StreakTrackerScreen'));
const LazyCommunityScreen = lazy(() => import('./screens/CommunityScreen'));
const LazyDiaryScreen = lazy(() => import('./screens/DiaryScreen'));
const LazyStatsScreen = lazy(() => import('./screens/StatsScreen'));
const LazyPrivacyPolicyScreen = lazy(() => import('./screens/PrivacyPolicyScreen'));
const LazyTermsOfServiceScreen = lazy(() => import('./screens/TermsOfServiceScreen'));
const LazyDataExportScreen = lazy(() => import('./screens/DataExportScreen'));
const LazyDataImportScreen = lazy(() => import('./screens/DataImportScreen'));
const LazyDataDeleteScreen = lazy(() => import('./screens/DataDeleteScreen'));
const LazyFeedbackScreen = lazy(() => import('./screens/FeedbackScreen'));
const LazyLanguageSettingsScreen = lazy(() => import('./screens/LanguageSettingsScreen'));
const LazySaltSettingsScreen = lazy(() => import('./screens/SaltSettingsScreen'));
const LazyCarbTargetSettingsScreen = lazy(() => import('./screens/CarbTargetSettingsScreen'));
const LazyNutrientTargetCustomizationScreen = lazy(
  () => import('./screens/NutrientTargetCustomizationScreen')
);
const LazyGiftScreen = lazy(() => import('./screens/GiftScreen'));
const LazyShopScreen = lazy(() => import('./screens/ShopScreen'));
const LazyRecipeScreen = lazy(() => import('./screens/RecipeScreen'));
const LazyHealthDeviceScreen = lazy(() => import('./screens/HealthDeviceScreen'));
// InputScreen removed (Antigravity deleted it)
const LazyPaywallScreen = lazy(() => import('./screens/PaywallScreen'));
const LazyIfThenRulesScreen = lazy(() => import('./screens/IfThenRulesScreen'));

type Screen =
  | 'home'
  | 'profile'
  | 'history'
  | 'labs'
  | 'settings'
  | 'userSettings'
  | 'streakTracker'
  | 'customFood'
  | 'community'
  | 'diary'
  | 'stats'
  | 'auth'
  | 'privacy'
  | 'terms'
  | 'dataExport'
  | 'dataImport'
  | 'dataDelete'
  | 'feedback'
  | 'consent'
  | 'onboarding'
  | 'language'
  | 'salt'
  | 'carbTarget'
  | 'nutrientCustom'
  | 'gift'
  | 'shop'
  | 'recipe'
  | 'healthDevice'
  // | 'input' // Removed (Antigravity deleted InputScreen)
  | 'ifThenRules'
  | 'paywall';

// Application main body
function AppContent() {
  const { t } = useTranslation();
  const { syncLocalStorageToSupabase, error, clearError, isLoading } = useApp();
  // Valid screen name list
  const validScreens: Screen[] = [
    'home', 'profile', 'history', 'labs', 'settings', 'userSettings',
    'streakTracker', 'customFood', 'community', 'diary', 'stats', 'auth',
    'privacy', 'terms', 'dataExport', 'dataImport', 'dataDelete', 'feedback',
    'consent', 'onboarding', 'language', 'salt', 'carbTarget', 'nutrientCustom',
    'gift', 'shop', 'recipe', 'healthDevice', 'ifThenRules', 'paywall'
    // 'input' temporarily removed (Antigravity recovery)
  ];

  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    // Get screen from URL hash (#paywall → paywall)
    const hash = window.location.hash.slice(1) as Screen;
    // Ignore screens disabled by featureFlags
    if (hash && validScreens.includes(hash) && isScreenEnabled(hash)) {
      return hash;
    }

    // Determine screen on first launch
    const consentAccepted = localStorage.getItem('primal_logic_consent_accepted');
    const onboardingCompleted = localStorage.getItem('primal_logic_onboarding_completed');

    if (!consentAccepted) {
      return 'consent';
    }
    if (!onboardingCompleted) {
      return 'onboarding';
    }
    return 'home';
  });
  const [openFatTabCallback, setOpenFatTabCallback] = useState<(() => void) | null>(null);
  const [hasAgreedToDisclaimer, setHasAgreedToDisclaimer] = useState<boolean>(() => {
    return localStorage.getItem('primal_logic_disclaimer_agreed') === 'true';
  });
  const [addFoodCallback, setAddFoodCallback] = useState<((foodItem: FoodItem) => void) | null>(
    null
  );
  const [session, setSession] = useState<Session | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isPixelArtEnabled, setIsPixelArtEnabled] = useState(() => {
    return localStorage.getItem('primal_logic_dot_ui_enabled') === 'true';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDisclaimerAgree = () => {
    localStorage.setItem('primal_logic_disclaimer_agreed', 'true');
    setHasAgreedToDisclaimer(true);
  };

  // Set global Toast display function
  useEffect(() => {
    (window as any).showToast = (message: string) => {
      setToastMessage(message);
    };
    return () => {
      delete (window as any).showToast;
    };
  }, []);

  // Check authentication state
  useEffect(() => {
    if (isSupabaseAvailable() && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        // Show auth screen if no session (optional: uncomment to make it required)
        // if (!session) {
        //   setShowAuth(true);
        // }
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session) {
          setShowAuth(false);
        }
      });
    }
  }, []);

  // Apply pixel art UI
  useEffect(() => {
    if (isPixelArtEnabled) {
      document.documentElement.setAttribute('data-pixel-art', 'true');
    } else {
      document.documentElement.removeAttribute('data-pixel-art');
    }
  }, [isPixelArtEnabled]);

  // Listen to pixel art UI change events
  useEffect(() => {
    const handleDotUIChange = () => {
      const enabled = localStorage.getItem('primal_logic_dot_ui_enabled') === 'true';
      setIsPixelArtEnabled(enabled);
    };
    window.addEventListener('dotUIChanged', handleDotUIChange);
    return () => {
      window.removeEventListener('dotUIChanged', handleDotUIChange);
    };
  }, []);

  // Sync from localStorage to Supabase on app startup
  useEffect(() => {
    if (session || !isSupabaseAvailable()) {
      syncLocalStorageToSupabase();
    }
  }, [syncLocalStorageToSupabase, session]);

  // Listen to language change events and re-render all screens
  const [languageChangeKey, setLanguageChangeKey] = useState(0);
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      // Force re-render on language change
      setLanguageChangeKey((prev) => prev + 1);
      // Also reload (to ensure changes are reflected)
      setTimeout(() => {
        window.location.reload();
      }, 100);
    };
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // Listen to screen navigation events (e.g., navigation from ProfileScreen to UI settings screen)
  useEffect(() => {
    const handleNavigate = (event: CustomEvent<string>) => {
      const screen = event.detail as Screen;
      if (
        [
          'home',
          'profile',
          'history',
          'labs',
          'settings',
          'userSettings',
          'streakTracker',
          'customFood',
          'community',
          'diary',
          'stats',
          'auth',
          'privacy',
          'terms',
          'dataExport',
          'dataImport',
          'dataDelete',
          'feedback',
          'consent',
          'onboarding',
          'language',
          'salt',
          'carbTarget',
          'nutrientCustom',
          'gift',
          'shop',
          'recipe',
          'healthDevice',
          'ifThenRules',
          'paywall',
          // 'input' temporarily removed (Antigravity recovery)
        ].includes(screen)
      ) {
        setCurrentScreen(screen);
        // Notify data update on screen transition (prompt recalculation in each screen)
        window.dispatchEvent(new CustomEvent('screenChanged'));
      }
    };

    window.addEventListener('navigateToScreen', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigateToScreen', handleNavigate as EventListener);
    };
  }, []);

  // Update URL hash on screen transition
  useEffect(() => {
    // Don't keep consent/onboarding in URL (since it's initial flow)
    if (currentScreen !== 'consent' && currentScreen !== 'onboarding') {
      window.history.replaceState(null, '', `#${currentScreen}`);
    }
  }, [currentScreen]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Screen;
      // Ignore screens disabled by featureFlags
      if (hash && validScreens.includes(hash) && isScreenEnabled(hash) && hash !== currentScreen) {
        setCurrentScreen(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentScreen, validScreens]);

  // Stabilize callbacks (prevent infinite loop)
  const handleOpenFatTabReady = useCallback((callback: () => void) => {
    setOpenFatTabCallback(() => callback);
  }, []);

  const handleAddFoodReady = useCallback((callback: (foodItem: FoodItem) => void) => {
    setAddFoodCallback(() => callback);
  }, []);

  // ...

  // (Skip down to line 187)
  return (
    <>
      {!hasAgreedToDisclaimer && <DisclaimerModal onAgree={handleDisclaimerAgree} />}
      {/* Error notification */}
      {error && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 2000,
            maxWidth: '90%',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span>⚠�E�E{error}</span>
          <button
            onClick={clearError}
            style={{
              background: 'none',
              border: 'none',
              color: '#dc2626',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0',
              lineHeight: '1',
            }}
          >
            ×          </button>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            zIndex: 2000,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span className="animate-spin">⏳</span>
          <span>Processing...</span>
        </div>
      )}

      {/* Toast notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      <div className="app-container" key={languageChangeKey}>
        {/* Main Content */}
        <div className="app-content" key={`screen-${currentScreen}`}>
          {currentScreen === 'consent' && (
            <ConsentScreen
              onAccept={() => setCurrentScreen('onboarding')}
              onDecline={() => {
                alert('You must agree to the Privacy Policy and Terms of Service.');
              }}
            />
          )}
          {currentScreen === 'onboarding' && (
            <OnboardingScreen
              onComplete={() => {
                // After initial onboarding completion, guide to subscription registration (Paywall)
                // Note: Paywall can return to home with Close
                setCurrentScreen('paywall');
              }}
            />
          )}
          {currentScreen === 'home' && (
            <HomeScreen
              onOpenFatTabReady={handleOpenFatTabReady}
              onAddFoodReady={handleAddFoodReady}
            />
          )}
          {currentScreen === 'profile' && <ProfileScreen />}
          {currentScreen === 'settings' && (
            <SettingsScreen
              onShowOnboarding={() => setCurrentScreen('onboarding')}
            />
          )}
          {currentScreen === 'userSettings' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyUserSettingsScreen />
            </Suspense>
          )}
          {currentScreen === 'history' && (
            <Suspense fallback={<LoadingFallback />}>
              <LazyHistoryScreen />
            </Suspense>
          )}
          {currentScreen === 'labs' && <LabsScreen />}
          {currentScreen === 'streakTracker' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyStreakTrackerScreen onBack={() => setCurrentScreen('labs')} />
            </Suspense>
          )}
          {currentScreen === 'customFood' && (
            <CustomFoodScreen
              onClose={() => setCurrentScreen('home')}
              onSave={() => {
                // Return to home screen after saving
                setCurrentScreen('home');
              }}
            />
          )}
          {currentScreen === 'community' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyCommunityScreen onBack={() => setCurrentScreen('labs')} />
            </Suspense>
          )}
          {currentScreen === 'diary' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyDiaryScreen onBack={() => setCurrentScreen('labs')} />
            </Suspense>
          )}
          {currentScreen === 'stats' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyStatsScreen />
            </Suspense>
          )}
          {currentScreen === 'auth' && (
            <AuthScreen onAuthSuccess={() => setCurrentScreen('home')} />
          )}
          {currentScreen === 'privacy' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyPrivacyPolicyScreen />
            </Suspense>
          )}
          {currentScreen === 'terms' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyTermsOfServiceScreen />
            </Suspense>
          )}
          {currentScreen === 'dataExport' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyDataExportScreen />
            </Suspense>
          )}
          {currentScreen === 'dataImport' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyDataImportScreen onBack={() => setCurrentScreen('settings')} />
            </Suspense>
          )}
          {currentScreen === 'dataDelete' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyDataDeleteScreen />
            </Suspense>
          )}
          {currentScreen === 'feedback' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyFeedbackScreen />
            </Suspense>
          )}
          {currentScreen === 'language' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyLanguageSettingsScreen onBack={() => setCurrentScreen('profile')} />
            </Suspense>
          )}
          {currentScreen === 'salt' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazySaltSettingsScreen onBack={() => setCurrentScreen('profile')} />
            </Suspense>
          )}
          {currentScreen === 'carbTarget' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyCarbTargetSettingsScreen onBack={() => setCurrentScreen('profile')} />
            </Suspense>
          )}
          {currentScreen === 'nutrientCustom' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyNutrientTargetCustomizationScreen onBack={() => setCurrentScreen('profile')} />
            </Suspense>
          )}
          {currentScreen === 'gift' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyGiftScreen onBack={() => setCurrentScreen('labs')} />
            </Suspense>
          )}
          {currentScreen === 'shop' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyShopScreen onBack={() => setCurrentScreen('labs')} />
            </Suspense>
          )}
          {currentScreen === 'recipe' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyRecipeScreen onBack={() => setCurrentScreen('home')} />
            </Suspense>
          )}
          {currentScreen === 'healthDevice' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyHealthDeviceScreen onBack={() => setCurrentScreen('labs')} />
            </Suspense>
          )}
          {/* InputScreen removed (Antigravity deleted it) */}
          {currentScreen === 'ifThenRules' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyIfThenRulesScreen />
            </Suspense>
          )}
          {currentScreen === 'paywall' && (
            <Suspense
              fallback={<LoadingFallback />}
            >
              <LazyPaywallScreen
                isOverlay={true}
                onUiAction={(action) => {
                  if (action === 'close' || action === 'subscribe') {
                    // Return to home on payment completion or close (actually need to check payment status)
                    setCurrentScreen('home');
                  }
                }}
              />
            </Suspense>
          )}
        </div>

        {/* Bottom Navigation */}
        <nav
          className="app-navigation"
          role="navigation"
          aria-label={t('nav.mainNavigationAriaLabel')}
        >
          <button
            className={`app-nav-button ${currentScreen === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('home')}
            aria-label={t('nav.homeAriaLabel')}
            aria-current={currentScreen === 'home' ? 'page' : undefined}
          >
            <span style={{ fontSize: '20px' }} aria-hidden="true">
              🏠
            </span>
            <span>{t('nav.home')}</span>
          </button>
          <button
            className={`app-nav-button ${currentScreen === 'history' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('history')}
            aria-label={t('nav.historyAriaLabel')}
            aria-current={currentScreen === 'history' ? 'page' : undefined}
          >
            <span style={{ fontSize: '20px' }} aria-hidden="true">
              📊
            </span>
            <span>{t('nav.history')}</span>
          </button>
          {isFeatureEnabled('labs') && (
            <button
              className={`app-nav-button ${currentScreen === 'labs' ? 'active' : ''}`}
              onClick={() => setCurrentScreen('labs')}
              aria-label={t('nav.labsAriaLabel')}
              aria-current={currentScreen === 'labs' ? 'page' : undefined}
            >
              <span style={{ fontSize: '20px' }} aria-hidden="true">
                🧪
              </span>
              <span>{t('nav.labs')}</span>
            </button>
          )}
          <button
            className={`app-nav-button ${currentScreen === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('profile')}
            aria-label={t('nav.profileAriaLabel')}
            aria-current={currentScreen === 'profile' ? 'page' : undefined}
          >
            <span style={{ fontSize: '20px' }} aria-hidden="true">
              ⚙️
            </span>
            <span>{t('nav.profile')}</span>
          </button>
        </nav>
      </div>
      {getFeatureDisplaySettings().aiSpeedDial && isFeatureEnabled('aiFeatures') && (
        <AISpeedDial
          onOpenFatTab={openFatTabCallback || undefined}
          onAddFood={addFoodCallback || undefined}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NutritionProvider>
        <AppContent />
      </NutritionProvider>
    </AppProvider>
  );
}

