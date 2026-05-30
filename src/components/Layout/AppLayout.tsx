import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { useRemoteControl } from '../../hooks/useRemoteControl';
import { routePaths } from '../../navigation/routes';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { isWebOS, version, deviceId } = useAppStore();

  useRemoteControl({
    onBack: () => navigate(-1),
  });

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>TH Player</h1>
          <p className="app-meta">
            Plataforma: <strong>{isWebOS ? 'webOS' : 'Web'} </strong>
            {isWebOS && version ? `(v${version})` : null}
          </p>
          {deviceId ? <p className="app-meta">Device ID: {deviceId}</p> : null}
        </div>
        <nav className="app-nav">
          <button
            type="button"
            className="nav-button"
            data-remote-focusable
            tabIndex={0}
            onClick={() => navigate(routePaths.home)}
          >
            Home
          </button>
          <button
            type="button"
            className="nav-button"
            data-remote-focusable
            tabIndex={0}
            onClick={() => navigate(routePaths.login)}
          >
            Login
          </button>
          <button
            type="button"
            className="nav-button"
            data-remote-focusable
            tabIndex={0}
            onClick={() => navigate(routePaths.settings)}
          >
            Configurações
          </button>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}

export default AppLayout;
