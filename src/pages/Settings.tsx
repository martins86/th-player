import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  return (
    <section className="page page-settings">
      <h2>Configurações</h2>
      <p>Aqui vamos centralizar preferências de qualidade, cache e mais.</p>
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

export default Settings;
