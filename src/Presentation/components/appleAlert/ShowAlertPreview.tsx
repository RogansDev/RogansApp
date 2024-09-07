import React from 'react';
import { Modal, View, Text,  StyleSheet, TouchableOpacity, Image } from 'react-native';
//@ts-ignore
import localImage from '../../../../assets/apple.png'

const ShowAlertPreview = ({ visible, onContinue, onCancel }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Recomendaciones</Text>

          <Text style={styles.modalBody}>
            Recuerde compartir NOMBRE y CORREO ELECTRÓNICO para iniciar sesión
          </Text>
          <Image
            source={localImage}
            style={styles.image}
            resizeMode="stretch"
          />

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.button} onPress={onContinue}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalBody: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200, // Ajusta el tamaño de la imagen
    marginBottom: 20,
  },
});

export default ShowAlertPreview;
