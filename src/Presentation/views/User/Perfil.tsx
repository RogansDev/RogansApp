import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from "../../../Presentation/theme/Icons";
import { db } from "../../../firebase";
import useImagePicker from "../../../hooks/useImagePicker";
import useRegisterFirebase from "../../../hooks/useRegisterFirebase";
import { deleteCredentials } from "../../../services/credentials";
import { setClearAuthorizationInfo } from "../../../state/AuthorizationSlice";
import { setClearCalendaryInfo } from "../../../state/CalendarySlice";
import { setClearUserInfo, setUserInfo } from "../../../state/ProfileSlice";
import { RootParamList } from "../../../utils/RootParamList";
import PopUpCerrarSesion from "../../components/PopUpCerrarSesion";

const Perfil = () => {
  const dispatch = useDispatch();
  const {
    Forget,
    UserIcon,
    Camara,
    CloseIcon,
    GalleryAdd,
    TrashIcon,
    TickCircleWhiteicon,
    Editar2Icon,
  } = Icons;
  const { name, lastname, document, email, phone, user_id, birthdate, role } =
    useSelector((state: any) => state.user);
  const {
    handleUpdateUserInfo,
    handleDeleteAccount,
    loading: firebaseLoading,
  } = useRegisterFirebase();
  const [loading, setLoading] = useState(false);
  const [modalEliminarCuenta, setModalEliminarCuenta] = useState(false);
  const [modalCerrarSesion, setModalCerrarSesion] = useState(false);
  const { image, base64Image, pickImage, convertImageToFirebaseUrl } =
    useImagePicker();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const PopUpCerrarSesionRef = useRef(null);

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newLastname, setNewLastname] = useState(lastname);
  const [newDocument, setNewDocument] = useState(document);
  const [newEmail, setNewEmail] = useState(email);

  const handleSessionClose = async () => {
    try {
      await deleteCredentials("phoneToken");
      await deleteCredentials("authToken");
      await deleteCredentials("googleToken");
      await GoogleSignin.signOut();
      dispatch(setClearUserInfo(""));
      dispatch(setClearCalendaryInfo(""));
      dispatch(setClearAuthorizationInfo(false));
    } catch (error) {
      console.log("error......", error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await deleteCredentials("phoneToken");
      await deleteCredentials("auToken");
      await deleteCredentials("googleToken");
      await GoogleSignin.signOut();
      dispatch(setClearUserInfo(""));
      dispatch(setClearCalendaryInfo(""));
      const userQuery = query(
        collection(db, "users"),
        where("user_id", "==", user_id)
      );
      const querySnapshot = await getDocs(userQuery);
      const firstDoc = querySnapshot.docs[0];
      handleDeleteAccount(firstDoc.id);
    } catch (error) {
      console.log("error:::::::", error);
    }
  };

  const handlePhoto = async () => {
    setLoading(true);
    try {
      const userQuery = query(
        collection(db, "users"),
        where("user_id", "==", user_id)
      );
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const usersDocument = doc(db, "users", firstDoc.id);
        const token = (await Notifications.getDevicePushTokenAsync()).data;
        try {
          const imageUrl = await convertImageToFirebaseUrl(image);
          const user = {
            user_id,
            email,
            role,
            urlphoto: imageUrl,
            document,
            name,
            lastname,
            phone,
            birthdate,
            token,
          };
          await updateDoc(usersDocument, user);
          dispatch(setUserInfo(user));
          setLoading(false);
          Alert.alert("Imagen guardada!");
        } catch (error) {
          console.error(error);
          setLoading(false);
          Alert.alert("No se pudo guardar imagen");
        }
      } else {
        setLoading(false);
        Alert.alert("No se encontró el usuario con el user_id especificado");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("No se pudo realizar la consulta");
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "488356227805-7ta65ngc1negegfpuev60gu9o9d4pp84.apps.googleusercontent.com",
      androidClientId:
        "488356227805-bgsi99ubhrnfqs5bst425h4d39clourr.apps.googleusercontent.com",
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const token = (await Notifications.getDevicePushTokenAsync()).data;
    if (newName && newLastname && newDocument && newEmail) {
      try {
        await handleUpdateUserInfo(
          phone,
          newName,
          newLastname,
          newDocument,
          newEmail,
          token
        );

        dispatch(
          setUserInfo({
            name: newName,
            lastname: newLastname,
            document: newDocument,
            email: newEmail,
            token: token,
            phone,
            user_id,
          })
        );

        setLoading(false);
        setEditModalVisible(false);
      } catch (error) {
        console.error("Error al actualizar la información:", error);
        Alert.alert("No se pudo guardar la información.");
      }
    } else {
      Alert.alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setModalVisible(false)}
            activeOpacity={1}
          />
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ position: "absolute", top: 15, left: 15, zIndex: 2 }}
            >
              <CloseIcon width={16} height={16} />
            </TouchableOpacity>
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            ) : base64Image ? (
              <Image
                source={{ uri: base64Image }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            ) : (
              <UserIcon style={{ marginTop: 40 }} width={250} height={250} />
            )}
            <View style={{ flexDirection: "row", gap: 18 }}>
              <TouchableOpacity onPress={pickImage} style={styles.editImage}>
                <GalleryAdd width={24} height={24} />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={takePhoto} style={styles.editImage}>
                                <Camara width={24} height={24} />
                            </TouchableOpacity> */}
            </View>
            <View>
              {image && (
                <View
                  style={{
                    width: 120,
                    borderRadius: 14,
                    padding: 14,
                    backgroundColor: "#000000",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handlePhoto();
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontFamily: MyFont.regular,
                        fontSize: 13,
                      }}
                    >
                      {loading ? "Cargando.." : "Guardar"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para eliminarl cuenta */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEliminarCuenta}
        onRequestClose={() => setModalEliminarCuenta(false)}
      >
        <TouchableOpacity
          style={styles.modalFade}
          onPress={() => setModalEliminarCuenta(false)}
          activeOpacity={1} // Esto asegura que el área transparente también responda al toque
        >
          <View style={styles.modalContainer2}>
            <View style={styles.modalContent}>
              <View>
                <TouchableOpacity
                  style={styles.cerrarBtn}
                  onPress={() => setModalEliminarCuenta(false)}
                >
                  <CloseIcon width={16} height={16} />
                  <Text style={styles.textModal}>Cerrar</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 40, marginBottom: 20 }}>
                <Text style={[styles.titleModal, { textAlign: "center" }]}>
                  ¿Estas seguro que quieres eliminar tu cuenta?
                </Text>
                <Text
                  style={[
                    styles.textModal,
                    { textAlign: "center", marginTop: 10 },
                  ]}
                >
                  Ten presente que esta es una acción irreversible que implica
                  la eliminación de todos tus datos, como registro de citas,
                  información de contacto, etc.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.conservarBtn}
                >
                  <Text style={[styles.textModal, { color: "white" }]}>
                    No, conservar
                  </Text>
                  <TickCircleWhiteicon width={16} height={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.siCancelarBtn}
                  onPress={handleDeleteUser}
                >
                  <Text style={styles.textModal}>Si, elimininar cuenta</Text>
                  <TrashIcon width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal para cerrar sesion */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalCerrarSesion}
        onRequestClose={() => setModalCerrarSesion(false)}
      >
        <TouchableOpacity
          style={styles.modalFade}
          onPress={() => setModalCerrarSesion(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContainer2}>
            <View style={styles.modalContent}>
              <View>
                <TouchableOpacity
                  style={styles.cerrarBtn}
                  onPress={() => setModalCerrarSesion(false)}
                >
                  <CloseIcon width={16} height={16} />
                  <Text style={styles.textModal}>Cerrar</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 40, marginBottom: 20 }}>
                <Text style={[styles.titleModal, { textAlign: "center" }]}>
                  ¿Estas seguro que quieres cerrar sesión?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.conservarBtn}
                >
                  <Text style={[styles.textModal, { color: "white" }]}>
                    No cerrar sesión
                  </Text>
                  <TickCircleWhiteicon width={16} height={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.siCancelarBtn}
                  onPress={handleSessionClose}
                >
                  <Text style={styles.textModal}>Si, cerrar sesión</Text>
                  <CloseIcon width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
          <View style={styles.modalContainer3}>
            <View style={styles.modalContent3}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>

              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={newName}
                onChangeText={setNewName}
              />
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={newLastname}
                onChangeText={setNewLastname}
              />
              <TextInput
                style={styles.input}
                placeholder="Documento"
                value={newDocument}
                onChangeText={setNewDocument}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo"
                value={newEmail}
                onChangeText={setNewEmail}
                autoCapitalize="none"
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>
                    {loading ? "Guardando..." : "Guardar"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setEditModalVisible(false)}
                  style={{ marginTop: 10 }}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>Mis Datos</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <TouchableOpacity
              style={{
                overflow: "hidden",
                width: 150,
                height: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setModalVisible(true)}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.userImage} />
              ) : base64Image ? (
                <Image source={{ uri: base64Image }} style={styles.userImage} />
              ) : (
                <UserIcon width={150} height={150} />
              )}
              <View style={styles.camaraIcon}>
                <Camara width={24} height={24} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.info}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 3,
                }}
              >
                <Text style={styles.subtitleInfo}>Nombre</Text>
                <Text style={styles.titleInfo}>
                  {name === "" ? "Sin especificar" : name + " " + lastname}
                </Text>
              </View>
            </View>
            <View style={styles.info}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 3,
                }}
              >
                <Text style={styles.subtitleInfo}>Documento de identidad</Text>
                <Text style={styles.titleInfo}>
                  {document === "" ? "Sin espefificar" : document}
                </Text>
              </View>
            </View>
            <View style={styles.info}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 3,
                }}
              >
                <Text style={styles.subtitleInfo}>Teléfono</Text>
                <Text style={styles.titleInfo}>{phone}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 3,
                }}
              >
                <Text style={styles.subtitleInfo}>Correo</Text>
                <Text style={styles.titleInfo}>
                  {email === "" ? "Sin especificar" : email}
                </Text>
              </View>
            </View>

            <View style={{ gap: 15, marginTop: 10, }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", gap: 5 }}
                  onPress={() => setEditModalVisible(true)}
                >
                  <Editar2Icon width={16} height={16} />
                  <Text>Editar datos</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", gap: 5 }}
                  onPress={() => navigation.navigate("PassUpdatekeyDash")}
                >
                  <Forget width={16} height={16} />
                  <Text>Cambiar mi contraseña</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalCerrarSesion(true);
                  }}
                  style={{ flexDirection: "row", gap: 5 }}
                >
                  <CloseIcon width={16} height={16} />
                  <Text>Cerrar sesión</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalEliminarCuenta(true);
                  }}
                  style={{ flexDirection: "row", gap: 5 }}
                >
                  <TrashIcon width={16} height={16} />
                  <Text>
                    {firebaseLoading ? "Cargando...." : "Eliminar cuenta"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <PopUpCerrarSesion ref={PopUpCerrarSesionRef} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    position: "relative",
  },
  scrollContainer: {
    position: "relative",
    top: Platform.OS === "android" ? 40 : 10,
  },
  title: {
    fontSize: 24,
    fontFamily: MyFont.bold,
    color: "black",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  twoCols: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  userImage: {
    width: 140,
    height: 140,
    borderRadius: 75,
  },
  title2: {
    fontSize: 18,
    fontFamily: MyFont.medium,
    color: "black",
    marginBottom: 4,
  },
  imageConsultationType: {
    marginRight: 10,
  },
  consultationType: {
    fontSize: 14,
    fontFamily: MyFont.medium,
    color: "#404040",
  },
  textContainer: {
    position: "relative",
    marginTop: 0,
    marginBottom: 40,
    width: "100%",
    height: "auto",
    paddingHorizontal: 16,
    zIndex: 5,
  },
  info: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconInfo: {
    marginRight: 8,
  },
  subtitleInfo: {
    fontSize: 12,
    fontFamily: MyFont.regular,
    color: "#909090",
  },
  titleInfo: {
    fontSize: 16,
    fontFamily: MyFont.medium,
    color: "black",
  },
  textInfo: {
    fontSize: 12,
    fontFamily: MyFont.regular,
    color: "#404040",
  },
  camaraIcon: {
    position: "absolute",
    backgroundColor: "white",
    right: 5,
    bottom: 5,
    padding: 12,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    position: "relative",
    width: "100%",
    height: "auto",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    overflow: "hidden",
  },
  modalImage: {
    width: "80%",
    height: 300,
    resizeMode: "contain",
    marginTop: 40,
  },
  editImage: {
    marginVertical: 25,
    padding: 12,
    borderWidth: 1,
    borderColor: "#909090",
    borderRadius: 16,
  },
  // Estilos Modal eliminar cuenta
  modalFade: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    maxWidth: 360,
    padding: 16,
    borderRadius: 16,
  },
  modalContent3: {
    backgroundColor: "white",
    width: "80%",
    maxWidth: 360,
    padding: 16,
    borderRadius: 16,
  },
  cerrarBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleModal: {
    fontSize: 24,
    fontFamily: MyFont.bold,
  },
  textModal: {
    fontSize: 13,
    fontFamily: MyFont.regular,
  },
  siCancelarBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  conservarBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "black",
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 16,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: MyFont.regular,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: MyFont.bold,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: MyFont.regular,
  },
  saveButton: {
    backgroundColor: MyColors.verde[2],
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: MyFont.regular,
  },
  cancelButtonText: {
    color: MyColors.neutro[1],
    fontFamily: MyFont.regular,
  },
});

export default Perfil;
