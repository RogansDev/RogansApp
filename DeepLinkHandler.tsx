import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from './App';

const DeepLinkHandler = ({ children }: any) => {
  const navigation = useNavigation();

  const handleDeepLink = (event: any) => {
    const url = event.url;
    let queryParams = url.split('?')[1];
    let data: any = {};
    queryParams.split('&').forEach((param: any) => {
      let [key, value] = param.split('=');
      data[key] = decodeURIComponent(value);
    });

    // Cerrar el navegador web
    WebBrowser.dismissBrowser();

    // Verificar el estado y ejecutar la función correspondiente
    if (data.estado === 'exitoso') {
      navigation.navigate("Confirmado");
    } else if (data.estado === 'pendiente') {
      navigation.navigate("Pendiente");
    } else {
      navigation.navigate("Rechazado");
    }
  };

  useEffect(() => {
    // Manejar deep link inicial
    const handleInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) handleDeepLink({ url: initialURL });
    };

    handleInitialURL();

    // Suscribirse a eventos de deep link
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      // Limpiar la suscripción al desmontar
      subscription.remove();
    };
  }, []);

  return children;
}

export default DeepLinkHandler;
