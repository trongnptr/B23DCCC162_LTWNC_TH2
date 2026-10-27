import React, { memo } from 'react';
import type { Song } from '../../types';
import { formatDuration } from '../../utils/format';
import { useFavoritesStore } from '../favorites/useFavoritesStore';
import { usePlayerStore } from '../player/usePlayerStore';
import { usePlaylistDispatch } from '../playlists/PlaylistContext';
import { Play, Plus, Heart, ListPlus } from 'lucide-react';

interface Props {
  song: Song;
  index: number;
  style: React.CSSProperties;
  onPlay: () => void;
  selectedPlaylistId: string;
}

export const SongRow = memo(({ song, index, style, onPlay, selectedPlaylistId }: Props) => {
  const isFavorite = useFavoritesStore(s => s.ids.includes(song.id));
  const toggleFav = useFavoritesStore(s => s.toggle);
  const addToQueue = usePlayerStore(s => s.addToQueue);
  const dispatch = usePlaylistDispatch();
  
  const currentSongId = usePlayerStore(s => {
      const q = s.queue;
      const idx = s.currentIndex;
      return (idx !== -1 && q[idx]) ? q[idx].id : null;
  });
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const isCurrent = currentSongId === song.id;

  return (
    <div className="song-row" style={{ ...style, display: 'flex', alignItems: 'center', padding: '0 16px', gap: '16px', borderBottom: '1px solid var(--border)' }}>
      <span style={{ width: '30px', textAlign: 'center', color: isCurrent ? 'var(--primary)' : 'var(--text-muted)' }}>
        {isCurrent && isPlaying ? <div style={{color: 'var(--primary)', fontWeight: 'bold'}}>♫</div> : index + 1}
      </span>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{ fontWeight: '500', color: isCurrent ? 'var(--primary)' : 'inherit' }}>{song.title}</span>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{song.artist}</span>
      </div>

      <span style={{ width: '80px', color: 'var(--text-muted)', fontSize: '14px' }}>{song.genre}</span>
      <span style={{ width: '60px', color: 'var(--text-muted)', fontSize: '14px', textAlign: 'right' }}>{formatDuration(song.duration)}</span>

      <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
        <button className="btn-icon" onClick={onPlay} title="Phát"><Play size={18}/></button>
        <button className="btn-icon" onClick={() => addToQueue(song)} title="Thêm vào hàng đợi"><Plus size={18}/></button>
        <button className="btn-icon" onClick={() => toggleFav(song.id)} style={{ color: isFavorite ? 'var(--primary)' : 'var(--text-muted)' }} title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'} aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}>
          <Heart size={18} fill={isFavorite ? 'var(--primary)' : 'none'} />
        </button>
        <button className="btn-icon" disabled={!selectedPlaylistId}
          onClick={() => dispatch({ type: 'addSong', payload: { playlistId: selectedPlaylistId, songId: song.id }})} title="Thêm vào Playlist đã chọn">
          <ListPlus size={18} style={{ opacity: selectedPlaylistId ? 1 : 0.3 }}/>
        </button>
      </div>
    </div>
  );
});