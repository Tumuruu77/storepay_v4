import * as SecureStore from 'expo-secure-store';

// Accept any JSON-serializable value
export async function setSecretItem<T = unknown>(key: string, value: T) {
  await SecureStore.setItemAsync(key, JSON.stringify(value), {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function getSecretItem<T = unknown>(key: string): Promise<T | null> {
  const raw = await SecureStore.getItemAsync(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function removeSecretItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}
