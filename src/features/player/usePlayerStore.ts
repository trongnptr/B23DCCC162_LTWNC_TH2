import { create } from 'zustand';
import type { Song } from '../../types';

interface PlayerState {
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  position: number;
  playQueue: (songs: Song[], startIndex: number) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  addToQueue: (song: Song) => void;
  tick: () => void;
}

export const usePlayerStore = create<PlayerState>()((set, get) => ({
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  position: 0,
  playQueue: (songs, startIndex) => set({ queue: songs, currentIndex: startIndex, position: 0, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying && state.currentIndex !== -1 })),
  next: () => set((state) => {
    if (state.currentIndex >= state.queue.length - 1) return { isPlaying: false, position: 0 };
    return { currentIndex: state.currentIndex + 1, position: 0 };
  }),
  prev: () => set((state) => {
    if (state.position > 3) return { position: 0 };
    if (state.currentIndex <= 0) return { position: 0 };
    return { currentIndex: state.currentIndex - 1, position: 0 };
  }),
  addToQueue: (song) => set((state) => {
    if (state.queue.some(s => s.id === song.id)) return state;
    return { queue: [...state.queue, song], currentIndex: state.currentIndex === -1 ? 0 : state.currentIndex };
  }),
  tick: () => {
    const state = get();
    if (!state.isPlaying || state.currentIndex === -1) return;
    const currentSong = state.queue[state.currentIndex];
    if (state.position >= currentSong.duration) {
      state.next();
    } else {
      set({ position: state.position + 1 });
    }
  }
}));