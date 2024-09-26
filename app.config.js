export default {
  "expo": {
    "notification": {
      "icon": "./assets/icon.png"
    },
    "name": "RogansApp",
    "slug": "RogansApp",
    "version": "1.3.8",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#FCFCFC"
    },
    "plugins": [
      ["@react-native-google-signin/google-signin"],
      "@config-plugins/react-native-webrtc",
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "buildToolsVersion": "34.0.0"
          },
          "ios": {
            "useFrameworks": "static",
            "deploymentTarget": "15.0"
          }
        }
      ],
      "expo-apple-authentication",
      "@react-native-google-signin/google-signin",
      "expo-font",
      "expo-secure-store"
    ],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.rogansdev.RogansApp",
      "infoPlist": {
        "NSCameraUsageDescription": "Esta aplicación utiliza la cámara para agregar la foto de perfil de los usuarios",
        "NSPhotoLibraryUsageDescription": "Necesitamos acceder a la galería para seleccionar imágenes."
      },
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST || "./GoogleService-Info.plist",
      "usesAppleSignIn": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptiveIcon.png",
        "backgroundColor": "#FCFCFC"
      },
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
      "package": "com.rogansdev.RogansApp",
      "permissions": ["CAMERA"],
      "versionCode": 26
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "bd8d9d9a-7119-481a-a757-ec044f47da53"
      }
    }
  }
}
