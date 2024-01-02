import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 
import { StackNavigationProp } from "@react-navigation/stack"; 
import { RootStackParamsList } from "../../../../App";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from "../../theme/Icons";

const SecondScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const { Arrow } = Icons
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/Open3.png")}
        style={styles.background}
      />
      <View style={styles.form}>
        <Text style={styles.titleform}>Salud a tu alcance</Text>
        <Text style={styles.parraForm}>
           <Text style={styles.textColor}>Programa citas médicas en línea,</Text> realiza 
           <Text style={styles.textColor}> consultas </Text>virtuales
           <Text style={styles.textColor}> con especialistas,</Text> compra 
           <Text style={styles.textColor}> productos para tus tratamientos.</Text>
        </Text>
        <TouchableOpacity 
             style={styles.botom}
             onPress={() => navigation.navigate("Regresar")}
          >
            <View style={styles.contentBoton}>
                <Text style={styles.textBoton}>Siguiente</Text>
                <Arrow width={20} height={20} style={styles.icon}/>
            </View>
        </TouchableOpacity>
        <View style={styles.contentItems}>
           <Text 
             style={styles.selectSecond}
             onPress={() => navigation.navigate("FIrstScreen")}
           ></Text>
           <Text style={styles.selectFirst}></Text>
           <Text 
              style={styles.selectThird}
              onPress={() => navigation.navigate("Regresar")}
            ></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.7,
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
    right: 4,
    lineHeight: 20,
  },
  botom: {
    width: 340,
    height: 50,
    backgroundColor: MyColors.base,
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 20,
    left: 2,
  },
  contentBoton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    gap: 3,
  },
  textBoton: {
    color: MyColors.black,
    fontFamily: MyFont.regular,
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    left: 10,
    top: 6,
  },
  textColor: {
    color: MyColors.primary,
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

export default SecondScreen;
