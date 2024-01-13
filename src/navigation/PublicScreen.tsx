import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Presentation/views/Acceder/Login';
import Register from '../Presentation/views/Acceder/Register';
import ThirdScreen from '../Presentation/views/ContainerHome/ThirdScreen';
import ModalVerifitCode from '../Presentation/components/ModalVerifitCode';
import { MyColors } from '../Presentation/theme/AppTheme';
import CustomHeader from "../Presentation/components/CustomHeader";
import CustomHeaderTransparent from "../Presentation/components/CustomHeaderTransparent";
import ConfirmationKey from '../Presentation/views/Acceder/ConfirmationKey';
import UpdatePass from '../Presentation/views/Acceder/UpdatePass';
import SecondScreen from '../Presentation/views/ContainerHome/SecondScreen';
import Loading from '../Presentation/views/loading/Loading';
import { RootParamList } from "../utils/RootParamList";

const Stack = createNativeStackNavigator<RootParamList>();

function PublicScreen() {

    return (

        <Stack.Navigator>

            {/* rutas publicas principales  */}
            <Stack.Screen name="Loading" component={Loading} options={{ title: '', headerShown: false }} />
            <Stack.Screen
                name="Regresar"
                component={ThirdScreen}
                options={({ route, navigation }) => ({
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => (<CustomHeaderTransparent navigation={navigation} />),
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
                    headerTransparent: false,
                    headerTitle: '',
                    headerLeft: () => (<CustomHeader navigation={navigation} route={null} />),
                    headerTintColor: '#00D0B1',
                    headerTitleAlign: 'left',
                    headerShadowVisible: false,
                })}
            />
            
            <Stack.Screen
                name="Register"
                component={Register}
                options={({ route, navigation }) => ({
                    headerShown: true,
                    headerTransparent: false,
                    headerTitle: '',
                    headerLeft: () => (<CustomHeader navigation={navigation} route={null} />),
                    headerTintColor: '#00D0B1',
                    headerTitleAlign: 'left',
                    headerShadowVisible: false,
                })}
            />

            {/* aqui agregar pantallas publicas */}


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
                options={{ title: '', headerShown: false }}
            />
            <Stack.Screen
                name="ConfirmationKey"
                component={ConfirmationKey}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: 'Regresar',

                }} />
        </Stack.Navigator>

    );
}

export default PublicScreen;

