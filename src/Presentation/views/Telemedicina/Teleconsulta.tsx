import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import navigation from "../../../navigation";
import { RootParamList } from "../../../utils/RootParamList";

const Teleconsulta = () => {
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef(null);

  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const userInfo = {
    document: '303030',
    namesUser: 'PruebaApp',
    indicativeUser: '+57',
    phoneUser: '3142282855',
  };

  const url = `https://roganscare.com/videosdk-app/?document=${userInfo.document}&namesUser=${userInfo.namesUser}&indicativeUser=${userInfo.indicativeUser}&phoneUser=${userInfo.phoneUser}`;

  const handleMessage = (event:any) => {
    const data = JSON.parse(event.nativeEvent.data);
    
    if (data.type === 'CALL_ENDED') {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        style={styles.webview}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        onMessage={handleMessage}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <Text>Cargando...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
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
  },
});

export default Teleconsulta;
