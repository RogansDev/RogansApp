import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Linking } from "react-native";
import { useSelector } from "react-redux";
import PrivateScreen from "./PrivateScreen";
import PublicScreen from "./PublicScreen";

const Navigation = () => {
  const { logged } = useSelector((state: any) => state.authorization);

  const linking = {
    prefixes: [
      "rogansapp://",
      "https://rogansya.com/app",
      "https://roganscare.com:5500/app",
    ],
    config: {
      screens: {
        PublicScreen: "login",
        PrivateScreen: "home",
        Register: "registrate",
      },
    },
  };

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      console.log("Received URL:", event.url);

      // Parsea la URL y navega según sea necesario
      const route = await linking.parse(event.url);
      if (route) {
        console.log("route", route);
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Manejar links iniciales
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      {logged ? <PrivateScreen /> : <PublicScreen />}
    </NavigationContainer>
  );
};

export default Navigation;
