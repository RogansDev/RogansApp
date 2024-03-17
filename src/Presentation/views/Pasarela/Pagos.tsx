import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import { agendarCita } from '../../../../agendarCitaService';

const Pagos = () => {
    const { VirtualIcon, NextIcon, CalendarIcon, ProfileIcon, ClockIcon, CardsIcon, CalendarWhiteIcon } = Icons;

    const navigation = useNavigation();

    const { horaAgendada, fecha, virtualPresecial }: any = useState();

    const consultationContent = {
        image: require('../../../../assets/implante2.png'),
        titleConsulta: 'Consulta capilar',
        oldPrice: '$50.000',
        price: 'Gratis',
        description: 'Descripción del procedimiento o consulta.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };

    const [isExpanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Confirmar consulta</Text>
                <View style={styles.twoCols}>
                    <Image source={consultationContent.image} style={styles.image} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.title2}>{consultationContent.titleConsulta}</Text>
                        {virtualPresecial === 'Virtual' ? (
                            <View style={{ flexDirection: 'row' }}>
                                <VirtualIcon style={styles.imageConsultationType} width={18} height={18} />
                                <Text style={styles.consultationType}>Virtual</Text>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                <ProfileIcon style={styles.imageConsultationType} width={18} height={18} />
                                <Text style={styles.consultationType}>Presencial</Text>
                            </View>
                        )
                        }
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.info}>
                        <View>
                            <CalendarIcon style={styles.iconInfo} width={18} height={18} />
                            <Text style={styles.titleInfo}>Fecha consulta</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'flex-end', }}>
                                <Text style={styles.textInfo}>{fecha}</Text>
                                <Text style={styles.textInfo}>{horaAgendada}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View>
                            <ClockIcon style={styles.iconInfo} width={18} height={18} />
                            <Text style={styles.titleInfo}>Duración</Text>
                        </View>
                        <View style={{ flex: 0 }}>
                            <Text style={styles.textInfo}>15 - 30 Mins</Text>
                        </View>
                    </View>
                    <View style={[styles.info, { borderBottomWidth: 0 }]}>
                        <View>
                            <CardsIcon style={styles.iconInfo} width={18} height={18} />
                            <Text style={styles.titleInfo}>Costo</Text>
                        </View>
                        <View style={{ flex: 0 }}>
                            <Text style={styles.textInfo}>Gratuito</Text>
                        </View>
                    </View>

                    <View style={styles.accordionItemContainer}>
                        <View style={styles.accordionItem}>
                            <TouchableOpacity onPress={toggleAccordion}>
                                <View style={styles.headerAccordion}>
                                    <Text style={styles.titleAccordion}>Política de cancelación</Text>
                                    <Text style={styles.iconAccordion}>{isExpanded ? '-' : '+'}</Text>
                                </View>
                            </TouchableOpacity>
                            {isExpanded && <Text style={styles.contentAccordion}>¿Qué precio  tiene un trasplante capilar en Colombia ?</Text>}
                        </View>
                    </View>

                    <View style={styles.agendar}>
                        <View>
                            <Text style={styles.price}>Gratis</Text>
                            <Text style={styles.consulta}>Consulta capilar</Text>
                        </View>
                        <TouchableOpacity style={styles.agendarBtn}>
                            <Text style={styles.textAgendarBtn}>Agendar</Text>
                            <CalendarWhiteIcon style={styles.iconAgendarBtn} width={16} height={16} />
                        </TouchableOpacity>
                    </View>
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
        height: 104,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        marginTop: 30,
        marginBottom: 50,
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
        marginBottom: 14,
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
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0',
    },
    iconInfo: {
        marginBottom: 8,
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
    accordionItemContainer: {
        marginVertical: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        // Sombras para Android
        elevation: 10,
        // Sombras para iOS
        shadowColor: '#F0F0F0',
        shadowOffset: { width: 4, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    accordionItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
        overflow: 'hidden',
    },
    headerAccordion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'white',
    },
    titleAccordion: {
        fontSize: 12,
        fontFamily: MyFont.regular,
    },
    iconAccordion: {
        fontSize: 24,
        fontFamily: MyFont.light,
        lineHeight: 24,
    },
    contentAccordion: {
        fontSize: 12,
        fontFamily: MyFont.regular,
        color: '#909090',
        padding: 12,
        backgroundColor: 'white',
    },
    agendar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    price: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: '#404040',
        marginBottom: 4,
    },
    consulta: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#404040',
    },
    agendarBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'black',
        padding: 12,
        width: 180,
    },
    textAgendarBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: 'white',
    },
    iconAgendarBtn: {
        marginLeft: 8,
    },
});

export default Pagos;