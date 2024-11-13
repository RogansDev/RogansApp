import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from "react-native";
import { RootParamList } from "../../../utils/RootParamList";
import { parse } from 'date-fns';
import { es } from 'date-fns/locale';

const CitaBoxShort = ({ tituloCita, modalidad, fecha, estadoCita, lineaMedica, backgroundColor, sidesMargin = 0 }: any) => {
    const { UbicacionVerde, Calendar, MeetingIcon } = Icons;
    const [isJoinable, setIsJoinable] = useState(false);

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const colorMapping: { [key: string]: string } = {
        agendada: MyColors.warning[2],
        no_asistida: MyColors.verde[1],
        asistida: MyColors.error[2],
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
                <View style={Styles.textContainer}>
                    <Text style={Styles.title}>{tituloCita}</Text>
                </View>
            </View>

            <View style={Styles.detailsSection}>
                <View style={Styles.iconRow}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={Styles.iconContainer}>
                            <UbicacionVerde width={16} height={16} />
                            <Text style={Styles.detailsText}>{modalidad}</Text>
                        </View>
                        {modalidad === 'Virtual' && isJoinable && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Teleconsulta")}
                                style={Styles.iconContainer}
                            >
                                <MeetingIcon width={16} height={16} />
                                <Text style={[Styles.detailsText, { color: MyColors.verde[2] }]}>
                                    Ingresar a tu cita ahora
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={Styles.iconContainer}>
                        <Calendar width={16} height={16} />
                        <Text style={Styles.detailsText}>{fecha}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

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
        marginLeft: 20,
        position: 'relative', 
        zIndex: 10,
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
    detailsSection: {
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'column', 
    },
    iconRow: {
        flexDirection: 'column', 
        alignItems: 'flex-start',
        gap: 6,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 15, 
    },
    detailsText: {
        fontSize: 13,
        color: MyColors.neutro[2],
        fontFamily: MyFont.regular,
        marginLeft: 5,  
        lineHeight: 16, 
    },
});

export default CitaBoxShort;