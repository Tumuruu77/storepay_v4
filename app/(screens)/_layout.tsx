import { Stack } from 'expo-router';
import React from 'react';

export default function StackGroupLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="orders/index" options={{ title: 'Orders' }} />
      <Stack.Screen name="orders/[id]" options={{ title: 'Order Details' }} />
      <Stack.Screen name="profile/index" options={{ title: 'Profile' }} />
    </Stack>
  );
}
