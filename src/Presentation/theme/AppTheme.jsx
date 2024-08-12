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
    black: '#000000',

    verde: {
      1: '#00D0B1',
      2: '#00B398',
      3: '#00957F',
      4: '#007765',
      5: '#005A4C',
    },
    neutro: {
      1: '#0A0A0A',
      2: '#3B3C3D',
      3: '#5E5F61',
      4: '#757779',
    },
    neutroDark: {
      1: '#FFFFFF',
      2: '#F0F0F0',
      3: '#AEB1B5',
      4: '#929497',
    },
    fondos: {
      1: '#EDF1F7',
      2: '#F3F6FC',
      3: '#FCFCFC',
      4: '#FFFFFF',
    },
    warning: {
      1: '#CC7914',
      2: '#EDA145',
      3: '#F4C790',
    },
    error: {
      1: '#8C1823',
      2: '#C03744',
      3: '#E4626F',
    },
}

export const MyFont = {
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    bold: 'Poppins-Bold',

    size: {
      1: 54,
      2: 40,
      3: 32,
      4: 24,
      5: 20,
      6: 16,
      7: 14,
      8: 12,
    }
}

export const MySpacing = {
  spacing: {
    1: 2,
    2: 4,
    3: 8,
    4: 12,
    5: 16,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 64,
    11: 80,
    12: 96,
    13: 160,
  }
}

export const MyFontColors = {
  primaryButton: '#FFFFFF',
  secondary: '#292728',
  base: '#FFFFFF',
  buttonColor: '#fff',
  gray: '#CECECE',
  black: '#000000'
}

export const MyStyles = StyleSheet.create({
  button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      padding: 12,
      backgroundColor: MyColors.verde[1],
      borderRadius: 10,
  },
  buttonDropdown: {
    flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      padding: 12,
      backgroundColor: MyColors.verde[1],
      borderRadius: 10,
  },
  buttonEnabled: {
    backgroundColor: MyColors.verde[1],
  },
  buttonDisabled: {
      backgroundColor: MyColors.neutroDark[2],
  },
  textButton: {
      fontSize: MyFont.size[5],
      fontFamily: MyFont.regular,
  },
  textButtonEnabled: {
      color: MyFontColors.primaryButton,
  },
  textButtonDisabled: {
      color: MyFontColors.primaryButton,
  },
  inputContainer: {
      position: 'relative',
      marginVertical: 20,
      height: 60,
  },
  inputDropdownContainer: {
      position: 'relative',
      marginVertical: 20,
      height: 60,
  },
  input: {
    height: '100%',
      borderWidth: 1,
      borderColor: MyColors.neutroDark[2],
      borderRadius: 12,
      paddingHorizontal: 13,
      paddingBottom: 5,
      fontFamily: MyFont.regular,
      fontSize: MyFont.size[7],
  },
  inputFocused: {
      borderColor: MyColors.verde[1],
      shadowColor: MyColors.verde[1],
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.6,
      shadowRadius: 10,
      elevation: 5,
  },
  inputError: {
      borderColor: MyColors.error[2],
      shadowColor: MyColors.error[2],
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 5,
  },
  InputErrorTextContainer: {
    position: 'absolute',
    top: 65,
    flexDirection: 'row',
    gap: 3,
  },
  InputErrorText: {
    color: MyColors.error[2],
  },
  inputDisabled: {
      backgroundColor: '#f0f0f0',
      borderColor: '#ccc',
  },
});