import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

const ApplePay = () => {
  const router = useRouter();
  const GoBack = () => {
    return (
      <View style={{ paddingVertical: 20, paddingHorizontal: 26 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36 }}>
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBack />
      <Image
        source={require("@/assets/images/yellow-curl.png")}
        style={{
          position: "absolute",
          top: -97,
          width: 309,
          height: 384,
          resizeMode: "contain",
          left: 154,
          //   zIndex:-1
        }}
      />
      <View
        style={{
          //   marginTop: "-27.5%",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image
          source={require("@/assets/images/apple-pay.png")}
          style={{
            width: 64,
            height: 64,
            marginTop: 40,
            marginBottom: 16,
            alignSelf: "center",
          }}
        />
        <Text style={styles.heading}>Add card to{"\n"}Apple Pay</Text>
        <Text
          style={{
            marginVertical: 14,
            fontSize: 15,
            color: "#575757",
            marginHorizontal: 14,
            textAlign:"center"
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante
          fermentum posuere eget
        </Text>
        <Text
          style={{
            color: "#575757",
            fontSize: 14,
            marginVertical: 16,
          }}
        >
          **** **** **** 3294
        </Text>
      </View>
      <TouchableOpacity
        style={[
          defaultStyles.button,
          defaultStyles.buttonActive,

          { height: 48, marginHorizontal: 20, marginVertical: 0 },
        ]}
        onPress={() => {}}
      >
        <Text style={[defaultStyles.next, { color: "#fff" }]}>
          Add to Apple Wallet
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 56,
    // marginVertical: 32,
    // marginTop: 80,
  },

  codeView: {
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: "row",
    gap: 24,
    marginVertical: 64,
    marginTop: 24,
  },

  text: {
    // backgroundColor: "#F2F2F2",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 32,
  },
});

export default ApplePay;
