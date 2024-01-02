import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import { Props } from 'react-calendly/typings/components/InlineWidget/InlineWidget';


interface MyProps extends Props {
    title: string,
    onPress: () => Promise<void>;
}

const RoundedBottom = ({title, onPress}: any) => {
  return (
    <TouchableOpacity  
       style={styles.roundedBottom}
       onPress={onPress}
    >
        <Text style={styles.textBottom}>{title}</Text>
    </TouchableOpacity>
  )
};

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

export default RoundedBottom
