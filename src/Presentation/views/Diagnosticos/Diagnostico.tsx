import React, { useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootParamList } from '../../../utils/RootParamList'; // Ajusta la ruta según tu estructura
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from "react-redux";
import { setMedicalLineInfo } from "../../../state/MedicalLineSlice";

type DiagnosticoScreenRouteProp = RouteProp<RootParamList, 'Diagnostico'>;

const Diagnostico = () => {
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef<WebView>(null);

  const dispatch = useDispatch();

  const MedicalLineState = useSelector((state: any) => state.medicalLine);

  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const route = useRoute<DiagnosticoScreenRouteProp>();
  const { url } = route.params;

  const handleMedicalLine = async (linea: string) => {
    dispatch(
      setMedicalLineInfo({
        ...MedicalLineState,
        lineaMedica: linea,
      })
    );
    navigation.navigate("Agendamiento");
  };

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'INICIAR_AGEDAMIENTO') {
      if (url.includes('alopecia')) {
        handleMedicalLine('Capilar');
      } else if (url.includes('rejuvenecimiento-facial')) {
        handleMedicalLine('Facial');
      } else if (url.includes('corporal')) {
        handleMedicalLine('nutricion');
      } else if (url.includes('rendimiento-sexual')) {
        handleMedicalLine('Sexual');
      } else if (url.includes('psicologia')) {
        handleMedicalLine('Psicologia');
      } else {

      }
    }
  };

  return (
    <View style={styles.container}>
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