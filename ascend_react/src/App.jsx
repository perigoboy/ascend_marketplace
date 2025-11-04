// src/pages/HomePage.jsx

import React from 'react';
import './styles/inicio.css';
import logoAscend from './assets/image/ascend_market.jpeg';
// import Header from '../components/Header'; // Exemplo de Componente Header
// import Footer from '../components/Footer'; // Exemplo de Componente Footer

function HomePage() {
  return (
    // O React exige um único elemento pai (pode ser <React.Fragment> ou <div>)
    <div className="home-page-container">
      
      {/* 1. HEADER (Barra Superior) - Pode ser um componente separado */}
      <header className="barra-superior"></header>

      {/* 2. CONTEÚDO CENTRAL */}
      <main className="container-central">
          
          <div className="logo-area">
              {/* ATENÇÃO: Os caminhos de imagem precisam ser ajustados 
                 para a estrutura de assets do seu projeto React/Vite. */}
              <img 
                  src={logoAscend}
                  alt="Logo Ascend Market" 
                  className="logo-img" 
              />
          </div>

          <div className="botoes-area">
              {/* No React, é melhor usar um componente Button ou links para navegação */}
              <button id="btn-entrar" className="botao principal">Entrar</button>
              <button id="btn-cadastrar" className="botao secundario">Cadastrar</button>
          </div>
          
      </main>

      {/* 3. RODAPÉ (Barra Inferior) - Pode ser um componente separado */}
      <footer className="barra-inferior">
          <p className="copyright">&copy; Copyright</p>
      </footer>

      {/* 4. Scripts JS são tratados de forma diferente no React. 
             Qualquer lógica (como o clique do botão) deve ser movida para 
             funções JavaScript dentro deste componente. */}

    </div>
  );
}

export default HomePage;