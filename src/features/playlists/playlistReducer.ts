export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
}

export type PlaylistAction =
  | { type: 'create'; payload: { id: string; name: string } }
  | { type: 'rename'; payload: { id: string; name: string } }
  | { type: 'remove'; payload: { id: string } }
  | { type: 'addSong'; payload: { playlistId: string; songId: string } }
  | { type: 'removeSong'; payload: { playlistId: string; songId: string } };

export const playlistReducer = (state: Playlist[], action: PlaylistAction): Playlist[] => {
  switch (action.type) {
    case 'create':
      if (state.some(pl => pl.name.toLowerCase() === action.payload.name.toLowerCase())) return state;
      return [...state, { id: action.payload.id, name: action.payload.name, songIds: [] }];
    case 'rename':
      return state.map(pl => pl.id === action.payload.id ? { ...pl, name: action.payload.name } : pl);
    case 'remove':
      return state.filter(pl => pl.id !== action.payload.id);
    case 'addSong':
      return state.map(pl => {
        if (pl.id === action.payload.playlistId) {
          if (pl.songIds.includes(action.payload.songId)) return pl;
          return { ...pl, songIds: [...pl.songIds, action.payload.songId] };
        }
        return pl;
      });
    case 'removeSong':
      return state.map(pl => pl.id === action.payload.playlistId
        ? { ...pl, songIds: pl.songIds.filter(id => id !== action.payload.songId) }
        : pl);
    default:
      return state;
  }
};