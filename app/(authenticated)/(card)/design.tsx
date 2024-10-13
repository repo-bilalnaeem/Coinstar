import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageStyle,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GoBack from "@/components/GoBack";

const CardDesign = () => {
  const [cardImage, setCardImage] = useState<{
    source: any;
    style: ImageStyle;
  }>({
    source: require("@/assets/images/cardOpt-1.png"),
    style: {
      height: 210,
      width: 200,
      position: "absolute",
      top: -70,
      right: 52,
    },
  });

  const imageOptions = [
    {
      thumbnail: require("@/assets/images/design1.png"),
      card: require("@/assets/images/cardOpt-1.png"),
      style: {
        width: 50,
        height: 50,
        top: 16,
        resizeMode: "contain",
        right: -12,
      },
      cardStyle: {
        height: 210,
        width: 200,
        position: "absolute" as "absolute",
        top: -70,
        right: 52,
      },
    },
    {
      thumbnail: require("@/assets/images/design2.png"),
      card: require("@/assets/images/cardOpt-2.png"),
      style: { height: 50, width: 50, top: -15, right: 10 },
      cardStyle: {
        height: 200,
        width: 200,
        position: "absolute" as "absolute",
        top: -25,
        right: 30,
        objectFit: "contain" as "contain",
      },
    },
    {
      thumbnail: require("@/assets/images/design3.png"),
      card: require("@/assets/images/cardOpt-3.png"),
      style: { height: 60, width: 60, top: -13, right: -7 },
      cardStyle: {
        height: 450,
        width: 450,
        position: "absolute" as "absolute",
        top: -150,
        right: -180,
        objectFit: "contain" as "contain",
      },
    },
    {
      thumbnail: require("@/assets/images/design4.png"),
      card: require("@/assets/images/cardOpt-4.png"),
      style: { height: 64, width: 64, top: -2 },
      cardStyle: {
        height: 240,
        width: 280,
        position: "absolute" as "absolute",
        top: -60,
        right: -50,
        objectFit: "contain" as "contain",
      },
    },
    { thumbnail: null, card: null, style: {}, cardStyle: {} },
  ];

  const onButtonPress = async () => {
    try {
      router.push("/name");
    } catch (err) {
      console.log("Unable to select card design");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <GoBack title={"Card Setup"} />

      <Text style={styles.heading}>
        Select design{"\n"}option for your card
      </Text>

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            backgroundColor: "#004EE4",
            height: 220,
            borderRadius: 16,
            padding: 24,
            marginBottom: 48,
            flexGrow: 0,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            source={require("@/assets/images/debit.png")}
            style={{
              height: 24,
              width: 40,
              resizeMode: "contain",
              position: "absolute",
              top: 16,
              left: 16,
            }}
          />
          {cardImage.source && (
            <Image source={cardImage.source} style={cardImage.style} />
          )}
        </View>
        <View style={styles.imageOptions}>
          {imageOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setCardImage({ source: option.card, style: option.cardStyle })
              }
              style={{
                borderRadius: 9,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 4,
                backgroundColor: "#004EE4",
                overflow: "hidden",
                borderColor: "#fff",
                borderWidth: 3,
              }}
            >
              {option.thumbnail ? (
                <Image
                  source={option.thumbnail}
                  style={[
                    option.style as ImageStyle,
                    {
                      borderRadius: 8,
                      resizeMode: "contain",
                      overflow: "hidden",
                    },
                  ]}
                />
              ) : (
                <View style={{ height: 48, width: 48 }} />
              )}
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
  imageOptions: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
});

export default CardDesign;
