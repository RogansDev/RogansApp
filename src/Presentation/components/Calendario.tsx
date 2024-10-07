import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, Dimensions, Platform, StyleSheet } from 'react-native';
import { MyColors, MyFont } from "../theme/AppTheme";
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendaryInfo } from '../../state/CalendarySlice';
import { Picker } from '@react-native-picker/picker';
import Icons from '../theme/Icons';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles',
    'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
  today: 'Hoy'
};

LocaleConfig.defaultLocale = 'es';

const Calendario = () => {
  const dispatch = useDispatch();
  const calendaryState = useSelector((state: any) => state.calendary);
  const fecha = useSelector((state: any) => state.calendary.fecha);

  const { ArrowDownIcon, TickCircleWhiteicon } = Icons;

  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [hora, setHora] = useState('12:00');
  const [amPm, setAmPm] = useState('AM');
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);

  const actualizarFecha = (nuevaFecha: string) => {
    dispatch(setCalendaryInfo({
      fecha: nuevaFecha,
      horaAgendada: calendaryState.horaAgendada,
      virtualPresecial: calendaryState.virtualPresecial,
      selectedCard: calendaryState.selectedCard,
    }));
  };

  const actualizarHora = (nuevaHora: string) => {
    dispatch(setCalendaryInfo({
      fecha: calendaryState.fecha,
      horaAgendada: nuevaHora,
      virtualPresecial: calendaryState.virtualPresecial,
      selectedCard: calendaryState.selectedCard,
    }));
  };

  const hoy = new Date().toISOString().split('T')[0];

  const onDaySelect = (day: any) => {
    actualizarFecha(day.dateString);
    setFechaSeleccionada(day.dateString);
  };

  useEffect(() => {
    if (hora) {
      actualizarHora(hora + ' ' + amPm);
    }
  }, [hora, amPm]);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDaySelect}
        markedDates={{
          [fecha]: {
            selected: true,
            selectedColor: 'black',
          }
        }}
        minDate={hoy}
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
        }}
      />
      <View style={styles.pickerContainer}>
        <Text style={{ fontFamily: MyFont.regular, fontSize: 13, color: '#C0C0C0', marginLeft: 16, }}>Disponibilidad</Text>
        {Platform.OS === 'ios' ? (
          <>
            <TouchableOpacity onPress={() => setPickerModalVisible(true)} style={{ flexDirection: 'row', gap: 12, marginLeft: 16, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', gap: 8, backgroundColor: '#F9F9F9', borderRadius: 14, padding: 10 }}>
                <Text>{`${hora}`}</Text>
                <ArrowDownIcon width={16} height={16} />
              </View>
              <View style={{ flexDirection: 'row', gap: 8, backgroundColor: '#F9F9F9', borderRadius: 14, padding: 10 }}>
                <Text>{`${amPm}`}</Text>
                <ArrowDownIcon width={16} height={16} />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.pickerContainerAndroid}>
            <Picker
              selectedValue={hora}
              style={styles.picker}
              onValueChange={(itemValue) => setHora(itemValue)}
            >
              {/* Inserta aquí tus horas disponibles */}
            </Picker>
            <Picker
              selectedValue={amPm}
              style={styles.picker}
              onValueChange={(itemValue) => setAmPm(itemValue)}
            >
              <Picker.Item label="AM" value="AM" />
              <Picker.Item label="PM" value="PM" />
            </Picker>
          </View>
        )}
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 20,
    width: 300,
  },
  pickerContainerAndroid: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  picker: {
    width: 130,
    height: 50,
    fontSize: 13,
    color: 'black',
    fontFamily: MyFont.regular,
  },
});

export default Calendario;
