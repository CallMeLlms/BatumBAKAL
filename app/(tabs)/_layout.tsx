import { Tabs } from "expo-router";
import { TabBar } from "@/components/bottom-tab-components/TabBar";

export default function TabLayout() {
    return (
        <Tabs
        tabBar={(props) => <TabBar {...props}/> }
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
                name="log"
                options={{
                    title: "Log"
                }}
            />
            
            <Tabs.Screen
                name="program"
                options={{
                    title: "Program"
                }}
            />
        
            <Tabs.Screen
                name="progress"
                options={{
                    title: "Progress"
                }}
            />


            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile"
                }}
            />
        </Tabs>
    )
}