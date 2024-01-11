import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import { MyColors, MyFont } from "../theme/AppTheme";
import CodeUpdateKeys from "./CodeUpdateKeys";
import Icons from "../theme/Icons";
import useFirebaseCode from "../../hooks/useFirebaseCode";
import { useDispatch } from "react-redux";
import { setCodeInfo } from "../../state/CodeSlice";


const ModalVerifitCode = () => {

  const dispatch = useDispatch();

  const { handleSaveCode, loading } = useFirebaseCode();

  const { Email } = Icons;
  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef<TextInput>(null));

  const [modalVisible, setModalVisible] = useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [reenviarCodePressed, setReenviarCodePressed] = useState(false);
  const [coder, setCoder] = useState("");
  const [mail, setMail] = useState("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    // Configurar un temporizador para mostrar el modal después de 3 segundos
    const autoShowTimer = setTimeout(() => {
      setModalVisible(true);
    }, 1000);

    // Limpiar el temporizador automático al desmontar el componente
    return () => clearTimeout(autoShowTimer);
  }, []);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (modalVisible) {
      intervalId = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          setReenviarCodePressed(true);
          setTimeExpired(true);
        } else {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 2);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    } else {
      // Limpia el intervalo cuando el modal se cierra
      clearInterval(intervalId);
      // Restaura los valores iniciales cuando el modal se cierra
      setMinutes(2);
      setSeconds(0);
    }
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [modalVisible, minutes, seconds]);

  const handleInputChange = (index: number, text: string) => {

    console.log(`${index} - ${text}`);

    setCoder(coder + text);

    if (coder.length == 5 && index == 5) {
      console.log('mi codigo es ', coder + text);

      const data = {
        code: coder + text,
        email: mail
      }

      dispatch(setCodeInfo(data));
    } else {
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.length) {
        const nextInputRef = inputRefs[nextIndex];
        if (nextInputRef && nextInputRef.current) {
          nextInputRef.current.focus();
        }
      }
    }

  };



  const handleResendCode = () => { // solicito el codigo

    setReenviarCodePressed(false);
    setMinutes(2);
    setSeconds(0);
    setTimeExpired(false);
    handleSaveCode(mail);

  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalItems}>
            {reenviarCodePressed && (
              <>
                <View style={styles.expiredContent}>
                  <Text style={styles.expiredText}>¡Tiempo expirado!</Text>
                  <Text style={styles.expiredText}>
                    Puedes reenviar el código.
                  </Text>
                </View>
                <View style={styles.textContent}>
                  <Text>Ingresa el código de 6 dígitos que enviamos </Text>
                  <Text>a tu correo</Text>
                </View>
                <View style={styles.timerCode}>
                  <Text>Reenviar código en</Text>
                  <Text>{`${minutes}:${seconds < 10 ? "0" : ""
                    }${seconds}`}</Text>
                </View>
                <View style={styles.writeCodeContent}>
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <TextInput
                        key={index}
                        ref={inputRefs[index] as React.RefObject<TextInput>}
                        style={styles.writeCode}
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange(index, text)}
                        maxLength={1}
                      />
                    ))}
                </View>
                {/* para enviar codigo al correo */}
                <View style={styles.optionsRed}>
                  <TouchableOpacity
                    style={styles.itemsCode}
                    onPress={handleResendCode}
                  >
                    <Email />
                    <Text
                      style={[
                        styles.resendCodeButton,
                        reenviarCodePressed && styles.redText,
                      ]}
                    >
                      Verificar código
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 100 }}></View>
              </>
            )}
            {!reenviarCodePressed && (
              <>
                <View style={{ marginTop: 10 }}>
                  <View style={styles.inputContent}>
                    <Text style={styles.textTitleKey}>Correo electronico</Text>
                    <Text style={styles.textRequireCheck}>(Requrido)</Text>
                  </View>
                  <TextInput
                    placeholder="Correo electronico"
                    keyboardType="email-address" // Configura el teclado para correos electrónicos
                    style={styles.textInputKey}
                    value={mail}
                    onChangeText={(text) => setMail(text)} // Actualiza el estado al cambiar el texto
                  />
                </View>
                {/* para enviar codigo al correo */}
                <View style={styles.options}>
                  <TouchableOpacity
                    style={styles.itemsCode}
                    onPress={handleResendCode}
                  >
                    <Email />
                    <Text
                      style={[
                        styles.resendCodeButton,
                        reenviarCodePressed && styles.redText,
                      ]}
                    >
                      {loading ? "Enviando...." : "Solicitar código"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* texto qur indica que son los digitos requeridos */}
                <View style={styles.textContent}>
                  <Text>Ingresa el código de 6 dígitos que enviamos </Text>
                  <Text>a tu número correo</Text>
                </View>
                {/* espacios para el codigo de verificacion */}
                <View style={styles.writeCodeContent}>
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <TextInput
                        key={index}
                        ref={inputRefs[index] as React.RefObject<TextInput>}
                        style={styles.writeCode}
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange(index, text)}
                        maxLength={1}
                      />
                    ))}
                </View>
                {/* texto de reenviar codigo */}
                <View style={styles.timerCode}>
                  <Text>Reenviar código en</Text>
                  <Text>{`${minutes}:${seconds < 10 ? "0" : ""
                    }${seconds}`}</Text>
                </View>
                {/* boton de verficar codigo */}
                <View style={{ marginTop: 100 }}>
                  <CodeUpdateKeys />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalItems: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: 10,
    backgroundColor: MyColors.base,
    width: "90%",
    height: "80%",
    padding: 20,
    borderRadius: 10,
  },
  textContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 60,
  },
  textInfo: {
    fontSize: 14,
  },
  timerCode: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 5,
    top: 87,
  },
  writeCodeContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    gap: 10,
  },
  writeCode: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    top: 80,
    textAlign: "center",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 2,
  },
  optionsRed: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 90,
  },
  itemsCode: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  expiredContent: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
  },
  expiredText: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    color: "red",
    marginBottom: 10,
  },
  resendCodeButton: {
    color: "black",
  },
  redText: {
    color: "red", // Cambia a rojo cuando se presiona el botón de reenviar
  },
  inputContent: {
    flexDirection: "row",
    position: "absolute",
    top: 2,
    left: 18,
    padding: 2,
    backgroundColor: MyColors.base,
    zIndex: 10,
  },
  textTitleKey: {
    fontSize: 11,
    fontFamily: MyFont.regular,
    color: "#404040",
  },
  textRequireCheck: {
    fontSize: 10,
    fontFamily: MyFont.regular,
    color: "#C0C0C0",
  },
  textInputKey: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#404040",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    color: "#000000",
  },
});

export default ModalVerifitCode;

// cierre
{
  /* <TouchableOpacity onPress={toggleModal}>
                      <Text>Close modal</Text>
                   </TouchableOpacity> */
}
