import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MyStyles } from "../../../Presentation/theme/AppTheme";

const ButtonSmall = ({ text = "", width = '100%', pressAction = () => {}, disabled = false }:any ) => {
    return (
        <View style={{zIndex: 1000}}>
            <TouchableOpacity
            onPress={disabled ? null : pressAction}
            style={[MyStyles.buttonSmall, { width }, disabled ? MyStyles.buttonDisabled : MyStyles.buttonEnabledSmall]}
            disabled={disabled}
        >
            <Text style={[MyStyles.textButton, disabled ? MyStyles.textButtonDisabled : MyStyles.textButtonEnabled]}>{text}</Text>
        </TouchableOpacity>
        </View>
    )
}

export default ButtonSmall;