import { View, StyleSheet } from "react-native";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, Text, useFont } from "@shopify/react-native-skia";

type Props = {
  selectedValue: SharedValue<number>;
};

const AnimatedText = ({ selectedValue }: Props) => {
  const font = useFont(require("../assets/fonts/SpaceMono-Regular.ttf"), 20);

  const animatedText = useDerivedValue(() => {
    return `${Math.round(selectedValue.value)}`;
  });

  if (!font) {
    return <View />;
  }
  const fontSize = font.measureText("0");

  return (
    <Canvas style={{ height: fontSize?.height + 40 }}>
      <Text
        font={font}
        text={animatedText}
        color={"#111111"}
        y={fontSize.height + 20}
      />
    </Canvas>
  );
};

export default AnimatedText;
