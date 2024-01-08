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

    const { LogoBlack, Eye } = Icons;

  return (
    <View style={styles.container}>
    <View style={styles.logoContainer}>
      <LogoBlack width={140} height={100} />
    </View>
    <View style={styles.form}>
      <View style={{ marginTop: 30 }}>
        <View style={styles.inputContent}>
          <Text style={styles.textTitleKey}>Contraseña</Text>
          <Text style={styles.textRequireCheck}>(Requrido)</Text>
        </View>
        <TextInput
          placeholder="contraseña anterior"
          keyboardType="default"
          style={styles.textInputKey}
        />
      </View>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <View style={{ marginTop: 30 }}>
        <View style={styles.inputContent}>
          <Text style={styles.textTitleKey}>Contraseña</Text>
          <Text style={styles.textRequireCheck}>(Requrido)</Text>
        </View>
        <TextInput
          placeholder="Nueva contraseña"
          keyboardType="default"
          style={styles.textInputKey}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={styles.inputContent}>
          <Text style={styles.textTitleKey}>Confirmar Contraseña</Text>
          <Text style={styles.textRequireCheck}>(Requrido)</Text>
        </View>
        <TextInput
          placeholder="Confirma la contraseña"
          keyboardType="default"
          style={styles.textInputKey}
        />
      </View>
      <TouchableOpacity
        style={styles.bottomContainer}
      //   onPress={() => navigate.navigate("ConfirmationKey")}
      >
        <View style={styles.contentText}>
          <Text style={styles.textClick}>Recuperar contraseña</Text>
          <Eye />
        </View>
      </TouchableOpacity>
      
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: MyColors.base,
    },
    logoContainer: {
      position: "absolute",
      alignSelf: "center",
      top: "10%",
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
      fontWeight: "bold",
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
    },
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
  });

export default UpdatePasswordDash;
