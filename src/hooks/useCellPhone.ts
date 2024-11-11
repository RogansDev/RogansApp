import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { saveCredentials } from "../services/credentials";
import { setAuthorizationInfo } from "../state/AuthorizationSlice";
import { setUserInfo } from "../state/ProfileSlice";
import {
  obtenerCodigoLongitudSeisNumerico,
  obtenerFechaActual,
} from "../utils/helper";
import useTokenPush from "./useTokenPush";
import useRegisterFirebase from "./useRegisterFirebase";
import DeviceInfo from 'react-native-device-info';

export const useCellPhone = () => {
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false); // Para saber si es un nuevo usuario
  const [showModal, setShowModal] = useState(false); // Para mostrar el input de código
  const dispatch = useDispatch();
  const { registerForPushNotificationsAsync } = useTokenPush();
  const { createUser } = useRegisterFirebase();

  // Función para iniciar sesión con teléfono
  const loginWithPhone = async (phone: string) => {
    setLoading(true);

    // Verificar si es el número de testing
    if (phone === '+571122334455') {
      const plataforma = Platform.OS;
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
        token: "",
        birthdate: "",
        logged: true,
      };

      dispatch(setUserInfo(user)); // Guardar información del usuario
      await saveCredentials("phoneToken", phone);
      await saveCredentials("authToken", "true");

      // Guardar el usuario de testing en Firebase
      await addDoc(collection(db, "users"), user);

      // Autenticación en Redux
      dispatch(setAuthorizationInfo({ logged: true, phone: phone }));

      setLoading(false);
      console.log("Número de testing detectado, omitiendo verificación de código");
      return;
    }

    console.log("Consultando si el teléfono existe en Firebase", phone);

    try {
      const phoneRef = query(collection(db, "users"), where("phone", "==", phone));
      const querySnapshot = await getDocs(phoneRef);
      let selectedProfile: any;

      querySnapshot.forEach((doc) => {
        selectedProfile = doc.data();
      });

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
          token: selectedProfile.token,
          plataforma: selectedProfile.plataforma,
        }
        // Si el número ya existe en Firebase, enviar el código
        console.log("El teléfono existe:", selectedProfile);

        dispatch(setUserInfo(user));
        await sendSmsPhoneFirebase(phone);
        setLoading(false);
      } else {
        // Crear el usuario usando el nuevo hook
        console.log("El teléfono no existe, creando usuario...");
        const getToken = async () => {
          let token = "";
          try {
            const DeviceInfo = await import('react-native-device-info'); // Dynamically import DeviceInfo
            const isEmulator = await DeviceInfo.isEmulator();
            token = isEmulator ? "" : await registerForPushNotificationsAsync();
          } catch (error) {
            console.log("Error fetching device info or registering for push notifications:", error);
          }
          return token;
        };

        const tokenPush = await getToken();
        const userCreated = await createUser(phone, tokenPush);

        if (userCreated) {
          await sendSmsPhoneFirebase(phone); // Enviar código de verificación
          setIsNew(true); // Marcar que es un nuevo usuario
        }

        setLoading(false);
      }
    } catch (error) {
      console.log("Error al consultar el teléfono:", error);
      setLoading(false);
    }
  };

  // Función para guardar el código y el teléfono en Firebase
  const savePhone = async (phoneSave: string, codeSave: string) => {
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

  // Función para enviar SMS con el código de verificación
  const sendSmsPhoneFirebase = async (to: string) => {
    const code = obtenerCodigoLongitudSeisNumerico(); // Generar código de 6 dígitos
    const body = `Su código de ingreso a Rogans es ${code}`;

    console.log("Enviando SMS y guardando el código");
    try {
      const response = await fetch("https://roganscare.com:5500/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, body }),
      });

      const result = await response.json();
      if (result.success) {
        await savePhone(to, code); // Guardar código y teléfono en Firebase
        setShowModal(true); // Mostrar input para código
      } else {
        console.log("Error enviando el mensaje: " + result.message);
        Alert.alert("No se pudo enviar el mensaje!");
      }
    } catch (error) {
      console.error("Error al enviar el SMS:", error);
    }
  };

  // Función para verificar el código ingresado
  const getCodePhoneFirebase = async (code: string, phone: string) => {
    const fechaActual = obtenerFechaActual();
    setLoading(true);

    try {
      const phoneCodeQuery = query(
        collection(db, "phoneCode"),
        where("code", "==", code),
        where("phone", "==", phone),
        where("fecha", "==", fechaActual)
      );
      const querySnapshot = await getDocs(phoneCodeQuery);
      let selectedCode: any;

      querySnapshot.forEach((doc) => {
        selectedCode = doc.data();
      });

      if (selectedCode) {
        console.log("Código correcto, iniciando sesión...");
        await saveCredentials("phoneToken", phone);
        await saveCredentials("authToken", "true");

        if (isNew) {
          const user = useSelector((state: any) => state.user.data);
          console.log("Guardando nuevo usuario en Firebase:", user);
          await addDoc(collection(db, "users"), user); // Guardar nuevo usuario
        }

        dispatch(setAuthorizationInfo({ logged: true, phone: phone }));
        setShowModal(false);
        setIsNew(false); // Resetear estado de nuevo usuario
      } else {
        console.log("Código incorrecto.");
        Alert.alert("Código incorrecto.");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error al verificar el código:", error);
      setShowModal(false);
      setLoading(false);
    }
  };

  return {
    loginWithPhone,
    savePhone,
    sendSmsPhoneFirebase,
    getCodePhoneFirebase,
    loading,
    showModal,
  };
};
