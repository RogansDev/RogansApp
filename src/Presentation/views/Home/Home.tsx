import React, { useState ,useEffect } from "react";
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
import HomeBannesrs from "../../components/HomeBanners";


const Home = () => {
  const { UserTwo, ProcedimientoIcon, ConsultasIcon, AgendaIcon, Arrow, QuestionIcon } = Icons;
  const {handleStatusCode, updateStatusCode} = usePromotions();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const { name, user_id } = useSelector((state: any) => state.user)
  const [chatVisible, setChatVisible] = useState(false);

useEffect(() => {
  handleStatusCode(user_id); // llamar en el home
}, [])


  return (
    <View style={styles.container}>
      <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hola {name}</Text>
          </View>
          <TouchableOpacity style={{overflow: 'hidden',}} onPress={() => navigation.navigate("Perfil")}>
            <UserTwo width={20} height={20} />
          </TouchableOpacity>
        </View>
        {/* ICONOS DE HEADER */}
        <View style={styles.containerNavBtn}>
          <View style={{position: 'absolute', width: 50, height: 1, backgroundColor: '#444444', top: 0, left: 15,}} />
          <TouchableOpacity onPress={() => navigation.navigate("ListaDeProcedimientos")} style={styles.navBtn}>
            <Text style={styles.textNavBtn}>
              Procedimientos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ListaDeConsultas")} style={styles.navBtn}>
            <Text style={styles.textNavBtn}>
              Consultas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MiAgenda")} style={styles.navBtn}>
            <Text style={styles.textNavBtn}>
              Mi Agenda
            </Text>
          </TouchableOpacity>
        </View>
        <HomeBannesrs />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#404040', borderRadius: 18, paddingVertical: 12, paddingHorizontal: 15, marginTop: 30, marginBottom: 20, marginHorizontal: 15,}}>
          <Text style={{fontFamily: MyFont.regular, fontSize: 16, lineHeight: 18, color: '#FFFFFF',}}>Realiza tu{`\n`}consulta en vivo {`\n`}gratis</Text>
          <TouchableOpacity onPress={() => setChatVisible(true)} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4, backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,}}>
            <Text style={{fontFamily: MyFont.regular, fontSize: 12, color: '#444444',}}>Consulta ahora</Text>
            <QuestionIcon width={16} height={16} />
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
        <View style={{ marginBottom: 150, alignItems: 'center', }}>
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
    paddingTop: Platform.OS === 'android' ? 10 : 10,
    marginVertical: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontFamily: MyFont.bold,
  },
  containerNavBtn: {
    position: 'relative',
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 30,
    gap: 18,
  },
  navBtn: {
    
  },
  textNavBtn: {
    fontSize: 12,
    fontFamily: MyFont.regular,
    color: '#444444',
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
