import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../App';
import { MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import { useAppContext } from '../../../../AppContext';

const ConfirmationPage = () => {
    const { ArrowWhiteIcon, CloseIcon } = Icons;

    const [botonActivo, setBotonActivo] = useState(false);

    const { horaAgendada, fecha, virtualPresecial, selectedCard, cedulaUsuario }: any = useAppContext();
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    const editarStatusHandler = async (cedula: any, fecha: any) => {
        try {
            const response = await fetch(`https://rogansya.com/rogans-app/index.php?accion=borrarCita&cedula=${cedula}&fecha=${fecha}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            if (data.mensaje === "Cita borrada exitosamente") {
                console.log("Estatus actualizado");
            } else {
                console.log("Error o cita no encontrada");
            }
        } catch (error) {
            console.error('Error al borrar cita:', error);
        }
        setBotonActivo(true);
    };
    

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

      useEffect(() => {
        editarStatusHandler(cedulaUsuario, fechaAgendadaFormateada);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <CloseIcon width={80} height={80} />
                <Text style={styles.title}>No ha sido posible agendar tu cita.{"\n"}Tu pago fue rechazado</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={[styles.btn, !botonActivo && styles.btnDisabled]} disabled={!botonActivo}>
                    <Text style={styles.textBtn}>Volver</Text>
                    <ArrowWhiteIcon style={styles.iconBtn} width={16} height={16} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        textAlign: 'center',
        marginVertical: 30,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'black',
        padding: 12,
        width: 320,
        marginTop: 20,
    },
    textBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: 'white',
    },
    iconBtn: {
        marginLeft: 8,
    },
    btnDisabled: {
        opacity: 0.6,
    },
});

export default ConfirmationPage;