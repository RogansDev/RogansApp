import { useState } from 'react';
import { SendEmailResetPassword, db } from '../firebase/index'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Alert } from 'react-native';
import { sendEmailCode } from './useEmail';
const useFirebaseCode = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSaveCode = async (mail: any) => {

        setLoading(true);
        try {
            const emailQuery = query(
                collection(db, "users"),
                where("email", "==", mail)
            );
            const querySnapshot = await getDocs(emailQuery);
            let selectedEmail: any;
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                selectedEmail = doc.data();
            });

            if (selectedEmail) {
                var codigo = Math.floor(Math.random() * 900000) + 100000;
                try {
                    const dataToCreate = {
                        codigo: codigo
                    };
                    addDoc(collection(db, "emailcodes"), dataToCreate).
                        then(() => {
                            sendEmailCode(mail, codigo);
                            setLoading(false);
                            Alert.alert(`Código enviado a ${mail}`);
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
            } else {
                setLoading(false);
                console.log('email no existe .', selectedEmail)
                Alert.alert('email no existe!');
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(error.message);
            Alert.alert('Email no existe!');
        }
    };
    const handleReadCode = async (codigo: any, mail: any) => {

        setLoading(true);

        const numericCode = parseInt(codigo);
        try {
            const codeQuery = query(
                collection(db, "emailcodes"),
                where("codigo", "==", numericCode)
            );
            const querySnapshot = await getDocs(codeQuery);
            let selectedCode: any;
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                selectedCode = doc.data();
            });
            console.log('selected data', selectedCode)

            if (selectedCode) {
                SendEmailResetPassword(mail)
                Alert.alert(`se envio un email a ${mail} para cambiar la contraseña`);
                setLoading(false);
            } else {
                setLoading(false);
                console.log('codigo no existe .', selectedCode)
                Alert.alert('codigo no existe!');
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log("err", error)
            console.log("err aqui", error.message)
            Alert.alert('Ocurrio un error!');
        }
    };

    return { handleReadCode, handleSaveCode, error, setError, loading };
};

export default useFirebaseCode;
