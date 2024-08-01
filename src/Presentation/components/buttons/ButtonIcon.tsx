import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MyStyles } from "../../../Presentation/theme/AppTheme";

const ButtonIcon = ({ text = "", width = '100%', icon: Icon, iconSize = { width: 16, height: 16 }, pressAction = () => {}, disabled = false }: any) => {
    return (
        <TouchableOpacity
            onPress={disabled ? null : pressAction}
            style={[MyStyles.button, { width }, disabled ? MyStyles.buttonDisabled : MyStyles.buttonEnabled]}
            disabled={disabled}
        >
            <Text style={[MyStyles.textButton, disabled ? MyStyles.textButtonDisabled : MyStyles.textButtonEnabled]}>{text}</Text>
            {Icon && <Icon width={iconSize.width} height={iconSize.height} />}
        </TouchableOpacity>
    );
}

export default ButtonIcon;
