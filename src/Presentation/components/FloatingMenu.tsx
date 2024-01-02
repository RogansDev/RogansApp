import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Platform } from 'react-native';
import { Linking } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import useCurrentRoute from '../../hooks/useCurrentRoute';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../App';
import Icons from '../theme/Icons';
import UChatWebView from './UChatWebView';

const FloatingMenu = () => {
  const { InicioIcon, ServiciosIcon, MiAgendaIcon, Headphone, InicioBlack, ServiciosBlack, MiAgendaBlack, CloseIcon } = Icons;

  const [chatVisible, seChatVisible] = useState(false);

  const currentRoute = useCurrentRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const isActive = (routeName: string) => {
    return currentRoute === routeName;
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatVisible}
        onRequestClose={() => seChatVisible(!chatVisible)}
      >
      <View style={styles.uchatContainer}>
          <TouchableOpacity onPress={() => seChatVisible(!chatVisible)} style={{position: 'absolute', top: 12, left: 15,}}>
            <CloseIcon width={16} height={16} />
          </TouchableOpacity>
          <UChatWebView />
        </View>
        <TouchableOpacity onPress={() => seChatVisible(!chatVisible)} style={styles.uchatOverlay} />
      </Modal>

      <View style={styles.menuContainer}>
        <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={isActive('Home') ? styles.activeMenuItem : styles.menuItem}>
              {isActive('Home') ? <InicioBlack style={styles.menuIcon} width={20} height={20}/> : <InicioIcon style={styles.menuIcon} width={20} height={20}/>}
              <Text style={styles.menuText}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Servicios")}
              style={isActive('Servicios') ? styles.activeMenuItem : styles.menuItem}>
              {isActive('Servicios') ? <ServiciosBlack style={styles.menuIcon} width={20} height={20}/> : <ServiciosIcon style={styles.menuIcon} width={20} height={20}/>}
              <Text style={styles.menuText}>Servicios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("MiAgenda")}
              style={isActive('MiAgenda') ? styles.activeMenuItem : styles.menuItem}>
              {isActive('MiAgenda') ? <MiAgendaBlack style={styles.menuIcon} width={20} height={20}/> : <MiAgendaIcon style={styles.menuIcon} width={20} height={20}/>}
              <Text style={styles.menuText}>Mi agenda</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => seChatVisible(!chatVisible)} style={styles.menuItem}>
              <Headphone style={styles.menuIcon} width={20} height={20}/>
              <Text style={styles.menuText}>Comunícate</Text>
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
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    // Sombras para Android
    elevation: 5,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 2, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    marginBottom: 8,
  },
  menuText: {
    fontSize: 13,
    fontFamily: MyFont.regular,
  },
  activeMenuItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#00D0B1',
  },
  uchatContainer: {
    position: 'absolute',
    width: '100%',
    height: '60%',
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
  }
});

export default FloatingMenu;
