import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const useTokenPush = () => {
  async function registerForPushNotificationsAsync() {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus === 'granted') {
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Failed to get push token for push notification!');
    }
    return token;
  }

  const handleGestionToken = async () => {
    const token = await registerForPushNotificationsAsync();
    if (!token) return;

      const tokensRef = collection(db, 'userTokens');
      const q = query(tokensRef, where('token', '==', token));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const newTokenRef = doc(collection(db, 'userTokens'));
        await setDoc(newTokenRef, { token });
      
    } else {
      console.log('Not an iOS device, token not saved');
    }
  };

  return { handleGestionToken };
};

export default useTokenPush;
