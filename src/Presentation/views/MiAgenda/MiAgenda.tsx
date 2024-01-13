import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale/es';

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

const MiAgenda = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cancelacion, setCancelacion] = useState<string | null>(null);
    const user = useSelector( (state : any) => state.user);
    const cedulaUsuario = user.document;

    interface Cita {
        nombre: string;
        fecha: string;
        evento_agendado: string;
        status: string;
    }

    const [citas, setCitas] = useState<Cita[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        obtenerCitas(cedulaUsuario).then(data => {
            if (data && data.length > 0) {
                const citasOrdenadas = data.sort((a: any, b: any) => new Date(a.fecha_que_agendo).getTime() - new Date(b.fecha_que_agendo).getTime());
                setCitas(citasOrdenadas);
            } else {
                setCitas([]);
            }
            setCargando(false);
        });
    }, []);
    

    const { DollarIcon, ClockIcon, CloseIcon, TickCircleWhiteicon, TrashIcon } = Icons;

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
    
    const citasNoCanceladas = citas.filter(cita => cita.status !== 'Cancelado');
    const citasCanceladas = citas.filter(cita => cita.status !== 'Confirmado');

    return (
        <View style={styles.container}>
            <FloatingMenu />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={[styles.title, {marginTop: 30,}]}>Citas agendadas</Text>
                    {cargando ? (
                        // Muestra el mensaje de cargando
                        <Text style={{textAlign: 'center', padding: 15, fontFamily: MyFont.regular,}}>Cargando...</Text>
                    ) : (
                        citasNoCanceladas.length > 0 ? (
                            citasNoCanceladas.map((cita, index) => {
                                const { diaSemana, numeroDia, mes, hora } = formatearFecha(cita.fecha);
                                return (
                                    <View key={index} style={styles.cita}>
                                        <View style={{alignItems: 'center', width: 80,}}>
                                            <View style={{flexDirection: 'column', alignItems: 'center',}}>
                                                <Text style={styles.text}>{diaSemana}</Text>
                                                <Text style={styles.numeroDia}>{numeroDia}</Text>
                                                <Text style={styles.text}>{mes}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'column', alignItems: 'flex-start', flex: 1, marginLeft: 15, gap: 2,}}>
                                            <Text style={styles.titleCita}>{cita.evento_agendado}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5,}}>
                                                <ClockIcon width={14} height={14} />
                                                <Text style={styles.text}>{hora}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5,}}>
                                                <DollarIcon width={14} height={14} />
                                                <Text style={styles.text}>$1´500.000</Text>
                                            </View>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end',}}>
                                            <Text style={[styles.text, {color: '#00D0B1',}]}>{cita.status === 'Confirmado' ? 'Agendada': ''}</Text>
                                            <TouchableOpacity style={styles.cancelarBtn} onPress={() => {setModalVisible(true), setCancelacion(cita.fecha)}}>
                                                <TrashIcon width={16} height={16}/>
                                                <Text style={styles.text}>Cancelar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        ) : (
                            <Text style={{textAlign: 'center', padding: 15, fontFamily: MyFont.regular,}}>No tienes citas agendadas</Text>
                        )
                    )}
                </View>
                <View style={[styles.content, {marginBottom: 80,}]}>
                    <Text style={styles.title}>Anteriores</Text>
                    {cargando ? (
                        // Muestra el mensaje de cargando
                        <Text style={{textAlign: 'center', padding: 15, fontFamily: MyFont.regular,}}>Cargando...</Text>
                    ) : (
                        citasCanceladas.length > 0 ? (
                            citasCanceladas.map((cita, index) => {
                                const { diaSemana, numeroDia, mes, hora } = formatearFecha(cita.fecha);
                                
                                return (
                                    <View key={index} style={styles.cita}>
                                        <View style={{alignItems: 'center', width: 80,}}>
                                            <View style={{flexDirection: 'column', alignItems: 'center',}}>
                                                <Text style={styles.text}>{diaSemana}</Text>
                                                <Text style={styles.numeroDia}>{numeroDia}</Text>
                                                <Text style={styles.text}>{mes}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'column', alignItems: 'flex-start', flex: 1, marginLeft: 15, gap: 2,}}>
                                            <Text style={styles.titleCita}>{cita.evento_agendado}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5,}}>
                                                <ClockIcon width={14} height={14} />
                                                <Text style={styles.text}>{hora}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5,}}>
                                                <DollarIcon width={14} height={14} />
                                                <Text style={styles.text}>$1´500.000</Text>
                                            </View>
                                        </View>
                                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-end',}}>
                                            <Text style={[styles.text, {color: '#404040',}]}>{cita.status === 'Cancelado' ? 'Cancelada': ''}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        ) : (
                            <Text style={{textAlign: 'center', padding: 15, fontFamily: MyFont.regular,}}>No tienes citas anteriores</Text>
                        )
                    )}
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
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 8,}}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.conservarBtn}>
                                    <Text style={[styles.textModal, {color: 'white',}]}>No, conservar</Text>
                                    <TickCircleWhiteicon width={16} height={16}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.siCancelarBtn} onPress={() => {
                                    cancelarCita(cedulaUsuario, cancelacion).then(response => {
                                            console.log(response);
                                            // Aquí puedes actualizar tu estado o UI según la respuesta
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
        top: 50,
    },
    title: {
        fontFamily: MyFont.bold,
        fontSize: 24,
        marginHorizontal: 16,
        marginBottom: 30,
    },
    cita: {
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 18,
        // Sombras para Android
        elevation: 10,
        // Sombras para iOS
        shadowColor: "#F0F0F0",
        shadowOffset: { width: 4, height: 1 },
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

});

export default MiAgenda;