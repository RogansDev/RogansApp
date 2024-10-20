import React, { useState ,useEffect } from "react";
// import { getEventTypes } from '../';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Modal, Platform, Linking } from "react-native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import { useNavigation } from '@react-navigation/native';
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import Icons from '../../../Presentation/theme/Icons';
import * as WebBrowser from 'expo-web-browser';
import { consultCards, procedureCards } from '../Servicios/ServicesData';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendaryInfo } from '../../../state/CalendarySlice';
import { setMedicalLineInfo } from '../../../state/MedicalLineSlice';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../../../utils/RootParamList";
import usePromotions from "../../../hooks/usePromotions";
import useServices from "../../../hooks/useServices";
import usePopUp from "../../../hooks/usePopUp";
import HomeBannesrs from "../../components/HomeBanners";
import useTokenPush from "../../../hooks/useTokenPush";
import ServicioCard from "../../components/Servicios/ServicioCard";
import ButtonOne from "../../components/buttons/ButtonOne";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale/es';
import CitaBoxShort from "../../components/Citas/CitaBoxShort";

const Home = () => {
  const { UserTwo, Arrow, QuestionIcon, CloseIcon, CalendarioNumeroVerde, AutodiagnosticoBlack, Logo, CalendarWhiteIcon } = Icons;
  const {handleStatusCode} = usePromotions();
  const {getServices} = useServices();
  const {getPopups, popups} = usePopUp();
  const {handleGestionToken} = useTokenPush();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const { name, phone, user_id } = useSelector((state: any) => state.user);
  const [chatVisible, setChatVisible] = useState(false);
  const [modalPopUp, setModalPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo]: any = useState({});
  const viewportWidth = Dimensions.get('window').width;
  const IMAGE_WIDTH = viewportWidth * 0.8;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 0.9;
  const dispatch = useDispatch();
  const calendaryState = useSelector((state : any) => state.calendary);
  const MedicalLineState = useSelector((state : any) => state.medicalLine);

useEffect(() => {
  handleStatusCode(user_id);
  getServices();
  getPopups();
  handleGestionToken(); // no se esta ejecutando
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

const handleMedicalLine = async (linea: any) => {
  dispatch(setMedicalLineInfo({
    ...MedicalLineState,
    lineaMedica: linea
  }));
  navigation.navigate('Agendamiento');
};

const obtenerCitas = async (telefono: any) => {
  try {
      const response = await fetch(`https://roganscare.com:5520/citas/telefono/${telefono}/mas-cercana`);
      const data = await response.json();
      return data;
  } catch (error) {
        console.error('Error al obtener citas:', error);
    }
  };

  const formatearFecha = (fechaIsoString: string) => {
    if (!fechaIsoString) return '';

    const [year, month, day] = fechaIsoString.slice(0, 10).split('-').map(Number);
    const [hour, minute] = fechaIsoString.slice(11, 16).split(':').map(Number);

    // Crear la fecha en UTC para evitar desfases
    const fecha = new Date(Date.UTC(year, month - 1, day, hour, minute));

    const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);

    const horas12 = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';

    return `${horas12}:${minute.toString().padStart(2, '0')} ${ampm} | ${fechaFormateada}`;
};


  const [proximaCita, setProximaCita]:any = useState(null);

  useEffect(() => {
    obtenerCitas(phone).then(data => {
      console.log(data.message);
      if(data.message) {
        setProximaCita(null);
      } else {
        setProximaCita(data);
      }
    });
  }, [phone]);

  const nombreLinea = (linea: any) => {
  let nombreCompleto;

  if (linea === 'Capilar') {
      nombreCompleto = 'Cuidado del cabello';
  } else if (linea === 'Facial') {
      nombreCompleto = 'Cuidado de la piel';
  } else if (linea === 'Sexual') {
      nombreCompleto = 'Salud sexual';
  } else if (linea === 'Psicología') {
      nombreCompleto = 'Psicología';
  } else if (linea === 'Nutricion') {
      nombreCompleto = 'Nutricion';
  } else if (linea === 'Adn') {
      nombreCompleto = 'Medicina predictiva | ADN';
  } else {
      nombreCompleto = linea;
  }

  return nombreCompleto;
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
              activeOpacity={1}
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
            <Text style={styles.title}>
              {name !== '' ? (
                'Hola, ' + name
              ):(
                'Bienvenido a Rogans'
              )

              }
            </Text>
          </View>
          <TouchableOpacity style={{overflow: 'hidden',}} onPress={() => navigation.navigate("Perfil")}>
            <UserTwo width={20} height={20} />
          </TouchableOpacity>
        </View>
        {/* ICONOS DE HEADER */}
       {/* <View style={styles.containerNavBtn}>
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
          <TouchableOpacity onPress={() => navigation.navigate("Pagos")} style={styles.navBtn}>
            <Text style={styles.textNavBtn}>
              Pago
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Tienda")} style={styles.navBtn}>
            <Text style={styles.textNavBtn}>
              Tienda
            </Text>
          </TouchableOpacity>
        </View>*/}

        {
            proximaCita !== null ? (
              <View style={{gap: 10, marginBottom: 20,}}>
                <Text style={{fontFamily: MyFont.regular, fontSize: MyFont.size[5], color: MyColors.neutro[4], paddingHorizontal: 16,}}>Tu próxima cita</Text>
                <CitaBoxShort
                    tituloCita={nombreLinea(proximaCita.linea_medica)}
                    modalidad={proximaCita.modalidad}
                    fecha={formatearFecha(proximaCita.fecha_cita)}
                    estadoCita={proximaCita.estado}
                    sidesMargin={16}
                    lineaMedica={proximaCita.linea_medica}
                />
              </View>
            ) : (
                ''
            )
        }
        
        <HomeBannesrs />

        <View style={styles.agendamientoBox}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12,}}>
            <Image source={require('../../../../assets/doctora.png')} style={styles.agendamientoBoxImage} />
            <View>
              <Text style={{fontFamily: MyFont.regular, fontSize: MyFont.size[6], color: MyColors.white,}}>Agenda tu cita ahora</Text>
              <Text style={{fontFamily: MyFont.bold, fontSize: MyFont.size[4], color: MyColors.white,}}>Consulta medica</Text>
              <Text style={{fontFamily: MyFont.regular, fontSize: MyFont.size[6], color: MyColors.white,}}>Con los mejores especialistas</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            {/*<ButtonTwo text='Autodiagnóstico' icon={AutodiagnosticoBlack} width={145} />*/}
            <ButtonOne text='Agenda ahora' icon={CalendarioNumeroVerde} pressAction={() => {handleMedicalLine('')}} />
          </View>
        </View>

        <View style={{paddingHorizontal: 16,}}>
          <Text style={{fontFamily: MyFont.medium, fontSize: 30, color: MyColors.verde[4],}}>Cuidate con nosotros</Text>
          <Text style={{fontFamily: MyFont.regular, fontSize: 15, color: MyColors.neutro[4], marginBottom: 20,}}>Encuentra el servicio médico perfecto para ti</Text>
          <ServicioCard pressAction={() => {handleMedicalLine('Capilar')}} title='Adiós' titleColored='calvicie' titleColor='#00D0B1' text='Recupera tu cabello' imageUrl='diagnosis-alopecia' />
          <ServicioCard pressAction={() => {handleMedicalLine('Facial')}} title='Renueva tu' titleColored='rostro' titleColor='#AD50E8' text='Tratamientos de rejuvenecimiento.' imageUrl='diagnosis-facial' />
          <ServicioCard pressAction={() => {handleMedicalLine('Corporal')}} title='Cuida tu' titleColored='cuerpo' titleColor='#eda145' text='Bienestar de nutrición' imageUrl='diagnosis-nutricion' />
          <ServicioCard pressAction={() => {handleMedicalLine('Sexual')}} title='Ten buen' titleColored='sexo' titleColor='#FF8290' text='Mejora tu vida íntima.' imageUrl='diagnosis-sexual' />
          <ServicioCard pressAction={() => {handleMedicalLine('Psicologia')}} title='Encuentra' titleColored='calma' titleColor='#518BFF' text='El bienestar comienza en tu mente.' imageUrl='diagnosis-psicologia' />
          <ServicioCard pressAction={() => {handleMedicalLine('Adn')}} title='Predice con' titleColored='ADN' titleColor='#5e5f61' text='Predicción avanzada y precisa.' imageUrl='diagnosis-adn' />
        </View>

        {/*<View style={styles.section}>
          <Text style={styles.titleSection}>Consultas{"\n"}para ti</Text>
          <ButtonConsultationList />
        </View>
        <View style={{ marginBottom: 50 }}>
          <ConsultCard cards={consultCards} />
        </View>
        <View style={styles.section}>
          <Text style={styles.titleSection}>Procedimientos{"\n"}para ti</Text>
          <ButtonProcedureList />
        </View>
        <View style={{ marginBottom: 30 }}>
          <ProcedureCard cards={procedureCards} />
        </View>*/}
        <View style={{ marginTop: 40, marginBottom: 150, alignItems: 'center', }}>
          <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://rogansya.com/rogans-app/legal/')} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>
            <Text style={{ fontFamily: MyFont.medium, fontSize: 16, }}>Términos y condiciones</Text>
            <Arrow width={16} height={16} />
          </TouchableOpacity>
          <Logo style={{marginTop: 30}} width={80} height={40}/>
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
    paddingTop: Platform.OS === 'android' ? 10 : 30,
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
    borderRadius: 30,
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
  agendamientoBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: MyColors.verde[5],
    borderRadius: 18,
    paddingTop: 18,
    paddingBottom: 22,
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 15,
    shadowColor: MyColors.neutro[2],
    shadowOffset: { width: 20, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 15,
    gap: 8,
  },
  agendamientoBoxImage: {
    width: 60,
    height: 60,
  }
});

export default Home;
