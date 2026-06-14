import { useMemo } from "react";
import { DaySlot, ProgramData } from "@/components/program-components/ProgramDetailedWorkoutScreen";



export default function useProgramDaySlots(programData: ProgramData | null) {

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

    return {workoutDays, daySlots}
}