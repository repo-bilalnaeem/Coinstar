import React from "react";
import { Text, useFont } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  x: number;
  y: number;
  text: string;
  selectedBar: SharedValue<string | null>;
};

const XAxisText = ({ x, y, text, selectedBar }: Props) => {
  const font = useFont(require("../assets/fonts/SpaceMono-Regular.ttf"));

  const color = useDerivedValue(() => {
    if (selectedBar.value === text) {
      // console.log(text);
      return withTiming("#000");
    } else if (selectedBar.value === null) {
      return withTiming("#575757");
    } else {
      return withTiming("#575757");
    }
  });

  if (!font) {
    return null;
  }

  const fontSize = font.measureText(text);

  return (
    <Text
      font={font}
      x={x - fontSize.width / 2}
      y={y-10}
      text={text}
      color={color}
    />
  );
};

export default XAxisText;
