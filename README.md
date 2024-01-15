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
16. npm i @react-native-async-storage/async-storage para almacenamiento local
17. para todo lo relacionado a firebase 
npm i firebase 
npm i @react-native-firebase/app
npm i @react-native-firebase/auth
npm i @react-native-firebase/database
npm i @react-native-firebase/firestore
npm i @react-native-firebase/storage

18. guia para hacer el login en firebase 
https://www.youtube.com/watch?v=z-WsYu8n1vQ

19. redux y redux toolkit 
npm i @reduxjs/toolkit
npm i react-redux

20. peristencia local
npx expo install @react-native-async-storage/async-storage

21. envio de email mediante una extension de firebase trigger email
https://invertase.io/blog/send-email-extension
https://www.youtube.com/watch?v=1nsnNLLnlrg&t=86s

22. para la gestion de imagenes 
expo install expo-file-system

<code>expo install expo-font</code>

23. para que salga una pantalla cyando se acaban los intentos en el codigo de verificacion

npm install react-native-toast-message

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

<h1>Comandos Expo:</h1>

<h3>Iniciar Expo</h3>
<code>npx expo start</code>


<h3>Crear Build (en APK)</h3>
<code>eas build -p android --profile production</code>

<h1>Selector de imagenes</h1>

Para seleccionar o tomar fotos o imagenes para la imagen de perfil del usuario.

<code>npx expo install expo-image-picker</code>