import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { MyColors, MyFont } from '../../theme/AppTheme';
import Icons from '../../theme/Icons';

interface DropdownModalityProps {
  onSelect: (selectedModality: string) => void;
  disabled?: boolean; // Prop para habilitar/deshabilitar el componente
  resetTrigger?: any; // Prop para reiniciar el estado interno
}

const DropdownModality: React.FC<DropdownModalityProps> = ({
    onSelect,
    disabled = true,
    resetTrigger,
  }) => {
    const { ArrowDownIcon, CloseIcon } = Icons;
    const [selectedModality, setSelectedModality] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [localReset, setLocalReset] = useState(resetTrigger);
  
    // Resetear el estado solo cuando el resetTrigger cambie
    useEffect(() => {
      if (resetTrigger !== localReset) {
        setSelectedModality(null);
        setLocalReset(resetTrigger);
      }
    }, [resetTrigger, localReset]);
  
    const selectModality = (modality: string) => {
      setSelectedModality(modality); // Guardar selección localmente
      onSelect(modality); // Emitir selección al componente padre
      setIsModalVisible(false); // Cerrar el modal
    };

    const modalities = [
        "Presencial",
        "Virtual"
    ]
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => !disabled && setIsModalVisible(true)} // Evitar abrir modal si está deshabilitado
          disabled={disabled} // Deshabilitar interacción
        >
          <Text style={[styles.dropdownText, disabled && styles.disabledDropdown]}>
            {selectedModality || '¿Virtual o presencial?'}
          </Text>
          <ArrowDownIcon width={16} height={16} />
        </TouchableOpacity>
  
        <Modal transparent={true} visible={isModalVisible} animationType="slide">
            <TouchableOpacity
                style={styles.modalOverlay} // Usamos el mismo estilo del overlay
                activeOpacity={1} // Asegura que el toque no sea transparente
                onPress={() => setIsModalVisible(false)} // Cierra el modal al tocar el overlay
            >
                <View style={styles.modalContent}>
                <FlatList
                    data={modalities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => selectModality(item)}
                    >
                        <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                    )}
                />
                <TouchableOpacity
                  style={styles.cerrarBtn}
                  onPress={() => setIsModalVisible(false)}
                >
                  <CloseIcon width={25} height={25} />
                </TouchableOpacity>
                </View>
            </TouchableOpacity>
            </Modal>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: MyFont.medium,
    color: MyColors.neutro[1],
  },
  disabledDropdown: {
    color: MyColors.neutroDark[4],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '60%',
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: MyFont.regular,
    color: MyColors.neutro[1],
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cerrarBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default DropdownModality;
