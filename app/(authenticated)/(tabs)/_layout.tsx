import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#000",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Wallet",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "bag-handle" : "bag-handle-outline"}
              size={24}
              color={focused ? "#F5EC07" : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          headerShown: false,
          headerTransparent: true,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name="chart-donut"
              size={24}
              color={focused ? "#F5EC07" : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          title: "Account",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? "#F5EC07" : "grey"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
