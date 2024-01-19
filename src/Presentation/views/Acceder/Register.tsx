import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import Icons from "../../../Presentation/theme/Icons";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Checkbox from "expo-checkbox";
import UseViewModel from "./ViewModel/RegisterViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedBottom from "../../components/RoundedBottom";
import useRegisterFirebase from "../../../hooks/useRegisterFirebase";
import CalendarioInput from "../../components/CalendarioInput";
import PopUpError from "../../components/PopUpError";
import Loading from "../loading/Loading";

interface CalendarioHandles {
  toggleModal: () => void;
}

interface PopUpErrorHandles {
  togglePopUpError: (mesaje: string) => void;
}

const Register = () => {

  const {
    loading,
    name,
    email,
    lastname,
    document,
    // birthdate,
    phone,
    password,
    ConfirmPassword,
    onChange,
    register,
    errorMessage,
  } = UseViewModel();


  const [birthDay, setBirthDay] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const { LogoBlack } = Icons;

  useEffect(() => {
    if (errorMessage != '') {
      abrirPopUpError(errorMessage);
    }
  }, [errorMessage]);

  const handleRegister = () => {
    register();
  };

  const PopUpErrorRef = useRef<PopUpErrorHandles>(null);

  const abrirPopUpError = (mensaje: string) => {
    if (PopUpErrorRef.current) {
      PopUpErrorRef.current.togglePopUpError(mensaje);
    }
  };

  const calendarioRef = useRef<CalendarioHandles>(null);

  const abrirCalendario = () => {
    if (calendarioRef.current) {
      calendarioRef.current.toggleModal();
    }
  };

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setBirthDay(formattedDate);
    onChange('birthdate', formattedDate);
  };

  const handleCheckBoxChange = () => {
    if (!isChecked) {
      setIsChecked(true);
      onChange('termsAccepted', true);
    } else {
      setIsChecked(false);
      onChange('termsAccepted', false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
    >
      {/* contenedor de formulario */}
      <View style={styles.contentForm}>
        <View style={styles.logoContainer}>
          <LogoBlack style={styles.logo} />
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
            secureTextEntry={false}
          />
          {/* apellido */}
          <CustomTextInput
            title="Apellidos"
            placeholder="Ingrese tu apelido"
            keyboardType="default"
            value={lastname}
            onChangeText={onChange}
            property="lastname"
            secureTextEntry={false}
          />
          {/* input de telefono */}
          <CustomTextInput
            title="Teléfono"
            placeholder="Ingrese tu teléfono"
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
            placeholder="Ingrese tu cédula"
            keyboardType="number-pad"
            value={document}
            onChangeText={onChange}
            property="document"
          />
          {/* fecha de nacimiento */}
          <View>
            <View style={styles.labelContent}>
              <Text style={styles.labelnombres}>Fecha de nacimiento </Text>
              <Text style={styles.labelnombres2}>(Reqierido)</Text>
            </View>
            <TouchableOpacity style={styles.input} onPress={abrirCalendario}>
              {birthDay === '' ? (
                <Text style={[styles.inputBirthDay, { color: '#C0C0C0', }]}>dd/mm/aaaa</Text>
              ) : (
                <Text style={[styles.inputBirthDay, { color: '#000000', }]}>{birthDay}</Text>
              )}
            </TouchableOpacity>
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
            secureTextEntry={true}
          />
          <Text style={styles.subtext}>La contraseña debe tener al menos 6 caracteres</Text>
          {/* acepto terminos */}
          <View style={styles.Accept}>
            <Checkbox
              value={isChecked}
              onValueChange={handleCheckBoxChange}
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
          {loading ? 
          <View style={styles.roundedBottom}>
            <Text  style={styles.textLoading}>
            Cargando....
          </Text>
          </View> : <RoundedBottom
            title="Registrarme"
            onPress={() => handleRegister()} />
          }
        </View>
      </View>
      <CalendarioInput ref={calendarioRef} onDateChange={handleDateChange} />
      <PopUpError ref={PopUpErrorRef} />
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
    height: 20,
  },
  logo: {
    zIndex: 20,
  },
  contentForm: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    position: "relative",
    marginTop: Platform.OS === 'android' ? 55 : 10,
    padding: 20,

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
    top: 2,
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
  labelnombres2: {
    fontSize: 10,
    fontFamily: MyFont.regular,
    color: "#C0C0C0",
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
    justifyContent: "flex-start",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    paddingVertical: 11,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  inputBirthDay: {
    fontSize: 13,
    fontFamily: MyFont.regular,
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
    marginTop:2
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
  subtext: {
    fontFamily: MyFont.regular,
    color: '#404040',
    fontSize: 11,
    marginBottom: 15,
  },
  roundedText: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 15
  },
  textLoading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: MyFont.regular,
  }
});

export default Register;
