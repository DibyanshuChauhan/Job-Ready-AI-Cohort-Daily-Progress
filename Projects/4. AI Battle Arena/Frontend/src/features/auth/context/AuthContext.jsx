import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth.api.js';
import { useAuth } from '../hooks/useAuth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isHydrating, setIsHydrating] = useState(true);

  // Check if session cookie is valid on mount
  useEffect(() => {
    const hydrate = async () => {
      try {
        const data = await authApi.me();
        setUser(data?.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setIsHydrating(false);
      }
    };

    // Clean up query param after Google OAuth redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'success') {
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

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within <AuthProvider>');
  }
  return ctx;
}
