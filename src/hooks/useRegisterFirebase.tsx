import { useState } from 'react';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { db, firebaseConfig } from '../firebase/index'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../App';
import { Alert } from 'react-native';



const useRegisterFirebase = () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
    const [error, setError] = useState("");

    const handleRegister = async (props: any) => {

        if (props.password !== props.ConfirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        try {

            createUserWithEmailAndPassword(auth, props.email, props.password)
                .then((userCredential) => {
                    const userId = userCredential.user.uid;
                    console.log(userId)
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

                                navigation.navigate("Login")
                                Alert.alert('Cargado correctamente!')
                            }).catch((error) => {
                                console.log(error)
                                setError(error.message);
                                Alert.alert('Ocurrio un error!');
                            });

                    } catch (error) {
                        console.log(error)
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

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {

                    console.log(userCredential.user.uid)


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

                            // const user = {
                            //     id: selectedProfile.user_id,
                            //     email: selectedProfile.email,
                            //     role: selectedProfile.role
                            // }
                            // localStorage.setItem("zxcasd", email);
                            // localStorage.setItem("qwefgh", password);
                            // distpach(loggearme(user))
                            console.log(JSON.stringify(selectedProfile, null, 6))
                            navigation.navigate("Home")

                        } else { 
                            console.log('usuario no existe .', selectedProfile)
                            Alert.alert('usuario no existe!'); }

                    } catch (error) {
                        setError(error.message);
                        console.log("err", error)
                        Alert.alert('Ocurrio un error!');
                    }


                })
                .catch((error) => {
                    console.log("err", error)
                    setError(error.message);
                    Alert.alert('Ocurrio un error!');
                })

        } catch (error) {
            console.log("err", error)
            setError(error.message);
            Alert.alert('Ocurrio un error!');

        }

    };

    return { handleLogin, handleRegister, error, setError };
};

export default useRegisterFirebase;
