import Constants from 'expo-constants';

import { ENV } from '@/env';
import { getSecretItem, setSecretItem } from '@/storage/secure';

const DEVICE_ID_KEY = 'device_id';

async function getOrCreateDeviceId(): Promise<string> {
  let id = await getSecretItem<string>(DEVICE_ID_KEY);
  if (!id) {
    id = 'dev-' + Math.random().toString(36).slice(2) + '-' + Date.now().toString(36);
    await setSecretItem(DEVICE_ID_KEY, id);
  }
  return id;
}

function tokenUrl(): string {
  try {
    const u = new URL(ENV.HTTP_URL);
    u.pathname = '/oauth/token';
    u.search = '';
    u.hash = '';
    return u.toString();
  } catch {
    return ENV.HTTP_URL.replace(/\/graphql$/, '/oauth/token');
  }
}

export type PasswordTokenResponse = {
  access_token: string;
  token_type: 'bearer' | string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
};

export async function loginWithPassword(username: string, password: string): Promise<PasswordTokenResponse> {
  const url = tokenUrl();
  const device_name = (Constants.deviceName as string | undefined) ?? 'unknown-device';
  const device_id = await getOrCreateDeviceId();

  const body = {
    grant_type: 'password',
    username,
    password,
    scope: 'public',
    client_id: ENV.CID,
    client_secret: ENV.CS,
    device_name,
    device_id,
  } as const;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let data: any = null;
    try { data = await res.json(); } catch { data = null; }
    const err: any = new Error(data?.error_description || data?.error || `Login failed (${res.status})`);
    err.status = res.status;
    err.body = data;
    throw err;
  }

  const data = (await res.json()) as PasswordTokenResponse;
  return data;
}
