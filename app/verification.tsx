import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CELL_COUNT = 4;

const Verification = () => {
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const isCodeComplete = code.length === CELL_COUNT;
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <StatusBar style="dark" />
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
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
              Enter verification code
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
                Please enter the code from the SMS
              </Text>
              <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Fragment key={index}>
                    <View
                      onLayout={getCellOnLayoutHandler(index)}
                      key={index}
                      style={[styles.cellRoot, isFocused && styles.focusCell]}
                    >
                      <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  </Fragment>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text>Didn't receive an SMS? </Text>
              <TouchableOpacity>
                <Text style={{ color: "#4D72F5" }}>Resend SMS</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (isCodeComplete) {
                  // Handle verification code submission
                  router.replace("/identification");
                }
              }}
              style={[
                styles.button,
                isCodeComplete ? styles.buttonActive : null,
              ]}
              disabled={!isCodeComplete}
            >
              <Text style={[styles.next, isCodeComplete && { color: "#fff" }]}>
                Next
              </Text>
              <Ionicons
                name="arrow-forward-outline"
                size={24}
                color={isCodeComplete ? "#fff" : "#575757"}
              />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
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

  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 16,
  },
  cellRoot: {
    width: 48,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAEEFF",
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 32,
  },
  focusCell: {
    paddingBottom: 8,
    borderColor: "#365FF1",
    borderWidth: 2,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: "white",
    alignSelf: "center",
  },
});

export default Verification;
