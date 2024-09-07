import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';

const useTokenPush = () => {

  const { name, user_id, email, document, 
    role, urlphoto,lastname, phone, birthdate,
   } = useSelector((state: any) => state.user);
  async function registerForPushNotificationsAsync() {
    let token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  const handleGestionToken = async () => {

    console.log('me ejecuto');
    const token = await registerForPushNotificationsAsync();
    const plataforma = Platform.OS;
    console.log('token', token)
    console.log('plataforma', plataforma)


    try {
      const userQuery = query(
        collection(db, "users"),
        where("user_id", "==", user_id)
      );
      const querySnapshot = await getDocs(userQuery);      

      if (querySnapshot.empty) {
        console.log('usuario no encontrado')
      } else {
        let usuario;
        querySnapshot.forEach((doc) => {
          usuario = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          console.log('Usuario encontrado:', JSON.stringify(usuario, null, 5));
                  
        });
        // @ts-ignore
        if(!usuario[0].token){
          // @ts-ignore
          const usersDocument = doc(db, 'users', usuario[0].id);
          
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
          

        }  
      }
    } catch (error) {
      console.log('error', error);
    }

  };
  return { handleGestionToken };
};

export default useTokenPush;
