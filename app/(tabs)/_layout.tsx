import { Tabs } from "expo-router";
import { TabBar } from "@/components/bottom-tab-components/TabBar";

export default function TabLayout() {
    return (
        <Tabs
        initialRouteName="log"
        tabBar={(props) => <TabBar {...props}/> }
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: 'white',
                elevation: 0,
                borderTopWidth: 0,
                position: 'absolute', 
            },
        }}
        >
            {/* <Tabs.Screen
                name="index"
                options={{
                    tabBarItemStyle: { display: "none" },
                    href: null,
                }}
            /> */}

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