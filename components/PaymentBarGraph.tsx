import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    GestureResponderEvent,
  } from "react-native";
  import XAxisText from "./XAxisText";
  import { Canvas, Group } from "@shopify/react-native-skia";
  import { Data, data } from "@/store/barChartData";
  import * as d3 from "d3";
  import BarPath from "./BarPath";
  import { useSharedValue, withTiming } from "react-native-reanimated";
  import { useEffect, useState } from "react";
  import AnimatedText from "./AnimatedText";
  const BarGraph = () => {
    const { width } = useWindowDimensions();
    const progress = useSharedValue<number>(0);
    const febData = data.find((d) => d.label === "Feb");
    const febValue = febData ? febData.value : 0; // Get the value for February
    const selectedValue = useSharedValue<number>(febValue);
    const [selectedDay, setSelectedDay] = useState<string>("Feb");
    const selectedBar = useSharedValue<string | null>(
      febData ? febData.label : null
    );
    const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);
  
    // console.log(febValue);
  
    const canvasWidth = width;
    const canvasHeight = 100;
  
    const graphWidth = width;
    const graphMargin = 30;
    const graphHeight = canvasHeight - graphMargin;
  
    const barWidth = 46;
  
    const xRange = [0, graphWidth];
  
    const xDomain = data.map((dataPoint: Data) => dataPoint.label);
  
    const x = d3.scalePoint().domain(xDomain).range(xRange).padding(0.7);
  
    const yRange = [0, graphHeight];
  
    const yDomain = [0, d3.max(data, (yDataPoint: Data) => yDataPoint.value)!];
  
    const y = d3.scaleLinear().domain(yDomain).range(yRange);
  
    useEffect(() => {
      progress.value = withTiming(1, { duration: 1000 });
      // selectedValue.value = totalValue;
      selectedValue.value = febValue;
      // selectedValue.value = withTiming(totalValue, { duration: 1000 });
    }, [progress, selectedValue, febValue]);
  
    const touchHandler = (e: GestureResponderEvent) => {
      const touchX = e.nativeEvent.locationX;
      const touchY = e.nativeEvent.locationY;
  
      const index = Math.floor((touchX - barWidth / 2) / x.step());
  
      if (index >= 0 && index < data.length) {
        const { label, value, month } = data[index];
  
        if (
          touchX > x(label)! - barWidth / 2 &&
          touchX < x(label)! + barWidth / 2 &&
          touchY > graphHeight - y(value) &&
          touchY < graphHeight + y(value)
        ) {
          setSelectedDay(month);
          selectedBar.value = label;
          selectedValue.value = value;
          // console.log({ label, value, day });
        } else {
          setSelectedDay("Feb");
          selectedBar.value = label;
          selectedValue.value = value;
          // console.log("Outside the bar");
        }
      }
    };
  
    return (
      <View>
        <View style={{ paddingHorizontal: 16, marginBottom: 24, marginTop:16 }}>
          <Text style={styles.total}>
            $
            {totalValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <Text style={styles.label}>Total spent for six months</Text>
          {/* <AnimatedText selectedValue={selectedValue} /> */}
          {/* <Text>{selectedDay}</Text> */}
          {/* <AnimatedText selectedValue={selectedValue} /> */}
        </View>
  
        <Canvas
          onTouchStart={touchHandler}
          style={{
            width: canvasWidth,
            height: canvasHeight,
          }}
        >
          {data.map((dataPoint: Data, index) => (
            <Group key={index}>
              <BarPath
                x={x(dataPoint.label)!}
                y={y(dataPoint.value)}
                barWidth={barWidth}
                graphHeight={graphHeight}
                progress={progress}
                label={dataPoint.label}
                selectedBar={selectedBar}
              />
              <XAxisText
                x={x(dataPoint.label)!}
                y={canvasHeight}
                text={dataPoint.label}
                selectedBar={selectedBar}
              />
            </Group>
          ))}
        </Canvas>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    total: {
      fontWeight: "600",
      fontSize: 24,
      lineHeight: 32,
    },
    label: {
      color: "#575757",
      fontSize: 14,
    },
  });
  
  export default BarGraph;
  