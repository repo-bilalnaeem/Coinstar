import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const Selfie = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      router.navigate("/processing");
    }
  };

  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        isDarkMode ? { backgroundColor: "#000" } : { backgroundColor: "#fff" },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 26,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          source={require("@/assets/images/Selfie.png")}
          style={{
            width: "100%",
            height: 344,
            resizeMode: "contain",
            alignItems: "center",
          }}
        />
        <View style={{ flex: 1, paddingVertical: 32 }}>
          <Text
            style={[
              {
                fontSize: 28,
                lineHeight: 32,
                fontWeight: "600",
                textAlign: "center",
                marginBottom: 18,
                marginTop: 18,
              },
              isDarkMode ? { color: "#fff" } : undefined,
            ]}
          >
            Take a selfie
          </Text>
          <Text
            style={[
              {
                textAlign: "center",
                color: "#575757",
                fontWeight: "400",
                fontSize: 14,
                lineHeight: 20,
              },
              isDarkMode ? { color: "#fbfbfb" } : undefined,
            ]}
          >
            We use your selfie to co mpare with your{"\n"}passport photo
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleTakePhoto}
          style={[
            styles.button,
            styles.buttonActive,
            { marginHorizontal: 20 },
            isDarkMode ? { backgroundColor: "#fff" } : undefined,
          ]}
        >
          <Text
            style={[
              styles.next,
              isDarkMode ? { color: "#000" } : { color: "#fff" },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  next: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
    fontStyle: "normal",
    color: "#575757",
    // paddingLeft: 12,
  },

  button: {
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#BFBFBF",
    flexDirection: "row",
  },

  buttonActive: {
    backgroundColor: "#000", // Change the color when the phone number is valid
    // marginVertical: 24,
  },
});

export default Selfie;
