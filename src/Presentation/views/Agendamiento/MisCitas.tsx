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


const capitalize = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Función para obtener las citas desde el backend propio
const obtenerCitas = async (telefono: any) => {
    try {
        const response = await fetch(`https://roganscare.com:5520/citas/telefono/${telefono}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener citas:', error);
    }
};

const MisCitas = () => {
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

    const formatearFecha = (fechaIsoString: string) => {
        if (!fechaIsoString) return '';
    
        const [year, month, day] = fechaIsoString.slice(0, 10).split('-').map(Number);
        const [hour, minute] = fechaIsoString.slice(11, 16).split(':').map(Number);
    
        // Crear la fecha en UTC para evitar desfases
        const fecha = new Date(Date.UTC(year, month - 1, day, hour, minute));
    
        const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' } as const;
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    
        const horas12 = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour >= 12 ? 'PM' : 'AM';
    
        return `${horas12}:${minute.toString().padStart(2, '0')} ${ampm} | ${fechaFormateada}`;
    };
    

    const [proximasCitas, setProximasCitas] = useState([]);
    const [citasAnteriores, setCitasAnteriores] = useState([]);

    useEffect(() => {
        // Llamar a la función obtenerCitas con el teléfono del usuario
        obtenerCitas(telUsuario).then(data => {
            if (data && data.length > 0) {
                const citasAgendadas = data.filter((cita: any) => cita.estado === 'agendada');
                const otrasCitas = data.filter((cita: any) => cita.estado !== 'agendada');
                console.log(citasAgendadas[0].fecha_cita);
                

                setProximasCitas(citasAgendadas);
                
                setCitasAnteriores(otrasCitas);
            } else {
                setCitasAnteriores([]);
            }
            setCargando(false);
        });
    }, [telUsuario]);

    const nombreLinea = (linea: any) => {
        let nombreCompleto;
    
        if (linea === 'Capilar') {
            nombreCompleto = 'Cuidado del cabello';
        } else if (linea === 'Facial') {
            nombreCompleto = 'Cuidado de la piel';
        } else if (linea === 'Sexual') {
            nombreCompleto = 'Salud sexual';
        } else if (linea === 'Psicologia') {
            nombreCompleto = 'Psicología';
        } else if (linea === 'Nutricion') {
            nombreCompleto = 'Nutrición';
        } else if (linea === 'Adn') {
            nombreCompleto = 'Medicina predictiva | ADN';
        } else {
            nombreCompleto = linea;
        }
    
        return nombreCompleto;
    };

    return (
        <View style={styles.container}>
            <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={MyFontStyles.title_1}>Mis citas</Text>
                    <Text style={MyFontStyles.title_2}>Próxima cita</Text>
                    {
                         proximasCitas.length > 0 ? proximasCitas.map((cita: any, index: number) => (
                            <CitaBox
                                index={index}
                                tituloCita={nombreLinea(cita.linea_medica)}
                                modalidad={cita.modalidad}
                                fecha={formatearFecha(cita.fecha_cita)}
                                estadoCita={cita.estado}
                                sidesMargin={0}
                                lineaMedica={cita.linea_medica}
                            />
                        )) : (
                            <Text>No tienes citas próximas</Text>
                        )
                    }
                </View>
                <View style={[styles.content, {marginBottom: 200,}]}>
                    <Text style={MyFontStyles.title_1}>Mis citas anteriores</Text>
                    {
                        citasAnteriores.length > 0 ? citasAnteriores.map((cita: any, index: number) => (
                            <CitaBox
                                key={index}
                                tituloCita={nombreLinea(cita.linea_medica)}
                                modalidad={cita.modalidad}
                                fecha={formatearFecha(cita.fecha_cita)}
                                estadoCita={cita.estado}
                                sidesMargin={0}
                                lineaMedica={cita.linea_medica}
                            />
                        )) : (
                            <Text>No tienes citas anteriores</Text>
                        )
                    }
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
    }
});

export default MisCitas;