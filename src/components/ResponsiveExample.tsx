/**
 * 📱 Exemplo de Componente Responsivo
 * Demonstra como implementar responsividade corretamente
 */

import './ResponsiveExample.css';

export const ResponsiveExample = () => {
  return (
    <div className="responsive-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero__title">TH Player</h1>
        <p className="hero__subtitle">
          Seu aplicativo IPTV responsivo para todos os dispositivos
        </p>
      </section>

      {/* Feature Grid - Responsivo */}
      <section className="features">
        <h2>Recursos Principais</h2>
        <div className="features__grid">
          <div className="feature-card">
            <div className="feature-card__icon">📱</div>
            <h3>Mobile</h3>
            <p>Perfeito para smartphones e tablets</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">💻</div>
            <h3>Desktop</h3>
            <p>Otimizado para telas maiores</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">📺</div>
            <h3>TV</h3>
            <p>Suporte completo para webOS TV</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">⚡</div>
            <h3>Performance</h3>
            <p>Rápido em qualquer dispositivo</p>
          </div>
        </div>
      </section>

      {/* Content Grid - 2 colunas responsivas */}
      <section className="content-section">
        <div className="content-grid">
          <div className="content-box">
            <h3>Coluna 1</h3>
            <p>
              Este layout é responsivo e se adapta automaticamente ao tamanho da
              tela. Em mobile fica em uma coluna, em desktop em duas.
            </p>
          </div>
          <div className="content-box">
            <h3>Coluna 2</h3>
            <p>
              Teste redimensionando a janela para ver como o layout se
              reorganiza. Use as variáveis CSS para manter consistência.
            </p>
          </div>
        </div>
      </section>

      {/* Button Group - Responsivo */}
      <section className="button-group">
        <button className="btn btn--primary">Botão Principal</button>
        <button className="btn btn--secondary">Botão Secundário</button>
        <button className="btn btn--secondary">Botão Terciário</button>
      </section>
    </div>
  );
};
