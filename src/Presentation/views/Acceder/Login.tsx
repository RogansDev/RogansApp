import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import SingLogin from "../../../Presentation/components/SingLogin";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import { americanCountries } from "../../../constants/countries";
import { useCellPhone } from "../../../hooks/useCellPhone";
import CustomTextInput from "../../components/CustomTextInput";
import VerifyCodeComponent from "../../components/modalVerifiCodePhone";
import Icons from "../../theme/Icons";
import UseViewModel from "./ViewModel/LoginViewModel";

const Login = () => {
  const { phone, onChange } = UseViewModel();
  const { loginWithPhone, loading, showModal } = useCellPhone();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountries, setShowCountry] = useState(false);

  const { LogoBlack } = Icons;

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setShowCountry(false);
      }}
    >
      <Text style={styles.countryText}>
        {item.country} ({item.code})
      </Text>
    </TouchableOpacity>
  );

  if (showModal) {
    return <VerifyCodeComponent />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoBlack width={140} height={100} />
      </View>
      <View style={styles.form}>
        {showCountries && (
          <FlatList
            data={americanCountries}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
          />
        )}
        {!showCountries && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setShowCountry(!showCountries)}
              style={{
                width: "20%",
                borderWidth: 1,
                borderColor: "#000",
                padding: 11,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              {/* @ts-ignore*/}
              <Text style={{fontFamily: MyFont.regular}}>{selectedCountry ? selectedCountry.code : "Pais"}</Text>
            </TouchableOpacity>
            <View style={{ width: "80%" }}>
              <CustomTextInput
                title="Número de celular"
                placeholder="Ingresa tu número de celular"
                value={phone}
                keyboardType="phone-pad"
                onChangeText={onChange}
                secureTextEntry={false}
                property="phone"
              />
            </View>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          {loading ? (
            <Text
              style={{
                backgroundColor: "black",
                color: "white",
                width: "100%",
                padding: 14,
                fontSize: 13,
                fontFamily: MyFont.regular,
                borderRadius: 10,
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {" "}
              Cargando...{" "}
            </Text>
          ) : (
            <SingLogin
              text="Ingresar"
              onPress={() => {
                if (selectedCountry) {
                  //@ts-ignore
                  loginWithPhone(selectedCountry.code + phone);
                } else {
                  //@ts-ignore
                  Alert.alert("Debes elegir el indicativo de tu pais");
                }
              }}
            />
          )}
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
    width: "100%",
    justifyContent: "center",
    marginTop: 3,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  texto: {
    color: "white",
    fontSize: 20,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
  },
  selectedText: {
    fontSize: 16,
    marginBottom: 20,
    color: "green",
  },
  countryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  countryText: {
    fontSize: 16,
  },
});

export default Login;
