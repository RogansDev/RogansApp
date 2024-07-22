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
    const { handleLogin,handleGoogleLogin } = useRegisterFirebase();

    useEffect(() => {
        const checkLogin = async () => {
            const email = await getCredentials('email');
            const password = await getCredentials('password');
            const googleId = await getCredentials('googleToken');
            await fetchFonts();

            if (email && password) {

                try {
                    await handleLogin(email, password);
                } catch (error) {
                    navigation.navigate('Login');
                }
            } else if (googleId) {
                try {
                    await handleGoogleLogin(googleId);
                } catch (error) {
                    navigation.navigate('Login');
                }
             }
            else {

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