import React, { useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootParamList } from '../../../utils/RootParamList'; // Ajusta la ruta según tu estructura

type DiagnosticoScreenRouteProp = RouteProp<RootParamList, 'Diagnostico'>;

const Diagnostico = () => {
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef<WebView>(null);

  const route = useRoute<DiagnosticoScreenRouteProp>();
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        style={styles.webview}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00d0b1" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Diagnostico;
