import React from 'react';
import { usePlayerStore } from './usePlayerStore';
import { formatDuration } from '../../utils/format';

export const ProgressBar: React.FC = () => {
  const position = usePlayerStore(s => s.position);
  const queue = usePlayerStore(s => s.queue);
  const currentIndex = usePlayerStore(s => s.currentIndex);
  
  const currentSong = currentIndex !== -1 ? queue[currentIndex] : null;
  const duration = currentSong ? currentSong.duration : 0;
  const progress = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
      <span style={{ minWidth: '40px', textAlign: 'right' }}>{formatDuration(position)}</span>
      <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '2px' }} />
      </div>
      <span style={{ minWidth: '40px' }}>{formatDuration(duration)}</span>
    </div>
  );
};