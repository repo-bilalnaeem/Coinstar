import { View, Text } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="id"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sent"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
