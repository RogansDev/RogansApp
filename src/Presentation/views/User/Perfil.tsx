import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Button, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import PopUpCerrarSesion from '../../components/PopUpCerrarSesion';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { useSelector } from "react-redux";
import useImagePicker from '../../../hooks/useImagePicker';

const Perfil = () => {
    const { Forget, UserIcon, Camara, CloseIcon, GalleryAdd } = Icons;
    const state = useSelector( (state : any) => state);
    const userData = state.user;

    const { image, pickImage, takePhoto } = useImagePicker();

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const [isModalVisible, setModalVisible] = useState(false);

    const PopUpCerrarSesionRef = useRef(null);

    const abrirPopUp = () => {        
        if (PopUpCerrarSesionRef.current) {
            PopUpCerrarSesionRef.current.togglePopUp();
          }
    };

    const handleSessionClose = () => {

    }

    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setModalVisible(false)}
                    activeOpacity={1}
                />
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{position: 'absolute', top: 15, left: 15, zIndex: 2,}}>
                        <CloseIcon width={16} height={16}/>
                    </TouchableOpacity>
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <UserIcon style={{marginTop: 40}} width={250} height={250}/>
                    )}
                    <View style={{flexDirection: 'row', gap: 18,}}>
                        <TouchableOpacity onPress={pickImage} style={styles.editImage}>
                            <GalleryAdd width={24} height={24}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePhoto} style={styles.editImage}>
                            <Camara width={24} height={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.title}>Perfil</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 30,}}>
                        <TouchableOpacity
                            style={{overflow: 'hidden', width: 150, height: 150, justifyContent: 'center', alignItems: 'center',}}
                            onPress={() => setModalVisible(true)}
                        >
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    style={styles.userImage}
                                />
                            ) : (
                                <UserIcon width={150} height={150}/>
                            )}
                            <View style={styles.camaraIcon}>
                                <Camara width={24} height={24}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.info}>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 3,}}>
                                <Text style={styles.subtitleInfo}>Nombre</Text>
                                <Text style={styles.titleInfo}>{userData.name + ' ' + userData.lastname}</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 3,}}>
                                <Text style={styles.subtitleInfo}>Documento de identidad</Text>
                                <Text style={styles.titleInfo}>{userData.document}</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 3,}}>
                                <Text style={styles.subtitleInfo}>Teléfono</Text>
                                <Text style={styles.titleInfo}>{userData.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 3,}}>
                                <Text style={styles.subtitleInfo}>Correo</Text>
                                <Text style={styles.titleInfo}>{userData.email}</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40,}}>
                            <TouchableOpacity 
                               style={{flexDirection: 'row', gap: 5,}} 
                               onPress={() => navigation.navigate("PassUpdatekeyDash")}
                            >
                                <Forget width={16} height={16}/>
                                <Text>
                                    Cambiar mi contraseña
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30,}}>
                            <TouchableOpacity onPress={handleSessionClose} style={{flexDirection: 'row', gap: 5,}}>
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
    userImage: {
        width: 140,
        height: 140,
        borderRadius: 75,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        overflow: 'hidden',
    },
    modalImage: {
        width: '80%',
        height: 300,
        resizeMode: 'contain',
        marginTop: 40,
    },
    editImage: {
        marginVertical: 25,
        padding: 12,
        borderWidth: 1,
        borderColor: '#909090',
        borderRadius: 16,
    },
});

export default Perfil;