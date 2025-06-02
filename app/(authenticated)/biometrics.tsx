import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  useColorScheme,
} from "react-native";
import React from "react";

import { router } from "expo-router";

const enable = () => {
  const { width } = useWindowDimensions();

  const enableFaceId = async (type = "false") => {
    router.navigate("/(authenticated)/(card)");
  };

  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        },
        isDarkMode
          ? { backgroundColor: "#000" }
          : {
              backgroundColor: "#fff",
            },
      ]}
    >
      <Image
        source={require("@/assets/images/yellow-curl.png")}
        style={{
          position: "absolute",
          top: -97,
          width: 309,
          height: 384,
          resizeMode: "contain",
          left: 154,
        }}
      />
      <Image
        source={require("@/assets/images/lightBlue-curl.png")}
        style={{
          position: "absolute",
          bottom: -90,
          width: 309,
          height: 384,
          resizeMode: "contain",
          left: -100,
        }}
      />
      <Image
        source={require("@/assets/images/face-id.png")}
        style={{ width: 64, height: 64, marginBottom: 32, tintColor: "#000" }}
      />
      <Text style={styles.heading}>Enter with Face ID?</Text>
      <Text style={styles.subHeading}>
        Would you like you enter the application with Face ID
      </Text>

      <TouchableOpacity
        onPress={() => enableFaceId("true")}
        style={[styles.button, styles.buttonActive, { width: width - 40 }]}
      >
        <Text style={[styles.next, { color: "#fff" }]}>Allow</Text>
      </TouchableOpacity>

      <Pressable onPress={() => enableFaceId()}>
        <Text
          style={{
            color: "grey",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            padding: 16,
          }}
        >
          Maybe later
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    paddingBottom: 16,
  },
  subHeading: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 24,
    fontWeight: "500",
  },

  next: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
    fontStyle: "normal",
    color: "#575757",
  },

  button: {
    borderRadius: 100,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#BFBFBF",
    flexDirection: "row",
    width: "auto",
  },

  buttonActive: {
    backgroundColor: "#000",
    marginVertical: 24,
  },
});

export default enable;
