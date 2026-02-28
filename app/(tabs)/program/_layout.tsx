import { Stack } from "expo-router";

export default function ProgramLayout () {
    return (
    <Stack
        screenOptions={{
        headerShown: false
    }}
    >
        <Stack.Screen
            name="index"
            options={{
                title: 'program',  
            }}
        />
        
    </Stack>

    )
    
}