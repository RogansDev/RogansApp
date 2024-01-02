import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../App';
import Icons from "../theme/Icons";

const BottonAcceder = () => {
  const { Arrow } = Icons;

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  
  return (
      <TouchableOpacity onPress={() => navigation.navigate("ListaDeConsultas")} style={styles.verMas}>
          <Arrow width={15} height={15}  />
          <Text style={styles.textVerMas}>
              Encuentra más
          </Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    verMas: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconVerMas: {
        marginRight: 10,
      },
      textVerMas: {
        paddingLeft: 8,
        paddingRight: 16,
        fontFamily: MyFont.regular,
      },
})
export default BottonAcceder;
