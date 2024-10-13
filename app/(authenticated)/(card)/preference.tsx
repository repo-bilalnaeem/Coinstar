import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GoBack from "@/components/GoBack";

const CardPreference = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const onButtonPress = async () => {
    try {
      if (selectedValue) {
        router.push("/(authenticated)/card");
      }
    } catch (err) {
      console.log("Card service not available");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <GoBack title={"Card Setup"} />

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.heading}>Choose your card{"\n"}preferences</Text>
        <View style={styles.debitCard}>
          <Image
            source={require("@/assets/images/debit.png")}
            style={styles.debitLogo}
          />
          <Image
            source={require("@/assets/images/cardOpt-1.png")}
            style={styles.coin}
          />

          <View style={styles.logoContainer}>
            {selectedValue === "mastercard" && (
              <Image
                source={require("@/assets/images/Mastercard.png")}
                style={styles.selectedLogo}
              />
            )}
            {selectedValue === "visa" && (
              <Image
                source={require("@/assets/images/Visa.png")}
                style={styles.selectedLogo}
              />
            )}
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 24,
              left: 20,
            }}
          >
            <Text style={styles.cardNumber}>5608 3273 0900 0222</Text>
            <Text style={styles.cardHolder}>Bilal Naeem</Text>
          </View>
        </View>
        <View style={{ gap: 16, marginBottom: 8 }}>
          <Pressable
            style={styles.cardOption}
            onPress={() => handleSelect("mastercard")}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Image
                source={require("@/assets/images/Mastercard.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.service}>Mastercard</Text>
                <Text style={styles.cost}>Free</Text>
              </View>
              <TouchableOpacity style={styles.radioButtonContainer}>
                <View
                  style={[
                    styles.radioButton,
                    selectedValue === "mastercard" &&
                      styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
          <Pressable
            style={styles.cardOption}
            onPress={() => handleSelect("visa")}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Image
                source={require("@/assets/images/Visa.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.service}>Visa</Text>
                <Text style={styles.cost}>$5.00 per month</Text>
              </View>
              <TouchableOpacity style={styles.radioButtonContainer}>
                <View
                  style={[
                    styles.radioButton,
                    selectedValue === "visa" && styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </View>
      <TouchableOpacity
        style={[
          defaultStyles.button,
          defaultStyles.buttonActive,
          { height: 48, marginHorizontal: 20 },
        ]}
        onPress={onButtonPress}
        disabled={!selectedValue}
      >
        <Text style={[defaultStyles.next, { color: "#fff" }]}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 24,
    lineHeight: 40,
    fontWeight: "500",
    marginBottom: 40,
  },
  debitCard: {
    backgroundColor: "#004EE4",
    height: 220,
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    flexGrow: 0,
    overflow: "hidden",
  },
  debitLogo: {
    height: 24,
    width: 40,
    resizeMode: "contain",
    position: "absolute",
    top: 16,
    left: 16,
    opacity: 0.155,
  },
  coin: {
    height: 210,
    width: 200,
    top: -100,
    right: -80,
    opacity: 0.155,
  },
  logoContainer: {
    width: 60,
    height: 32,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#fff",
    position: "absolute",
    top: 24,
    right: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedLogo: {
    width: 60,
    height: 32,
    resizeMode: "contain",
  },
  cardNumber: {
    color: "#FDFDFD",
    fontWeight: "700",
    opacity: 0.155,
    fontSize: 20,
    marginBottom: 12,
  },
  cardHolder: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    color: "#FFF",
    opacity: 0.155,
  },
  cardOption: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFB",
    borderRadius: 12,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
  },
  radioButtonSelected: {
    backgroundColor: "#004EE4",
    borderColor: "#fff",
    borderWidth: 3,
  },
  service: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  cost: {
    color: "#575757",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "300",
  },
});

export default CardPreference;
