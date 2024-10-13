import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import { Svg, Circle, CircleProps } from "react-native-svg";
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  AnimateProps,
} from "react-native-reanimated";
import { calculatePieChartData, PieChartDataItem } from "@/store/homePayments";

type PieChartProps = {
  size?: number;
  strokeWidth?: number;
  amount?: number;
  activeCategory: string; // Add activeCategory prop
};

export type PieChartData = PieChartDataItem[];

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ChartSegment: FC<{
  progress: Animated.SharedValue<number>;
  color: string;
  center: number;
  radius: number;
  strokeWidth: number;
  circumference: number;
  percent: number;
  angle: number;
}> = ({
  center,
  radius,
  strokeWidth,
  color,
  circumference,
  percent,
  angle,
  progress,
}) => {
  const animatedProps = useAnimatedProps<AnimateProps<CircleProps>>(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * (1 - percent + 0.005)]
    );

    const deg = interpolate(progress.value, [0, 1], [-90, angle - 90]);
    return {
      strokeDashoffset,
      transform: [
        { translateX: 2 * center },
        { translateY: 2 * center },
        { rotate: `${deg}deg` },
        { translateX: -center },
        { translateY: -center },
      ],
    } as Partial<CircleProps>;
  });

  return (
    <AnimatedCircle
      cy={center}
      cx={center}
      r={radius}
      animatedProps={animatedProps}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={circumference}
      fill="none"
      originX={center}
      originY={center}
    />
  );
};

const PieChart = ({
  size = 200,
  strokeWidth = 20,
  amount,
  activeCategory,
}: PieChartProps) => {
  const progress = useSharedValue(0);
  const [data, setData] = useState<PieChartData>([]);
  const [startAngles, setStartAngles] = useState<number[]>([]);

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const refresh = () => {
    const generatedData = calculatePieChartData(activeCategory); // Pass activeCategory
    let angle = 0;
    const angles: number[] = [];

    generatedData.forEach((item) => {
      angles.push(angle);
      angle += item.percent * 360;
    });

    setData(generatedData);
    setStartAngles(angles);

    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1000,
    });
  };

  useEffect(() => {
    refresh();
  }, [activeCategory]); // Refresh when activeCategory changes

  let currencySymbol = "";
  let numericAmount = "";
  if (typeof amount === "number") {
    currencySymbol = "$"; // Replace with your actual currency symbol
    numericAmount = amount.toFixed(2).split(".")[0]; // Get whole part of the amount
  }

  const { width } = useWindowDimensions();

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          },
        ]}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size + 7} ${size + 5}`}>
          {data.map((item, index) => (
            <ChartSegment
              progress={progress}
              key={index}
              center={center}
              circumference={circumference}
              radius={radius}
              color={item.color}
              percent={item.percent}
              angle={startAngles[index]}
              strokeWidth={strokeWidth}
            />
          ))}
        </Svg>
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          top: "43%",
          flexDirection: "row",
          alignItems: "baseline",
          width,
          gap: 3,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            // lineHeight: 24,
          }}
        >
          {currencySymbol}
        </Text>
        <Text
          style={{
            fontSize: 36,
            fontWeight: "600",
            // letterSpacing: 0.5,
          }}
        >
          {numericAmount}
        </Text>
        <Text
          style={{
            fontSize: 20,
            // letterSpacing: 0.5,
            fontWeight: "700",
          }}
        >
          .{amount?.toFixed(2).split(".")[1]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PieChart;
