import React, { useState, useRef, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Animated, Easing } from "react-native";
import { MyStyles, MyColors, MyFont, MyFontColors } from "../../../Presentation/theme/AppTheme";

const ButtonDropdown = ({ text = "", width = '100%', icon: Icon, iconSize = { width: 16, height: 16 }, options = [], pressAction = () => {}, disabled = false }: any) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const [dropdownHeight, setDropdownHeight] = useState(0);

    const handlePress = () => {
        if (!disabled) {
            setDropdownVisible(!dropdownVisible);
            pressAction();
        }
    };

    useEffect(() => {
        if (dropdownVisible) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        }
    }, [dropdownVisible]);

    const animatedStyle = {
        height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, dropdownHeight],
            extrapolate: 'clamp',
        }),
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
    };

    return (
        <View style={{ width, position: 'relative', zIndex: 1000 }}>
            <TouchableOpacity
                onPress={handlePress}
                style={[MyStyles.button, disabled ? MyStyles.buttonDisabled : MyStyles.buttonEnabled]}
                disabled={disabled}
            >
                <Text style={[MyStyles.textButton, disabled ? MyStyles.textButtonDisabled : MyStyles.textButtonEnabled]}>{text}</Text>
                {Icon && <Icon width={iconSize.width} height={iconSize.height} />}
            </TouchableOpacity>
            
            <Animated.View style={[styles.dropdown, animatedStyle]}>
                <View
                    onLayout={(event) => {
                        if (dropdownHeight === 0) {
                            setDropdownHeight(event.nativeEvent.layout.height);
                        }
                    }}
                    style={styles.dropdownContent}
                >
                    {options.map((item: any, index: any) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.option}
                            onPress={() => {
                                setDropdownVisible(false);
                                item.onPress();
                            }}
                        >
                            <Text style={styles.optionText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        top: 45, // Adjust based on your button height
        left: 0,
        right: 0,
        backgroundColor: MyColors.base,
        borderRadius: 10,
        zIndex: 1000,
        overflow: 'hidden',
    },
    dropdownContent: {
        backgroundColor: MyColors.base, // Ensure background color is set
        padding: 10,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: MyColors.gray,
    },
    optionText: {
        fontSize: MyFont.size[5],
        fontFamily: MyFont.regular,
        color: MyColors.black,
    },
});

export default ButtonDropdown;
