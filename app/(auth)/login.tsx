/* eslint-disable simple-import-sort/imports */
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { useAuth } from '@/store/useAuth';
import { getSecretItem, removeSecretItem, setSecretItem } from '@/storage/secure';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidError, setInvalidError] = useState<string | boolean>(false);
  const [isRememberChecked, setIsRememberChecked] = useState(false);

  // Biometric stubs (wire real support later)
  const bioSupported = false;
  const bioKeyExists = false;
  const biometricModalRef = useRef<any>(null);

  const login = useAuth((s) => s.login);
  const router = useRouter();

  useEffect(() => {
    // preload remembered username if exists
    (async () => {
      const remembered = await getSecretItem<string>('username');
      if (remembered) {
        setUsername(remembered);
        setIsRememberChecked(true);
      }
    })();
  }, []);

  const onPressLogin = async () => {
    if (!password || password.length < 8) return setInvalidError(true);
    const storedUsername = await getSecretItem<string>('biometricName');

    await login(username, password)
      .then(async () => {
        await setSecretItem('biometricName', username);
        await setSecretItem('hasLaunched', true as any);
        setInvalidError(false);
        if (isRememberChecked || bioSupported) await setSecretItem('username', username);
        else await removeSecretItem('username');

        if ((bioSupported && !bioKeyExists) || (bioSupported && storedUsername !== username)) {
          biometricModalRef.current?.open?.();
        } else {
          router.replace('/');
        }
      })
      .catch((e: any) => {
        if (e?.code === 'EAUTH' && e?.body?.error !== 'invalid_grant') return setInvalidError(e.body.error);
        setInvalidError(true);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Email or Phone"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.row}>
        <Switch value={isRememberChecked} onValueChange={setIsRememberChecked} />
        <Text>Remember me</Text>
      </View>
      {invalidError ? (
        <Text style={styles.error}>{typeof invalidError === 'string' ? invalidError : 'Invalid credentials'}</Text>
      ) : null}
      <Pressable onPress={onPressLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, alignItems: 'stretch', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  button: { backgroundColor: '#111827', padding: 14, borderRadius: 10, marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  error: { color: '#dc2626', textAlign: 'center' },
});
