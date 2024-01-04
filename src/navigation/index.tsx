import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import PrivateScreen from './PrivateScreen';
import PublicScreen from './PublicScreen';

const Navigation = () => {

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