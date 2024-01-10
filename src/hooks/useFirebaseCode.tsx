import { useState } from 'react';
import { db } from '../firebase/index'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { sendEmailCode } from './useEmail';


const useFirebaseCode = () => {

    const navigation = useNavigation();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSaveCode = async (mail: any) => {

        setLoading(true);
        try {
            var codigo = Math.floor(Math.random() * 900000) + 100000;
            try {
                const dataToCreate = {
                    codigo: codigo,
                    // email: mail
                };
                addDoc(collection(db, "emailcodes"), dataToCreate).
                    then(() => {
                        sendEmailCode(mail, codigo);
                        setLoading(false);
                        Alert.alert(`Código enviado a ${mail}`)
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
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(error.message);
            Alert.alert('Ocurrio un error!');
        }
    };
    const handleReadCode = async (codigo: any) => {
        console.log('mis datos son ....')
        console.log(codigo)

        setLoading(true);
        
        const numericCode = parseInt(codigo);
        try {
            const codeQuery = query(
                collection(db, "emailcodes"),
                where("codigo", "==", numericCode)
            );
            const querySnapshot = await getDocs(codeQuery);
            console.log('Query snapshot:', querySnapshot.docs);
            // Rest of your code...

            let selectedCode: any;
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                selectedCode = doc.data();
            });
            // SI EXISTE EN FIRESTORE LO MUESTRA
            console.log('selected data', selectedCode)

            if (selectedCode) {
                navigation.navigate("UpdateKey");
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
