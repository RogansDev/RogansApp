import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';

const useTokenPush = () => {
  const { name, user_id, email, document, 
    role, urlphoto,lastname, phone, birthdate,
   } = useSelector((state: any) => state.user)
  async function registerForPushNotificationsAsync() {
    let token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  const handleGestionToken = async () => {
    const token = await registerForPushNotificationsAsync();
    console.log('token', token)
    if (!token) return;
    const tokensRef = query(
      collection(db, "users"),
      where("token", "==", token)
    );
    const plataforma = Platform.OS;
    const querySnapshot = await getDocs(tokensRef);
    if (querySnapshot.empty) {
      /// start token
      try {
        const userQuery = query(
          collection(db, "users"),
          where("user_id", "==", user_id)
        );
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const firstDoc = querySnapshot.docs[0];
          const usersDocument = doc(db, 'users', firstDoc.id);
          try {
            const user = {
              user_id: user_id ?? '',
              email: email ?? '',
              role: role ?? '',
              urlphoto: urlphoto ?? '',
              document: document ?? '',
              name: name ?? '',
              lastname: lastname ?? '',
              phone: phone ?? '',
              birthdate: birthdate ?? '',
              token: token ?? '',
              plataforma: plataforma ?? ''
            };
            await updateDoc(usersDocument, user);
            console.log('token OK');
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('token not saved update');
        }
      } catch (error) {
        console.error(error);
      }
      /// end token 
    } else {
      console.log('token not saved');
    }
  };
  return { handleGestionToken };
};

export default useTokenPush;
