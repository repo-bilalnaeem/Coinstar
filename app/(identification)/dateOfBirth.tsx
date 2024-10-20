import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const DateOfBirth = () => {
  const [date, setDate] = useState<Date | null>(null); // Initialize to null
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    bottomSheetRef.current?.dismiss(); // Close the picker
  };

  const settingDate = async () => {
    if (date) {
      try {
        router.push("/(identification)/contactInfo");
      } catch (error) {
        console.log("Unable to store date");
      }
    }
  };

  const isDarkMode = useColorScheme() === "dark";

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={[
          { flex: 1 },
          isDarkMode
            ? { backgroundColor: "#000" }
            : { backgroundColor: "#fff" },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 26,
                paddingVertical: 20,
              }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="arrow-back"
                  size={25}
                  color={isDarkMode ? "#fff" : "#000"}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                {
                  fontSize: 28,
                  lineHeight: 32,
                  fontWeight: "600",
                  textAlign: "center",
                  marginBottom: 18,
                  marginTop: 18,
                },
                isDarkMode ? { color: "#fff" } : undefined,
              ]}
            >
              When were you born?
            </Text>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              <Text
                style={[
                  {
                    textAlign: "center",
                    color: "#575757",
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 24,
                    marginBottom: 32,
                  },
                  isDarkMode ? { color: "#bfbfbf" } : undefined,
                ]}
              >
                Please enter your date of birth
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => bottomSheetRef.current?.present()} // Show the modal
                  style={[
                    {
                      borderBottomWidth: 1,
                      marginBottom: 20,
                      height: 60,
                      justifyContent: "center",
                    },
                    isDarkMode
                      ? { borderBlockColor: "#fff" }
                      : { borderBottomColor: "#575757" },
                  ]}
                >
                  <Text
                    style={[
                      styles.inputColor,
                      isDarkMode ? { color: "#fff" } : undefined,
                    ]}
                  >
                    {date ? date.toLocaleDateString("en-GB") : "DD / MM / YYYY"}
                  </Text>
                </TouchableOpacity>

                <BottomSheetModal
                  ref={bottomSheetRef}
                  index={0}
                  snapPoints={["50%"]}
                  // onDismiss={() => {
                  //   // Optional: Reset state or perform any actions on dismiss
                  // }}
                  backdropComponent={({ style }) => (
                    <View style={[style, styles.backdrop]} />
                  )}
                  handleIndicatorStyle={[
                    isDarkMode ? { backgroundColor: "#a7a7a7" } : undefined,
                  ]}
                  handleStyle={[
                    isDarkMode
                      ? {
                          backgroundColor: "#2c2c2c",
                          borderTopRightRadius: 15,
                          borderTopLeftRadius: 15,
                        }
                      : undefined,
                  ]}
                >
                  <View
                    style={[
                      styles.modalContent,
                      isDarkMode
                        ? {
                            backgroundColor: "#2c2c2c",
                          }
                        : undefined,
                    ]}
                  >
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date || new Date()}
                      mode="date"
                      display="inline"
                      onChange={handleDateChange}
                      maximumDate={new Date(2024, 11, 31)}
                      minimumDate={new Date(2000, 0, 1)}
                    />
                  </View>
                </BottomSheetModal>
              </View>
            </View>

            <TouchableOpacity
              onPress={settingDate}
              style={[
                styles.button,
                date ? styles.buttonActive : null,
                { marginHorizontal: 20 },
                isDarkMode && date ? { backgroundColor: "#fff" } : undefined,
              ]}
              disabled={!date}
            >
              <Text
                style={[
                  styles.next,
                  date && { color: "#fff" },
                  date && isDarkMode ? { color: "#000" } : undefined,
                ]}
              >
                Next
              </Text>
              <Ionicons
                name="arrow-forward-outline"
                size={24}
                color={date ? (isDarkMode ? "#000" : "#fff") : "#575757"}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  next: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
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
    backgroundColor: "transparent",
    color: "#000",
    borderBottomColor: "#404040",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonActive: {
    backgroundColor: "#000",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    flex: 1,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default DateOfBirth;
