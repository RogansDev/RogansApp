import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MyStyles, MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from "../../../Presentation/theme/Icons";

// Desestructuración de los íconos necesarios
const { 
  ArrowDropdown, 
  ArgentinaIcon, 
  BoliviaIcon, 
  BrasilIcon, 
  ChileIcon, 
  ColombiaIcon, 
  EcuadorIcon, 
  EstadosunidosIcon, 
  GuyanaIcon, 
  ParaguayIcon, 
  PeruIcon, 
  SurinamIcon, 
  UruguayIcon, 
  VenezuelaIcon, 
  CanadaIcon 
} = Icons;

interface Country {
  label: string;
  code: string;
  icon: React.ReactNode;
}

interface PhoneInputProps {
  onPhoneChange: (phone: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  onPhoneChange = () => {},
  disabled = false,
  placeholder = "Teléfono*",
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const animation = useRef(new Animated.Value(0)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;

  const countries: Country[] = [
    { label: "Argentina", code: "54", icon: <ArgentinaIcon width={20} height={20} /> },
    { label: "Bolivia", code: "591", icon: <BoliviaIcon width={20} height={20} /> },
    { label: "Brazil", code: "55", icon: <BrasilIcon width={20} height={20} /> },
    { label: "Chile", code: "56", icon: <ChileIcon width={20} height={20} /> },
    { label: "Colombia", code: "57", icon: <ColombiaIcon width={20} height={20} /> },
    { label: "Ecuador", code: "593", icon: <EcuadorIcon width={20} height={20} /> },
    { label: "Guyana", code: "592", icon: <GuyanaIcon width={20} height={20} /> },
    { label: "Paraguay", code: "595", icon: <ParaguayIcon width={20} height={20} /> },
    { label: "Peru", code: "51", icon: <PeruIcon width={20} height={20} /> },
    { label: "Suriname", code: "597", icon: <SurinamIcon width={20} height={20} /> },
    { label: "Uruguay", code: "598", icon: <UruguayIcon width={20} height={20} /> },
    { label: "Venezuela", code: "58", icon: <VenezuelaIcon width={20} height={20} /> },
    { label: "Estados Unidos", code: "1", icon: <EstadosunidosIcon width={20} height={20} /> },
    { label: "Canada", code: "1", icon: <CanadaIcon width={20} height={20} /> },
  ];

  const maxHeight = Math.min(countries.length * 55, 200);

  const handleDropdownPress = () => {
    if (disabled) return;

    if (isDropdownOpen) {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(arrowRotation, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setDropdownOpen(false);
        setSearchTerm("");
      });
    } else {
      setDropdownOpen(true);
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(arrowRotation, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    setSearchTerm("");
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    const fullPhoneNumber = selectedCountry ? `+${selectedCountry.code} ${text}` : text;
    onPhoneChange(fullPhoneNumber);
  };

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const arrowAnimatedStyle = {
    transform: [
      {
        rotate: arrowRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
      { translateX: -4 },
    ],
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity onPress={handleDropdownPress} activeOpacity={1}>
          <View
            style={[
              styles.inputContainer,
              disabled && styles.inputDisabled,
              isDropdownOpen && styles.inputFocused,
            ]}
          >
            <Text style={styles.selectedText}>
              {selectedCountry ? `+${selectedCountry.code}` : "+57"}
            </Text>
            <Animated.View style={arrowAnimatedStyle}>
              <ArrowDropdown width={20} height={20} style={styles.arrowIcon} />
            </Animated.View>
          </View>
        </TouchableOpacity>

        {/* Vertical line separator */}
        <View style={styles.separator} />

        <TextInput
          style={[styles.phoneNumberInput, disabled && styles.inputDisabled]}
          placeholder={placeholder}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          editable={!disabled}
          keyboardType="phone-pad"
        />
      </View>

      {isDropdownOpen && (
        <Animated.View style={[styles.dropdown, animatedStyle]}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              editable={!disabled}
            />
          </View>
          <ScrollView style={styles.dropdownContent}>
            {filteredCountries.map((country: Country, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleCountrySelect(country)}
                activeOpacity={0.7}
              >
                {country.icon}
                <Text style={styles.optionText}>{country.label} (+{country.code})</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderWidth: 2,
    borderColor: MyColors.verde[1],
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 15,
    backgroundColor: MyColors.base,
    zIndex: 1000,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 1,
    paddingLeft: 15,
    paddingRight: 10,
    borderColor: MyColors.neutroDark[2],
    flex: 0.4,
    backgroundColor: MyColors.fondos[2],
    borderRadius: 8,
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: MyColors.neutroDark[2], 
    marginHorizontal: 10, 
  },
  phoneNumberInput: {
    flex: 1,
    backgroundColor: MyColors.base,
    fontFamily: MyFont.regular,
    fontSize: MyFont.size[6],
    color: MyColors.neutro[2],
  },
  dropdown: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: MyColors.neutro[4],
    borderColor: MyColors.neutroDark[2],
    zIndex: 1000,
    overflow: "hidden",
  },
  dropdownContent: {
    backgroundColor: MyColors.base,
  },
  searchContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: MyColors.neutroDark[2],
    backgroundColor: MyColors.base,
  },
  searchInput: {
    backgroundColor: MyColors.fondos[2],
    padding: 8,
    fontFamily: MyFont.regular,
    fontSize: MyFont.size[6],
    color: MyColors.neutro[2],
    borderRadius: 5,
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
    marginLeft: 10,
  },
  selectedText: {
    fontSize: MyFont.size[6],
    fontFamily: MyFont.regular,
    color: MyColors.neutro[2],
  },
  arrowIcon: {
    marginLeft: 8,
  },
  inputDisabled: {
    backgroundColor: MyColors.neutro[3],
  },
  inputFocused: {
    borderColor: MyColors.verde[1],
  },
});

export default PhoneInput;
