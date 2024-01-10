import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';

const isValidImage = (uri) => {
    // Verificar si la URL tiene una extensión de imagen válida
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const lowerCaseUri = uri.toLowerCase();
    return allowedExtensions.some(ext => lowerCaseUri.endsWith(ext));
};

const useImagePicker = () => {
    const { urlphoto } = useSelector((state: any) => state.user);

    const [image, setImage] = useState(urlphoto);
    const [imageName, setImageName] = useState("");

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

        if (!result.canceled && isValidImage(result.assets[0].uri)) {
            setImage(result.assets[0].uri);
            setImageName(`image_${Date.now()}.jpg`);
        } else {
            // Mostrar una alerta o realizar alguna acción si la imagen no es válida
            alert('La imagen seleccionada no es válida. Por favor, elige una imagen JPEG, PNG, GIF, o BMP.');
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

        if (!result.canceled && isValidImage(result.assets[0].uri)) {
            setImage(result.assets[0].uri);
            setImageName(`image_${Date.now()}.jpg`);
        } else {
            // Mostrar una alerta o realizar alguna acción si la imagen no es válida
            alert('La imagen capturada no es válida. Por favor, elige una imagen JPEG, PNG, GIF, o BMP.');
        }
    };

    return { image, imageName, pickImage, takePhoto };
};

export default useImagePicker;
