import React from 'react';
import { View, Text, StyleSheet, KeyboardType, TextInput } from 'react-native';
import { Svg } from 'react-native-svg';
import { MyFont } from '../theme/AppTheme';


interface Props {
   title: string,
   placeholder: string,
   value: string,
   keyboardType: KeyboardType,
   secureTextEntry?: boolean,
   property: string,
   onChangeText: (property: string, value: any) => void
}


const CustomTextInput = ({
    title,
    placeholder,
    value,
    keyboardType,
    secureTextEntry = false,
    onChangeText,
    property
}: Props) => {

  
  return (
    <View>
    <View style={styles.titleModalButton}>
      <Text style={styles.text1TitleModalButton}>
        {title}
      </Text>
      <Text style={styles.text2TitleModalButton}>(Requerido)</Text>
    </View>
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles.formTextInput}
      value={value}
      secureTextEntry={false}
      onChangeText={(text) => onChangeText(property, text)}
    />
  </View>
  )
}

const styles = StyleSheet.create({
    titleModalButton: {
        flexDirection: "row",
        position: "absolute",
        top: 2,
        left: 18,
        padding: 2,
        backgroundColor: "white",
        zIndex: 10,
        
      },
      text1TitleModalButton: {
        fontSize: 11,
        fontFamily: MyFont.regular,
        color: "#404040",
      },
      text2TitleModalButton: {
        fontSize: 10,
        fontFamily: MyFont.regular,
        color: "#C0C0C0",
      },
      formTextInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#404040",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
      },
})
export default CustomTextInput
