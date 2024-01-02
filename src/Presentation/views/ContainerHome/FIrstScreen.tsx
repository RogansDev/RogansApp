import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../App";
import Icons from "../../theme/Icons";

export const FIrstScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const { Arrow } = Icons;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/Open1.png")}
        style={styles.background}
      />
      <View style={styles.form}>
        <Text style={styles.titleform}>Bienvenidos a rogans </Text>
        <Text style={styles.parraForm}>
          Con Rogans, puedes acceder a{" "}
          <Text style={styles.textColor}>servicios médicos en línea</Text> y
          obtener
          <Text style={styles.textColor}>
            {" "}
            tratamientos personalizados{" "}
          </Text>{" "}
          para tus necesidades.
        </Text>
        <TouchableOpacity 
           style={styles.bottom}
           onPress={() => navigation.navigate("Martin")}
        >
          <View style={styles.contentNext}>
            <Text style={styles.textBoton}>Siguiente</Text>
            <Arrow width={20} height={20} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <View style={styles.contentItems}>
          <Text style={styles.selectFirst}></Text>
          <Text
            style={styles.selectSecond}
            onPress={() => navigation.navigate("Martin")}
          ></Text>
          <Text style={styles.selectThird}></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.7,
    zIndex: 1,
  },
  form: {
    position: "relative",
    padding: 20,
    zIndex: 10,
  },
  titleform: {
    fontSize: 30,
    fontFamily: MyFont.bold,
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },
  parraForm: {
    fontSize: 14,
    fontFamily: MyFont.regular,
    textAlign: "center",
    marginTop: 20,
    color: "white",
    width: 350,
    position: "relative",
    right: 3,
    lineHeight: 18,
  },
  textColor: {
    color: MyColors.primary,
  },
  bottom: {
    width: 340,
    height: 50,
    display: "flex",
    alignItems: "center",
    backgroundColor: MyColors.base,
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 20,
    left: 4,
  },
  textBoton: {
    color: MyColors.black,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: MyFont.regular,
  },
  icon: {
    left: 10,
    top: 6,
  },
  contentNext: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 2,
  },
  contentItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    gap: 20,
    marginTop: 28,
  },
  selectFirst: {
    width: 60,
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
  },
});
