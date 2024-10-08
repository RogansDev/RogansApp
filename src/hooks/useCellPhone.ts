import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { saveCredentials } from "../services/credentials";
import { setAuthorizationInfo } from "../state/AuthorizationSlice";
import { setUserInfo } from "../state/ProfileSlice";
import {
  obtenerCodigoLongitudSeisNumerico,
  obtenerFechaActual,
} from "../utils/helper";
import useTokenPush from "./useTokenPush";

export const useCellPhone = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const distpach = useDispatch();
  const { registerForPushNotificationsAsync } = useTokenPush();

  const loginWithPhone = async (phone: string) => {
    setLoading(true);

    console.log("primero consulto si el phone existe", phone);

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
        console.log("phone existe", JSON.stringify(selectedProfile, null, 5));
        const user = {
          user_id: selectedProfile?.user_id ?? "",
          email: selectedProfile?.email ?? "",
          role: selectedProfile?.role ?? "",
          urlphoto: selectedProfile?.urlphoto ?? "",
          document: selectedProfile?.document ?? "",
          name: selectedProfile?.name ?? "",
          lastname: selectedProfile?.lastname ?? "",
          phone: selectedProfile?.phone ?? "",
          birthdate: selectedProfile?.birthdate ?? "",
          token: selectedProfile?.token ?? "",
          plataforma: selectedProfile?.plataforma ?? "",
          logged: true,
        };
        distpach(setUserInfo(user));
        await sendSmsPhoneFirebase(phone);
        setLoading(false);
      } else {
        console.log("phone no existe");
        const plataforma = Platform.OS;
        const token = await registerForPushNotificationsAsync();
        const user = {
          user_id: "",
          email: "",
          role: "",
          urlphoto: "",
          document: "",
          name: "",
          lastname: "",
          phone: phone,
          plataforma: plataforma,
          token: token ?? "",
          birthdate: "",
          logged: true,
        };
        distpach(setUserInfo(user));
        await sendSmsPhoneFirebase(phone);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  const savePhone = async (phoneSave: string, codeSave: string) => {
    const collectionRef = collection(db, "phoneCode");
    const fecha = obtenerFechaActual();
    console.log("guardo el codigo generado");
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
    const code = obtenerCodigoLongitudSeisNumerico();
    const body = `Su codigo de ingreso a Rogans es ${code}`;

    console.log("manejo el envio de SMS y guardo el codigo");
    console.log("code", code, "body", body);

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
        await savePhone(to, code);
        setShowModal(true); // muestro el input para el codigo
      } else {
        console.log("Error enviando el mensaje: " + result.message);
        Alert.alert("No se pudo enviar el mensaje!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getCodePhoneFirebase = async (code: string, phone: string) => {
    const fechaActual = obtenerFechaActual();
    setLoading(true);
    console.log(
      "escribo el code",
      code,
      "y debe ser el mismo dia",
      fechaActual
    );
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
        selectedCode = doc.data();
      });

      if (selectedCode) {
        console.log("codigo correcto, entro a la app");
        await saveCredentials("phoneToken", phone);
        await saveCredentials("authToken", "true");

        const auth = {
          logged: true,
          phone: phone,
        };
        distpach(setAuthorizationInfo(auth));
        setShowModal(false);
      } else {
        console.log("codigo incorrecto, no entro a la app");
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
