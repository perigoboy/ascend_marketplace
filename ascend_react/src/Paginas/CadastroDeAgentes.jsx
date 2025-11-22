import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroDeAgentes() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    codigoAgencia: '',
    senha: '',
    confirmarSenha: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.senha || !form.codigoAgencia) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setError('As senhas não conferem.');
      return;
    }
    // Aqui você chamaria seu backend para criar o agente com a imagem
    navigate('/produtos');
  };

  const inputStyle = {
    padding: '14px 16px',
    fontSize: 15,
    borderRadius: 8,
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div style={{ 
        maxWidth: 720, 
        width: '100%',
        background: '#fff', 
        padding: '40px 48px', 
        borderRadius: 16, 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #000'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#000' }}>
            Cadastro de Agente
          </h1>
          <p style={{ color: '#666', marginTop: 8, fontSize: 15 }}>
            Preencha os dados abaixo para se tornar um agente de compras
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Profile Image Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ 
              width: 120, 
              height: 120, 
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #000',
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: 48, color: '#ccc' }}>👤</span>
              )}
            </div>
            <label style={{ 
              cursor: 'pointer',
              padding: '8px 20px',
              background: '#000',
              color: '#fff',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#000'}
            >
              Escolher foto de perfil
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {/* Form Fields */}
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#000', fontSize: 14 }}>
              Nome completo *
            </label>
            <input 
              name="nome" 
              value={form.nome} 
              onChange={handleChange} 
              placeholder="Digite seu nome completo" 
              required 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#000', fontSize: 14 }}>
                Email *
              </label>
              <input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="seu@email.com" 
                required 
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#000', fontSize: 14 }}>
                Telefone
              </label>
              <input 
                name="telefone" 
                type="tel" 
                value={form.telefone} 
                onChange={handleChange} 
                placeholder="(00) 00000-0000" 
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#000', fontSize: 14 }}>
              Código da agência / Identificador *
            </label>
            <input 
              name="codigoAgencia" 
              value={form.codigoAgencia} 
              onChange={handleChange} 
              placeholder="Digite o código da sua agência" 
              required 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#000', fontSize: 14 }}>
                Senha *
              </label>
              <input 
                name="senha" 
                type="password" 
                value={form.senha} 
                onChange={handleChange} 
                placeholder="••••••••" 
                required 
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#000', fontSize: 14 }}>
                Confirmar senha *
              </label>
              <input 
                name="confirmarSenha" 
                type="password" 
                value={form.confirmarSenha} 
                onChange={handleChange} 
                placeholder="••••••••" 
                required 
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
          </div>

          {error && (
            <div style={{ 
              padding: '12px 16px', 
              background: '#fee', 
              color: '#c00', 
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              border: '1px solid #fcc'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button 
              type="submit" 
              className="botao principal"
              style={{
                flex: 1,
                padding: '14px 24px',
                fontSize: 16,
                fontWeight: 600,
                background: '#000',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Cadastrar agente
            </button>
            <button 
              type="button" 
              className="botao secundario"
              onClick={() => navigate('/produtos')}
              style={{
                padding: '14px 24px',
                fontSize: 16,
                fontWeight: 600,
                background: '#fff',
                border: '2px solid #ddd',
                borderRadius: 8,
                color: '#000',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.borderColor = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.borderColor = '#ddd';
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
