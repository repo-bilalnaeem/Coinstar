import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="cardSetup"
        options={{
          headerShown: false,
        }}
      /> */}

      {/* <Stack.Screen name="completeSetup" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="yourCard" options={{ headerShown: false }} /> */}

      {/* <Stack.Screen name="(settings)" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default Layout;
