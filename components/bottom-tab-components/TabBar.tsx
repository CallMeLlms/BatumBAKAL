import * as React from 'react';
import {
    createStaticNavigation,
    NavigationContainer,
} from '@react-navigation/native';
import { View, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

return (
    <View className="flex-row pb-2 pt-2 bg-zinc-200 rounded-xl m-2">
    {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label : any =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
            const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
        };

        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        };

        return (
        <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            // style={{ flex: 1,}}
            className="flex-1 justify-center items-center"
        >
            {/*  color: isFocused ? colors.primary : colors.text */}
            <FontAwesome5 name="dumbbell" size={16} color="black" />
            <Text style={{ color: "black", fontSize: 10 }}>
                    {label} 
            </Text>
            </PlatformPressable>
        );
    })}
    </View>
    );
}
