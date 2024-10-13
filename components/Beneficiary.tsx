import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  formatAccountNumber,
  sortedBeneficiaryData,
  groupByInitialLetter,
} from "@/store/beneficiaryList";
import { Href, router } from "expo-router";

const Beneficiary = () => {
  const groupedData = groupByInitialLetter(sortedBeneficiaryData);

  return (
    <View style={{ gap: 16 }}>
      {Object.keys(groupedData)
        .sort()
        .map((letter) => (
          <View key={letter}>
            <Text style={styles.letterHeader}>{letter}</Text>
            <View style={{ gap: 20 }}>
              {groupedData[letter].map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.container}
                  activeOpacity={0.65}
                  onPress={() => router.push("/id")}
                >
                  <View style={styles.thumbnail}>
                    {item.image ? (
                      <Image source={item.image} style={styles.image} />
                    ) : (
                      <Text>
                        {item.firstname[0]}
                        {item.lastname[0]}
                      </Text>
                    )}
                  </View>
                  <View style={{ gap: 4, flexGrow: 1 }}>
                    <Text style={styles.name}>
                      {item.firstname} {item.lastname}
                    </Text>
                    <Text style={styles.accountNumber}>
                      {formatAccountNumber(item.account)}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  letterHeader: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#575757",
    marginBottom: 16,
    // marginHorizontal: 16,
    // marginVertical: 8,
  },
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
    marginHorizontal: 16,
    paddingHorizontal: 10,
    paddingRight: 14,
    gap: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});

export default Beneficiary;
