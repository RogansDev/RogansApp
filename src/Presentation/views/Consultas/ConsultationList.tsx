import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MyColors, MyFont } from "../../../../src/Presentation/theme/AppTheme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../utils/RootParamList';
import { setCalendaryInfo } from '../../../state/CalendarySlice';
import FloatingMenu from "../../../Presentation/components/FloatingMenu";
import Icons from "../../../Presentation/theme/Icons";
import { consultCards } from '../Servicios/ServicesData';


const Cosultationlist = () => {
  const { CalendarEditIcon } = Icons;
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

  const [chatVisible, setChatVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Consultas para ti</Text>
        <View style={styles.consultationsContainer}>
          {consultCards.map((item, index) => (
            <TouchableOpacity key={index} style={styles.consultation} onPress={() => handleSelectCard(item)}>
              <Image source={item.image} style={styles.consultationImage} />
              <View style={styles.consultationInfo}>
                <View>
                  <Text style={styles.consultationTitle}>{item.title}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => handleSelectCard(item)}
                    style={styles.agendarBtn}
                  >
                    <CalendarEditIcon
                      style={styles.iconAgendarBtn}
                      width={16}
                      height={16}
                    />
                    <Text style={styles.textAgendarBtn}>Agendar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    position: "relative",
  },
  content: {
    top: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: MyFont.medium,
    color: MyColors.secondary,
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  consultationsContainer: {
    marginBottom: 130,
    paddingHorizontal: 16,
  },
  consultation: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 12,
    height: 111,
  },
  consultationInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingRight: 25,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  consultationImage: {
    width: 143,
    height: '100%',
    borderRadius: 15,
  },

  consultationTitle: {
    fontSize: 18,
    fontFamily: MyFont.medium,
    color: "#404040",
  },
  // Estilos boton agendar:
  agendarBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconAgendarBtn: {
    marginRight: 10,
  },
  textAgendarBtn: {
    fontSize: 13,
    fontFamily: MyFont.regular,
  },
});

export default Cosultationlist;
