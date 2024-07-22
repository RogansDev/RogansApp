import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MyFont } from "../../../Presentation/theme/AppTheme";
import DireccionesTienda from '../../components/DirreccionesTienda';
import Carrito from '../../components/Carrito';

interface DirrecionesHandles {
    toggleModal: () => void;
}

interface CarritoHandles {
    toggleModal: () => void;
}

const ConfirmarCompra = () => {
    const [inputValue, setInputValue] = useState('');

    const direccionesRef = useRef<DirrecionesHandles>(null);

    const abrirDirecciones = () => {
        if (direccionesRef.current) {
            direccionesRef.current.toggleModal();
        }
    };

    const carritoRef = useRef<CarritoHandles>(null);

    const abrirCarrito = () => {
        if (carritoRef.current) {
            carritoRef.current.toggleModal();
        }
    };

    return (
        <>
            <Carrito ref={carritoRef} />
            <DireccionesTienda ref={direccionesRef}  />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Resumen de compra</Text>
                    <TouchableOpacity onPress={abrirCarrito} style={{ flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 12, borderBottomWidth: 1, borderColor: '#C0C0C0', }}>
                        <Text style={{ fontFamily: MyFont.regular, color: '#000000', fontSize: 16, }}>3x productos (producto 1, 2 y 3)</Text>
                        <Text style={{ fontFamily: MyFont.medium, color: '#909090', fontSize: 12, }}>$450.000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={abrirDirecciones} style={{ flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 12, borderBottomWidth: 1, borderColor: '#C0C0C0' }}>
                        <Text style={{ fontFamily: MyFont.regular, color: '#000000', fontSize: 16, marginTop: 12 }}>Dirección 123 #45-67</Text>
                        <Text style={{ fontFamily: MyFont.medium, color: '#909090', fontSize: 12 }}>Mi casa</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 12, borderBottomWidth: 1, borderColor: '#C0C0C0', }}>
                        <Text style={{ fontFamily: MyFont.regular, color: '#000000', fontSize: 16, marginTop: 12 }}>Tarjeta 5432</Text>
                        <Text style={{ fontFamily: MyFont.medium, color: '#909090', fontSize: 12, }}>12 cuotas</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 12, borderBottomWidth: 1, borderColor: '#C0C0C0', }}>
                        <Text style={{ fontFamily: MyFont.regular, color: '#000000', fontSize: 16, marginTop: 12 }}>xx/xx/xxxx</Text>
                        <Text style={{ fontFamily: MyFont.medium, color: '#909090', fontSize: 12, }}>hh:hh mm</Text>
                    </View>
                </View>
                <View>
                    <View style={{ width: '100%' }}>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Cupón descuento</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType="default"
                                    onChangeText={setInputValue}
                                    value={inputValue}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, }}>
                            <Text style={{ fontFamily: MyFont.medium, color: '#000000', fontSize: 16, }}>Subtotal</Text>
                            <Text style={{ fontFamily: MyFont.regular, color: '#404040', fontSize: 16, }}>$20.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, }}>
                            <Text style={{ fontFamily: MyFont.medium, color: '#000000', fontSize: 16, }}>IVA</Text>
                            <Text style={{ fontFamily: MyFont.regular, color: '#404040', fontSize: 16, }}>$20.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12, borderBottomWidth: 1, borderColor: '#C0C0C0', }}>
                            <Text style={{ fontFamily: MyFont.medium, color: '#000000', fontSize: 16, }}>Cupón de Dcto.</Text>
                            <Text style={{ fontFamily: MyFont.regular, color: '#404040', fontSize: 16, }}>-$20.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, }}>
                            <Text style={{ fontFamily: MyFont.medium, color: '#000000', fontSize: 28, }}>Total</Text>
                            <Text style={{ fontFamily: MyFont.regular, color: '#404040', fontSize: 22, }}>$20.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, }}>
                            <View>
                                <Text style={{ fontFamily: MyFont.regular, color: '#404040', fontSize: 22, }}>$20.000</Text>
                                <Text style={{ fontFamily: MyFont.regular, color: '#404040', fontSize: 16, }}>Botox full face</Text>
                            </View>
                            <TouchableOpacity style={styles.comprarBtn}>
                                <Text style={styles.textComprarBtn}>
                                    Finalizar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        position: 'relative',
        paddingHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: MyFont.bold,
        color: '#000000',
        fontSize: 24,
        marginBottom: 20,
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
    inputContainer: {
        position: 'relative',
        marginVertical: 12,
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 12,
        padding: 10,
    },
    inputLabel: {
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 5,
        color: '#909090',
        fontFamily: MyFont.regular,
        fontSize: 12,
    },
    inputStyle: {
        height: 20,
        color: '#000000',
        fontFamily: MyFont.regular,
    },
});

export default ConfirmarCompra;
