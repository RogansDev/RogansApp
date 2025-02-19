import React, { useState, useRef, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { MyStyles, MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from "react-native";
import navigation from "../../../navigation";
import { RootParamList } from "../../../utils/RootParamList";
import { parse } from 'date-fns';
import { es } from 'date-fns/locale';

const CitaBox = ({ tituloCita, modalidad, fecha, estadoCita, lineaMedica, backgroundColor, sidesMargin = 0 }:any ) => {
    const { UbicacionVerde, Calendar, MoreVertical, Editar3Icon, InfoIcon, MeetingIcon } = Icons;
    const [menuVisible, setMenuVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const [isJoinable, setIsJoinable] = useState(false);

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const colorMapping: { [key: string]: string } = {
        agendada: MyColors.warning[2],
        asistida: MyColors.verde[1],
        no_asistida: MyColors.error[2],
    };

    const openMenu = () => {
        setMenuVisible(true);
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeMenu = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setMenuVisible(false);
        });
    };

    const toggleMenu = () => {
        if (menuVisible) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const imagenCita = (linea: any) => {
        if (linea === 'Capilar') {
            return require('../../../../assets/citas/capilar-cita.png');
        } else if (linea === 'Facial') {
            return require('../../../../assets/citas/facial-cita.png');
        } else if (linea === 'Sexual') {
            return require('../../../../assets/citas/sexual-cita.png');
        } else if (linea === 'Psicologia') {
            return require('../../../../assets/citas/psicologia-cita.png');
        } else if (linea === 'Nutricion') {
            return require('../../../../assets/citas/nutricion-cita.png');
        } else if (linea === 'Corporal') {
            return require('../../../../assets/citas/nutricion-cita.png');
        } else if (linea === 'Adn') {
            return require('../../../../assets/citas/adn-cita.png');
        } else {
            return require('../../../../assets/citas/medicina-general-cita.png');
        }
    };

    useEffect(() => {
        const checkJoinableStatus = () => {
            try {
                const [timePart, datePart] = fecha.split("|").map((part: any) => part.trim());
                const formattedDateString = `${datePart} ${timePart}`;
                
                // Ajuste del formato
                const appointmentDateTime:any = parse(formattedDateString, 'dd \'de\' MMMM \'de\' yyyy h:mm a', new Date(), { locale: es });
        
                if (isNaN(appointmentDateTime)) {
                    console.error("Fecha de cita no válida:", formattedDateString);
                    return;
                }
        
                const currentTime = new Date();
                const timeDifference = (appointmentDateTime.getTime() - currentTime.getTime()) / (1000 * 60);
                setIsJoinable(timeDifference <= 5);
        
            } catch (error) {
                console.error("Error al procesar la fecha de la cita:", error);
            }
        };        

        checkJoinableStatus();
        const intervalId = setInterval(checkJoinableStatus, 60000); // Revisar cada minuto

        return () => clearInterval(intervalId);
    }, [fecha]);

    return (
        <View style={[Styles.citaBoxContainer, { backgroundColor: backgroundColor || 'white', marginHorizontal: sidesMargin }]}>
            <View
                style={[
                    Styles.leftLine,
                    { backgroundColor: colorMapping[estadoCita] || MyColors.verde[1] },
                ]}
            ></View>
            <View style={Styles.citaBoxContent}>
                <Image source={imagenCita(lineaMedica)} style={Styles.profileImage} />
                <View style={Styles.textContainer}>
                    <Text style={Styles.title}>{tituloCita}</Text>
                    <Text style={Styles.subTitle}>Cita</Text>
                </View>
                {/*<TouchableOpacity style={Styles.moreIconContainer} onPress={toggleMenu}>
                    <MoreVertical width={20} height={20} color={MyColors.neutroDark[4]} />
                </TouchableOpacity>
                {menuVisible && (
                    <Animated.View
                        style={[
                            Styles.menu,
                            {
                                opacity: opacityAnim,
                                transform: [
                                    {
                                        translateY: slideAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-10, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <TouchableOpacity style={Styles.menuItem} onPress={() => { }}>
                            <InfoIcon width={22} height={22} />
                            <Text style={Styles.menuText}>Ver detalles</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.menuItem} onPress={() => { }}>
                            <Editar3Icon width={22} height={22} />
                            <Text style={Styles.menuText}>Editar cita</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}*/}
            </View>
            {modalidad === 'Virtual' && isJoinable && (
                <View style={Styles.detailsSection}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Teleconsulta")}
                    style={Styles.iconContainer}
                >
                    <MeetingIcon width={16} height={16} />
                    <Text style={[Styles.detailsText, { color: MyColors.verde[2] }]}>
                        Ingresar a tu cita ahora
                    </Text>
                </TouchableOpacity>
                </View>
            )}
            
            <View style={Styles.detailsSection}>
                <Text style={Styles.detailsTitle}>Detalles</Text>
                <View style={Styles.iconRow}>
                    <View style={Styles.iconContainer}>
                        <UbicacionVerde width={16} height={16} />
                        <Text style={Styles.detailsText}>{modalidad}</Text>
                    </View>
                    <View style={Styles.iconContainer}>
                        <Calendar width={16} height={16} />
                        <Text style={Styles.detailsText}>{fecha}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export const Styles = StyleSheet.create({
    citaBoxContainer: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingTop: 13,
        paddingBottom: 17,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: MyColors.neutro[2],
        shadowOffset: { width: 20, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 15,
        position: 'relative',
    },
    leftLine: {
        width: 4,
        position: 'absolute',
        left: 10,
        top: 15,
        bottom: 15,
        borderRadius: 2,
    },
    citaBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
        position: 'relative', 
        zIndex: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
        flex: 1, 
    },
    title: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: MyColors.verde[3],
    },
    subTitle: {
        fontSize: 13,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.regular,
    },
    detailsSection: {
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'column', 
    },
    detailsTitle: {
        fontSize: 13,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.regular,
        marginBottom: 5, 
    },
    iconRow: {
        flexDirection: 'column', 
        alignItems: 'flex-start',
        gap: 3,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15, 
    },
    detailsText: {
        fontSize: 13,
        color: MyColors.neutro[2],
        fontFamily: MyFont.regular,
        marginLeft: 5,  
        lineHeight: 16, 
    },
    moreIconContainer: {
        padding: 5,
        zIndex: 20, 
    },
    menu: {
        position: 'absolute',
        right: 25,
        top: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        zIndex: 1000, 
        paddingVertical: 5,
    },
    menuItem: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        fontSize: 16,
        color: MyColors.neutro[1],
        fontFamily: MyFont.Poppins[400],
    },
});

export default CitaBox;
