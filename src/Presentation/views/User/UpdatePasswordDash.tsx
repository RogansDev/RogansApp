import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { MyColors, MyFont } from "../../theme/AppTheme";
  import Icons from "../../theme/Icons";
  import { useNavigation } from "@react-navigation/native";
  import { StackNavigationProp } from '@react-navigation/stack';
  import { RootParamList } from "../../../utils/RootParamList";

const UpdatePasswordDash = () => {
    
    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const { LogoBlack, UpdatePassword } = Icons;

  return (
    <View style={styles.container}>
    <View style={{marginTop: 30,}}>
      <LogoBlack width={140} height={40} />
    </View>
    <View style={styles.form}>
      <View style={{ marginTop: 20, marginBottom: 20, }}>
        <View style={styles.inputContent}>
          <Text style={styles.textTitleKey}>Contraseña</Text>
          <Text style={styles.textRequireCheck}> (Requrido)</Text>
        </View>
        <TextInput
          placeholder="Contraseña anterior"
          keyboardType="default"
          autoCapitalize="none"
          style={styles.textInputKey}
        />
      </View>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <View style={{ marginTop: 20 }}>
        <View style={styles.inputContent}>
          <Text style={styles.textTitleKey}>Contraseña nueva</Text>
          <Text style={styles.textRequireCheck}> (Requrido)</Text>
        </View>
        <TextInput
          placeholder="Contraseña nueva"
          keyboardType="default"
          autoCapitalize="none"
          style={styles.textInputKey}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={styles.inputContent}>
          <Text style={styles.textTitleKey}>Confirmar Contraseña</Text>
          <Text style={styles.textRequireCheck}> (Requrido)</Text>
        </View>
        <TextInput
          placeholder="Confirmar contraseña"
          keyboardType="default"
          autoCapitalize="none"
          style={styles.textInputKey}
        />
      </View>
      <TouchableOpacity
        style={styles.bottomContainer}
      //   onPress={() => navigate.navigate("ConfirmationKey")}
      >
        <Text style={styles.textClick}>Recuperar contraseña</Text>
      </TouchableOpacity>
      <View style={styles.containerUpdate}>
          <UpdatePassword width={30} height={24} />
          <Text
            style={styles.textUpdate}
            onPress={() => navigation.navigate("ModalVerifitCode")}
          >
            Olvide mi contraseña
          </Text>
        </View>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: MyColors.base,
      alignItems: 'center',
    },
    form: {
      width: "100%",
      padding: 20,
    },
    title: {
      alignSelf: "center",
      fontSize: 20,
      fontFamily: MyFont.medium,
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
      fontFamily: MyFont.regular,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#404040",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 10,
      color: "black",
    },
    contentInfo: {
      display: "flex",
      flexDirection: "column",
      alignSelf: "center",
      justifyContent: "center",
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
    },
    textMethod: {
      fontSize: 16,
      bottom: 1,
    },
    bottomContainer: {
      width: "100%",
      height: 45,
      flexDirection: 'row',
      alignItems: "center",
      backgroundColor: MyColors.black,
      justifyContent: "center",
      borderRadius: 15,
      marginTop: 20,
    },
    textClick: {
      color: MyColors.base,
      fontSize: 13,
      fontFamily: MyFont.regular,
    },
    containerUpdate: {
      display: "flex",
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "center",
      gap: 10,
      marginTop: 30,
    },
    textUpdate: {
      fontSize: 16,
      fontFamily: MyFont.regular,
    },
  });

export default UpdatePasswordDash;
