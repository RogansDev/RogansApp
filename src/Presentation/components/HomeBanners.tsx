import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../../utils/RootParamList";
import { consultCards, procedureCards } from '../views/Servicios/ServicesData';

const HomeBanners = () => {
  
  
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const initialImages = [
    {
      uri: 'https://rogansya.com/rogans-app/assets/banner1.png',
      route: consultCards
    },
    {
      uri: 'https://rogansya.com/rogans-app/assets/banner2.jpg',
      route: 'Screen2'
    },
    {
      uri: 'https://rogansya.com/rogans-app/assets/banner3.png',
      route: 'Screen3'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const viewportWidth = Dimensions.get('window').width;
  const IMAGE_WIDTH = viewportWidth * 0.8;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 1.05;
  const ITEM_MARGIN_RIGHT = 15;

  // Inicializa un estado para cada punto con un valor animado
  const [animatedWidths, setAnimatedWidths] = useState(
    initialImages.map(() => new Animated.Value(10))
  );

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

  return (
    <View style={{ flex: 1, paddingLeft: 15 }}>
      <FlatList
        ref={flatListRef}
        data={[...initialImages, ...initialImages, ...initialImages]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log(item.route)}
            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT, marginRight: ITEM_MARGIN_RIGHT, borderRadius: 20 }}
          >
            <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
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
            const position = (IMAGE_WIDTH + ITEM_MARGIN_RIGHT) * initialImages.length + (IMAGE_WIDTH + ITEM_MARGIN_RIGHT) * index;
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
