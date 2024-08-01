import React, { useState } from "react";
import { TextInput } from "react-native";
import { MyStyles } from "../../../Presentation/theme/AppTheme";

const Input = ({ placeholder = "", value, width = '100%', onChangeInput = () => {}, error = false, disabled = false }: any) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            style={[
                MyStyles.input,
                { width },
                isFocused && MyStyles.inputFocused,
                error && MyStyles.inputError,
                disabled && MyStyles.inputDisabled
            ]}
            onChangeText={onChangeInput}
            value={value}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={!disabled}
        />
    );
}

export default Input;
