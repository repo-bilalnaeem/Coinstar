import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { formatAccountNumber } from "@/store/beneficiaryList";
import BottomSheet from "@gorhom/bottom-sheet";
import { defaultStyles } from "@/constants/Styles";
import normalizer from "@/utils/price-string-normalizer";
import { StatusBar } from "expo-status-bar";

const Page = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const inputRef = useRef(null);
  const [numValue, setNumValue] = useState("0.00");

  const handleValueChange = (text: string) => {
    const normalizedValue = normalizer(text);
    setNumValue(normalizedValue);
  };

  useEffect(() => {
    // Automatically focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const GoBack = () => {
    const firstname = "Bilal";
    const lastname = "Naeem";

    return (
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 26,
          flexDirection: "row",
          gap: 8,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36 }}>
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} activeOpacity={0.65}>
          <View style={styles.thumbnail}>
            <Text>
              {firstname[0]}
              {lastname[0]}
            </Text>
          </View>
          <View style={{ gap: 4, flexGrow: 1 }}>
            <Text style={styles.name}>Bilal Naeem</Text>
            <Text style={styles.accountNumber}>
              {formatAccountNumber(5231385949305515)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ paddingTop: top, flex: 1, backgroundColor: "#fff" }}>
      <GoBack />
      <StatusBar style="dark" />
      <View style={styles.inputContainer}>
        <Text style={styles.currency}>$</Text>
        <TextInput
         ref={inputRef}
          value={numValue} // Directly using the state value
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          onChangeText={handleValueChange}
          clearTextOnFocus
          placeholderTextColor={"gray"}
          caretHidden
        />
      </View>

      <BottomSheet
        handleIndicatorStyle={{ backgroundColor: "#FAFAFB" }}
        snapPoints={["54%"]}
        backgroundStyle={{ backgroundColor: "#FAFAFB", borderRadius: 32 }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.content}>
            <View style={styles.card} />
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.cardTitle}>My Debit Card</Text>
              <Text style={styles.amount}>$2,850.00</Text>
            </View>
            <Ionicons name="chevron-down" size={20} />
          </View>

          <TouchableOpacity
            style={[
              defaultStyles.button,
              defaultStyles.buttonActive,
              { height: 48, marginVertical: 0 },
            ]}
            onPress={() => {
              router.push("/sent");
            }}
            // onPress={()=> router.dismissAll()}
          >
            <Text style={[defaultStyles.next, { color: "#fff" }]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  accountNumber: {
    color: "#575757",
    lineHeight: 16,
    fontWeight: "400",
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#FFF857",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    marginTop: -4,
    gap: 16,
    alignItems: "center",
  },
  amount: {
    color: "#575757",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 16,
  },
  card: {
    width: 56,
    height: 38,
    backgroundColor: "#0040DE",
    borderRadius: 4,
  },
  content: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 16,
  },
  inputContainer: {
    justifyContent: "center",
    // alignSelf: "center",
    alignItems: "baseline",
    // alignItems:"center",
    flexDirection: "row",
    paddingVertical: "20%",
  },
  currency: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  input: {
    fontSize: 56,
    fontWeight: "600",
    // lineHeight: 32,
    // padding: 8,

    marginLeft: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 4,
  },
});

export default Page;
