import { useNavigate, useParams } from 'react-router-dom';

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section className="page page-player">
      <h2>Player</h2>
      <p>Reproduzindo o canal de id <strong>{id}</strong>.</p>
      <button
        type="button"
        className="page-action"
        data-remote-focusable
        tabIndex={0}
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </section>
  );
}

export default Player;
