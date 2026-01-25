/**
 * CarnivoreOS - Authentication Screen
 *
 * Login, Sign Up, and Password Reset functionality
 */

import { useState, useEffect } from 'react';
import { supabase, isSupabaseAvailable } from '../lib/supabaseClient';
import { useTranslation } from '../utils/i18n';
import './AuthScreen.css';

type AuthMode = 'login' | 'signup' | 'reset';

interface AuthScreenProps {
  onAuthSuccess?: () => void;
  isEmbedded?: boolean;
}

export default function AuthScreen({ onAuthSuccess, isEmbedded = false }: AuthScreenProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Check session
    if (isSupabaseAvailable() && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session && onAuthSuccess) {
          onAuthSuccess();
        }
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session && onAuthSuccess) {
          onAuthSuccess();
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [onAuthSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!isSupabaseAvailable() || !supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      // Success handled by subscription
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setLoading(true);

    if (!isSupabaseAvailable() || !supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      setMessage('Check your email for the confirmation link.');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseAvailable()) {
    return (
      <div className={`auth-container ${isEmbedded ? 'embedded' : ''}`}>
        <p className="auth-error">Authentication service is not available.</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className={`auth-container ${isEmbedded ? 'embedded' : ''}`}>
        <p className="auth-success">You are signed in as {session.user.email}</p>
        <button
          onClick={() => supabase?.auth.signOut()}
          className="auth-button secondary"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className={`auth-container ${isEmbedded ? 'embedded' : ''}`}>
      <h2>
        {mode === 'login' && t('auth.login')}
        {mode === 'signup' && t('auth.signup')}
        {mode === 'reset' && t('auth.resetPassword')}
      </h2>

      {error && <div className="auth-error">{error}</div>}
      {message && <div className="auth-message">{message}</div>}

      <form onSubmit={mode === 'login' ? handleLogin : handleSignup}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {mode === 'signup' && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="auth-links">
        {mode === 'login' ? (
          <p>
            Don't have an account?{' '}
            <button className="link-button" onClick={() => setMode('signup')}>
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button className="link-button" onClick={() => setMode('login')}>
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
