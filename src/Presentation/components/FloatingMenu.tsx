import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Platform, ScrollView } from 'react-native';
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

const FloatingMenu = ({ chatVisible, setChatVisible }: any) => {
  const { InicioIcon, ServiciosIcon, MiAgendaIcon, Headphone, InicioBlack, ServiciosBlack, MiAgendaBlack, CloseIcon, CalendarVerde, CalendarAddVerde, AgendarIcon, PhoneApp, Audifonos, Referidos, AgendarBlackIcon, Main, Call } = Icons;

  const currentRoute = useCurrentRoute();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const [telemedicinaVisible, setTelemedicinaVisible] = useState(false);

  const isActive = (routeName: string) => {
    return currentRoute === routeName;
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
        <View style={styles.uchatContainer}>
          <TouchableOpacity onPress={() => setTelemedicinaVisible(!telemedicinaVisible)} style={{ position: 'absolute', top: 12, left: 15, flexDirection: 'row', gap: 6, alignItems: 'center', }}>
              <CloseIcon width={16} height={16} />
              <Text style={MyFontStyles.text_sm}>Cerrar</Text>
            </TouchableOpacity>
          <ScrollView>
            <View>
              <Text style={MyFontStyles.title_1}>Mi agenda</Text>
              <Text style={MyFontStyles.title_2}>Mi agenda y telemedicina</Text>
            </View>
            <CitaBox />
            <View style={{flexDirection: 'row'}}>
              <CircleButton text="Agendar cita" width="auto" icon={CalendarAddVerde} iconSize={{width: 22, height: 22}} />
              <CircleButton text="Ver Citas" width="auto" icon={CalendarVerde} iconSize={{width: 22, height: 22}} />
            </View>
            <View>
              <Text style={MyFontStyles.title_2}>Atención 24/7</Text>
              <View style={{flexDirection: 'row'}}>
                <CircleButton text="Llamanos" width="auto" backgroundColor={MyColors.fondo[2]} icon={PhoneApp} iconSize={{width: 22, height: 22}} />
                <CircleButton text="Chat en vivo" width="auto" backgroundColor={MyColors.fondo[2]} icon={Audifonos} iconSize={{width: 22, height: 22}} />
              </View>
            </View>
            <View>
              <Text style={MyFontStyles.title_2}>Comparte y ganá</Text>
              <View style={{flexDirection: 'row'}}>
                <CircleButton text="Referidos" width="auto" backgroundColor={MyColors.fondo[2]} icon={Referidos} iconSize={{width: 22, height: 22}} />
              </View>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => setTelemedicinaVisible(!telemedicinaVisible)} style={styles.uchatOverlay} />
      </Modal>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => setChatVisible(!chatVisible)} style={styles.chat}>
          <Call width={25} height={25} />
          <Text style={styles.chatText}>Llama Ya</Text>
        </TouchableOpacity>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={isActive('Home') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('Home') ? <InicioBlack style={styles.menuIcon} width={20} height={20} /> : <InicioIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('Home') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('Home') ? styles.activeMenuText : styles.menuText}>Inicio</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MiAgenda")}
            style={isActive('MiAgenda') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('MiAgenda') ? <MiAgendaBlack style={styles.menuIcon} width={20} height={20} /> : <MiAgendaIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('MiAgenda') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('MiAgenda') ? styles.activeMenuText : styles.menuText}>Historial</Text>
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
            onPress={() => navigation.navigate("MiAgenda")}
            style={isActive('MiAgenda') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('MiAgenda') ? <AgendarBlackIcon style={styles.menuIcon} width={20} height={20} /> : <AgendarIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('MiAgenda') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('MiAgenda') ? styles.activeMenuText : styles.menuText}>Tienda</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Servicios")}
            style={isActive('Servicios') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('Servicios') ? <ServiciosBlack style={styles.menuIcon} width={20} height={20} /> : <ServiciosIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('Servicios') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('Servicios') ? styles.activeMenuText : styles.menuText}>Programas</Text>
            </View>
          </TouchableOpacity>
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
    height: 82,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderRadius: 20,
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
    height: 90,
    borderRadius: 45,
    backgroundColor: MyColors.verde[4],
    top: -55,
    marginHorizontal: 20,
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
    fontSize: 13,
    fontFamily: MyFont.regular,
    textAlign: 'center',
    paddingBottom: 4,
    color: 'black',
  },
  activeMenuText: {
    fontSize: 13,
    fontFamily: MyFont.regular,
    textAlign: 'center',
    paddingBottom: 4,
    color: MyColors.black,
  },
  mainMenuText: {
    fontSize: 13,
    fontFamily: MyFont.regular,
    textAlign: 'center',
    paddingBottom: 4,
    color: MyColors.white,
  },
  activeMainMenuText: {
    fontSize: 13,
    fontFamily: MyFont.regular,
    textAlign: 'center',
    paddingBottom: 4,
    color: '#12B69E',
  },
  activeMenuItem: {
    alignItems: 'center',
    width: 100,
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
