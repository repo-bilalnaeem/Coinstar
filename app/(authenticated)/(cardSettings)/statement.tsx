import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  Image,
  Share,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import Calendar from "@/components/CustomCalendar";
import BottomSheet from "@gorhom/bottom-sheet";

interface RenderOptions {
  icon?: any;
  label: string;
  description?: string;
  onPress?: () => void;
}

const CardStatement = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [showCalendar, setShowCalendar] = useState(false); // State to manage calendar visibility
  const [showLanguage, setShowLangugae] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const RenderOptions = ({
    icon,
    label,
    description,
    onPress,
  }: RenderOptions) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 24,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
        onPress={onPress} // Use the onPress function passed as prop
      >
        <Image source={icon} style={styles.icon} />
        <View style={{ flexGrow: 1 }}>
          <Text style={styles.label}>{label}</Text>
          {description && <Text>{description}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>
    );
  };

  const openCalendar = () => {
    setShowCalendar(true); // Show the calendar
  };

  const closeCalendar = () => {
    setShowCalendar(false); // Hide the calendar
  };

  const openLang = () => {
    setShowLangugae(true);
  };

  const closeLang = () => {
    setShowLangugae(false);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          Get a card Statement
        </Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16, gap: 8, marginTop: 24 }}>
        <RenderOptions
          icon={require("@/assets/images/wallet.png")}
          label="Card"
          //   component={}
          description="Debit card ****4412"
        />
        <RenderOptions
          icon={require("@/assets/images/calendar.png")}
          label="Date Period"
          onPress={openCalendar} // Open calendar when pressed
          description="1 - 13 June"
        />
        <RenderOptions
          icon={require("@/assets/images/document.png")}
          label="Type of file"
          description="PDF"
        />
        <RenderOptions
          icon={require("@/assets/images/lang.png")}
          label="Language"
          description="English"
          onPress={openLang}
        />
      </View>
      <TouchableOpacity
        style={[
          defaultStyles.button,
          defaultStyles.buttonActive,

          { height: 48, marginHorizontal: 20, marginVertical: 0 },
        ]}
        onPress={onShare}
      >
        <Text style={[defaultStyles.next, { color: "#fff" }]}>
          Get Statement
        </Text>
      </TouchableOpacity>

      {/* Calendar Bottom Sheet */}
      {showCalendar && (
        // <View style={styles.calendarContainer}>
        <BottomSheet
          enablePanDownToClose
          snapPoints={["53.6%"]}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={styles.indicator}
          onClose={() => setShowCalendar(false)}
        >
          <View
            style={{
              paddingHorizontal: 32,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 30, fontWeight: "500" }}>
              Date Period
            </Text>
            <TouchableOpacity onPress={closeCalendar}>
              <AntDesign name="close" size={24} />
            </TouchableOpacity>
          </View>
          <Calendar />
        </BottomSheet>
        // </View>
      )}

      {showLanguage && (
        <BottomSheet
          enablePanDownToClose
          snapPoints={[250]}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={styles.indicator}
          onClose={() => setShowLangugae(false)}
        >
          <View style={{ paddingHorizontal: 16, paddingVertical: 10, gap: 10 }}>
            <TouchableOpacity
              style={[
                styles.langOption,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: "#F2F2F2",
                },
              ]}
            >
              <Text style={[styles.langText]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langOption,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: "#F2F2F2",
                },
              ]}
            >
              <Text style={styles.langText}>Urdu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.langOption}>
              <Text style={styles.langText}>Arabic</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  label: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 4,
  },

  calendarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  closeButton: {
    alignSelf: "flex-end",
    marginTop: 12,
  },

  closeButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },

  sheetBackground: {
    // backgroundColor: "grey",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },

  indicator: {
    backgroundColor: "white",
  },

  langText: {
    fontSize: 16,
    fontWeight: "500",
  },

  langOption: {
    paddingVertical: 14,
  },
});

export default CardStatement;
