import { useState } from 'react';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { db, firebaseConfig } from '../firebase/index'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../utils/RootParamList";
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo } from '../state/ProfileSlice';
import { add } from 'date-fns';
import { sendEmailCodePromotion } from './useEmail';


const useRegisterFirebase = () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const distpach = useDispatch();

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (props: any) => {

        if (props.password !== props.ConfirmPassword) { return setError('Las contraseñas no coinciden'); }

        try {
            setLoading(true);
            const profileQuery = query(
                collection(db, "users"),
                where("document", "==", props.document)
            );
            const querySnapshot = await getDocs(profileQuery);
            let selectedProfile: any;
            querySnapshot.forEach((doc) => { selectedProfile = doc.data(); });

            if (selectedProfile) {
                console.log('Documento existe .', selectedProfile.email)
                Alert.alert('Documento en uso!');
                setLoading(false);

            } else {
                try {
                    await createUserWithEmailAndPassword(auth, props.email, props.password)
                        .then((userCredential) => {
                            const userId = userCredential.user.uid;
                            try {
                                const dataToCreate = {
                                    user_id: userId,
                                    email: props.email,
                                    role: "client",
                                    urlphoto: '',
                                    document: props.document,
                                    name: props.name,
                                    lastname: props.lastname,
                                    phone: props.phone,
                                    birthdate: props.birthdate
                                };
                                addDoc(collection(db, "users"), dataToCreate).
                                    then(() => {

                                        var codigo = Math.floor(Math.random() * 900000) + 100000;
                                        const currentDate = new Date();const expirationDate = new Date(currentDate);
                                        expirationDate.setDate(currentDate.getDate() + 15);

                                        try {
                                            const dataToUpload = {
                                                codigo: codigo,
                                                state: false,
                                                user_id: userId,
                                                date_to_use: null,
                                                date_to_expired: expirationDate,
                                                charge: 50000
                                            };
                                            addDoc(collection(db, 'promotions'), dataToUpload).then(() => {
                                                sendEmailCodePromotion(props.email, codigo);
                                                setLoading(false);
                                                navigation.navigate('Login')
                                                Alert.alert('Registro exitoso! se envio un mail con un cupon de descuentos.')
                                            }).catch()

                                        } catch (error) {
                                            console.log(error)
                                            setLoading(false);
                                            setError(error.message);
                                            Alert.alert('Ocurrio un error!');
                                        }

                                    }).catch((error) => {
                                        console.log(error)
                                        setLoading(false);
                                        setError(error.message);
                                        Alert.alert('Ocurrio un error!');
                                    });
                            } catch (error) {
                                setLoading(false);
                                console.log(error);
                                setError(error.message);
                                Alert.alert('Ocurrio un error!');
                            }

                        })
                        .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                console.log('That email address is already in use!');
                            }

                            if (error.code === 'auth/invalid-email') {
                                console.log('That email address is invalid!');
                            }
                            setLoading(false);
                            console.log(error)
                            setError(error.message);
                            Alert.alert('Ocurrio un error!');
                        });

                } catch (error) {
                    setLoading(false);
                    console.log(error)
                    setError(error.message);
                    Alert.alert('Ocurrio un error!');
                }

            }

        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log("err", error)
            console.log("err aqui", error.message)
            Alert.alert('Ocurrio un error!');
        }
    };

    const handleLogin = async (email: any, password: any) => {

        await AsyncStorage.setItem('xqtes', JSON.stringify(email));
        await AsyncStorage.setItem('asdqwe', JSON.stringify(password));
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {

                    try {
                        const profileQuery = query(
                            collection(db, "users"),
                            where("user_id", "==", userCredential.user.uid)
                        );

                        const querySnapshot = await getDocs(profileQuery);

                        let selectedProfile: any;

                        querySnapshot.forEach((doc) => {
                            selectedProfile = doc.data();

                        });
                        // SI EXISTE EN FIRESTORE LO MUESTRA
                        if (selectedProfile) {

                            const user = {
                                user_id: selectedProfile.user_id,
                                email: selectedProfile.email,
                                role: selectedProfile.role,
                                urlphoto: selectedProfile.urlphoto,
                                document: selectedProfile.document,
                                name: selectedProfile.name,
                                lastname: selectedProfile.lastname,
                                phone: selectedProfile.phone,
                                birthdate: selectedProfile.birthdate,
                                logged: true
                            }


                            distpach(setUserInfo(user));
                            setLoading(false);

                        } else {
                            setLoading(false);
                            console.log('usuario no existe .', selectedProfile)
                            Alert.alert('usuario no existe!');
                        }

                    } catch (error) {
                        setLoading(false);
                        setError(error.message);
                        console.log("err", error)
                        console.log("err aqui", error.message)
                        Alert.alert('Ocurrio un error!');
                    }


                })
                .catch((error) => {
                    setLoading(false);
                    console.log("error", error)
                    console.log("error", error.message)
                    setError(error.message);
                    Alert.alert('Ocurrio un error!');
                })

        } catch (error) {
            setLoading(false);
            console.log("errerer", error)
            console.log("errerer", error.message)
            setError(error.message);
            Alert.alert('Ocurrio un error!');

        }

    };

    const handleUpdatePassword = async (email: any, password: any, newPassword: any) => {
        setLoading(true);

        try {
            // Reautenticar al usuario antes de cambiar la contraseña
            await reauthenticateUser(email, password);

            // Cambiar la contraseña después de la reautenticación
            await updatePassword(auth.currentUser, newPassword);

            setLoading(false);
            Alert.alert('Contraseña actualizada con éxito!');
            navigation.navigate('Perfil');
        } catch (error) {
            setLoading(false);
            console.error('Error al cambiar la contraseña:', error);
            Alert.alert('No se pudo actualizar la contraseña. Asegúrese de haber proporcionado la contraseña actual correcta.');
        }
    };

    const reauthenticateUser = async (email: any, password: any) => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(email, password);

        try {
            await reauthenticateWithCredential(user, credential);
            return true;
        } catch (error) {
            console.error('Error during reauthentication:', error);
            throw error;
        }
    };
    return { handleLogin, handleRegister, error, setError, loading, handleUpdatePassword };
};

export default useRegisterFirebase;
