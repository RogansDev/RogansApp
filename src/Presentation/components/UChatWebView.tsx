import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

const UChatWebView = () => {
  const [isLoading, setLoading] = useState(true);
  const user = useSelector( (state : any) => state.user);
  const nombreUsuario =  user.name;
  const apellidoUsuario = user.lastname;
  const telUsuario = user.phone;

  const url = `https://rogansya.com/rogans-app/uchat/?name=${encodeURIComponent(nombreUsuario)}&lastname=${encodeURIComponent(apellidoUsuario)}&phone=${encodeURIComponent(telUsuario)}`;

  console.log(url);

  return (
    <>
    {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#00d0b1" />
        </View>
      )}
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  webview: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UChatWebView;
