import * as SecureStore from "expo-secure-store";

//@ts-ignore
async function saveCredentials(key, value) {
  await SecureStore.setItemAsync(key, value);
}
//@ts-ignore
async function getCredentials(key) {
  return await SecureStore.getItemAsync(key);
}
//@ts-ignore
async function deleteCredentials(key) {
  await SecureStore.deleteItemAsync(key);
}

export { deleteCredentials, getCredentials, saveCredentials };
