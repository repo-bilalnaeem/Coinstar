import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const LegalName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isFilled = firstName !== "" && lastName !== "";

  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
  };
  const handleLastNameChange = (text: string) => {
    setLastName(text);
  };

  const saveUserName = async () => {
    try {
      router.push("/dateOfBirth");
      Keyboard.dismiss();
    } catch (error) {
      console.error("Failed to save the data to the storage", error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
      key="phoneInput"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <StatusBar style="dark" />
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
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
              What is your name?
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#575757",
                  fontSize: 16,
                  fontWeight: "500",
                  lineHeight: 24,
                  marginBottom: 32,
                }}
              >
                Please enter your legal name
              </Text>
              <View style={{ flex: 1 }}>
                <View>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    textContentType="none"
                    placeholder="Bilal"
                    placeholderTextColor="gray"
                    keyboardType="name-phone-pad"
                    maxLength={15}
                    onChangeText={handleFirstNameChange}
                    value={firstName}
                    style={styles.inputColor}
                    autoCorrect={false}
                    importantForAutofill="no"
                    autoCapitalize="words"
                  />
                </View>
                <View>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    textContentType="none"
                    placeholder="Naeem"
                    placeholderTextColor="gray"
                    keyboardType="name-phone-pad"
                    maxLength={15}
                    onChangeText={handleLastNameChange}
                    value={lastName}
                    style={styles.inputColor}
                    autoCorrect={false}
                    importantForAutofill="no"
                    autoCapitalize="words"
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={saveUserName}
              style={[styles.button, isFilled ? styles.buttonActive : null]}
              disabled={!isFilled}
            >
              <Text style={[styles.next, isFilled && { color: "#fff" }]}>
                Next
              </Text>
              <Ionicons
                name="arrow-forward-outline"
                size={24}
                color={isFilled ? "#fff" : "#575757"}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  },

  inputColor: {
    borderBottomWidth: 1,
    height: 60,
    backgroundColor: "transparent",
    color: "#000",
    borderBottomColor: "#404040",
    marginBottom: 24,
    fontSize: 16,
    fontWeight: "600",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
  },

  buttonActive: {
    backgroundColor: "#000",
  },
});

export default LegalName;
