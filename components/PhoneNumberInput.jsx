import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  useColorScheme,
  Text,
  Keyboard,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";

const PhoneNumberInput = ({
  value,
  onPhoneNumberChange,
  onCountryChange,
  getPhoneNumber,
}) => {
  const [selectedCountry, setSelectedCountry] = useState({
    cca2: "PK",
    callingCode: "92",
  });
  const isDarkMode = useColorScheme() === "dark";

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    onCountryChange({ countryCode: country.cca2, countryName: country.name });
  };

  const handlePhoneNumberChange = (text) => {
    const formattedText = text.startsWith("+" + selectedCountry.callingCode)
      ? text.substring(selectedCountry.callingCode.length + 1)
      : text;
    onPhoneNumberChange(formattedText);
  };

  useEffect(() => {
    getPhoneNumber(value);
  }, [value]);

  return (
    <View style={[styles.lightTextInput]}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <CountryPicker
            countryCode={selectedCountry.cca2}
            withFlagButton={true}
            withFilter={true}
            withFlag={true}
            onSelect={handleCountryChange}
          />
          <Ionicons
            name="chevron-down"
            size={20}
            color={isDarkMode ? "gray" : "black"}
            style={{ marginRight: 10 }}
          />
        </View>
        <View style={{ flexDirection: "row", width: "70%" }}>
          <Text style={[{ marginRight: 20, fontSize: 20, fontWeight: "500" }]}>
            +{selectedCountry.callingCode}
          </Text>
          <TextInput
            textContentType="telephoneNumber"
            placeholder="123 456 7890"
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            maxLength={15}
            onChangeText={handlePhoneNumberChange}
            value={value}
            style={styles.inputColor}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },

  lightTextInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    color: "#fff",
    borderBottomColor: "#000",
  },
  lightInputFocus: {
    borderColor: "#7593BD",
    borderWidth: 2,
    fontSize: 16,
  },
  darkInputFocus: {
    borderColor: "#E2E2E2",
    borderWidth: 2,
    fontSize: 16,
  },

  inputColor: {
    color: "gray",
    width: "auto",
    fontSize: 18,
  },

  countryCode: {
    color: "grey",
  },
});

export default PhoneNumberInput;
