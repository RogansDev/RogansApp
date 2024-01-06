import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import Icons from '../theme/Icons';

interface Props {
  text: string;
}

const ScreenThrid = ({ text }: Props) => {

  const { Arrow } = Icons

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Login")}
      style={styles.roundedBottom}
    >
      <Text style={styles.textBottom}>
        {text}
      </Text>
      <Arrow width={16} height={16} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  roundedBottom: {
    width: "100%",
    flexDirection: 'row',
    height: 50,
    alignItems: "center",
    backgroundColor: MyColors.buttonColor,
    justifyContent: "center",
    borderRadius: 15,
    gap: 8,
  },
  textBottom: {
    color: "black",
    fontSize: 16,
    fontFamily: MyFont.regular,
  },
})
export default ScreenThrid;
