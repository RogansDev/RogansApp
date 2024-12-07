import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import DropdownHours from './buttons/DropDownHours';
import DropdownModality from './buttons/DropDownModality';
import { MyColors, MyFont } from "../../Presentation/theme/AppTheme";
import Icons from '../../Presentation/theme/Icons';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

const Calendario = ({ onDateSelected, onModalitySelected, onError }: any) => {
  const { ArrowLeft, CalendarWhiteIcon, CloseIcon, TickCircleIcon } = Icons;

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [horasOriginales, setHorasOriginales] = useState<string[]>([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [modalidad, setModalidad] = useState<string | null>(null); // Modalidad inicial como null
  const [isModalityEnabled, setIsModalityEnabled] = useState(false);
  const [isHourEnabled, setIsHourEnabled] = useState(false);
  const [resetDropdowns, setResetDropdowns] = useState(0);
  const [noHoures, setNoHours] = useState(false);
  const [isSaturday, setIsSaturday] = useState(false);

  useEffect(() => {
    if (fechaSeleccionada) {
      // Convierte fechaSeleccionada a un objeto Date
      const [year, month, day] = fechaSeleccionada.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day); // Ajusta el mes (0-11)
  
      console.log('Fecha seleccionada:', fechaSeleccionada);
      console.log('Día de la semana:', selectedDate.getDay()); // Para depuración
  
      // Verifica si es sábado
      const isSat = selectedDate.getDay() === 6; 
      setIsSaturday(isSat);
  
      if (isSat) {
        setModalidad('Presencial');
        setIsHourEnabled(true); // Forzar modalidad
        setIsModalityEnabled(false); // Deshabilitar selección de modalidad
        setIsHourEnabled(false); // Deshabilitar horas hasta que se carguen
      } else {
        setModalidad(null); // Resetear modalidad
        setIsModalityEnabled(true); // Habilitar modalidad
        setIsHourEnabled(false); // Deshabilitar horas temporalmente
      }
  
      setHoraSeleccionada(null); // Resetear hora seleccionada
      fetchAvailableSlots(fechaSeleccionada); // Cargar horas disponibles
    }
  }, [fechaSeleccionada]);   

  useEffect(() => {
    console.log('Fecha seleccionada:', fechaSeleccionada);
    console.log('Es sábado:', isSaturday);
  }, [fechaSeleccionada, isSaturday]);
  

  useEffect(() => {
    if (modalidad) {
      updateAvailableHours();
      setIsHourEnabled(true); // Activar selección de horas
    }
  }, [modalidad]);

  const fetchAvailableSlots = async (fecha: string) => {
    try {
      const response = await fetch(`https://roganscare.com:5002/available-slots?day=${fecha}`);
      if (!response.ok) throw new Error('Error al obtener los datos');
      const data = await response.json();

      const horasFiltradas = filterHoursByCurrentTime(data || [], fecha);
      setHorasOriginales(horasFiltradas);
      updateAvailableHours(horasFiltradas);
      setIsModalityEnabled(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las horas disponibles.');
      console.error(error);
    }
  };

  const filterHoursByCurrentTime = (hours: string[], selectedDate: string) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const limitHour = new Date(now);
    limitHour.setHours(currentHour + 1);
    limitHour.setMinutes(Math.ceil(currentMinutes / 15) * 15);

    if (selectedDate === now.toISOString().split('T')[0]) {
      return hours.filter((hour) => {
        const [hourPart, minutePart] = hour.split(':').map(Number);
        const hourDate = new Date();
        hourDate.setHours(hourPart, minutePart, 0, 0);
        return hourDate >= limitHour;
      });
    }

    return hours;
  };

  const updateAvailableHours = (hours = horasOriginales) => {
    const filteredHours =
      modalidad === 'Virtual'
        ? hours.filter((hour) => {
            const [hourPart] = hour.split(':').map(Number);
            return hourPart >= 13 && hourPart < 15;
          })
        : hours;
    setHorasDisponibles(filteredHours);

  // Verificar si el array está vacío y mostrar el modal
  if (filteredHours.length === 0) {
    setNoHours(true);
  }
  };

  const onDaySelect = (day: any) => {
    setFechaSeleccionada(day.dateString);
    setResetDropdowns((prev) => prev + 1);
  };

  const handleHourSelect = (hour: string) => {
    setHoraSeleccionada(hour);
    onDateSelected(`${fechaSeleccionada} ${hour}:00`);
    onModalitySelected(modalidad);
  };

  const handleConfirm = () => {
    const hourToUse = horaSeleccionada;
    onDateSelected(`${fechaSeleccionada} ${hourToUse}`);
    onModalitySelected(modalidad);
  };

  const disableSundays = (startDate: Date, yearsRange: number = 2) => {
    let disabledDates: any = {};
    for (let yearOffset = 0; yearOffset <= yearsRange; yearOffset++) {
      for (let month = 0; month < 12; month++) {
        const currentDate = new Date(startDate.getFullYear() + yearOffset, month, 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        for (let d = new Date(currentDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          if (d.getDay() === 0) {
            disabledDates[d.toISOString().split('T')[0]] = { disabled: true, disableTouchEvent: true };
          }
        }
      }
    }
    return disabledDates;
  };

  const disabledDates = disableSundays(new Date(), 2);

  return (
    <View style={styles.container}>
      {noHoures && (
            <Modal
                transparent={true}
                animationType="fade"
                visible={noHoures}
                onRequestClose={() => setNoHours(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <CloseIcon width={60} height={60} />
                        <Text style={styles.modalText3}>¡Lo sentimos!</Text>
                        <Text style={styles.modalText}>
                          No hay horario disponible para la fecha seleccionada.
                        </Text>
                        <TouchableOpacity
                            style={{ marginTop: 20 }}
                            onPress={() => setNoHours(false)}
                        >
                            <Text style={{ color: MyColors.verde[2], fontFamily: MyFont.bold }}>
                                Cerrar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )}

      <Calendar
        onDayPress={onDaySelect}
        markedDates={{
          ...(fechaSeleccionada && {
            [fechaSeleccionada]: { selected: true, selectedColor: 'black' },
          }),
          ...disabledDates,
        }}
        minDate={new Date().toISOString().split('T')[0]}
        style={{ width: 300, justifyContent: 'center' }}
        theme={{
          textDayFontFamily: MyFont.regular,
          textMonthFontFamily: MyFont.bold,
          todayButtonFontFamily: MyFont.regular,
          textDayHeaderFontFamily: MyFont.regular,
          arrowColor: 'black',
          dayTextColor: 'black',
          todayTextColor: '#00D0B1',
          textDisabledColor: '#B0B0B0',
          selectedDayTextColor: '#ffffff',
          selectedDayBackgroundColor: 'black',
          textDayFontSize: 12,
          textDayHeaderFontSize: 12,
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <View style={styles.pickerContainer}>
          <Text style={{ fontFamily: MyFont.regular, fontSize: 14 }}>Hora:</Text>
          <DropdownHours
            onSelect={handleHourSelect}
            availableHours={horasDisponibles}
            disabled={!isHourEnabled}
            resetTrigger={resetDropdowns}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={{ fontFamily: MyFont.regular, fontSize: 14 }}>Modalidad:</Text>
          {!isSaturday ? (
            <DropdownModality
              onSelect={(value) => setModalidad(value)}
              disabled={!isModalityEnabled}
              resetTrigger={resetDropdowns}
            />
          ) : (
            <Text style={{ fontFamily: MyFont.medium, fontSize: 14 }}>Presencial</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  pickerContainer: {
    paddingVertical: 20,
  },
  pagoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
  },
  modalText: {
      marginTop: 10,
      fontSize: 16,
      color: MyColors.neutro[2],
      fontFamily: MyFont.regular,
      textAlign: 'center',
  },
  modalText2: {
      marginTop: 10,
      fontSize: 22,
      color: MyColors.verde[2],
      fontFamily: MyFont.bold,
  },
  modalText3: {
      marginTop: 10,
      fontSize: 22,
      color: MyColors.error[3],
      fontFamily: MyFont.bold,
  },
});

export default Calendario;
