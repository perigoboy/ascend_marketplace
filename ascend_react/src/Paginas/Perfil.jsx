import React from 'react';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();

  return (

    <div
    style={{
      minHeight: '100vh',
      padding: '40px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
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
              fontSize: '14px'
            }}
          >
            ← Voltar
          </button>
          <h1 style={{ margin: 0 }}>Meu Perfil</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              color: 'white'
            }}>
              👤
            </div>
            <div>
              <h2 style={{ margin: '0 0 5px 0' }}>Nome do Usuário</h2>
              <p style={{ margin: 0, color: '#666' }}>usuario@email.com</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />

          <div>
            <h3 style={{ marginBottom: '15px' }}>Informações Pessoais</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Nome completo
                </label>
                <input
                  type="text"
                  defaultValue="Nome do Usuário"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="usuario@email.com"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />

          <div>
            <h3 style={{ marginBottom: '15px' }}>Endereço</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  CEP
                </label>
                <input
                  type="text"
                  placeholder="00000-000"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                    Rua
                  </label>
                  <input
                    type="text"
                    placeholder="Nome da rua"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                    Número
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Cidade / Estado
                </label>
                <input
                  type="text"
                  placeholder="Cidade - UF"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
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
                fontWeight: '500'
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
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
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