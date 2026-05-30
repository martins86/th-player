import { useNavigate } from 'react-router-dom';
import { routePaths } from '../navigation/routes';
import { mockChannels } from '../data/mockChannels';

function Home() {
  const navigate = useNavigate();

  return (
    <section className="page page-home">
      <h2>Home</h2>
      <p>
        Bem-vindo ao TH Player. Use o controle remoto ou o teclado para navegar.
      </p>

      <div className="grid-actions">
        {mockChannels.map(c => (
          <button
            key={c.id}
            type="button"
            className="page-action"
            data-remote-focusable
            tabIndex={0}
            onClick={() => navigate(routePaths.player(c.id))}
          >
            {c.name}
          </button>
        ))}

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
