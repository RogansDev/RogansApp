import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { setUserInfo } from "../state/ProfileSlice";

export const useCellPhone = () => {
  const [loading, setLoading] = useState(false);
  const distpach = useDispatch();

  const loginWithPhone = async (phone: string) => {
    setLoading(true);
    console.log("phone....", phone);

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

      if (selectedProfile) {
        console.log("selectedProfile", selectedProfile);
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
          logged: true,
        };
        distpach(setUserInfo(user));
        setLoading(false);
        sendSmsPhoneFirebase(phone);
      } else {
        sendSmsPhoneFirebase(phone);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  const savePhone = () => {};
  const getPhoneFirebase = () => {};
  const getPhoneLocal = () => {};
  const setPhoneLocal = () => {};
  const sendSmsPhoneFirebase = async (to: string) => {
    console.log("to", to);
    const code = 123456;
    const body = `Su codigo de ingreso es ${code}`;
    try {
      const response = await fetch("http://192.168.100.34:3000/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, body }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Mensaje enviado con éxito", result);
      } else {
        console.log("Error enviando el mensaje: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getCodePhoneFirebase = () => {};

  return {
    loginWithPhone,
    savePhone,
    getPhoneFirebase,
    getPhoneLocal,
    setPhoneLocal,
    sendSmsPhoneFirebase,
    getCodePhoneFirebase,
    loading,
  };
};
