import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MyStyles, MyColors } from "../../../Presentation/theme/AppTheme";

const CircleButton = ({ text = "", backgroundColor = MyColors.verdeDark[1_20], width = '100%', icon: Icon, iconSize = { width: 16, height: 16 }, pressAction = () => {}, disabled = false }: any) => {
    return (
        <TouchableOpacity
            onPress={disabled ? null : pressAction}
            style={[MyStyles.circleButton, { width }, disabled ? MyStyles.circleButtonDisabled : MyStyles.circleButtonEnabled]}
            disabled={disabled}
        >
            <View style={[MyStyles.circleButtonBg, {backgroundColor}]}>
                {Icon && <Icon width={iconSize.width} height={iconSize.height} />}
            </View>
            <Text style={[MyStyles.textCircleButton, disabled ? MyStyles.textCircleButtonDisabled : MyStyles.textCircleButtonEnabled]}>{text}</Text>
        </TouchableOpacity>
    );
}

export default CircleButton;
