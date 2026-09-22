import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges class names into a single string', () => {
    expect(cn('px-2', 'py-1')).toContain('px-2');
    expect(cn('px-2', 'py-1')).toContain('py-1');
  });

  it('resolves conflicting Tailwind classes with the last value winning', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('ignores falsy and conditional values', () => {
    expect(cn('px-2', false && 'px-4', undefined, null)).toBe('px-2');
  });
});
