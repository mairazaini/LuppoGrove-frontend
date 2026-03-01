/**
 * Authentication Context for LuppoGrove
 * 
 * Provides global authentication state and methods to all components
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, AuthState, SSOProvider } from '../services/auth';

interface AuthContextType extends AuthState {
  loginWithHaka: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsStudent: () => Promise<void>; // For demo purposes
  logout: () => Promise<void>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>(() => 
    authService.getAuthState()
  );

  // Initialize auth state on mount
  useEffect(() => {
    const state = authService.getAuthState();
    setAuthState(state);
  }, []);

  // Handle OAuth callback (if present in URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const provider = params.get('provider') as SSOProvider;

    if (code && state && provider) {
      handleOAuthCallback(code, state, provider);
    }
  }, []);

  const handleOAuthCallback = async (
    code: string,
    state: string,
    provider: SSOProvider
  ) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const user = await authService.handleCallback(code, state, provider);
      
      const newState = authService.getAuthState();
      setAuthState(newState);

      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Redirect based on user role
      if (user.role === 'teacher') {
        window.location.href = '/teacher';
      } else if (user.role === 'company') {
        window.location.href = '/company';
      } else if (user.role === 'student') {
        window.location.href = '/student';
      }
    } catch (error) {
      console.error('OAuth callback failed:', error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      alert('Authentication failed. Please try again.');
      window.location.href = '/login';
    }
  };

  const loginWithHaka = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.loginWithHaka();
    } catch (error) {
      console.error('Haka login failed:', error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      alert('Login failed. Please try again.');
    }
  };

  const loginWithGoogle = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.loginWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      alert('Login failed. Please try again.');
    }
  };

  const loginAsStudent = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.mockStudentLogin();
    } catch (error) {
      console.error('Student login failed:', error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setAuthState({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshAuth = () => {
    const state = authService.getAuthState();
    setAuthState(state);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loginWithHaka,
        loginWithGoogle,
        loginAsStudent,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
