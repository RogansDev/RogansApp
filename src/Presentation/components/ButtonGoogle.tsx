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

const GoogleButton = () => {
  const [error, setError] = useState();
  const distpach = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "488356227805-7ta65ngc1negegfpuev60gu9o9d4pp84.apps.googleusercontent.com",
      androidClientId: "488356227805-bgsi99ubhrnfqs5bst425h4d39clourr.apps.googleusercontent.com",
    });
  }, []);

  const signin = async () => {
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
      navigation.navigate("GoogleRegister");
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  // const logout = () => {
  //   setUserInfo();
  //   GoogleSignin.revokeAccess();
  //   GoogleSignin.signOut();
  // };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Standard}
      color={GoogleSigninButton.Color.Dark}
      onPress={signin}
    />
  );
}

export default GoogleButton;