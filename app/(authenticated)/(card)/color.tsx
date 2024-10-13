import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GoBack from "@/components/GoBack";

const CardColor = () => {
  const [cardColor, setCardColor] = useState("#004EE4");

  const colors = ["#004EE4", "#000", "#70BA95", "#FDFF96", "#FAFAFB"];

  const onButtonPress = async () => {
    router.push("/design");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <GoBack title={"Card Setup"} />

      <Text style={styles.heading}>Select color{"\n"}option for your card</Text>

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            backgroundColor: cardColor,
            height: 220,
            borderRadius: 16,
            padding: 24,
            marginBottom: 48,
            flexGrow: 0,
          }}
        >
          <Image
            source={require("@/assets/images/debit.png")}
            style={[
              { height: 24, width: 40, resizeMode: "contain" },
              cardColor === colors[3] || cardColor === colors[4]
                ? { tintColor: "#000" }
                : null,
            ]}
          />
        </View>
        <View style={styles.colorOptions}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCardColor(color)}
              style={{
                borderRadius: 9,
                borderColor: "#000",
                borderWidth: 0.5,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 4,
              }}
            >
              <View
                style={{
                  borderRadius: 8,
                  height: 48,
                  width: 48,
                  backgroundColor: color,
                  borderWidth: 3,
                  borderColor: "#fff",
                }}
              ></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          defaultStyles.button,
          defaultStyles.buttonActive,
          { height: 48, marginHorizontal: 20 },
        ]}
        onPress={onButtonPress}
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
    marginBottom: 56,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
});

export default CardColor;
