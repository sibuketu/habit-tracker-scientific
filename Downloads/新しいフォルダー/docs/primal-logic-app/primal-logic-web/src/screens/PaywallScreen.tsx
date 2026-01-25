/**
 * CarnivoreOS - Paywall Screen
 *
 * Screen to encourage access to premium features.
 * Leads to Stripe payment (Web).
 */

import React, { useState } from 'react';
import { useTranslation } from '../utils/i18n';
import './PaywallScreen.css';

import { httpsCallable } from 'firebase/functions';
import { functions, auth } from '../lib/firebaseClient';
import { signInAnonymously } from 'firebase/auth';

interface PaywallScreenProps {
  onUiAction?: (action: 'close' | 'subscribe') => void;
  isOverlay?: boolean; // When displaying as modal
}

export default function PaywallScreen({ onUiAction, isOverlay = false }: PaywallScreenProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('year'); // Default is yearly (recommended)

  async function ensureSignedIn() {
    if (!auth) return;
    if (auth.currentUser) return;
    // Paywall's Callable Function requires context.auth, so ensure token with anonymous login
    await signInAnonymously(auth);
  }

  // Redirect to Stripe Checkout
  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // Fallback for local development (when Firebase not configured)
      if (import.meta.env.DEV && !functions) {
        console.warn('Firebase Functions not initialized. Mocking success.');
        setTimeout(() => {
          setIsLoading(false);
          alert('[Dev Mode] Firebase not connected, completing in demo mode.');
          if (onUiAction) onUiAction('subscribe');
        }, 1000);
        return;
      }

      // Redirect URLs for success and cancel (use current URL)
      const currentUrl = window.location.origin;
      const successUrl = `${currentUrl}/?payment_success=true`;
      const cancelUrl = `${currentUrl}/?payment_cancel=true`;

      // Ensure Firebase Auth (anonymous) ↁEPrevent Callable Function from failing with unauthenticated
      await ensureSignedIn();

      // Call Firebase Function
      const createStripeCheckoutSession = httpsCallable(functions, 'createStripeCheckoutSession');
      const result = await createStripeCheckoutSession({
        successUrl,
        cancelUrl,
        interval: billingInterval,
      });

      const data = result.data as { url: string };

      if (data.url) {
        // Redirect to Stripe payment page
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from backend');
      }
    } catch (error: any) {
      console.error('Subscription Error:', error);

      // Error handling in dev mode (gentle)
      if (import.meta.env.DEV) {
        setTimeout(() => {
          setIsLoading(false);
          alert(`[Dev Mode] An error occurred, but proceeding as demo.\n${error.message}`);
          if (onUiAction) onUiAction('subscribe');
        }, 1000);
        return;
      }

      setIsLoading(false);
      alert(`Failed to start payment. Please try again later.\n${error.message || ''}`);
    }
  };

  const handleClose = () => {
    if (onUiAction) onUiAction('close');
  };

  return (
    <div className="paywall-screen" style={isOverlay ? { zIndex: 10000 } : {}}>
      {isOverlay && (
        <button className="paywall-close-button" onClick={handleClose}>
          ÁE        </button>
      )}

      <div className="paywall-header">
        <div className="paywall-header-content">
          <h1 className="paywall-title">UNLOCK PRIMAL</h1>
          <p className="paywall-subtitle">Unleash the CarnivOS</p>
        </div>
      </div>

      <div className="paywall-body">
        <div className="paywall-features">
          <div className="paywall-feature-item">
            <div className="paywall-feature-icon">🥩</div>
            <div className="paywall-feature-text">
              <h3>Unlimited Logging</h3>
              <p>Save and analyze unlimited correlation data of meals, weight, and health status.</p>
            </div>
          </div>
          <div className="paywall-feature-item">
            <div className="paywall-feature-icon">🧠</div>
            <div className="paywall-feature-text">
              <h3>Primal AI Assistant</h3>
              <p>Dedicated AI powered by Gemini Pro provides advice based on your metabolic data.</p>
            </div>
          </div>
          <div className="paywall-feature-item">
            <div className="paywall-feature-icon">📊</div>
            <div className="paywall-feature-text">
              <h3>Biohack Terminal</h3>
              <p>Integration with blood test data, detailed nutrient trend analysis (Labs feature).</p>
            </div>
          </div>
        </div>

        <div className="paywall-pricing-selector">
          <div
            className={`paywall-plan-option ${billingInterval === 'year' ? 'selected' : ''}`}
            onClick={() => setBillingInterval('year')}
          >
            <div className="plan-badge">BEST VALUE</div>
            <div className="plan-name">YEARLY ACCESS</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount">69.99</span>
              <span className="period">/year</span>
            </div>
            <div className="plan-saving">Just $5.83/month</div>
          </div>

          <div
            className={`paywall-plan-option ${billingInterval === 'month' ? 'selected' : ''}`}
            onClick={() => setBillingInterval('month')}
          >
            <div className="plan-name">MONTHLY ACCESS</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount">9.99</span>
              <span className="period">/month</span>
            </div>
            <div className="plan-subtext">Flexible billing</div>
          </div>
        </div>

        <div className="paywall-action-area">
          <button className="paywall-cta-button" onClick={handleSubscribe} disabled={isLoading}>
            {isLoading
              ? 'Processing...'
              : billingInterval === 'year'
                ? 'Start 7-Day Free Trial (Yearly)'
                : 'Start 7-Day Free Trial (Monthly)'}
          </button>

          <p className="paywall-terms">
            By starting the trial using the {billingInterval} plan, you agree to our
            <span
              onClick={() =>
                window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'terms' }))
              }
            >
              {' '}
              Terms{' '}
            </span>
            and
            <span
              onClick={() =>
                window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'privacy' }))
              }
            >
              {' '}
              Privacy Policy
            </span>
            . Cancel anytime 24h before trial ends.
          </p>
        </div>
      </div>
    </div>
  );
}

