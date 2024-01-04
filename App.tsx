import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
import { fetchFonts, MyColors } from "./src/Presentation/theme/AppTheme";
import CustomHeader from "./src/Presentation/components/CustomHeader";
import CustomHeaderTransparent from "./src/Presentation/components/CustomHeaderTransparent";
import { FIrstScreen } from "./src/Presentation/views/ContainerHome/FIrstScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AppContextProvider } from './AppContext';

import SecondScreen from "./src/Presentation/views/ContainerHome/SecondScreen";
import ThirdScreen from "./src/Presentation/views/ContainerHome/ThirdScreen";
import Home from "./src/Presentation/views/Home/Home";
import Register from './src/Presentation/views/Acceder/Register';
import Loading from "./src/Presentation/views/loading/Loading";
import Acceder from "./src/Presentation/views/Acceder/Acceder";
import Login from "./src/Presentation/views/Acceder/Login";
import ConsultationList from "./src/Presentation/views/Consultas/ConsultationList";
import ProcedureList from "./src/Presentation/views/Procedimientos/ProceduresList";
import ConsultationDescription from "./src/Presentation/views/Consultas/ConsultationDescription";
import ProcedureDescription from "./src/Presentation/views/Procedimientos/ProcedureDescription";
import ConsultationConfirmation from "./src/Presentation/views/Consultas/ConsultationConfirmation";
import ProcedureConfirmation from "./src/Presentation/views/Procedimientos/ProcedureConfirmation";
import ConfirmationPage from "./src/Presentation/views/Consultas/ConfirmationPage";
import DeniedPage from "./src/Presentation/views/Consultas/DeniedPage";
import MiAgenda from "./src/Presentation/views/MiAgenda/MiAgenda";
import EditarCita from "./src/Presentation/views/MiAgenda/EditarCita";
import CancelationConfirmation from "./src/Presentation/views/MiAgenda/CancelationConfirmation";
import Servicios from "./src/Presentation/views/Servicios/Servicios";
import Perfil from "./src/Presentation/views/User/Perfil";
import UpdatePass from "./src/Presentation/views/Acceder/UpdatePass";
import ModalVerifitCode from "./src/Presentation/components/ModalVerifitCode";
import ConfirmationKey from "./src/Presentation/views/Acceder/ConfirmationKey";
import PendingPage from "./src/Presentation/views/Consultas/PendingPage";
import { Provider } from "react-redux";
import { store } from "./src/state/store";

export type RootStackParamsList = {
  FIrstScreen: undefined;
  Martin: undefined;
  Regresar: undefined;
  Acceder: undefined;
  Home: undefined;
  Login: undefined;
  UpdateKey: undefined;
  ModalVerifitCode: undefined;
  ConfirmationKey: undefined;
  Register: undefined;
  ListaDeConsultas: undefined;
  ListaDeProcedimientos: undefined;
  DescripcionConsultas: undefined;
  DescripcionProcedimientos: undefined;
  ConfirmacionConsulta: undefined;
  ConfirmacionProcedimiento: undefined;
  Confirmado: undefined;
  Rechazado: undefined;
  Pendiente: undefined;
  MiAgenda: undefined;
  EditarCita: undefined;
  CitaCancelada: undefined;
  Servicios: undefined;
  Perfil: undefined,
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const App = () => {
  const navigationRef: any = useRef();
  const [deferredNavigation, setDeferredNavigation] = useState(null);
  const [prueba, setPrueba] = useState('');





  useEffect(() => {

    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url && url === 'rogansya://exitoso') {
        setPrueba('Exitoso');
      }
    };

    const handleOpenURL = (event) => {
      const url = event.url;
      if (url === 'rogansya://exitoso') {
        setPrueba('Exitoso');
      }
    };

    // Agregar el event listener
    const urlEventListener = Linking.addEventListener('url', handleOpenURL);

    getInitialURL();

    // Remover el event listener al desmontar el componente
    return () => {
      urlEventListener.remove();
    };
  }, []);


  const [isAppReady, setAppReady] = useState(false);

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    fetchFonts().then(() => setFontLoaded(true));
    setTimeout(() => {
      setAppReady(true);
    }, 2000);
  }, []);

  if (!isAppReady) {
    return null;
  }

  if (!fontLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cargando...</Text>
    </View>;
  }

  return (
    <Provider store={store}>
      {/* <Navigation /> aqui gestiona los screen o vistas*/}

      <AppContextProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            if (deferredNavigation) {
              navigationRef.current?.navigate(deferredNavigation.routeName);
              setDeferredNavigation(null);
            }
          }}
        >
          <StatusBar style="dark" />
          <Stack.Navigator >

            <Stack.Screen
              name="Regresar"
              component={ThirdScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="FIrstScreen"
              component={FIrstScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Martin"
              component={SecondScreen}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                headerLeft: () => (<CustomHeaderTransparent navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerShadowVisible: false,
              })}
            />

            <Stack.Screen
              name="Acceder"
              component={Acceder}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                headerLeft: () => (<CustomHeaderTransparent navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTitle: 'Regresar',
                headerTitleStyle: {
                  color: 'black',
                },
                headerTintColor: MyColors.primary,
              })}
            />
            <Stack.Screen
              name="UpdateKey"
              component={UpdatePass}
              options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: 'Regresar',
                headerTitleStyle: {
                  color: 'black',
                },
                headerTintColor: MyColors.primary,
              }}
            />
            <Stack.Screen
              name="ModalVerifitCode"
              component={ModalVerifitCode}
              options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: 'Regresar',
                headerTitleStyle: {
                  color: 'black'
                },
                headerTintColor: MyColors.primary,
              }}
            />
            <Stack.Screen
              name="ConfirmationKey"
              component={ConfirmationKey}
              options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: 'Regresar',

              }}

            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: true,

                headerTitle: 'Registrarse',
                headerTitleStyle: {
                  color: 'black',
                },
                headerTintColor: MyColors.primary,
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ /*  */
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ListaDeConsultas"
              component={ConsultationList}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="ListaDeProcedimientos"
              component={ProcedureList}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="DescripcionConsultas"
              component={ConsultationDescription}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="DescripcionProcedimientos"
              component={ProcedureDescription}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="ConfirmacionConsulta"
              component={ConsultationConfirmation}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="ConfirmacionProcedimiento"
              component={ProcedureConfirmation}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="Confirmado"
              component={ConfirmationPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Rechazado"
              component={DeniedPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Pendiente"
              component={PendingPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MiAgenda"
              component={MiAgenda}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerStyle: {
                  backgroundColor: '#FCFCFC',
                },
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="EditarCita"
              component={EditarCita}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerStyle: {
                  backgroundColor: '#FCFCFC',
                },
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="CitaCancelada"
              component={CancelationConfirmation}
              options={{ /*  */
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Servicios"
              component={Servicios}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerStyle: {
                  backgroundColor: '#FCFCFC',
                },
                headerShadowVisible: false,
              })}
            />
            <Stack.Screen
              name="Perfil"
              component={Perfil}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerTransparent: false,
                headerTitle: '',
                headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
                headerTintColor: '#00D0B1',
                headerTitleAlign: 'left',
                headerStyle: {
                  backgroundColor: '#FCFCFC',
                },
                headerShadowVisible: false,
              })}
            />
          </Stack.Navigator>

        </NavigationContainer>
      </AppContextProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
