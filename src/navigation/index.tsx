import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import PrivateScreen from './PrivateScreen';
import PublicScreen from './PublicScreen';

const Navigation = () => {


    // const value = await AsyncStorage.getItem('my-key');
    // if (value !== null) {
    //   // value previously stored
    // } para leer la persistencia local

    let state = useSelector((state) => state)
    console.log('navigation', state)

    return (
        <NavigationContainer>
            {
                state
                    ? <PrivateScreen />
                    : <PublicScreen />
            }
        </NavigationContainer>
    );
}

export default Navigation