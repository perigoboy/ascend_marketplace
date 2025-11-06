import React, { useState } from 'react';
import './styles/inicio.css';
import logoAscend from './assets/image/ascend_market.jpeg';

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="container-central">
      <div className={`logo-area ${showLogin ? 'logo-small' : ''}`}>
        <img 
          src={logoAscend}
          alt="Logo Ascend Market" 
          className="logo-img" 
        />
      </div>

      {!showLogin ? (
        <div className="botoes-area">
          <button className="botao principal" onClick={() => setShowLogin(true)}>Entrar</button>
          <button className="botao secundario">Cadastrar</button>
        </div>
      ) : (
        <div className="login-container">
          <form className="login-form">
            <input 
              type="email" 
              placeholder="Email" 
              className="login-input"
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className="login-input"
            />
            <button type="submit" className="botao principal">Login</button>
            <button 
              type="button" 
              className="botao secundario"
              onClick={() => setShowLogin(false)}
            >
              Voltar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePage;