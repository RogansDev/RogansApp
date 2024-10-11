import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useCellPhone } from "../../../hooks/useCellPhone";
import Icons from "../../theme/Icons";

const VerifyCodeComponent = () => {
  const { getCodePhoneFirebase, loading } = useCellPhone();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { phone } = useSelector((state: any) => state.user);
  const { LogoBlack } = Icons;

  // Crear referencias para cada TextInput
  const inputRefs = useRef([]);

  const handleChange = (text: string, index: number) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Hacer foco en el siguiente campo si hay un dígito ingresado
    if (text && index < code.length - 1) {
      //@ts-ignore
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    console.log("Código ingresado: ", fullCode);
    getCodePhoneFirebase(fullCode, phone);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoBlack width={140} height={100} />
      </View>
      <Text style={styles.title}>Ingrese su código de verificación</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            // @ts-ignore
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>
          {loading ? "Cargando..." : "Verificar codigo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    width: 40,
    height: 50,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "black",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "10%",
  },
});

export default VerifyCodeComponent;
