import { ActivityIndicator, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { MAIN_COLORS } from '@/constants/MainColors';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders an ActivityIndicator with default size and color', () => {
    const { UNSAFE_getByType } = render(<LoadingSpinner />);

    const indicator = UNSAFE_getByType(ActivityIndicator);
    expect(indicator.props.size).toBe('large');
    expect(indicator.props.color).toBe(MAIN_COLORS.primary);
  });

  it('passes custom size and color to the ActivityIndicator', () => {
    const { UNSAFE_getByType } = render(<LoadingSpinner size="small" color="#ff0000" />);

    const indicator = UNSAFE_getByType(ActivityIndicator);
    expect(indicator.props.size).toBe('small');
    expect(indicator.props.color).toBe('#ff0000');
  });

  it('wraps the indicator in a centered View when fullScreen', () => {
    const { UNSAFE_getByType } = render(<LoadingSpinner fullScreen />);

    const wrapper = UNSAFE_getByType(View);
    expect(wrapper.props.className).toContain('flex-1');
    expect(wrapper.props.className).toContain('items-center');
    expect(wrapper.props.className).toContain('justify-center');
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
