import { ApolloClient, InMemoryCache } from '@apollo/client';

import { link } from './links';
export const apollo = new ApolloClient({ link, cache: new InMemoryCache() });