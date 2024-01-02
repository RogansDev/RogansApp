import { StyleSheet } from "react-native";
import * as Font from 'expo-font';


export const fetchFonts = async () => {
    try {
      await Font.loadAsync({
        'Poppins-Light': require('../../../assets/fonts/Poppins/Poppins-Light.ttf'),
        'Poppins-Regular': require('../../../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../../../assets/fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins/Poppins-Bold.ttf'),
      });
      console.log("Fuente cargada correctamente");
    } catch (error) {
      console.error("Error al cargar la fuente", error);
    }
  };
  

export const MyColors = {
    primary: '#9FEDE2',
    secondary: '#292728',
    base: '#FFFFFF',
    buttonColor: '#fff',
    gray: '#CECECE',
    black: '#000000'
}

export const MyFont = {
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    bold: 'Poppins-Bold',
}