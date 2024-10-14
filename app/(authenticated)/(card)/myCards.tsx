import { Href, router } from "expo-router";
import React, { useMemo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Image,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";

import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyCardsSlider from "@/components/CardSlider";

interface renderOptions {
  icon: any;
  label: string;
  description: string | undefined;
  route: string;
}

const RenderOptions = ({ icon, label, description, route }: renderOptions) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}
      onPress={() => router.navigate(route as Href)}
    >
      <Image source={icon} style={styles.icon} />
      <View style={{ flexGrow: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text>{description}</Text>}
      </View>

      <Ionicons name="chevron-forward" size={24} />
    </TouchableOpacity>
  );
};

const GoBack = () => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

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
        Your cards
      </Text>
    </View>
  );
};

const myCards = () => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["45.7%"], []);
  const BAR_WIDTH = width - 30 - 16 - 60;
  const PROGRESS_VALUE = 12000 / 20000;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EAEEFF",
        paddingTop: top,
      }}
    >
      <GoBack />
      <MyCardsSlider />

      <View
        style={{
          gap: 16,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/coin.png")}
          style={{ width: 36, height: 48, resizeMode: "contain" }}
        />
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "column",
            height: 48,
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 14 }}>
            Monthly payment limit
          </Text>
          <ProgressBar
            fillStyle={{ backgroundColor: "#004EE4", borderRadius: 30 }}
            progress={PROGRESS_VALUE}
            style={{
              backgroundColor: "#A2B7FF",
              borderRadius: 30,
              width: BAR_WIDTH,
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text>Remained </Text>
            <Text style={styles.amount}>$12 000 </Text>
            <Text>of </Text>
            <Text style={styles.amount}>$20 000</Text>
          </View>
        </View>
      </View>

      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        backgroundStyle={[
          styles.bottomSheetBackground,
          { borderTopRightRadius: 32, borderTopLeftRadius: 32 },
          // isExpanded ? styles.bottomSheetShadow : null,
        ]}
      >
        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
          <Text style={styles.heading}>Settings</Text>
          <View style={{ gap: 16, paddingVertical: 16, paddingBottom: 30 }}>
            <RenderOptions
              icon={require("@/assets/images/statement.png")}
              description={undefined}
              label="Get a card statement"
              route="(settings)/statement"
            />
            <RenderOptions
              icon={require("@/assets/images/card-block.png")}
              description="You can always block your card"
              label="Temporarily block card"
              route="(settings)/block"
            />
            <RenderOptions
              icon={require("@/assets/images/apple.png")}
              description={undefined}
              label="Add to Apple Pay"
              route="(settings)/applePay"
            />
            <RenderOptions
              icon={require("@/assets/images/pincode.png")}
              description={undefined}
              label="Pin code settings"
              route="(authenticated)/(tabs)"
            />
            <RenderOptions
              icon={require("@/assets/images/security.png")}
              description={undefined}
              label="Security settings"
              route="(settings)/security"
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#004EE4",
    height: 200,
    // width: 360,
    borderRadius: 16,
    paddingVertical: 24,
    marginBottom: 40,
    overflow: "hidden",
    backfaceVisibility: "hidden",
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
    height: 180,
    width: 200,
    top: -100,
    right: -80,
    resizeMode: "contain",
  },

  logoContainer: {
    width: 60,
    height: 32,
    position: "absolute",
    top: 16,
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
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 12,
  },

  cardHolder: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
    color: "#FFF",
    opacity: 0.6,
  },

  bottomSheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 6,
    // marginBottom: 16,
    marginHorizontal: 12,
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  label: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 4,
  },

  description: {
    color: "#575757",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 16,
  },

  amount: {
    fontWeight: "600",
  },
});

export default myCards;
