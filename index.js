import Constants from 'expo-constants';
import { AppRegistry } from 'react-native';
import App from './App'; // O la ruta correcta a tu archivo principal

const appName = 'main'; // o el nombre que deseas darle a tu aplicación
AppRegistry.registerComponent(appName, () => App);
