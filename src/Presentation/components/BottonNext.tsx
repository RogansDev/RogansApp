import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View } from 'react-native' 
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../App';
import Icons from "../theme/Icons";

interface Props {
  text: string,
}

const BottonNext = ({text}: Props) => {
  const { Arrow } = Icons;

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Martin')}
      style={styles.roundedBottom}
    >
      <View style={styles.contentNext}>
        <Text style={styles.textBottom}>
          {text}
        </Text>
        <Arrow width={20} height={20}  style={styles.icon}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  roundedBottom: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: MyColors.buttonColor,
    justifyContent: 'center',
    borderRadius: 15,
  },
  contentNext: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    left: 10,
    top: 6,
    
  },
  textBottom: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: MyFont.regular,
  }
})

export default BottonNext;

