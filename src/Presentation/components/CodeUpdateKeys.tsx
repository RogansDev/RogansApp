import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MyColors } from '../theme/AppTheme';
import Verify from '../../../assets/verify.svg'
import { useSelector } from 'react-redux';
import useFirebaseCode from '../../hooks/useFirebaseCode';

const CodeUpdateKeys = () => {

  const {code} = useSelector((state:any)=>state.code)

 const {handleReadCode,  loading } = useFirebaseCode();

  const verifyCode = async() =>{ handleReadCode(code); }

  return (
    <TouchableOpacity
      style={styles.BottomRounded}
      onPress={() => { verifyCode()}}>
      <View style={styles.contentBottom}>
        <Text style={styles.text}>
          {loading ? "Cargando...": "Verificar"}
        </Text>
        <Verify width="20" height="20" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  BottomRounded: {
    width: "100%",
    height: 45,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: MyColors.black,
    borderRadius: 15,
  },
  contentBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: MyColors.base,
    fontSize: 16,
    fontWeight: "500"
  }

})

export default CodeUpdateKeys
