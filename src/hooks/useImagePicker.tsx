import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const useImagePicker = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // Pedir permisos para la galería
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Lo siento, necesitamos permisos para acceder a tus fotos!');
            return;
        }

        // Abrir la selección de imágenes
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        // Pedir permisos para la cámara
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Lo siento, necesitamos permisos para acceder a tu cámara!');
            return;
        }

        // Abrir la cámara
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return { image, pickImage, takePhoto };
};

export default useImagePicker;
