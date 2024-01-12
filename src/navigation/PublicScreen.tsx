import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Presentation/views/Acceder/Login';
import Register from '../Presentation/views/Acceder/Register';
import ThirdScreen from '../Presentation/views/ContainerHome/ThirdScreen';
import VerifitCodes from '../Presentation/views/Acceder/VerifitCode';
import { MyColors } from '../Presentation/theme/AppTheme';
import ConfirmationKey from '../Presentation/views/Acceder/ConfirmationKey';
import UpdatePass from '../Presentation/views/Acceder/UpdatePass';
import SecondScreen from '../Presentation/views/ContainerHome/SecondScreen';
import Loading from '../Presentation/views/loading/Loading';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

function PublicScreen() {

    return (

        <Stack.Navigator>

            {/* rutas publicas principales  */}
            <Stack.Screen 
                name="Loading" 
                component={Loading} 
                options={{ 
                  ...Platform.select({
                     ios: {
                       headerShown: true,
                       headerTitle: "Regresar",
                       headerTintColor: MyColors.primary,
                     },
                     android: {
                      headerShown: false,
                     }
                  }),
                   headerTransparent: true,
                }} 
            />
            <Stack.Screen 
                name="Regresar" 
                component={ThirdScreen} 
                options={{ 
                    ...Platform.select({
                      ios: {
                        headerShown: true,
                        headerTitle: "Regresar",
                        headerTintColor: MyColors.primary,
                      },
                      android: {
                        headerShown: false,
                      }
                    }),
                    headerTransparent: true,
                }} 
            />
            <Stack.Screen 
               name="Login" 
               component={Login} 
               options={{ 
                   ...Platform.select({
                     ios: {
                       headerShown: true,
                       headerTitle: "Regresar",
                       headerTintColor: MyColors.primary,
                     },
                     android: {
                       headerShown: false,
                     }
                   }),
                   headerTransparent: true,
                }} 
            />
            <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{ 
                  ...Platform.select({
                    ios: {
                      headerShown: true,
                      headerTitle: "Regresar",
                      headerTintColor: MyColors.primary,
                    },
                    android: {
                      headerShown: false,
                    }
                  }),
                  headerTransparent: true,
                }} 
            />
            {/* aqui agregar pantallas publicas */}
            <Stack.Screen
                name="UpdateKey"
                component={UpdatePass}
                options={{
                    ...Platform.select({
                      ios: {
                        headerShown: true,
                        headerTitle: "Regresar",
                        headerTintColor: MyColors.primary,
                      },
                      android: {
                        headerShown: false,
                      }
                    })
                }}
            />
            <Stack.Screen
                name="ModalVerifitCode"
                component={VerifitCodes}
                options={{
                   ...Platform.select({
                     ios: {
                       headerShown: true,
                     },
                     android: {
                       headerShown: false,
                     }
                   })
                }}
            />
            <Stack.Screen
                name="ConfirmationKey"
                component={ConfirmationKey}
                options={{
                    ...Platform.select({
                      ios: {
                        headerShown: true,
                        headerTitle: "Regresar",
                        headerTintColor: MyColors.primary,
                      },
                      android: {
                        headerShown: false,
                      }
                    }),
                    headerTransparent: true,
                }} />
        </Stack.Navigator>

    );
}

export default PublicScreen;
