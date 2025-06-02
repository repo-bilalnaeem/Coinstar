import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Animated,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import PieChart from "@/components/PieChart";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useHeaderHeight } from "@react-navigation/native";
import StatsCategories from "@/components/StatsCategories";
import BottomSheet from "@gorhom/bottom-sheet";
import { calculatePieChartData, PieChartDataItem } from "@/store/homePayments";
import StatList from "@/components/StatList";
import StatisticsHeader from "@/components/StatisticsHeader";
import { CalendarList } from "react-native-calendars";

const SLIDE_DURATION = 300;
const LEFT_POSITION = -70;
const RIGHT_POSITION = 70;

const Statistics = () => {
  const { top } = useSafeAreaInsets();
  const headerHeight = 50;
  const isDarkMode = useColorScheme() === "dark";
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [isGraph, setIsGraph] = useState(true);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [activeCategory, setActiveCategory] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategoryAmount, setActiveCategoryAmount] = useState(0);
  const [selected, setSelected] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = (index: number) => {
    setIsExpanded(index === -1);
  };

  useEffect(() => {
    const toValue = isGraph ? LEFT_POSITION : RIGHT_POSITION;
    Animated.timing(slideAnim, {
      toValue,
      duration: SLIDE_DURATION,
      useNativeDriver: false,
    }).start();
  }, [isGraph]);

  const handleOptionPress = (option: string) => {
    setIsGraph(option === "Graph");
  };

  const handleCategoryChanged = (category: string, totalAmount: number) => {
    setActiveCategory(category);
    setActiveCategoryAmount(totalAmount);
  };

  const pieChartData: PieChartDataItem[] =
    calculatePieChartData(activeCategory);
  const totalAmount = pieChartData.length > 0 ? pieChartData[0].totalAmount : 0;

  const openBottomSheet = () => {
    // console.log("Sheet Opened!");
    console.log(isExpanded);

    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    // console.log("Closing Sheet!");
    console.log(isExpanded);

    bottomSheetRef.current?.close();
  };

  const snapPoints = useMemo(() => ["85%"], []);

  return (
    <SafeAreaView style={[styles.container]}>
      <StatisticsHeader onCalendarPress={openBottomSheet} />
      <View style={styles.content}>
        <View
          style={styles.options}
          onLayout={(e) => {
            const { width } = e.nativeEvent.layout;
            setButtonWidth(width / 2);
          }}
        >
          <Animated.View
            style={[
              styles.animatedBackground,
              {
                width: buttonWidth,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          />
          <Pressable
            style={styles.optionButton}
            onPress={() => handleOptionPress("Graph")}
          >
            <Text style={isGraph ? styles.active : styles.notActive}>
              Graph
            </Text>
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => handleOptionPress("List")}
          >
            <Text style={!isGraph ? styles.active : styles.notActive}>
              List
            </Text>
          </Pressable>
        </View>
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <Text style={styles.totalAmount}>
            {totalAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <Text style={styles.expenseMonth}>
            Total spent for the March 2022
          </Text>
        </View>
        {isGraph ? (
          <>
            <View>
              <View style={{ height: 300, overflow: "hidden" }}>
                <PieChart
                  size={290}
                  strokeWidth={24}
                  amount={activeCategoryAmount}
                  activeCategory={activeCategory}
                />
              </View>
            </View>

            <StatsCategories onCategoryChanged={handleCategoryChanged} />
          </>
        ) : (
          <StatList />
        )}
      </View>

      <BottomSheet
        index={-1}
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        handleIndicatorStyle={[{ backgroundColor: "#fff" }]}
        backgroundStyle={[
          !isExpanded && styles.bottomSheetShadow,
          { borderRadius: 32 },
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
            <TouchableOpacity onPress={closeBottomSheet}>
              <AntDesign name="close" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <CalendarList
            initialScrollIndex={200}
            showsVerticalScrollIndicator={false}
            bounces={false}
            pastScrollRange={1}
            futureScrollRange={1}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            theme={{
              dayTextColor: "black",
              selectedDayBackgroundColor: "#365FF1",
              textDayFontWeight: "500",
              textDayHeaderFontWeight: "300",
              selectedDayTextColor: "white",
              todayTextColor: "white",
              todayBackgroundColor: "#365FF1",
              monthTextColor: "#404040",
              textMonthFontWeight: "400",
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 16,
  },
  content: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
  options: {
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    overflow: "hidden",
    position: "relative",
    marginHorizontal: 48,
    // paddingHorizontal: 16,
    marginVertical: 18,
  },
  animatedBackground: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#365FF1",
    borderRadius: 12,
  },
  optionButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  notActive: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  totalAmount: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "500",
    marginBottom: 8,
  },

  expenseMonth: {
    color: "#575757",
    fontSize: 14,
    lineHeight: 16,
  },

  bottomSheetShadow: {
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
    shadowColor: "#DADADA",
  },
});

export default Statistics;
