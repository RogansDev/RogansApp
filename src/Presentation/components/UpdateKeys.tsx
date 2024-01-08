import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import Icons from '../theme/Icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';


const UpdateKeys = () => {

  const { Eye } = Icons

  const navigate = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <TouchableOpacity
      style={styles.bottomContainer}
      onPress={() => navigate.navigate("ConfirmationKey")}
    >
      <View style={styles.contentText} >
        <Text style={styles.textClick}>
          Actualizar contraseña
        </Text>
        <Eye />
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: "100%",
    height: 45,
    display: "flex",
    alignSelf: "center",
    backgroundColor: MyColors.black,
    justifyContent: "center",
    borderRadius: 15,
  },
  contentText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  textClick: {
    color: MyColors.base,
    fontSize: 15,
    fontFamily: MyFont.bold,
  }
})

export default UpdateKeys;
