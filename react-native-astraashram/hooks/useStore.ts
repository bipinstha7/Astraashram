import * as SecureStore from 'expo-secure-store';

export default function useStore() {
  async function saveStore(key: string, value: any) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getStore(key: string) {
    return SecureStore.getItemAsync(key);
  }

  async function clearStore(key: string) {
    return SecureStore.deleteItemAsync(key);
  }

  return { saveStore, getStore, clearStore };
}
