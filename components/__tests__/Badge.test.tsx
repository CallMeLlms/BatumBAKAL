import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { Badge, badgeVariants } from '@/components/ui/badge';

describe('Badge', () => {
  it('renders badge children text', () => {
    render(
      <Badge>
        <Text>Active</Text>
      </Badge>
    );

    expect(screen.getByText('Active')).toBeTruthy();
  });

  it('default variant includes primary background styling', () => {
    expect(badgeVariants({ variant: 'default' })).toContain('bg-primary');
  });

  it('destructive variant includes destructive background styling', () => {
    expect(badgeVariants({ variant: 'destructive' })).toContain('bg-destructive');
  });
});
