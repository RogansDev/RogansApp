import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';

const useTokenPush = () => {
  const { name, user_id, email, document } = useSelector((state: any) => state.user)
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
    console.log('token', token)
    if (!token) return;

    console.log('object 1')
      const tokensRef = collection(db, 'userTokens');
      const q = query(tokensRef, where('token', '==', token));
      const plataforma = Platform.OS;
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {

        console.log('if into')

        const data = { 
          token: token ? token : '', 
          name: name ? name : '', 
          document: document? document : '',
          user_id: user_id ? user_id : '', 
          email: email ? email : '',
          plataforma: plataforma ? plataforma : ''
        }

        try {
          addDoc(collection(db, "userTokens"), data);
        } catch (error) {
          console.log('error al guardar token', error)
        }
        
      
    } else {
      console.log('token not saved');
    }
  };

  return { handleGestionToken };
};

export default useTokenPush;
