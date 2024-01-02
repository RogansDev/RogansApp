import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
  ToastAndroid
} from "react-native";
import Icons from "../../../Presentation/theme/Icons";
import { Picker } from "@react-native-picker/picker";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import UseViewModel from "./ViewModel/RegisterViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedBottom from "../../components/RoundedBottom";

const Register = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    name,
    email,
    lastname,
    document,
    birthdate,
    phone,
    password,
    ConfirmPassword,
    onChange,
    register,
    errorMessage,
  } = UseViewModel();

  // verifica que todos los campos esten para llenos si no vota un error 
  useEffect(() => {
    if(errorMessage != ''){
      ToastAndroid.show(errorMessage, ToastAndroid.LONG)
    }
  }, [errorMessage])

  const { LogoBlack, Eye, SendIcon } = Icons;

  const handleRegister = () => {
    register();
  };

  return (
    <ScrollView
      style={styles.container}
    >
        {/* contenedor de formulario */}
        <View style={styles.contentForm}>
          <View style={styles.logoContainer}>
            <LogoBlack style={styles.logo}/>
          </View>
          <View style={styles.form}>
            {/* Nombre */}
            <CustomTextInput
              title="Nombre Usuario"
              placeholder="Ingrese tu nombre "
              keyboardType="default"
              value={name}
              onChangeText={onChange}
              property="name"
              secureTextEntry
            />
            {/* apellido */}
            <CustomTextInput
              title="apellidos"
              placeholder="Ingrese tu  apelido"
              keyboardType="default"
              value={lastname}
              onChangeText={onChange}
              property="lastname"
              secureTextEntry
            />
            {/* input de telefono */}
            <CustomTextInput
              title="Telefono"
              placeholder="Ingrese tu celular"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={onChange}
              property="phone"
            />
            {/* correo electronico */}
            <CustomTextInput
              title="Correo"
              placeholder="Ingrese tu correo"
              keyboardType="email-address"
              value={email}
              onChangeText={onChange}
              property="email"
            />
            {/* documentoo  */}
            <CustomTextInput
              title="documento identificacion"
              placeholder="Ingrese tu cedula"
              keyboardType="number-pad"
              value={document}
              onChangeText={onChange}
              property="document"
            />
            {/* fecha de nacimiento */}
            <View>
              <View style={styles.labelContent}>
                <Text style={styles.labelnombres}>Fecha de nacimiento</Text>
              </View>
              <View style={styles.input}>
                {/* <Text  onPress={showDatepicker}> */}
                {/* {selectedDate
                    ? selectedDate.toDateString()
                    : "Selecciona una fecha"} */}
                {/* </Text> */}
                {/* logica de calendario pendiente */}
              </View>
            </View>
            {/* contraseñas */}
            <CustomTextInput
              title="Contraseña"
              placeholder="Ingrese tu contraseña"
              keyboardType="default"
              value={password}
              onChangeText={onChange}
              property="password"
              secureTextEntry={true}
            />
            {/* confirmar contraseña */}
            <CustomTextInput
              title="Confirmar contraseña"
              placeholder="Confirmar la contraseña"
              keyboardType="default"
              value={ConfirmPassword}
              onChangeText={onChange}
              property="ConfirmPassword"
              secureTextEntry
            />
            {/* acepto terminos */}
            <View style={styles.Accept}>
              <Checkbox
                // value={isChecked}
                // onValueChange={handleCheckBoxChange}
                style={styles.checkbox}
              />
              <View style={styles.textAccept}>
                <Text>Acepto los</Text>
                <Text
                  style={{ textDecorationLine: "underline" }}
                  // onPress={handleAcceptTerms}
                >
                  términos y condiciones
                </Text>
              </View>
            </View>
            {/* boton de registro */}
            <RoundedBottom title="registrarse" onPress={() => register() }/>
          </View>
        </View> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
  logoContainer: {
    alignSelf: "center",
  },
  logo: {
    zIndex: 20,
  },
  contentForm: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    position: "relative",
    marginTop: 90,
    padding: 20,
    bottom: 69,
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    gap: 1,
    width: "100%",
    height: "100%",
    zIndex: 60,
  },
  labelContent: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    top: -9,
    left: 18,
    padding: 2,
    backgroundColor: MyColors.base,
    zIndex: 10,
  },
  labelnombres: {
    fontSize: 10,
    fontFamily: MyFont.regular,
    color: "#404040",
  },
  labelRequerid: {
    fontSize: 10,
    fontFamily: MyFont.regular,
    color: "gray",
    marginLeft: 3,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 3,
  },
  contentNext: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 2,
  },
  icon: {
    top: 6,
    left: 4,
  },
  contentSelect: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  select: {
    borderRadius: 10,
    width: 115,
    height: 50,
    marginVertical: 1,
    textAlign: "center",
    borderWidth: 1,
    borderColor: MyColors.black,
  },
  typeDoc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 220,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  roundedBottom: {
    width: "100%",
    height: 50,
    alignItems: "center",
    backgroundColor: MyColors.black,
    color: MyColors.base,
    justifyContent: "center",
    borderRadius: 15,
  },
  textBottom: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: MyFont.regular,
  },
  message: {
    textAlign: "center",
    marginVertical: 10,
  },
  successText: {
    color: "green",
  },
  errorText: {
    color: "red",
  },
  dateText: {
    fontSize: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    textAlign: "center",
    width: 200,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  registrationMessage: {
    marginTop: 8,
    fontSize: 16,
    color: "red",
  },
  Accept: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
});

export default Register;
