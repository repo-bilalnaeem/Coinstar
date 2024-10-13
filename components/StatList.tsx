import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { calculatePieChartData, PieChartDataItem } from "@/store/homePayments";

import { PaymentCategories, categories } from "@/store/paymentCategories";
import { Payments } from "@/store/homePayments";

const calculateCategoryStats = (
  categories: PaymentCategories[],
  payments: typeof Payments
) => {
  const stats = categories.map((category) => {
    const categoryPayments = payments.filter(
      (payment) => payment.category === category.name
    );
    const totalAmount = categoryPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    return {
      ...category,
      totalAmount,
    };
  });
  return stats;
};

const RenderItem = ({ item }: { item: PaymentCategories }) => {
  const [activeCategory, setActiveCategory] = useState("");

  const pieChartData: PieChartDataItem[] =
    calculatePieChartData(activeCategory);
  const totalAmount = pieChartData.length > 0 ? pieChartData[0].totalAmount : 0;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 16,
      }}
    >
      <View style={styles.logoContainer}>
        <Image source={item.logo} style={styles.logo} />
      </View>
      <View style={{ flexGrow: 1 }}>
        <Text style={styles.category}>{item.name}</Text>
        <Text style={styles.percentage}>
          {(item?.totalAmount / totalAmount).toFixed(2)}%
        </Text>
      </View>
      <Text style={styles.amount}>
        {item.totalAmount > 0 ? "+" : item.totalAmount < 0 ? "-" : null}
        {item.totalAmount}
      </Text>
    </View>
  );
};

const StatList = () => {
  const data = calculateCategoryStats(categories, Payments);
  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => <RenderItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}
    />
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  category: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  percentage: {
    fontSize: 14,
    color: "#575757",
    fontWeight: "300",
  },
  amount: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
});

export default StatList;
