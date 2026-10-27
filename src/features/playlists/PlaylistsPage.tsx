import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlaylists, usePlaylistDispatch } from './PlaylistContext';
import { Plus, Trash2, ListMusic } from 'lucide-react';

export default function PlaylistsPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const playlists = usePlaylists();
  const dispatch = usePlaylistDispatch();

  const handleCreate = () => {
    if (!name.trim()) {
      setError('Tên playlist không được để trống');
      return;
    }
    if (playlists.some(p => p.name.toLowerCase() === name.trim().toLowerCase())) {
      setError('Tên playlist đã tồn tại');
      return;
    }
    dispatch({ type: 'create', payload: { id: Date.now().toString(), name: name.trim() }});
    setName('');
    setError('');
  };

  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: '24px' }}>Danh sách Playlist</h1>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
        <input className="input-field" style={{ width: '300px' }} value={name} onChange={e => setName(e.target.value)} placeholder="Tên playlist mới..." />
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleCreate}>
          <Plus size={18}/> Tạo
        </button>
      </div>
      {error && <p style={{color: '#ef4444', margin: '0 0 24px 0', fontSize: '14px'}}>{error}</p>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '32px' }}>
        {playlists.map(pl => (
          <div key={pl.id} style={{ backgroundColor: 'var(--bg-player)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--hover)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyItems: 'center', color: 'var(--text-muted)' }}>
                  <ListMusic size={24} />
               </div>
               <button className="btn-icon" onClick={() => dispatch({ type: 'remove', payload: { id: pl.id }})} title="Xóa playlist">
                 <Trash2 size={18} />
               </button>
            </div>
            <Link to={`/playlists/${pl.id}`} style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
              {pl.name}
            </Link>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{pl.songIds.length} bài hát</div>
          </div>
        ))}
      </div>
    </div>
  );
}