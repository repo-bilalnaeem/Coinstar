import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import GoBack from "@/components/GoBack";

const CompleteSetup = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    if (isFlipped) {
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setIsFlipped(false));
    } else {
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setIsFlipped(true));
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  const handleCardComplete = async (type = "false") => {
    router.replace("/(authenticated)/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <GoBack title={"Setup Card"} />
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>
            Debit cash card{"\n"}is ready to use!
          </Text>
          <Text style={styles.tapInfo}>Tap to rotate the card</Text>
          <TouchableOpacity onPress={flipCard}>
            <View style={{ alignItems: "center" }}>
              <Animated.View
                style={[
                  styles.cardContainer,

                  { width: width - 40 },
                  { transform: [{ rotateY: frontInterpolate }] },
                  { opacity: frontOpacity },
                ]}
              >
                <Image
                  source={require("@/assets/images/debit.png")}
                  style={styles.debitLogo}
                />
                <Image
                  source={require("@/assets/images/cardOpt-1.png")}
                  style={styles.coin}
                />
                <View style={styles.logoContainer}>
                  <Image
                    source={require("@/assets/images/Mastercard.png")}
                    style={styles.selectedLogo}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardNumber}>5608 3273 0900 0222</Text>
                  <Text style={styles.cardHolder}>Bilal Naeem</Text>
                </View>
              </Animated.View>

              <Animated.View
                style={[
                  styles.cardContainer,
                  { width: width - 40 },
                  styles.cardBack,
                  { transform: [{ rotateY: backInterpolate }] },
                  { opacity: backOpacity, justifyContent: "space-between" },
                ]}
              >
                <View style={styles.strip}></View>
                <View style={styles.backInfo}>
                  <View style={styles.cvv}>
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      CVV
                    </Text>
                    <Text style={{ color: "#fff", fontWeight: "400" }}>
                      556
                    </Text>
                  </View>
                  <Text
                    style={[styles.cardNumberBack, { paddingHorizontal: 0 }]}
                  >
                    5608 3273 0900 0222
                  </Text>
                </View>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.button,
            defaultStyles.buttonActive,
            { height: 48, marginVertical: 0 },
          ]}
          onPress={() => handleCardComplete("true")}
        >
          <Text style={[defaultStyles.next, { color: "#fff" }]}>Finish</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 16,
  },
  tapInfo: {
    color: "#575757",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  cardContainer: {
    backgroundColor: "#004EE4",
    height: 220,
    // width: 360,
    borderRadius: 16,
    paddingVertical: 24,
    marginBottom: 40,
    overflow: "hidden",
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
    top: 0,
  },
  debitLogo: {
    height: 24,
    width: 40,
    resizeMode: "contain",
    position: "absolute",
    top: 16,
    left: 16,
  },
  coin: {
    height: 210,
    width: 200,
    top: -100,
    right: -80,
  },
  logoContainer: {
    width: 60,
    height: 32,
    // borderWidth: 1,
    // borderStyle: "dashed",
    // borderColor: "#fff",
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
  cardInfo: {
    position: "absolute",
    bottom: 24,
    left: 20,
  },
  cardNumber: {
    color: "#FDFDFD",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 12,
  },
  cardHolder: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    color: "#FFF",
  },
  strip: {
    height: 40,
    backgroundColor: "#0036D9",
  },
  backInfo: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  cardNumberBack: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 24,
    opacity: 0.1,
    color: "#fff",
    transform: [{ scaleY: -1 }],
  },
  cvv: {
    backgroundColor: "#0036D9",
    borderRadius: 8,
    width: 56,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CompleteSetup;
