import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import './styles/inicio.css';
import logoAscend from './assets/image/ascend_market.jpeg';
import FoneOuvido from './assets/image/Fone de ouvido blue.png';
import Perfil from './Paginas/Perfil';
import CompraDeProdutos from './Paginas/CompraDeProdutos';
import CadastroDeAgentes from './Paginas/CadastroDeAgentes';
import ChatDeAgente from './Paginas/ChatDeAgente';
import ComprasFeitas from './Paginas/ComprasFeitas';
import CarrinhoDeCompras from './Paginas/CarrinhoDeCompras';
//import produto_11setembro from './assets/image/produto_11setembro.png'; 
import BlocoNotasInvisivel from './assets/image/Bloco Notas Invisivel.png';
import Chapeuminiventilador from './assets/image/Chapeu mini-ventilador.png';
import Chineldomassageador from './assets/image/Chinelo massageador.png';
import Espelhodasinceridade from './assets/image/Espelho da sinceridade.png';
import FoneOuvidoblue from './assets/image/Fone de ouvido blue.png';
import FoneOuvidobluebranco from './assets/image/Fone de ouvido branco.png'; 
import GatoVirtual from './assets/image/Gato virtual.png';
import marmitaeletrica from './assets/image/marmita eletrica.png'; 
import perfumepoto from './assets/image/perfume poto.png'; 
import Piluladacoragem from './assets/image/Pilula da coragem.png'; 
//import produto_fosforolabubu from './assets/image/produto_fosforolabubu.png';
import produto_funko from './assets/image/produto_funko.png';
import Purificador_ar from './assets/image/Purificador_ar.png';
import Relogioqueatrasa from './assets/image/Relogio que atrasa.png';
import Sapatosapo from './assets/image/Sapato sapo.png';
import TenisGPSbar from './assets/image/Tênis GPS-bar.png';
import smartwatchinteligente from './assets/image/smartwatch inteligente.png'; 
import tarôdosboletos from './assets/image/tarô dos boletos.png';
import travesseirowifi from './assets/image/travesseiro wi-fi.png';
import Veladuvidosa from './assets/image/Vela duvidosa.png';
import Configuracoes from './Paginas/Configuracoes';
import { ThemeProvider } from './context/ThemeContext';

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
  const [showChat, setShowChat] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
 
  const images = importAllImagesSafe();
  const products = images.length ? images.map((img, i) => ({
    id: i,
    name: img.name.replace(/[-_]/g, ' '),
    image: img.src,
    price: (9.99 + i * 5).toFixed(2),
    description: `Descrição detalhada para ${img.name.replace(/[-_]/g, ' ')}`,
  })) : [
    { id: 0, name: 'Fone de ouvido', image: FoneOuvido, price: '89.99', description: 'Fone de ouvido Bluetooth com cancelamento deb ruído ativo e som de alta qualidade.' },
    //{ id: 1, name: 'Produto 11 de setembro', image: produto_11setembro, price: '199.99' },
    { id: 2, name: 'Bloco de notas invisível', image: BlocoNotasInvisivel, price: '49.99', description: 'Bloco com folhas invisíveis que só aparecem com luz UV divertido e prático para anotações secretas.' },
    { id: 3, name: 'Chapéu mini-ventilador', image: Chapeuminiventilador, price: '149.99', description: 'Chapéu com ventilador embutido para dias quentes leve e recarregável.' },
//    { id: 4, name: 'Chinelo massageador', image: Chineldomassageador, price: '79.99', description
    { id: 6, name: 'Fone de ouvido(blue)', image: FoneOuvidoblue, price: '129.99', description: 'Fone sem fio com cancelamento parcial de ruído e bateria de longa duração.' },
    { id: 7, name: 'Fone de ouvido (branco)', image: FoneOuvidobluebranco, price: '59.99', description: 'Modelo econômico, confortável para uso diário.' },
    { id: 8, name: 'Gato virtual', image: GatoVirtual, price: '19.99', description: 'Brinquedo interativo em forma de gato animação e som integrados.' },
    { id: 9, name: 'Marmita eletrica', image: marmitaeletrica, price: '259.99', description: 'Marmita elétrica portátil para aquecer refeições em qualquer lugar.' },
    { id: 11, name: 'Perfume de potó', image: perfumepoto, price: '29.99', description: 'Fragrância exótica e marcante  ideal para ocasiões especiais.' },
    { id: 10, name: 'Pílula da coragem', image: Piluladacoragem, price: '9.99', description: 'Brinquedo temático em formato de pílula ótimo para colecionadores.' },
    //{ id: 11, name: 'Fósforo de labubu', image: produto_fosforolabubu, price: '199.99' },
    { id: 12, name: 'Funko Paulinho', image: produto_funko, price: '50.00', description: 'Edição colecionável do Paulinho  ótimo presente para fãs.' },
    { id: 13, name: 'Purificador de ar', image: Purificador_ar, price: '78.80', description: 'Purificador compacto com filtro HEPA para ambientes pequenos.' },
    { id: 14, name: 'Relógio que atrasa', image: Relogioqueatrasa, price: '118.59', description: 'Relógio com design retrô pode atrasar intencionalmente para estilo.' },
    { id: 15, name: 'Sapato sapo', image: Sapatosapo, price: '67.69', description: 'Sapato com estampa de sapo confortável e divertido.' },
    { id: 16, name: 'Tênis voador', image: TenisGPSbar, price: '249.99', description: 'Tênis com estilo futurista e sola com tecnologia de desempenho.' },
    { id: 17, name: 'Smartwatch', image: smartwatchinteligente, price: '119.99', description: 'Relógio inteligente com monitoramento de saúde e notificações.' },
    { id: 18, name: 'Tarô dos boletos', image: tarôdosboletos, price: '9.99', description: 'Jogo de tarô bem-humorado que prevê suas finanças (ou não).'},
    { id: 19, name: 'Travesseiro wi-fi', image: travesseirowifi, price: '109.99', description: 'Travesseiro com conectividade para reproduzir sons e relaxamento.' },
    { id: 20, name: 'Vela duvidosa', image: Veladuvidosa, price: '6.99', description: 'Vela aromática com fragrância misteriosa use por sua conta e risco.' },

  ];

  // Filtra produtos baseado na busca
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5)); // Mostra no máximo 5 sugestões
      setShowSuggestions(true);
    } else {
      setFilteredProducts([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchClick = (product) => {
    navigate('/compra', { state: product });
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="dashboard-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="dashboard-header">
        <div className="header-left">
          <img
            src={logoAscend}
            alt="logo"
            className="header-logo"
            style={{ width: 120, height: 'auto', maxHeight: 90 }} // Aumenta a logo
          />
        </div>

        <div className="header-center" style={{ position: 'relative' }}>
          <div className="search-wrap" style={{ position: 'relative' }}>
            <input 
              className="search-input" 
              placeholder="Buscar produtos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              style={{
                width: '100%',
                padding: '12px 48px 12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                fontSize: 15,
                color: '#000',
                background: '#fff',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: showSuggestions ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
              }}
            />
            <button 
              className="search-btn" 
              type="button"
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 20,
                color: '#999',
                padding: 8,
                borderRadius: 4,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.background = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#999';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              🔍
            </button>

            {/* Sugestões de produtos */}
            {showSuggestions && filteredProducts.length > 0 && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: '1px solid #e0e0e0',
                zIndex: 1000,
                maxHeight: 400,
                overflowY: 'auto'
              }}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSearchClick(product)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: 12,
                      cursor: 'pointer',
                      borderBottom: '1px solid #f5f5f5',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: 'contain',
                        background: '#f5f5f5',
                        borderRadius: 6,
                        padding: 4
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: 14, 
                        fontWeight: 600, 
                        color: '#000',
                        marginBottom: 4
                      }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: 13, color: '#666' }}>
                        R$ {product.price}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: 18, 
                      color: '#ddd',
                      transition: 'color 0.2s ease'
                    }}>
                      →
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showSuggestions && filteredProducts.length === 0 && searchQuery && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: '1px solid #e0e0e0',
                padding: 20,
                textAlign: 'center',
                color: '#999',
                zIndex: 1000
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                <div style={{ fontSize: 14 }}>Nenhum produto encontrado</div>
              </div>
            )}
          </div>
        </div>

        <div className="header-right">
          <button className="link-btn" type="button">Faça o download</button>
          <button 
            className="link-btn" 
            type="button"
            onClick={() => navigate('/compras')}
          >
            📦 Minhas Compras
          </button>
          <button 
            className="link-btn" 
            type="button"
            onClick={() => navigate('/carrinho')}
          >
            🛒 Carrinho de Compras
          </button>
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
                <button 
                  className="settings-option" 
                  type="button"
                  onClick={() => {
                    setShowSettings(false);
                    navigate("/configuracoes", { state: { tab: 'notificacoes' } });
                  }}
                >
                  🔔 Notificações
                </button>
                <button 
                  className="settings-option" 
                  type="button"
                  onClick={() => {
                    setShowSettings(false);
                    navigate("/configuracoes", { state: { tab: 'aparencia' } });
                  }}
                >
                  🎨 Aparência
                </button>
                <button 
                  className="settings-option" 
                  type="button"
                  onClick={() => {
                    setShowSettings(false);
                    navigate("/configuracoes", { state: { tab: 'privacidade' } });
                  }}
                >
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

          <div className="hero-right" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            {/* Header de Promoções */}
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#000',
              borderBottom: '2px solid #000',
              paddingBottom: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              ⚡Promoções Relâmpago⚡
            </div>

            {/* Container horizontal dos produtos */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
              width: '100%'
            }}>
              {/* Produto em Promoção 1 */}
              <div
                onClick={() => navigate('/compra', { 
                  state: { 
                    ...products[17], 
                    isPromo: true, 
                    originalPrice: products[17].price,
                    promoPrice: (Number(products[17].price) * 0.65).toFixed(2),
                    discount: 35
                  } 
                })}
                style={{
                  background: '#fff',
                  border: '2px solid #000',
                  borderRadius: 6,
                  padding: 10,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  background: '#000',
                  color: '#fff',
                  padding: '3px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 1
                }}>
                  -35%
                </div>
                <img
                  src={products[17]?.image}
                  alt={products[17]?.name}
                  style={{
                    width: '100%',
                    height: 75,
                    objectFit: 'contain',
                    background: '#f5f5f5',
                    borderRadius: 4,
                    marginBottom: 8
                  }}
                />
                <div style={{ width: '100%', textAlign: 'center', padding: '0 6px' }}>
                  <div style={{ 
                    fontSize: 13, 
                    fontWeight: 600, 
                    marginBottom: 6,
                    color: '#000',
                    lineHeight: 1.3,
                    height: 32,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {products[17]?.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <span style={{ 
                      fontSize: 11, 
                      color: '#999', 
                      textDecoration: 'line-through' 
                    }}>
                      R$ {products[17]?.price}
                    </span>
                    <span style={{ 
                      fontSize: 17, 
                      fontWeight: 700, 
                      color: '#000' 
                    }}>
                      R$ {(Number(products[17]?.price) * 0.65).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Produto em Promoção 2 */}
              <div
                onClick={() => navigate('/compra', { 
                  state: { 
                    ...products[9], 
                    isPromo: true, 
                    originalPrice: products[9].price,
                    promoPrice: (Number(products[9].price) * 0.40).toFixed(2),
                    discount: 60
                  } 
                })}
                style={{
                  background: '#fff',
                  border: '2px solid #000',
                  borderRadius: 6,
                  padding: 10,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  background: '#000',
                  color: '#fff',
                  padding: '3px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 1
                }}>
                  -60%
                </div>
                <img
                  src={products[9]?.image}
                  alt={products[9]?.name}
                  style={{
                    width: '100%',
                    height: 75,
                    objectFit: 'contain',
                    background: '#f5f5f5',
                    borderRadius: 4,
                    marginBottom: 8
                  }}
                />
                <div style={{ width: '100%', textAlign: 'center', padding: '0 6px' }}>
                  <div style={{ 
                    fontSize: 13, 
                    fontWeight: 600, 
                    marginBottom: 6,
                    color: '#000',
                    lineHeight: 1.3,
                    height: 32,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {products[9]?.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <span style={{ 
                      fontSize: 11, 
                      color: '#999', 
                      textDecoration: 'line-through' 
                    }}>
                      R$ {products[9]?.price}
                    </span>
                    <span style={{ 
                      fontSize: 17, 
                      fontWeight: 700, 
                      color: '#000' 
                    }}>
                      R$ {(Number(products[9]?.price) * 0.40).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Produto em Promoção 3 */}
              <div
                onClick={() => navigate('/compra', { 
                  state: { 
                    ...products[16], 
                    isPromo: true, 
                    originalPrice: products[16].price,
                    promoPrice: (Number(products[16].price) * 0.75).toFixed(2),
                    discount: 25
                  } 
                })}
                style={{
                  background: '#fff',
                  border: '2px solid #000',
                  borderRadius: 6,
                  padding: 10,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  background: '#000',
                  color: '#fff',
                  padding: '3px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 1
                }}>
                  -25%
                </div>
                <img
                  src={products[16]?.image}
                  alt={products[16]?.name}
                  style={{
                    width: '100%',
                    height: 75,
                    objectFit: 'contain',
                    background: '#f5f5f5',
                    borderRadius: 4,
                    marginBottom: 8
                  }}
                />
                <div style={{ width: '100%', textAlign: 'center', padding: '0 6px' }}>
                  <div style={{ 
                    fontSize: 13, 
                    fontWeight: 600, 
                    marginBottom: 6,
                    color: '#000',
                    lineHeight: 1.3,
                    height: 32,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {products[16]?.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <span style={{ 
                      fontSize: 11, 
                      color: '#999', 
                      textDecoration: 'line-through' 
                    }}>
                      R$ {products[16]?.price}
                    </span>
                    <span style={{ 
                      fontSize: 17, 
                      fontWeight: 700, 
                      color: '#000' 
                    }}>
                      R$ {(Number(products[16]?.price) * 0.75).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer de Promoção */}
            <div style={{
              padding: 12,
              background: '#000',
              color: '#fff',
              borderRadius: 6,
              textAlign: 'center',
              marginTop: 2
            }}>
              <div style={{ fontSize: 10, marginBottom: 4, opacity: 0.8 }}>
                ⏰ Ofertas terminam em:
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>
                05:42:18
              </div>
            </div>
          </div>
        </section>

        <section className="products-section">
          <h3>Produtos Mais Vendidos</h3>
          <div className="product-cards">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.image} alt={p.name} className="product-img" />
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  {p.description && (
                    <div className="product-desc" style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
                      {p.description.length > 70 ? `${p.description.slice(0, 70)}...` : p.description}
                    </div>
                  )}
                  <div className="product-footer">
                    <div className="product-price">R$ {p.price}</div>
                    <button
                      className="botao comprar"
                      type="button"
                      onClick={() => navigate('/compra', { state: p })}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Botão flutuante para abrir chat */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#000',
            border: '2px solid #000',
            color: '#fff',
            fontSize: 28,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9997,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          title="Chat com Agente"
        >
          💬
        </button>
      )}

      {/* Chat flutuante */}
      {showChat && (
        <ChatDeAgente
          onClose={() => {
            setShowChat(false);
            setChatMinimized(false);
          }}
          isMinimized={chatMinimized}
          onToggleMinimize={() => setChatMinimized(!chatMinimized)}
        />
      )}
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
  const navigate = useNavigate();

  const openLogin = () => { setShowLogin(true); setShowRegister(false); };
  const openRegister = () => { setShowRegister(true); setShowLogin(false); };
  const closeForms = () => { setShowLogin(false); setShowRegister(false); };

  const isFormOpen = showLogin || showRegister;

  const handleLoginSubmit = (e) => { e.preventDefault(); /* autenticar... */ navigate('/produtos'); };
  const handleRegisterSubmit = (e) => { e.preventDefault(); /* criar conta... */ navigate('/produtos'); };

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


// Wrapper que força os botões "Voltar"/"Cancelar" dentro do Perfil a navegarem para /produtos
function PerfilWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    // Seleciona botões que contenham os textos esperados e sobrescreve o onclick
    const matchTexts = ['voltar', 'cancelar', 'cancel'];
    const buttons = Array.from(document.querySelectorAll('button')).filter((b) => {
      const t = (b.textContent || '').trim().toLowerCase();
      return matchTexts.includes(t);
    });

    const original = new Map();
    buttons.forEach((btn) => {
      original.set(btn, btn.onclick);
      btn.onclick = (e) => { e.preventDefault(); navigate('/produtos'); };
    });

    return () => {
      // restaura handlers originais ao desmontar
      original.forEach((handler, btn) => { btn.onclick = handler; });
    };
  }, [navigate]);

  return <Perfil />;
}

// Wrapper para renderizar Dashboard em rota dedicada e prover callbacks úteis
function DashboardRoute() {
  const navigate = useNavigate();
  return (
    <Dashboard
      onLogout={() => navigate('/')}
      onNavigateToAgent={() => navigate('/agente')}
    />
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/compra" element={<CompraDeProdutos />} />
      <Route path="/produtos" element={<DashboardRoute />} />
      <Route path="/perfil" element={<PerfilWrapper />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/agente" element={<CadastroDeAgentes />} />
      <Route path="/compras" element={<ComprasFeitas />} />
      <Route path="/carrinho" element={<CarrinhoDeCompras />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </ErrorBoundary>
  );
}