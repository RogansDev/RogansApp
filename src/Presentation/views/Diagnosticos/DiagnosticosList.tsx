import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Platform } from 'react-native';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../../Presentation/theme/Icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { useSelector } from "react-redux";


const DiagnosticosList = () => {
    const { ArrowLeft } = Icons;

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const { phone } = useSelector((state: any) => state.user);

    const opacityCategoryAnim = new Animated.Value(0);
    const translateYCategoryAnim = new Animated.Value(100);
    const animationDuration = 300;

    // Animación inicial
    Animated.timing(opacityCategoryAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
    }).start();

    Animated.timing(translateYCategoryAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
    }).start();

    const handleCategorySelect = (category: string) => {
        let url = "";

        if (category === "Capilar") {
        url = `https://rogansya.com/diagnostico-alopecia?environment=app&phone=${phone}`;
        } else if (category === "Facial") {
        url = `https://rogansya.com/diagnostico-rejuvenecimiento-facial?environment=app&phone=${phone}`;
        } else if (category === "Corporal") {
        url = `https://rogansya.com/diagnostico-corporal?environment=app&phone=${phone}`;
        } else if (category === "Sexual") {
        url = `https://rogansya.com/diagnostico-rendimiento-sexual?environment=app&phone=${phone}`;
        } else if (category === "Psicologia") {
        url = `https://rogansya.com/diagnostico-psicologia-en-linea?environment=app&phone=${phone}`;
        }

        console.log("handleDiagnostico llamado con tipo:", category);
        console.log("Navegando a Diagnostico con url:", url);

        navigation.navigate("Diagnostico", { url });
    };

    return (
        <View style={styles.container}>
            <Animated.View style={{
                opacity: opacityCategoryAnim,
                transform: [{ translateY: translateYCategoryAnim }],
                gap: 20,
                marginBottom: 120,
            }}>
                <Text style={{fontFamily: MyFont.regular, fontSize: MyFont.size[4], color: MyColors.verde[3], textAlign: 'center',}}>Autodiagnósticos</Text>
                <TouchableOpacity onPress={() => { handleCategorySelect('Capilar') }}>
                    <Text style={styles.buttonText}>Cuidado del cabello</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleCategorySelect('Facial') }}>
                    <Text style={styles.buttonText}>Cuidado de la piel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleCategorySelect('Sexual') }}>
                    <Text style={styles.buttonText}>Rendimiento sexual</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleCategorySelect('Psicologia') }}>
                    <Text style={styles.buttonText}>Psicología</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFCFC",
        paddingTop: 25,
        paddingHorizontal: 16,
    },
    buttonText: {
        fontFamily: MyFont.regular,
        fontSize: MyFont.size[6],
        color: MyColors.neutro[2],
        borderWidth: 1,
        borderColor: MyColors.verdeDark[1],
        borderRadius: 12,
        padding: 15,
    },
});

export default DiagnosticosList;
