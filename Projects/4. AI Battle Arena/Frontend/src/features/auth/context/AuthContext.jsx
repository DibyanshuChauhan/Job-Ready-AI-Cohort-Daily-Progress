import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth.api.js';
import { useAuth } from '../hooks/useAuth.js';

// ── Context shape ──────────────────────────────────────────────────────────
const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the whole app and holds the authenticated user.
 * On mount it calls /me to hydrate the user from the JWT cookie if one exists.
 */
export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [isHydrating, setIsHydrating] = useState(true); // true while /me is in-flight

  // Hydrate user from JWT cookie on first load
  useEffect(() => {
    const hydrate = async () => {
      try {
        const data = await authApi.me();
        setUser(data?.user ?? null);
      } catch {
        setUser(null); // Not logged in — that's fine
      } finally {
        setIsHydrating(false);
      }
    };

    // Also handle ?auth=success redirect from Google OAuth callback
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'success') {
      // Remove query param from URL cleanly
      window.history.replaceState({}, '', window.location.pathname);
    }

    hydrate();
  }, []);

  const handleAuthSuccess = useCallback((incomingUser) => {
    setUser(incomingUser);
  }, []);

  const handleLogout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const {
    isLoading,
    error,
    clearError,
    register,
    login,
    loginWithGoogle,
  } = useAuth(handleAuthSuccess);

  const value = {
    user,
    isHydrating,
    isLoading,
    error,
    clearError,
    register,
    login,
    logout: handleLogout,
    loginWithGoogle,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Convenience hook ──────────────────────────────────────────────────────
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within <AuthProvider>');
  }
  return ctx;
}
