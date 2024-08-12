import React, { useState, useRef, useEffect } from "react";
import { TextInput, View, Animated , Text} from "react-native";
import { MyColors, MyStyles } from "../../../Presentation/theme/AppTheme";
import Icons from "../../../Presentation/theme/Icons";

const Input = ({
  placeholder = "",
  initialValue = "",
  width = "100%",
  onChangeInput = () => {},
  error = false,
  errorText = "",
  disabled = false,
  required = false,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);
  const animatedValue = useRef(new Animated.Value(initialValue ? 1 : 0)).current;
    const { ErrorAlert } = Icons;

  const animatePlaceholder = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (isFocused || inputValue) {
      animatePlaceholder(1);
    } else {
      animatePlaceholder(0);
    }
  }, [isFocused, inputValue]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeInput(text);
  };

  const placeholderStyle = {
    position: "absolute" as "absolute",
    left: 10,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 12],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 13],
    }),
    color: MyColors.neutro[4],
    paddingHorizontal: 4,
    flexDirection: "row" as "row",
    alignItems: "center" as "center",
  };

  return (
    <View style={[MyStyles.inputContainer, { width, position: "relative"}, error && { marginBottom: 30 }]}>
      <Animated.Text style={placeholderStyle}>
        {placeholder}
        {required && (
          <Animated.Text style={{ color: MyColors.error[2] }}>
            *
          </Animated.Text>
        )}
      </Animated.Text>
      <TextInput
        style={[
          MyStyles.input,
          { paddingTop: 20 },
          isFocused && MyStyles.inputFocused,
          error && MyStyles.inputError,
          disabled && MyStyles.inputDisabled,
        ]}
        onChangeText={handleChangeText}
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled}
      />
      {error && (
          <View style={MyStyles.InputErrorTextContainer}>
            <ErrorAlert />
            <Text style={MyStyles.InputErrorText}>{errorText}</Text>
          </View>
        )}
    </View>
  );
};

export default Input;
