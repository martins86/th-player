import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import { useWebOS } from './hooks/useWebOS';
import AppLayout from './components/Layout/AppLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Player from './pages/Player';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const webOSInfo = useWebOS();
  const setPlatformInfo = useAppStore(state => state.setPlatformInfo);

  useEffect(() => {
    setPlatformInfo(webOSInfo);
  }, [setPlatformInfo, webOSInfo]);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
