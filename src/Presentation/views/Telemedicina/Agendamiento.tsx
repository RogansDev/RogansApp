import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Animated, Alert, Platform } from 'react-native';
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

const Agendamiento = () => {
    const [chatVisible, setChatVisible] = useState(false);
    const [lineaMedica, setLineaMedica] = useState('');
    const [showCategories, setShowCategories] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const { ArrowLeft, CalendarWhiteIcon } = Icons;
    const MedicalLineState = useSelector((state: any) => state.medicalLine);
    const { name, user_id, phone } = useSelector((state: any) => state.user);
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada en el calendario
    const [selectedModality, setSelectedModality] = useState(null);

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

    useEffect(() => {
        if (MedicalLineState.lineaMedica !== '') {
            setLineaMedica(MedicalLineState.lineaMedica);
            // Si hay una línea médica seleccionada, saltar directamente al calendario
            setShowCategories(false);
            setShowCalendar(true);

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
    
        // Datos del agendamiento
        const agendamientoData = {
            telefono: phone,
            linea_medica: lineaMedica,
            tipo: 'Consulta médica',
            modalidad: selectedModality,
            fecha_cita: selectedDate,
        };    
        // Emitir el evento al servidor
        socket.emit('crearCita', agendamientoData, (response: any) => {
            // Manejar la respuesta del servidor
            if (response.success) {
                handleOpenSuccessModal(); // Mostrar el modal de éxito
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

    return (
        <View style={styles.container}>
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
                            <Calendario onDateSelected={setSelectedDate} onModalitySelected={setSelectedModality} />
                            <ButtonIcon text="Agendar" icon={CalendarWhiteIcon} pressAction={handleAgendar} />
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
});

export default Agendamiento;
