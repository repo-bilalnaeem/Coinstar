import { Payments, PaymentType } from "@/store/homePayments";

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  useColorScheme,
  LayoutChangeEvent,
} from "react-native";
import { categories, PaymentCategories } from "@/store/paymentCategories";
import * as Haptics from "expo-haptics";

type StatsCategoriesProps = {
  onCategoryChanged?: (category: string, totalAmount: number) => void; // Update prop type
};

const StatsCategories: React.FC<StatsCategoriesProps> = ({
  onCategoryChanged = () => {},
}) => {
  const ScrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<View | null>>([]);
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(categories.length / 2)
  );
  const isDarkMode = useColorScheme() === "dark";
  const [scrollViewWidth, setScrollViewWidth] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    setTimeout(() => {
      selected?.measureLayout(
        ScrollRef.current as any,
        (x, y, width, height) => {
          let scrollOffset = 0;

          if (index === 0) {
            scrollOffset = 0;
          } else if (index === categories.length - 1) {
            scrollOffset = x - scrollViewWidth + width + 16;
          } else {
            scrollOffset = x - scrollViewWidth / 2 + width / 2;
            if (scrollOffset < 0) scrollOffset = 0;
          }

          ScrollRef.current?.scrollTo({
            x: scrollOffset,
            y: 0,
            animated: true,
          });
        }
      );
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const totalAmount = calculateTotalAmount(categories[index].name);
      onCategoryChanged(categories[index].name, totalAmount); // Pass the category name
    }, 100);
  };

  useEffect(() => {
    if (scrollViewWidth > 0) {
      selectCategory(Math.floor(categories.length / 2));
    }
  }, [scrollViewWidth]);

  const calculateTotalAmount = (categoryName: string): number => {
    return Payments.reduce((sum, payment) => {
      if (
        payment.category === categoryName &&
        payment.payment === PaymentType.DEBIT
      ) {
        return sum + payment.amount;
      }
      return sum;
    }, 0);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: PaymentCategories;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => selectCategory(index)}
      key={index}
      ref={(el) => (itemsRef.current[index] = el)}
      style={[
        styles.container,
        activeIndex === index
          ? styles.categoriesBtnActive
          : styles.categoriesBtn,
      ]}
    >
      <View style={[styles.iconContainer, {backgroundColor:'#4D72F5'}]}>
        <Image source={item.logo} style={styles.icon} />
      </View>
      <Text
        style={
          activeIndex === index
            ? styles.categoryTextActive
            : styles.categoryText
        }
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <ScrollView
        ref={ScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onLayout={(event: LayoutChangeEvent) =>
          setScrollViewWidth(event.nativeEvent.layout.width)
        }
      >
        {categories.map((item, index) => renderItem({ item, index }))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DEE5FF",
    borderRadius: 32,
    paddingVertical: 4,
    paddingHorizontal: 16,
    paddingLeft: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
  },
  name: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
    resizeMode: "contain",
  },
  contentContainer: {
    gap: 10,
    flexGrow: 0,
    height: 52,
    marginVertical:36,
    paddingHorizontal: 16,
  },

  categoryText: {
    fontSize: 12,
    color: "#000",
    fontWeight: "400",
  },

  categoryTextActive: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
  },
  categoriesBtn: {
    // borderWidth: 1,
    // borderColor: "#478EEF",
    backgroundColor: "#FAFAFB",
  },
  categoriesBtnActive: {
    backgroundColor: "#DEE5FF",
  },
});

export default StatsCategories;
