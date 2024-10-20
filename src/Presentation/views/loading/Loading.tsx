import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import useRegisterFirebase from "../../../hooks/useRegisterFirebase";
import { getCredentials, deleteCredentials } from "../../../services/credentials";
import { RootParamList } from "../../../utils/RootParamList";
import { fetchFonts } from "../../theme/AppTheme";
import { useDispatch, useSelector } from "react-redux";
import { setClearUserInfo, setUserInfo } from "../../../state/ProfileSlice";
import { setClearAuthorizationInfo } from "../../../state/AuthorizationSlice";
import { setClearCalendaryInfo } from "../../../state/CalendarySlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";


const Loading = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const { handleLoginWithPhone, handleGoogleLogin } = useRegisterFirebase();
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  console.log("state", state);
  

  const handleSessionClose = async () => {
    try {
      await deleteCredentials("phoneToken");
      await deleteCredentials("authToken");
      await deleteCredentials("googleToken");
      await GoogleSignin.signOut();
      dispatch(setClearUserInfo(""));
      dispatch(setClearCalendaryInfo(""));
      dispatch(setClearAuthorizationInfo(false));
    } catch (error) {
      console.log("error......", error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const phoneToken = await getCredentials("phoneToken");
        const authToken = await getCredentials("authToken");
        const googleToken = await getCredentials("googleToken");

        console.log("Tokens encontrados:", { phoneToken, authToken, googleToken });
        
        await fetchFonts();
        
        if (phoneToken && authToken) {
          console.log("Iniciando sesión con teléfono...");
          await handleLoginWithPhone(phoneToken);
        } else if (googleToken) {
          handleSessionClose();
          navigation.navigate("Login");
        } else {
          console.log("No hay credenciales guardadas, navegando a la pantalla de inicio de sesión...");
          handleSessionClose();
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log("Error durante la verificación del inicio de sesión:", error);
        handleSessionClose();
        navigation.navigate("Login");
      }
    };

    checkLogin();
  }, [state.authorization.logged]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00D0B1" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Loading;
