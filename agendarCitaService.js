export const agendarCita = (datosCita) => {
  console.log('Datos de la cita:', datosCita);

  return fetch('https://rogansya.com/rogans-app/index.php?accion=agendar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosCita),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Respuesta del servidor no fue OK');
      }
      return response.json();
  })
  .then(data => {
    console.log('Respuesta del servidor:', data);
    return data;
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
    throw error; // Re-lanzar el error para manejarlo en el llamador
  });
};
