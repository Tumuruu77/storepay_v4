import { ApolloLink, from,HttpLink } from '@apollo/client';

import { ENV } from '@/env';
import { useAuth } from '@/store/useAuth';

const auth = new ApolloLink((operation, forward) => {
  const token = useAuth.getState().token;
  operation.setContext(({ headers = {} }) => ({
    headers: { ...headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  }));
  return forward!(operation);
});

const http = new HttpLink({ uri: ENV.HTTP_URL });

export const link = from([auth, http]);