import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Presentation/views/Acceder/Login';
import Register from '../Presentation/views/Acceder/Register';

const Stack = createNativeStackNavigator();

function PublicScreen() {
    return (

        <Stack.Navigator>
            {/* aqui agregar las trees pantallas principales */}
            <Stack.Screen name="Login" component={Login} options={{ title: '', headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ title: '' }} />
        </Stack.Navigator>

    );
}



export default PublicScreen