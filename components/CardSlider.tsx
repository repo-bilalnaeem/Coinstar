import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";

const { width } = Dimensions.get("screen");

const CardSlider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    { useNativeDriver: false }
  );

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
    // console.log("viewableItems", viewableItems);
    setIndex(viewableItems[0].current);
  }).current;

  const imageOptions = [
    {
      id: 1,
      card: require("@/assets/images/cardOpt-1.png"),
      cardStyle: {
        height: 210,
        width: 200,
        position: "absolute",
        top: -70,
        right: 52,
      },
    },
    {
      id: 2,
      card: require("@/assets/images/cardOpt-2.png"),
      cardStyle: {
        height: 200,
        width: 200,
        position: "absolute",
        top: -48,
        right: 30,
        objectFit: "contain",
      },
    },
  ];

  const Card = ({ cardImage, cardStyle }: any) => {
    return (
      <View>
        <View style={[styles.cardContainer]}>
          <Image
            source={require("@/assets/images/debit.png")}
            style={styles.debitLogo}
          />
          <Image source={cardImage} style={[cardStyle]} />
          <Image
            source={require("@/assets/images/Mastercard.png")}
            style={styles.selectedLogo}
          />
        </View>
        <View
          style={[
            styles.cardInfo,
            {
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flexGrow: 0.75 }}>
            <Text style={styles.cardNumber}>5608 3273 0900 0222</Text>
            <Text style={styles.cardHolder}>Bilal Naeem</Text>
          </View>
          <Text
            style={{
              marginTop: 20,
              fontWeight: "400",
              color: "#fff",
              opacity: 0.6,
            }}
          >
            03/24
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <FlatList
        data={imageOptions}
        renderItem={({ item }) => (
          <Card cardImage={item.card} cardStyle={item.cardStyle} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        pagingEnabled
        snapToAlignment="center"
        contentContainerStyle={{
          paddingRight:24,
          gap: 8,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
          // marginBottom: 24,
        }}
        onScroll={handleScroll}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        {imageOptions.map((_, idx) => {
          const inputRange = [
            (idx - 1) * width,
            idx * width,
            (idx + 1) * width,
          ];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 8, 8],
            extrapolate: "clamp",
          });
          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#A2B7FF", "#0040DE", "#A2B7FF"],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={idx.toString()}
              style={[
                styles.dot,
                { width: dotWidth, backgroundColor },
                // idx === index && styles.dotActive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#004EE4",
    height: 200,
    width: 340,
    borderRadius: 16,
    paddingVertical: 24,
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
  selectedLogo: {
    width: 60,
    height: 32,
    resizeMode: "contain",
    right: 20,
    position: "absolute",
    top: 16,
  },
  cardInfo: {
    position: "absolute",
    bottom: 28,
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
  logoContainer: {
    width: 60,
    height: 32,
    position: "absolute",
    top: 16,
    right: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "#A2B7FF",
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: "#0040DE",
  },
});

export default CardSlider;
