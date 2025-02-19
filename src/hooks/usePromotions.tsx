import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import {
  setStateClearPromotion,
  setStatePromotions,
} from "../state/PromotionSlice";
// import useNotificationPush from './useNotificationPush';

interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

interface Props {
  timestamp: Timestamp;
}

const usePromotions = () => {
  const distpach = useDispatch();

  // const { sendNotificationRegisterSuccess } = useNotificationPush();

  const formatDate = (timestamp: Timestamp): string => {
    const milliseconds = timestamp.seconds * 1000;
    const date = new Date(milliseconds);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
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
        selectedCode = doc.data();
      });

      if (selectedCode) {
        const user = {
          codigo: selectedCode.codigo,
          status: selectedCode.status,
          charge: selectedCode.charge,
          user_id: selectedCode.user_id,
          date_to_use: selectedCode.date_to_use,
          date_to_expired: formatDate(selectedCode.date_to_expired),
        };
        distpach(setStatePromotions(user));
      } else {
        distpach(setStateClearPromotion(""));
      }
    } catch (error) {
      console.log("err", error);
      console.log("err aqui", error.message);
    }
  };

  const updateStatusCode = async (
    userId: any,
    code: any,
    status: boolean,
    email: string,
    name: string
  ) => {
    // const currentDate = new Date();
    // try {
    //     const codeQuery = query(
    //         collection(db, "promotions"),
    //         where("user_id", "==", userId),
    //         where("codigo", "==", code)
    //     );
    //     const querySnapshot = await getDocs(codeQuery);
    //     let selectedCode: any;
    //     querySnapshot.forEach((doc) => {
    //         selectedCode = doc.data();
    //     });
    //     if (selectedCode) {
    //         // Obtener la referencia del documento que quieres actualizar
    //         const promoDocRef = doc(db, "promotions", querySnapshot.docs[0].id);
    //         // Actualizar el documento en Firestore con el nuevo estado
    //         await updateDoc(promoDocRef, {
    //             codigo: code,
    //             status: status, // Actualizar el estado
    //             charge: selectedCode.charge,
    //             user_id: userId,
    //             date_to_use: currentDate,
    //             date_to_expired: selectedCode.date_to_expired
    //         });
    //         // Despachar la acción para actualizar el estado local si es necesario
    //         const updatedUser = {
    //             codigo: code,
    //             status: status, // Actualizar el estado
    //             charge: selectedCode.charge,
    //             user_id: userId,
    //             date_to_use: currentDate,
    //             date_to_expired: selectedCode.date_to_expired
    //         }
    //         distpach(setStatePromotions(updatedUser));
    //         // sendNotificationRegisterSuccess('Rogans', `Operacion ${status ? "con exito":"sin exito"}`, { name: '1' });
    //         sendEmailCodePromotionStatus(email, status, name);
    //     }
    // } catch (error) {
    //     console.log("err", error);
    //     console.log("err aqui", error.message);
    // }
  };

  return { handleStatusCode, updateStatusCode };
};

export default usePromotions;
