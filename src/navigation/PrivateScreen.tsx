import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Presentation/views/Home/Home';

const Stack = createNativeStackNavigator();

function PrivateScreen() {
    return (

        <Stack.Navigator>
            
            <Stack.Screen name="Home" component={Home} options={{ title: '', headerShown: false }} />

            {/* aqui agregar las pantallas privadas  */}

        </Stack.Navigator>

    );
}



export default PrivateScreen