import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  View,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
}

const GoBack = ({ title }: Props) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 26 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ width: 36 }}>
        <Ionicons name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
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
        {title}
      </Text>
    </View>
  );
};

export default GoBack;
