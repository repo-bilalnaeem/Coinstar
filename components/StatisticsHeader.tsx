import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Prop {
  onCalendarPress: () => void;
}

const StatisticsHeader = ({ onCalendarPress }: Prop) => {
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={{ paddingVertical: 16, paddingHorizontal: 26 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "500",
          position: "absolute",
          width,
          lineHeight: 24,
          top: top - 25,
          zIndex: -1,
        }}
      >
        Statistics
      </Text>
      <TouchableOpacity
        style={{ alignSelf: "flex-end", padding: 5 }}
        onPress={onCalendarPress}
      >
        <Ionicons name="calendar-outline" size={22} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default StatisticsHeader;
