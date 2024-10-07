import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons';

const ServicioBox = ({title, text, titleColored, titleColor, imageUrl, pressAction = () => {}}:any) => {
    const { Arrow } = Icons;

    const getImageSource = (imageUrl: string) => {
        switch (imageUrl) {
            case 'diagnosis-alopecia':
                return require('../../../../assets/diagnosis-alopecia.jpg');
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
                return require('../../../../assets/diagnosis-alopecia.jpg'); // Imagen por defecto si no coincide
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={pressAction}>
            <Image source={getImageSource(imageUrl)}  style={styles.profileImage} />
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                    <Text style={styles.title}>
                        {title} <Text style={{color: titleColor,}}>{titleColored}</Text>
                    </Text>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
                <Arrow width={20} height={20} style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15, 
        paddingHorizontal: 15, 
        borderRadius: 10, 
        borderColor: MyColors.neutroDark[3], 
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
    },
});

export default ServicioBox;
