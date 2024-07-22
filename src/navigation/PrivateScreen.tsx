import * as React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Presentation/views/Home/Home";
import CancelationConfirmation from "../Presentation/views/MiAgenda/CancelationConfirmation";
import Servicios from "../Presentation/views/Servicios/Servicios";
import CustomHeader from "../Presentation/components/CustomHeader";
import Perfil from "../Presentation/views/User/Perfil";
import EditarCita from "../Presentation/views/MiAgenda/EditarCita";
import MiAgenda from "../Presentation/views/MiAgenda/MiAgenda";
import PendingPage from "../Presentation/views/Consultas/PendingPage";
import ConfirmationPage from "../Presentation/views/Consultas/ConfirmationPage";
import ProcedureConfirmation from "../Presentation/views/Procedimientos/ProcedureConfirmation";
import ConsultationConfirmation from "../Presentation/views/Consultas/ConsultationConfirmation";
import ProcedureDescription from "../Presentation/views/Procedimientos/ProcedureDescription";
import ConsultationDescription from "../Presentation/views/Consultas/ConsultationDescription";
import ConsultationList from "../Presentation/views/Consultas/ConsultationList";
import DeniedPage from "../Presentation/views/Consultas/DeniedPage";
import ProcedureList from "../Presentation/views/Procedimientos/ProceduresList";
import { RootParamList } from "../utils/RootParamList";
import UpdatePasswordDash from "../Presentation/views/User/UpdatePasswordDash";
import VerifitCodes from "../Presentation/views/Acceder/VerifitCode";
import Pagos from "../Presentation/views/Pasarela/Pagos";
import Tienda from "../Presentation/views/Tienda/Tienda";
import Producto from "../Presentation/views/Tienda/Producto";
import ConfirmarCompra from "../Presentation/views/Tienda/ConfirmarCompra";

const Stack = createNativeStackNavigator<RootParamList>();

function PrivateScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Pagos"
        component={Pagos}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ModalVerifitCode"
        component={VerifitCodes}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="PassUpdatekeyDash"
        component={UpdatePasswordDash}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      {/* aqui agregar las pantallas privadas  */}
      <Stack.Screen
        name="ListaDeConsultas"
        component={ConsultationList}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="ListaDeProcedimientos"
        component={ProcedureList}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="DescripcionConsultas"
        component={ConsultationDescription}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="DescripcionProcedimientos"
        component={ProcedureDescription}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="ConfirmacionConsulta"
        component={ConsultationConfirmation}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="ConfirmacionProcedimiento"
        component={ProcedureConfirmation}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
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
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="EditarCita"
        component={EditarCita}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="CitaCancelada"
        component={CancelationConfirmation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Servicios"
        component={Servicios}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="Tienda"
        component={Tienda}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
       <Stack.Screen
        name="Producto"
        component={Producto}
        options={({ navigation, route }) => ({
          headerShown: false,
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="ConfirmarCompra"
        component={ConfirmarCompra}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: '',
              headerLeft: () => (<CustomHeader navigation={navigation} route={route} />),
              headerTintColor: '#00D0B1',
              headerTitleAlign: 'left',
              headerShadowVisible: false,
            },
            android: {
              headerShown: false,
            }
          }),
          headerTransparent: false,
        })}
      />
    </Stack.Navigator>
  );
}

export default PrivateScreen;
