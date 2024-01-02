import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { MyFont } from "../theme/AppTheme";
import Icons from '../theme/Icons';

const PopUpError = forwardRef((props, ref) => {
    const { ArrowWhiteIcon, CloseIcon } = Icons;

    const [visiblePopUp, setVisiblePopUp] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const togglePopUpError = (mensaje: string = "Ocurrió un error") => {
        setMensajeError(mensaje);
        setVisiblePopUp(!visiblePopUp);
    };
    
    useImperativeHandle(ref, () => ({
        togglePopUpError,
    }));


    return (
        <>
        <Modal
            visible={visiblePopUp}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setVisiblePopUp(false)}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => setVisiblePopUp(false)} style={{position: 'absolute', top: 20, left: 20,}}>
                        <CloseIcon width={16} height={16} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{mensajeError}</Text>
                    <TouchableOpacity onPress={() => setVisiblePopUp(false)} style={styles.btn}>
                        <Text style={styles.textBtn}>Volver</Text>
                        <ArrowWhiteIcon style={styles.iconBtn} width={16} height={16} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
        position: 'relative',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 20,
    },
    title: {
        width: 250,
        fontSize: 18,
        fontFamily: MyFont.medium,
        textAlign: 'center',
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
});

export default PopUpError;