import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
    screenOptions={{
      gestureEnabled: false
    }}>
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

      <Stack.Screen
        name="(transfer)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(transactions)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(cardSettings)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
