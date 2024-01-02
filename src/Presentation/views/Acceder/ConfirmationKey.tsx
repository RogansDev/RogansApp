import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyColors, MyFont } from '../../../Presentation/theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../App';
import Icons from '../../theme/Icons';

const ConfirmationKey = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
    const {TickIconWhite, TickIcon} = Icons

  return (
    <View style={styles.container}>
            <View style={styles.content}>
                <TickIcon width={16} height={16} />
                <Text style={styles.title}>
                     Tu datos han sido{"\n"}Verificados correctamente
                </Text>
                <TouchableOpacity 
                   style={styles.btn} 
                   onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.textBtn}>
                        Continuar
                    </Text>
                    <TickIconWhite width={16} height={16} style={styles.iconBtn} /> 
                </TouchableOpacity>
            </View>
        </View>
  )
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
})

export default ConfirmationKey;
