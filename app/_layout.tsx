import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useRouter, useSegments } from "expo-router";
// import { UserInactivityProvider } from "@/context/UserInactivity";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segment = useSegments();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // const loggedIn = await isUserLoggedIn();
        // const data = await logAllStorageItems();
        // setIsSignedIn(loggedIn);
      } catch (error) {
        console.error("Error checking authentication state: ", error);
        setIsSignedIn(false);
      }
    };

    checkAuthState();
  }, []);

  useEffect(() => {
    // console.log("isSignedIn: ", isSignedIn);

    const inAuthGroup = segment[0] === "authenticated";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/passcode");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isSignedIn) {
    return <Slot />;
  }
  return (
    <Stack screenOptions={{ navigationBarColor: "#fff" }}>
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
        name="identification"
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

      <Stack.Screen
        name="(authenticated)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  const isDakMode = useColorScheme() === "dark" && "#191A1D";
  const { top } = useSafeAreaInsets();
  return (
    // <UserInactivityProvider>
    <GestureHandlerRootView>
      <InitialLayout />
    </GestureHandlerRootView>
    // {/* </UserInactivityProvider> */}
  );
};

export default RootLayoutNav;