import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { playlistReducer, Playlist, PlaylistAction } from './playlistReducer';
import { withLogger } from './withLogger';

const PlaylistStateContext = createContext<Playlist[] | undefined>(undefined);
const PlaylistDispatchContext = createContext<React.Dispatch<PlaylistAction> | undefined>(undefined);

export const usePlaylists = () => {
  const context = useContext(PlaylistStateContext);
  if (!context) throw new Error('usePlaylists must be used within Provider');
  return context;
};

export const usePlaylistDispatch = () => {
  const context = useContext(PlaylistDispatchContext);
  if (!context) throw new Error('usePlaylistDispatch must be used within Provider');
  return context;
};

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(
    withLogger(playlistReducer),
    [],
    (initial) => {
      const stored = localStorage.getItem('music-playlists');
      return stored ? JSON.parse(stored) : initial;
    }
  );

  useEffect(() => {
    localStorage.setItem('music-playlists', JSON.stringify(state));
  }, [state]);

  return (
    <PlaylistStateContext.Provider value={state}>
      <PlaylistDispatchContext.Provider value={dispatch}>
        {children}
      </PlaylistDispatchContext.Provider>
    </PlaylistStateContext.Provider>
  );
};