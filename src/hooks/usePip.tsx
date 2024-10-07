import { AppState } from 'react-native';
import { useEffect } from 'react';
import { NativeModules } from 'react-native';

console.log(NativeModules);

const { PiPModule } = NativeModules;

const usePiP = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'background') {
        if (PiPModule && typeof PiPModule.enterPictureInPictureMode === 'function') {
          try {
            PiPModule.enterPictureInPictureMode();
          } catch (error) {
            console.error('Error al intentar activar PiP:', error);
          }
        } else {
          console.error('PiPModule no está disponible o enterPictureInPictureMode no es una función');
        }
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
};

export default usePiP;
