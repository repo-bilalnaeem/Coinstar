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
        name="dateOfBirth"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="contactInfo"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="cardFront"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="selfie"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
