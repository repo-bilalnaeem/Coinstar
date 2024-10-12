import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

import { OnBoardingScreenProps } from "@/utils/Pagination";

const OnboardingScreenItem = ({ item }: OnBoardingScreenProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Image
          source={item.image}
          style={[styles.image, { width, resizeMode: "contain" }]}
        />
        <View style={{ flex: 0.50, paddingHorizontal: 20 }}>
          {/* <Text>hello</Text> */}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    flex: 2,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    marginTop: 18,
  },

  description: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    marginTop: 14,
    color: "#575757",
  },
});

export default OnboardingScreenItem;
