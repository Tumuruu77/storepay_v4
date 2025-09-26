import { create } from 'zustand';

import { getSecretItem, removeSecretItem, setSecretItem } from '@/storage/secure';

export type AuthState = {
  token: string | null;
  initializing: boolean;
  // actions
  init: () => Promise<void>;
  setToken: (t: string | null) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const TOKEN_KEY = 'auth_token';

export const useAuth = create<AuthState>((set, get) => ({
  token: null,
  initializing: true,

  init: async () => {
    try {
      const existing = await getSecretItem<string | null>(TOKEN_KEY);
      set({ token: existing ?? null, initializing: false });
    } catch {
      set({ token: null, initializing: false });
    }
  },

  setToken: async (t) => {
    set({ token: t });
    if (t) await setSecretItem(TOKEN_KEY, t);
    else await removeSecretItem(TOKEN_KEY);
  },

  // Real API login using password grant
  login: async (username: string, password: string) => {
    const { loginWithPassword } = await import('../auth/api');
    const res = await loginWithPassword(username, password);
    const accessToken = res.access_token;
    if (!accessToken) {
      const err: any = new Error('No access token in response');
      err.code = 'EAUTH';
      err.body = res as any;
      throw err;
    }

    await get().setToken(accessToken);

    // Persist some optional values used by biometric/remember flows (safe no-ops if unused)
    await setSecretItem('biometricName', username);
    await setSecretItem('hasLaunched', true as any);
  },

  logout: async () => {
    await removeSecretItem(TOKEN_KEY);
    set({ token: null });
  },
}));