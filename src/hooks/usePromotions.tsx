import { collection, getDocs, query, where } from 'firebase/firestore';
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

        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
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


    return { handleStatusCode }

}

export default usePromotions