import { useToastStore } from '@/stores/toastStore';

describe('useToastStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useToastStore.setState({ message: null, type: 'info', isVisible: false });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('starts hidden with no message', () => {
    const state = useToastStore.getState();

    expect(state.isVisible).toBe(false);
    expect(state.message).toBeNull();
  });

  it('shows a toast with message and type', () => {
    useToastStore.getState().showToast('Saved', 'success');

    const state = useToastStore.getState();
    expect(state.isVisible).toBe(true);
    expect(state.message).toBe('Saved');
    expect(state.type).toBe('success');
  });

  it('auto-hides after the given duration', () => {
    useToastStore.getState().showToast('Saved', 'info', 1000);
    expect(useToastStore.getState().isVisible).toBe(true);

    jest.advanceTimersByTime(1000);

    const state = useToastStore.getState();
    expect(state.isVisible).toBe(false);
    expect(state.message).toBeNull();
  });

  it('hideToast clears visibility immediately', () => {
    useToastStore.getState().showToast('Saved', 'error', 5000);
    useToastStore.getState().hideToast();

    const state = useToastStore.getState();
    expect(state.isVisible).toBe(false);
    expect(state.message).toBeNull();
  });
});
