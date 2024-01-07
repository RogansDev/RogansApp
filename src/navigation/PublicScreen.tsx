import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Presentation/views/Acceder/Login';
import Register from '../Presentation/views/Acceder/Register';
import ThirdScreen from '../Presentation/views/ContainerHome/ThirdScreen';
import Loading from '../Presentation/views/loading/Loading';

const Stack = createNativeStackNavigator();

function PublicScreen() {
    return (

        <Stack.Navigator>

            {/* rutas publicas principales  */}
            <Stack.Screen name="Loading" component={Loading} options={{ title: '', headerShown: false }} />
            <Stack.Screen name="Regresar" component={ThirdScreen} options={{ title: '', headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ title: '', headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ title: '' }} />

            {/* aqui agregar pantallas publicas */}


        </Stack.Navigator>

    );
}



export default PublicScreen