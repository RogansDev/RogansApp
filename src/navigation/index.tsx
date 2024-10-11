import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useSelector } from "react-redux";
import PrivateScreen from "./PrivateScreen";
import PublicScreen from "./PublicScreen";

const Navigation = () => {
  const { logged } = useSelector((state: any) => state.authorization);

  const linking = {
    prefixes: ["https://rogansapp.page.link", "rogansapp://"],
    config: {
      screens: {
        PublicScreen: {
          path: "register",
          screens: {
            Register: "register",
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {logged ? <PrivateScreen /> : <PublicScreen />}
    </NavigationContainer>
  );
};

export default Navigation;
