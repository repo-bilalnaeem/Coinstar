import Ionicons from "@expo/vector-icons/build/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import GoBack from "@/components/GoBack";

const CardName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isFilled = firstName !== "" && lastName !== "";

  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
  };
  const handleLastNameChange = (text: string) => {
    setLastName(text);
  };

  const onButtonPress = async () => {
    try {
      router.push("/preference");
    } catch (err) {
      console.log("Unable to set cardName");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <GoBack title={"Card Setup"} />

          <Text style={styles.heading}>Please confirm{"\n"}your name.</Text>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  textContentType="givenName"
                  placeholder="Bilal"
                  placeholderTextColor="gray"
                  keyboardType="default"
                  maxLength={15}
                  onChangeText={handleFirstNameChange}
                  value={firstName}
                  style={styles.inputColor}
                />
              </View>
              <View>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  textContentType="familyName"
                  placeholder="Naeem"
                  placeholderTextColor="gray"
                  keyboardType="default"
                  maxLength={15}
                  onChangeText={handleLastNameChange}
                  value={lastName}
                  style={styles.inputColor}
                />
              </View>
            </View>
          </View>
          <View
          //   style={{ paddingBottom: 24 }}
          >
            <Text style={styles.noteText}>
              Please, note that it should be your legal first and last name
              according to your legal documents. Card with name might help you
              while booking hotels and automobiles abroad.
            </Text>
            <TouchableOpacity
              onPress={onButtonPress}
              style={[
                styles.button,
                { height: 48, marginHorizontal: 20 },
                isFilled ? styles.buttonActive : null,
              ]}
              disabled={!isFilled}
            >
              <Text style={[styles.next, isFilled && { color: "#fff" }]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 24,
    lineHeight: 40,
    fontWeight: "500",
    marginBottom: 24,
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
    backgroundColor: "#000", // Change the color when the phone number is valid
  },
  noteText: {
    textAlign: "center",
    color: "#A0A0A0",
    fontWeight: "300",
    lineHeight: 16,
    fontSize: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
});

export default CardName;
