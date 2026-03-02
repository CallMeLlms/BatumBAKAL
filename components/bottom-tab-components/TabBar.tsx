import * as React from 'react';
import {
    createStaticNavigation,
    NavigationContainer,
} from '@react-navigation/native';
import { View, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

return (
    <View className="flex-row p-6 bg-zinc-200 rounded-tl-[14px] rounded-tr-[14px] ">
    {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
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
            <Text style={{ color: "black" }}>
                    {label}
            </Text>
            </PlatformPressable>
        );
    })}
    </View>
    );
}
