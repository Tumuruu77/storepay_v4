import { ApolloProvider } from '@apollo/client/react';
import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

import { apollo } from '@/apollo/client';
import { useAuth } from '@/store/useAuth';

const AUTH_ROUTES = new Set(['login']);

export default function Root() {
  const token = useAuth((s) => s.token);
  const initializing = useAuth((s) => s.initializing);
  const init = useAuth((s) => s.init);
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // hydrate auth from secure storage on first mount
    init();
  }, [init]);

  useEffect(() => {
    // Avoid acting until segments are resolved to prevent premature redirects
    if (initializing || !segments?.length) return;

    const root = segments[0] ?? '';
    const inAuthRoute = AUTH_ROUTES.has(root);

    if (!token && !inAuthRoute) {
      if (pathname !== '/login') router.replace('/login');
    } else if (token && inAuthRoute) {
      if (pathname !== '/home') router.replace('/home');
    }
  }, [token, segments, initializing, pathname, router]);

  return (
    <ApolloProvider client={apollo}>
      <Stack screenOptions={{ headerShown: false }} />
    </ApolloProvider>
  );
}
