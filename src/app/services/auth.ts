/**
 * Authentication Service for LuppoGrove
 * 
 * Handles SSO authentication for:
 * - Universities: Haka Federation (SAML 2.0 via Microsoft Entra ID)
 * - Companies: Google Workspace SSO (OAuth 2.0)
 * 
 * IMPORTANT SECURITY NOTES:
 * - Real SSO requires backend OAuth/SAML endpoints
 * - This implementation provides the frontend flow structure
 * - Backend must handle token exchange and session management
 * 
 * Environment Variables Required:
 * - VITE_HAKA_SSO_URL: Haka/Microsoft SSO endpoint
 * - VITE_GOOGLE_CLIENT_ID: Google OAuth client ID
 * - VITE_AUTH_REDIRECT_URI: OAuth callback URL
 * - VITE_BACKEND_AUTH_URL: Backend authentication API
 */

const HAKA_SSO_URL = import.meta.env.VITE_HAKA_SSO_URL || 'https://auth.example.fi/haka/login';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const AUTH_REDIRECT_URI = import.meta.env.VITE_AUTH_REDIRECT_URI || window.location.origin + '/auth/callback';
const BACKEND_AUTH_URL = import.meta.env.VITE_BACKEND_AUTH_URL || 'http://localhost:8000/auth';

/**
 * User role types based on stakeholder hierarchy
 */
export type UserRole = 'teacher' | 'student' | 'company';

/**
 * User data structure
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization: string;
  avatar?: string;
  
  // Haka-specific fields (funetEduPerson schema)
  hakaId?: string;
  homeOrganization?: string;
  eduPersonAffiliation?: string[];
  
  // Google-specific fields
  googleId?: string;
  companyDomain?: string;
}

/**
 * Authentication tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

/**
 * Authentication state
 */
export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * SSO Provider types
 */
export type SSOProvider = 'haka' | 'google';

/**
 * Authentication Service Class
 */
class AuthService {
  private storageKey = 'luppogrove_auth';

  /**
   * Initialize authentication state from localStorage
   */
  getAuthState(): AuthState {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        return this.getDefaultState();
      }

      const state: AuthState = JSON.parse(stored);
      
      // Check if token is expired
      if (state.tokens && state.tokens.expiresAt < Date.now()) {
        this.clearAuth();
        return this.getDefaultState();
      }

      return state;
    } catch (error) {
      console.error('Failed to load auth state:', error);
      return this.getDefaultState();
    }
  }

  /**
   * Get default unauthenticated state
   */
  private getDefaultState(): AuthState {
    return {
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }

  /**
   * Save authentication state to localStorage
   */
  private saveAuthState(state: AuthState): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save auth state:', error);
    }
  }

  /**
   * Clear authentication data
   */
  clearAuth(): void {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Initiate Haka/Microsoft SSO Login
   * 
   * For production: This redirects to Haka federation endpoint
   * The backend must be configured as a SAML Service Provider
   */
  async loginWithHaka(): Promise<void> {
    // For development: Use mock authentication
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
      return this.mockHakaLogin();
    }

    // Build SAML authentication request
    const params = new URLSearchParams({
      client_id: 'luppogrove',
      redirect_uri: AUTH_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid profile email eduPersonAffiliation',
      state: this.generateState(),
    });

    // Redirect to Haka SSO
    window.location.href = `${HAKA_SSO_URL}?${params.toString()}`;
  }

  /**
   * Initiate Google OAuth SSO Login
   * 
   * For production: Use Google Identity Services (GIS) or OAuth 2.0
   */
  async loginWithGoogle(): Promise<void> {
    // For development: Use mock authentication
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
      return this.mockGoogleLogin();
    }

    // Build OAuth authorization URL
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: AUTH_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid profile email',
      state: this.generateState(),
      access_type: 'offline',
      prompt: 'consent',
    });

    // Redirect to Google OAuth
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  /**
   * Handle OAuth/SAML callback
   * 
   * Called when user returns from SSO provider
   */
  async handleCallback(
    code: string,
    state: string,
    provider: SSOProvider
  ): Promise<User> {
    // Verify state to prevent CSRF
    const storedState = sessionStorage.getItem('oauth_state');
    if (state !== storedState) {
      throw new Error('Invalid OAuth state - possible CSRF attack');
    }
    sessionStorage.removeItem('oauth_state');

    // Exchange authorization code for tokens via backend
    const response = await fetch(`${BACKEND_AUTH_URL}/callback/${provider}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, redirect_uri: AUTH_REDIRECT_URI }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    
    // Save authentication state
    const authState: AuthState = {
      user: data.user,
      tokens: data.tokens,
      isAuthenticated: true,
      isLoading: false,
    };

    this.saveAuthState(authState);
    
    return data.user;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    const state = this.getAuthState();
    
    if (state.tokens) {
      // Revoke tokens on backend
      try {
        await fetch(`${BACKEND_AUTH_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.tokens.accessToken}`,
          },
        });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }

    this.clearAuth();
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await fetch(`${BACKEND_AUTH_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const tokens: AuthTokens = await response.json();
    
    // Update stored tokens
    const state = this.getAuthState();
    state.tokens = tokens;
    this.saveAuthState(state);

    return tokens;
  }

  /**
   * Generate random state for CSRF protection
   */
  private generateState(): string {
    const state = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('oauth_state', state);
    return state;
  }

  // ==================== MOCK AUTHENTICATION FOR DEVELOPMENT ====================

  /**
   * Mock Haka login (for development/demo)
   */
  private mockHakaLogin(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: 'teacher_' + Math.random().toString(36).substr(2, 9),
          email: 'jonas.helander@aalto.fi',
          name: 'Jonas Helander',
          role: 'teacher',
          organization: 'Aalto University',
          homeOrganization: 'aalto.fi',
          eduPersonAffiliation: ['faculty', 'member'],
          hakaId: 'urn:mace:terena.org:schac:personalUniqueCode:fi:aalto.fi:staff:123456',
        };

        const mockTokens: AuthTokens = {
          accessToken: 'mock_haka_access_token_' + Date.now(),
          refreshToken: 'mock_haka_refresh_token',
          expiresAt: Date.now() + 3600000, // 1 hour
        };

        const authState: AuthState = {
          user: mockUser,
          tokens: mockTokens,
          isAuthenticated: true,
          isLoading: false,
        };

        this.saveAuthState(authState);
        
        // Redirect to teacher dashboard
        window.location.href = '/teacher';
        
        resolve();
      }, 1500); // Simulate network delay
    });
  }

  /**
   * Mock Google login (for development/demo)
   */
  private mockGoogleLogin(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: 'company_' + Math.random().toString(36).substr(2, 9),
          email: 'alex.chen@konecranes.com',
          name: 'Alex Chen',
          role: 'company',
          organization: 'Konecranes',
          companyDomain: 'konecranes.com',
          googleId: '1234567890',
          avatar: 'https://i.pravatar.cc/150?u=alex',
        };

        const mockTokens: AuthTokens = {
          accessToken: 'mock_google_access_token_' + Date.now(),
          refreshToken: 'mock_google_refresh_token',
          expiresAt: Date.now() + 3600000, // 1 hour
        };

        const authState: AuthState = {
          user: mockUser,
          tokens: mockTokens,
          isAuthenticated: true,
          isLoading: false,
        };

        this.saveAuthState(authState);
        
        // Redirect to company dashboard
        window.location.href = '/company';
        
        resolve();
      }, 1500); // Simulate network delay
    });
  }

  /**
   * Mock student login (for testing)
   */
  mockStudentLogin(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: 'student_' + Math.random().toString(36).substr(2, 9),
          email: 'sara.korhonen@aalto.fi',
          name: 'Sara Korhonen',
          role: 'student',
          organization: 'Aalto University',
          homeOrganization: 'aalto.fi',
          eduPersonAffiliation: ['student', 'member'],
        };

        const mockTokens: AuthTokens = {
          accessToken: 'mock_student_access_token_' + Date.now(),
          expiresAt: Date.now() + 3600000,
        };

        const authState: AuthState = {
          user: mockUser,
          tokens: mockTokens,
          isAuthenticated: true,
          isLoading: false,
        };

        this.saveAuthState(authState);
        
        window.location.href = '/student';
        
        resolve();
      }, 1500);
    });
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export class for testing
export default AuthService;
