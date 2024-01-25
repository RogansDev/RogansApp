import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushTokens, title, body, data) {
    const messages = expoPushTokens.map((token) => ({
      to: token,
      sound: 'default',
      title: title,
      body: body,
      data: data, // en el caso de registro seria data.name
    }));
  
    await Promise.all(
      messages.map((message) =>
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })
      )
    );
  }

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    // alert('Must use a physical device for Push Notifications');
    console.log('Must use a physical device for Push Notifications')
  }

  return token.data;
}

const useNotificationPush = () => {
  const [expoPushTokens, setExpoPushTokens] = useState([]);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const registerForPushNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    setExpoPushTokens([token]);
  };

  const setupNotificationListeners = () => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
  };

  const sendNotificationToManyDevices = () => {
    sendPushNotification(expoPushTokens);
  };

  const sendNotificationToOneDevice = () => {
    sendPushNotification([expoPushTokens[0]]);
  };

  const sendNotificationRegisterSuccess = (title, body, data) => {
    sendPushNotification([expoPushTokens[0]], title, body, data);
  };

  const sendNotificationPrmotionsStatus = (title, body) => {
    sendPushNotification([expoPushTokens[0]], title, body, null);
  };

  useEffect(() => {
    registerForPushNotifications();
    setupNotificationListeners();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {
    expoPushTokens,
    notification,
    sendNotificationToManyDevices,
    sendNotificationToOneDevice,
    sendNotificationRegisterSuccess,
    sendNotificationPrmotionsStatus
  };
};

export default useNotificationPush;
