import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
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
import { Text, View } from "react-native";
import { MyFont } from "../theme/AppTheme";

const GoogleButton = () => {
  const [error, setError] = useState();
  const [loading, setloading] = useState(false);
  const distpach = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "488356227805-7ta65ngc1negegfpuev60gu9o9d4pp84.apps.googleusercontent.com",
      androidClientId: "488356227805-bgsi99ubhrnfqs5bst425h4d39clourr.apps.googleusercontent.com",
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
          const user = {
            user_id: selectedEmail.user_id,
            email: selectedEmail.email,
            role: selectedEmail.role,
            urlphoto: selectedEmail.urlphoto,
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
      } catch (error) {
        console.log(error);
        setError(error);
        setloading(false);
      }

    } catch (e) {
      console.log(e);
      setError(e);
      setloading(false);
    }
  };

  return (
    <View>
      {loading ? <Text style={{
        backgroundColor: 'black',
        color: 'white',
        width: '100%',
        padding: 14,
        fontSize: 13,
        fontFamily: MyFont.regular,
        borderRadius: 10,
        textAlign: 'center',
        overflow: 'hidden'
      }}> Cargando... </Text> : <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signin}
      />}
    </View>
  );
}

export default GoogleButton;