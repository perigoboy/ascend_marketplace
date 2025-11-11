import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import './styles/inicio.css';
import logoAscend from './assets/image/ascend_market.jpeg';
import FoneOuvido from './assets/image/Fone de ouvido blue.png';
import Perfil from './Paginas/Perfil';

//ate aqui  

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
function Dashboard({ onLogout, onNavigateToAgent }) {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const images = importAllImagesSafe();
  const products = images.length ? images.map((img, i) => ({
    id: i,
    name: img.name.replace(/[-_]/g, ' '),
    image: img.src,
    price: (9.99 + i * 5).toFixed(2),
  })) : [
    { id: 0, name: 'Fone de ouvido', image: FoneOuvido, price: '299.99' },
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
          
          <div className="settings-container">
            <button 
              className="settings-btn" 
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              title="Configurações"
            >
              ⚙️
            </button>
            
            {showSettings && (
              <div className="settings-menu">
  <button
  className="settings-option"
  type="button"
  onClick={() => {
    setShowSettings(false);
    navigate("/perfil");
  }}
>
  👤 Perfil
</button>
                <button className="settings-option" type="button">
                  🔔 Notificações
                </button>
                <button className="settings-option" type="button">
                  🎨 Aparência
                </button>
                <button className="settings-option" type="button">
                  🔒 Privacidade
                </button>
                <hr className="settings-divider" />
                <button 
                  className="settings-option agent-option" 
                  type="button"
                  onClick={() => {
                    setShowSettings(false);
                    onNavigateToAgent?.();
                  }}
                >
                  👔 Entrar como Agente
                </button>
                <button 
                  className="settings-option logout-option" 
                  type="button"
                  onClick={onLogout}
                >
                  🚪 Sair
                </button>
              </div>
            )}
          </div>
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

function SocialLinks({ position = 'right' }) {
  const containerStyle = {
    position: 'fixed',
    bottom: 18,
    right: position === 'right' ? 18 : 'auto',
    left: position === 'left' ? 18 : 'auto',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    zIndex: 9999,
    alignItems: 'center',
  };
  const btnStyle = {
    width: 44,
    height: 44,
    borderRadius: 999,
    background: '#000',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
    transition: 'transform .12s ease, box-shadow .12s ease',
  };
  const btnHover = { transform: 'translateY(-3px)', boxShadow: '0 8px 18px rgba(0,0,0,0.18)' };
  const svgStyle = { width: 18, height: 18, display: 'block' };

  // helper to attach hover via inline onMouseEnter/onMouseLeave
  const makeProps = () => {
    return {
      onMouseEnter(e) { e.currentTarget.style.transform = btnHover.transform; e.currentTarget.style.boxShadow = btnHover.boxShadow; },
      onMouseLeave(e) { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = btnStyle.boxShadow; },
      style: btnStyle,
    };
  };

  return (
    <div style={containerStyle} aria-hidden={false}>
      <a {...makeProps()} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
        <svg viewBox="0 0 24 24" style={svgStyle} aria-hidden="true" fill="#fff">
          <path d="M22.675 0h-21.35C0.597 0 0 .593 0 1.326v21.348C0 23.405.597 24 1.325 24H12.82v-9.294H9.692V11.24h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.919c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.466h-3.12V24h6.116C23.403 24 24 23.405 24 22.674V1.326C24 .593 23.403 0 22.675 0z" />
        </svg>
      </a>

      <a {...makeProps()} href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
        <svg viewBox="0 0 24 24" style={svgStyle} aria-hidden="true" fill="none" stroke="#fff" strokeWidth="1.4">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" fill="none" />
          <circle cx="12" cy="12" r="4" fill="#fff" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
        </svg>
      </a>

      <a {...makeProps()} href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="X (Twitter)">
        <svg viewBox="0 0 24 24" style={svgStyle} aria-hidden="true" fill="#fff">
          <path d="M23.954 4.569a10 10 0 01-2.825.775 4.932 4.932 0 002.163-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.953 13.953 0 011.671 3.149a4.902 4.902 0 001.523 6.574 4.897 4.897 0 01-2.228-.616v.06a4.915 4.915 0 003.946 4.817 4.996 4.996 0 01-2.224.085 4.923 4.923 0 004.596 3.417 9.867 9.867 0 01-6.102 2.105c-.396 0-.79-.023-1.17-.068a13.945 13.945 0 007.557 2.212c9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634A9.936 9.936 0 0024 4.59z" />
        </svg>
      </a>

      <a {...makeProps()} href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" style={svgStyle} aria-hidden="true" fill="#fff">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.036-1.851-3.036-1.851 0-2.134 1.445-2.134 2.94v5.665h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.851 3.369-1.851 3.604 0 4.271 2.372 4.271 5.455v6.287zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.072 0-1.144.926-2.071 2.07-2.071s2.071.927 2.071 2.071c0 1.144-.927 2.072-2.071 2.072zM6.814 20.452H3.861V9h2.953v11.452z" />
        </svg>
      </a>

      <a {...makeProps()} href="https://wa.me/" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" style={svgStyle} aria-hidden="true" fill="#fff">
          <path d="M20.52 3.48A11.892 11.892 0 0012 .5C5.649.5.999 5.15.999 11.5c0 2.012.53 3.877 1.449 5.514L.5 23.5l6.795-1.405A11.913 11.913 0 0012 23.5c6.351 0 11.001-4.65 11.001-11 0-2.963-1.163-5.74-2.481-7.02zM12 21.5c-1.01 0-1.998-.195-2.91-.57l-.207-.085-4.04.835.861-3.935-.132-.213A9.47 9.47 0 012.5 11.5 9.5 9.5 0 1112 21.5zm5.03-7.03c-.28-.14-1.66-.82-1.92-.92-.26-.1-.45-.14-.64.14-.19.28-.74.92-.9 1.11-.16.19-.32.21-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.13-.16.18-.27.28-.45.09-.18.05-.34-.03-.48-.08-.14-.64-1.54-.88-2.11-.23-.55-.46-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.34-.26.27-1 1-1 2.45s1.03 2.84 1.17 3.04c.14.19 2.02 3.08 4.9 4.32 1.03.44 1.83.7 2.46.9.99.31 1.89.27 2.6.17.79-.11 1.66-.68 1.9-1.34.24-.66.24-1.23.17-1.35-.07-.12-.26-.2-.55-.34z" />
        </svg>
      </a>
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

  const isFormOpen = showLogin || showRegister;

  const handleLoginSubmit = (e) => { e.preventDefault(); setTimeout(() => setLoggedIn(true), 400); };
  const handleRegisterSubmit = (e) => { e.preventDefault(); setTimeout(() => setLoggedIn(true), 400); };

  if (loggedIn) {
    return <Dashboard onLogout={() => { setLoggedIn(false); setShowLogin(false); setShowRegister(false); }} />;
  }

  return (
    <div className="container-central">
      <div className={`logo-area ${isFormOpen ? 'logo-small' : ''}`}>
        <img src={logoAscend} alt="Logo Ascend Market" className="logo-img" />
      </div>

      {!isFormOpen ? (
        <div className="botoes-area">
          <button className="botao principal" onClick={openLogin} type="button">Entrar</button>
          <button className="botao secundario" onClick={openRegister} type="button">Cadastrar</button>
        </div>
      ) : (
        <div className="forms-area">
          {showLogin && (
            <div className="form-container login-container">
              <h2>Login</h2>
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
              <h2>Cadastro</h2>
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

      {/* Social links fixos no canto inferior (pode trocar position para 'left') */}
      <SocialLinks position="right" />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}