export default {
  "expo": {
    "notification": {
      "icon": "./assets/icon.png"
    },
    "name": "RogansApp",
    "slug": "RogansApp",
    "scheme": "rogansapp",
    "version": "2.1.5",
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
      "expo-font"
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
      "googleServicesFile": "./GoogleService-Info.plist",
      "usesAppleSignIn": true,
      "associatedDomains": ["applinks:rogansya.com", "applinks:192.168.100.3"]
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptiveIcon.png",
        "backgroundColor": "#FCFCFC"
      },
      "googleServicesFile":"./google-services.json",
      "package": "com.rogansdev.RogansApp",
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ],
      "versionCode": 35
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
