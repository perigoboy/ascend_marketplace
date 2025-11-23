import React from 'react';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();

  // Estilo comum para inputs com placeholder cinza
  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #000',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#000'
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px',
      backgroundColor: '#fff'
    }}>
      {/* Adiciona estilos CSS para placeholders */}
      <style>
        {`
          input::placeholder {
            color: #7a7a7aff;
            opacity: 1;
          }
          input::-webkit-input-placeholder {
            color: #9f9e9eff;
          }
          input::-moz-placeholder {
            color: #898888ff;
            opacity: 1;
          }
          input:-ms-input-placeholder {
            color: #666;
          }
        `}
      </style>
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        border: '1px solid #000'
      }}>
        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 16px',
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            ← Voltar
          </button>
          <h1 style={{ margin: 0, color: '#000' }}>Meu Perfil</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#000',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              color: 'white'
            }}>
              👾
            </div>
            <div>
              <h2 style={{ margin: '0 0 5px 0', color: '#000' }}>Nome do Usuário</h2>
              <p style={{ margin: 0, color: '#666' }}>usuario@email.com</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #000' }} />

          <div>
            <h3 style={{ marginBottom: '15px', color: '#000' }}>Informações Pessoais</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#000', fontSize: '14px', fontWeight: 600 }}>
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="Nome do Usuário"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#000', fontSize: '14px', fontWeight: 600 }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="usuario@email.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#000', fontSize: '14px', fontWeight: 600 }}>
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #000' }} />

          <div>
            <h3 style={{ marginBottom: '15px', color: '#000' }}>Endereço</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#000', fontSize: '14px', fontWeight: 600 }}>
                  CEP
                </label>
                <input
                  type="text"
                  placeholder="00000-000"
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#000', fontSize: '14px', fontWeight: 600 }}>
                    Rua
                  </label>
                  <input
                    type="text"
                    placeholder="Nome da rua"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#000', fontSize: '14px', fontWeight: 600 }}>
                    Número
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#000', fontSize: '14px', fontWeight: 600 }}>
                  Cidade / Estado
                </label>
                <input
                  type="text"
                  placeholder="Cidade - UF"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              style={{
                padding: '12px 24px',
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              Salvar Alterações
            </button>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: '12px 24px',
                background: '#fff',
                color: '#000',
                border: '1px solid #000',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;