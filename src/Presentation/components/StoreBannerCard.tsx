import React, { Key, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyFont } from "../theme/AppTheme";
import Icons from '../theme/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendaryInfo } from '../../state/CalendarySlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';

const ConsultCard = ({ cards }: any) => {
  const dispatch = useDispatch();
  const calendaryState = useSelector((state : any) => state.calendary);
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const handleSelectCard = async (card: any) => {
    dispatch(setCalendaryInfo({
      ...calendaryState,
      selectedCard: card
    }));
    navigation.navigate('DescripcionConsultas');
  };

  return (
    <ScrollView horizontal style={styles.cardContainer} showsHorizontalScrollIndicator={false}>
      {cards.map((card: {
        id: Key | null | undefined; category?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; image: ImageSourcePropType; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
      }) => (
        <TouchableOpacity key={card.id} style={styles.card} onPress={() => handleSelectCard(card)}>
          <Image source={card.image} style={styles.cardImage} />
        </TouchableOpacity>
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
    width: 240,
    height: 130,
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
});

export default ConsultCard;
