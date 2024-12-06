import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons';
import ButtonOneSmall from '../buttons/ButtonOneSmall';
import ButtonTwo from '../buttons/ButtonTwo';
import ButtonTwoSmall from '../buttons/ButtonTwoSmall';

const ServicioBox = ({title, text, titleColored, titleColor, imageUrl, pressAgendar = () => {}, pressAutodiagnostico = () => {}, autodiagnostico = false}:any) => {
    const { Arrow, Calendar, AutodiagnosticoVerde } = Icons;

    const getImageSource = (imageUrl: string) => {
        switch (imageUrl) {
            case 'diagnosis-alopecia':
                return require('../../../../assets/diagnosis-alopecia.png');
            case 'diagnosis-sexual':
                return require('../../../../assets/diagnosis-sexual.webp');
            case 'diagnosis-facial':
                return require('../../../../assets/diagnosis-facial.webp');
            case 'diagnosis-nutricion':
                return require('../../../../assets/diagnosis-nutricion.webp');
            case 'diagnosis-adn':
                return require('../../../../assets/diagnosis-adn.webp');
            case 'diagnosis-psicologia':
                return require('../../../../assets/diagnosis-psicologia.webp');
            case 'diagnosis-endocrinologia':
                return require('../../../../assets/rawdy.jpg');
            default:
                return require('../../../../assets/diagnosis-alopecia.png'); // Imagen por defecto si no coincide
        }
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row',}}>
                <Image source={getImageSource(imageUrl)}  style={styles.profileImage} />
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={styles.title}>
                            {title === 'Endocrinología' ? (
                                <Text style={{color: titleColor,}}>{title}</Text>
                            ):(
                                <>
                                    {title} <Text style={{color: titleColor,}}>{titleColored}</Text>
                                </>
                            )}
                        </Text>
                        <Text style={styles.text}>
                            {text}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row', gap: 12, marginBottom: 3, marginTop: 5,}}>
            {autodiagnostico ? (
                <>
                    <ButtonTwoSmall text='Agendar' width={105} icon={Calendar} pressAction={pressAgendar} />
                    <ButtonTwoSmall text='Autodiagnóstico' width={160} icon={AutodiagnosticoVerde} pressAction={pressAutodiagnostico} />
                </>
            ) : (
                <ButtonTwoSmall text='Agendar ahora' width={180} icon={Calendar} pressAction={pressAgendar} />
            )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 15, 
        paddingHorizontal: 15, 
        borderRadius: 10, 
        borderColor: '#E2E2E2', 
        borderWidth: 1,
        marginBottom: 15,
    },
    title: {
        fontSize: MyFont.size[4],
        fontFamily: MyFont.medium,
        color: MyColors.neutroDark[4],
    },
    text: {
        fontSize: MyFont.size[8],
        fontFamily: MyFont.medium,
        color: MyColors.neutroDark[4],
    },
    linkText: {
        color: MyColors.verde[3], 
    },
    icon: {
        marginLeft: 10, 
    },
    profileImage: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 30,
    },
});

export default ServicioBox;
