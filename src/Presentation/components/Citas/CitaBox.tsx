import React from "react";
import { Text, View, Image } from "react-native";
import { MyStyles, MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons'; 

const CitaBox = ({}: any) => {
    const { UbicacionVerde, Calendar } = Icons;

    return (
        <View style={Styles.citaBoxContainer}>
            <View style={Styles.leftLine}></View>
            <View style={Styles.citaBoxContent}>
                <Image source={{ uri: 'url_de_la_imagen' }} style={Styles.profileImage} />
                <View style={Styles.textContainer}>
                    <Text style={Styles.title}>Botox</Text>
                    <Text style={Styles.subTitle}>Kits/Citas</Text>
                </View>
            </View>
            <View style={Styles.detailsSection}>
                <Text style={Styles.detailsTitle}>Detalles</Text>
                <View style={Styles.iconRow}>
                    <View style={Styles.iconContainer}>
                        <UbicacionVerde width={16} height={16} />
                        <Text style={Styles.detailsText}>Virtual</Text>
                    </View>
                    <View style={Styles.iconContainer}>
                        <Calendar width={16} height={16} />
                        <Text style={Styles.detailsText}>28 Ago 2024 - 8:00 a.m.</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    citaBoxContainer: {
        flexDirection: 'column',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5,
        backgroundColor: 'rgba(159, 237, 226, 0.2)', 
        position: 'relative',
    },
    leftLine: {
        width: 4,
        backgroundColor: MyColors.verde[1],
        position: 'absolute',
        left: 10,
        top: 15,
        bottom: 15,
        borderRadius: 2,
    },
    citaBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: MyColors.verde[3],
    },
    subTitle: {
        fontSize: 13,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.regular,
    },
    detailsSection: {
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'column', // Mantiene "Detalles" alineado arriba
    },
    detailsTitle: {
        fontSize: 13,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.regular,
        marginBottom: 5, // Espacio entre "Detalles" y los iconos
    },
    iconRow: {
        flexDirection: 'row', // Asegura que "Virtual" y la fecha estén en la misma fila
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15, // Espacio entre los íconos y sus textos
    },
    detailsText: {
        fontSize: 13,
        color: MyColors.neutro[2],
        fontFamily: MyFont.regular,
        marginLeft: 5,  // Espacio entre el ícono y el texto
        lineHeight: 16,  // Alinea el texto con la altura del ícono
    },
});

export default CitaBox;
