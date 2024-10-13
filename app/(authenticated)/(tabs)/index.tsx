import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { PaymentType, Payments, Payment } from "@/store/homePayments";
import { userData } from "@/store/sendUsers";
import { StatusBar } from "expo-status-bar";

const groupPaymentsByDate = (payments: Payment[]) => {
  const groups = payments.reduce(
    (groups: { [key: string]: Payment[] }, payment: Payment) => {
      const date = new Date(payment.date).toDateString(); // Convert Date object to a string
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(payment);
      return groups;
    },
    {}
  );

  // Sort dates in descending order
  const sortedDates = Object.keys(groups).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  return { groups, sortedDates };
};

const home = () => {
  const { top } = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["42%", "85%"], []);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSheetChanges = (index: number) => {
    setIsExpanded(index === 1); // 1 corresponds to the 85% snap point
  };

  const handleSheetAnimate = useCallback((fromIndex: any, toIndex: any) => {
    if (fromIndex !== toIndex) {
      setIsExpanded(true);
    }
  }, []);

  const { groups, sortedDates } = useMemo(
    () => groupPaymentsByDate(Payments),
    [Payments]
  );

  const renderItem = ({
    item,
  }: {
    item: {
      imageSource: string;
      name: string;
    };
  }) => (
    <View style={{ flexDirection: "column", alignItems: "center", gap: 4 }}>
      <Image
        style={styles.profileThumbnail}
        source={{
          uri: item.imageSource,
        }}
      />

      <Text>{item.name}</Text>
    </View>
  );

  const renderPayment = ({ item }: { item: Payment }) => (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.paymentContainer}
      onPress={() => router.navigate(`/(authenticated)/payment/${item.id}`)}
    >
      <Image
        style={{
          width: 40,
          height: 40,
          // backgroundColor: "#000",
          resizeMode: "cover",
          borderRadius: 100,
          marginLeft: 2,
        }}
        source={{ uri: item.logo }}
      />

      <View style={{ flexGrow: 1 }}>
        <Text style={styles.transferName}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <Text
        style={[
          styles.payedAmount,
          item.payment === PaymentType.DEBIT
            ? { color: "#000" }
            : { color: "#4AA879" },
        ]}
      >
        {PaymentType.DEBIT === item.payment ? "-" : "+"}{" "}
        {item.amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: top,
      }}
    >
      <StatusBar style="dark" />
      <View style={styles.account}>
        <Pressable
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 24,
            marginHorizontal: 8,
            alignItems: "center",
            maxWidth: 70,
          }}
          onPress={() => router.navigate("/(authenticated)/(card)/myCards")}
        >
          <Ionicons name="wallet-outline" size={24} />
          <Ionicons name="chevron-down" size={20} />
        </Pressable>
        <Image
          source={require("@/assets/images/yellow-curl.png")}
          style={{
            position: "absolute",
            right: -160,
            top: -130,
            width: 370,
            height: 390,
            resizeMode: "contain",
          }}
        />
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Text style={styles.availableBalance}>Available Balance</Text>
          <Text style={styles.amount}>
            <Text style={styles.currency}>$</Text>
            2,850
            <Text style={styles.decimalPoints}>.00</Text>
          </Text>
          <Text style={styles.accountNumber}>Account ****1234</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              fontWeight: "500",
              marginBottom: 16,
            }}
          >
            Send money
          </Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable
              onPress={() => router.replace("/(transfer)")}
              style={{
                backgroundColor: "#000",
                padding: 16,
                borderRadius: 50,
                width: 56,
                height: 56,
              }}
            >
              <AntDesign name="arrowright" size={24} color={"#fff"} />
            </Pressable>
            <FlatList
              data={userData}
              renderItem={renderItem}
              keyExtractor={(data) => data.id}
              horizontal
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>

      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onAnimate={handleSheetAnimate}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        backgroundStyle={[
          styles.bottomSheetBackground,
          isExpanded ? styles.bottomSheetShadow : null,
        ]}
      >
        <View style={{ paddingHorizontal: 30 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Ionicons name="calendar-outline" size={24} />
            <Text
              style={{
                color: "#575757",
                fontSize: 14,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Transactions
            </Text>
            <AntDesign name="search1" size={24} />
          </View>
        </View>
        <FlatList
          data={sortedDates}
          renderItem={({ item: date }) => (
            <>
              <Text style={{ marginVertical: 2 }}>{date}</Text>
              <FlatList
                data={groups[date]}
                renderItem={renderPayment}
                keyExtractor={(payment) => payment.id}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                }}
                bounces={false}
              />
            </>
          )}
          keyExtractor={(date) => date}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
          bounces={false}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  account: {
    backgroundColor: "#fafc9d",
    // tintColor: "#fbfd73",
    // height: 350,
    borderRadius: 32,
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginBottom: 24,
  },

  availableBalance: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },

  amount: {
    fontSize: 48,
    fontWeight: "600",
    lineHeight: 64,
    letterSpacing: 1,
    marginBottom: 8,
  },

  currency: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },

  decimalPoints: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },

  accountNumber: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 20,
  },

  profileThumbnail: {
    width: 56,
    height: 56,
    // backgroundColor: "#000",
    resizeMode: "cover",
    borderRadius: 100,
  },

  transferName: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 4,
  },

  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
  },

  category: {
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 16,
    color: "#575757",
  },
  payedAmount: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "right",
    marginRight: 5,
  },

  bottomSheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetShadow: {
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
  },
});

export default home;
