import { useMemo } from "react";
import type { DaySlot } from "@/types/workout";
import type { Program } from "@/types/program";

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function useProgramDaySlots(program: Program | null) {
    
    const workoutDays = useMemo(
        () => [...(program?.workoutDays ?? [])].sort((left, right) => left.dayOrder - right.dayOrder),
        [program?.workoutDays],
    );

    const daySlots = useMemo<DaySlot[]>(() => {
        const dayOfWeek = program?.dayOfWeek ?? 0;
        return Array.from({ length: 7 }).map((_, index) => {
            const dayOrder = index + 1;
            const workoutDay = workoutDays.find((wd) => wd.dayOrder === dayOrder);
            
            const status = workoutDay ? "active" : "empty";

            return {
                dayName: DAY_NAMES[index],
                dayOrder,
                status,
                workoutDay,
            };
        });
    }, [program?.dayOfWeek, workoutDays]);

    return {workoutDays, daySlots, program}
}