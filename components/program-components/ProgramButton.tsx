import React, { useCallback, useMemo, useRef, forwardRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "../ui/card";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter, usePathname } from 'expo-router';
interface ProgramCreationProps {
    onPress: () => void
}

export default function ProgramButton({onPress} : ProgramCreationProps) {


    return (
        <Card className="py-2 border-transparent bg-transparent">
            <TouchableOpacity className="bg-white flex-row justify-center items-center gap-1 w-24 p-2 rounded-xl"
                onPress={() => onPress()}
                accessible
                accessibilityRole="button"
            >
                
                <FontAwesome5 name="plus" size={12} color="black" />
            </TouchableOpacity>
            
        </Card>
    )
}

