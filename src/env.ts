import Constants from 'expo-constants';

type EnvKey = 'prod' | 'staging' | 'dev' | 'local';
type Conf = { host: string; ws: string; cid: string; cs: string };

const extra = Constants.expoConfig?.extra as {
  APP_ENV: EnvKey;
  DEFAULT_ENV: Conf;
  GRAPHQL_HTTP_URL: string;
  GRAPHQL_WS_URL: string;
};

export const ENV = {
  APP_ENV: extra.APP_ENV,
  HTTP_URL: extra.GRAPHQL_HTTP_URL,
  WS_URL: extra.GRAPHQL_WS_URL,
  CID: extra.DEFAULT_ENV.cid,
  CS: extra.DEFAULT_ENV.cs,
};
