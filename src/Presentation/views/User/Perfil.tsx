import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../App';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import PopUpCerrarSesion from '../../components/PopUpCerrarSesion';

const Perfil = () => {
    const { Forget, UserIcon, Camara, CloseIcon } = Icons;

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    const PopUpCerrarSesionRef = useRef(null);

    const abrirPopUp = () => {        
        if (PopUpCerrarSesionRef.current) {
            PopUpCerrarSesionRef.current.togglePopUp();
          }
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.title}>Perfil</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 30,}}>
                        <TouchableOpacity style={{overflow: 'hidden',}}>
                            <UserIcon width={130} height={130}/>
                            <View style={styles.camaraIcon}>
                                <Camara width={24} height={24}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.info}>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 3,}}>
                                <Text style={styles.subtitleInfo}>Nombre</Text>
                                <Text style={styles.titleInfo}>Juanito Alimaña</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 3,}}>
                                <Text style={styles.subtitleInfo}>Documento de identidad</Text>
                                <Text style={styles.titleInfo}>12345678910</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 3,}}>
                                <Text style={styles.subtitleInfo}>Teléfono</Text>
                                <Text style={styles.titleInfo}>3123243245</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 3,}}>
                                <Text style={styles.subtitleInfo}>Correo</Text>
                                <Text style={styles.titleInfo}>rogans@gmail.com</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40,}}>
                            <TouchableOpacity style={{flexDirection: 'row', gap: 5,}}>
                                <Forget width={16} height={16}/>
                                <Text>
                                    Cambiar mi contraseña
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30,}}>
                            <TouchableOpacity onPress={abrirPopUp} style={{flexDirection: 'row', gap: 5,}}>
                                <CloseIcon width={16} height={16}/>
                                <Text>
                                    Cerrar sesión
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <PopUpCerrarSesion ref={PopUpCerrarSesionRef} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCFCFC',
      position: "relative",
    },
    scrollContainer: {
        position: "relative",
    },
    title: {
        fontSize: 24,
        fontFamily: MyFont.bold,
        color: 'black',
        marginTop: 20,
        paddingHorizontal: 16,
    },
    twoCols: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 10,
    },
    image: {
        position: 'relative',
        width: 150,
        height: 104,
        marginRight: 22,
        borderRadius: 15,
    },
    title2: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: 'black',
        marginBottom: 4,
    },
    imageConsultationType: {
        marginRight: 10,
    },
    consultationType: {
        fontSize: 14,
        fontFamily: MyFont.medium,
        color: '#404040',
    },
    textContainer: {
        position: 'relative',
        marginTop: 0,
        width: '100%',
        height: 'auto',
        paddingHorizontal: 16,
        zIndex: 5,
    },
    info: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconInfo: {
        marginRight: 8,
    },
    subtitleInfo: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#909090',
    },
    titleInfo: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: 'black',
    },
    textInfo: {
        fontSize: 12,
        fontFamily: MyFont.regular,
        color: '#404040',
    },
    camaraIcon:{
        position: 'absolute',
        backgroundColor: 'white',
        right: 5,
        bottom: 5,
        padding: 12,
        borderRadius: 25,
    },
});

export default Perfil;