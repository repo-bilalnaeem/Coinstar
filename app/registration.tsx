import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  LogBox,
  useWindowDimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

// Suppress all warnings
LogBox.ignoreAllLogs(true);

const Verification = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("PK");
  const [selectedCountryName, setSelectedCountryName] = useState("Pakistan");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const router = useRouter();

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
  };

  const handleCountryChange = ({
    countryCode,
    countryName,
  }: {
    countryCode: string;
    countryName: string;
  }) => {
    setSelectedCountryCode(countryCode);
    setSelectedCountryName(countryName);
  };

  const isPhoneNumberValid = phoneNumber.trim().length === 11;

  const handleBackPress = () => {
    if (currentIndex === 0) {
      router.back();
    } else {
      flatListRef.current?.scrollToIndex({ index: 0 });
      setCurrentIndex(0);
    }
  };

  const storePhoneNumber = async (number: string) => {
    await AsyncStorage.setItem("PhoneNumber", number);
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 26,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingHorizontal: 20 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
        key="phoneInput"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
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
              Get started!
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#575757",
                  fontSize: 16,
                  fontWeight: "400",
                  lineHeight: 24,
                  marginBottom: 32,
                }}
              >
                Please enter your mobile number
                {"\n"}
                to verify your account
              </Text>
              <PhoneNumberInput
                value={phoneNumber}
                onPhoneNumberChange={handlePhoneNumberChange}
                onCountryChange={handleCountryChange}
                getPhoneNumber={storePhoneNumber}
              />
            </View>

            <Text style={styles.terms}>
              By clicking "Next" you agree to the{"\n"}
              <Text style={{ color: "#4D72F5", fontSize: 12 }}>
                privacy policy
              </Text>
              and
              <Text style={{ color: "#4D72F5", fontSize: 12 }}>
                {" "}
                terms of service
              </Text>
            </Text>

            <TouchableOpacity
              onPress={()=> router.push("/verification")}
              style={[
                styles.button,
                isPhoneNumberValid ? styles.buttonActive : null,
              ]}
              disabled={!isPhoneNumberValid}
            >
              <Text
                style={[styles.next, isPhoneNumberValid && { color: "#fff" }]}
              >
                Next
              </Text>
              <Ionicons
                name="arrow-forward-outline"
                size={24}
                color={isPhoneNumberValid ? "#fff" : "#575757"}
              />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#BFBFBF",
    flexDirection: "row",
  },

  buttonActive: {
    backgroundColor: "#000", // Change the color when the phone number is valid
  },

  next: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
    fontStyle: "normal",
    color: "#575757",
    paddingLeft: 12,
  },

  terms: {
    textAlign: "center",
    color: "#575757",
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 20,
  },
});

export default Verification;
