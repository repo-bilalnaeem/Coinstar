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
        name="color"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="design"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="name"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="preference"
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen name="completeSetup" options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="myCards"
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen name="(settings)" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default Layout;
