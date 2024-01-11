import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import Icons from '../theme/Icons';
import useRegisterFirebase from '../../hooks/useRegisterFirebase';
import { useSelector } from 'react-redux';


const UpdateKeys = (props: any) => {

  const { Eye } = Icons;
  const {handleUpdatePassword, loading} = useRegisterFirebase();
  const {email} = useSelector((state: any)=>state.code);

  return (
    <TouchableOpacity
      style={styles.bottomContainer}
      onPress={() =>{handleUpdatePassword(email, props.password)}}>
      <View style={styles.contentText} >
        <Text style={styles.textClick}>
          {loading ? "Actualizando...":"Actualizar contraseña"}
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
