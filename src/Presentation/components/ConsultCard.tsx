import React, { Key } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../App';
import { MyFont } from "../theme/AppTheme";
import Icons from '../theme/Icons';
import { useAppContext } from '../../../AppContext';

const ConsultCard = ({cards}: any) => {

  const { AgendarIcon } = Icons;
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const { selectedCard, setSelectedCard } = useAppContext();

  const handleSelectCard = async (card: any) => {
    setSelectedCard(card)
    navigation.navigate('DescripcionConsultas');
  };

  return (
    <ScrollView horizontal style={styles.cardContainer} showsHorizontalScrollIndicator={false}>
      {cards.map((card: {
        id: Key | null | undefined; category?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; image: ImageSourcePropType; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
      }) => (
        <View key={card.id} style={styles.card}>
          <View style={styles.overlay} />
          <Image source={card.image} style={styles.cardImage} />
          <Text style={styles.cardText}>{card.title}</Text>
          <TouchableOpacity 
             onPress={() => handleSelectCard(card)}
              style={styles.agendarBtn}
          >
            <Text style={styles.textAgendarBtn}>Agendar cita</Text>
            <AgendarIcon style={styles.iconAgendarBtn} width={16} height={16}/>
          </TouchableOpacity>
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 12,
    width: 218,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardCategory: {
    position: 'absolute',
    top: 10,
    left: 10,
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
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2,
  },
  cardImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 1,
  },
  cardText: {
    position: 'relative',
    width: '88%',
    marginBottom: 10,
    fontSize: 18,
    fontFamily: MyFont.medium,
    color: 'white',
    textAlign: 'left',
    zIndex: 10,
  },
  // Estilos boton Agendar cita:
  agendarBtn: {
    position: 'relative',
    width: '88%',
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textAgendarBtn: {
    fontSize: 13,
    fontFamily: MyFont.regular,
    color: 'black',
  },
  iconAgendarBtn: {
    marginLeft: 6,
  },
});

export default ConsultCard;
