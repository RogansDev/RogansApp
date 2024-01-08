import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Image, Text } from "react-native";
import ThirdScreen from "../ContainerHome/ThirdScreen";
import { fetchFonts } from '../../theme/AppTheme';


const Loading = () => {

    const [ loadingScreen, setLoadingScreen] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            await fetchFonts();
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setLoadingScreen(false);
        };
        loadData();
    }, [])

    if (loadingScreen) {
        return (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="red"/>
              <Text style={styles.text}>Cargando...</Text>
            </View>
        );
    }

    return (
        <ThirdScreen />
    )
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

// const { logged } = useSelector((state: any) => state.user);
//     const { handleLogin } = useRegisterFirebase();

//     useEffect(() => {

//         const obtenerDatos = async () => {
//             try {
//                 const poiñlk = await AsyncStorage.getItem('@xqtes');
//                 const mnbjhg = await AsyncStorage.getItem('@asdqwe');

//                 console.log('email', poiñlk);
//                 console.log('pass', mnbjhg)

//                 if (!logged && poiñlk !== null && mnbjhg !== null) {
//                     handleLogin(poiñlk, mnbjhg);
//                 }
//                 setLoadingScreen(false);
//             } catch (error) {
//                 console.error('Error al obtener datos de AsyncStorage:', error);
//             }
//         };

//         obtenerDatos();
//     }, []);