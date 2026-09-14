export const ADMIN_EMAIL = 'Obaidullah1168@gmail.com';
export const DEFAULT_ADMIN_PASSWORD = 'Obaidullah1168@gmail.com';

export interface AdminAuthState {
  isAuthenticated: boolean;
  email: string | null;
  lastLogin: string | null;
}

const AUTH_STORAGE_KEY = 'manova_admin_auth_session';
const PASS_STORAGE_KEY = 'manova_admin_password';

export function getAdminAuthState(): AdminAuthState {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, email: null, lastLogin: null };
  }
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.isAuthenticated && parsed?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        return parsed;
      }
    } catch (e) {
      /* ignore */
    }
  }
  return { isAuthenticated: false, email: null, lastLogin: null };
}

export function setAdminLoginSession(email: string): void {
  const session: AdminAuthState = {
    isAuthenticated: true,
    email,
    lastLogin: new Date().toISOString(),
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAdminLoginSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getStoredAdminPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_PASSWORD;
  return localStorage.getItem(PASS_STORAGE_KEY) || DEFAULT_ADMIN_PASSWORD;
}

export function updateAdminPassword(newPassword: string): void {
  localStorage.setItem(PASS_STORAGE_KEY, newPassword);
}
