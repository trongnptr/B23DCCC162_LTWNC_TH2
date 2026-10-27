import { describe, it, expect } from 'vitest';
import { formatDuration } from './format';

describe('formatDuration', () => {
  it('00:00', () => expect(formatDuration(0)).toBe('0:00'));
  it('65 -> 1:05', () => expect(formatDuration(65)).toBe('1:05'));
  it('300 -> 5:00', () => expect(formatDuration(300)).toBe('5:00'));
});