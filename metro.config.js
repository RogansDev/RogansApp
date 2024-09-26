const { getDefaultConfig } = require('@expo/metro-config');
const resolveFrom = require('resolve-from');

// Obtener la configuración por defecto de Metro
const defaultConfig = getDefaultConfig(__dirname);

/** Extender la configuración para incluir SVG */
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
};

/** Configuración adicional para react-native-webrtc y event-target-shim */
defaultConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    // Si el bundle está resolviendo "event-target-shim" desde un módulo que es parte de "react-native-webrtc".
    moduleName.startsWith('event-target-shim') &&
    context.originModulePath.includes('react-native-webrtc')
  ) {
    // Resuelve event-target-shim relativo al paquete react-native-webrtc para usar la versión v6.
    const eventTargetShimPath = resolveFrom(context.originModulePath, moduleName);

    return {
      filePath: eventTargetShimPath,
      type: 'sourceFile',
    };
  }

  // Asegurarse de que se llame al resolver por defecto
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = defaultConfig;
