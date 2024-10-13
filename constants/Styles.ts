import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  next: {
    fontSize: 16,
    fontWeight: "500",
    // lineHeight: 20,
    fontStyle: "normal",
    color: "#575757",
    // paddingLeft: 12,
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

  buttonActive: {
    backgroundColor: "#000", // Change the color when the phone number is valid
    marginVertical: 24,
  },
});
