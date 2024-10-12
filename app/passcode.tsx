import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import * as LocalAuthentication from "expo-local-authentication";

const Passcode = () => {
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(4).fill(0);
  const router = useRouter();

  const offset = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const OFFSET = 20;
  const TIME = 100;

  useEffect(() => {
    const authenticate = async () => {
      if (code.length === 4) {
        // TODO
        if (code.join("") === "1234") {
          const isBiometricEnabled = false;
          const isCardSetupComplete = false;

          // console.log(isCardSetupComplete);

          if (isBiometricEnabled === false && isCardSetupComplete === false) {
            router.replace("/(authenticated)/biometrics");
          }

          if (isBiometricEnabled) {
            router.replace("/(authenticated)/(card)");
          }

          // router.replace("/(authenticated)/(tabs)/(wallet)");

          setCode([]);
        } else {
          offset.value = withSequence(
            withTiming(-OFFSET, { duration: TIME / 2 }),
            withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
            withTiming(0, { duration: TIME / 2 })
          );
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          setCode([]);
        }
      }
    };

    authenticate();
  }, [code]);

  // useEffect(() => {
  //   // Log AsyncStorage items when the component mounts
  //   logAllStorageItems();
  // }, []);

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // console.log(number);
    setCode([...code, number]);
  };

  const onNumberBackSpace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const onBiometricPress = async () => {
    const success = await LocalAuthentication.authenticateAsync();
    console.log(success);
    if (success) {
      router.replace("/");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, padding: 20 }}>
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
        source={require("@/assets/images/lock.png")}
        style={{
          width: 64,
          height: 64,
          marginTop: 40,
          marginBottom: 16,
          alignSelf: "center",
        }}
      />
      <Text style={styles.heading}>Create Passcode</Text>
      <Animated.View style={[styles.codeView, style]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[
              {
                width: 12,
                height: 12,
                borderRadius: 50,
                borderColor: "#000",
                borderWidth: 1,
              },
              {
                backgroundColor: code[index] ? "#000" : "transparent",
              },
            ]}
          ></View>
        ))}
      </Animated.View>

      <View
        style={{ gap: 48, marginHorizontal: 40, rowGap: 32, columnGap: 40 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
              style={{
                backgroundColor: "#f2f2f2",
                width: 72,
                height: 72,
                borderRadius: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
              style={{
                backgroundColor: "#f2f2f2",
                width: 72,
                height: 72,
                borderRadius: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
              style={{
                backgroundColor: "#f2f2f2",
                width: 72,
                height: 72,
                borderRadius: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              width: 72,
              height: 72,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={onBiometricPress}>
              <Image
                source={require("@/assets/images/face-id.png")}
                style={{ width: 32, height: 32 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => onNumberPress(0)}
              style={{
                backgroundColor: "#f2f2f2",
                width: 72,
                height: 72,
                borderRadius: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>0</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 72,
              height: 65,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={onNumberBackSpace}>
              <Ionicons name="backspace-outline" size={32} color={"gray"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 32,
    // marginVertical: 32,
    // marginTop: 80,
  },

  codeView: {
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: "row",
    gap: 24,
    marginVertical: 64,
    marginTop: 24,
  },

  text: {
    // backgroundColor: "#F2F2F2",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 32,
  },
});

export default Passcode;
