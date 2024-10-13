import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

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
        name="biometrics"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(card)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="card"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
