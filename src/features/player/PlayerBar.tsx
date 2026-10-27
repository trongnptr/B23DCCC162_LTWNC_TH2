import React, { useEffect, useState } from 'react';
import { usePlayerStore } from './usePlayerStore';
import { ProgressBar } from './ProgressBar';
import { Play, Pause, SkipBack, SkipForward, ListVideo, Music2, X } from 'lucide-react';
import { FixedSizeList as List } from 'react-window';
import { formatDuration } from '../../utils/format';

export const PlayerBar: React.FC = () => {
  const queue = usePlayerStore(s => s.queue);
  const currentIndex = usePlayerStore(s => s.currentIndex);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const togglePlay = usePlayerStore(s => s.togglePlay);
  const next = usePlayerStore(s => s.next);
  const prev = usePlayerStore(s => s.prev);
  const tick = usePlayerStore(s => s.tick);
  const playQueue = usePlayerStore(s => s.playQueue);

  const [showQueue, setShowQueue] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => tick(), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, tick]);

  const currentSong = currentIndex !== -1 ? queue[currentIndex] : null;

  return (
    <>
      {/* Cửa sổ Hàng đợi (Queue Popup) */}
      {showQueue && (
        <div style={{ position: 'fixed', bottom: '90px', right: '0', width: '350px', height: '450px', backgroundColor: 'var(--bg-sidebar)', borderLeft: '1px solid var(--border)', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', zIndex: 999, boxShadow: '-4px 0 15px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Hàng đợi ({queue.length})</h3>
            <button className="btn-icon" onClick={() => setShowQueue(false)}><X size={20} /></button>
          </div>
          <div style={{ flex: 1, backgroundColor: 'var(--bg-main)' }}>
            {queue.length > 0 ? (
              <List height={393} itemCount={queue.length} itemSize={56} width="100%">
                {({ index, style }) => {
                  const song = queue[index];
                  const isCurrent = index === currentIndex;
                  return (
                    <div style={{ ...style, padding: '0 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', backgroundColor: isCurrent ? 'var(--hover)' : 'transparent', cursor: 'pointer' }}
                         onClick={() => playQueue(queue, index)}>
                      <div style={{ width: '24px', fontSize: '12px', color: isCurrent ? 'var(--primary)' : 'var(--text-muted)' }}>
                         {isCurrent && isPlaying ? '♫' : index + 1}
                      </div>
                      <div style={{ flex: 1, overflow: 'hidden', paddingRight: '12px' }}>
                         <div style={{ fontWeight: isCurrent ? '600' : '500', color: isCurrent ? 'var(--primary)' : 'inherit', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '14px' }}>{song.title}</div>
                         <div style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{song.artist}</div>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatDuration(song.duration)}</div>
                    </div>
                  )
                }}
              </List>
            ) : (
              <div style={{ padding: '32px 16px', color: 'var(--text-muted)', textAlign: 'center', fontSize: '14px' }}>Hàng đợi trống</div>
            )}
          </div>
        </div>
      )}

      {/* Thanh phát nhạc (Player Bar) */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '90px', backgroundColor: 'var(--bg-player)', borderTop: '1px solid var(--border)', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000 }}>
        {/* Song Info */}
        <div style={{ width: '30%', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {currentSong ? (
            <>
              <div style={{ width: '56px', height: '56px', backgroundColor: 'var(--border)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <Music2 size={24} />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{currentSong.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{currentSong.artist}</div>
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>Chưa phát bài nào</div>
          )}
        </div>

        {/* Player Controls */}
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn-icon" onClick={prev}><SkipBack size={20}/></button>
            <button onClick={togglePlay} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--text-main)', color: 'var(--bg-main)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {isPlaying ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }}/>}
            </button>
            <button className="btn-icon" onClick={next}><SkipForward size={20}/></button>
          </div>
          <div style={{ width: '100%' }}>
            <ProgressBar />
          </div>
        </div>

        {/* Right Controls */}
        <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
           <button 
              onClick={() => setShowQueue(!showQueue)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--hover)', border: '1px solid var(--border)', color: showQueue ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.2s', fontWeight: showQueue ? '600' : 'normal' }}
            >
             <ListVideo size={18} color={showQueue ? 'var(--primary)' : 'currentColor'} />
             <span>{queue.length} bài trong hàng đợi</span>
           </button>
        </div>
      </div>
    </>
  );
};