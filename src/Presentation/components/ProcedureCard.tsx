import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../App';
import { MyFont } from "../theme/AppTheme";
import { useAppContext } from '../../../AppContext';
import Icons from '../theme/Icons';

const ConsultCard = ({ cards }: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const { selectedCard, setSelectedCard } = useAppContext();

  const { CalendarAddIcon } = Icons;

  const handleSelectCard = async (card: any) => {
    setSelectedCard(card)
    navigation.navigate('DescripcionProcedimientos');
  };

  function formatearPrecio(numeroStr: any) {
      if (!/^\d+$/.test(numeroStr)) {
        return numeroStr;
      }
    
      let caracteres = numeroStr.split('');
      caracteres.reverse();
    
      for (let i = 3; i < caracteres.length; i += 4) {
        caracteres.splice(i, 0, '.');
      }
    
      return ('$' + caracteres.reverse().join(''));
  }

  return (
    <ScrollView horizontal style={styles.cardContainer} showsHorizontalScrollIndicator={false}>
      {cards.map((card: { image: ImageSourcePropType; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; precio_cita: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; departamento: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardCategory}>{card.departamento}</Text>
          <TouchableOpacity onPress={() => handleSelectCard(card)} style={styles.overlay} />
          <Image source={card.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{card.title}</Text>
          <View style={styles.cardInfo}>
            <View>
              <Text style={styles.text}>Valor consulta</Text>
              <Text style={styles.cardPrice}>{formatearPrecio(card.precio_cita)}</Text>
            </View>
            <TouchableOpacity onPress={() => handleSelectCard(card)} style={styles.comprarBtn}>
              <CalendarAddIcon width={16} height={16} />
              <Text style={styles.textComprarBtn}>Agendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    position: "relative",
    paddingHorizontal: 16,
  },
  card: {
    marginRight: 8,
    width: 218,
    height: 'auto',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 24,
  },
  cardCategory: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: MyFont.regular,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 14,
    overflow: 'hidden',
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: '100%',
    height: 170,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    zIndex: 2,
  },
  cardImage: {
    position: 'relative',
    width: '100%',
    height: 170,
    resizeMode: 'cover',
    borderRadius: 16,
    zIndex: 1,
  },
  cardTitle: {
    position: 'relative',
    fontSize: 14,
    fontFamily: MyFont.medium,
    color: '#404040',
    textAlign: 'left',
    marginTop: 14,
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  text: {
    fontSize: 12,
    fontFamily: MyFont.regular,
    color: 'black',
    textAlign: 'left',
  },
  cardPrice: {
    fontSize: 13,
    fontFamily: MyFont.regular,
    color: '#909090',
    textAlign: 'left',
  },
  comprarBtn: {
    flexDirection: 'row',
    gap: 6,
  },
  iconComprarBtn: {
    marginRight: 10,
  },
  textComprarBtn: {
    fontSize: 13,
    fontFamily: MyFont.regular,
  },
});

export default ConsultCard;
