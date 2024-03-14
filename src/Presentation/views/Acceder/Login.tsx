import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SingLogin from "../../../Presentation/components/SingLogin";
import UseViewModel from "./ViewModel/LoginViewModel";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from "../../theme/Icons";
import CustomTextInput from "../../components/CustomTextInput";
import useRegisterFirebase from "../../../hooks/useRegisterFirebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../../../utils/RootParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoogleButton from "../../components/ButtonGoogle";

const Login = () => {
  const { email, password, onChange } = UseViewModel();
  const { handleLogin, loading } = useRegisterFirebase();

  const {
    LogoBlack,
    LineGray,
    Google,
    Facebook,
    Apple,
    UpdatePassword,
    Arrow,
  } = Icons;

  const [isChecked, setIsChecked] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const poiñlk = await AsyncStorage.getItem('@xqtes');
        const mnbjhg = await AsyncStorage.getItem('@asdqwe');

        if (poiñlk !== null && mnbjhg !== null) {

          const emailWithoutQuotes = poiñlk.replace(/['"]+/g, '');
          const passwordWithoutQuotes = mnbjhg.replace(/['"]+/g, '');

          onChange('password', passwordWithoutQuotes);
          onChange('email', emailWithoutQuotes);
        }

      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
      }
    };

    obtenerDatos();
  }, [])




  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoBlack width={140} height={100} />
      </View>
      <View style={styles.form}>
        {/* imput de login */}
        <CustomTextInput
          title="Nombre de usuario"
          placeholder="Correo electronico"
          value={email}
          keyboardType="email-address"
          onChangeText={onChange}
          secureTextEntry={false}
          property="email" />
        {/* Input de contraseña */}
        <CustomTextInput
          title="Contraseña"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={onChange}
          keyboardType="default"
          secureTextEntry={true}
          property="password"
        />

        <View style={{ marginTop: 20 }}>
          {loading ?
            <Text style={{
              backgroundColor: 'black',
              color: 'white',
              width: '100%',
              padding: 14,
              fontSize: 13,
              fontFamily: MyFont.regular,
              borderRadius: 10,
              textAlign: 'center',
              overflow: 'hidden'
            }}> Cargando... </Text>
            : <SingLogin text="Ingresar" onPress={() => { handleLogin(email, password) }} />}
        </View>
        <View style={styles.containerUpdate}>
          <UpdatePassword width={30} height={24} />
          <Text
            style={styles.textUpdate}
            onPress={() => navigation.navigate("ModalVerifitCode")}>
            Olvide mi contraseña 454545
          </Text>
        </View>
        <View style={styles.lineContent}>
          <View>
            <LineGray />
          </View>
        </View>
        <View style={styles.containerUpdate}>
          <Arrow width={30} height={24} color={'black'} />
          <Text
            style={styles.textUpdate}
            onPress={() => navigation.navigate("register")}>
            Registrarme
          </Text>
        </View>
        <View style={styles.contentLoginGoogle}>
          <View style={{ alignSelf: 'center' }}>
            <GoogleButton />
          </View>
        </View>
        <View style={styles.loginAuthe}>
          <Google width={30} height={30} />
          <Facebook width={30} height={30} />
          <Apple />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.base,
    fontFamily: MyFont.regular,
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "10%",
  },
  form: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 160,
    padding: 20,
  },
  titleModalButton: {
    flexDirection: "row",
    position: "absolute",
    top: 2,
    left: 18,
    padding: 2,
    backgroundColor: "white",
    zIndex: 10,
  },
  text1TitleModalButton: {
    fontSize: 11,
    fontFamily: MyFont.regular,
    color: "#404040",
  },
  text2TitleModalButton: {
    fontSize: 10,
    fontFamily: MyFont.regular,
    color: "#C0C0C0",
  },
  formTextInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#404040",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  Accept: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  textAccept: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    fontSize: 20,
    fontFamily: MyFont.regular,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  containerUpdate: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 30,
  },
  textUpdate: {
    fontSize: 16,
    fontFamily: MyFont.regular,
  },
  contentLoginGoogle: {
    width: '100%',
    justifyContent: 'center',
    marginTop:3
  },
  lineContent: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
    marginTop: 30,
  },
  loginAuthe: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    gap: 50,
    marginTop: 30,
  },
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  texto: {
    color: 'white',
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
});

export default Login;