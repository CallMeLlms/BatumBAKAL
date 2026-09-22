import { useProgramBuilderStore } from '@/stores/program-stores/builderStore';
import type { ExerciseDraft } from '@/types/program';

const sampleExercise: ExerciseDraft = {
  exerciseId: 'ex-1',
  name: 'Bench Press',
  sortOrder: 0,
  defaultSets: 3,
  defaultReps: 10,
};

describe('useProgramBuilderStore', () => {
  beforeEach(() => {
    useProgramBuilderStore.getState().reset();
  });

  it('starts with seven empty days', () => {
    const state = useProgramBuilderStore.getState();

    expect(state.title).toBe('');
    expect(state.days).toHaveLength(7);
    expect(state.days[0].name).toBe('Monday');
  });

  it('updates title and description via setMeta', () => {
    useProgramBuilderStore.getState().setMeta('Push day', 'Chest focus');

    const state = useProgramBuilderStore.getState();
    expect(state.title).toBe('Push day');
    expect(state.description).toBe('Chest focus');
  });

  it('toggles a day status without touching other days', () => {
    useProgramBuilderStore.getState().toggleDayStatus(0, 'active');

    const state = useProgramBuilderStore.getState();
    expect(state.days[0].status).toBe('active');
    expect(state.days[1].status).toBe('empty');
  });

  it('adds and removes an exercise for a single day', () => {
    useProgramBuilderStore.getState().addExercise(0, sampleExercise);
    expect(useProgramBuilderStore.getState().days[0].exercises).toHaveLength(1);

    useProgramBuilderStore.getState().removeExercise(0, 'ex-1');
    expect(useProgramBuilderStore.getState().days[0].exercises).toHaveLength(0);
  });

  it('reset clears meta, statuses, and exercises', () => {
    const { setMeta, toggleDayStatus, addExercise, reset } = useProgramBuilderStore.getState();
    setMeta('Temp', 'Temp desc');
    toggleDayStatus(0, 'active');
    addExercise(0, sampleExercise);
    reset();

    const state = useProgramBuilderStore.getState();
    expect(state.title).toBe('');
    expect(state.description).toBe('');
    expect(state.days[0].status).toBe('empty');
    expect(state.days[0].exercises).toHaveLength(0);
  });
});
