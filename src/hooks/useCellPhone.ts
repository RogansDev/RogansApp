import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../state/ProfileSlice";

export const useCellPhone  = () =>{

    const [loading, setLoading] = useState(false);
    const distpach = useDispatch();

    const loginWithPhone = async(phone: string)=>{
        setLoading(true);
        console.log('phone....', phone)

        try {
            const phoneRef = query(
                collection(db, "users"),
                where("phone", "==", phone)
              );
              
            const querySnapshot = await getDocs(phoneRef);
            let selectedProfile: any;

            querySnapshot.forEach((doc) => {
                selectedProfile = doc.data();
            });

            if(selectedProfile){
                console.log('selectedProfile', selectedProfile);
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
                // logica para enviar SMS doble factor
            }else{
                // logica parea enviar SMS y levantar pop op

            }
            setLoading(false);
        } catch (error) {
            console.log('error', error);
            setLoading(false);
        }
    }
    const savePhone =()=>{}
    const getPhoneFirebase =()=>{}
    const getPhoneLocal =()=>{}
    const setPhoneLocal =()=>{}
    const sendSmsPhoneFirebase =()=>{}
    const getCodePhoneFirebase =()=>{}

    return {
        loginWithPhone,
        savePhone,
        getPhoneFirebase,
        getPhoneLocal,
        setPhoneLocal,
        sendSmsPhoneFirebase,
        getCodePhoneFirebase,
        loading,
    }
}
