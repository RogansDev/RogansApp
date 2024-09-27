import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons';

const ServicioBox = ({text, greenText}:any) => {
    const { UbicacionVerde } = Icons;

    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}>
             {text} <Text style={styles.linkText}>{greenText}</Text>
            </Text>
            <UbicacionVerde width={30} height={30} style={styles.icon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20, 
        paddingHorizontal: 20, 
        borderRadius: 10, 
        backgroundColor: 'rgba(159, 237, 226, 0.1)', 
        borderColor: MyColors.neutroDark[3], 
        borderWidth: 1, 
    },
    text: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: MyColors.neutroDark[4],
    },
    linkText: {
        color: MyColors.verde[3], 
    },
    icon: {
        marginLeft: 10, 
    },
});

export default ServicioBox;
