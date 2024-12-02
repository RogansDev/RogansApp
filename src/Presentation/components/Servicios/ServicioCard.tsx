import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons';
import ButtonOneSmall from '../buttons/ButtonOneSmall';

const ServicioBox = ({title, text, imageUrl, pressAction = () => {}}:any) => {
    const { Arrow, ArrowWhiteIcon, Calendar, AutodiagnosticoVerde } = Icons;

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
            default:
                return require('../../../../assets/diagnosis-alopecia.png'); // Imagen por defecto si no coincide
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={pressAction}>
            <View style={{flexDirection: 'row',}}>
                <Image source={getImageSource(imageUrl)}  style={styles.profileImage} />
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.text}>
                            {text}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row', gap: 12, marginBottom: 3, marginTop: 5,}}>
                <ButtonOneSmall text='Agendar' width={120} icon={Calendar} />
                <ButtonOneSmall text='Autodiagnóstico' width={190} icon={AutodiagnosticoVerde} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15, 
        paddingHorizontal: 15, 
        borderRadius: 10, 
        marginBottom: 15,
        backgroundColor: MyColors.verde[3],
        alignItems: 'center',
    },
    title: {
        fontSize: MyFont.size[4],
        fontFamily: MyFont.medium,
        color: '#FFFFFF',
    },
    text: {
        fontSize: MyFont.size[8],
        fontFamily: MyFont.medium,
        color: '#FFFFFF',
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
        borderRadius: 15,
    },
});

export default ServicioBox;
