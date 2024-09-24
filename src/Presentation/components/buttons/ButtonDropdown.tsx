import React, { useState, useRef, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Animated, Easing } from "react-native";
import { MyStyles, MyColors, MyFont } from "../../../Presentation/theme/AppTheme";

const ButtonDropdown = ({
    text = "",
    width = "100%",
    icon: Icon,
    iconSize = { width: 16, height: 16 },
    options = [],
    pressAction = () => {},
    disabled = false,
}: any) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    
    const maxHeight = options.length * 55;

    const handlePress = () => {
        if (!disabled) {
            if (isOpen) {
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start(() => {
                    setIsOpen(false);
                });
            } else {
                setIsMounted(true);
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start(() => {
                    setIsOpen(true);
                });
            }
            pressAction();
        }
    };

    const animatedStyle = {
        height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, maxHeight],
            extrapolate: "clamp",
        }),
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
        }),
    };

    return (
        <View style={{ width, position: "relative", zIndex: 1000 }}>
            <TouchableOpacity
                onPress={handlePress}
                style={[
                    MyStyles.buttonDropdown,
                    disabled ? MyStyles.buttonDisabled : MyStyles.buttonEnabled,
                ]}
                disabled={disabled}
            >
                <Text
                    style={[
                        MyStyles.textButton,
                        disabled ? MyStyles.textButtonDisabled : MyStyles.textButtonEnabled,
                    ]}
                >
                    {text}
                </Text>
                {Icon && <Icon width={iconSize.width} height={iconSize.height} />}
            </TouchableOpacity>

            {isMounted && (
                <Animated.View style={[styles.dropdown, animatedStyle]}>
                    <View style={styles.dropdownContent}>
                        {options.map((item: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => {
                                    Animated.timing(animation, {
                                        toValue: 0,
                                        duration: 200,
                                        easing: Easing.linear,
                                        useNativeDriver: false,
                                    }).start(() => {
                                        setIsOpen(false);
                                        setIsMounted(false);
                                    });
                                    item.onPress();
                                }}
                            >
                                <Text style={styles.optionText}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        position: "absolute",
        top: 67,
        left: 0,
        right: 0,
        backgroundColor: MyColors.neutro[4],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: MyColors.neutroDark[2],
        zIndex: 1000,
        overflow: "hidden",
    },
    dropdownContent: {
        backgroundColor: MyColors.base,
    },
    option: {
        height: 55,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    optionText: {
        fontSize: MyFont.size[6],
        fontFamily: MyFont.regular,
        color: MyColors.neutro[2],
    },
});

export default ButtonDropdown;
