import { useState } from 'react';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
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


const useRegisterFirebase = () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const distpach = useDispatch();

    const navigation = useNavigation<StackNavigationProp<RootParamList>>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (props: any) => {
        setLoading(true)
        if (props.password !== props.ConfirmPassword) {
            return setError('Las contraseñas no coinciden');
        }
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
                                navigation.navigate('Login')
                                Alert.alert('Cargado correctamente!')
                            }).catch((error) => {
                                console.log(error)
                                setError(error.message);
                                Alert.alert('Ocurrio un error!');
                            });

                    } catch (error) {
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
                    console.log(error)
                    setError(error.message);
                    Alert.alert('Ocurrio un error!');
                });

        } catch (error) {
            console.log(error)
            setError(error.message);
            Alert.alert('Ocurrio un error!');
        }


    };

    const handleLogin = async (email: any, password: any) => {

        console.log(`email ${email} y pass ${password}`)
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
                           
                            AsyncStorage.setItem('@xqtes', JSON.stringify(email));
                            AsyncStorage.setItem('@asdqwe', JSON.stringify(password));
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

    return { handleLogin, handleRegister, error, setError, loading, setLoading };
};

export default useRegisterFirebase;
