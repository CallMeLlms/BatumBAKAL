import { FOCUS_TAGS, FOCUS_TAG_MUSCLE_MAP, FocusTag, MuscleGroup } from "@/constants/workout-day-constants/focusTagMap";
import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { MAIN_COLORS } from "@/constants/MainColors";

interface FocusTagSelectorProps {
    onSelectionChange?: (focusTags: FocusTag[], muscleGroups: MuscleGroup[]) => void;
}

function MuscleGroupChip({
    muscle,
    isSelected,
    onToggle
}: {
    muscle: MuscleGroup;
    isSelected: boolean;
    onToggle: () => void;
}) {
    const displayName = muscle.split('_').join(' ');

    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.7}
            style={{
                backgroundColor: isSelected ? MAIN_COLORS.primary : MAIN_COLORS.darkGrey,
                borderWidth: 1,
                borderColor: isSelected ? MAIN_COLORS.primary : MAIN_COLORS.mediumGrey,
            }}
            className="px-3 py-2 rounded-lg mr-2 mb-2"
        >
            <Text
                style={{
                    color: isSelected ? MAIN_COLORS.black : MAIN_COLORS.lightGrey,
                    fontWeight: isSelected ? '600' : '400',
                }}
                className="text-sm capitalize"
            >
                {displayName.toLowerCase()}
            </Text>
        </TouchableOpacity>
    );
}

function FocusTagPill({
    tag,
    isSelected,
    onPress
}: {
    tag: FocusTag;
    isSelected: boolean;
    onPress: () => void;
}) {
    const displayName = tag.split('_').join(' ');

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                backgroundColor: isSelected ? MAIN_COLORS.primary : 'transparent',
                borderWidth: 1.5,
                borderColor: isSelected ? MAIN_COLORS.primary : MAIN_COLORS.mediumGrey,
            }}
            className="px-4 py-2.5 rounded-full mr-2 mb-2"
        >
            <Text
                style={{
                    color: isSelected ? MAIN_COLORS.black : MAIN_COLORS.lightGrey,
                    fontWeight: isSelected ? '700' : '500',
                }}
                className="text-sm"
            >
                {displayName}
            </Text>
        </TouchableOpacity>
    );
}

export default function FocusTagSelector({ onSelectionChange }: FocusTagSelectorProps) {
    const [selectedFocusTags, setSelectedFocusTags] = useState<FocusTag[]>([]);
    const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([]);

    // Get all unique muscles from selected focus tags
    const getAvailableMuscles = (): MuscleGroup[] => {
        const muscleSet = new Set<MuscleGroup>();
        selectedFocusTags.forEach(tag => {
            FOCUS_TAG_MUSCLE_MAP[tag].forEach(muscle => muscleSet.add(muscle));
        });
        return Array.from(muscleSet);
    };

    const availableMuscles = getAvailableMuscles();

    // Auto-select/deselect muscles when focus tags change
    useEffect(() => {
        if (selectedFocusTags.length === 0) {
            setSelectedMuscles([]);
        } else {
            // Auto-select all available muscles
            setSelectedMuscles(availableMuscles);
        }
    }, [selectedFocusTags]);

    // Notify parent of selection changes
    useEffect(() => {
        onSelectionChange?.(selectedFocusTags, selectedMuscles);
    }, [selectedFocusTags, selectedMuscles]);

    const handleFocusTagPress = (tag: FocusTag) => {
        setSelectedFocusTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const handleMuscleToggle = (muscle: MuscleGroup) => {
        setSelectedMuscles(prev => {
            if (prev.includes(muscle)) {
                return prev.filter(m => m !== muscle);
            } else {
                return [...prev, muscle];
            }
        });
    };

    return (
        <View>
            {/* Section Label */}
            <Text
                style={{ color: MAIN_COLORS.lightGrey }}
                className="text-base font-semibold mb-3"
            >
                Focus Category
            </Text>

            {/* Focus Tag Pills - Flex Wrap */}
            <View className="flex-row flex-wrap mb-4">
                {FOCUS_TAGS.map((tag) => (
                    <FocusTagPill
                        key={tag}
                        tag={tag}
                        isSelected={selectedFocusTags.includes(tag)}
                        onPress={() => handleFocusTagPress(tag)}
                    />
                ))}
            </View>

            {/* Muscle Groups Section */}
            {selectedFocusTags.length > 0 && (
                <View
                    style={{
                        backgroundColor: MAIN_COLORS.darkGrey,
                        borderRadius: 12,
                    }}
                    className="p-4"
                >
                    <View className="flex-row justify-between items-center mb-3">
                        <Text
                            style={{ color: MAIN_COLORS.lightGrey }}
                            className="text-sm font-medium"
                        >
                            Target Muscles
                        </Text>
                        <Text
                            style={{ color: MAIN_COLORS.mediumGrey }}
                            className="text-xs"
                        >
                            {selectedMuscles.length} / {availableMuscles.length}
                        </Text>
                    </View>

                    {/* Muscle Group Chips */}
                    <View className="flex-row flex-wrap">
                        {availableMuscles.map((muscle) => (
                            <MuscleGroupChip
                                key={muscle}
                                muscle={muscle}
                                isSelected={selectedMuscles.includes(muscle)}
                                onToggle={() => handleMuscleToggle(muscle)}
                            />
                        ))}
                    </View>

                    {/* Selected Summary */}
                    {selectedMuscles.length > 0 && (
                        <View
                            style={{
                                borderTopWidth: 1,
                                borderTopColor: MAIN_COLORS.mediumGrey + '40',
                            }}
                            className="mt-3 pt-3"
                        >
                            <Text
                                style={{ color: MAIN_COLORS.primary }}
                                className="text-xs font-medium"
                            >
                                {selectedMuscles.map(m => m.split('_').join(' ').toLowerCase()).join(' • ')}
                            </Text>
                        </View>
                    )}
                </View>
            )}

            {/* Empty State */}
            {selectedFocusTags.length === 0 && (
                <View
                    style={{
                        backgroundColor: MAIN_COLORS.darkGrey + '60',
                        borderWidth: 1,
                        borderColor: MAIN_COLORS.mediumGrey + '40',
                        borderStyle: 'dashed',
                    }}
                    className="p-6 rounded-xl items-center"
                >
                    <Text
                        style={{ color: MAIN_COLORS.mediumGrey }}
                        className="text-sm text-center"
                    >
                        Select focus categories to see target muscles
                    </Text>
                </View>
            )}
        </View>
    );
}
