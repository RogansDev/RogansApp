import { useState } from 'react';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { db, firebaseConfig } from '../firebase/index'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo } from '../state/ProfileSlice';


const useRegisterFirebase = () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const distpach = useDispatch();
    const {email: correo} = useSelector((state: any)=>state.code);

    const navigation = useNavigation();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (props: any) => {

        if (props.password !== props.ConfirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        setLoading(true);
        try {

            createUserWithEmailAndPassword(auth, props.email, props.password)
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
                                setLoading(false);
                                navigation.navigate('Login');
                                Alert.alert('Cargado correctamente!')
                            }).catch((error) => {
                                setLoading(false);
                                console.log(error)
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

    const handleUpdatePassword = async (email: any, newPassword: any) => {

        console.log('mi email es ...', email);
        setLoading(true);
        try {
            const profileQuery = query(
                collection(db, "users"),
                where("email", "==", email)
            );

            const querySnapshot = await getDocs(profileQuery);

            let selectedProfile: any;

            querySnapshot.forEach((doc) => {
                selectedProfile = doc.data();

            });
            if (selectedProfile) {

                const uid = selectedProfile.user_id;
                console.log('mi uid es ...', uid);

                try {
                    await updatePassword(uid, newPassword);
                    setLoading(false);
                    Alert.alert('Contraseña actualizada con existo!');
                    navigation.navigate('ConfirmationKey');
                } catch (error) {
                    setLoading(false);
                    console.log('email no existe .', selectedProfile)
                    console.log('err no existe .', error)
                    Alert.alert('email no existe!');
                }

            } else {
                setLoading(false);
                console.log('email no existe .', selectedProfile)
                Alert.alert('email no existe!');
            }

        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log("err", error)
            console.log("err aqui", error.message)
            Alert.alert('Ocurrio un error!');
        }


    };

    return { handleLogin, handleRegister, error, setError, loading, handleUpdatePassword };
};

export default useRegisterFirebase;
