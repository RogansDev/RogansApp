import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MyStyles, MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Checkbox from "expo-checkbox";
import Icons from "../../../Presentation/theme/Icons";

interface Option {
  label: string;
  value: string;
}

interface InputDropdownProps {
  placeholder?: string;
  width?: any;
  icon?: React.ComponentType<any>;
  iconSize?: { width: number; height: number };
  options: Option[];
  onSelectionChange: (selected: Option[]) => void;
  disabled?: boolean;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
  placeholder = "Select options",
  width = "100%",
  icon: Icon,
  iconSize = { width: 16, height: 16 },
  options = [],
  onSelectionChange = () => {},
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const animation = useRef(new Animated.Value(0)).current;

  const maxHeight = Math.min(options.length * 55, 200);

  const { ArrowDropdown } = Icons

  const handlePress = () => {
    if (disabled) return;

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
      setIsOpen(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleOptionToggle = (item: Option) => {
    setSelectedOptions((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(item.value)) {
        updatedSelection.delete(item.value);
      } else {
        updatedSelection.add(item.value);
      }
      onSelectionChange(options.filter(option => updatedSelection.has(option.value)));
      return updatedSelection;
    });
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
    <View style={[MyStyles.inputDropdownContainer, { width, position: "relative", zIndex: 1000 }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <View
          style={[
            MyStyles.input,
            disabled && MyStyles.inputDisabled,
            isOpen && MyStyles.inputFocused,
            styles.inputContainer,
          ]}
        >
          <Text style={styles.selectedText}>
            {selectedOptions.size > 0
              ? options.filter(option => selectedOptions.has(option.value)).map(option => option.label).join(", ")
              : placeholder}
          </Text>
          <ArrowDropdown width={16} height={16} />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View style={[styles.dropdown, animatedStyle]}>
          <ScrollView style={styles.dropdownContent}>
            {options.map((item: Option, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleOptionToggle(item)}
                activeOpacity={0.7}
              >
                <Checkbox
                  value={selectedOptions.has(item.value)}
                  onValueChange={() => handleOptionToggle(item)}
                  style={styles.checkbox}
                  color={selectedOptions.has(item.value) ? MyColors.verde[1] : undefined}
                />
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  dropdown: {
    position: "absolute",
    top: 65,
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
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: MyFont.size[6],
    fontFamily: MyFont.regular,
    color: MyColors.neutro[2],
    marginLeft: 8,
  },
  selectedText: {
    fontSize: MyFont.size[6],
    fontFamily: MyFont.regular,
    color: MyColors.neutro[2],
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: MyColors.neutroDark[2],
    marginRight: 10,
  },
});

export default InputDropdown;
