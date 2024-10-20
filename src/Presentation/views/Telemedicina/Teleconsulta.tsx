import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { useDispatch, useSelector } from 'react-redux';
import useRegisterFirebase from '../../../hooks/useRegisterFirebase';
import { setUserInfo } from '../../../state/ProfileSlice';
import { MyColors, MyFont } from '../../theme/AppTheme';

const Teleconsulta = () => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLastname, setNewLastname] = useState('');
  const webviewRef = useRef(null);

  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const dispatch = useDispatch();
  const { name, lastname, phone, user_id } = useSelector((state: any) => state.user);

  const { handleUpdateName } = useRegisterFirebase();

  const userInfo = {
    document: phone,
    namesUser: name,
    lastnameUser: lastname,
    indicativeUser: '+57',
    phoneUser: phone,
  };

  const url = `https://roganscare.com/videosdk-app/?document=${userInfo.document}&namesUser=${userInfo.namesUser}&lastnameUser=${userInfo.lastnameUser}&indicativeUser=${userInfo.indicativeUser}&phoneUser=${userInfo.phoneUser}`;

  useEffect(() => {
    if (!name || !lastname) {
      setShowForm(true);
    } else {
      setShowForm(false);
      setLoading(true);
    }
  }, [name, lastname]);

  const handleSaveName = async () => {
    setLoading(true);
    if (newName.trim() === '' || newLastname.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre y apellido válidos.');
      return;
    }

    try {
      await handleUpdateName(phone, newName, newLastname);

      dispatch(
        setUserInfo({
          name: newName,
          lastname: newLastname,
          phone,
          user_id,
        })
      );
      setLoading(false);
      setShowForm(false);
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      Alert.alert('No se pudo guardar la información.');
    }
  };

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'CALL_ENDED') {
      navigation.navigate('Home');
    }
  };

  if (showForm) {

    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Ingresa tu nombre y apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#666"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#666"
          value={newLastname}
          onChangeText={setNewLastname}
        />
        <TouchableOpacity style={styles.button} onPress={handleSaveName}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00d0b1" />
          </View>
        )}
      </View>
    );
  }

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
          <ActivityIndicator size="large" color="#00d0b1" />
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
    backgroundColor: 'white',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  formTitle: {
    fontSize: MyFont.size[5],
    fontFamily: MyFont.regular,
    marginBottom: 20,
  },
  input: {
    width: '82%',
    borderWidth: 1,
    borderColor: MyColors.neutro[3],
    color: MyColors.neutro[1],
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: MyFont.size[7],
    fontFamily: MyFont.regular,
  },
  button: {
    backgroundColor: MyColors.verde[2],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: MyFont.size[7],
    fontFamily: MyFont.regular,
  },
});

export default Teleconsulta;
