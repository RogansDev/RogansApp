import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { setAuthorizationInfo } from "../state/AuthorizationSlice";
import { setUserInfo } from "../state/ProfileSlice";
import {
  obtenerCodigoLongitudSeisNumerico,
  obtenerFechaActual,
} from "../utils/helper";

export const useCellPhone = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      console.log("selectedProfile", selectedProfile);
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
          logged: true,
        };
        distpach(setUserInfo(user));
        setLoading(false);
        sendSmsPhoneFirebase(phone);
      } else {
        const user = {
          user_id: "",
          email: "",
          role: "",
          urlphoto: "",
          document: "",
          name: "",
          lastname: "",
          phone: phone,
          birthdate: "",
          logged: true,
        };
        distpach(setUserInfo(user));
        setLoading(false);
        sendSmsPhoneFirebase(phone);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  const savePhone = async (phoneSave: string, codeSave: string) => {
    console.log(
      "guardo...",
      "\n phoneSave",
      phoneSave,
      "\n codeSave",
      codeSave
    );
    const collectionRef = collection(db, "phoneCode");
    const fecha = obtenerFechaActual();

    try {
      const objetc = {
        phone: phoneSave,
        code: codeSave,
        fecha: fecha,
      };

      await addDoc(collectionRef, objetc);
    } catch (error) {
      console.log(error, error);
    }
  };
  const getPhoneFirebase = () => {};
  const getPhoneLocal = () => {};
  const setPhoneLocal = () => {};

  const sendSmsPhoneFirebase = async (to: string) => {
    console.log("to", to);
    const code = obtenerCodigoLongitudSeisNumerico();
    const body = `Su codigo de ingreso a Rogans es ${code}`;

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
        await savePhone(to, code);
        setShowModal(true);
      } else {
        console.log("Error enviando el mensaje: " + result.message);
        Alert.alert("No se pudo enviar el mensaje!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getCodePhoneFirebase = async (code: string, phone: string) => {
    console.log("getCodePhoneFirebase", "\n code", code, "\n phone", phone);
    const fechaActual = obtenerFechaActual();
    setLoading(true);
    try {
      const phoneCodeQuery = query(
        collection(db, "phoneCode"),
        where("code", "==", code),
        where("phone", "==", phone),
        where("fecha", "==", fechaActual)
      );
      //
      const querySnapshot = await getDocs(phoneCodeQuery);
      let selectedCode: any;
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        selectedCode = doc.data();
      });
      console.log("selectedCode", selectedCode);
      if (selectedCode) {
        console.log("vengo por aqui ....");
        distpach(setAuthorizationInfo(true));
        setShowModal(false);
      } else {
        setShowModal(false);
        Alert.alert("Codigo incorrecto ingresado");
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setShowModal(false);
      setLoading(false);
    }
  };

  return {
    loginWithPhone,
    savePhone,
    getPhoneFirebase,
    getPhoneLocal,
    setPhoneLocal,
    sendSmsPhoneFirebase,
    getCodePhoneFirebase,
    loading,
    showModal,
  };
};
