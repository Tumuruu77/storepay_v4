import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function OrderDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Order Details</Text>
      <Text style={{ color: '#6b7280', marginBottom: 16 }}>Order ID: {id}</Text>
      <Pressable onPress={() => router.back()} style={{ backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 }}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Back</Text>
      </Pressable>
    </View>
  );
}
