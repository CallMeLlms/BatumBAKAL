import { Stack } from "expo-router";


export default function Log () {
    return (
        <Stack
        screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "log"
                }}
            />
        </Stack>
    )
}