import React, { Component, useState } from 'react';
import './styles/inicio.css';
import logoAscend from './assets/image/ascend_market.jpeg';

/* Error boundary */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error) { console.error(error); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:20}}>
          <h2>Ocorreu um erro ao carregar a aplicação</h2>
          <pre style={{whiteSpace:'pre-wrap'}}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

/* carrega imagens da pasta assets/image (webpack require.context) */
function importAllImagesSafe() {
  // Usa API do Vite (import.meta.globEager) quando disponível.
  // Retorna [{ src, name }, ...] e exclui o próprio logo do projeto.
  try {
    if (typeof import.meta !== 'undefined' && typeof import.meta.globEager === 'function') {
      const modules = import.meta.globEager('./assets/image/*.{png,jpg,jpeg,svg}');
      return Object.keys(modules).map((k) => {
        const mod = modules[k];
        // em Vite a imagem importada normalmente fica em `default`
        const src = mod && mod.default ? mod.default : mod;
        const name = k.replace('./assets/image/', '').replace(/\.(png|jpe?g|svg)$/, '');
        return { src, name };
      }).filter(img => !/ascend[_-]?market/i.test(img.name));
    }
  } catch {
    // se globEager não existir, seguir sem quebrar
  }
  return [];
}

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
    <div className="dashboard-root">
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

      <main className="dashboard-main">
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

function HomePage() {
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
    <div className="container-central">
      <div className={`logo-area ${logoSmall ? 'logo-small' : ''}`}>
        <img src={logoAscend} alt="Logo Ascend Market" className="logo-img" />
      </div>

      {!logoSmall ? (
        <div className="botoes-area">
          <button className="botao principal" onClick={openLogin} type="button">Entrar</button>
          <button className="botao secundario" onClick={openRegister} type="button">Cadastrar</button>
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

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}