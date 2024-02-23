import React, { useEffect } from "react";
// import { getEventTypes } from '../';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import { useNavigation } from '@react-navigation/native';
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import ConsultCard from '../../../Presentation/components/ConsultCard';
import ProcedureCard from '../../../Presentation/components/ProcedureCard';
import ButtonConsultationList from '../../../Presentation/components/BottomMasConsultas';
import Icons from '../../../Presentation/theme/Icons';
import ButtonProcedureList from '../../components/BottomMasProcedimientos';
import * as WebBrowser from 'expo-web-browser';
import { consultCards, procedureCards } from '../Servicios/ServicesData';
import { useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../../../utils/RootParamList";
import usePromotions from "../../../hooks/usePromotions";


const Home = () => {
  const { UserIcon, ProcedimientoIcon, ConsultasIcon, AgendaIcon, Arrow } = Icons;
  const {handleStatusCode, updateStatusCode} = usePromotions();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const { name, urlphoto, user_id } = useSelector((state: any) => state.user)

useEffect(() => {
  handleStatusCode(user_id); // llamar en el home
}, [])


  return (
    <View style={styles.container}>
      <FloatingMenu />
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hola {name}</Text>
          </View>
          <TouchableOpacity style={styles.iconContainer} 
          onPress={()=>{updateStatusCode('DJ9kIlEvCEbeupDHNammP16aG033', '123456',false, 'carlosd.rogansya@gmail.com', "Carlos Diaz")}
            // () => navigation.navigate("Perfil")
            }>

            {urlphoto ? (
              <Image
                source={{ uri: urlphoto }}
                style={[styles.imageTiny, styles.roundedImage]} // Agregamos el estilo de imagen redonda
                resizeMode="contain"
              />
            ) : (
              <UserIcon style={styles.userIcon} width={50} height={45} />
            )}
          </TouchableOpacity>
        </View>
        {/* ICONOS DE HEADER */}
        <View style={styles.containerRoundedBtn}>
          <TouchableOpacity onPress={() => navigation.navigate("ListaDeProcedimientos")} style={styles.roundedBtn}>
            <ProcedimientoIcon style={styles.iconRoundedBtn} width={24} height={24} />
            <Text style={styles.textRoundedBtn}>
              Procedimientos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ListaDeConsultas")} style={styles.roundedBtn}>
            <ConsultasIcon style={styles.iconRoundedBtn} width={24} height={24} />
            <Text style={styles.textRoundedBtn}>
              Consultas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MiAgenda")} style={styles.roundedBtn}>
            <AgendaIcon style={styles.iconRoundedBtn} width={24} height={24} />
            <Text style={styles.textRoundedBtn}>
              Mi Agenda
            </Text>
          </TouchableOpacity>
        </View>
        {/* texto de consultas y botton de mas consultas */}
        <View style={styles.section}>
          <Text style={styles.titleSection}>Consultas{"\n"}para ti</Text>
          <ButtonConsultationList />
        </View>
        {/* cards de consultas capilares */}
        <View style={{ marginBottom: 50 }}>
          <ConsultCard cards={consultCards} />
        </View>
        <View style={styles.section}>
          <Text style={styles.titleSection}>Procedimientos{"\n"}para ti</Text>
          <ButtonProcedureList />
        </View>
        <View style={{ marginBottom: 30 }}>
          <ProcedureCard cards={procedureCards} />
        </View>
        <View style={{ marginBottom: 110, alignItems: 'center', }}>
          <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://rogansya.com/rogans-app/legal/')} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>
            <Text style={{ fontFamily: MyFont.medium, fontSize: 16, }}>Términos y condiciones</Text>
            <Arrow width={16} height={16} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 10 : 40,
    marginVertical: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontFamily: MyFont.bold,
  },
  iconContainer: {
    position: 'relative',
    marginLeft: 16,
    // Sombras para Android
    elevation: 10,
    // Sombras para iOS
    shadowColor: "#DDD",
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  containerRoundedBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  roundedBtn: {
    width: 100,
    height: 100,
    marginRight: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    // Sombras para Android
    elevation: 10,
    // Sombras para iOS
    shadowColor: "#F0F0F0",
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  iconRoundedBtn: {
    width: 20,
    height: 20,
    marginBottom: 8,
  },
  textRoundedBtn: {
    fontSize: 9.7,
    fontFamily: MyFont.regular,
  },
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  titleSection: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: MyFont.medium,
    color: MyColors.secondary,
  },
  imageTiny: {
    width: 60,
    height: 60,
  },
  roundedImage: {
    borderRadius: 30, // La mitad del tamaño de la imagen para hacerla redonda
  },
});

export default Home;
