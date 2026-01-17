import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import { AuthProvider, useAuth } from '@/context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { isVerified, isLoading } = useAuth();
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isVerified && !inAuthGroup) {
      router.replace('/(auth)/signIn');
    } else if (isVerified && inAuthGroup) {
      router.replace('/(tabs)');
    }
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
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

        {/* <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack> */}
        <RootLayoutNav/>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
