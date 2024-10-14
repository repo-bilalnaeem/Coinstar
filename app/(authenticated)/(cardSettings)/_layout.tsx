import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="statement"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="block"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="applePay"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="pinSettings"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="securitySettings"
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  );
};

export default Layout;
