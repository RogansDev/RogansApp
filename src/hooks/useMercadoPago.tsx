import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Alert } from 'react-native';
import { sendEmailPayment } from './useEmail';
import { useState } from 'react';
import { obtenerFechaActual } from '../utils/helper';

const useMercadoPago = () => {

    const [loading, setLoading] = useState(false);

    const savePaymentDetails = (idUsuario: string, email: string, monto: number,
        detalle: string, cantidad: number, name: string, producto: string
    ) => {
        const fecha = obtenerFechaActual();
        const dataToUpload = {
            idUsuario: idUsuario,
            email: email,
            monto: monto,
            detalle: detalle,
            cantidad: cantidad,
            producto: producto,
            fecha: fecha
        }
        setLoading(true);
        try {
            addDoc(collection(db, 'mercadopago'), dataToUpload).then(() => {
                sendEmailPayment(email, name);
                Alert.alert('Pago procesado.');
                setLoading(false);
            }).catch()
        } catch (error: any) {
            setLoading(false);
            Alert.alert('Ocurrio un error.');
        }
    }
    const readPaymentDetailsById = async (id: string) => {
        setLoading(true);
        try {
            const mercadopagoDocRef = doc(db, "mercadopago", id);
            const docSnap = await getDoc(mercadopagoDocRef);
            if (docSnap.exists()) {
                setLoading(false);
                return docSnap.data(); 
            } else {
                setLoading(false);
                Alert.alert("No se encontró el documento.");
                return null;
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("Ocurrió un error al leer los detalles del pago.");
            return null;
        }
    }
    
    const readAllPaymentsDetails = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "mercadopago"));
            const paymentDetails: any = [];
            querySnapshot.forEach((doc) => {
                paymentDetails.push(doc.data()); 
            });
            setLoading(false);
            return paymentDetails; 
        } catch (error) {
            setLoading(false);
            Alert.alert("Ocurrió un error al leer todos los detalles de los pagos.");
            return []; 
        }
    }    

    const deletePaymentDetailsById = async (id: string) => {
        setLoading(true);
        try {
            const mercadopagoDoc = doc(db, "mercadopago", id);
            await deleteDoc(mercadopagoDoc);
            Alert.alert('Pago eliminado.');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert('Ocurrio un error.');
        }
    }

    const updatePaymentDetailsById = async (idUsuario: string, email: string, monto: number,
        detalle: string, cantidad: number, name: string, producto: string
    ) => {
        const mpagoDocument = doc(db, 'mercadopago', idUsuario);
        setLoading(true);
        try {
            const fecha = obtenerFechaActual();
            const dataToUpload = {
                idUsuario: idUsuario,
                email: email,
                monto: monto,
                detalle: detalle,
                cantidad: cantidad,
                producto: producto,
                fecha: fecha
            }
            await updateDoc(mpagoDocument, dataToUpload);
            sendEmailPayment(email, name);
            Alert.alert('Pago procesado.');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert('Ocurrio un error.');
        }
    }

    return {
        savePaymentDetails,
        readPaymentDetailsById,
        readAllPaymentsDetails,
        deletePaymentDetailsById,
        updatePaymentDetailsById,
        loading
    }
}

export default useMercadoPago