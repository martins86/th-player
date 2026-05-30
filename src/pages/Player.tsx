import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import { mockChannels } from '../data/mockChannels';

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();

  const channel = mockChannels.find(c => c.id === id) ?? null;

  return (
    <section className="page page-player">
      <h2>Player</h2>
      {channel ? (
        <>
          <p>
            Reproduzindo: <strong>{channel.name}</strong>
          </p>
          <VideoPlayer src={channel.streamUrl} title={channel.name} />
        </>
      ) : (
        <p>Canal não encontrado.</p>
      )}

      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          className="page-action"
          data-remote-focusable
          tabIndex={0}
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    </section>
  );
}

export default Player;
