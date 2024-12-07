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

interface DropdownHoursProps {
  onSelect: (selectedHour: string) => void;
  availableHours: string[]; // Horas disponibles
  disabled?: boolean; // Prop para habilitar/deshabilitar el componente
  resetTrigger?: any; // Prop para reiniciar el estado interno
}

const DropdownHours: React.FC<DropdownHoursProps> = ({
  onSelect,
  availableHours,
  disabled = true,
  resetTrigger,
}) => {
  const { ArrowDownIcon, CloseIcon } = Icons;

  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Resetear el estado solo cuando el resetTrigger cambie
  useEffect(() => {
    setSelectedHour(null);
  }, [resetTrigger]);

  const selectHour = (hour: string) => {
    setSelectedHour(hour); // Guardar selección localmente
    onSelect(hour); // Emitir selección al componente padre
    setIsModalVisible(false); // Cerrar el modal
  };

  const formatTo12Hour = (hour24: string) => {
    const [hour, minute] = hour24.split(':');
    const hourNumber = parseInt(hour, 10);
    const period = hourNumber >= 12 ? 'PM' : 'AM';
    const hour12 = hourNumber % 12 || 12; // Convierte 0 en 12
    return `${hour12}:${minute} ${period}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => !disabled && setIsModalVisible(true)} // Evitar abrir modal si está deshabilitado
        disabled={disabled} // Deshabilitar interacción
      >
        <Text style={[styles.dropdownText, disabled && styles.disabledDropdown]}>
          {selectedHour ? formatTo12Hour(selectedHour) : '¿Qué hora?'}
        </Text>
        <ArrowDownIcon width={16} height={16} />
      </TouchableOpacity>

      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay} // Overlay táctil
          activeOpacity={1} // Evitar cambios de opacidad
          onPress={() => setIsModalVisible(false)} // Cerrar modal al tocar fuera
        >
          <View style={styles.modalContent}>
            <FlatList
              data={availableHours}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectHour(item)}
                >
                  <Text style={styles.modalItemText}>{formatTo12Hour(item)}</Text>
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

export default DropdownHours;
