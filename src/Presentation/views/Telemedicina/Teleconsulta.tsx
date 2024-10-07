import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import WebView from 'react-native-webview';
import usePiP from '../../../hooks/usePip';

const Teleconsulta = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = 'https://rogansya.com/sala-de-espera';

  usePiP();

  return (
    <WebView
        source={{ uri: url }}
        style={styles.webview}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
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

export default Teleconsulta;
