import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(transfer)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
