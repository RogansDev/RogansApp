import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendaryInfo } from '../../state/CalendarySlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../../utils/RootParamList";
import { consultCards, procedureCards } from '../views/Servicios/ServicesData';
import useServices from "../../hooks/useServices";
import { setMedicalLineInfo } from '../../state/MedicalLineSlice';

const HomeBanners = () => {  
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const { getServices, services } = useServices();

  const [initialImages, setInitialImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const dispatch = useDispatch();
  const calendaryState = useSelector((state : any) => state.calendary);
  const viewportWidth = Dimensions.get('window').width;
  const IMAGE_WIDTH = viewportWidth * 0.8;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 1.05;
  const ITEM_MARGIN_RIGHT = 15;

  const MedicalLineState = useSelector((state : any) => state.medicalLine);

  useEffect(() => {
    getServices();    
  }, []);

  useEffect(() => {
    if (services) {
      // Este bloque se ejecuta solo cuando 'services' cambia.
      const parsedServices = Array.isArray(services) ? services : JSON.parse(services);
      setInitialImages(parsedServices);
    }
  }, [services]);

  const [animatedWidths, setAnimatedWidths] = useState([]);

  useEffect(() => {
    if (initialImages.length) {
      // Solo reconstruir animatedWidths si initialImages realmente cambió.
      setAnimatedWidths(initialImages.map(() => new Animated.Value(10)));
    }
  }, [initialImages]);

  useEffect(() => {
    // Anima los puntos cuando el currentIndex cambia
    Animated.parallel(
      animatedWidths.map((animatedWidth, index) =>
        Animated.timing(animatedWidth, {
          toValue: index === currentIndex ? 40 : 10, // Ancho mayor para el punto activo
          duration: 150,
          useNativeDriver: false, // 'true' no es compatible con animaciones de estilo no transformadas como 'width'
        })
      )
    ).start();
  }, [currentIndex, animatedWidths]);

  const handleSelectCard = async (card: any, link: any) => {    
    dispatch(setCalendaryInfo({
      ...calendaryState,
      selectedCard: card
    }));
    console.log(calendaryState.selectedCard);
    
    navigation.navigate(link);
  };

  const handleMedicalLine = async (linea: any) => {
    dispatch(setMedicalLineInfo({
      ...MedicalLineState,
      lineaMedica: linea
    }));
    navigation.navigate('Agendamiento');
  };

  return (
    <View style={{ flex: 1, paddingLeft: 15 }}>
      <FlatList
        ref={flatListRef}
        data={[...initialImages, ...initialImages, ...initialImages]} // Multiplicado para el efecto de scroll infinito
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {
            console.log(item.link);
            const linkParts = item.link.split('?'); // Esto dividirá el string en partes separadas por '?'
            if (linkParts[0] === 'nav') {
              // Si el primer segmento es 'nav', navega a la pantalla especificada en el segundo segmento
              navigation.navigate(linkParts[1]);
            } else if (linkParts[0] === 'service') {
              // Si el primer segmento es 'service', extrae correctamente la tarjeta y la pantalla
              const cardIndex = parseInt(linkParts[1].replace('consultCards[', '').replace(']', ''), 10); // Extrae el índice numérico
              const selectedCard = consultCards[cardIndex]; // Usa el índice para obtener la tarjeta correcta
              const screenName = linkParts[2]; // El nombre de la pantalla a la que se debe navegar
        
              if (selectedCard && screenName) {
                handleSelectCard(selectedCard, screenName);
              } else {
                console.error('Invalid link format or undefined card/screen');
              }
            } else if (linkParts[0] === 'web') {
              const url = linkParts[1];
              Linking.openURL(url).catch(err => console.error('An error occurred', err));
            } else if (linkParts[0] === 'consulta') {
              const ruta = linkParts[1];
              handleMedicalLine(ruta);
            } else {
              console.error('Unrecognized link format');
            }
          }}
            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT, marginRight: ITEM_MARGIN_RIGHT, borderRadius: 20 }}
          >
            <Image source={{ uri: item.url_imagen }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        snapToInterval={IMAGE_WIDTH + ITEM_MARGIN_RIGHT}
        decelerationRate="fast"
        onScroll={(event) => {
          const contentOffset = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(contentOffset / (IMAGE_WIDTH + ITEM_MARGIN_RIGHT)) % initialImages.length;
          setCurrentIndex(newIndex);
        }}
        scrollEventThrottle={16}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
        {animatedWidths.map((animatedWidth, index) => (
          <TouchableOpacity key={index} onPress={() => {
            const position = (IMAGE_WIDTH + ITEM_MARGIN_RIGHT) * index;
            flatListRef.current.scrollToOffset({ offset: position, animated: true });
          }}>
            <Animated.View
              style={{
                width: animatedWidth,
                height: 10,
                borderRadius: 5,
                backgroundColor: currentIndex === index ? '#000' : '#ccc',
                margin: 5,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  
};

export default HomeBanners;
