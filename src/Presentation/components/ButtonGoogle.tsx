import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

 const GoogleButton =()=> {
  const [error, setError] = useState();
  const [userInfo, setUserInfo]:any = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "488356227805-eq706g6v23mpnq8t1hka9ut3rndeg4sq.apps.googleusercontent.com",
      androidClientId: "488356227805-bgsi99ubhrnfqs5bst425h4d39clourr.apps.googleusercontent.com",
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user: any = await GoogleSignin.signIn();
      console.log(user);
      
      setUserInfo(user);
    } catch (e) {
        console.log(e);
      setError(e);
    }
  };

  const logout = () => {
    setUserInfo();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signin}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default GoogleButton;