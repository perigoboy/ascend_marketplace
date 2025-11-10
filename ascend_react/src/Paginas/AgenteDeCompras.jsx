import React, { useState } from 'react';
import '../Paginas/AgenteDECompras.css';
import logoAscend from '../assets/image/ascend_market.jpeg';

function Dashboard({ onLogout }) {
  const images = importAllImagesSafe();
  const products = images.length ? images.map((img, i) => ({
    id: i,
    name: img.name.replace(/[-_]/g, ' '),
    image: img.src,
    price: (9.99 + i * 5).toFixed(2),
  })) : [
    { id: 0, name: 'Produto Exemplo', image: logoAscend, price: '9.99' },
  ];

  return (
    <div className="dashboard-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logoAscend} alt="logo" className="header-logo" />
        </div>

        <div className="header-center">
          <div className="search-wrap">
            <input className="search-input" placeholder="fones de ouvido" />
            <button className="search-btn" type="button">🔍</button>
          </div>
        </div>

        <div className="header-right">
          <button className="link-btn" type="button">Faça o download</button>
          <button className="link-btn" type="button">Conta</button>
          <button className="link-btn" type="button">Carrinho</button>
          <button className="logout-btn" onClick={onLogout} type="button">Sair</button>
        </div>
      </header>

      <main className="dashboard-main" style={{ flex: 1 }}>
        <section className="hero">
          <div className="hero-left">
            <div className="offer-badge">-19%</div>
            <h2>Oferta 1ª compra</h2>
            <p className="hero-sub">Especial para novo usuário</p>
            <button className="hero-cta" type="button">Compre agora</button>
          </div>

          <div className="hero-right">
            <div className="hero-cards">
              <div className="hero-card" />
              <div className="hero-card" />
              <div className="hero-card" />
            </div>
          </div>
        </section>

        <section className="features-row">
          <div className="feature">🚚 Frete grátis</div>
          <div className="feature">⚡ Entrega rápida</div>
          <div className="feature">🔁 Devoluções grátis</div>
        </section>

        <section className="products-section">
          <h3>Produtos Mais Vendidos</h3>
          <div className="product-cards">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.image} alt={p.name} className="product-img" />
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-footer">
                    <div className="product-price">R$ {p.price}</div>
                    <button className="botao comprar" type="button">Comprar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
function HomePage({ onNavigateToAgent }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const openLogin = () => { setShowLogin(true); setShowRegister(false); };
  const openRegister = () => { setShowRegister(true); setShowLogin(false); };
  const closeForms = () => { setShowLogin(false); setShowRegister(false); };

  const logoSmall = showLogin || showRegister;

  const handleLoginSubmit = (e) => { e.preventDefault(); setTimeout(() => setLoggedIn(true), 400); };
  const handleRegisterSubmit = (e) => { e.preventDefault(); setTimeout(() => setLoggedIn(true), 400); };

  if (loggedIn) {
    return <Dashboard onLogout={() => { setLoggedIn(false); setShowLogin(false); setShowRegister(false); }} />;
  }

  return (
    <div
      className="container-central"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
      }}
    >
      <div className={`logo-area ${logoSmall ? 'logo-small' : ''}`}>
        <img src={logoAscend} alt="Logo Ascend Market" className="logo-img" />
      </div>

      {!logoSmall ? (
        <div className="botoes-area">
          <button className="botao principal" onClick={openLogin} type="button">Entrar</button>
          <button className="botao secundario" onClick={openRegister} type="button">Cadastrar</button>
          <button className="botao entrar-agente" onClick={onNavigateToAgent} type="button">Entrar com Agente</button>
          <div className="divider-text">ou</div>
          <button className="botao agent-link" onClick={onNavigateToAgent} type="button">
            Já é um agente? Clique aqui
          </button>
        </div>
      ) : (
        <div className="forms-area">
          {showLogin && (
            <div className="form-container login-container">
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className="form-fields">
                  <input type="email" placeholder="Email" className="login-input" required />
                  <input type="password" placeholder="Senha" className="login-input" required />
                </div>

                <button type="submit" className="botao principal">Login</button>
                <button type="button" className="botao secundario" onClick={closeForms}>Voltar</button>
              </form>
            </div>
          )}

          {showRegister && (
            <div className="form-container register-container">
              <form className="register-form" onSubmit={handleRegisterSubmit}>
                <div className="form-fields">
                  <input type="text" placeholder="Nome" className="login-input" required />
                  <input type="email" placeholder="Email" className="login-input" required />
                  <input type="password" placeholder="Senha" className="login-input" required />
                </div>

                <button type="submit" className="botao principal">Cadastrar</button>
                <button type="button" className="botao secundario" onClick={closeForms}>Voltar</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AgentePage({ onNavigateToHome }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const openLogin = () => { setShowLogin(true); setShowRegister(false); };
  const openRegister = () => { setShowRegister(true); setShowLogin(false); };
  const closeForms = () => { setShowLogin(false); setShowRegister(false); };

  const logoSmall = showLogin || showRegister;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setLoggedIn(true), 400);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setLoggedIn(true), 400);
  };

  if (loggedIn) {
    return (
      <AgenteDashboard
        onLogout={() => { setLoggedIn(false); setShowLogin(false); setShowRegister(false); }}
        onNavigateToHome={onNavigateToHome}
      />
    );
  }

  return (
    <div className="agent-container-central">
      <div className={`agent-logo-area ${logoSmall ? 'agent-logo-small' : ''}`}>
        <img src={logoAscend} alt="Logo Ascend Market" className="agent-logo-img" />
        <div className="agent-subtitle">Agente de Compras</div>
      </div>

      {!logoSmall ? (
        <div className="agent-botoes-area">
          <button className="agent-botao agent-principal" onClick={openLogin} type="button">Entrar</button>
          <button className="agent-botao agent-secundario" onClick={openRegister} type="button">Cadastrar</button>
        </div>
      ) : (
        <div className="agent-forms-area">
          {showLogin && (
            <div className="agent-form-container agent-login-container">
              <h2>Login - Agente de Compras</h2>
              <form className="agent-login-form" onSubmit={handleLoginSubmit}>
                <div className="agent-form-fields">
                  <input type="email" placeholder="Email" className="agent-login-input" required />
                  <input type="password" placeholder="Senha" className="agent-login-input" required />
                </div>

                <button type="submit" className="agent-botao agent-principal">Entrar</button>
                <button type="button" className="agent-botao agent-secundario" onClick={closeForms}>Voltar</button>
              </form>
            </div>
          )}

          {showRegister && (
            <div className="agent-form-container agent-register-container">
              <h2>Cadastro - Agente de Compras</h2>
              <form className="agent-register-form" onSubmit={handleRegisterSubmit}>
                <div className="agent-form-fields">
                  <input type="text" placeholder="Nome Completo" className="agent-login-input" required />
                  <input type="email" placeholder="Email Empresarial" className="agent-login-input" required />
                  <input type="text" placeholder="CNPJ da Empresa" className="agent-login-input" required />
                  <input type="tel" placeholder="Telefone" className="agent-login-input" required />
                  <input type="password" placeholder="Senha" className="agent-login-input" required />
                  <input type="password" placeholder="Confirmar Senha" className="agent-login-input" required />
                </div>

                <button type="submit" className="agent-botao agent-principal">Cadastrar</button>
                <button type="button" className="agent-botao agent-secundario" onClick={closeForms}>Voltar</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AgentePage;