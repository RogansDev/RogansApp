import { Text, View, Button } from 'react-native';
import useNotificationPush from '../hooks/useNotificationPush';

const  NotificationScreen = () => {

    const { notification, sendNotificationToManyDevices, sendNotificationToOneDevice, sendNotificationRegisterSuccess } = useNotificationPush();
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Titulo: {notification && notification.request.content.title} </Text>
        <Text>test body: {notification && notification.request.content.body}</Text>
        <Text>mi nombre es : {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button title="Touch one" onPress={sendNotificationToOneDevice}/>
      <Button title="Touch many" onPress={sendNotificationToManyDevices}/>
      <Button title="register" onPress={()=>sendNotificationRegisterSuccess('Rogans', 'Bienvenido a Rogans', { name: "Tony" })}/>
      
    </View>
  );
}

export default NotificationScreen;