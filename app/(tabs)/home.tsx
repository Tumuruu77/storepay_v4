import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/store/useAuth';

export default function Home() {
  const logout = useAuth((s) => s.logout);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StorePay</Text>
      <Text style={styles.subtitle}>You are logged in</Text>
      <Link href="/orders" asChild>
        <Pressable accessibilityRole="button" style={styles.button}>
          <Text style={styles.buttonText}>View Orders</Text>
        </Pressable>
      </Link>
      <Pressable onPress={logout} style={styles.button}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, color: '#6b7280' },
  button: { backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
