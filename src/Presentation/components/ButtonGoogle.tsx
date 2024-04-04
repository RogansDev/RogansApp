import {
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { setGoogleInfo } from "../../state/GoogleDataSlice";
import { useNavigation } from "@react-navigation/native";
import { RootParamList } from "../../utils/RootParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { saveCredentials } from "../../services/credentials";
import { setUserInfo } from "../../state/ProfileSlice";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MyFont } from "../theme/AppTheme";
import Icons from "../theme/Icons";

const GoogleButton = () => {
  const [error, setError] = useState();
  const [loading, setloading] = useState(false);
  const distpach = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const { GoogleLogo } = Icons;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "488356227805-7ta65ngc1negegfpuev60gu9o9d4pp84.apps.googleusercontent.com",
      androidClientId: "488356227805-f7lh2vuf5mamq9gcr6m861mv75e5hu7t.apps.googleusercontent.com",
    });
  }, []);

  const signin = async () => {
    setloading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const user: any = await GoogleSignin.signIn();
      const google = {
        google_id: user.user.id,
        email: user.user.email,
        urlphoto: user.user.photo,
        idToken: user.idToken,
        name: user.user.name,
      }
      distpach(setGoogleInfo(google));
      try {
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", user.user.email)
        );
        const querySnapshot = await getDocs(userQuery);
        let selectedEmail: any;
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          selectedEmail = doc.data();
        });
        if (selectedEmail) {
          const user: any = {
            user_id: selectedEmail.user_id,
            email: selectedEmail.email,
            role: selectedEmail.role,
            urlphoto: selectedEmail.urlphoto == "" ? google.urlphoto :  selectedEmail.urlphoto,
            document: selectedEmail.document,
            name: selectedEmail.name,
            lastname: selectedEmail?.lastname,
            phone: selectedEmail.phone,
            birthdate: selectedEmail.birthdate,
            logged: true
          }
          await saveCredentials('email', selectedEmail.email);
          await saveCredentials('googleToken', selectedEmail.user_id);
          distpach(setUserInfo(user));
          setloading(false);
        } else {
          setloading(false);
          navigation.navigate("GoogleRegister");
        }
      } catch (error: any) {
        console.log('error........................', error);
        setError(error);
        setloading(false);
        Alert.alert(`No se pudo ingresar error ${error}`);
      }

    } catch (e: any) {
      console.log('e..........................>', e);
      setError(e);
      setloading(false);
      Alert.alert(`No se pudo ingresar error ${e}`);
    }
  };

  return (
    <View>
      {loading ?
      <View style={styles.button}>
          <GoogleLogo width={26} height={26} />
          <Text style={styles.text}>Cargando...</Text>
      </View>
      :
      <TouchableOpacity style={styles.button} onPress={signin}>
        <GoogleLogo width={26} height={26} />
        <Text style={styles.text}>Continuar con Google</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 230,
    backgroundColor: '#FFFFFF',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    gap: 8,
    marginTop: 28,
  },
  text: {
    color: '#000000',
    fontFamily: MyFont.regular,
    fontSize: 14,
  }
});


export default GoogleButton;