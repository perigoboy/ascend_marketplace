// ...existing code...
import React, { useState } from 'react';
import './styles/inicio.css';
import logoAscend from './assets/image/ascend_market.jpeg';

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => { setShowLogin(true); setShowRegister(false); };
  const openRegister = () => { setShowRegister(true); setShowLogin(false); };
  const closeForms = () => { setShowLogin(false); setShowRegister(false); };

  const logoSmall = showLogin || showRegister;

  return (
    <div className="container-central">
      <div className={`logo-area ${logoSmall ? 'logo-small' : ''}`}>
        <img
          src={logoAscend}
          alt="Logo Ascend Market"
          className="logo-img"
        />
      </div>

      {!logoSmall ? (
        <div className="botoes-area">
          <button className="botao principal" onClick={openLogin}>Entrar</button>
          <button className="botao secundario" onClick={openRegister}>Cadastrar</button>
        </div>
      ) : (
        <div className="forms-area">
          {showLogin && (
            <div className="form-container login-container">
              <form className="login-form">
                <div className="form-fields">
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
                </div>

                <div className="filling-bars" aria-hidden="true">
                  <span className="barra"></span>
                  <span className="barra"></span>
                  <span className="barra"></span>
                </div>

                <button type="submit" className="botao principal">Login</button>
                <button
                  type="button"
                  className="botao secundario"
                  onClick={closeForms}
                >
                  Voltar
                </button>
              </form>
            </div>
          )}

          {showRegister && (
            <div className="form-container register-container">
              <form className="register-form">
                <div className="form-fields">
                  <input type="text" placeholder="Nome" className="login-input" />
                  <input type="email" placeholder="Email" className="login-input" />
                  <input type="password" placeholder="Senha" className="login-input" />
                </div>

                <div className="filling-bars" aria-hidden="true">
                  <span className="barra"></span>
                  <span className="barra"></span>
                  <span className="barra"></span>
                </div>

                <button type="submit" className="botao principal">Cadastrar</button>
                <button
                  type="button"
                  className="botao secundario"
                  onClick={closeForms}
                >
                  Voltar
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
// ...existing code...