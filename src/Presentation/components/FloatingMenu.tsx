import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Platform } from 'react-native';
import { Linking } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';
import useCurrentRoute from '../../hooks/useCurrentRoute';
import Icons from '../theme/Icons';
import UChatWebView from './UChatWebView';

const FloatingMenu = ({ chatVisible, setChatVisible }: any) => {
  const { InicioIcon, ServiciosIcon, MiAgendaIcon, Headphone, InicioGreen, ServiciosGreen, MiAgendaGreen, CloseIcon, MessageIcon } = Icons;

  const currentRoute = useCurrentRoute();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

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

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => setChatVisible(!chatVisible)} style={styles.chat}>
          <MessageIcon width={20} height={20} />
          <Text style={styles.chatText}>Asesoria medica</Text>
        </TouchableOpacity>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={isActive('Home') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('Home') ? <InicioGreen style={styles.menuIcon} width={20} height={20} /> : <InicioIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('Home') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('Home') ? styles.activeMenuText : styles.menuText}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Servicios")}
            style={isActive('Servicios') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('Servicios') ? <ServiciosGreen style={styles.menuIcon} width={20} height={20} /> : <ServiciosIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('Servicios') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('Servicios') ? styles.activeMenuText : styles.menuText}>Servicios</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MiAgenda")}
            style={isActive('MiAgenda') ? styles.activeMenuItem : styles.menuItem}>
            {isActive('MiAgenda') ? <MiAgendaGreen style={styles.menuIcon} width={20} height={20} /> : <MiAgendaIcon style={styles.menuIcon} width={20} height={20} />}
            <View style={isActive('MiAgenda') ? styles.activeTextBorder : styles.textBorder}>
              <Text style={isActive('MiAgenda') ? styles.activeMenuText : styles.menuText}>Mi agenda</Text>
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
    borderBottomWidth: 2,
    borderBottomColor: '#00D0B1',
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
    backgroundColor: '#12B69E',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 16,
  },
  chatText: {
    color: '#FFFFFF',
    fontFamily: MyFont.regular,
  }
});

export default FloatingMenu;
