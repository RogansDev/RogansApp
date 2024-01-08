import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Presentation/views/Acceder/Login';
import Register from '../Presentation/views/Acceder/Register';
import ThirdScreen from '../Presentation/views/ContainerHome/ThirdScreen';
import ModalVerifitCode from '../Presentation/components/ModalVerifitCode';
import { MyColors } from '../Presentation/theme/AppTheme';
import ConfirmationKey from '../Presentation/views/Acceder/ConfirmationKey';
import UpdatePass from '../Presentation/views/Acceder/UpdatePass';
import SecondScreen from '../Presentation/views/ContainerHome/SecondScreen';

const Stack = createNativeStackNavigator();

function PublicScreen() {

    return (

        <Stack.Navigator>

            {/* rutas publicas principales  */}
            <Stack.Screen name="Regresar" component={ThirdScreen} options={{ title: '', headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ title: '', headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ title: '' }} />

            {/* aqui agregar pantallas publicas */}
            <Stack.Screen 
               name="second" 
               component={SecondScreen}
               options={{
                 headerShown: true,
                 headerTitle: "Regresar",
                 headerTransparent: true,
                 headerTintColor: MyColors.primary,
               }}
            />
            <Stack.Screen 
                name="thirdPage" 
                component={ThirdScreen} 
                options={{ title: 'Regresar', headerShown: true, headerTransparent: true,  headerTintColor: MyColors.primary,}} 
            />
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ title: 'Regresar', headerShown: true, headerTransparent: true,  headerTintColor: MyColors.primary,}} 
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
                options={{ title: 'Regresar', headerShown: true, headerTransparent: true,  headerTintColor: MyColors.primary,}} 
            />
        </Stack.Navigator>

    );
}

export default PublicScreen;


// las pantallas van en orden 1. firtscreen, 2. secondscreen, 3. thirdscreen, 4. acceder, 5. login, 6. registro