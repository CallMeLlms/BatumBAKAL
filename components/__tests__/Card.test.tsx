import React from 'react';
import { render, screen } from '@testing-library/react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

describe('Card', () => {
  it('renders title as a heading with content and description', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Weekly summary</CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>12 workouts</CardDescription>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('Weekly summary')).toBeTruthy();
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByText('Last 7 days')).toBeTruthy();
    expect(screen.getByText('12 workouts')).toBeTruthy();
  });

  it('renders header, content, and footer sections together', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Header title</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Body text</CardDescription>
        </CardContent>
        <CardFooter>
          <CardDescription>Footer text</CardDescription>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Header title')).toBeTruthy();
    expect(screen.getByText('Body text')).toBeTruthy();
    expect(screen.getByText('Footer text')).toBeTruthy();
  });
});
