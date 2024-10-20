import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { NextButtonProps } from "@/utils/Pagination";

const NextButton = ({ scrollTo }: NextButtonProps) => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View>
      <TouchableOpacity
        onPress={scrollTo}
        style={[
          styles.button,
          isDarkMode ? { backgroundColor: "#fff" } : undefined,
        ]}
        activeOpacity={0.6}
      >
        <AntDesign
          name="arrowright"
          size={32}
          color={isDarkMode ? "#000" : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    backgroundColor: "#000",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NextButton;
