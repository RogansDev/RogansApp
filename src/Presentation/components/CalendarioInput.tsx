import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Animated, Modal, TouchableOpacity, Dimensions, Platform, StyleSheet } from 'react-native';
import { MyColors, MyFont } from "../theme/AppTheme";
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import Icons from '../theme/Icons';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  
  interface CalendarioHandles {
    toggleModal: () => void;
  }
  
  interface CalendarioProps {
    onDateChange: (selectedDate: string) => void;
  }

const CalendarioInput = forwardRef<CalendarioHandles, CalendarioProps>(({ onDateChange }, ref) => {
    const { CloseIcon, TickCircleWhiteicon, ArrowDownIcon, ArrowGreen } = Icons;

    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;

    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate) {
          const currentDate = selectedDate || date;
          setDate(currentDate);
          if (onDateChange) {
            onDateChange(currentDate);
          }
        }
    };

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

        if (!show) {
            setShow(true);
        } else {
            setShow(true);
        }
    };

    useImperativeHandle(ref, () => ({
        toggleModal,
    }));

    const [date, setDate] = useState(new Date());

    if (Platform.OS === 'android') {
        // Lógica específica para Android
        return (
          <View>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
              />
            )}
          </View>
        );
      } else {
        // Lógica específica para iOS
        return (
          <>
            {visible && (
              <Modal transparent={true} visible={visible} onRequestClose={toggleModal}>
                <Animated.View style={[styles.fullScreenContainer, { opacity: fadeAnim }]}>
                  <TouchableOpacity style={styles.fullScreenTouchable} onPress={toggleModal} activeOpacity={1} />
                </Animated.View>
                <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity onPress={toggleModal} style={{ position: 'absolute', top: 20, left: 20, zIndex: 8, }}>
                      <CloseIcon width={16} height={16} />
                    </TouchableOpacity>
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      onChange={onChange}
                    />
                    <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                        <TouchableOpacity onPress={toggleModal} style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 14, paddingVertical: 10, borderBottomColor: '#00D0B1', borderBottomWidth: 1, }}>
                        <ArrowGreen width={18} height={18} />
                        <Text style={{ fontFamily: MyFont.regular, fontSize: 13, color: '#00D0B1', }}>Terminar</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              </Modal>
            )}
          </>
        );
      }
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
      paddingHorizontal: 50,
      overflow: 'hidden',
    },
    yearPicker: {
        width: 130,
        height: 200,
        fontSize: 13,
        color: 'black',
        fontFamily: MyFont.regular,
    },
});


export default CalendarioInput;