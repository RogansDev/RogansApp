import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { setStateClearPromotion, setStatePromotions } from '../state/PromotionSlice';

interface Timestamp {
    nanoseconds: number;
    seconds: number;
}

interface Props {
    timestamp: Timestamp;
}


const usePromotions = () => {

    const distpach = useDispatch();

    const formatDate = (timestamp: Timestamp): string => {
        const milliseconds = timestamp.seconds * 1000;
        const date = new Date(milliseconds);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleStatusCode = async (userId: any) => {


        try {
            const codeQuery = query(
                collection(db, "promotions"),
                where("user_id", "==", userId)
            );

            const querySnapshot = await getDocs(codeQuery);
            let selectedCode: any;
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                selectedCode = doc.data();
            });

            if (selectedCode) {

                const user = {
                    codigo: selectedCode.codigo,
                    status: selectedCode.status,
                    charge: selectedCode.charge,
                    user_id: selectedCode.user_id,
                    date_to_use: selectedCode.date_to_use,
                    date_to_expired: formatDate(selectedCode.date_to_expired)
                }
                distpach(setStatePromotions(user));
            } else {
                distpach(setStateClearPromotion(''));
            }

        } catch (error) {

            console.log("err", error)
            console.log("err aqui", error.message)

        }
    };

    const updateStatusCode = async (userId: any, code: any, status: boolean) => {

        const currentDate = new Date();
        try {
            const codeQuery = query(
                collection(db, "promotions"),
                where("user_id", "==", userId),
                where("codigo", "==", code)
            );
    
            const querySnapshot = await getDocs(codeQuery);
            let selectedCode: any;
            querySnapshot.forEach((doc) => {
                selectedCode = doc.data();
            });
    
            if (selectedCode) {
                // Obtener la referencia del documento que quieres actualizar
                const promoDocRef = doc(db, "promotions", querySnapshot.docs[0].id);
    
                // Actualizar el documento en Firestore con el nuevo estado
                await updateDoc(promoDocRef, {
                    codigo: code,
                    status: status, // Actualizar el estado
                    charge: selectedCode.charge,
                    user_id: userId,
                    date_to_use: currentDate,
                    date_to_expired: selectedCode.date_to_expired
                });
    
                // Despachar la acción para actualizar el estado local si es necesario
                const updatedUser = {
                    codigo: code,
                    status: status, // Actualizar el estado
                    charge: selectedCode.charge,
                    user_id: userId,
                    date_to_use: currentDate,
                    date_to_expired: selectedCode.date_to_expired
                }
                distpach(setStatePromotions(updatedUser));
            }
        } catch (error) {
            console.log("err", error);
            console.log("err aqui", error.message);
        }
    };


    return { handleStatusCode, updateStatusCode }

}

export default usePromotions