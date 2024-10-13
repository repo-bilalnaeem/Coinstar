import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Processing = () => {
  const [documentUploaded, setDocumentUploaded] = useState(true);
  const [documentApproved, setDocumentApproved] = useState(false);
  const [selfieApproved, setSelfieApproved] = useState(false);

  useEffect(() => {
    const documentApprovalTimer = setTimeout(() => {
      setDocumentApproved(true);
      console.log("Documents approved");
    }, 3000);

    const selfieApprovalTimer = setTimeout(() => {
      setSelfieApproved(true);
      console.log("Selfie approved");
    }, 5000);
    return () => {
      clearTimeout(documentApprovalTimer);
      clearTimeout(selfieApprovalTimer);
      console.log("Cleanup timers");
    };
  }, [documentUploaded]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={require("@/assets/images/Processing.png")}
        style={{
          width: "100%",
          height: 352,
          resizeMode: "contain",
          alignItems: "center",
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 32,
            textAlign: "center",
            fontWeight: "500",
            lineHeight: 36,
            marginBottom: 16,
          }}
        >
          Wait a minute
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#575757",
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 20,
            marginBottom: 32,
          }}
        >
          We analyze your profile verification
        </Text>
        <View
          style={{ width: 220, justifyContent: "center", alignSelf: "center" }}
        >
          <View style={styles.statusItem}>
            {documentUploaded ? (
              <View
                style={{
                  backgroundColor: "#ECF6F1",
                  borderRadius: 50,
                  padding: 8,
                }}
              >
                <Ionicons name="checkmark-outline" size={20} color={"#000"} />
              </View>
            ) : (
              <View style={{ paddingHorizontal: 8 }}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
            <Text style={styles.processing}>Documents uploaded</Text>
          </View>

          <View style={styles.statusItem}>
            {documentApproved ? (
              <View
                style={{
                  backgroundColor: "#ECF6F1",
                  borderRadius: 50,
                  padding: 8,
                }}
              >
                <Ionicons name="checkmark-outline" size={20} color={"#000"} />
              </View>
            ) : (
              <View style={{ paddingHorizontal: 8 }}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
            <Text style={styles.processing}>Documents approved</Text>
          </View>

          <View style={styles.statusItem}>
            {selfieApproved ? (
              <View
                style={{
                  backgroundColor: "#ECF6F1",
                  borderRadius: 50,
                  padding: 8,
                }}
              >
                <Ionicons name="checkmark-outline" size={20} color={"#000"} />
              </View>
            ) : (
              <View style={{ paddingHorizontal: 8 }}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
            <Text style={styles.processing}>Selfie approved</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          documentApproved && selfieApproved
            ? styles.buttonActive
            : styles.buttonInactive,
        ]}
        disabled={!(documentApproved && selfieApproved)}
        onPress={() => router.replace("/passcode")}
      >
        <Text style={[styles.next, { color: "#fff" }]}>
          Finish Verification
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  next: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    fontStyle: "normal",
    color: "#575757",
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    // marginVertical: 24,
  },
  buttonActive: {
    backgroundColor: "#000",
  },
  buttonInactive: {
    backgroundColor: "#BFBFBF",
  },
  processing: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    fontStyle: "normal",
    color: "#000",
    marginLeft: 10,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    // justifyContent:"center"
  },
});

export default Processing;
