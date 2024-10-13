import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Index = () => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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

      <View
        style={{
          width: "150%",
          height: 450,
          overflow: "hidden",
          paddingTop: top,
        }}
      >
        <Image
          source={require("@/assets/images/Wallet-Splashscreen.png")}
          style={{
            height: 550,
            width,
            overflow: "hidden",
            // alignItems: "center",
            justifyContent: "center",
          }}
        />
      </View>

      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Text
          style={{
            fontSize: 36,
            fontWeight: "600",
            lineHeight: 40,
            letterSpacing: -1,
            marginBottom: 16,
          }}
        >
          Setup Debit Card
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#575757",
            lineHeight: 24,
          }}
        >
          Classic and iconic. The original. Make it yours with a custom drawing
          or stamp.
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={[defaultStyles.button, defaultStyles.buttonActive]}
          onPress={() => router.push("/color")}
        >
          <Text
            style={[defaultStyles.next, { color: "#fff", paddingLeft: 12 }]}
          >
            Start
          </Text>
          <AntDesign name="arrowright" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
