import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { MeetingProvider } from '@videosdk.live/react-native-sdk';

const Teleconsulta = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const startMeeting = async () => {
    try {
      const response = await fetch('https://roganscare.com:3110/create-meeting', {
        method: 'POST',
      });

      const { roomId } = await response.json();
      console.log('Meeting ID:', roomId);

      setMeetingId(roomId);
      setLoading(false); // Detén la carga
    } catch (error) {
      console.error('Error al crear la reunión:', error);
      setLoading(false); // Detén la carga en caso de error
    }
  };

  useEffect(() => {
    startMeeting();
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (!meetingId) {
    return <Text>Error al obtener el ID de la reunión.</Text>;
  }

  return (
    <MeetingProvider
      config={{
        meetingId: meetingId, // Usa el meetingId que obtuviste del backend
        name: 'Prueba app',
        micEnabled: true,
        webcamEnabled: true,
      }}
      token="24a5dade-4724-43d5-bd4a-e0abc65ba9e7" // Pasa el token de Video SDK aquí
    >
      <View>
        <Text>Video SDK en React Native</Text>
        <Button title="Iniciar Reunión" onPress={startMeeting} />
      </View>
    </MeetingProvider>
  );
};

export default Teleconsulta;
