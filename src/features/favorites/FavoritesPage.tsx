import React from 'react';
import { useFavoritesStore } from './useFavoritesStore';
import { SONGS } from '../../data/songs';
import { usePlayerStore } from '../player/usePlayerStore';
import { Play } from 'lucide-react';

export default function FavoritesPage() {
  const ids = useFavoritesStore(s => s.ids);
  const favSongs = SONGS.filter(s => ids.includes(s.id));
  const playQueue = usePlayerStore(s => s.playQueue);

  if (favSongs.length === 0) return <div><h1>Yêu thích</h1><p style={{color: 'var(--text-muted)'}}>Bạn chưa có bài hát yêu thích.</p></div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <h1 style={{ margin: 0 }}>Bài hát yêu thích</h1>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => playQueue(favSongs, 0)}>
          <Play size={18} fill="currentColor"/> Phát tất cả
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {favSongs.map((s, index) => (
          <div key={s.id} className="song-row" style={{ display: 'flex', padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid var(--border)'}}>
             <span style={{ width: '30px', color: 'var(--text-muted)' }}>{index + 1}</span>
             <div style={{ flex: 1 }}>
               <div style={{ fontWeight: '500' }}>{s.title}</div>
               <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{s.artist}</div>
             </div>
             <button className="btn-icon" onClick={() => playQueue(favSongs, index)}><Play size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}