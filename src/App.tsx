import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { PlaylistProvider } from './features/playlists/PlaylistContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { PlayerBar } from './features/player/PlayerBar';
import LibraryPage from './features/library/LibraryPage';
import { Library, Heart, ListMusic, Sun, Moon } from 'lucide-react';

const FavoritesPage = React.lazy(() => import('./features/favorites/FavoritesPage'));
const PlaylistsPage = React.lazy(() => import('./features/playlists/PlaylistsPage'));
const PlaylistDetailPage = React.lazy(() => import('./features/playlists/PlaylistDetailPage'));

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
    textDecoration: 'none', color: isActive ? 'var(--primary)' : 'var(--text-main)',
    fontWeight: isActive ? '600' : '500', borderRadius: '8px',
    backgroundColor: isActive ? 'var(--hover)' : 'transparent',
    transition: 'background-color 0.2s'
  });

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <nav style={{ width: '240px', backgroundColor: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '24px 12px' }}>
          <div style={{ padding: '0 12px 32px', fontSize: '20px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{width: 36, height: 36, backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>M</div>
             Music App
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <NavLink to="/" style={navStyle}><Library size={20}/> Thư viện</NavLink>
            <NavLink to="/favorites" style={navStyle}><Heart size={20}/> Yêu thích</NavLink>
            <NavLink to="/playlists" style={navStyle}><ListMusic size={20}/> Playlist</NavLink>
          </div>

          <div style={{ flex: 1 }} />
          <button onClick={toggleTheme} className="btn-icon" style={{ alignSelf: 'flex-start', margin: '12px', width: '40px', height: '40px' }} title="Đổi giao diện">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
        </nav>

        {/* Main Content */}
        <main id="main-scroll" style={{ flex: 1, overflowY: 'auto', padding: '40px', paddingBottom: '120px' }}>
          <Suspense fallback={<p style={{color: 'var(--text-muted)'}}>Đang tải trang...</p>}>
            <Routes>
              <Route path="/" element={<LibraryPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <PlayerBar />
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <PlaylistProvider>
        <AppContent />
      </PlaylistProvider>
    </ThemeProvider>
  );
}