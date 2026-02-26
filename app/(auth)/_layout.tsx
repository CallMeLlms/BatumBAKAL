import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{headerShown: false}}>

      <Stack.Screen
        name="signIn"
        options={{
          title: 'signIn',
          // href: null,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          title: 'signUp',
          // href: null,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
