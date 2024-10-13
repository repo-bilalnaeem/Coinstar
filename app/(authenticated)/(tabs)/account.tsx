import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import ToggleButton from "@/components/ToggleButton";

interface PersonalInfo {
  label: string;
  property: string;
  icon: any;
}

interface Settings {
  icon: any;
  heading: string;
  description: string;
}

const RenderPersonalInfo = ({ label, property, icon }: PersonalInfo) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Image source={icon} style={styles.icon} />
      <View style={{ flexGrow: 1 }}>
        <Text style={[styles.heading, { textAlign: "auto", marginBottom: 4 }]}>
          {label}
        </Text>
        <Text style={styles.label}>{property}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} />
    </TouchableOpacity>
  );
};

const RenderSetting = ({ icon, heading, description }: Settings) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Image source={icon} style={styles.icon} />
      <View style={{ flexGrow: 1 }}>
        <Text style={[styles.label, { marginBottom: 4 }]}>{heading}</Text>
        <Text style={[styles.heading, { textAlign: "left", marginBottom: 0 }]}>
          {description}
        </Text>
      </View>
      <ToggleButton />
    </View>
  );
};

const account = () => {
  const snapPoints = useMemo(() => ["57.5%", "80%"], []);
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + 44,
        },
      ]}
    >
      <Image
        source={require("@/assets/images/lightBlue-curl.png")}
        style={styles.backgroundImg}
      />
      <View style={styles.title}>
        <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 24 }}>
          My account
        </Text>
        <View style={styles.user}>
          <TouchableOpacity style={styles.edit}>
            <SimpleLineIcons name="pencil" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet
        snapPoints={snapPoints}
        backgroundStyle={{
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#fff",
        }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            marginHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Personal Info</Text>
          <View style={{ gap: 24, marginBottom: 24 }}>
            <RenderPersonalInfo
              label="Your name"
              property="Bilal Naeem"
              icon={require("@/assets/images/account-icon.png")}
            />
            <RenderPersonalInfo
              label="Phone number"
              property="+38 097-123-0123"
              icon={require("@/assets/images/phone-icon.png")}
            />
            <RenderPersonalInfo
              label="Email address"
              property="lane@example.com"
              icon={require("@/assets/images/email-icon.png")}
            />
          </View>

          <Text style={styles.heading}>Settings</Text>

          <View
            style={{
              gap: 24,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#aaa",
              paddingBottom: 16,
            }}
          >
            <RenderSetting
              icon={require("@/assets/images/faceId-icon.png")}
              heading="Allow Face ID"
              description="Allow Face ID to enter into app"
            />
            <RenderSetting
              icon={require("@/assets/images/money-icon.png")}
              heading="Showing Coins"
              description="Amounts in the format 00.00"
            />
            <RenderSetting
              icon={require("@/assets/images/incognito-icon.png")}
              heading="Incognito mode"
              description="The balance will be hidden"
            />
          </View>
          <View style={{ gap: 24, marginVertical: 24 }}>
            <RenderPersonalInfo
              label="Code to enter into the app"
              property="Change entrance code"
              icon={require("@/assets/images/code.png")}
            />
            <RenderPersonalInfo
              label="Language"
              property="English"
              icon={require("@/assets/images/lang.png")}
            />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    width: 100,
    height: 100,
    backgroundColor: "darkblue",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 0,
    position: "relative",
  },

  heading: {
    color: "#575757",
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "400",
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  label: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },

  backgroundImg: {
    resizeMode: "contain",
    width: 333,
    height: 450,
    position: "absolute",
    top: -137,
    right: -90,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },

  container: {
    flex: 1,
    backgroundColor: "#EAEEFF",
    position: "relative",
  },

  edit: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "#fff",
    width: 36,
    height: 36,
    borderRadius: 50,
    bottom: -2,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default account;
