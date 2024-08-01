import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MyStyles } from "../../../Presentation/theme/AppTheme";

const Button = ({ text = "", width = '100%', pressAction = () => {}, disabled = false }:any ) => {
    return (
        <View style={{zIndex: 1000}}>
            <TouchableOpacity
            onPress={disabled ? null : pressAction}
            style={[MyStyles.button, { width }, disabled ? MyStyles.buttonDisabled : MyStyles.buttonEnabled]}
            disabled={disabled}
        >
            <Text style={[MyStyles.textButton, disabled ? MyStyles.textButtonDisabled : MyStyles.textButtonEnabled]}>{text}</Text>
        </TouchableOpacity>
        </View>
    )
}

export default Button;