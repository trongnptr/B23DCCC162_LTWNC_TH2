import { describe, it, expect } from 'vitest';
import { generateSongs } from './songs';

describe('generateSongs', () => {
  it('tạo đúng 10000 bài hát với thông số hợp lệ', () => {
    const songs = generateSongs(10000);
    expect(songs).toHaveLength(10000);
    
    const ids = new Set(songs.map(s => s.id));
    expect(ids.size).toBe(10000);
    
    expect(songs.every(s => s.duration >= 150 && s.duration <= 300)).toBe(true);
  });
});