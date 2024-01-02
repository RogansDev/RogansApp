import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../App';
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import SearchBar from '../../../Presentation/components/SearchBar';
import Icons from '../../../Presentation/theme/Icons';
import { consultCards, procedureCards } from '../Servicios/ServicesData';
import { useAppContext } from '../../../../AppContext';

const Servicios = () => {
    const { CalendarEditIcon, CloseIcon } = Icons;

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    const [activeCategorias, setActiveCategorias] = useState<string[]>([]);

    const toggleCategoriaBtn = (categoria: string) => {
        if (activeCategorias.includes(categoria)) {
            setActiveCategorias(activeCategorias.filter(cat => cat !== categoria));
        } else {
            setActiveCategorias([...activeCategorias, categoria]);
        }
    };

    const consultCardsWithCategory = consultCards.map(item => ({ ...item, category: 'Consultas' }));
    const procedureCardsWithCategory = procedureCards.map(item => ({ ...item, category: 'Procedimientos' }));


    const servicesItems = [...consultCardsWithCategory, ...procedureCardsWithCategory]
    .sort((a, b) => a.title.localeCompare(b.title));

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearch = (query: any) => {
        setSearchQuery(query.toLowerCase());
    };

    const toggleSearchBar = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const resetSearch = () => {
        setSearchQuery(''); // Restablece la búsqueda
        toggleSearchBar(); // Oculta la barra de búsqueda
    };

    const filteredItems = servicesItems.filter((item) => {
        const matchesSearchQuery = item.title.toLowerCase().includes(searchQuery);
        const matchesCategory = activeCategorias.length === 0 || activeCategorias.some(cat => item.category === cat);
        return matchesSearchQuery && matchesCategory;
    });

    const { selectedCard, setSelectedCard } = useAppContext();

    const handleSelectCard = async (card: any) => {
        setSelectedCard(card);
        if (card.category === 'Consultas') {
            navigation.navigate('DescripcionConsultas');
        } else {
            navigation.navigate('DescripcionProcedimientos');
        }
        
    };

    return (
      <View style={styles.container}>
        <FloatingMenu />
        <SearchBar
            onSearch={handleSearch}
            resetSearch={resetSearch}
            isSearchVisible={isSearchVisible}
            toggleSearchBar={toggleSearchBar}
        />
        <View style={styles.containerCategoriaBtn}>
            <TouchableOpacity 
                onPress={() => toggleCategoriaBtn('Consultas')}
                style={activeCategorias.includes('Consultas') ? styles.categoriaBtnActive : styles.categoriaBtn}
            >
                {activeCategorias.includes('Consultas') ? (
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <CloseIcon width={16} height={16} style={{marginRight: 6,}} />
                        <Text style={styles.textCategoriaBtnActive}>Consultas</Text>
                    </View>
                ) : (
                    <Text style={styles.textCategoriaBtn}>Consultas</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => toggleCategoriaBtn('Procedimientos')}
                style={activeCategorias.includes('Procedimientos') ? styles.categoriaBtnActive : styles.categoriaBtn}
            >
                {activeCategorias.includes('Procedimientos') ? (
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <CloseIcon width={16} height={16} style={{marginRight: 6,}} />
                        <Text style={styles.textCategoriaBtnActive}>Procedimientos</Text>
                    </View>
                ) : (
                    <Text style={styles.textCategoriaBtn}>Procedimientos</Text>
                )}
            </TouchableOpacity>
        </View>
        <Text style={styles.title}>Lo que ofrecemos para ti</Text>
        {filteredItems.length > 0 ? (
                <ScrollView>
                <View style={styles.consultationsContainer}>
                    {filteredItems.map((item, index) => (
                    <View key={`${item.id}_${index}`} style={styles.consultation}>
                        <Image source={item.image} style={styles.consultationImage} />
                        <View style={styles.consultationInfo}>
                            <Text style={styles.consultationTitle}>{item.title}</Text>
                            <TouchableOpacity onPress={() => handleSelectCard(item)} style={styles.agendarBtn}>
                            <CalendarEditIcon style={styles.iconAgendarBtn} width={16} height={16}/>
                            <Text style={styles.textAgendarBtn}>
                                Agendar
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    ))}
                </View>
                </ScrollView>
            ) : (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No se encontraron servicios relacionados a tu búsqueda.</Text>
                </View>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        position: "relative",
    },
    containerCategoriaBtn: {
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 15,
        marginBottom: 20,
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
    title: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: MyColors.secondary,
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    consultationsContainer: {
      marginBottom: 100,
      paddingHorizontal: 16,
    },
    consultation: {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 15,
      marginBottom: 12,
    },
    consultationInfo: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 20,
      paddingRight: 25,
      paddingLeft: 15,
      paddingBottom: 15,
    },
    consultationImage: {
      width: 143,
      height: 111,
      borderRadius: 15,
    },

    consultationTitle: {
      fontSize: 18,
      fontFamily: MyFont.medium,
      color: '#404040',
      marginBottom: 30,
    },
    // Estilos boton agendar:
    agendarBtn: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    iconAgendarBtn: {
      marginRight: 10,
    },
    textAgendarBtn: {
      fontSize: 13,
      fontFamily: MyFont.regular,
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

export default Servicios;