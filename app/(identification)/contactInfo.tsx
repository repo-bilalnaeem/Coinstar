import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const ContactInfo = () => {
  const { bottom } = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    if (email && selectedCity && address && zip && selectedCountry) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [email, selectedCity, address, zip, selectedCountry]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
  };

  const handleZipChange = (text: string) => {
    setZip(text);
  };

  const countries = [
    { label: "Pakistan", value: "PK" },
    { label: "United States", value: "US" },
    { label: "Canada", value: "CA" },
    { label: "United Kingdom", value: "UK" },
    // Add more countries here
  ];
  const cities = [
    { label: "Sindh", value: "SD" },
    { label: "Punjab", value: "PB" },
    { label: "Balochistan", value: "BP" },
    { label: "Khyber Pakhtunkuwa", value: "KP" },
    { label: "Gilgit", value: "GP" },
    // Add more cities here
  ];

  const setUserInformation = async () => {
    try {
      router.replace("/cardFront");
    } catch (err) {
      console.log("Unable to store either propetries");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 26,
            paddingVertical: 20,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView
            scrollEventThrottle={32}
            automaticallyAdjustContentInsets
            contentInset={{ bottom: 10 }}
          >
            <Text
              style={{
                fontSize: 28,
                lineHeight: 32,
                fontWeight: "600",
                textAlign: "center",
                marginBottom: 18,
                marginTop: 18,
              }}
            >
              Enter your contact{"\n"}information
            </Text>

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                textContentType="emailAddress"
                placeholder="naeem.bilal.work@gmail.com"
                placeholderTextColor="gray"
                keyboardType="email-address"
                maxLength={50}
                onChangeText={handleEmailChange}
                value={email}
                style={styles.inputColor}
              />
            </View>
            <View>
              <Text style={styles.label}>Country</Text>
              <RNPickerSelect
                onValueChange={(value) => setSelectedCountry(value)}
                items={countries}
                style={pickerSelectStyles}
                placeholder={{ label: "Country", value: null, color: "gray" }}
                Icon={() => {
                  return <Ionicons name="arrow-down" size={24} color="gray" />;
                }}
              />
            </View>
            <View>
              <Text style={styles.label}>City</Text>
              <RNPickerSelect
                onValueChange={(value) => setSelectedCity(value)}
                items={cities}
                style={pickerSelectStyles}
                placeholder={{ label: "City", value: null, color: "gray" }}
                Icon={() => {
                  return <Ionicons name="arrow-down" size={24} color="gray" />;
                }}
              />
            </View>
            <View>
              <Text style={styles.label}>Address</Text>
              <TextInput
                textContentType="fullStreetAddress"
                placeholder="23, Saint Boulevard Street"
                placeholderTextColor="gray"
                keyboardType="default"
                onChangeText={handleAddressChange}
                value={address}
                style={styles.inputColor}
              />
            </View>
            <View>
              <Text style={styles.label}>Zip</Text>
              <TextInput
                textContentType="postalCode"
                placeholder="11000"
                placeholderTextColor="gray"
                keyboardType="number-pad"
                maxLength={5}
                onChangeText={handleZipChange}
                value={zip}
                style={styles.inputColor}
              />
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={setUserInformation}
          style={[styles.button, isFilled && styles.buttonActive]}
          disabled={!isFilled}
        >
          <Text style={[styles.next, { color: "#fff" }]}>Next</Text>
          <Ionicons name="arrow-forward-outline" size={24} color={"#fff"} />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  next: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
    fontStyle: "normal",
    color: "#575757",
    paddingLeft: 12,
  },

  button: {
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#BFBFBF",
    flexDirection: "row",
    marginHorizontal: 20,
  },

  buttonActive: {
    backgroundColor: "#000",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
  },

  inputColor: {
    borderBottomWidth: 1,
    height: 50,
    backgroundColor: "transparent",
    color: "#000",
    borderBottomColor: "#404040",
    marginBottom: 24,
    fontSize: 16,
    fontWeight: "600",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 50,
    fontWeight: "600",
    marginBottom: 24,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    fontWeight: "600",
    marginBottom: 24,
  },
  iconContainer: {
    top: 12,
    right: 12,
  },
  placeholder: {
    color: "gray", // Style for the placeholder text color
    fontSize: 16, // Style for the placeholder text font size
    fontWeight: "600", // Style for the placeholder text font weight
  },
});

export default ContactInfo;
