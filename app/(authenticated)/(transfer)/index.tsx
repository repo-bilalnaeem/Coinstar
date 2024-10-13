import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Beneficiary from "@/components/Beneficiary";
import { StatusBar } from "expo-status-bar";
const index = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const GoBack = () => {
    return (
      <View style={{ paddingVertical: 20, paddingHorizontal: 26 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36 }}>
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "500",
            position: "absolute",
            width,
            lineHeight: 24,
            top: top - 25,
            zIndex: -1,
          }}
        >
          Payment
        </Text>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: top }}>
      <StatusBar style="dark" />
      <GoBack />
      <View style={{ marginVertical: 24 }}>
        <View
          style={{
            paddingBottom: 16,
            borderBottomColor: "#575757",
            borderBottomWidth: 1,
            marginHorizontal: 24,
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="Enter name or card number"
            placeholderTextColor="#575757"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: "#000",
              fontWeight: "500",
              flexGrow: 1,
            }}
          />
          <Image
            source={require("@/assets/images/card.png")}
            style={{ width: 20, height: 20, resizeMode: "contain" }}
          />
        </View>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.container}>
          <Image
            source={require("@/assets/images/radar.png")}
            style={styles.icon}
          />
          <Text style={styles.action}>Radar</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.container}>
          <Image
            source={require("@/assets/images/phone-icon.png")}
            style={styles.icon}
          />
          <Text style={styles.action}>Charge mobile</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Beneficiary />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#FAFAFB",
    gap: 16,
    elevation: 1,
    marginBottom: 24,
  },

  icon: {
    width: 24,
    height: 24,
    objectFit: "contain",
  },

  action: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: "#000",
    flexGrow: 1,
  },

  container: {
    paddingHorizontal: 10,
    paddingLeft: 12,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});

export default index;
