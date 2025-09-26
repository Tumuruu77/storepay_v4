import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function NotFound() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>This screen doesn't exist.</Text>
      <Link href="/home" style={{ color: '#2563eb' }}>Go to home</Link>
    </View>
  );
}
