import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native' 
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../App';

interface Props {
  text: string,
}

const BottonHome = ({text}: Props) => {
  
    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    return (
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.roundedBottom}
        >
          <Text style={styles.textBottom}>{text}</Text>
        </TouchableOpacity>
      );
    };
    
    const styles = StyleSheet.create({
      roundedBottom: {
        width: "100%",
        height: 50,
        alignItems: "center",
        backgroundColor: MyColors.buttonColor,
        justifyContent: "center",
        borderRadius: 15,
      },
      textBottom: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: MyFont.regular,
      },
    });
    

export default BottonHome;
