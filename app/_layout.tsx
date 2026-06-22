import 'react-native-gesture-handler';
import "../global.css"
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import  useInterFonts from '@/hooks/useInterFonts';
// import { PortalHost } from '@rn-primitives/portal';
import { useAuthStore } from "@/stores/authStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import GlobalBottomSheet from '@/components/shared/BottomSheet';
import { useProfileData } from "@/stores/profileStore";

import "@/api/interceptors/jwtInterceptor";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { isVerified, isLoading, initializeAuth } = useAuthStore();
  const fetchProfile = useProfileData((state) => state.fetchProfile);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (isVerified) {
      fetchProfile();
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (!isVerified && !inAuthGroup) {
      router.replace('/(auth)/signIn');
    } else if (isVerified && inAuthGroup) {
      router.replace('/(tabs)');
    }

    SplashScreen.hideAsync();
  }, [isVerified, isLoading])

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const interFontsLoaded = useInterFonts();

  if (!interFontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
          <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
            <RootLayoutNav/>
            <StatusBar style="auto" />
          </ThemeProvider>
          <GlobalBottomSheet/>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
