import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';
import { MyFont } from "../theme/AppTheme";
import Icons from '../theme/Icons';

const PopUpCerrarSesion = forwardRef((props, ref) => {
    const { ArrowWhiteIcon, CloseIcon } = Icons;

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const [visiblePopUp, setVisiblePopUp] = useState(false);

    const togglePopUp = () => {
        setVisiblePopUp(!visiblePopUp);
    };
    
    useImperativeHandle(ref, () => ({
        togglePopUp,
    }));

    const handleSessionClose = () => {

    }


    return (
        <>
        <Modal
            visible={visiblePopUp}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setVisiblePopUp(false)}
        >
            <View style={styles.container}>
            <TouchableOpacity onPress={() => setVisiblePopUp(false)} style={styles.overlay} />
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => setVisiblePopUp(false)} style={{position: 'absolute', top: 20, left: 20,}}>
                        <CloseIcon width={16} height={16} />
                    </TouchableOpacity>
                    <Text style={styles.title}>¿Estás seguro de que quieres cerrar tu sesión?</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 20,}}>
                        <TouchableOpacity onPress={() => setVisiblePopUp(false)} style={styles.noCerrarBtn}>
                            <Text style={[styles.textModal, {color: 'white',}]}>No cerrarla</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSessionClose} style={styles.siCerrarBtn}>
                            <Text style={styles.textModal}>Si, cerrar la sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        flex: 1,
    },
    content: {
        position: 'relative',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 20,
        zIndex: 2,
    },
    title: {
        width: 250,
        fontSize: 18,
        fontFamily: MyFont.medium,
        textAlign: 'center',
        paddingTop: 15,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'black',
        padding: 12,
        marginTop: 20,
    },
    textBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: 'white',
    },
    iconBtn: {
        marginLeft: 8,
    },
    textModal: {
        fontSize: 13,
        fontFamily: MyFont.regular,
    },
    siCerrarBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    noCerrarBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: 'black',
        borderRadius: 10,
    },
});

export default PopUpCerrarSesion;