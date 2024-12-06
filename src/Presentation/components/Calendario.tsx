import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform, TouchableWithoutFeedback } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icons from '../theme/Icons';
import { MyColors, MyFont, MyFontStyles } from '../theme/AppTheme';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

const Calendario = ({ onDateSelected, onModalitySelected }: any) => {
  const { ArrowDownIcon } = Icons;
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [modalidad, setModalidad] = useState('Presencial');

  const createDateWithoutTimezone = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const roundTimeToNext15Minutes = (date: Date) => {
    const ms = 1000 * 60 * 15;
    return new Date(Math.ceil(date.getTime() / ms) * ms);
  };

  const getMinMaxTimes = (date: string) => {
    const selectedDate = createDateWithoutTimezone(date);
    const dayOfWeek = selectedDate.getDay();
    
    let minTime = new Date(), maxTime = new Date();
    if (dayOfWeek === 6) { 
      minTime.setHours(9, 0, 0, 0);
      maxTime.setHours(16, 0, 0, 0);
    } else {
      minTime.setHours(8, 30, 0, 0);
      maxTime.setHours(18, 0, 0, 0);
    }
    return { minTime, maxTime };
  };

  const filterTimeByDay = (date: string) => {
    const { minTime } = getMinMaxTimes(date);
    return minTime;
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Si es hoy, redondear la hora actual a los próximos 15 minutos
    if (formattedDate === new Date().toISOString().split('T')[0]) {
      const roundedNow = roundTimeToNext15Minutes(new Date());
      setTime(roundedNow);
      onDateSelected(`${formattedDate} ${convertTo24HourFormat(roundedNow.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }))}`);
    } else {
      // Si es otro día, usar la primera hora disponible
      const earliestTime = filterTimeByDay(formattedDate);
      setTime(earliestTime);
      onDateSelected(`${formattedDate} ${convertTo24HourFormat(earliestTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }))}`);
    }

    setFechaSeleccionada(formattedDate);
    onModalitySelected(modalidad);
  }, []);

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

  const onDaySelect = (day: any) => {
    setFechaSeleccionada(day.dateString);  // Actualizar fecha seleccionada
    const selectedDate = createDateWithoutTimezone(day.dateString);
    const today = new Date();

    if (selectedDate.toDateString() === today.toDateString()) {
      const roundedNow = roundTimeToNext15Minutes(today);
      setTime(roundedNow);
    } else {
      const earliestTime = filterTimeByDay(day.dateString);
      setTime(earliestTime);
    }

    handleConfirm(day.dateString);  // Confirmar la selección con la fecha correcta
  };

  const onTimeChange = (event: any, selectedTime: any) => {
    const today = new Date();
    const roundedNow = roundTimeToNext15Minutes(today);
    const { minTime, maxTime } = getMinMaxTimes(fechaSeleccionada);

    if (selectedTime) {
      let adjustedTime = selectedTime;
      if (fechaSeleccionada === today.toISOString().split('T')[0] && selectedTime < roundedNow) {
        adjustedTime = roundedNow;
      }

      if (adjustedTime < minTime) {
        adjustedTime = minTime;
      } else if (adjustedTime > maxTime) {
        adjustedTime = maxTime;
      }

      setTime(adjustedTime);
    }
  };

  const handleConfirm = (selectedDate?: string) => {
    const dateToUse = selectedDate || fechaSeleccionada;  // Usar la fecha seleccionada actual o la pasada como argumento
    const formattedTime = time.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    });

    const horaEn24Horas = convertTo24HourFormat(formattedTime);
    const selectedDateTime = `${dateToUse} ${horaEn24Horas}`;
    
    // Emitir la fecha y hora seleccionada al componente padre
    onDateSelected(selectedDateTime);
    onModalitySelected(modalidad);
    setShowTimePicker(false);
  };

  const convertTo24HourFormat = (formattedTime: string) => {
    let [time, modifier] = formattedTime.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12);
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    return `${hours}:${minutes}:00`;
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDaySelect}
        markedDates={{
          [fechaSeleccionada]: {
            selected: true,
            selectedColor: 'black',
          },
          ...disabledDates
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
          weekVerticalMargin: 0,
          // @ts-ignore
          'stylesheet.day.basic': {
            base: {
              width: 30,   // Ancho del día
              height: 30,  // Altura del día
              alignItems: 'center',
              justifyContent: 'center',
            }
          }
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <View style={styles.pickerContainer}>
          <Text>Disponibilidad</Text>
          <TouchableOpacity
            onPress={() => fechaSeleccionada && setShowTimePicker(true)}
            style={{ flexDirection: 'row', gap: 12, marginLeft: 16, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', gap: 8, backgroundColor: '#F9F9F9', borderRadius: 14, padding: 10 }}>
              <Text>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
              <ArrowDownIcon width={16} height={16} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <Text>Modalidad</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              if (value) {
                setModalidad(value);
                onModalitySelected(value); // Notificar al componente padre inmediatamente
              }
            }}
            value={modalidad}
            items={[
              { label: 'Presencial', value: 'Presencial' },
              { label: 'Virtual', value: 'Virtual' },
            ]}
            placeholder={{
              label: 'Selecciona una modalidad...',
              value: null,
              color: '#9EA0A4',
            }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <ArrowDownIcon width={16} height={16} />}
          />
        </View>
      </View>

      {showTimePicker && Platform.OS === 'ios' && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showTimePicker}
          onRequestClose={() => setShowTimePicker(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowTimePicker(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="spinner"
                    onChange={onTimeChange}
                    minuteInterval={15}
                    minimumDate={fechaSeleccionada === new Date().toISOString().split('T')[0] ? roundTimeToNext15Minutes(new Date()) : undefined}
                  />
                  <TouchableOpacity style={styles.confirmButton} onPress={() => handleConfirm()}>
                    <Text style={styles.confirmButtonText}>Listo</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {Platform.OS === 'android' && showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            onTimeChange(event, selectedTime);
          }}
          minuteInterval={15}
          minimumDate={fechaSeleccionada === new Date().toISOString().split('T')[0] ? roundTimeToNext15Minutes(new Date()) : undefined}
        />
      )}
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: 'black',
    width: 115,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
    width: 115,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginTop: 10,
    position: 'relative',
  },
  iconContainer: {
    top: 19,
    right: 8,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  pickerContainer: {
    paddingVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  confirmButton: {
    marginTop: 20,
  },
  confirmButtonText: {
    textAlign: 'right',
    color: '#00D0B1',
    fontSize: 16,
  },
});

export default Calendario;
