import React, { useState, useRef } from "react";
import { View, FlatList, Animated, ViewToken } from "react-native";

import slides from "../utils/slides";
import OnboardingScreenItem from "@/components/OnboardingScreenItem";
import NextButton from "@/components/NextButton";
import Paginator from "@/components/Paginator";
import { Link, useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

interface Slide {
  id: string;
  image: any;
  title: string;
  description: string;
}

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<Slide>>(null);
  const router = useRouter();

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // navigation.navigate("verification")
      router.push("/(authenticated)/(tabs)");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <View style={{ flex: 5 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingScreenItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton scrollTo={scrollTo} />
      </View>
    </View>
  );
};

export default Onboarding;
