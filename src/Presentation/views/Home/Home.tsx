import React, { useState ,useEffect } from "react";
// import { getEventTypes } from '../';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Modal, Platform, Linking } from "react-native";
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
import { useDispatch, useSelector } from 'react-redux';
import { setCalendaryInfo } from '../../../state/CalendarySlice';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../../../utils/RootParamList";
import usePromotions from "../../../hooks/usePromotions";
import useServices from "../../../hooks/useServices";
import usePopUp from "../../../hooks/usePopUp";
import HomeBannesrs from "../../components/HomeBanners";
import useTokenPush from "../../../hooks/useTokenPush";

const Home = () => {
  const { UserTwo, Arrow, QuestionIcon, CloseIcon } = Icons;
  const {handleStatusCode} = usePromotions();
  const {getServices} = useServices();
  const {getPopups, popups} = usePopUp();
  const {handleGestionToken} = useTokenPush();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const { name, user_id } = useSelector((state: any) => state.user)
  const [chatVisible, setChatVisible] = useState(false);
  const [modalPopUp, setModalPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo]: any = useState({});
  const viewportWidth = Dimensions.get('window').width;
  const IMAGE_WIDTH = viewportWidth * 0.8;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 0.9;
  const dispatch = useDispatch();
  const calendaryState = useSelector((state : any) => state.calendary);

useEffect(() => {
  handleStatusCode(user_id);
  getServices();
  getPopups();
  handleGestionToken();
}, [])

useEffect(() => {
  if (popups) {
    setPopUpInfo(popups[0]);
  }
}, [popups]);

useEffect(() => {
  if (popUpInfo) {
    if (popUpInfo.acttivo == true) {
      setModalPopUp(true);
    }
  }
}, [popUpInfo]);

const handleSelectCard = async (card: any, link: any) => {    
  dispatch(setCalendaryInfo({
    ...calendaryState,
    selectedCard: card
  }));  
  navigation.navigate(link);
};
  return (
    <View style={styles.container}>
      <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalPopUp}
          onRequestClose={() => setModalPopUp(false)}>
          <TouchableOpacity
              style={styles.modalFade}
              onPress={() => setModalPopUp(false)}
              activeOpacity={1} // Esto asegura que el área transparente también responda al toque
          >
              <View style={styles.modalContainer2}>
                  <View style={[styles.modalContent, {width: IMAGE_WIDTH, height: IMAGE_HEIGHT}]}>
                          <TouchableOpacity style={styles.cerrarBtn} onPress={() => setModalPopUp(false)}>
                              <CloseIcon width={16} height={16} />
                              <Text style={styles.textModal}>Cerrar</Text>
                          </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        const linkParts = popUpInfo.description.split('?');
                        if (linkParts[0] === 'nav') {
                          navigation.navigate(linkParts[1]);
                        } else if (linkParts[0] === 'service') {
                          const cardIndex = parseInt(linkParts[1].replace('consultCards[', '').replace(']', ''), 10);
                          const selectedCard = consultCards[cardIndex];
                          const screenName = linkParts[2];
                    
                          if (selectedCard && screenName) {
                            handleSelectCard(selectedCard, screenName);
                          } else {
                            console.error('Invalid link format or undefined card/screen');
                          }
                        } else if (linkParts[0] === 'web') {
                          const url = linkParts[1];
                          Linking.openURL(url).catch(err => console.error('An error occurred', err));
                        } else {
                          console.error('Unrecognized link format');
                        }
                        setModalPopUp(false)
                      }}>
                      {
                        popUpInfo && (
                          <Image 
                            source={{ uri: popUpInfo.url_imagen }} 
                            style={{ width: '100%', height: '100%', zIndex: 10 }}
                          />
                        )
                      }
                      </TouchableOpacity>
                  </View>
              </View>
          </TouchableOpacity>
      </Modal>

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
          {/*<TouchableOpacity onPress={() => navigation.navigate("Pagos")} style={styles.navBtn}>
            <Text style={styles.textNavBtn}>
              Pago
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Tienda")} style={styles.navBtn}>
            <Text style={styles.textNavBtn}>
              Tienda
            </Text>
          </TouchableOpacity>*/}
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
  modalFade: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cerrarBtn: {
    position: 'absolute',
    top: 13,
    left: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 20,
    backgroundColor: 'rgba(265, 265, 265, 0.5)',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 14,
    overflow: 'hidden',
  },
  textModal: {
    fontSize: 13,
    fontFamily: MyFont.regular,
  },
});

export default Home;
