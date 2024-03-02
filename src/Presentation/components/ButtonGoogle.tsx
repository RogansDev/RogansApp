import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      webClientId:
        "488356227805-eq706g6v23mpnq8t1hka9ut3rndeg4sq.apps.googleusercontent.com",
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
    <TouchableOpacity style={styles.button} onPress={signin}>
      <Text style={styles.text}>Iniciar sesión con Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
export default GoogleButton;