import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { MyColors, MyFont } from '../../../Presentation/theme/AppTheme';
import UpdateKeys from '../../../Presentation/components/UpdateKeys';
import Icons from '../../theme/Icons';

const UpdatePass = () => {
 
    const { Check, LogoBlack } = Icons

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
           <LogoBlack width={140} height={100}/>
        </View>
        <View style={styles.form}>
            <Text style={styles.title}>Actualizar contraseña</Text>
            <View style={{marginTop: 30,}}>
                <View style={styles.inputContent}>
                   <Text style={styles.textTitleKey}>Contraseña</Text>
                   <Text style={styles.textRequireCheck}>(Requrido)</Text>
                </View>
                <TextInput 
                   placeholder='Nueva contraseña'
                   keyboardType='default'
                   style={styles.textInputKey}
                />
            </View>
            <View style={{marginTop: 10,}}>
                <View style={styles.inputContent}>
                   <Text style={styles.textTitleKey}>Contraseña</Text>
                   <Text style={styles.textRequireCheck}>(Requrido)</Text>
                </View>
                <TextInput 
                   placeholder='Confirma la contraseña'
                   keyboardType='default'
                   style={styles.textInputKey}
                />
            </View>
            <View style={{marginTop: 20,}}>
                <UpdateKeys />
            </View>
            <View style={styles.contentInfo}>
                <View style={styles.infoContact}>
                    <Text>La confirmación llegara al siguiente correo</Text>
                    <Text style={{textDecorationLine: "underline", alignSelf: "center"}}>
                        Rogansya@gmail.com 
                    </Text>
                </View>
                <View style={styles.infoMethod}>
                    <Check width={24} height={24}/>
                    <Text style={styles.textMethod}>Intenta otro metodo</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.base,
    },
    logoContainer: {
        position: "absolute",
        alignSelf: "center",
        top: "10%"
    },
    form: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 160,
        padding: 20,
    },
    title: {
        display: "flex",
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "bold"
    },
    inputContent: {
        flexDirection: "row",
        position: "absolute",
        top: 2,
        left: 18,
        padding: 2,
        backgroundColor: MyColors.base,
        zIndex: 10,
    },
    textTitleKey: {
        fontSize: 11,
        fontFamily: MyFont.regular,
        color: "#404040",
    },
    textRequireCheck: {
        fontSize: 10,
        fontFamily: MyFont.regular,
        color: "#C0C0C0",
    },
    textInputKey: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#404040",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        color: "#C0C0C0",
    },
    contentInfo: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    infoContact: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center",
        color: MyColors.gray,
    },
    infoMethod: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 40,
    },
    textMethod: {
        fontSize: 16,
        bottom: 1,
    }
});

export default UpdatePass;
