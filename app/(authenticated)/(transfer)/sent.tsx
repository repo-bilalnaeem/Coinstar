import { Href, router, useRouter } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import { StatusBar } from "expo-status-bar";

const Sent = () => {
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const router = useRouter();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
        },
      ]}
    >
      <StatusBar style="dark" />
      <Image
        source={require("@/assets/images/yellow-curl.png")}
        style={{
          position: "absolute",
          right: -160,
          top: -80,
          width: 350,
          height: 350,
          resizeMode: "contain",
          // aspectRatio: /1,
        }}
      />
      <View style={{ paddingVertical: 20, paddingHorizontal: 26 }}>
        {/* <TouchableOpacity onPress={() => router.back()} style={{ width: 36 }}>
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity> */}
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
          Payments
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          justifyContent: "center",
          flex: 1,
          // alignItems: "center",
        }}
      >
        <View style={styles.upperPart}>
          {/* <View style={styles.circleTop}> */}
          <Image
            source={require("@/assets/images/success.png")}
            style={styles.circleTop}
          />
          {/* </View> */}
          <View
            style={[
              styles.rightCircle,
              {
                right: -15,
                bottom: -20,
              },
            ]}
          />
          <Text style={styles.sent}>Payment sent</Text>
          <View
            style={[
              styles.leftCircle,
              {
                left: -15,
                bottom: -20,
              },
            ]}
          />
        </View>
        <View style={styles.bottomPart}>
          <View
            style={[
              styles.rightCircle,
              {
                right: -15,
                top: -22,
              },
            ]}
          />
          <View
            style={[
              styles.leftCircle,
              {
                left: -15,
                top: -22,
              },
            ]}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "baseline",
              // marginVertical: 80,
              marginTop: 48,
            }}
          >
            <Text style={styles.currency}>$</Text>
            <Text style={styles.amountWhole}>100</Text>
            <Text style={styles.amountDecimal}>.00</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "baseline",
              marginTop: 8,
              gap: 10,
            }}
          >
            <Text style={{ color: "#575757", fontSize: 14, fontWeight: "300" }}>
              to
            </Text>
            <Text style={styles.name}>Bilal Naeem</Text>
          </View>
          <TouchableOpacity
            style={[
              defaultStyles.button,
              defaultStyles.buttonActive,

              { height: 48, marginHorizontal: 20, alignItems: "baseline" },
            ]}
            onPress={() => {
              router.replace("/(authenticated)/(tabs)");
            }}
          >
            <Text style={[defaultStyles.next, { color: "#fff" }]}>
              Complete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEEFF",
    // paddingHorizontal: 16,
  },

  upperPart: {
    height: 125,
    backgroundColor: "#fff",
    borderBottomColor: "#EAEEFF",
    borderBottomWidth: 1,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderStyle:'dashed',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    position: "relative",
    // overflow: "hidden",
    // justifyContent: "center",
    alignItems: "center",
  },

  bottomPart: {
    height: 235,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: "#FFF",
    overflow: "hidden",
    // zIndex:1
    // position:"absolute"
  },
  rightCircle: {
    backgroundColor: "#EAEEFF",
    width: 40,
    borderRadius: 100,
    height: 40,
    position: "absolute",
  },
  leftCircle: {
    backgroundColor: "#EAEEFF",
    width: 40,
    height: 40,
    borderRadius: 100,
    position: "absolute",
  },
  circleTop: {
    top: -30,
    width: 56,
    height: 56,
    resizeMode: "contain",
  },
  sent: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 32,
  },

  currency: {
    fontSize: 24,
    fontWeight: "500",
  },

  amountWhole: {
    fontSize: 56,
    fontWeight: "600",
  },

  amountDecimal: {
    fontSize: 24,
    fontWeight: "500",
  },

  name: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default Sent;
