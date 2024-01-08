import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Presentation/views/Home/Home";
import CancelationConfirmation from "../Presentation/views/MiAgenda/CancelationConfirmation";
import Servicios from "../Presentation/views/Servicios/Servicios";
import { MyColors } from "../Presentation/theme/AppTheme";
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
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../utils/RootParamList";


const Stack = createNativeStackNavigator<RootParamList>();

function PrivateScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "", headerShown: false }}
      />

      {/* aqui agregar las pantallas privadas  */}
      <Stack.Screen
        name="ListaDeConsultas"
        component={ConsultationList}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ListaDeProcedimientos"
        component={ProcedureList}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="DescripcionConsultas"
        component={ConsultationDescription}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="DescripcionProcedimientos"
        component={ProcedureDescription}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ConfirmacionConsulta"
        component={ConsultationConfirmation}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ConfirmacionProcedimiento"
        component={ProcedureConfirmation}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerShadowVisible: false,
        }}
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
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "#FCFCFC",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="EditarCita"
        component={EditarCita}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "#FCFCFC",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="CitaCancelada"
        component={CancelationConfirmation}
        options={{
          /*  */ headerShown: false,
        }}
      />
      <Stack.Screen
        name="Servicios"
        component={Servicios}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "#FCFCFC",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "",
          headerTintColor: MyColors.primary,
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "#FCFCFC",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default PrivateScreen;
