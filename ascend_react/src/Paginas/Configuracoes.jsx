import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Configuracoes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme, theme } = useTheme();
  const initialTab = location.state?.tab || 'aparencia';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Estados para Aparência
  const [fontSize, setFontSize] = useState('medium');
  
  // Estados para Notificações
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  
  // Estados para Privacidade
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  const tabs = [
    { key: 'aparencia', label: 'Aparência', icon: '🎨' },
    { key: 'notificacoes', label: 'Notificações', icon: '🔔' },
    { key: 'privacidade', label: 'Privacidade', icon: '🔒' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'aparencia':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600, color: theme.text }}>
                Tema
              </h3>
              <div style={{ display: 'flex', gap: 12 }}>
                <div
                  onClick={toggleTheme}
                  style={{
                    flex: 1,
                    padding: 20,
                    border: `2px solid ${theme.border}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: isDark ? theme.cardBg : theme.bg,
                    color: theme.text,
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>
                    {isDark ? '🌙' : '☀️'}
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    {isDark ? 'Modo Escuro' : 'Modo Claro'}
                  </div>
                  <div style={{ fontSize: 12, color: isDark ? '#999' : '#666', marginTop: 4 }}>
                    {isDark ? 'Ativado' : 'Desativado'}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600, color: theme.text }}>
                Tamanho da Fonte
              </h3>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { key: 'small', label: 'Pequeno', size: 14 },
                  { key: 'medium', label: 'Médio', size: 16 },
                  { key: 'large', label: 'Grande', size: 18 }
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFontSize(f.key)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: fontSize === f.key ? `2px solid ${theme.text}` : `1px solid ${theme.inputBorder}`,
                      borderRadius: 8,
                      background: fontSize === f.key ? theme.hover : theme.bg,
                      cursor: 'pointer',
                      fontSize: f.size,
                      fontWeight: 600,
                      color: theme.text,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: theme.secondaryBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 8,
              padding: 16
            }}>
              <div style={{ fontSize: 14, color: theme.text, lineHeight: 1.6 }}>
                💡 <strong>Dica:</strong> As alterações de tema e tamanho de fonte são aplicadas imediatamente em toda a plataforma.
              </div>
            </div>
          </div>
        );

      case 'notificacoes':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600, color: theme.text }}>
                Canais de Notificação
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: theme.cardBg
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.text, marginBottom: 4 }}>
                      📧 Notificações por Email
                    </div>
                    <div style={{ fontSize: 13, color: isDark ? '#999' : '#666' }}>
                      Receba atualizações importantes por email
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: theme.cardBg
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.text, marginBottom: 4 }}>
                      🔔 Notificações Push
                    </div>
                    <div style={{ fontSize: 13, color: isDark ? '#999' : '#666' }}>
                      Receba notificações no navegador
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </label>
              </div>
            </div>

            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600, color: theme.text }}>
                Tipos de Notificação
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: theme.cardBg
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.text, marginBottom: 4 }}>
                      📦 Atualizações de Pedidos
                    </div>
                    <div style={{ fontSize: 13, color: isDark ? '#999' : '#666' }}>
                      Status de entrega, confirmação, etc.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={orderUpdates}
                    onChange={(e) => setOrderUpdates(e.target.checked)}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: theme.cardBg
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.text, marginBottom: 4 }}>
                      🎁 Promoções e Ofertas
                    </div>
                    <div style={{ fontSize: 13, color: isDark ? '#999' : '#666' }}>
                      Receba ofertas especiais e descontos
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={promotions}
                    onChange={(e) => setPromotions(e.target.checked)}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case 'privacidade':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600, color: theme.text }}>
                Visibilidade do Perfil
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { key: 'public', label: 'Público', desc: 'Qualquer pessoa pode ver seu perfil' },
                  { key: 'friends', label: 'Amigos', desc: 'Apenas seus amigos podem ver' },
                  { key: 'private', label: 'Privado', desc: 'Apenas você pode ver seu perfil' }
                ].map((option) => (
                  <label
                    key={option.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 16,
                      border: profileVisibility === option.key ? `2px solid ${theme.text}` : `1px solid ${theme.inputBorder}`,
                      borderRadius: 8,
                      cursor: 'pointer',
                      background: profileVisibility === option.key ? theme.hover : theme.cardBg
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: theme.text, marginBottom: 4 }}>
                        {option.label}
                      </div>
                      <div style={{ fontSize: 13, color: isDark ? '#999' : '#666' }}>
                        {option.desc}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="visibility"
                      checked={profileVisibility === option.key}
                      onChange={() => setProfileVisibility(option.key)}
                      style={{ width: 20, height: 20, cursor: 'pointer' }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600, color: theme.text }}>
                Dados e Privacidade
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: theme.cardBg
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.text, marginBottom: 4 }}>
                      🛒 Mostrar Histórico de Compras
                    </div>
                    <div style={{ fontSize: 13, color: isDark ? '#999' : '#666' }}>
                      Permitir que outros vejam suas compras
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showPurchaseHistory}
                    onChange={(e) => setShowPurchaseHistory(e.target.checked)}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: theme.cardBg
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.text, marginBottom: 4 }}>
                      📊 Compartilhamento de Dados
                    </div>
                    <div style={{ fontSize: 13, color: isDark ? '#999' : '#666' }}>
                      Ajude a melhorar a experiência compartilhando dados anônimos
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={dataSharing}
                    onChange={(e) => setDataSharing(e.target.checked)}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </label>
              </div>
            </div>

            <div style={{
              background: isDark ? '#1a0000' : '#fff5f5',
              border: '1px solid #fca5a5',
              borderRadius: 8,
              padding: 16
            }}>
              <div style={{ fontSize: 14, color: '#991b1b', lineHeight: 1.6, marginBottom: 12 }}>
                <strong>⚠️ Zona de Perigo</strong>
              </div>
              <button
                style={{
                  padding: '10px 16px',
                  background: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600
                }}
                onClick={() => {
                  if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
                    alert('Funcionalidade de exclusão de conta em desenvolvimento.');
                  }
                }}
              >
                Excluir Conta
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSave = () => {
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${theme.border}`,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={() => navigate('/produtos')}
          style={{
            background: 'transparent',
            border: `1px solid ${theme.text}`,
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 600,
            color: theme.text
          }}
        >
          ← Voltar
        </button>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: theme.text }}>Configurações</h1>
        <div style={{ width: 100 }} />
      </div>

      {/* Tabs */}
      <div style={{
        borderBottom: `1px solid ${theme.border}`,
        background: theme.secondaryBg,
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '16px 24px',
                background: activeTab === tab.key ? theme.bg : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.key ? `2px solid ${theme.text}` : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === tab.key ? 700 : 400,
                fontSize: 15,
                color: activeTab === tab.key ? theme.text : (isDark ? '#999' : '#666'),
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: 800, width: '100%', margin: '0 auto', padding: 24 }}>
        {renderContent()}

        {/* Save Button */}
        <div style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: `1px solid ${theme.border}`,
          display: 'flex',
          gap: 12
        }}>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 32px',
              background: theme.text,
              color: theme.bg,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 15,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Salvar Alterações
          </button>
          <button
            onClick={() => navigate('/produtos')}
            style={{
              padding: '12px 32px',
              background: theme.bg,
              color: theme.text,
              border: `1px solid ${theme.border}`,
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 15
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
