import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Animated, Modal, TouchableOpacity, Dimensions, Platform, StyleSheet } from 'react-native';
import { MyColors, MyFont } from "../theme/AppTheme";
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { setCalendaryInfo, resetSpecificCalendaryInfo } from '../../state/CalendarySlice';
import { Picker } from '@react-native-picker/picker';
import PopUpError from './PopUpError';
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

const screenHeight = Dimensions.get('window').height;

interface MiCalendarioHandles {
  toggleModal: () => void;
}

interface MiCalendarioProps {
  onAbrirPopUpError: (mensaje: string) => void;
}

const MiCalendario = forwardRef<MiCalendarioHandles, MiCalendarioProps>((props, ref) => {
  interface NoDisponible {
    [x: string]: string;
    fecha: string;
  }

  interface MarcaFecha {
    [fecha: string]: {
      disabled?: boolean;
      disableTouchEvent?: boolean;
      selected?: boolean;
      selectedColor?: string;
    };
  }

  interface PopUpErrorHandles {
    togglePopUpError: (mesaje: string) => void;
  }

  const { CloseIcon, TickCircleWhiteicon, ArrowDownIcon, ArrowGreen } = Icons;

  const dispatch = useDispatch();
  const calendaryState = useSelector((state : any) => state.calendary);
  const fecha = useSelector( (state : any) => state.calendary.fecha);
  const horaAgendada = useSelector( (state : any) => state.calendary.horaAgendada);

  const actualizarFecha = (nuevaFecha: any) => {
    

    dispatch(setCalendaryInfo({
      fecha: nuevaFecha,
      horaAgendada: calendaryState.horaAgendada,
      virtualPresecial: calendaryState.virtualPresecial,
      selectedCard: calendaryState.selectedCard,
    }));
  };

  const actualizarHora = (nuevaHora: any) => {
    dispatch(setCalendaryInfo({
      fecha: calendaryState.fecha,
      horaAgendada: nuevaHora,
      virtualPresecial: calendaryState.virtualPresecial,
      selectedCard: calendaryState.selectedCard,
    }));
  };

  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [visible, setVisible] = useState(false);
  const [hora, setHora] = useState('12:00');
  const [amPm, setAmPm] = useState('AM');
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);
  const [noDisponible, setNoDisponible] = useState<NoDisponible[]>([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    const obtenerFechasNoDisponibles = async () => {
      const fechasConHoras = await horasNoDisponibles();
      setNoDisponible(fechasConHoras);
    };

    obtenerFechasNoDisponibles();
  }, []);


  const toggleModal = () => {
    if (!visible) {
      // Al abrir el modal
      setVisible(true);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start();
    } else {
      // Al cerrar el modal
      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => setVisible(false));
      Animated.timing(slideAnim, { toValue: screenHeight, duration: 500, useNativeDriver: true }).start();
    }

    console.log(hora + ' final Hora');

    console.log(horaAgendada + ' final');
    
  };

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));

  const hoy = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (fechaSeleccionada) {
      const horasDisponibles = horasDisponiblesPicker();
      if (horasDisponibles.length > 0) {
        setHora(horasDisponibles[0].value);
      } else {
        setHora('');
      }
    }
  }, [fechaSeleccionada]); // Dependencia en fechaSeleccionada

  const onDaySelect = (day: any) => {
    actualizarFecha(day.dateString)
    setFechaSeleccionada(day.dateString);
    console.log("Fecha seleccionada:", fechaSeleccionada);    
  };

  useEffect(() => {
    if (hora) {
      actualizarHora(hora + ' ' + amPm);
    }
  }, [hora, amPm]);

  const generarHorasComparacion = () => {
    const horas = [];
    let inicio, fin;

    const fecha = new Date(fechaSeleccionada);
    const esSabado = fecha.getDay() === 5;

    if (esSabado) {
      inicio = amPm === 'AM' ? 9 : 13;
      fin = amPm === 'AM' ? 12 : 16;
    } else {
      inicio = amPm === 'AM' ? 8 : 13;
      fin = amPm === 'AM' ? 12 : 18;
    }

    for (let i = inicio; i <= fin; i++) {
      if (i === inicio && amPm === 'AM') {
        horas.push(`${i.toString().padStart(2, '0')}:30`);
      } else {
        // Para todas las demás horas, agrega tanto en punto como y media
        horas.push(`${i.toString().padStart(2, '0')}:00`);
        if (i < fin || (i === 12 && amPm === 'AM')) {
          // Agrega la media hora si no es la última hora del período
          horas.push(`${i.toString().padStart(2, '0')}:30`);
        }
      }
    }

    return horas;
  };

  const convertirAFormato12Horas = (hora24: any) => {
    const [hora, minutos] = hora24.split(':');
    const hora12 = hora % 12 || 12;
    return `${hora12}:${minutos}`;
  };

  const horasDisponiblesPicker = () => {
    const horas24 = generarHorasComparacion();
    return horas24
      .filter(hora24 => !noDisponible.some(cita => cita.fecha === fechaSeleccionada && cita.hora === hora24))
      .map(hora24 => ({
        label: convertirAFormato12Horas(hora24),
        value: convertirAFormato12Horas(hora24)
      }));
  };

  const extraerFechaYHora = (fechaConHora: any) => {
    const fecha = new Date(fechaConHora);

    fecha.setHours(fecha.getHours());

    const horaAjustada = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    return {
      fecha: fecha.toISOString().split('T')[0], // Fecha ajustada si es necesario
      hora: `${horaAjustada.toString().padStart(2, '0')}:${minutos}` // Hora en formato 'HH:MM'
    };
  };

  const horasNoDisponibles = async () => {
    try {
      const response = await fetch(`https://rogansya.com/rogans-app/index.php?accion=obtenerFecha`);
      const data = await response.json();
      const fechasConHoras = data.map((cita: { fecha: any; }) => extraerFechaYHora(cita.fecha));
      return fechasConHoras;
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

  useEffect(() => {
    setHora(amPm === 'AM' ? '00:00' : '01:00');
  }, [amPm]);


  function formatearFechaISO(fecha: any) {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // getMonth() retorna un valor de 0 a 11
    const día = fecha.getDate();

    // Asegurarse de que el mes y el día sean de dos dígitos
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const díaFormateado = día < 10 ? `0${día}` : día;

    return `${año}-${mesFormateado}-${díaFormateado}`;
  }

  const marcarDomingos = () => {
    let fechas: any = {};
    let fecha = new Date();
    let fin = new Date();
    fin.setFullYear(fecha.getFullYear() + 2);

    while (fecha <= fin) {
      if (fecha.getDay() === 0) {
        const claveFecha = formatearFechaISO(fecha);
        fechas[claveFecha] = { disabled: true, disableTouchEvent: true };
      }
      fecha.setDate(fecha.getDate() + 1);
    }

    return fechas;
  };

  const domingosMarcados = marcarDomingos();
  
  const [diasNoDisponibles, setDiasNoDisponibles] = useState({});

  useEffect(() => {
    const fetchDisponibilidad = async () => {
      try {
        const response = await fetch('https://rogansya.com/rogans-app/disponibilidad.json');
        const datosExternos = await response.json();
        setDiasNoDisponibles(diasPrev => ({...diasPrev, ...datosExternos}));
      } catch (error) {
        console.error('Error al obtener la disponibilidad:', error);
      }
    };

    fetchDisponibilidad();
  }, []);

  const PopUpErrorRef = useRef<PopUpErrorHandles>(null);

  const abrirPopUpError = (mensaje: string) => {
    if (PopUpErrorRef.current) {
      PopUpErrorRef.current.togglePopUpError(mensaje);
    }
  };

  const verificarDatos = () => {  
    if ((hora == '00:00') && (fecha == '')) {
      abrirPopUpError('Elige una hora y fecha');
    } else if ((hora != '00:00') && (fecha == '')) {
      abrirPopUpError('Elige una fecha');
    } else if ((hora == '00:00') && (fecha != '')) {
      abrirPopUpError('Elige una hora valida');
    } else {
      toggleModal();
    }
    console.log(horaAgendada + ' verificarDatos');
  }

  const cerrarModalSinDatos = () => {
    actualizarFecha('');

    toggleModal();
  }

  const primeraHoraDisponible = () => {
    const horasDisponibles = horasDisponiblesPicker();
    if (hora == horasDisponibles[0].value) {

      setHora(horasDisponibles[0].value);
    } else {
      setHora(hora);
    }

    setPickerModalVisible(false);
  }

  return (
    <>
      {visible && (
        <Modal transparent={true} visible={visible} onRequestClose={toggleModal}>
          <Animated.View style={[styles.fullScreenContainer, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.fullScreenTouchable} onPress={cerrarModalSinDatos} activeOpacity={1} />
          </Animated.View>
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={cerrarModalSinDatos} style={{ position: 'absolute', top: 20, left: 20, zIndex: 8, }}>
                <CloseIcon width={16} height={16} />
              </TouchableOpacity>
              <Calendar
                onDayPress={onDaySelect}
                markedDates={{
                  ...domingosMarcados,
                  ...diasNoDisponibles,
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
              <View style={styles.pickerContainer}>
                <Text style={{ fontFamily: MyFont.regular, fontSize: 13, color: '#C0C0C0', marginLeft: 16, }}>Disponibilidad</Text>
                {Platform.OS === 'ios' ? (
                  <>
                    <TouchableOpacity onPress={() => setPickerModalVisible(true)} style={{ flexDirection: 'row', gap: 12, marginLeft: 16, marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', gap: 8, backgroundColor: '#F9F9F9', borderRadius: 14, padding: 10, }}>
                        <Text>{`${hora}`}</Text>
                        <ArrowDownIcon width={16} height={16} />
                      </View>
                      <View style={{ flexDirection: 'row', gap: 8, backgroundColor: '#F9F9F9', borderRadius: 14, padding: 10, }}>
                        <Text>{`${amPm}`}</Text>
                        <ArrowDownIcon width={16} height={16} />
                      </View>
                    </TouchableOpacity>
                    <Modal
                      transparent={true}
                      visible={isPickerModalVisible}
                      onRequestClose={() => setPickerModalVisible(false)}
                    >
                      <View style={styles.modalPicker}>
                        <View style={styles.modalContentPicker}>
                          <TouchableOpacity onPress={() => setPickerModalVisible(false)} style={{ position: 'absolute', top: 20, left: 20, }}>
                            <CloseIcon width={16} height={16} />
                          </TouchableOpacity>
                          <View style={{ flexDirection: 'row', }}>
                            <Picker
                              selectedValue={hora}
                              style={styles.picker}
                              onValueChange={(itemValue) => {setHora(itemValue), actualizarHora(itemValue + ' ' + amPm);}}
                            >
                              {horasDisponiblesPicker().map((item, index) => (
                                <Picker.Item key={index} label={item.label} value={item.value} />
                              ))}
                            </Picker>

                            <Picker
                              selectedValue={amPm}
                              style={styles.pickerInModal}
                              onValueChange={(itemValue, itemIndex) => setAmPm(itemValue)}
                            >
                              <Picker.Item label="AM" value="AM" />
                              <Picker.Item label="PM" value="PM" />
                            </Picker>
                          </View>
                          <TouchableOpacity onPress={primeraHoraDisponible} style={styles.guardarBtn}>
                            <Text style={styles.textGuardarBtn}>Guardar</Text>
                            <TickCircleWhiteicon style={styles.iconGuardarBtn} width={16} height={16} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </>
                ) : (
                  <View style={styles.pickerContainerAndroid}>
                    <Picker
                      selectedValue={hora}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => setHora(itemValue)}
                    >
                      {horasDisponiblesPicker().map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.pickerItem} />
                      ))}
                    </Picker>

                    <Picker
                      selectedValue={amPm}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => setAmPm(itemValue)}
                    >
                      <Picker.Item label="AM" value="AM" style={styles.pickerItem} />
                      <Picker.Item label="PM" value="PM" style={styles.pickerItem} />
                    </Picker>
                  </View>
                )}
              </View>
              <View style={{ width: 300, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                <TouchableOpacity onPress={verificarDatos} style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 14, paddingVertical: 10, borderBottomColor: '#00D0B1', borderBottomWidth: 1, }}>
                  <ArrowGreen width={18} height={18} />
                  <Text style={{ fontFamily: MyFont.regular, fontSize: 13, color: '#00D0B1', }}>Terminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          <PopUpError ref={PopUpErrorRef} />
        </Modal>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  fullScreenTouchable: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 11,
  },
  modalContent: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
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
  pickerItem: {
    fontSize: 15,
    color: 'black',
    fontFamily: MyFont.regular,
  },
  modalPicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContentPicker: {
    position: 'relative',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  pickerInModal: {
    width: 130,
    height: 230,
    fontSize: 13,
    fontFamily: MyFont.regular,
  },
  guardarBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textGuardarBtn: {
    fontSize: 13,
    fontFamily: MyFont.regular,
    color: 'white',
  },
  iconGuardarBtn: {
    marginLeft: 8,
  },
});

export default MiCalendario;