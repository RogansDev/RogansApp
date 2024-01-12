import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Presentation/views/Acceder/Login";
import Register from "../Presentation/views/Acceder/Register";
import ThirdScreen from "../Presentation/views/ContainerHome/ThirdScreen";
import { MyColors } from "../Presentation/theme/AppTheme";
import ConfirmationKey from "../Presentation/views/Acceder/ConfirmationKey";
import UpdatePass from "../Presentation/views/Acceder/UpdatePass";
import SecondScreen from "../Presentation/views/ContainerHome/SecondScreen";
import Loading from "../Presentation/views/loading/Loading";
import { Platform } from "react-native";
// import VerifitCodes from "../Presentation/views/Acceder/VerifitCodes";

const Stack = createNativeStackNavigator();

function PublicScreen() {
  return (
    <Stack.Navigator>
      {/* rutas publicas principales  */}
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="Regresar"
        component={ThirdScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "",
          headerTransparent: true,
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
              headerTintColor: MyColors.primary,
            },
          }),
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTransparent: true,
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTintColor: MyColors.primary,
            },
            android: {
              headerShown: false,
              headerTintColor: MyColors.primary,
            },
          }),
        }}
      />
      {/* aqui agregar pantallas publicas */}
      <Stack.Screen
        name="UpdateKey"
        component={UpdatePass}
        options={{
          headerTransparent: true,
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
        }}
      />
      {/* <Stack.Screen
        name="ModalVerifitCode"
        component={VerifitCodes}
        options={{
            headerTransparent: true,
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
              headerTintColor: MyColors.primary,
            },
          }),
        }}
      /> */}
      <Stack.Screen
        name="ConfirmationKey"
        component={ConfirmationKey}
        options={{
          headerTransparent: true,
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
              headerTintColor: MyColors.primary,
            },
          }),
        }}
      />
    </Stack.Navigator>
  );
}

export default PublicScreen;
