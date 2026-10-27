import { describe, it, expect, beforeEach } from 'vitest';
import { usePlayerStore } from './usePlayerStore';

describe('usePlayerStore', () => {
  beforeEach(() => {
    usePlayerStore.setState({ queue: [], currentIndex: -1, isPlaying: false, position: 0 });
  });

  it('playQueue đặt đúng bài', () => {
    const mockSongs = [{ id: '1', title: 'A', artist: 'B', genre: 'Pop', duration: 200 } as any];
    usePlayerStore.getState().playQueue(mockSongs, 0);
    const state = usePlayerStore.getState();
    expect(state.queue).toHaveLength(1);
    expect(state.currentIndex).toBe(0);
    expect(state.isPlaying).toBe(true);
  });

  it('tick ở giây cuối tự sang bài sau', () => {
    const mockSongs = [
      { id: '1', duration: 200 },
      { id: '2', duration: 250 }
    ] as any;
    
    usePlayerStore.setState({ queue: mockSongs, currentIndex: 0, position: 200, isPlaying: true });
    usePlayerStore.getState().tick();
    
    const state = usePlayerStore.getState();
    expect(state.currentIndex).toBe(1);
    expect(state.position).toBe(0);
  });

  it('next ở bài cuối thì isPlaying là false', () => {
    const mockSongs = [{ id: '1', duration: 200 }] as any;
    usePlayerStore.setState({ queue: mockSongs, currentIndex: 0, isPlaying: true });
    
    usePlayerStore.getState().next();
    
    const state = usePlayerStore.getState();
    expect(state.isPlaying).toBe(false);
    expect(state.position).toBe(0);
  });
});