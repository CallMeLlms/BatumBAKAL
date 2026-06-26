import { useMemo } from "react";
import type { DaySlot } from "@/types/workout";
import type { Program } from "@/types/program";


export default function useProgramDaySlots(programData: { userProgram: Program } | null) {

    const program = programData?.userProgram;
    
    const workoutDays = useMemo(
        () => [...(program?.workoutDays ?? [])].sort((left, right) => left.dayOrder - right.dayOrder),
        [program?.workoutDays],
    );

    const daySlots = useMemo<DaySlot[]>(() => {
        const daysPerWeek = program?.daysPerWeek ?? 0;
        return Array.from({ length: daysPerWeek }).map((_, index) => {
            const dayOrder = index + 1;
            return {
                dayOrder,
                workoutDay: workoutDays.find((workoutDay) => workoutDay.dayOrder === dayOrder),
            };
        });
    }, [program?.daysPerWeek, workoutDays]);

    return {workoutDays, daySlots, program}
}