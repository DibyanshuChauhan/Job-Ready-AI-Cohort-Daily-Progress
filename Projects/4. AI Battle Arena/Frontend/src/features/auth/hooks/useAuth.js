import { useState, useCallback } from 'react';
import { authApi } from '../api/auth.api.js';

/**
 * useAuth — encapsulates register, login, logout, and Google OAuth actions.
 * State is managed here and lifted to AuthContext for global access.
 */
export function useAuth(onAuthSuccess) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState('');

  const clearError = useCallback(() => setError(''), []);

  // ── Register ──────────────────────────────────────────────────────────
  const register = useCallback(async (email, password, displayName) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await authApi.register(email, password, displayName);
      onAuthSuccess?.(data.user);
      return data;
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Registration failed. Please try again.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [onAuthSuccess]);

  // ── Login ─────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await authApi.login(email, password);
      onAuthSuccess?.(data.user);
      return data;
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Invalid email or password.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [onAuthSuccess]);

  // ── Logout ────────────────────────────────────────────────────────────
  const logout = useCallback(async (onLogoutSuccess) => {
    setIsLoading(true);
    try {
      await authApi.logout();
      onLogoutSuccess?.();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Google OAuth ──────────────────────────────────────────────────────
  const loginWithGoogle = useCallback(() => {
    authApi.redirectToGoogle();
  }, []);

  return { isLoading, error, clearError, register, login, logout, loginWithGoogle };
}
