// Importaciones necesarias
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import * as Notifications from "expo-notifications";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FloatingMenu from "../../../Presentation/components/FloatingMenu";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from "../../../Presentation/theme/Icons";
import useApiService from "../../../hooks/useApiService";
import usePopUp from "../../../hooks/usePopUp";
import usePromotions from "../../../hooks/usePromotions";
import useServices from "../../../hooks/useServices";
import useTokenPush from "../../../hooks/useTokenPush";
import { setCalendaryInfo } from "../../../state/CalendarySlice";
import { setMedicalLineInfo } from "../../../state/MedicalLineSlice";
import { RootParamList } from "../../../utils/RootParamList";
import CitaBoxShort from "../../components/Citas/CitaBoxShort";
import HomeBannesrs from "../../components/HomeBanners";
import ServicioCard from "../../components/Servicios/ServicioCard";
import ServicioCardTwo from "../../components/Servicios/ServicioCardTwo";
import ButtonOne from "../../components/buttons/ButtonOne";
import { consultCards } from "../Servicios/ServicesData";

// Definición del tipo de navegación
type HomeScreenNavigationProp = StackNavigationProp<RootParamList, "Home">;

const Home = () => {
  const { UserTwo, Arrow, CloseIcon, CalendarioNumeroVerde, Logo } = Icons;
  const { handleStatusCode } = usePromotions();
  const { getServices } = useServices();
  const { getPopups, popups } = usePopUp();
  const { handleGestionToken } = useTokenPush();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { name, phone, user_id } = useSelector((state: any) => state.user);
  const [chatVisible, setChatVisible] = useState(false);
  const [modalPopUp, setModalPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo]: any = useState({});
  const viewportWidth = Dimensions.get("window").width;
  const IMAGE_WIDTH = viewportWidth * 0.8;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 0.9;
  const dispatch = useDispatch();
  const calendaryState = useSelector((state: any) => state.calendary);
  const MedicalLineState = useSelector((state: any) => state.medicalLine);
  const [proximaCita, setProximaCita]: any = useState(null);
  const { sendNotificationPush } = useApiService();

  useEffect(() => {
    handleStatusCode(user_id);
    getServices();
    getPopups();
    handleGestionToken();
  }, []);

  useEffect(() => {
    if (popups) {
      setPopUpInfo(popups[0]);
    }
  }, [popups]);

  useEffect(() => {
    if (popUpInfo && popUpInfo.acttivo === true) {
      setModalPopUp(true);
    }
  }, [popUpInfo]);

  const handleSelectCard = async (card: any, link: any) => {
    dispatch(
      setCalendaryInfo({
        ...calendaryState,
        selectedCard: card,
      })
    );
    navigation.navigate(link);
  };

  const handleMedicalLine = async (linea: string) => {
    dispatch(
      setMedicalLineInfo({
        ...MedicalLineState,
        lineaMedica: linea,
      })
    );
    navigation.navigate("Agendamiento");
  };

  // Función para manejar el diagnóstico y navegar al WebView con la URL correspondiente
  const handleDiagnostico = (tipo: string) => {
    let url = "";

    if (tipo === "Capilar") {
      url = `https://rogansya.com/diagnostico-alopecia?environment=app&phone=${phone}`;
    } else if (tipo === "Facial") {
      url = `https://rogansya.com/diagnostico-rejuvenecimiento-facial?environment=app&phone=${phone}`;
    } else if (tipo === "Corporal") {
      url = `https://rogansya.com/diagnostico-corporal?environment=app&phone=${phone}`;
    } else if (tipo === "Sexual") {
      url = `https://rogansya.com/diagnostico-rendimiento-sexual?environment=app&phone=${phone}`;
    } else if (tipo === "Psicologia") {
      url = `https://rogansya.com/diagnostico-psicologia-en-linea?environment=app&phone=${phone}`;
    }

    console.log("handleDiagnostico llamado con tipo:", tipo);
    console.log("Navegando a Diagnostico con url:", url);

    navigation.navigate("Diagnostico", { url });
  };

  const obtenerCitas = async (telefono: any) => {
    try {
      const encodedTelefono = encodeURIComponent(telefono);
      const response = await axios.get(
        `https://rogansya.com/rogans-app/citas/index.php/citas/telefono/${encodedTelefono}/mas-cercana`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener citas:", error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.log("Datos del error:", error.response.data);
        console.log("Estado del error:", error.response.status);
        console.log("Encabezados del error:", error.response.headers);
        Alert.alert(
          "Error",
          `Error del servidor: ${
            error.response.data.error || "Error desconocido"
          }`
        );
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.log("Solicitud del error:", error.request);
        Alert.alert("Error", "No se recibió respuesta del servidor.");
      } else {
        // Algo ocurrió al configurar la solicitud
        console.log("Mensaje de error:", error.message);
        Alert.alert(
          "Error",
          `Error al configurar la solicitud: ${error.message}`
        );
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerCitas(phone).then((data) => {
        if (data.message) {
          setProximaCita(null);
        } else {
          setProximaCita(data);
        }
      });
    }, [])
  );

  const formatearFecha = (fechaIsoString: string) => {
    if (!fechaIsoString) return "";

    const [year, month, day] = fechaIsoString
      .slice(0, 10)
      .split("-")
      .map(Number);
    const [hour, minute] = fechaIsoString.slice(11, 16).split(":").map(Number);

    const fecha = new Date(Date.UTC(year, month - 1, day, hour, minute));

    const opcionesFecha = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    } as const;
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesFecha);

    const horas12 = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour >= 12 ? "PM" : "AM";

    return `${horas12}:${minute
      .toString()
      .padStart(2, "0")} ${ampm} | ${fechaFormateada}`;
  };

  const nombreLinea = (linea: any) => {
    let nombreCompleto;

    if (linea === "Capilar") {
      nombreCompleto = "Cuidado del cabello";
    } else if (linea === "Facial") {
      nombreCompleto = "Cuidado de la piel";
    } else if (linea === "Sexual") {
      nombreCompleto = "Salud sexual";
    } else if (linea === "Psicología") {
      nombreCompleto = "Psicología";
    } else if (linea === "Nutricion" || linea === "Corporal") {
      nombreCompleto = "Nutrición";
    } else if (linea === "Adn") {
      nombreCompleto = "Medicina predictiva | ADN";
    } else {
      nombreCompleto = linea;
    }

    return nombreCompleto;
  };

  const handlePush = async () => {
    const token2 = (await Notifications.getDevicePushTokenAsync()).data;
    console.log("token2", token2);
    try {
      sendNotificationPush(token2, "Titulo test", "Test body"); // este es el hook creado para enviar notificaciones push
    } catch (error) {
      console.log(error);
    }
  };

  const agendarWA = () => {
    const url = "https://wa.link/295lc3";
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPopUp}
        onRequestClose={() => setModalPopUp(false)}
      >
        <TouchableOpacity
          style={styles.modalFade}
          onPress={() => setModalPopUp(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContainer2}>
            <View
              style={[
                styles.modalContent,
                { width: IMAGE_WIDTH, height: IMAGE_HEIGHT },
              ]}
            >
              <TouchableOpacity
                style={styles.cerrarBtn}
                onPress={() => setModalPopUp(false)}
              >
                <CloseIcon width={16} height={16} />
                <Text style={styles.textModal}>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const linkParts = popUpInfo.description.split("?");
                  if (linkParts[0] === "nav") {
                    navigation.navigate(linkParts[1]);
                  } else if (linkParts[0] === "service") {
                    const cardIndex = parseInt(
                      linkParts[1]
                        .replace("consultCards[", "")
                        .replace("]", ""),
                      10
                    );
                    const selectedCard = consultCards[cardIndex];
                    const screenName = linkParts[2];

                    if (selectedCard && screenName) {
                      handleSelectCard(selectedCard, screenName);
                    } else {
                      console.error(
                        "Invalid link format or undefined card/screen"
                      );
                    }
                  } else if (linkParts[0] === "web") {
                    const url = linkParts[1];
                    Linking.openURL(url).catch((err) =>
                      console.error("An error occurred", err)
                    );
                  } else {
                    console.error("Unrecognized link format");
                  }
                  setModalPopUp(false);
                }}
              >
                {popUpInfo && (
                  <Image
                    source={{ uri: popUpInfo.url_imagen }}
                    style={{ width: "100%", height: "100%", zIndex: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            {name !== "" ? (
              <>
                <Text style={styles.title}>Hola,</Text>
                <Text style={styles.title2}>{name}</Text>
              </>
            ) : (
              <Text style={styles.title3}>Bienvenido a Rogans</Text>
            )}
          </View>
          <TouchableOpacity
            style={{ overflow: "hidden" }}
            onPress={() => navigation.navigate("Perfil")}
          >
            <UserTwo width={20} height={20} />
          </TouchableOpacity>
        </View>

        <HomeBannesrs setChatVisible={setChatVisible} />

        {proximaCita !== null && (
          <View style={{ gap: 10, marginTop: 40 }}>
            <Text
              style={{
                fontFamily: MyFont.regular,
                fontSize: MyFont.size[5],
                color: MyColors.neutro[4],
                paddingHorizontal: 16,
              }}
            >
              Tu próxima cita
            </Text>
            <CitaBoxShort
              tituloCita={nombreLinea(proximaCita.linea_medica)}
              modalidad={proximaCita.modalidad}
              fecha={formatearFecha(proximaCita.fecha_cita)}
              estadoCita={proximaCita.estado}
              sidesMargin={16}
              lineaMedica={proximaCita.linea_medica}
            />
          </View>
        )}

        <View style={{ gap: 10, marginTop: 40 }}>
          <Text
            style={{
              fontFamily: MyFont.regular,
              fontSize: MyFont.size[5],
              color: MyColors.neutro[4],
              paddingHorizontal: 16,
            }}
          >
            Tu salud, nuestra prioridad
          </Text>
        </View>

        {/* Sección de Servicios que llevan al Agendamiento 
        <View style={{ paddingHorizontal: 16, marginTop: 20, }}>
          <ServicioCard pressAction={() => { handleMedicalLine('Capilar') }} title='Adiós calvicie' text='Recupera tu cabello' imageUrl='diagnosis-alopecia' />
          <ServicioCardTwo pressAction={() => { handleMedicalLine('Facial') }} title='Renueva tu' titleColored='rostro' titleColor='#AD50E8' text='Tratamientos de rejuvenecimiento.' imageUrl='diagnosis-facial' />
          <ServicioCardTwo pressAction={() => { handleMedicalLine('Corporal') }} title='Cuida tu' titleColored='cuerpo' titleColor='#eda145' text='Bienestar de nutrición' imageUrl='diagnosis-nutricion' />
          <ServicioCardTwo pressAction={() => { handleMedicalLine('Sexual') }} title='Ten buen' titleColored='sexo' titleColor='#FF8290' text='Mejora tu vida íntima.' imageUrl='diagnosis-sexual' />
          <ServicioCardTwo pressAction={() => { handleMedicalLine('Psicologia') }} title='Encuentra' titleColored='calma' titleColor='#518BFF' text='El bienestar comienza en tu mente.' imageUrl='diagnosis-psicologia' />
          <ServicioCardTwo pressAction={() => { handleMedicalLine('Adn') }} title='Predice con' titleColored='ADN' titleColor='#5e5f61' text='Predicción avanzada y precisa.' imageUrl='diagnosis-adn' />
        </View>
        */}

        {/* Sección de Diagnósticos que abren el WebView */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <ServicioCard
            pressAgendar={() => {
              handleMedicalLine('Capilar');
            }}
            pressAutodiagnostico={() => {
              handleDiagnostico("Capilar");
            }}
            title="Adiós calvicie"
            text="Recupera tu cabello"
            imageUrl="diagnosis-alopecia"
            autodiagnostico={true}
          />
          <ServicioCardTwo
            pressAgendar={() => {
              handleMedicalLine('Facial');
            }}
            pressAutodiagnostico={() => {
              handleDiagnostico("Facial");
            }}
            title="Renueva tu"
            titleColored="rostro"
            titleColor="#AD50E8"
            text="Tratamientos de rejuvenecimiento."
            imageUrl="diagnosis-facial"
            autodiagnostico={true}
          />
          <ServicioCardTwo
            pressAgendar={() => {
              handleMedicalLine('Sexual');
            }}
            pressAutodiagnostico={() => {
              handleDiagnostico("Sexual");
            }}
            title="Ten buen"
            titleColored="sexo"
            titleColor="#FF8290"
            text="Mejora tu vida íntima."
            imageUrl="diagnosis-sexual"
            autodiagnostico={true}
          />
          <ServicioCardTwo
            pressAgendar={() => {
              handleMedicalLine('Psicologia');
            }}
            pressAutodiagnostico={() => {
              handleDiagnostico("Psicologia");
            }}
            title="Encuentra"
            titleColored="calma"
            titleColor="#518BFF"
            text="El bienestar comienza en tu mente."
            imageUrl="diagnosis-psicologia"
            autodiagnostico={true}
          />
          <ServicioCardTwo pressAgendar={() => { handleMedicalLine('Nutricion') }} title='Medicina' titleColored='nutricional' titleColor='#eda145' text='Bienestar para tu cuerpo' imageUrl='diagnosis-nutricion' />
          <ServicioCardTwo pressAgendar={() => { handleMedicalLine('Adn') }} title='Predice con' titleColored='ADN' titleColor='#5e5f61' text='Predicción avanzada y precisa' imageUrl='diagnosis-adn' />
          <ServicioCardTwo pressAgendar={() => { agendarWA() }} title='Endocrinología' titleColored='' titleColor='#00B398' text='Equilibrio hormonal para tu bienestar' imageUrl='diagnosis-endocrinologia' />
        </View>

        <View style={styles.agendamientoBox}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <Image
              source={require("../../../../assets/doctora.jpg")}
              style={styles.agendamientoBoxImage}
            />
            <View>
              <Text
                style={{
                  fontFamily: MyFont.medium,
                  fontSize: 26,
                  color: MyColors.white,
                }}
              >
                Rogans te cuida
              </Text>
              <Text
                style={{
                  fontFamily: MyFont.regular,
                  fontSize: 14,
                  color: MyColors.white,
                  lineHeight: 19,
                }}
              >
                Agenda una cita con nosotros
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <ButtonOne
              text="Agendar ahora"
              icon={CalendarioNumeroVerde}
              pressAction={() => {
                handleMedicalLine("");
              }}
            />
          </View>
        </View>

        <View
          style={{ marginTop: 40, marginBottom: 150, alignItems: "center" }}
        >
          <Logo style={{ marginBottom: 10 }} width={120} height={40} />
          <TouchableOpacity
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://rogansya.com/rogans-app/legal/"
              )
            }
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <Text style={{ fontFamily: MyFont.medium, fontSize: 16, color: MyColors.neutro[3] }}>
              Términos y condiciones
            </Text>
            <Arrow width={16} height={16} />
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 10 : 30,
    marginVertical: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontFamily: MyFont.regular,
  },
  title2: {
    fontSize: 36,
    fontFamily: MyFont.bold,
    lineHeight: 44,
  },
  title3: {
    fontSize: 25,
    fontFamily: MyFont.bold,
  },
  containerNavBtn: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 30,
    gap: 18,
  },
  navBtn: {},
  textNavBtn: {
    fontSize: 12,
    fontFamily: MyFont.regular,
    color: "#444444",
  },
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  titleSection: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: MyFont.medium,
    color: MyColors.secondary,
  },
  imageTiny: {
    width: 60,
    height: 60,
  },
  roundedImage: {
    borderRadius: 30,
  },
  modalFade: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },
  cerrarBtn: {
    position: "absolute",
    top: 13,
    left: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 20,
    backgroundColor: "rgba(265, 265, 265, 0.5)",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 14,
    overflow: "hidden",
  },
  textModal: {
    fontSize: 13,
    fontFamily: MyFont.regular,
  },
  agendamientoBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: MyColors.verde[5],
    borderRadius: 18,
    paddingTop: 28,
    paddingBottom: 32,
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 15,
    shadowColor: MyColors.neutro[2],
    shadowOffset: { width: 20, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 15,
    gap: 8,
  },
  agendamientoBoxImage: {
    width: 63,
    height: 63,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default Home;
