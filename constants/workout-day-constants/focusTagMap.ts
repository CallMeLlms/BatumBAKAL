
export const FOCUS_TAGS = [
    'PUSH',
    'PULL',
    'LEGS',
    'UPPER',
    'LOWER',
    'FULL_BODY'
] as const

export type FocusTag = typeof FOCUS_TAGS[number]

export const MUSCLE_GROUPS = [
    'CHEST',
    'SHOULDERS', 
    'TRICEPS',
    'BACK',
    'BICEPS',
    'REAR_DELTS',
    'QUADS',
    'HAMSTRINGS',
    'GLUTES',
    'CALVES',
    'CORE'
] as const

export type MuscleGroup = typeof MUSCLE_GROUPS[number]

export const FOCUS_TAG_MUSCLE_MAP: Record<FocusTag, MuscleGroup[]> = {
    PUSH:       ['CHEST', 'SHOULDERS', 'TRICEPS'],
    PULL:       ['BACK', 'BICEPS', 'REAR_DELTS'],
    LEGS:       ['QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES'],
    UPPER:      ['CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS'],
    LOWER:      ['QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES'],
    FULL_BODY:  ['CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 
                 'TRICEPS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'CORE'],
}