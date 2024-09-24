import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { setCalendaryInfo } from '../../../state/CalendarySlice';
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import SearchBarStore from '../../../Presentation/components/SearchBarStore';
import Icons from '../../../Presentation/theme/Icons';
import { consultCards, procedureCards } from '../Servicios/ServicesData';
import StoreBannerCard from '../../../Presentation/components/StoreBannerCard';
import CircleButton from '../../../Presentation/components/buttons/CircleButton';

const productCards = [
    {
        id: 1,
        image: require("../../../../assets/banner-tienda1.jpg"),
        title: "Cuidado del cabello",
    },
    {
        id: 2,
        image: require("../../../../assets/banner-tienda2.jpg"),
        title: "Cuidado del cabello",
    },
    {
        id: 3,
        image: require("../../../../assets/banner-tienda3.jpg"),
        title: "Cuidado del cabello",
    },
];

const products = [
    {
        id: 1,
        image: require("../../../../assets/tienda.jpg"),
        type: "Perdida del cabello",
        title: "Shampoo",
        description:
          "En Rogans entendemos lo desafiante que puede ser lidiar con la pérdida de cabello y sus efectos en la autoestima y la confianza. Te ofrecemos un enfoque integral y experto para abordar la alopecia y ayudarlo a recuperar su cabello y su confianza.",
        duracion_cita: "30 minutos",
        price_old: "80000",
        price: "50000",
        category: "Productos",
    },
    {
        id: 2,
        image: require("../../../../assets/tienda.jpg"),
        type: "Perdida del cabello",
        title: "Cuidado del cabello",
        description:
          "En Rogans entendemos lo desafiante que puede ser lidiar con la pérdida de cabello y sus efectos en la autoestima y la confianza. Te ofrecemos un enfoque integral y experto para abordar la alopecia y ayudarlo a recuperar su cabello y su confianza.",
        price_old: "80000",
        price: "50000",
        category: "Productos",
    },
]

const services = [
    {
        id: 1,
        image: require("../../../../assets/tienda.jpg"),
        type: "Perdida del cabello",
        title: "Cuidado del cabello",
        description:
          "En Rogans entendemos lo desafiante que puede ser lidiar con la pérdida de cabello y sus efectos en la autoestima y la confianza. Te ofrecemos un enfoque integral y experto para abordar la alopecia y ayudarlo a recuperar su cabello y su confianza.",
        price_old: "80000",
        price: "50000",
        category: "Servicios",
    },
    {
        id: 2,
        image: require("../../../../assets/tienda.jpg"),
        type: "Perdida del cabello",
        title: "Cuidado del cabello",
        description:
          "En Rogans entendemos lo desafiante que puede ser lidiar con la pérdida de cabello y sus efectos en la autoestima y la confianza. Te ofrecemos un enfoque integral y experto para abordar la alopecia y ayudarlo a recuperar su cabello y su confianza.",
        price_old: "80000",
        price: "50000",
        category: "Servicios",
    },
]

const Tienda = () => {
    const { AgendarWhiteIcon, AgregarIcon, CloseIcon, FilterIcon, AgendarIcon } = Icons;
    const dispatch = useDispatch();
    const calendaryState = useSelector((state : any) => state.calendary);
    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const [activeCategorias, setActiveCategorias] = useState<string[]>([]);

    const toggleCategoriaBtn = (categoria: string) => {
        if (activeCategorias.includes(categoria)) {
            setActiveCategorias(activeCategorias.filter(cat => cat !== categoria));
        } else {
            setActiveCategorias([...activeCategorias, categoria]);
        }
    };

    const productsItems = [...products, ...services]
        .sort((a, b) => a.title.localeCompare(b.title));

    const [searchQuery, setSearchQuery] = useState('');
    const [chatVisible, setChatVisible] = useState(false);

    const handleSearch = (query: any) => {
        setSearchQuery(query.toLowerCase());
    };

    const resetSearch = () => {
        setSearchQuery(''); // Restablece la búsqueda
    };

    const filteredItems = productsItems.filter((item) => {
        const matchesSearchQuery = item.title.toLowerCase().includes(searchQuery);
        const matchesCategory = activeCategorias.length === 0 || activeCategorias.some(cat => item.category === cat);
        return matchesSearchQuery && matchesCategory;
    });

    const handleSelectProduct = async (card: any) => {
        navigation.navigate('Producto');
    };

    const setNumber = (input: number | string) => {
        if (input) {
            let number = Number(input);
            if (!isNaN(number)) {
                let val = number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                return val;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    const handlePress = () => {
        console.log("Dropdown pressed!");
    };

    const options = [
        { 
          label: 'Option 1', 
          value: "Prueba 1" 
        },
        { 
            label: 'Option 2', 
            value: "Prueba 2" 
        },
        { 
            label: 'Option 2', 
            value: "Prueba 2" 
        },
        { 
            label: 'Option 2', 
            value: "Prueba 2" 
        },
        { 
            label: 'Option 2', 
            value: "Prueba 2" 
        },
        { 
            label: 'Option 2', 
            value: "Prueba 2" 
        },
        { 
            label: 'Option 2', 
            value: "Prueba 2" 
        },
      ];

    return (
        <View style={styles.container}>
            <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
            <View style={styles.searchBar}>
                <SearchBarStore
                    onSearch={handleSearch}
                    resetSearch={resetSearch}
                />
                <View style={styles.topBar}>
                    <View style={styles.containerCategoriaBtn}>
                        <TouchableOpacity
                            onPress={() => toggleCategoriaBtn('Servicios')}
                            style={activeCategorias.includes('Servicios') ? styles.categoriaBtnActive : styles.categoriaBtn}
                        >
                            {activeCategorias.includes('Servicios') ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CloseIcon width={16} height={16} style={{ marginRight: 6, }} />
                                    <Text style={styles.textCategoriaBtnActive}>Servicios</Text>
                                </View>
                            ) : (
                                <Text style={styles.textCategoriaBtn}>Servicios</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => toggleCategoriaBtn('Productos')}
                            style={activeCategorias.includes('Productos') ? styles.categoriaBtnActive : styles.categoriaBtn}
                        >
                            {activeCategorias.includes('Productos') ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CloseIcon width={16} height={16} style={{ marginRight: 6, }} />
                                    <Text style={styles.textCategoriaBtnActive}>Productos</Text>
                                </View>
                            ) : (
                                <Text style={styles.textCategoriaBtn}>Productos</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerIcons}>
                        <TouchableOpacity>
                            <FilterIcon width={22} height={22} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AgendarIcon width={22} height={22} />
                        </TouchableOpacity>
                    </View>
                </View>
                {filteredItems.length > 0 ? (
                    <ScrollView>

                        <CircleButton text="Boton" icon={AgendarIcon} />

                        <StoreBannerCard cards={productCards}/>
                        <View style={styles.productsContainer}>
                            {filteredItems.map((item, index) => (
                                <TouchableOpacity onPress={() => handleSelectProduct(item)} key={`${item.id}_${index}`} style={styles.product}>
                                    <Image source={item.image} style={styles.productImage} />
                                    <TouchableOpacity onPress={() => handleSelectProduct(item)} style={styles.agregarBtn}>
                                        <AgregarIcon width={27} height={27} />
                                    </TouchableOpacity>
                                    <View style={styles.productInfo}>
                                        <Text style={styles.productCategory}>{item.type}</Text>
                                        <Text style={styles.productTitle}>{item.title}</Text>
                                        <Text style={styles.productPriceBefore}>Antes ${setNumber(item.price_old)}</Text>
                                        <Text style={styles.productPrice}>${setNumber(item.price)}</Text>
                                        <TouchableOpacity onPress={() => handleSelectProduct(item)} style={styles.comprarBtn}>
                                            <Text style={styles.textComprarBtn}>
                                                Comprar
                                            </Text>
                                            <AgendarWhiteIcon width={16} height={16} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>No se encontraron servicios relacionados a tu búsqueda.</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        position: "relative",
    },
    searchBar: {
        top: 20
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerCategoriaBtn: {
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 5,
        marginBottom: 10,
        gap: 10,
    },
    categoriaBtn: {
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
    },
    textCategoriaBtn: {
        fontSize: 12,
        fontFamily: MyFont.regular,
        paddingTop: 2,
        color: '#00967F',
    },
    categoriaBtnActive: {
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 20,
        backgroundColor: '#9FEDE2',
    },
    textCategoriaBtnActive: {
        fontSize: 12,
        fontFamily: MyFont.regular,
        paddingTop: 2,
        color: 'black',
    },
    containerIcons: {
        flexDirection: 'row',
        gap: 10,
        marginRight: 16,
    },
    title: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: MyColors.secondary,
        marginBottom: 8,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 300,
    },
    product: {
        position: 'relative',
        flexBasis: '50%',
        marginBottom: 10,
        overflow: 'hidden',
        padding: 10,
    },
    productInfo: {
        
    },
    productImage: {
        width: '100%',
        height: 160,
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
        fontSize: 18,
        fontFamily: MyFont.bold,
        color: '#000000',
        marginBottom: 14,
    },
    productPriceBefore: {
        fontSize: 14,
        fontFamily: MyFont.regular,
        color: '#909090',
    },
    productPrice: {
        fontSize: 21,
        fontFamily: MyFont.medium,
        color: '#00D0B1',
    },
    // Estilos boton comprar:
    comprarBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#000000',
        padding: 15,
        marginTop: 15,
        gap: 8,
        borderRadius: 14,
    },
    textComprarBtn: {
        fontSize: 13,
        fontFamily: MyFont.regular,
        color: '#ffffff',
    },
    agregarBtn: {
        position: 'absolute',
        top: 16,
        right: 18,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(265, 265, 265, 0.3)',
        padding: 3,
        borderRadius: 18,
    },
    noResultsContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
    },
    noResultsText: {
        fontSize: 14,
        fontFamily: MyFont.regular,
        color: '#404040',
    },
});

export default Tienda;