import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { fetchFonts } from '../../theme/AppTheme';
import useRegisterFirebase from "../../../hooks/useRegisterFirebase";
import { getCredentials } from "../../../services/credentials";


const Loading = () => {

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();
    const { handleLogin } = useRegisterFirebase();

    useEffect(() => {
        const checkLogin = async () => {
            const email = await getCredentials('email')
            const password = await getCredentials('password')
            await fetchFonts();
            console.log(` mis datos son ${email} y ${password} `)

            if (email && password) {
                
                try {
                    await handleLogin(email, password);
                } catch (error) {
                    navigation.navigate('Login');
                }
            } else {
                // Si no hay credenciales almacenadas, navega directamente a la pantalla de login
                navigation.navigate('Regresar');
            }
        };

        checkLogin();
    }, []);

        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00D0B1" />
            </View>
        );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#000",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default Loading;