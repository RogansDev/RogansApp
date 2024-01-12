import * as React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Presentation/views/Home/Home";
import CancelationConfirmation from "../Presentation/views/MiAgenda/CancelationConfirmation";
import Servicios from "../Presentation/views/Servicios/Servicios";
import { MyColors } from "../Presentation/theme/AppTheme";
import CustomHeader from "../Presentation/components/CustomHeader";
import CustomHeaderTransparent from "../Presentation/components/CustomHeaderTransparent";
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
import UpdatePasswordDash from "../Presentation/views/User/UpdatePasswordDash";
import VerifitCodes from "../Presentation/views/Acceder/VerifitCode";

const Stack = createNativeStackNavigator<RootParamList>();

function PrivateScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTintColor: MyColors.primary,
              headerTitle: "Regresar",
              headerTitleStyle: {
                color: "black",
              },
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ModalVerifitCode"
        component={VerifitCodes}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headershown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="PassUpdatekeyDash"
        component={UpdatePasswordDash}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      {/* aqui agregar las pantallas privadas  */}
      <Stack.Screen
        name="ListaDeConsultas"
        component={ConsultationList}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ListaDeProcedimientos"
        component={ProcedureList}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="DescripcionConsultas"
        component={ConsultationDescription}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="DescripcionProcedimientos"
        component={ProcedureDescription}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ConfirmacionConsulta"
        component={ConsultationConfirmation}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ConfirmacionProcedimiento"
        component={ProcedureConfirmation}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Confirmado"
        component={ConfirmationPage}
        options={{
          ...Platform.select({
            ios: {
              headerShow: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShow: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Rechazado"
        component={DeniedPage}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
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
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="EditarCita"
        component={EditarCita}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
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
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTitle: "Regresar",
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
            },
          }),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default PrivateScreen;
