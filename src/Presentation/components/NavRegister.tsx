import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MyColors, MyFont } from "../theme/AppTheme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../App";
import Register from '../../../assets/icons/clickregister.svg'



const NavRegister = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  return (
    <TouchableOpacity 
       style={styles.roundedBottom}
       onPress={() => navigation.navigate('Register')}
    >
      <View style={styles.flexBttom}>
        <Text style={styles.textBottom}>Registrate</Text>
        <Register width={20} height={20}  />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedBottom: {
    width: 340,
    height: 40,
    alignItems: "center",
    backgroundColor: MyColors.black,
    justifyContent: "center",
    borderRadius: 15,
  },
  flexBttom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  textBottom: {
    color: "white",
    fontSize: 15,
    fontFamily: MyFont.regular,
  },
  logoRegister: {
    width: 20,
    height: 20,
  }
});

export default NavRegister;
