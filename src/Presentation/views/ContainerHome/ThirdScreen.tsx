import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import ScreenThrid from "../../../Presentation/components/ScreenThrid";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icons from "../../theme/Icons";
import { RootParamList } from "../../../utils/RootParamList";

const ThirdScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const { Arrow } = Icons;


  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 2, }} />
      <Image
        source={require("../../../../assets/doctores-third.png")}
        style={styles.background}
      />
      <View style={styles.form}>
        <Text style={styles.titleform}>Bienvenido a Rogans</Text>
        <Text style={styles.parraForm}>
          <Text style={styles.parraText}>Con Rogans, puedes acceder a </Text>
          servicios médicos en línea y obtener tratamientos personalizados <Text style={styles.parraText}>para tus necesidades.</Text>
        </Text>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.contentBoton}>
            <Text style={styles.textBoton}>¡Comencemos!</Text>
            <Arrow width={16} height={16} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  form: {
    position: "relative",
    width: '100%',
    padding: 20,
    zIndex: 10,
  },
  titleform: {
    fontSize: 30,
    fontFamily: MyFont.bold,
    textAlign: "center",
    marginTop: 20,
    color: "white",
    fontWeight: "bold"
  },
  parraForm: {
    fontSize: 13,
    fontFamily: MyFont.medium,
    textAlign: "center",
    marginTop: 20,
    color: MyColors.primary,
    width: "95%",
    position: "relative",
    left: 8,
    lineHeight: 20,
  },
  parraText: {
    color: 'white',
    fontFamily: MyFont.regular,
  },
  boton: {
    width: '100%',
    backgroundColor: MyColors.base,
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 40,
    padding: 14,
  },
  contentBoton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    gap: 3,
  },
  textBoton: {
    color: MyColors.black,
    fontFamily: MyFont.regular,
    fontSize: 13,
  },
  contentItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    gap: 20,
    marginTop: 28,
  },
  selectFirst: {
    width: 50,
    height: 10,
    backgroundColor: MyColors.base,
    borderRadius: 10,
  },
  selectSecond: {
    width: 30,
    height: 10,
    backgroundColor: MyColors.gray,
    borderRadius: 10,
  },
  selectThird: {
    width: 30,
    height: 10,
    backgroundColor: MyColors.gray,
    borderRadius: 10,
  }
});


export default ThirdScreen;
