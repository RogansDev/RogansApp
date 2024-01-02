import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import NavLogin from "../../../Presentation/components/NavLogin";
import NavRegister from "../../../Presentation/components/NavRegister";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../App";
import Icons from "../../../Presentation/theme/Icons";

const Acceder = () => {
  const { LogoWhite, LineaWhite, Facebook, Google, Apple, Invitado } = Icons;

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/acceder.jpg")}
        style={styles.background}
      />
      <View style={styles.contend}>
        <LogoWhite width={120} height={50} style={styles.logo} />
        <View style={styles.bottomGap}>
          <NavLogin />
          <NavRegister />
        </View>
        <View style={styles.contentColum}>
          <View>
            <LineaWhite width={20} height={20} fill="white"/>
          </View>
          <View style={styles.redesSociales}>
            <Facebook width={30} height={30} />
            <Google width={30} height={30} />
            <Apple width={30} height={30} />
          </View>
        </View>
        <View style={styles.invitadoPerfil}>
          <View style={styles.contendInvitado}>
            <Invitado width={20} height={20} />
            <Text
              style={styles.textInvitado}
              onPress={() => navigation.navigate("Home")}
            >
              Ingresa como invitado
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  background: {
    width: "100%",
    height: "100%",
    
  },
  contend: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 50,
    position: "absolute",
    bottom: 220,
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    width: 200,
    height: 200,
  },
  bottomGap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    top: 40,
  },
  contentColum: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginBottom: 20,
  },
  redesSociales: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  invitadoPerfil: {
    display: "flex",
    position: "absolute",
    top: 580,
  },
  contendInvitado: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
    gap: 20,
  },
  textInvitado: {
    color: "white",
    fontSize: 20,
    fontFamily: MyFont.regular,
  },
});
export default Acceder;
