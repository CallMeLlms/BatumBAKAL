import * as React from 'react';
import { View } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MAIN_COLORS } from '@/constants/MainColors';

export function TabBar({ state, descriptors, navigation}: BottomTabBarProps) {
    const { buildHref } = useLinkBuilder();

    const iconByRoute: Record<
        string,
        {
            focused: React.ComponentProps<typeof Ionicons>['name'];
            unfocused: React.ComponentProps<typeof Ionicons>['name'];
        }
    > = {
        index: { focused: 'home', unfocused: 'home-outline' },
        log: { focused: 'pencil', unfocused: 'pencil-outline' },
        program: { focused: 'layers', unfocused: 'layers-outline' },
        progress: { focused: 'stats-chart', unfocused: 'stats-chart-outline' },
        profile: { focused: 'person', unfocused: 'person-outline' },
    };

return (
    <View
        className="mx-1 mb-2 px-2 py-1 flex-row rounded-[28px]"
        style={{
            backgroundColor: '#0B0B0B',
            borderWidth: 1,
            borderColor: '#141414',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,  
        }}
    >
    {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const rawLabel =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

        const label = typeof rawLabel === 'string' ? rawLabel : options.title ?? route.name;

        const isFocused = state.index === index;
        const iconSet = iconByRoute[route.name] ?? {
            focused: 'ellipse',
            unfocused: 'ellipse-outline',
        };

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
            android_ripple={null}
            pressColor="transparent"
            pressOpacity={1}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center py-1"
        >
            <View
                className="absolute top-0 h-[1px] w-[22px] rounded-full"
                style={{
                    backgroundColor: isFocused ? MAIN_COLORS.primary : 'transparent',
                }}
            />

            <Ionicons
                name={isFocused ? iconSet.focused : iconSet.unfocused}
                size={18}
                color={isFocused ? MAIN_COLORS.primary : '#4A4A4A'}
            />

            <Text
                style={{
                    marginTop: 2,
                    color: isFocused ? MAIN_COLORS.primary : '#4A4A4A',
                    fontSize: 9,
                    fontWeight: isFocused ? '700' : '500',
                }}
            >
                    {label}
            </Text>
            </PlatformPressable>
        );
    })}
    </View>
    );
}
