import { Animated } from "react-native";

export interface PaginatorProps {
  data: any[];
  scrollX: Animated.Value;
}

export interface NextButtonProps {
  scrollTo: () => void;
}

export interface OnBoardingScreenProps {
  item: {
    id: string,
    image: any;
    title: string;
    description: string;
  };
}
