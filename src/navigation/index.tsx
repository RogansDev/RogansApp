import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import PrivateScreen from './PrivateScreen';
import PublicScreen from './PublicScreen';

const Navigation = () => {
    const { logged } = useSelector((state: any) => state.user);
    

    return (
        <NavigationContainer>
            {logged ? <PrivateScreen /> : <PublicScreen />}
        </NavigationContainer>
    );
};

export default Navigation;
