import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const Teleconsulta = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (!meetingId) {
    return <Text>Error al obtener el ID de la reunión.</Text>;
  }

  return (
    <></>
  );
};

export default Teleconsulta;
