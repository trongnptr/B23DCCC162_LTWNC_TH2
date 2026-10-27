import type { Playlist, PlaylistAction } from './playlistReducer';

export const withLogger = (reducer: (state: Playlist[], action: PlaylistAction) => Playlist[]) => {
  return (state: Playlist[], action: PlaylistAction): Playlist[] => {
    const nextState = reducer(state, action);
    if (import.meta.env.DEV) {
      console.log('Action:', action.type);
      console.log('Prev State:', state);
      console.log('Next State:', nextState);
    }
    return nextState;
  };
};