# App-rogans

1. npm install -g expo-cli. //instalar expo
2. npm install //instalar dependencias
3. @react-native-picker/picker //instalar esta dependecia para el picker
4. @react-navigation/native //instalar esta dependecia para el navigation
5. @react-navigation/native-stack //instalar esta dependecia para el navigation
6. @react-navigation/stack //instalar esta dependecia para el navigation
7. react-native-loading-spinner-overlay //instalar esta dependecia para el spinner
8. react-native-navigation //instalar esta dependecia para el navigation
9. react-native-picker-select //instalar esta dependecia para el picker
10. react-native-safe-area-context //instalar esta dependecia para el navigation
11. react-native-screens //instalar esta dependecia para el navigation
12. react-native-slick //instalar esta dependecia para el slider
13. react-native-webview //instalar esta dependecia para el webview calendly
14. expo-font // instalar esta dependencia para Expo Fonts (Fuentes personalizadas)


instalar esta dependecia para calendly


npm install --save react-calendly



Para instalar la dependecia expo-font usar:


<code>expo install expo-font</code>


<h1>Uso de las fuentes personalizadas</h1>

En la carpeta ./assets/fonts/poppins se encuentran los archivos .ttf de la fuente usada en la App.

En el archivo ./src/theme/AppTheme.tsx se encuentran los estilos generales de la App, las fuentes estan configuradas en un objeto llamado MyFont, este objeto cuenta con cuatro propiedades: light, regular, medium y bold las cuales representan los grosores de la fuente (300, 400, 500 y 600 respectivamente).

¡¡¡Es importante recordar que el uso de fuentes perzonalizadar no permite el uso de la propiedad y estilo FontWeight, por lomimso se debe recurrir al uso de las propiedade del objeto MyFont: light, regular, medium y bold!!!

Para usarlo es necesario con impotar la dependencia MyFont de AppTheme.tsx, ejemplo:

<code>import { MyFont } from "../../theme/AppTheme";</code>

Luego aplicar el estilo de la siguiente forma:

<code>estiloParaText: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: 'white',
    },</code>

o

<code><Text style={{fontFamily: MyFont.regular}}>Continuar</Text></code>

