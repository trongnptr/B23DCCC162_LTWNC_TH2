import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlaylists, usePlaylistDispatch } from './PlaylistContext';
import { SONGS } from '../../data/songs';
import { usePlayerStore } from '../player/usePlayerStore';
import { Play, Trash2, ArrowLeft } from 'lucide-react';

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const playlists = usePlaylists();
  const dispatch = usePlaylistDispatch();
  const playQueue = usePlayerStore(s => s.playQueue);

  const playlist = playlists.find(p => p.id === id);
  if (!playlist) return <div style={{padding: '40px'}}><p>Không tìm thấy playlist.</p><Link to="/playlists">Quay lại</Link></div>;

  const playlistSongs = playlist.songIds.map(sId => SONGS.find(s => s.id === sId)).filter(Boolean) as typeof SONGS;
  const totalSeconds = playlistSongs.reduce((acc, s) => acc + s.duration, 0);

  return (
    <div>
      <Link to="/playlists" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '24px' }}>
        <ArrowLeft size={16}/> Danh sách Playlist
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '32px' }}>
         <div style={{ width: '150px', height: '150px', backgroundColor: 'var(--border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
            <div style={{width: '100%', textAlign: 'center', fontSize: '48px'}}>💿</div>
         </div>
         <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Playlist</div>
            <h1 style={{ margin: '0 0 12px 0', fontSize: '48px', fontWeight: '900' }}>{playlist.name}</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>
               Tổng thời lượng: {Math.floor(totalSeconds / 60)} phút {totalSeconds % 60} giây • {playlistSongs.length} bài hát
            </p>
         </div>
      </div>

      <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }} onClick={() => playQueue(playlistSongs, 0)}>
        <Play size={18} fill="currentColor"/> Phát tất cả
      </button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {playlistSongs.map((s, index) => (
          <div key={s.id} className="song-row" style={{ display: 'flex', padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid var(--border)'}}>
             <span style={{ width: '30px', color: 'var(--text-muted)' }}>{index + 1}</span>
             <div style={{ flex: 1 }}>
               <div style={{ fontWeight: '500' }}>{s.title}</div>
               <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{s.artist}</div>
             </div>
             <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-icon" onClick={() => playQueue(playlistSongs, index)}><Play size={18}/></button>
                <button className="btn-icon" onClick={() => dispatch({ type: 'removeSong', payload: { playlistId: playlist.id, songId: s.id }})} title="Bỏ khỏi playlist"><Trash2 size={18}/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}