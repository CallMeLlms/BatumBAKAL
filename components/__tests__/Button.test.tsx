import React from 'react';
import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button, buttonVariants } from '@/components/ui/button';

describe('Button', () => {
  it('renders label text with button role', () => {
    render(
      <Button>
        <Text>Save program</Text>
      </Button>
    );

    expect(screen.getByText('Save program')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(
      <Button onPress={onPress}>
        <Text>Press me</Text>
      </Button>
    );

    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies opacity-50 styling when disabled', () => {
    render(
      <Button disabled>
        <Text>Disabled</Text>
      </Button>
    );

    expect(screen.getByRole('button').props.className).toContain('opacity-50');
  });

  it('destructive variant includes destructive background styling', () => {
    expect(buttonVariants({ variant: 'destructive' })).toContain('bg-destructive');
  });
});
