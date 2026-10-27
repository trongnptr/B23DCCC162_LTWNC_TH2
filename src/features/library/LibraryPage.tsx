import React, { useState, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { SONGS } from '../../data/songs';
import { useDebounce } from '../../hooks/useDebounce';
import { SongRow } from './SongRow';
import { usePlayerStore } from '../player/usePlayerStore';
import { usePlaylists } from '../playlists/PlaylistContext';
import { Search } from 'lucide-react';

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Tất cả');
  const [sort, setSort] = useState('Mặc định');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const playQueue = usePlayerStore(s => s.playQueue);
  const playlists = usePlaylists();

  const filteredSongs = useMemo(() => {
    let result = SONGS;
    if (debouncedSearch) {
      const lower = debouncedSearch.toLowerCase();
      result = result.filter(s => s.title.toLowerCase().includes(lower) || s.artist.toLowerCase().includes(lower));
    }
    if (genre !== 'Tất cả') {
      result = result.filter(s => s.genre === genre);
    }
    let sorted = [...result];
    if (sort === 'Tên A-Z') sorted.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    else if (sort === 'Thời lượng tăng dần') sorted.sort((a, b) => a.duration - b.duration);
    return sorted;
  }, [debouncedSearch, genre, sort]);

  const handlePlay = useCallback((index: number) => {
    playQueue(filteredSongs, index);
  }, [filteredSongs, playQueue]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginTop: 0, marginBottom: '24px' }}>Thư viện bài hát</h1>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" className="input-field" placeholder="Tìm tên bài, ca sĩ..."
            style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }}
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <select className="input-field" value={genre} onChange={e => setGenre(e.target.value)}>
          <option>Tất cả</option><option>Pop</option><option>Ballad</option><option>Rock</option><option>Indie</option><option>Rap</option>
        </select>
        <select className="input-field" value={sort} onChange={e => setSort(e.target.value)}>
          <option>Mặc định</option><option>Tên A-Z</option><option>Thời lượng tăng dần</option>
        </select>
        <select className="input-field" value={selectedPlaylistId} onChange={e => setSelectedPlaylistId(e.target.value)}>
          <option value="">-- Chọn Playlist để thêm --</option>
          {playlists.map(pl => <option key={pl.id} value={pl.id}>{pl.name}</option>)}
        </select>
      </div>

      <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
         {filteredSongs.length > 0 ? `Tìm thấy ${filteredSongs.length} bài hát` : 'Không tìm thấy bài hát nào'}
      </div>

      <div style={{ flex: 1 }}>
        {filteredSongs.length > 0 && (
          <List height={560} itemCount={filteredSongs.length} itemSize={56} width="100%">
            {({ index, style }) => (
              <SongRow style={style} song={filteredSongs[index]} index={index}
                onPlay={() => handlePlay(index)} selectedPlaylistId={selectedPlaylistId} />
            )}
          </List>
        )}
      </div>
    </div>
  );
}