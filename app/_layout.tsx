import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Slot />;
  }
  return (
    <Stack
      screenOptions={{ navigationBarColor: "#fff", gestureEnabled: false }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="verification"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="registration"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(identification)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(authenticated)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="processing"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="passcode"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    // <UserInactivityProvider>
    <GestureHandlerRootView>
      <InitialLayout />
    </GestureHandlerRootView>
    // {/* </UserInactivityProvider> */}
  );
};

export default RootLayoutNav;
