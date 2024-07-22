import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Animated, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';
import Icons from '../../Presentation/theme/Icons';
import { MyColors, MyFont } from "../../Presentation/theme/AppTheme";

const screenHeight = Dimensions.get('window').height;

interface DirrecionesHandles {
    toggleModal: () => void;
}

const DireccionesTienda = forwardRef<DirrecionesHandles>((props, ref) => {
    const { CloseIcon, InicioIcon, GpsIcon, BriefCaseIcon, StarIcon, ProfileIcon, ClockIcon, TickCircleWhiteicon } = Icons;

    const [visible, setVisible] = useState(false);
    const [counter, setCouter] = useState(1);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;

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
    };

    useImperativeHandle(ref, () => ({
        toggleModal,
    }));

    const [inputValue, setInputValue] = useState('');


    return (
        <>
        {visible && (
            <Modal transparent={true} visible={visible} onRequestClose={toggleModal}>
                <Animated.View style={[styles.fullScreenContainer, { opacity: fadeAnim }]}>
                    <TouchableOpacity style={styles.fullScreenTouchable} activeOpacity={1} onPress={toggleModal} />
                </Animated.View>

                <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={{zIndex: 8, flexDirection: 'row', alignItems: 'center', gap: 8}} onPress={toggleModal}>
                            <CloseIcon width={16} height={16} />
                            <Text style={{ fontFamily: MyFont.regular }}>Cerrar</Text>
                        </TouchableOpacity>

                        <View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>¿Dónde te encuentras?</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        keyboardType="default"
                                        onChangeText={setInputValue}
                                        value={inputValue}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{height: 70, marginTop: 14, borderBottomColor: '#C0C0C0', borderBottomWidth: 1,}}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity style={styles.iconBtn} onPress={() => console.log('Buscar')}>
                                    <InicioIcon width={16} height={16} />
                                    <Text style={styles.textIconBtn}>
                                        Casa
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconBtn} onPress={() => console.log('Buscar')}>
                                    <BriefCaseIcon width={16} height={16} />
                                    <Text style={styles.textIconBtn}>
                                        Trabajo
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconBtn} onPress={() => console.log('Buscar')}>
                                    <ProfileIcon width={16} height={16} />
                                    <Text style={styles.textIconBtn}>
                                        Amiga/o
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconBtn} onPress={() => console.log('Buscar')}>
                                    <StarIcon width={16} height={16} />
                                    <Text style={styles.textIconBtn}>
                                        Favoritos
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20,}}>
                            <TouchableOpacity style={styles.ubicacionBtn} onPress={() => console.log('Buscar')}>
                                <GpsIcon width={22} height={22} />
                                <Text style={styles.textUbicacionBtn}>
                                    Usar mi ubicación
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop: 50, marginBottom: 30,}}>
                            <Text style={{fontFamily: MyFont.medium, fontSize: 16,}}>
                                Recientes
                            </Text>
                        </View>

                        <ScrollView>
                            <View style={styles.direccion}>
                                <ClockIcon width={28} height={28} />
                                <View>
                                    <Text style={styles.direccionTitle}>Dirección 123 #45-67</Text>
                                    <Text style={styles.direccionText}>Suba, Bogotá, Colombia</Text>
                                </View>
                            </View>
                            <View style={styles.direccion}>
                                <ClockIcon width={28} height={28} />
                                <View>
                                    <Text style={styles.direccionTitle}>Dirección 123 #45-67</Text>
                                    <Text style={styles.direccionText}>Suba, Bogotá, Colombia</Text>
                                </View>
                            </View>
                            <View style={styles.direccion}>
                                <ClockIcon width={28} height={28} />
                                <View>
                                    <Text style={styles.direccionTitle}>Dirección 123 #45-67</Text>
                                    <Text style={styles.direccionText}>Suba, Bogotá, Colombia</Text>
                                </View>
                            </View>
                            <View style={styles.direccion}>
                                <ClockIcon width={28} height={28} />
                                <View>
                                    <Text style={styles.direccionTitle}>Dirección 123 #45-67</Text>
                                    <Text style={styles.direccionText}>Suba, Bogotá, Colombia</Text>
                                </View>
                            </View>
                        </ScrollView>

                        <View>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.textBtn}>Continuar</Text>
                                <TickCircleWhiteicon width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
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
        height: '88%',
        bottom: 0,
        zIndex: 11,
      },
      modalContent: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        overflow: 'hidden',
      },
      textComprarBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#ffffff',
    },
    inputContainer: {
        position: 'relative',
        marginTop: 60,
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#909090',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    inputLabel: {
        position: 'absolute',
        top: -10,
        left: 16,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 5,
        color: '#000000',
        fontFamily: MyFont.regular,
        fontSize: 12,
    },
    inputStyle: {
        height: 20,
        color: '#000000',
        fontFamily: MyFont.regular,
    },
    iconBtn: {
        flexDirection: 'row',
        gap: 8,
        marginRight: 30,
        alignItems:'center',
    },
    textIconBtn: {
        color: '#404040',
        fontFamily: MyFont.regular,
        fontSize: 14,
    },
    ubicacionBtn: {
        flexDirection: 'row',
        gap: 16,
        marginRight: 30,
        alignItems:'center',
    },
    textUbicacionBtn: {
        color: '#404040',
        fontFamily: MyFont.regular,
        fontSize: 16,
    },
    direccion: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 30,
    },
    direccionTitle: {
        fontFamily: MyFont.medium,
        fontSize: 16,
        color: '#000000',
    },
    direccionText: {
        fontFamily: MyFont.regular,
        fontSize: 14,
        color: '#909090',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'black',
        padding: 14,
        marginTop: 40,
        marginBottom: 20,
        gap: 8,
    },
    textBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: 'white',
    },
});

export default DireccionesTienda;