import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Image, Text } from "react-native";
import ThirdScreen from "../ContainerHome/ThirdScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { fetchFonts } from '../../theme/AppTheme';


const Loading = () => {

    const [loadingScreen, setLoadingScreen] = useState(true);
    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await fetchFonts();
                const poiñlk = await AsyncStorage.getItem('@xqtes');
                const mnbjhg = await AsyncStorage.getItem('@asdqwe');

                console.log('email', poiñlk);
                console.log('password', mnbjhg)
                setLoadingScreen(false);

                if (poiñlk !== null && mnbjhg !== null) {
                    navigation.navigate("Login")
                }

            } catch (error) {
                console.error('Error al obtener datos de AsyncStorage:', error);
            }

        
    }
    obtenerDatos();
        
    }, [])

    if (loadingScreen) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00D0B1" />
            </View>
        );
    }

    return (<ThirdScreen />)
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