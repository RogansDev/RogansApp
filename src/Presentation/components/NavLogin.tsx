import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../App";
import Login from '../../../assets/icons/loginIniciar.svg'

const NavLogin = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  
  return (
    <TouchableOpacity
      style={styles.roundedBottom}
      onPress={() => navigation.navigate('Login')}
    >
       <View style={styles.flexBttom}>
          <Text style={styles.textBottom}>Iniciar sesion </Text>
          <Login width={20} height={20}  />
       </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    roundedBottom: {
        width: 340,
        height: 40,
        alignItems: 'center',
        backgroundColor: MyColors.buttonColor,
        justifyContent: 'center',
        borderRadius: 15,
    }, 
    flexBttom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    textBottom: {
        color: 'black',
        fontSize: 15,
        fontFamily: MyFont.regular,
    },
    logoLogin: {
        width: 20,
        height: 20,
    }
})
export default NavLogin;
