import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
// import { useHeaderHeight } from "@react-navigation/elements";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import BarGraph from "@/components/PaymentBarGraph";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoBack from "@/components/GoBack";
interface renderOptions {
  icon: any;
  label: string;
  description: string | undefined;
}

import { Payments, PaymentType } from "@/store/homePayments";

const RenderOptions = ({ icon, label, description }: renderOptions) => {
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

const Page = () => {
  const { id } = useLocalSearchParams();
  const payment = Payments.find((payment) => id === payment.id);
  const snapPoints = useMemo(() => ["52.5%"], []);
  const { top } = useSafeAreaInsets();
  const headerHeight = 50;
  console.log(id);
  return (
    <View
      style={{
        paddingTop: top,
        // paddingTop: headerHeight,
        flex: 1,
        backgroundColor: "#EAEEFF",
        position: "relative",
      }}
    >
      <Image
        source={require("@/assets/images/lightBlue-curl.png")}
        style={{
          resizeMode: "contain",
          width: 333,
          height: 450,
          position: "absolute",
          top: -137,
          right: -90,
        }}
      />
      <GoBack title="" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
          top: -16,
        }}
      >
        <View style={styles.vendor}>
          <Image
            source={{ uri: payment?.logo }}
            style={{
              width: 72,
              height: 72,
              objectFit: "cover",
              borderRadius: 100,
            }}
          />
        </View>
        <Text style={styles.vendorName}>{payment?.name}</Text>
        <View
          style={{
            borderRadius: 100,
            backgroundColor: "#000",
            marginBottom: 8,
          }}
        >
          <Text style={styles.category}>{payment?.category}</Text>
        </View>
        <Text style={styles.date}>{payment?.date.toDateString()}</Text>
        <Text
          style={[
            styles.amountPaid,
            // payment?.payment === PaymentType.DEBIT
            //   ? {
            //       color: "#000",
            //     }
            //   : {
            //       color: "#4AA879",
            //     },
          ]}
        >
          {payment?.payment === PaymentType.DEBIT ? "-" : "+"}
          {Math.floor(payment?.amount)}
          <Text style={styles.cents}>
            {/* .{String(payment?.amount).split('.')[1] || '00'} */}.
            {(payment?.amount % 1).toFixed(2).substring(2)}
          </Text>
        </Text>
      </View>

      <BottomSheet
        enableOverDrag={false}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#fff",
        }}
      >
        <View style={{ paddingBottom: 24, flex: 1 }}>
          <BottomSheetScrollView
            // bounces={false}
            // scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
            <BarGraph />
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 24,
                gap: 18,
              }}
            >
              <RenderOptions
                icon={require("@/assets/images/pincode.png")}
                description={undefined}
                label="Repeat Transaction"
              />
              <RenderOptions
                icon={require("@/assets/images/pincode.png")}
                description={undefined}
                label="Split Bill"
              />
              <RenderOptions
                icon={require("@/assets/images/pincode.png")}
                description={undefined}
                label="Send Invoice"
              />
              <RenderOptions
                icon={require("@/assets/images/pincode.png")}
                description={undefined}
                label="Report an issue"
              />
            </View>
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  vendor: {
    width: 72,
    height: 72,
    // backgroundColor: "darkblue",
    borderRadius: 100,
    overflow: "hidden",
  },

  vendorName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    lineHeight: 20,
  },

  category: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: "#fff",
  },

  date: {
    color: "#575757",
    lineHeight: 16,
    fontWeight: "400",
  },

  amountPaid: {
    textAlign: "center",
    lineHeight: 64,
    fontSize: 48,
    fontWeight: "500",
  },

  cents: {
    fontSize: 24,
    fontWeight: "500",
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
    marginBottom: 4,
  },
});

export default Page;
