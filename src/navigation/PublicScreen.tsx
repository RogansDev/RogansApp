import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Presentation/views/Acceder/Login';
import Register from '../Presentation/views/Acceder/Register';
import ThirdScreen from '../Presentation/views/ContainerHome/ThirdScreen';
import VerifitCodes from '../Presentation/views/Acceder/VerifitCode';
import ConfirmationKey from '../Presentation/views/Acceder/ConfirmationKey';
import UpdatePass from '../Presentation/views/Acceder/UpdatePass';
import Loading from '../Presentation/views/loading/Loading';
import { Platform } from 'react-native';
import { RootParamList } from "../utils/RootParamList";
import CustomHeader from '../Presentation/components/CustomHeader';
import GoogleRegister from '../Presentation/views/Acceder/GoogleRegister';

const Stack = createNativeStackNavigator<RootParamList>();

function PublicScreen() {

  return (

    <Stack.Navigator>

      {/* rutas publicas principales  */}

      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Regresar"
        component={ThirdScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation, route }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,
              headerTransparent: false,
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
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="Register"
        component={Register}
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
        name="GoogleRegister"
        component={GoogleRegister}
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
      {/* aqui agregar pantallas publicas */}
      <Stack.Screen
        name="UpdateKey"
        component={UpdatePass}
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
        name="ConfirmationKey"
        component={ConfirmationKey}
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

export default PublicScreen;
