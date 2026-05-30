import { useNavigate } from 'react-router-dom';
import { routePaths } from '../navigation/routes';

function Home() {
  const navigate = useNavigate();

  return (
    <section className="page page-home">
      <h2>Home</h2>
      <p>
        Bem-vindo ao TH Player. Use o controle remoto para navegar entre as
        opções.
      </p>
      <div className="grid-actions">
        <button
          type="button"
          className="page-action"
          data-remote-focusable
          tabIndex={0}
          onClick={() => navigate(routePaths.player('123'))}
        >
          Assistir canal exemplo
        </button>
        <button
          type="button"
          className="page-action"
          data-remote-focusable
          tabIndex={0}
          onClick={() => navigate(routePaths.settings)}
        >
          Configurações
        </button>
      </div>
    </section>
  );
}

export default Home;
