import React, { useState, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import Icons from '../../../Presentation/theme/Icons';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Rating from "../../components/Rating";
import Carrito from '../../components/Carrito';

// Obtener las dimensiones de la pantalla
const { width } = Dimensions.get('window');

const images = [
    { id: '1', src: require('../../../../assets/tienda.jpg') },
    { id: '2', src: require('../../../../assets/tienda.jpg') },
    { id: '3', src: require('../../../../assets/tienda.jpg') },
    // Añade más imágenes según sea necesario
];

interface CarritoHandles {
    toggleModal: () => void;
}

const Producto = () => {
    const navigation = useNavigation<StackNavigationProp<RootParamList>>();
    const { CloseIcon, AgendarIcon, Note, ClipBoardTick, ArrowDownIcon, AddCicle, MinusCicle, CardWhite } = Icons;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [counter, setCouter] = useState(1);
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
    const flatListRef = useRef<FlatList>(null);
    const dotWidth = useRef(images.map(() => new Animated.Value(10))).current;

    const carritoRef = useRef<CarritoHandles>(null);

    const abrirCarrito = () => {
        if (carritoRef.current) {
            carritoRef.current.toggleModal();
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<any> }) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index;
            setCurrentIndex(newIndex);

            dotWidth.forEach((dot, index) => {
                Animated.timing(dot, {
                    toValue: index === newIndex ? 45 : 10,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const toggleAccordion = (id: string) => {
        setExpandedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <>
        <Carrito ref={carritoRef} />
        <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <CloseIcon width={16} height={16} />
                    <Text style={{ fontFamily: MyFont.regular }}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <AgendarIcon width={22} height={22} />
                </TouchableOpacity>
            </View>
            
        <ScrollView style={styles.container}>
            <View style={styles.carousel}>
                <FlatList
                    ref={flatListRef}
                    data={images}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.carouselItem}>
                            <Image source={item.src} style={styles.image} />
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                />

                <View style={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: index === currentIndex ? 'black' : MyColors.gray,
                                    width: dotWidth[index],
                                },
                            ]}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Perdida del pelo</Text>
                <Text style={styles.title}>Shampoo anticaída</Text>

                <Rating />

                <Text style={styles.oldPrice}>$50.000</Text>
                <Text style={styles.price}>$20.000</Text>

                <Text style={[styles.textos, { marginTop: 20 }]}>
                    Descripción del procedimiento o consulta.
                </Text>
                <Text style={[styles.textos, {marginBottom: 30}]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>

                <View style={styles.accordionItemContainer}>
                    <View style={styles.accordionItem}>
                        <TouchableOpacity onPress={() => toggleAccordion('1')}>
                            <View style={styles.headerAccordion}>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <ClipBoardTick width={16} height={16} />
                                    <Text style={styles.titleAccordion}>Modo de uso</Text>
                                </View>
                                <ArrowDownIcon
                                    width={16}
                                    height={16}
                                    style={{ transform: [{ rotate: expandedItems['1'] ? '180deg' : '0deg' }] }}
                                />
                            </View>
                        </TouchableOpacity>
                        {expandedItems['1'] && <Text style={styles.contentAccordion}>¿Qué precio tiene un trasplante capilar en Colombia?</Text>}
                    </View>
                </View>

                <View style={styles.accordionItemContainer}>
                    <View style={styles.accordionItem}>
                        <TouchableOpacity onPress={() => toggleAccordion('2')}>
                            <View style={styles.headerAccordion}>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <Note width={16} height={16} />
                                    <Text style={styles.titleAccordion}>Detalles de producto</Text>
                                </View>
                                <ArrowDownIcon
                                    width={16}
                                    height={16}
                                    style={{ transform: [{ rotate: expandedItems['2'] ? '180deg' : '0deg' }] }}
                                />
                            </View>
                        </TouchableOpacity>
                        {expandedItems['2'] && <Text style={styles.contentAccordion}>Detalles de producto</Text>}
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', marginTop: 40}}>
                    <View style={styles.contadorContainer}>
                        <TouchableOpacity onPress={() => setCouter(counter === 1 ? 1 : counter - 1)}>
                            <MinusCicle width={16} height={16} />
                        </TouchableOpacity>
                        <Text style={{width: 20, textAlign: 'center'}}>{counter}</Text>
                        <TouchableOpacity onPress={() => setCouter(counter + 1)}>
                            <AddCicle width={16} height={16} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={abrirCarrito} style={{flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 6,}}>
                        <Text style={{fontFamily: MyFont.regular}}>Añadir y seguir comprando</Text>
                        <AgendarIcon width={16} height={16} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.comprarBtn} onPress={() => navigation.navigate('ConfirmarCompra')}>
                    <Text style={styles.textComprarBtn}>
                        Comprar
                    </Text>
                    <CardWhite width={16} height={16} />
                </TouchableOpacity>
            </View>
        </ScrollView>
        
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        position: 'relative',
        paddingHorizontal: 16,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingTop: 70,
        paddingBottom: 20,
    },
    carousel: {},
    carouselItem: {
        marginTop: 30,
        width: width - 32,
        height: 200,
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 15,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    content: {
        marginTop: 40,
        paddingBottom: 20, // Ajuste para espacio extra al final del contenido
    },
    subtitle: {
        fontFamily: MyFont.regular,
        color: '#C0C0C0',
        fontSize: 18,
    },
    title: {
        fontFamily: MyFont.bold,
        color: '#000000',
        fontSize: 28,
        marginBottom: 20,
    },
    oldPrice: {
        fontFamily: MyFont.regular,
        color: '#909090',
        fontSize: 16,
        textDecorationLine: 'line-through',
        marginTop: 20,
    },
    price: {
        fontFamily: MyFont.regular,
        color: '#404040',
        fontSize: 22,
    },
    textos: {
        fontFamily: MyFont.regular,
        color: '#909090',
        fontSize: 15,
    },
    accordionItemContainer: {
        marginVertical: 10, // Ajuste para un margen más pequeño entre ítems
        borderRadius: 10,
        backgroundColor: 'white',
        // Sombras para Android
        elevation: 3, // Reducido para menos sombra
        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    accordionItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
        overflow: 'hidden',
    },
    headerAccordion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'white',
    },
    titleAccordion: {
        fontSize: 16,
        fontFamily: MyFont.regular,
        color: '#404040',
    },
    iconAccordion: {
        fontSize: 24,
        fontFamily: MyFont.light,
        lineHeight: 24,
    },
    contentAccordion: {
        fontSize: 14,
        fontFamily: MyFont.regular,
        color: '#909090',
        padding: 12,
        backgroundColor: 'white',
    },
    contadorContainer: {
        flexDirection: 'row',
        gap: 2,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    comprarBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#000000',
        padding: 15,
        marginTop: 15,
        marginBottom: 30,
        gap: 8,
        borderRadius: 14,
    },
    textComprarBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#ffffff',
    },
});

export default Producto;
