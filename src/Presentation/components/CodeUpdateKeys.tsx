import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import Verify from '../../../assets/verify.svg'
import { useSelector } from 'react-redux';
import useFirebaseCode from '../../hooks/useFirebaseCode';
import Toast from 'react-native-toast-message';

const CodeUpdateKeys = ({ codigoSolicitado, setCodigoSolicitado}) => {

  const {code, email} = useSelector((state:any)=>state.code)

 const {handleReadCode,  loading } = useFirebaseCode();

 const [ intentosRestantes, setIntentosRestantes ] = useState(4);

  // const verifyCode = async() =>{ handleReadCode(code, email); };


  const verifyCode = async () => {
     if (intentosRestantes > 0) {
       handleReadCode(code, email);
       setIntentosRestantes(intentosRestantes - 1);
     } else {
       Toast.show({
         type: 'error',
         text1: "Sin intentos disponibles",
         visibilityTime: 2000,
       })
     }
  }

  return (
    <TouchableOpacity
      style={styles.BottomRounded}
      onPress={verifyCode}
      disabled={!codigoSolicitado}
    >
      <View style={styles.contentBottom}>
        <Text style={styles.text}>
          {loading ? "Cargando...": "Verificar"}
        </Text>
        <Verify width="16" height="16" />
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
    fontSize: 13,
    fontWeight: "500",
    fontFamily: MyFont.regular,
  }

})

export default CodeUpdateKeys
