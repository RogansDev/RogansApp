import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

const UChatWebView = () => {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
    {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#00d0b1" />
        </View>
      )}
      <WebView
        source={{ uri: 'https://rogansya.com/rogans-app/uchat/' }}
        style={styles.webview}
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
