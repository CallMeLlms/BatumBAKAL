import { Tabs } from "expo-router";


export default function TabLayout() {
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
        }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="program"
                options={{
                    title: "Program"
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile"
                }}
            />
            <Tabs.Screen
                name="progress"
                options={{
                    title: "Progress"
                }}
            />
        </Tabs>
    )
}