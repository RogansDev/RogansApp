import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Animated, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';
import Icons from '../../Presentation/theme/Icons';
import { MyColors, MyFont } from "../../Presentation/theme/AppTheme";

const screenHeight = Dimensions.get('window').height;

interface CarritoHandles {
    toggleModal: () => void;
}

const Carrito = forwardRef<CarritoHandles>((props, ref) => {
    const { CloseIcon, TrashGreyIcon, Note, ClipBoardTick, ArrowDownIcon, AddCicle, MinusCicle, CardWhite, AgendarWhiteIcon } = Icons;

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

                        <ScrollView style={{marginTop: 30, marginBottom: 20,}}>
                            <View style={styles.productContainer}>
                                <Image source={require("../../../assets/tienda.jpg")} style={styles.productImage} />
                                <View>
                                    <Text style={styles.productTitle}>Shampoo anticaída</Text>
                                    <Text style={styles.productPrice}>$20.000</Text>
                                </View>
                                <View style={styles.contadorContainer}>
                                    <TouchableOpacity onPress={() => setCouter(counter === 1 ? 1 : counter - 1)}>
                                        <MinusCicle width={16} height={16} />
                                    </TouchableOpacity>
                                    <Text style={{width: 20, textAlign: 'center'}}>{counter}</Text>
                                    <TouchableOpacity onPress={() => setCouter(counter + 1)}>
                                        <AddCicle width={16} height={16} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity>
                                    <TrashGreyIcon width={24} height={24} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                        <View style={{width: '100%'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10,}}>
                                <Text style={{fontFamily: MyFont.medium, color: '#000000', fontSize: 16,}}>Subtotal</Text>
                                <Text style={{fontFamily: MyFont.regular, color: '#404040', fontSize: 16,}}>$20.000</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12, borderBottomWidth: 1, borderColor: '#C0C0C0',}}>
                                <Text style={{fontFamily: MyFont.medium, color: '#000000', fontSize: 16,}}>IVA</Text>
                                <Text style={{fontFamily: MyFont.regular, color: '#404040', fontSize: 16,}}>$20.000</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15,}}>
                                <Text style={{fontFamily: MyFont.medium, color: '#000000', fontSize: 28,}}>Total</Text>
                                <Text style={{fontFamily: MyFont.regular, color: '#404040', fontSize: 22,}}>$20.000</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15,}}>
                                <View>
                                    <Text style={{fontFamily: MyFont.regular, color: '#404040', fontSize: 22,}}>$20.000</Text>
                                    <Text style={{fontFamily: MyFont.regular, color: '#404040', fontSize: 16,}}>3x productos</Text>
                                </View>
                                <TouchableOpacity style={styles.comprarBtn}>
                                    <Text style={styles.textComprarBtn}>
                                        Ir a pagar
                                    </Text>
                                    <AgendarWhiteIcon width={16} height={16} />
                                </TouchableOpacity>
                            </View>
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
      comprarBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingVertical: 15,
        paddingHorizontal: 45,
        gap: 8,
        borderRadius: 14,
    },
    textComprarBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#ffffff',
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#C0C0C0',
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 15,
        marginBottom: 10,
    },
    productCategory: {
        fontSize: 16,
        fontFamily: MyFont.regular,
        color: '#C0C0C0',
        marginBottom: 4,
    },
    productTitle: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#909090',
    },
    productPrice: {
        fontSize: 20,
        fontFamily: MyFont.medium,
        color: '#404040',
    },
    contadorContainer: {
        width: 80,
        flexDirection: 'row',
        gap: 2,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
});

export default Carrito;