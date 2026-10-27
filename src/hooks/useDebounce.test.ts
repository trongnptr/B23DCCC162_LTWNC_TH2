import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  it('đổi giá trị sau delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'initial' }
    });

    expect(result.current).toBe('initial');
    rerender({ value: 'changed' });
    
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe('initial');

    act(() => { vi.advanceTimersByTime(100); });
    expect(result.current).toBe('changed');

    vi.useRealTimers();
  });
});