import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SongRow } from './SongRow';

vi.mock('../favorites/useFavoritesStore', () => ({
  useFavoritesStore: () => [false, vi.fn()]
}));

vi.mock('../player/usePlayerStore', () => ({
  usePlayerStore: vi.fn((selector) => {
    if (selector.name.includes('addToQueue')) return vi.fn();
    if (selector.name.includes('currentSongId')) return null;
    return false;
  })
}));

vi.mock('../playlists/PlaylistContext', () => ({
  usePlaylistDispatch: () => vi.fn()
}));

describe('SongRow', () => {
  it('hiển thị tên bài và thời lượng, bắt sự kiện onPlay', async () => {
    const mockSong = { id: '1', title: 'Bài Ca', artist: 'Ca Sĩ', genre: 'Pop', duration: 150 } as any;
    const onPlayMock = vi.fn();

    render(<SongRow song={mockSong} index={0} style={{}} onPlay={onPlayMock} selectedPlaylistId="" />);

    expect(screen.getByText('Bài Ca')).toBeInTheDocument();
    expect(screen.getByText('2:30')).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /phát/i });
    await userEvent.click(playButton);
    expect(onPlayMock).toHaveBeenCalled();
  });
});