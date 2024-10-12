import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import * as ImagePicker from "expo-image-picker";

import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CardFront = () => {
  const [image, setImage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    if (hasCameraPermission === null) {
      // Permissions are still loading
      console.log("Requesting camera permissions...");
      return;
    }
    if (hasCameraPermission === false) {
      // Permissions are not granted
      alert("No access to camera. Please allow camera access from settings.");
      return;
    }

    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: false,
        aspect: [16, 9],
        quality: 1,
      });

      // console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        router.replace("/selfie");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 26,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={styles.card}>
          <Text style={styles.title}>Identification Card</Text>
          <View style={styles.cardContent}>
            <Image
              source={require("@/assets/images/Signature.png")}
              style={styles.signatureImage}
            />
            <View style={styles.idCardContainer}>
              <Image
                source={require("@/assets/images/IdCard.png")}
                style={styles.idCardImage}
              />
            </View>
            <ContentLoader
              speed={2}
              width={200}
              height={140}
              viewBox="0 0 350 300"
              backgroundColor="#e6e6e6"
              foregroundColor="#CDCDCD"
            >
              <Rect x="0" y="50" rx="8" ry="8" width="50" height="14" />
              <Rect x="60" y="50" rx="8" ry="8" width="150" height="14" />
              <Rect x="0" y="90" rx="8" ry="8" width="50" height="14" />
              <Rect x="60" y="90" rx="8" ry="8" width="200" height="14" />
              <Rect x="0" y="165" rx="8" ry="8" width="50" height="14" />
              <Rect x="60" y="165" rx="8" ry="8" width="240" height="14" />
            </ContentLoader>
          </View>
        </View>
        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>
            Scan the front page{"\n"}of ID card
          </Text>
          <Text style={styles.instructionsSubtitle}>
            Please prepare your document
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.buttonActive]}
          onPress={handleTakePhoto}
        >
          <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>
        <Pressable onPress={pickImage}>
          <Text style={styles.openGalleryText}>Open gallery</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: "#FAFAFB",
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    color: "#000",
    lineHeight: 32,
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureImage: {
    width: 110,
    height: 30,
    resizeMode: "contain",
    alignSelf: "flex-end",
    position: "absolute",
    right: 10,
  },
  idCardContainer: {
    position: "relative",
  },
  idCardImage: {
    height: 140,
    width: 105,
    resizeMode: "contain",
  },
  instructions: {
    flex: 1,
    marginVertical: 50,
  },
  instructionsTitle: {
    textAlign: "center",
    color: "#000",
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "500",
    marginBottom: 24,
  },
  instructionsSubtitle: {
    textAlign: "center",
    color: "#575757",
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BFBFBF",
    flexDirection: "row",
  },
  buttonActive: {
    backgroundColor: "#000",
    marginVertical: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
    color: "#fff",
  },
  openGalleryText: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    padding: 16,
  },
});

export default CardFront;
