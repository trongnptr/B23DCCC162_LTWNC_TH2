import { describe, it, expect } from 'vitest';
import { playlistReducer, Playlist } from './playlistReducer';

describe('playlistReducer', () => {
  const initialState: Playlist[] = [];

  it('tạo playlist mới', () => {
    const nextState = playlistReducer(initialState, { type: 'create', payload: { id: '1', name: 'Nhạc Trẻ' } });
    expect(nextState).toHaveLength(1);
    expect(nextState[0].name).toBe('Nhạc Trẻ');
  });

  it('addSong không thêm bài trùng', () => {
    const state: Playlist[] = [{ id: '1', name: 'Test', songIds: ['s1'] }];
    const nextState = playlistReducer(state, { type: 'addSong', payload: { playlistId: '1', songId: 's1' } });
    expect(nextState[0].songIds).toHaveLength(1);
  });

  it('removeSong xóa bài khỏi playlist', () => {
    const state: Playlist[] = [{ id: '1', name: 'Test', songIds: ['s1', 's2'] }];
    const nextState = playlistReducer(state, { type: 'removeSong', payload: { playlistId: '1', songId: 's1' } });
    expect(nextState[0].songIds).toEqual(['s2']);
  });

  it('xóa playlist không tồn tại thì state giữ nguyên', () => {
    const state: Playlist[] = [{ id: '1', name: 'Test', songIds: [] }];
    const nextState = playlistReducer(state, { type: 'remove', payload: { id: '99' } });
    expect(nextState).toEqual(state);
  });
});