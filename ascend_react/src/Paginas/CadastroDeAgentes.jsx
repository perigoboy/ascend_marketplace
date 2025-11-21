import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroDeAgentes() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    codigoAgencia: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
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
    // Aqui você chamaria seu backend para criar o agente.
    // Simulação de sucesso:
    navigate('/produtos');
  };

  return (
    <div style={{ maxWidth: 680, margin: '28px auto', padding: 20, borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
      <h2>Cadastro de Agente de Compra</h2>
      <p style={{ color: '#555' }}>Preencha os dados abaixo para se cadastrar como agente de compras.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="codigoAgencia" value={form.codigoAgencia} onChange={handleChange} placeholder="Código da agência / Identificador" required />
        <input name="senha" type="password" value={form.senha} onChange={handleChange} placeholder="Senha" required />
        <input name="confirmarSenha" type="password" value={form.confirmarSenha} onChange={handleChange} placeholder="Confirmar senha" required />

        {error && <div style={{ color: 'crimson', fontSize: 13 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" className="botao principal">Cadastrar agente</button>
          <button type="button" className="botao secundario" onClick={() => navigate('/produtos')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
