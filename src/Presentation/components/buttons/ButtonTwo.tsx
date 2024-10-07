import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MyStyles } from "../../../Presentation/theme/AppTheme";

const Button = ({ text = "", width = '100%', icon: Icon, iconSize = { width: 16, height: 16 }, pressAction = () => {}, disabled = false }:any ) => {
    return (
        <View style={{zIndex: 1000}}>
            <TouchableOpacity
            onPress={disabled ? null : pressAction}
            style={[MyStyles.buttonTwo, { width }, disabled ? MyStyles.buttonDisabledTwo : MyStyles.buttonEnabledTwo]}
            disabled={disabled}
        >
            <Text style={[MyStyles.textButtonTwo, disabled ? MyStyles.textButtonDisabledTwo : MyStyles.textButtonEnabledTwo]}>{text}</Text>
            {Icon && <Icon width={iconSize.width} height={iconSize.height} />}
        </TouchableOpacity>
        </View>
    )
}

export default Button;