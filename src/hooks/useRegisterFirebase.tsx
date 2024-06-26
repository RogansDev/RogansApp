import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { db, firebaseConfig } from '../firebase/index'
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../utils/RootParamList";
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setClearUserInfo, setUserInfo } from '../state/ProfileSlice';
import { sendEmailCodePromotion } from './useEmail';
import useNotificationPush from './useNotificationPush';
import { getCredentials, saveCredentials } from '../services/credentials';
import { obtenerCodigoLongitudSeis, obtenerFechaActual } from '../utils/helper';

const useRegisterFirebase = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const { sendNotificationRegisterSuccess } = useNotificationPush();
    const distpach = useDispatch();
    const navigation = useNavigation<StackNavigationProp<RootParamList>>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const currentDate = new Date();

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
            let selectedProfileAux: any;
            querySnapshot.forEach((doc) => { selectedProfile = doc.data(); });
            selectedProfileAux = (props.document == '' || props.document == null ) ? false : selectedProfile;
            if (selectedProfileAux) {
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
                                    birthdate: props.birthdate,
                                    createdAt: currentDate

                                };
                                addDoc(collection(db, "users"), dataToCreate).
                                    then(() => {

                                        var codigo = obtenerCodigoLongitudSeis()
                                        const fechaActual = obtenerFechaActual();

                                        try {
                                            const postDataReferencias = {
                                                fecha: fechaActual,
                                                role: dataToCreate.role,
                                                code: codigo,
                                                email: dataToCreate.email,
                                                arrayReferenciadosEmails:[],
                                                arrayReferenciadosMontos:[],
                                                arrayReferenciadosFechas:[]
                                            };
                                            
                                            addDoc(collection(db, 'referencias'), postDataReferencias).then(() => {
                                                sendEmailCodePromotion(props.email, codigo, props.name);
                                                // navigation.navigate('Login')
                                                sendNotificationRegisterSuccess('Rogans', `Bienvenido a Rogans  ${props.name}`, { name: props.name });
                                                handleLogin(props.email, props.password);
                                                Alert.alert('Registro exitoso! se envio un mail con un cupon de descuentos.');
                                                setLoading(false);
                                            }).catch()

                                        } catch (error: any) {
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
                            } catch (error: any) {
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

                } catch (error: any) {
                    setLoading(false);
                    console.log(error)
                    setError(error.message);
                    Alert.alert('Ocurrio un error!');
                }

            }

        } catch (error: any) {
            setLoading(false);
            setError(error.message);
            console.log("err", error)
            console.log("err aqui", error.message)
            Alert.alert('Ocurrio un error!');
        }
    };

    const handleLogin = async (email: any, password: any) => {


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
                            await saveCredentials('email', email);
                            await saveCredentials('password', password);

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
    const handleDeleteAccount = async (userID: any) => {
        setLoading(true);
        try {
            const googleId = await getCredentials('googleToken');
            const user = auth.currentUser;
            const userDoc = doc(db, "users", userID);
            if (googleId || googleId !== null || googleId !== undefined || googleId !== '') {
                console.log('null')
            } else {
                await user.delete();
            }
            await deleteDoc(userDoc);
            setLoading(false)
            distpach(setClearUserInfo(''));
            Alert.alert('Cuenta eliminada!');
        } catch (error) {
            setError(error.message);
            setLoading(false)
            console.error('Error al eliminar la cuenta', error);
            Alert.alert('Cuenta no se pudo eliminar!');
        }
    };
    // Google Register
    const handleGoogleRegister = async (props: any) => {
        try {
            setLoading(true);
            const profileQuery = query(
                collection(db, "users"),
                where("document", "==", props.document),
            );

            const profileQueryByEmail = query(
                collection(db, "users"),
                where("email", "==", props.email),
            );

            const querySnapshot = await getDocs(profileQuery);
            const querySnapshotByemail = await getDocs(profileQueryByEmail);

            let selectedProfile: any;
            let selectedProfileAux: any;
            let selectedProfileByEmail: any;
            querySnapshot.forEach((doc) => { selectedProfile = doc.data(); });
            querySnapshotByemail.forEach((doc) => { selectedProfileByEmail = doc.data(); });
            selectedProfileAux = (props.document == '' || props.document == null ) ? false : selectedProfile;
            if (selectedProfileAux && selectedProfileByEmail) {
                if(selectedProfileAux.email === props.email){
                    handleGoogleLogin(selectedProfileAux.user_id);                
                }else {
                    Alert.alert('Documento en uso con otro correo electrónico!');
                }
                setLoading(false);                

            } else if (selectedProfileAux || selectedProfileByEmail){                
                if(selectedProfileByEmail){
                    handleGoogleLogin(selectedProfileByEmail.user_id);
                }else{
                    Alert.alert('Documento en uso con otro correo electrónico!');
                }
                setLoading(false);                

            } else{
                const dataToCreate = {
                    user_id: props.google_id,
                    email: props.email,
                    role: "client",
                    urlphoto: props.photo,
                    document: props.document,
                    name: props.name,
                    lastname: props?.lastname ?? '',
                    phone: props.phone,
                    birthdate: props.birthdate,
                    createdAt: currentDate
                };
                addDoc(collection(db, "users"), dataToCreate).
                    then(() => {
                        var codigo = obtenerCodigoLongitudSeis()
                        const fechaActual = obtenerFechaActual();
                        
                        try {
                            const postDataReferencias = {
                                fecha: fechaActual,
                                role: dataToCreate.role,
                                code: codigo,
                                email: dataToCreate.email,
                                arrayReferenciadosEmails:[],
                                arrayReferenciadosMontos:[],
                                arrayReferenciadosFechas:[]
                            };
                            
                            addDoc(collection(db, 'referencias'), postDataReferencias).then(() => {
                                sendEmailCodePromotion(props.email, codigo, props.name);
                                sendNotificationRegisterSuccess('Rogans', `Bienvenido a Rogans  ${props.name}`, { name: props.name });
                                handleGoogleLogin(props.google_id);
                                Alert.alert('Registro exitoso! se envio un mail con un cupon de descuentos.');
                                setLoading(false);
                            }).catch((error) => {
                                console.log(error)
                                setLoading(false);
                                setError(error.message);
                                Alert.alert('Ocurrio un error!');
                            })
                        } catch (error: any) {
                            console.log(error)
                            setLoading(false);
                            setError(error.message);
                            Alert.alert('Ocurrio un error!');
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        setLoading(false);
                        setError(error.message);
                        Alert.alert('Ocurrio un error!');
                    }
                    )
            }
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
            console.log("err", error)
            console.log("err aqui", error.message)
            Alert.alert('Ocurrio un error!');
        }
    };

    const handleGoogleLogin = async (id: any) => {
        setLoading(true);
        try {
            const profileQuery = query(
                collection(db, "users"),
                where("user_id", "==", id)
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
                    lastname: selectedProfile?.lastname,
                    phone: selectedProfile.phone,
                    birthdate: selectedProfile.birthdate,
                    logged: true
                }
                await saveCredentials('email', selectedProfile.email);
                await saveCredentials('googleToken', selectedProfile.user_id);
                distpach(setUserInfo(user));
                setLoading(false);
            } else {
                setLoading(false);
                console.log('usuario no existe .', selectedProfile)
                Alert.alert('usuario no existe!');
            }
        } catch (error: any) {
            setLoading(false);
            console.log("errerer", error)
            console.log("errerer", error.message)
            setError(error.message);
            Alert.alert('Ocurrio un error!');
        }
    };

    return {
        handleLogin,
        handleRegister,
        handleGoogleRegister,
        error,
        setError,
        loading,
        handleUpdatePassword,
        handleDeleteAccount,
        handleGoogleLogin
    };
};

export default useRegisterFirebase;