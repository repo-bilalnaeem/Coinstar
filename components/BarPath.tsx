import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  x: number;
  y: number;
  barWidth: number;
  graphHeight: number;
  progress: SharedValue<number>;
  label: string;
  selectedBar: SharedValue<string | null>;
};

const BarPath = ({
  x,
  y,
  barWidth,
  graphHeight,
  progress,
  label,
  selectedBar,
}: Props) => {
  const color = useDerivedValue(() => {
    if (selectedBar.value === label) {
      // console.log(label);
      return withTiming("#365FF1");
    } else if (selectedBar.value === null) {
      return withTiming("#EAEEFF");
    } else {
      return withTiming("#EAEEFF");
    }
  });

  const path = useDerivedValue(() => {
    const barPath = Skia.Path.Make();

    barPath.addRRect({
      rect: {
        x: x - barWidth / 2,
        y: graphHeight,
        width: barWidth,
        height: y * -1 * progress.value,
      },
      rx: 8,
      ry: 8,
    });

    return barPath;
  });

  return <Path path={path} color={color} />;
};

export default BarPath;
