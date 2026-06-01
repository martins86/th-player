import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useAppStore } from './store/appStore';
import { useWebOS } from './hooks/useWebOS';
import AppLayout from './components/Layout/AppLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Player from './pages/Player';
import Settings from './pages/Settings';
import './App.css';

function AppContent() {
  const webOSInfo = useWebOS();
  const setPlatformInfo = useAppStore(state => state.setPlatformInfo);
  const navigate = useNavigate();

  useEffect(() => {
    setPlatformInfo(webOSInfo);
  }, [setPlatformInfo, webOSInfo]);

  // Handle GitHub Pages SPA routing: restore route from 404.html redirect
  useEffect(() => {
    const redirect = (window as any).sessionStorage?.redirect;
    if (redirect) {
      delete (window as any).sessionStorage.redirect;
      navigate(redirect);
    }
  }, [navigate]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <BrowserRouter basename="/th-player/">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
