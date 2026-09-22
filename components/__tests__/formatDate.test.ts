import { formatDate, formatDateTime } from '@/utils/format/formatDate';

describe('formatDate', () => {
  it('formats an ISO date as short month, day, and year', () => {
    expect(formatDate('2026-01-15T12:00:00.000Z')).toBe('Jan 15, 2026');
  });

  it('formats single-digit days without zero padding', () => {
    expect(formatDate('2026-06-05T12:00:00.000Z')).toBe('Jun 5, 2026');
  });
});

describe('formatDateTime', () => {
  it('combines formatted date and time with a separator', () => {
    const result = formatDateTime('2026-01-15T12:00:00.000Z');

    expect(result).toContain('Jan 15, 2026');
    expect(result).toContain('·');
  });
});
