export interface MemberSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  token_type: string;
  user: {
    id: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  };
}

interface SupabaseAuthResponse {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  expires_in?: number;
  token_type?: string;
  user?: MemberSession['user'];
  error?: string;
  error_description?: string;
  msg?: string;
  message?: string;
}

const STORAGE_KEY = 'inderoos-member-session';

const getAuthConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !key) {
    throw new Error('Supabase configuratie ontbreekt.');
  }

  return { url, key };
};

const getHeaders = (token?: string) => {
  const { key } = getAuthConfig();

  return {
    apikey: key,
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const createSessionFromPayload = (payload: SupabaseAuthResponse): MemberSession | null => {
  if (!payload.access_token || !payload.refresh_token || !payload.user) {
    return null;
  }

  const expiresAt = payload.expires_at ?? Math.floor(Date.now() / 1000) + (payload.expires_in ?? 3600);

  return {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
    expires_at: expiresAt,
    token_type: payload.token_type ?? 'bearer',
    user: payload.user,
  };
};

const extractError = (payload: SupabaseAuthResponse) => payload.error_description || payload.msg || payload.message || payload.error || 'Er ging iets mis met de login.';

const storeMemberSession = (session: MemberSession | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const hasSupabaseAuthConfig = () => Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

export const getStoredMemberSession = (): MemberSession | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as MemberSession;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const isSessionValid = (session: MemberSession | null) => {
  if (!session) {
    return false;
  }

  return session.expires_at > Math.floor(Date.now() / 1000);
};

export const clearStoredMemberSession = () => {
  storeMemberSession(null);
};

const requestAuth = async (path: string, options: RequestInit = {}) => {
  const { url } = getAuthConfig();
  const response = await fetch(`${url}/auth/v1/${path}`, options);
  const payload = (await response.json()) as SupabaseAuthResponse;

  if (!response.ok) {
    throw new Error(extractError(payload));
  }

  return payload;
};

export const signInMember = async (email: string, password: string) => {
  const payload = await requestAuth('token?grant_type=password', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const session = createSessionFromPayload(payload);

  if (!session) {
    throw new Error('Geen actieve sessie ontvangen van Supabase.');
  }

  storeMemberSession(session);
  return session;
};

export const signUpMember = async (fullName: string, email: string, password: string) => {
  const payload = await requestAuth('signup', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      email,
      password,
      data: {
        full_name: fullName,
      },
    }),
  });

  const session = createSessionFromPayload(payload);

  if (session) {
    storeMemberSession(session);
  }

  return {
    session,
    requiresEmailConfirmation: !session,
  };
};

export const signOutMember = async (session: MemberSession | null) => {
  if (session?.access_token) {
    await fetch(`${getAuthConfig().url}/auth/v1/logout`, {
      method: 'POST',
      headers: getHeaders(session.access_token),
    });
  }

  clearStoredMemberSession();
};

export const fetchMemberProfile = async (session: MemberSession) => {
  const payload = await requestAuth('user', {
    method: 'GET',
    headers: getHeaders(session.access_token),
  });

  return payload.user ?? session.user;
};
