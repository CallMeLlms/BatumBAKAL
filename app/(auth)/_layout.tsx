import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {

  return (
    <Stack
      screenOptions={{headerShown: false}}>

      <Stack.Screen
        name="signIn"
        options={{
          title: 'signIn',  
          animation: "fade_from_bottom",
        }}
      />

      <Stack.Screen
        name="signUp"
        options={{
          title: 'signUp',
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
