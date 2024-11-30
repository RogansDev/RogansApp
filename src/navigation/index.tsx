import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Linking } from "react-native";
import { useSelector } from "react-redux";
import PrivateScreen from "./PrivateScreen";
import PublicScreen from "./PublicScreen";

const Navigation = () => {
  const { logged } = useSelector((state: any) => state.authorization);

  const linking = {
    prefixes: ["rogansapp://", "https://rogansya.com/app"],
    config: {
      screens: {
        PublicScreen: "login",
        PrivateScreen: "home",
        Register: "registrate",
      },
    },
  };

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      console.log("Received URL:", event.url);
      // Aquí puedes agregar lógica adicional para manejar el deep link
    };

    Linking.addEventListener("url", handleDeepLink);

    // Manejar links iniciales
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log("Initial URL:", url);
        // Manejar el URL inicial si es necesario
      }
    });

    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      {logged ? <PrivateScreen /> : <PublicScreen />}
    </NavigationContainer>
  );
};

export default Navigation;
