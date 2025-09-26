import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>This is a placeholder profile screen in the Stack group.</Text>
      <Pressable onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  button: { backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
