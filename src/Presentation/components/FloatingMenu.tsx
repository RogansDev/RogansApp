import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Platform, ScrollView, Alert } from 'react-native';
import { Linking } from 'react-native';
import { MyColors, MyFont, MyFontStyles } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';
import useCurrentRoute from '../../hooks/useCurrentRoute';
import Icons from '../theme/Icons';
import UChatWebView from './UChatWebView';
import CitaBox from './Citas/CitaBox';
import CircleButton from './buttons/CircleButton';
import CitaCard from './Citas/CitaCard';
import { useDispatch, useSelector } from 'react-redux';
import { setMedicalLineInfo } from '../../state/MedicalLineSlice';

const FloatingMenu = ({ chatVisible, setChatVisible }: any) => {
  const { InicioIcon, InicioGreen, ServiciosIcon, MiAgendaIcon, MiAgendaGreen, Headphone, InicioBlack, ServiciosBlack, MiAgendaBlack, CloseIcon, CalendarVerde, CalendarAddVerde, AgendarIcon, PhoneApp, Audifonos, Referidos, AgendarBlackIcon, Main, Call } = Icons;

  const currentRoute = useCurrentRoute();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const dispatch = useDispatch();
  const MedicalLineState = useSelector((state : any) => state.medicalLine);

  const [telemedicinaVisible, setTelemedicinaVisible] = useState(false);

  const isActive = (routeName: string) => {
    return currentRoute === routeName;
  };

  const handleMedicalLine = async (linea: any) => {
    dispatch(setMedicalLineInfo({
      ...MedicalLineState,
      lineaMedica: linea
    }));
    setTelemedicinaVisible(!telemedicinaVisible);
    navigation.navigate('Agendamiento');
  };

  const handleCall = () => {
    const phoneNumber = 'tel:+573209234629';
    Linking.openURL(phoneNumber);
  };

  const handleChat = () => {
    setTelemedicinaVisible(!telemedicinaVisible);
    setChatVisible(!chatVisible);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatVisible}
        onRequestClose={() => setChatVisible(!chatVisible)}
      >
        <View style={styles.uchatContainer}>
          <TouchableOpacity onPress={() => setChatVisible(!chatVisible)} style={{ position: 'absolute', top: 12, left: 15, }}>
            <CloseIcon width={16} height={16} />
          </TouchableOpacity>
          <UChatWebView />
        </View>
        <TouchableOpacity onPress={() => setChatVisible(!chatVisible)} style={styles.uchatOverlay} />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={telemedicinaVisible}
        onRequestClose={() => setTelemedicinaVisible(!telemedicinaVisible)}
      >
        <View style={styles.MiAgendaContainer}>
          <TouchableOpacity onPress={() => setTelemedicinaVisible(!telemedicinaVisible)} style={{ position: 'absolute', top: 12, left: 15, flexDirection: 'row', gap: 6, alignItems: 'center', }}>
              <CloseIcon width={16} height={16} />
              <Text style={MyFontStyles.text_sm}>Cerrar</Text>
            </TouchableOpacity>
          <ScrollView style={styles.MiAgendaScrollView}>
            <View style={{paddingHorizontal: 16}}>
              <Text style={MyFontStyles.title_1}>Mi agenda</Text>
              <Text style={MyFontStyles.title_2}>Mi agenda y telemedicina</Text>
            </View>
            <CitaBox estadoCita='agendada' backgroundColor={MyColors.verdeDark[6]} sidesMargin={16} />
            <View style={{flexDirection: 'row', marginBottom: 40, paddingHorizontal: 16}}>
              <CircleButton pressAction={() => {handleMedicalLine('')}} text="Agendar cita" width="auto" icon={CalendarAddVerde} iconSize={{width: 22, height: 22}} />
              <CircleButton text="Ver Citas" width="auto" icon={CalendarVerde} iconSize={{width: 22, height: 22}} pressAction={() => {navigation.navigate("MisCitas"), setTelemedicinaVisible(!telemedicinaVisible)}} />
            </View>
            <View style={{paddingHorizontal: 16}}>
              <Text style={MyFontStyles.title_2}>Atención 24/7</Text>
              <View style={{flexDirection: 'row', marginBottom: 40}}>
                <CircleButton pressAction={() => {handleCall()}} text="Llamanos" width="auto" backgroundColor={MyColors.fondo[2]} icon={PhoneApp} iconSize={{width: 22, height: 22}} />
                <CircleButton pressAction={() => {handleChat()}} text="Chat en vivo" width="auto" backgroundColor={MyColors.fondo[2]} icon={Audifonos} iconSize={{width: 22, height: 22}} />
              </View>
            </View>
            {/*<View>
              <Text style={MyFontStyles.title_2}>Comparte y ganá</Text>
              <View style={{flexDirection: 'row'}}>
                <CircleButton text="Referidos" width="auto" backgroundColor={MyColors.fondo[2]} icon={Referidos} iconSize={{width: 22, height: 22}} />
              </View>
            </View>*/}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => setTelemedicinaVisible(!telemedicinaVisible)} style={styles.uchatOverlay} />
      </Modal>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => setChatVisible(!chatVisible)} style={styles.chat}>
          <Call width={25} height={25} />
          <Text style={styles.chatText}>Escríbenos</Text>
        </TouchableOpacity>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={isActive('Home') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('Home') ? <InicioGreen style={styles.menuIcon} width={20} height={20} /> : <InicioBlack style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('Home') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('Home') ? styles.activeMenuText : styles.menuText}>Inicio</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTelemedicinaVisible(!telemedicinaVisible)}
            style={styles.mainMenuItem}>
            <Main style={styles.menuIcon} width={26} height={26} />
            <View style={styles.textBorder}>
              <Text style={styles.mainMenuText}>Mi Agenda</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("MiHistorial")}
            style={isActive('MiHistorial') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('MiHistorial') ? <MiAgendaGreen style={styles.menuIcon} width={20} height={20} /> : <MiAgendaBlack style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('MiHistorial') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('MiHistorial') ? styles.activeMenuText : styles.menuText}>Historial</Text>
            </View>
          </TouchableOpacity>
          
         {/*<TouchableOpacity
            onPress={() => navigation.navigate("MiAgenda")}
            style={isActive('MiAgenda') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('MiAgenda') ? <AgendarBlackIcon style={styles.menuIcon} width={20} height={20} /> : <AgendarIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('MiAgenda') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('MiAgenda') ? styles.activeMenuText : styles.menuText}>Tienda</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Programas")}
            style={isActive('Programas') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('Programas') ? <ServiciosBlack style={styles.menuIcon} width={20} height={20} /> : <ServiciosIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('Programas') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('Programas') ? styles.activeMenuText : styles.menuText}>Programas</Text>
            </View>
          </TouchableOpacity>*/}
        </View>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 20,
  },
  menu: {
    backgroundColor: 'white',
    width: '100%',
    height: 72,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Sombras para Android
    elevation: 5,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 2, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  mainMenuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 58,
    borderRadius: 10,
    backgroundColor: MyColors.verde[4],
    top: -10,
    marginHorizontal: 20,
    paddingTop: 5,
  },
  menuItem: {
    alignItems: 'center',
    width: 100,
  },
  menuIcon: {
    marginBottom: 4,
  },
  textBorder: {
    borderBottomWidth: 0,
    borderBottomColor: '#00D0B1',
  },
  activeTextBorder: {
    
  },
  menuText: {
    fontSize: 11,
    fontFamily: MyFont.regular,
    textAlign: 'center',
    paddingBottom: 4,
    color: 'black',
  },
  activeMenuText: {
    fontSize: 11,
    fontFamily: MyFont.regular,
    textAlign: 'center',
    paddingBottom: 4,
    color: MyColors.verde[2],
  },
  mainMenuText: {
    fontSize: 11,
    fontFamily: MyFont.regular,
    textAlign: 'center',
    paddingBottom: 4,
    color: MyColors.white,
  },
  activeMainMenuText: {
    fontSize: 11,
    fontFamily: MyFont.regular,
    textAlign: 'center',
    paddingBottom: 4,
    color: '#12B69E',
  },
  activeMenuItem: {
    alignItems: 'center',
    width: 100,
  },
  MiAgendaContainer: {
    position: 'absolute',
    width: '100%',
    height: '93%',
    bottom: 0,
    zIndex: 20,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Sombras para Android
    elevation: 10,
    // Sombras para iOS
    shadowColor: "black",
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  MiAgendaScrollView: {
  },
  uchatContainer: {
    position: 'absolute',
    width: '100%',
    height: '93%',
    bottom: 0,
    zIndex: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Sombras para Android
    elevation: 10,
    // Sombras para iOS
    shadowColor: "black",
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  uchatOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chat: {
    position: 'absolute',
    top: -50,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: MyColors.verde[1],
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  chatText: {
    color: '#FFFFFF',
    fontFamily: MyFont.regular,
  }
});

export default FloatingMenu;
