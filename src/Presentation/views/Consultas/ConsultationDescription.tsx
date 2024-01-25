import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, Linking, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MiCalendario from '../../components/MiCalendario';
import PopUpError from '../../components/PopUpError';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import { useNavigation } from '@react-navigation/native';
import Icons from '../../../Presentation/theme/Icons';
import { agendarCita } from '../../../../agendarCitaService';
import { WebView } from 'react-native-webview';
import { setCalendaryInfo, resetSpecificCalendaryInfo } from '../../../state/CalendarySlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import usePromotions from '../../../hooks/usePromotions';

interface MiCalendarioHandles {
    toggleModal: () => void;
}

interface PopUpErrorHandles {
    togglePopUpError: (mesaje: string) => void;
}

const ConsultationDescription = () => {
    const { CalendarAddIcon, ArrowDownIcon, ArrowWhiteIcon, CloseIcon } = Icons;
    const dispatch = useDispatch();
    const {updateStatusCode} = usePromotions();
    const selectedCard = useSelector( (state : any) => state.calendary.selectedCard);
    const calendaryState = useSelector((state : any) => state.calendary);
    const promotions = useSelector( (state : any) => state.promotions);
    const user = useSelector( (state : any) => state.user);

    const fecha = useSelector( (state : any) => state.calendary.fecha);
    const horaAgendada = useSelector( (state : any) => state.calendary.horaAgendada);
    const virtualPresencial = useSelector( (state : any) => state.calendary.virtualPresencial);
    const nombreUsuario =  user.name;
    const correoUsuario = user.email;
    const cedulaUsuario = user.document;
    const telUsuario = user.phone;

    const actualizarVirtualPresencial = (virtualOPresencial) => {
        dispatch(setCalendaryInfo({
          fecha: calendaryState.fecha,
          horaAgendada: calendaryState.hora,
          virtualPresencial: virtualOPresencial,
          selectedCard: calendaryState.selectedCard,
        }));
    };

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const [modalVisible, setModalVisible] = useState(false);
    const [pagoVisible, setPagoVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [citaAgendada, setCitaAgendada] = useState(false);
    const [urlFinal, setUrlFinal] = useState('');

    useEffect(() => {
        
        dispatch(resetSpecificCalendaryInfo([
            'fecha',
            'horaAgendada',
            'virtualPresencial'
        ]));

    }, []);

    useEffect(() => {
        if (selectedValue === 'Virtual') {
            actualizarVirtualPresencial('Virtual');
        } else if (selectedValue === 'Presencial') {
            actualizarVirtualPresencial('Presencial');
        }
        console.log(promotions);
        
    }, [selectedValue]);

    const calendarioRef = useRef<MiCalendarioHandles>(null);

    const abrirCalendario = () => {
        if (calendarioRef.current) {
            calendarioRef.current.toggleModal();
        }
    };

    const PopUpErrorRef = useRef<PopUpErrorHandles>(null);

    const abrirPopUpError = (mensaje: string) => {
        if (PopUpErrorRef.current) {
            PopUpErrorRef.current.togglePopUpError(mensaje);
        }
    };

    const iniciarProcesoDePago = () => {
        const generarReferenceCode = () => {
            const ahora = new Date();
            // Generar un número aleatorio y convertirlo a string en base 36
            const randomId = Math.random().toString(36).substr(2, 9);

            // Formatear la fecha y hora en un string y combinarlo con el identificador único
            const referenceCode = `rogans_${ahora.toISOString()}_${randomId}`;

            return referenceCode;
        };

        const uniqueReferenceCode = generarReferenceCode();

        interface DatosTransaccion {
            description: string;
            referenceCode: string
            amount: string;
            tax: string;
            taxReturnBase: string;
            currency: string;
            buyerEmail: string;
            fechaAgendada: string;
            horaAgendada: string;
            modalidad: string | null;
            duracion_cita: string,
            cupon: string,
            valor_descuento: string,
        }

        const datosTransaccion: DatosTransaccion = {
            description: selectedCard.title,
            referenceCode: uniqueReferenceCode,
            amount: selectedCard.precio_cita,
            tax: "0",
            taxReturnBase: "0",
            currency: "COP",
            buyerEmail: correoUsuario,
            fechaAgendada: fecha,
            horaAgendada: horaAgendada,
            modalidad: selectedValue,
            duracion_cita: selectedCard.duracion_cita,
            cupon: promotions.codigo,
            valor_descuento: promotions.charge,
        };

        const queryString = Object.entries(datosTransaccion)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        setUrlFinal(`https://rogansya.com/pagos/?${queryString}`);
        setPagoVisible(true);
    };

    const agendarHandler = async () => {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString().split('.')[0] + "Z";

        function convertirFechaYHora(fecha: any, horaAgendada: any) {
            // Convertir a formato de 24 horas
            const [hora, minutos, ampm] = horaAgendada.match(/(\d+):(\d+) (\w+)/).slice(1);
            let hora24 = ampm === 'PM' ? parseInt(hora, 10) + 12 : parseInt(hora, 10);
            if (hora24 === 24) hora24 = 12;
            if (hora24 === 12 && ampm === 'AM') hora24 = 0;

            const fechaHora = new Date(`${fecha} ${hora24}:${minutos}:00`);

            fechaHora.setHours(fechaHora.getHours());

            return fechaHora.toISOString().replace('.000', '');
        }

        const fechaAgendadaFormateada = convertirFechaYHora(fecha, horaAgendada);

        const datosCita = {
            "fecha_que_agendo": fechaFormateada,
            "nombre": nombreUsuario + "/&" + cedulaUsuario,
            "telefono": telUsuario,
            "correo": correoUsuario,
            "evento_agendado": selectedCard.title,
            "fecha": fechaAgendadaFormateada,
            "especialidad": selectedCard.title,
            "notas": selectedValue,
            "status": "Pendiente",
            "valor": selectedCard.precio_cita
        };

        try {
            const respuesta = await agendarCita(datosCita);
            if (respuesta.mensaje === "Cita agendada") {
                console.log("Cita agendada");

            } else {
                console.log("Error al agendar cita:", respuesta);
                // Manejar la respuesta no exitosa aquí
            }
        } catch (error) {
            console.error("Error al llamar a agendarCita", error);
            // Manejar el error de red aquí
        }
    };

    const verificarDatos = () => {      
        
        if ((selectedValue == 'Virtual' || selectedValue == 'Presencial') && (fecha == '')) {
            abrirPopUpError('Elige una hora y fecha');
        } else if ((selectedValue == null) && (fecha != '')) {
            abrirPopUpError('Elige si quieres tu cita presencial o virtual');
        } else if ((selectedValue == null) && (fecha == '')) {
            abrirPopUpError('Rellena los campos');
        } else {
            if (selectedCard.precio_cita === 'Gratis') {
                agendarHandler();
                navigation.navigate("Confirmado");
            } else {
                agendarHandler();
                iniciarProcesoDePago();
            }
        }
    }

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

    const handleMessage = (event) => {
        const receivedMessage = event.nativeEvent.data;
        console.log(receivedMessage);

        setPagoVisible(false);

        if (receivedMessage === 'exitoso') {
            navigation.navigate("Confirmado");
            // pago: true y cupon usado: true (este valor debe estar desde antes de que el pago se realice)
            // actualizar firebase
            updateStatusCode(user.user_id, promotions.codigo, true);
        } else if (receivedMessage === 'rechazado') {
            navigation.navigate("Rechazado");
            // pago: false y cupon usado: false
            updateStatusCode(user.user_id,promotions.codigo, false);
        } else if (receivedMessage === 'pendiente') {
            navigation.navigate("Pendiente");
            // pago: false y cupon usado: false
            updateStatusCode(user.user_id, promotions.codigo,false);
        }
    };

    const pagoCancelado = () => {
        setPagoVisible(false);
        navigation.navigate("Rechazado");
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={pagoVisible}
                onRequestClose={() => setPagoVisible(!pagoVisible)}
            >
                <View style={styles.pagoContainer}>
                    <TouchableOpacity onPress={pagoCancelado} style={{ position: 'absolute', top: 12, left: 15, }}>
                        <CloseIcon width={16} height={16} />
                    </TouchableOpacity>
                    <WebView style={{ width: '100%', height: '100%', }}
                        source={{ uri: urlFinal }}
                        onMessage={handleMessage}
                    />
                </View>
                <TouchableOpacity onPress={pagoCancelado} style={styles.pagoOverlay} />
            </Modal>
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Image source={selectedCard.image} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{selectedCard.title}</Text>
                        <Text style={styles.text}>Valor consulta</Text>
                        <Text style={styles.price}>{formatearPrecio(selectedCard.precio_cita)}</Text>
                        <Text style={styles.description}>{selectedCard.description}</Text>
                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 20, left: 20, }}>
                                        <CloseIcon width={16} height={16} />
                                    </TouchableOpacity>

                                    <View>
                                        <TouchableOpacity onPress={() => { setSelectedValue("Presencial"), setModalVisible(false) }} style={{ paddingVertical: 2, marginVertical: 8, }}>
                                            <Text style={{ fontFamily: MyFont.regular, fontSize: 14 }}>Presencial</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setSelectedValue("Virtual"), setModalVisible(false) }} style={{ paddingVertical: 2, marginVertical: 8, }}>
                                            <Text style={{ fontFamily: MyFont.regular, fontSize: 14 }}>Virtual</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        
                        <MiCalendario ref={calendarioRef} onAbrirPopUpError={abrirPopUpError} />
                                <Text style={styles.title2}>Agenda tu consulta</Text>
                                <View>
                                    <View style={styles.titleModalButton}>
                                        <Text style={styles.text1TitleModalButton}>Tipo de consulta </Text>
                                        <Text style={styles.text2TitleModalButton}>(Requerido)</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.modalButton}>
                                        <Text style={styles.textModalButton}>{selectedValue ? selectedValue : 'Virtual o presencial'}</Text>
                                        <ArrowDownIcon style={styles.imageModalButton} width={16} height={16} />
                                    </TouchableOpacity>
                                    <View>
                                        <View style={styles.titleModalButton}>
                                            <Text style={styles.text1TitleModalButton}>Fecha de consulta </Text>
                                            <Text style={styles.text2TitleModalButton}>(Requerido)</Text>
                                        </View>
                                        <TouchableOpacity onPress={abrirCalendario} style={styles.modalButton}>
                                            <Text style={styles.textModalButton}>{fecha ? fecha + ' a las ' + horaAgendada : 'dd/mm/aaaa'}</Text>
                                            <CalendarAddIcon style={styles.imageModalButton} width={16} height={16} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                        <TouchableOpacity onPress={verificarDatos} style={styles.button}>
                            <Text style={styles.textButtom}>Continuar</Text>
                            <ArrowWhiteIcon width={16} height={16} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <PopUpError ref={PopUpErrorRef} />
        </>
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
    image: {
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: 350,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    textContainer: {
        position: 'relative',
        backgroundColor: 'white',
        marginTop: -110,
        marginBottom: 30,
        width: '100%',
        height: 'auto',
        paddingHorizontal: 16,
        zIndex: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 33,
        fontFamily: MyFont.bold,
        color: 'black',
        marginTop: 50,
        marginBottom: 6,
    },
    text: {
        marginTop: 8,
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#909090',
    },
    oldPrice: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#909090',
        textDecorationLine: 'line-through'
    },
    price: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: '#404040',
    },
    description: {
        fontSize: 12,
        fontFamily: MyFont.medium,
        color: '#909090',
        marginTop: 15,
        marginBottom: 30,
    },
    title2: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: 'black',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        padding: 12,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    textButtom: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: 'white',
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        fontFamily: MyFont.regular,
    },
    titleModalButton: {
        flexDirection: 'row',
        position: 'absolute',
        top: 2,
        left: 18,
        padding: 2,
        backgroundColor: 'white',
        zIndex: 10,
    },
    text1TitleModalButton: {
        fontSize: 11,
        fontFamily: MyFont.regular,
        color: '#404040',
    },
    text2TitleModalButton: {
        fontSize: 10,
        fontFamily: MyFont.regular,
        color: '#C0C0C0',
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#909090',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    textModalButton: {
        fontSize: 13,
        fontFamily: MyFont.regular,
    },
    imageModalButton: {

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        position: 'relative',
        width: '70%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 20,
    },
    pagoContainer: {
        position: 'absolute',
        width: '100%',
        height: '92%',
        bottom: 0,
        zIndex: 20,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 40,
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // Sombras para Android
        elevation: 10,
        // Sombras para iOS
        shadowColor: "black",
        shadowOffset: { width: 4, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
    },
    pagoOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});

export default ConsultationDescription;