import * as SecureStore from 'expo-secure-store';

async function saveCredentials(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getCredentials(key) {
  return await SecureStore.getItemAsync(key);
}

async function deleteCredentials(key) {
  await SecureStore.deleteItemAsync(key);
}

export { saveCredentials, getCredentials, deleteCredentials };
