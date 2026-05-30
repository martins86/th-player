import { useNavigate } from 'react-router-dom';
import { routePaths } from '../navigation/routes';

function Login() {
  const navigate = useNavigate();

  return (
    <section className="page page-login">
      <h2>Login</h2>
      <p>Esta é a tela de login inicial do TH Player.</p>
      <button
        type="button"
        className="page-action"
        data-remote-focusable
        tabIndex={0}
        onClick={() => navigate(routePaths.home)}
      >
        Entrar
      </button>
    </section>
  );
}

export default Login;
