import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import { agendarCita } from '../../../../agendarCitaService';


const PendingPage = () => {
    const { TickCircleIcon, TickCircleWhiteicon } = Icons;

    const user = useSelector( (state : any) => state.user);
    const fecha = useSelector( (state : any) => state.calendary.fecha);
    const horaAgendada = useSelector( (state : any) => state.calendary.horaAgendada);
    const cedulaUsuario = user.document;

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TickCircleIcon width={80} height={80} />
                <Text style={styles.title}>Tu cita se ha{"\n"}agendado con éxito Pendiente</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.btn}>
                    <Text style={styles.textBtn}>Continuar</Text>
                    <TickCircleWhiteicon style={styles.iconBtn} width={16} height={16} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        textAlign: 'center',
        marginVertical: 30,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'black',
        padding: 12,
        width: 320,
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
    btnDisabled: {
        opacity: 0.6,
    },
});

export default PendingPage;