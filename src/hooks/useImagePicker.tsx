import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { uploadFile } from '../firebase';


const isValidImage = (uri) => {

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const lowerCaseUri = uri.toLowerCase();
    return allowedExtensions.some(ext => lowerCaseUri.endsWith(ext));
};

const useImagePicker = () => {
    const { urlphoto, user_id } = useSelector((state: any) => state.user);
    const [base64Image, setBase64Image] = useState(urlphoto);
    const [image, setImage] = useState("");

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
            const base64 = await convertImageToBase64(result.assets[0].uri);
            setBase64Image(base64);
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
            const base64 = await convertImageToBase64(result.assets[0].uri);
            // console.log('convierto mi imagen a base 64', base64)
            setBase64Image(base64);
        } else {
            // Mostrar una alerta o realizar alguna acción si la imagen no es válida
            alert('La imagen capturada no es válida. Por favor, elige una imagen JPEG, PNG, GIF, o BMP.');
        }
    };

    const convertImageToBase64 = async (uri : any) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            
            return `data:image/jpeg;base64,${base64}`;
        } catch (error) {
            console.error('Error al convertir la imagen a base64:', error);
            throw error;
        }
    };

    const convertImageToFirebaseUrl = async (uri : any) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
    
            // Generar un nombre único para la imagen
            const imageName = `${user_id}_${Date.now()}.jpg`;
    
            // Subir la imagen al almacenamiento de Firebase
            const imageUrl = await uploadFile(blob, imageName, 'images');
    
            return imageUrl;
        } catch (error) {
            console.error('Error al subir la imagen a Firebase:', error);
            throw error;
        }
    };
    

    return { image, base64Image, pickImage, takePhoto, convertImageToFirebaseUrl };
};

export default useImagePicker;
