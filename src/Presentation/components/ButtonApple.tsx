import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import React from 'react'
import Icons from '../theme/Icons';

const ButtonApple = (props: any) => {

    const { Apple } = Icons;
    const { title = 'Continuar con apple' } = props;

    const handleOnPress = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            console.log(credential);
        } catch (e: any) {
            if (e.code === 'ERR_CANCELED') {
                console.log('Inicio de sesión con Apple cancelado por el usuario');
                Alert.alert('Atencion', 'Inicio de sesión con Apple cancelado por el usuario');
            } else {
                console.error(e);
                Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión con Apple.');
            }
        }
    }
    return (
        <Pressable style={styles.button} onPress={handleOnPress}>
            <View style={styles.view}>
                <Apple width={30} height={24} color={'white'} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </Pressable>
    )
}

export default ButtonApple

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        backgroundColor: 'black',
        borderRadius: 15,
        marginVertical: 10,
    },
    view: {
        flexDirection: "row"
    },
    text: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginLeft: 10
    },
});