import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { MyColors, MyFont, MyFontStyles } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { Linking } from 'react-native';
import CitaBox from '../../../Presentation/components/Citas/CitaBox';
import TratamientoBox from '../../../Presentation/components/Historial/TratamientoBox';
import ComprasBox from '../../../Presentation/components/Historial/ComprasBox';
import FormulasMedicasBox from '../../../Presentation/components/Historial/FormulasMedicasBox';
import ExamenesBox from '../../../Presentation/components/Historial/ExamenesBox';

const obtenerCitas = async (cedula: any) => {
    try {
      const response = await fetch(`https://rogansya.com/rogans-app/index.php?accion=obtenerPorCedula&cedula=${cedula}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

const capitalize = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatearFecha = (fechaIsoString: any) => {
    const fecha = parseISO(fechaIsoString);
    return {
        diaSemana: capitalize(format(fecha, 'EEEE', { locale: es })),
        numeroDia: format(fecha, 'dd'),
        mes: capitalize(format(fecha, 'MMMM', { locale: es })),
        hora: format(fecha, 'HH:mm')
    };
};

const MiHistorial = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cancelacion, setCancelacion] = useState<string | null>(null);
    const user = useSelector( (state : any) => state.user);
    const telUsuario =  user.phone;
    const cedulaUsuario = user.document;

    interface Cita {
        fecha_que_agendo: string | number | Date;
        nombre: string;
        fecha: string;
        evento_agendado: string;
        status: string;
        valor: string;
        notas: string;
        meet: string;
    }

    const [citas, setCitas] = useState<Cita[]>([]);
    const [cargando, setCargando] = useState(true);
    const [chatVisible, setChatVisible] = useState(false);
    const [citasNoCanceladas, setCitasNoCanceladas] = useState<Cita[]>([]);
    const [citasCanceladas, setCitasCanceladas] = useState<Cita[]>([]);

    useEffect(() => {
        obtenerCitas(cedulaUsuario).then(data => {
            if (data && data.length > 0) {
                const citasOrdenadas = data.sort((a: any, b: any) => new Date(b.fecha_que_agendo).getTime() - new Date(a.fecha_que_agendo).getTime());
                setCitas(citasOrdenadas);
            } else {
                setCitas([]);
            }
            setCargando(false);
        });
        
        console.log(citas);
        
    }, []);
    
    useEffect(() => {
        let fechaActual = new Date();
    
        fechaActual.setHours(fechaActual.getHours() - 5);
    
        const noCanceladas = citas.filter(cita => {
            const fechaCita = new Date(cita.fecha_que_agendo);
            return (cita.status === 'Confirmado' || cita.status === 'Pendiente') && fechaCita >= fechaActual;
        });
    
        const canceladas = citas.filter(cita => {
            const fechaCita = new Date(cita.fecha_que_agendo);
            return (cita.status === 'Cancelado' || cita.status === 'Finalizada' || fechaCita < fechaActual);
        });
    
        setCitasNoCanceladas(noCanceladas);
        setCitasCanceladas(canceladas);
    }, [citas]);
    
    
    

    const { DollarIcon, ClockIcon, CloseIcon, TickCircleWhiteicon, TrashIcon, InfoIcon, VirtualIcon, ProfileIcon } = Icons;

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const cancelarCita = async (cedula: any, fecha: any) => {
        console.log(fecha);
        
        try {
            const response = await fetch(`https://rogansya.com/rogans-app/index.php?accion=cancelar&cedula=${cedula}&fecha=${fecha}`);
            const data = await response.json();
            if (data.mensaje === "Cita cancelada exitosamente") {
                navigation.navigate("CitaCancelada");
            } else {
                console.log("Error o cita no encontrada");
            }
        } catch (error) {
            console.error('Error al cancelar cita:', error);
        }
    };

    function formatearPrecio(numeroStr: any) {
        if (!/^\d+$/.test(numeroStr)) {
          return numeroStr;
        }
      
        let caracteres = numeroStr.split('');
        caracteres.reverse();
      
        for (let i = 3; i < caracteres.length; i += 4) {
          caracteres.splice(i, 0, '.');
        }
      
        return ('$' + caracteres.reverse().join(''));
    }

    const openGoogleMeet = async (link: any) => {
        try {
            await Linking.openURL(link);
        } catch (error) {
            console.error('No se pudo abrir el enlace:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={MyFontStyles.title_1}>Mi Historial</Text>
                    <Text style={MyFontStyles.title_2}>Citas</Text>
                    <CitaBox estadoCita='agendada' />
                </View>
                <View style={[styles.content]}>
                    <Text style={MyFontStyles.title_2}>Tratamientos</Text>
                    <TratamientoBox estadoTratamiento={'programado'} />
                </View>
                <View style={[styles.content]}>
                    <Text style={MyFontStyles.title_2}>Compras</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contentHorizontal}>
                        <ComprasBox imageSource={require('../../../../assets/get-up.jpg')} productName={'Getup'} price={'2.000'} purchaseDate={'28 septiembre 2024'} />
                        <ComprasBox imageSource={require('../../../../assets/get-up.jpg')} productName={'Getup'} price={'2.000'} purchaseDate={'30 mayo 2024'} />
                        <ComprasBox imageSource={require('../../../../assets/get-up.jpg')} productName={'Getup'} price={'2.000'} purchaseDate={'2 abril 2024'} />
                        <ComprasBox imageSource={require('../../../../assets/get-up.jpg')} productName={'Getup'} price={'2.000'} purchaseDate={'28 enero 2024'} />
                    </ScrollView>
                </View>
                <View style={[styles.content]}>
                <Text style={MyFontStyles.title_2}>Formulas médicas</Text>
                    <FormulasMedicasBox pdfTitle={'Formula 1'} consultationDate={'8 Marzo 2024'} issue={'Dolor de cabeza'} />
                </View>
                <View style={[styles.content]}>
                    <Text style={MyFontStyles.title_2}>Examenes</Text>
                    <ExamenesBox pdfTitle={'Examen 1'} consultationDate={'8 Marzo 2024'} issue={'Cuadro hemático'} />
                </View>
                <View style={[styles.content, {marginBottom: 200,}]}>
                    <Text style={MyFontStyles.title_2}>Evolución médica</Text>
                </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalFade} 
                    onPress={() => setModalVisible(false)}
                    activeOpacity={1}
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
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 8,}}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.conservarBtn}>
                                    <Text style={[styles.textModal, {color: 'white',}]}>No, conservar</Text>
                                    <TickCircleWhiteicon width={16} height={16}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.siCancelarBtn} onPress={() => {
                                    cancelarCita(cedulaUsuario, cancelacion).then(response => {
                                            console.log(response);
                                            setModalVisible(false);
                                        });
                                    }}
                                >
                                    <Text style={styles.textModal}>Si, cancelar cita</Text>
                                    <TrashIcon width={16} height={16}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFCFC",
        position: "relative",
    },
    scrollContainer: {
        position: "relative",
    },
    content: {
        marginBottom: 50,
        top: Platform.OS === 'android' ? 50 : 10,
        marginHorizontal: 16,
    },
    title: {
        fontFamily: MyFont.bold,
        fontSize: 24,
        marginBottom: 30,
    },
    cita: {
        marginHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 18,
        // Sombras para Android
        elevation: 15,
        // Sombras para iOS
        shadowColor: "#F0F0F0",
        shadowOffset: { width: 40, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    text: {
        fontFamily: MyFont.regular,
        fontSize: 12,
    },
    numeroDia: {
        fontFamily: MyFont.bold,
        fontSize: 33,
    },
    titleCita: {
        fontFamily: MyFont.medium,
        fontSize: 18,
        marginBottom: 10,
    },
    cancelarBtn: {
        marginTop: 30,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
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
    infoContent: {
        width: '100%', // Asegura que el View ocupe el 100% del ancho disponible
    },
    textInfo: {
        
    },
    telUsuario: {
        color: '#00967F',
    },
    contentHorizontal: {
        flexDirection: 'row',
    },
});

export default MiHistorial;