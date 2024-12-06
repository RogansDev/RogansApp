import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Animated, Alert, Platform, Modal, Linking } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import Calendario from '../../components/Calendario';
import ButtonIcon from '../../components/buttons/ButtonIcon';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { socket } from '../../../services/socket';
import { WebView } from 'react-native-webview';
import { format, parseISO } from 'date-fns';

const Agendamiento = () => {
    const { ArrowLeft, CalendarWhiteIcon, CloseIcon, TickCircleIcon } = Icons;
    
    const [chatVisible, setChatVisible] = useState(false);
    const [lineaMedica, setLineaMedica] = useState('');
    const [showCategories, setShowCategories] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const MedicalLineState = useSelector((state: any) => state.medicalLine);
    const { name, user_id, email, document, phone } = useSelector((state: any) => state.user);
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada en el calendario
    const [selectedModality, setSelectedModality] = useState(null);
    const [gratis, setGratis] = useState(true);
    const [pagoVisible, setPagoVisible] = useState(false);
    const [aceptado, setAceptado] = useState(false);
    const [rechazado, setRechazado] = useState(false);
    const [cancelado, setCancelado] = useState(false);
    const [monto, setMonto] = useState('');
    const [urlFinal, setUrlFinal] = useState('');
    const [paymentStatuses, setPaymentStatuses] = useState<{ [key: string]: boolean }>({});

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    // Animación de los botones de categorías
    const opacityCategoryAnim = useRef(new Animated.Value(0)).current;
    const translateYCategoryAnim = useRef(new Animated.Value(100)).current;

    // Animación del calendario
    const opacityCalendarAnim = useRef(new Animated.Value(0)).current;
    const translateYCalendarAnim = useRef(new Animated.Value(100)).current;

    const animationDuration = 300;

    useFocusEffect(
        React.useCallback(() => {
            // Resetear el estado cuando la pantalla entra en foco
            setChatVisible(false);
            setLineaMedica('');
            setShowCategories(true);
            setShowCalendar(false);
            setSelectedDate(null);
            setSelectedModality(null);

            // Animación inicial de las categorías
            Animated.timing(opacityCategoryAnim, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();

            Animated.timing(translateYCategoryAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        }, [])
    );

    const isGratis = (linea: string) => {
        if (linea === 'Sexual' || linea === 'Facial' || linea === 'Psicologia' ||  linea === 'Nutricion' ||  linea === 'Endocrinologia') {
            setGratis(false);
        } else {
            setGratis(true);
        }
    };

    useEffect(() => {
        if (MedicalLineState.lineaMedica !== '') {
            setLineaMedica(MedicalLineState.lineaMedica);
            // Si hay una línea médica seleccionada, saltar directamente al calendario
            setShowCategories(false);
            setShowCalendar(true);

            isGratis(MedicalLineState.lineaMedica);

            if (MedicalLineState.lineaMedica === 'Sexual') {
                setMonto('20000');
            } else if (MedicalLineState.lineaMedica === 'Facial') {
                setMonto('20000');
            } else if (MedicalLineState.lineaMedica === 'Psicologia') {
                setMonto('79000');
            } else if (MedicalLineState.lineaMedica === 'Nutricion') {
                setMonto('79000');
            } else if (MedicalLineState.lineaMedica === 'Endocrinologia') {
                setMonto('79000');
            }

            // Iniciar las animaciones del calendario
            Animated.timing(opacityCalendarAnim, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();

            Animated.timing(translateYCalendarAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        } else {
            setLineaMedica('');
            // Mostrar las categorías al cargar
            Animated.timing(opacityCategoryAnim, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();

            Animated.timing(translateYCategoryAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        }
    }, [MedicalLineState]);

    const handleCategorySelect = (linea: any) => {
        setLineaMedica(linea);

        if (linea === 'Sexual') {
            setMonto('20000');
        } else if (linea === 'Facial') {
            setMonto('20000');
        } else if (linea === 'Psicologia') {
            setMonto('79000');
        } else if (linea === 'Nutricion') {
            setMonto('79000');
        } else if (linea === 'Endocrinologia') {
            setMonto('79000');
        }

        isGratis(linea);

        // Oculta los botones de categorías y muestra el calendario
        Animated.timing(opacityCategoryAnim, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start(() => {
            setShowCalendar(true);
            Animated.timing(opacityCalendarAnim, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();

            Animated.timing(translateYCalendarAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        });

        Animated.timing(translateYCategoryAnim, {
            toValue: 100,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    };

    const handleBackFromCalendar = () => {
        if(MedicalLineState.lineaMedica !== '') {
            navigation.goBack();
        } else {
            // Si se quiere volver atrás desde el calendario
            Animated.timing(opacityCalendarAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start(() => {
                setShowCalendar(false);
                setShowCategories(true);
                Animated.timing(opacityCategoryAnim, {
                    toValue: 1,
                    duration: animationDuration,
                    useNativeDriver: true,
                }).start();

                Animated.timing(translateYCategoryAnim, {
                    toValue: 0,
                    duration: animationDuration,
                    useNativeDriver: true,
                }).start();
            });

            Animated.timing(translateYCalendarAnim, {
                toValue: 100,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        }
    };

    const formatDateForMySQL = (date:any) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    const handleAgendar = () => {
        console.log(selectedModality);

        let esGratis;

        if (gratis) {
            esGratis = 'gratis';
        } else {
            esGratis = 'pago';
        }
    
        // Datos del agendamiento
        const agendamientoData = {
            telefono: phone,
            linea_medica: lineaMedica,
            tipo: 'Consulta médica',
            modalidad: selectedModality,
            fecha_cita: selectedDate,
            gratis: esGratis
        };    
        // Emitir el evento al servidor
        socket.emit('crearCita', agendamientoData, (response: any) => {
            // Manejar la respuesta del servidor
            if (response.success) {
                console.log('Cita creada');
                handleOpenSuccessModal();
                 // Mostrar el modal de éxito
            } else {
                console.error('Error:', response.error);
                Alert.alert('Error', `Hubo un error al agendar la cita: ${response.error}`);
            }
        });
    };

    const modalTriggerRef:any = useRef(null);

    const handleOpenSuccessModal = () => {
        if (modalTriggerRef.current) {
          modalTriggerRef.current();
        }
    };                

    const nombreCita = (linea: any) => {
        if (linea === 'Capilar') { return 'Cuidado del cabello'; }
        if (linea === 'Facial') { return 'Cuidado de la piel'; }
        if (linea === 'Sexual') { return 'Rendimiento sexual'; }
        if (linea === 'Psicologia') { return 'Psicología'; }
        if (linea === 'Nutricion') { return 'Nutrición'; }
        if (linea === 'Adn') { return 'Medicina predictiva | ADN'; }
        if (linea === 'Medicina-general') { return 'Consulta médica general'; }
        if (linea === 'Endocrinologia') { return 'Endocrinología'; }
        else { return 'Cita médica' };
    };

    const iniciarProcesoDePago = (datosPago: any) => {
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
            description: any;
            referenceCode: string
            amount: any;
            tax: string;
            taxReturnBase: string;
            currency: string;
            buyerEmail: string;
            fecha: any;
            modalidad: any;
            cupon: string,
            valor_descuento: string,
            estado_cupon: string,
            nombre: string,
            cedula: string,
        }

        let descripcion = nombreCita(lineaMedica);

        const datosTransaccion: DatosTransaccion = {
            description: descripcion,
            referenceCode: uniqueReferenceCode,
            amount: monto,
            tax: "0",
            taxReturnBase: "0",
            currency: "COP",
            buyerEmail: email,
            fecha: selectedDate,
            modalidad: selectedModality,
            cupon: '',
            valor_descuento: '',
            estado_cupon: '',
            nombre: name,
            cedula: document,
        };

        const queryString = Object.entries(datosTransaccion)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        setUrlFinal(`https://rogansya.com/pagos/pagos-citas.php?${queryString}`);
        console.log(`https://rogansya.com/pagos/pagos-citas.php?${queryString}`);
        
        setPagoVisible(true);
    };

    const pagoCancelado = () => {
        setPagoVisible(false);
        setCancelado(true);
        setInterval(() => {
            setCancelado(false);
        }, 5000);
    }

    const pagoAceptado = () => {
        setPagoVisible(false);
        setAceptado(true);
        handleAgendar();
        setInterval(() => {
            setAceptado(false);
        }, 5000);
    }

    const pagoRechazado = () => {
        setPagoVisible(false);
        setRechazado(true);
        setInterval(() => {
            setRechazado(false);
        }, 5000);
    }

    const handleMessage = (event: any) => {
        const receivedMessage = event.nativeEvent.data;
        if (receivedMessage === 'exitoso') {
            setPagoVisible(false);
            pagoAceptado();
        } else if (receivedMessage === 'rechazado') {
            setPagoVisible(false);
            pagoRechazado();
        } else if (receivedMessage === 'pendiente') {
            setPagoVisible(false);
            pagoRechazado();
        }
    };

    const agendarWA = () => {
        const url = "https://wa.link/295lc3";
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
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
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onMessage={handleMessage}
                    />
                </View>
                <TouchableOpacity onPress={pagoCancelado} style={styles.pagoOverlay} />
            </Modal>
            {aceptado && (
                <Modal transparent={true} animationType="fade" visible={aceptado}> 
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TickCircleIcon width={60} height={60} />
                            <Text style={styles.modalText2}>¡Pago existoso!</Text>
                            <Text style={styles.modalText}>Gracias por tu compra{'\n'}Tu cita se ganedó con exito</Text>
                        </View>
                    </View>
                </Modal>
            )}
            {rechazado && (
                <Modal transparent={true} animationType="fade" visible={rechazado}>
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                            <CloseIcon width={60} height={60} />
                            <Text style={styles.modalText3}>Pago rechazado</Text>
                            <Text style={styles.modalText}>Lo sentimos, tu pago {"\n"}no se pudo realizar</Text>
                        </View>
                    </View>
                </Modal>
            )}
            {cancelado && (
                <Modal transparent={true} animationType="fade" visible={cancelado}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <CloseIcon width={60} height={60} />
                            <Text style={styles.modalText}>El pago fue cancelado</Text>
                        </View>
                    </View>
                </Modal>
            )}
            <FloatingMenu
                chatVisible={chatVisible}
                setChatVisible={setChatVisible}
                triggerSuccessModal={(trigger: any) => {
                modalTriggerRef.current = trigger;
                }}
            />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    {showCalendar ? (
                        <Animated.View style={{
                            opacity: opacityCalendarAnim,
                            transform: [{ translateY: translateYCalendarAnim }],
                            marginBottom: 120,
                        }}>
                            <TouchableOpacity onPress={handleBackFromCalendar} style={{flexDirection: 'row', gap: 8, alignItems: 'center',}}>
                                <ArrowLeft width={16} height={16} />
                                <Text style={{fontFamily: MyFont.regular, fontSize: MyFont.size[5], color: MyColors.verde[2],}}>Atrás</Text>
                            </TouchableOpacity>
                            <Text style={{fontFamily: MyFont.regular, fontSize: MyFont.size[4], color: MyColors.verde[3], marginTop: 18, paddingHorizontal: 22, textAlign: 'center',}}>{nombreCita(lineaMedica)}</Text>
                            <Calendario onDateSelected={setSelectedDate} onModalitySelected={setSelectedModality} />
                            {!gratis && <Text style={{fontFamily: MyFont.regular, fontSize: MyFont.size[5], color: MyColors.neutro[3], marginBottom: 18, paddingHorizontal: 22, textAlign: 'center',}}>Esta consulta tiene un{'\n'} costo de:{` ${new Intl.NumberFormat('es-CO', {style: 'currency',currency: 'COP',}).format(parseFloat(monto))}`}</Text>}
                            {gratis ? (
                                <ButtonIcon text="Agendar" icon={CalendarWhiteIcon} pressAction={handleAgendar} />
                            ):(
                                <ButtonIcon text="Pagar y agendar" icon={CalendarWhiteIcon} pressAction={iniciarProcesoDePago} />
                            )}
                        </Animated.View>
                    ) : (
                        <Animated.View style={{
                            opacity: opacityCategoryAnim,
                            transform: [{ translateY: translateYCategoryAnim }],
                            gap: 20,
                            marginBottom: 120,
                        }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', gap: 8, alignItems: 'center',}}>
                                <ArrowLeft width={16} height={16} />
                                <Text style={{fontFamily: MyFont.regular, fontSize: MyFont.size[5], color: MyColors.verde[2],}}>Atrás</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {handleCategorySelect('Capilar')}}>
                                <Text style={styles.buttonText}>Cuidado del cabello</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {handleCategorySelect('Facial')}}>
                                <Text style={styles.buttonText}>Cuidado de la piel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {handleCategorySelect('Sexual')}}>
                                <Text style={styles.buttonText}>Rendimiento sexual</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {handleCategorySelect('Psicologia')}}>
                                <Text style={styles.buttonText}>Psicología</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {handleCategorySelect('Nutricion')}}>
                                <Text style={styles.buttonText}>Nutrición</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {handleCategorySelect('Adn')}}>
                                <Text style={styles.buttonText}>Medicina predictiva | ADN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {handleCategorySelect('Medicina-general')}}>
                                <Text style={styles.buttonText}>Consulta médica general</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {agendarWA()}}>
                                <Text style={styles.buttonText}>Endocrinología</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFCFC",
        position: "relative",
        paddingTop: Platform.OS === 'android' ? 20 : 50,
        paddingHorizontal: 16,
    },
    scrollContainer: {
        position: "relative",
    },
    content: {
        marginBottom: 50,
        top: 10,
    },
    buttonText: {
        fontFamily: MyFont.regular,
        fontSize: MyFont.size[6],
        color: MyColors.neutro[2],
        borderWidth: 1,
        borderColor: MyColors.verdeDark[1],
        borderRadius: 12,
        padding: 15,
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 10,
        fontSize: 16,
        color: MyColors.neutro[2],
        fontFamily: MyFont.regular,
        textAlign: 'center',
    },
    modalText2: {
        marginTop: 10,
        fontSize: 22,
        color: MyColors.verde[2],
        fontFamily: MyFont.bold,
    },
    modalText3: {
        marginTop: 10,
        fontSize: 22,
        color: MyColors.error[3],
        fontFamily: MyFont.bold,
    },
});

export default Agendamiento;
