import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Alert } from "react-native";
import { SendEmailResetPassword, db } from "../firebase/index";
import { sendEmailCode } from "./useEmail";

const useFirebaseCode = () => {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveCode = async (mail: any, nombre: any) => {
    setLoading(true);
    try {
      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", mail)
      );
      const querySnapshot = await getDocs(emailQuery);
      let selectedEmail: any;
      querySnapshot.forEach((doc) => {
        selectedEmail = doc.data();
      });

      if (selectedEmail) {
        var codigo = Math.floor(Math.random() * 900000) + 100000;
        try {
          const dataToCreate = {
            codigo: codigo,
          };
          addDoc(collection(db, "emailcodes"), dataToCreate)
            .then(() => {
              sendEmailCode(mail, codigo, selectedEmail.name);
              setLoading(false);
              Alert.alert(
                `${selectedEmail.name.toUpperCase()} se envio un código a ${mail}`
              );
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
              setError(error.message);
              Alert.alert("Ocurrio un error!");
            });
        } catch (error: any) {
          setLoading(false);
          console.log(error);
          setError(error.message);
          Alert.alert("Ocurrio un error!");
        }
      } else {
        setLoading(false);
        console.log("email no existe .", selectedEmail);
        Alert.alert("email no existe!");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setError(error.message);
      Alert.alert("Email no existe!");
    }
  };
  const handleReadCode = async (codigo: any, mail: any) => {
    setLoading(true);

    const numericCode = parseInt(codigo);
    try {
      const codeQuery = query(
        collection(db, "emailcodes"),
        where("codigo", "==", numericCode)
      );
      const querySnapshot = await getDocs(codeQuery);
      let selectedCode: any;
      querySnapshot.forEach((doc) => {
        selectedCode = doc.data();
      });
      console.log("selected data", selectedCode);

      if (selectedCode) {
        SendEmailResetPassword(mail);
        const alertMessage = `Se envió un link a ${mail}`;
        Alert.alert(alertMessage);
        //@ts-ignore
        navigation.navigate("Login");
        setLoading(false);
      } else {
        setLoading(false);
        console.log("codigo no existe .", selectedCode);
        Alert.alert("codigo no existe!");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      console.log("err", error);
      console.log("err aqui", error.message);
      Alert.alert("Ocurrio un error!");
    }
  };

  return { handleReadCode, handleSaveCode, error, setError, loading };
};

export default useFirebaseCode;
