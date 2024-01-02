import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../App';
import { MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';


const CancelationConfirmation = () => {
    const { TickCircleIcon, CalendarWhiteIcon } = Icons;
    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TickCircleIcon width={80} height={80} />
                <Text style={styles.title}>Tu cita se cancelo con exito</Text>
                <Text style={styles.text}>Cuando desees puedes agendar nuevamente</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.btn}>
                    <Text style={styles.textBtn}>Agendar nueva cita</Text>
                    <CalendarWhiteIcon style={styles.iconBtn} width={16} height={16} />
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
        fontSize: 24,
        fontFamily: MyFont.bold,
        textAlign: 'center',
        marginTop: 30,
    },
    text: {
        fontSize: 12,
        fontFamily: MyFont.regular,
        textAlign: 'center',
        marginBottom: 30,
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
});

export default CancelationConfirmation;