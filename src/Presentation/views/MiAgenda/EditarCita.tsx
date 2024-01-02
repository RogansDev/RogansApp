import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../App';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';

const EditarCita = () => {
    const { NextIcon, CalendarIcon, ProfileIcon, ClockIcon, CardsIcon, CloseIcon, TrashIcon, TickCircleWhiteicon } = Icons;

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    const procedureContent = {
        image: require('../../../../assets/botox2.png'),
        titleProcedimiento: 'Botox full face',
        oldPrice: 50.000,
        price: 20000,
        iva: 0,
    };

    const [isExpanded, setExpanded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const toggleAccordion = () => {
        setExpanded(!isExpanded);
    };   

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalFade} 
                    onPress={() => setModalVisible(false)}
                    activeOpacity={1} // Esto asegura que el área transparente también responda al toque
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View>
                                <TouchableOpacity style={styles.cerrarBtn} onPress={() => setModalVisible(false)}>
                                    <CloseIcon width={16} height={16}/>
                                    <Text style={styles.textModal}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginVertical: 40,}}>
                                <Text style={[styles.titleModal, {textAlign: 'center',}]}>¿Estas seguro?</Text>
                                <Text style={[styles.textModal, {textAlign: 'center',}]}>Cancelar tu cita puede ....</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 8,}}>
                                <TouchableOpacity style={styles.conservarBtn}>
                                    <Text style={[styles.textModal, {color: 'white',}]}>No, conservar</Text>
                                    <TickCircleWhiteicon width={16} height={16}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.siCancelarBtn}>
                                    <Text style={styles.textModal}>Si, cancelar cita</Text>
                                    <TrashIcon width={16} height={16}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Editar cita</Text>
                <View style={styles.twoCols}>
                    <Image source={procedureContent.image} style={styles.image} />
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.title2}>{procedureContent.titleProcedimiento}</Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity style={styles.info}>
                        <View>
                            <CalendarIcon style={styles.iconInfo} width={18} height={18}/>
                            <Text style={styles.titleInfo}>Fecha consulta</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View>
                                <Text style={styles.textInfo}>xx/xx/xxxx</Text>
                                <Text style={styles.textInfo}>hh:hh mm</Text>
                            </View>
                            <NextIcon style={{marginLeft: 16}} width={24} height={24}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <View>
                            <ProfileIcon style={styles.iconInfo} width={18} height={18}/>
                            <Text style={styles.titleInfo}>Especialista</Text>
                        </View>
                        <View style={{flex: 0}}>
                            <Text style={styles.textInfo}>Dr. Pepito Perez</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View>
                            <ClockIcon style={styles.iconInfo} width={18} height={18}/>
                            <Text style={styles.titleInfo}>Duración</Text>
                        </View>
                        <View style={{flex: 0}}>
                            <Text style={styles.textInfo}>15 - 30 Mins</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.info}>
                        <View>
                            <CardsIcon style={styles.iconInfo} width={18} height={18}/>
                            <Text style={styles.titleInfo}>Costo</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View>
                                <Text style={styles.textInfo}>${procedureContent.price}</Text>
                            </View>
                            <NextIcon style={{marginLeft: 16}} width={24} height={24}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelarBtn} onPress={() => setModalVisible(true)}>
                            <TrashIcon width={16} height={16}/>
                            <Text style={styles.titleInfo}>Cancelar la cita</Text>
                    </TouchableOpacity>

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

                    <TouchableOpacity onPress={() => navigation.navigate("CitaCancelada")} style={styles.guardarBtn}>
                        <Text style={styles.textGuardarBtn}>Guardar</Text>
                        <TickCircleWhiteicon style={styles.iconGuardarBtn} width={16} height={16}/>
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
        marginTop: 40,
        marginBottom: 80,
        borderRadius: 10,
        backgroundColor: 'white',
        // Sombras para Android
        elevation: 10,
        // Sombras para iOS
        shadowColor: '#F0F0F0',
        shadowOffset: { width: 4, height: 1},
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
        lineHeight: 32,
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
    cancelarBtn: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    guardarBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'black',
        padding: 12,
        marginBottom: 20,
    },
    textGuardarBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: 'white',
    },
    iconGuardarBtn: {
        marginLeft: 8,
    },
    modalFade: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
    },
    cerrarBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    titleModal: {
        fontSize: 24,
        fontFamily: MyFont.bold,
    },
    textModal: {
        fontSize: 13,
        fontFamily: MyFont.regular,
    },
    siCancelarBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    conservarBtn: {
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

export default EditarCita;