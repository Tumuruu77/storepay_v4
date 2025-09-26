/* eslint-env node */
import { ExpoConfig } from 'expo/config';

type EnvKey = 'prod' | 'staging' | 'dev' | 'local';
type Conf = { host: string; ws: string; cid: string; cs: string };

const defineConfig = (): ExpoConfig => {
  // Access Node's process via globalThis to avoid needing @types/node in typecheck
  const APP_ENV: EnvKey = (((globalThis as any).process?.env?.APP_ENV) as EnvKey) ?? 'prod';

  const MAP: Record<EnvKey, Conf> = {
    prod:    { host: 'https://api.v4.storepay.mn',  ws: 'wss://ws.v4.storepay.mn/graphql',     cid: 'public', cs: 'public_secret' },
    staging: { host: 'https://api.storepay.global', ws: 'wss://socket.storepay.global/graphql', cid: 'public', cs: 'public_secret' },
    dev:     { host: 'http://127.0.0.1:3000',       ws: 'ws://192.168.0.103:8080/graphql',      cid: 'public', cs: 'public_secret' },
    local:   { host: 'http://localhost:3000',       ws: 'ws://localhost:8080/graphql',          cid: 'public', cs: 'public_secret' },
  };

  const chosen = MAP[APP_ENV] ?? MAP.prod;

  return {
    name: 'storepay_v4',
    slug: 'storepay_v4',
    scheme: 'storepayv4',
    userInterfaceStyle: 'automatic',
    extra: {
      APP_ENV,
      DEFAULT_ENV: chosen,
      GRAPHQL_HTTP_URL: `${chosen.host}/graphql`,
      GRAPHQL_WS_URL: chosen.ws,
    },
  };
};

export default defineConfig;
