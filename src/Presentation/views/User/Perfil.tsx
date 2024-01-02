import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../App';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';

const Perfil = () => {
    const { NextIcon, UbicacionIcon, AjustesIcon, UserIcon, EditarIcon } = Icons;

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Perfil</Text>
                <View style={styles.twoCols}>
                    <UserIcon width={65} height={65}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.title2}>Juanito Alimaña</Text>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                            <EditarIcon width={16} height={16}/>
                            <Text style={{fontFamily: MyFont.regular, fontSize: 13, color: '#909090',}}>Editar perfil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity style={styles.info}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <UbicacionIcon style={styles.iconInfo} width={18} height={18}/>
                            <Text style={styles.titleInfo}>Direcciones guardadas</Text>
                        </View>
                        <NextIcon style={{marginLeft: 16}} width={24} height={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.info}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <AjustesIcon style={styles.iconInfo} width={18} height={18}/>
                            <Text style={styles.titleInfo}>Ajustes</Text>
                        </View>
                        <NextIcon style={{marginLeft: 16}} width={24} height={24}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
        paddingTop: 30,
        paddingBottom: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0',
    },
    iconInfo: {
        marginRight: 8,
    },
    titleInfo: {
        fontSize: 14,
        fontFamily: MyFont.medium,
        color: 'black',
    },
    textInfo: {
        fontSize: 12,
        fontFamily: MyFont.regular,
        color: '#404040',
    },
});

export default Perfil;