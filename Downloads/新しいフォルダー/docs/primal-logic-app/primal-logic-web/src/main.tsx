import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';

// Suppress Stripe.js cross-origin frame errors (expected behavior)
window.addEventListener('error', (event) => {
  if (
    event.error?.name === 'SecurityError' &&
    (event.message?.includes('cross-origin') ||
      event.message?.includes('Blocked a frame') ||
      event.message?.includes('js.stripe.com'))
  ) {
    event.preventDefault();
    return false;
  }
});

// Suppress unhandled promise rejections from Stripe
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.name === 'SecurityError' ||
    (typeof event.reason === 'string' &&
      (event.reason.includes('cross-origin') ||
        event.reason.includes('js.stripe.com')))
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>
);

