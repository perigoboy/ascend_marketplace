
import React, { useState } from 'react';
import '../styles/agente.css'; 
import logoAscend from '../assets/image/ascend_market.jpeg';

function CadastroAgentePage() {
    
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmaVisivel, setConfirmaVisivel] = useState(false);

    // Função para simular o toggle de visibilidade de senha
    const togglePasswordVisibility = (campoId) => {
        if (campoId === 'senha') {
            setSenhaVisivel(!senhaVisivel);
        } else if (campoId === 'confirma-senha') {
            setConfirmaVisivel(!confirmaVisivel);
        }
    };
    
    // Simulação do envio de código de verificação
    const handleEnviarCodigo = () => {
        const email = document.getElementById('email').value;
        if (!email) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        alert(`Simulando envio de código para: ${email}. Verifique a caixa de entrada.`);
        // Aqui você chamaria sua API de Back-end
    };

    // Simulação do envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de validação aqui (ex: senhas coincidem, CPF/CNPJ válido)
        alert('Cadastro de Agente Simulado com Sucesso!');
        console.log('Formulário de cadastro enviado.');
    };

    return (
        <div className="cadastro-agente-wrapper">
            
            {/* HEADER SIMPLIFICADO */}
            <header className="header-agente">
                <div className="header-content">
                    <a href="#" className="logo-link">
                        {/* ATENÇÃO: Use o logo importado */}
                        <img src={logoAscend} alt="Ascend Market Logo" className="ascend-logo" />
                    </a>
                    
                    <div className="header-right">
                        <span className="idioma-link">
                            <i className="fas fa-globe"></i> Português <i className="fas fa-caret-down"></i>
                        </span>
                        <button className="btn-login-header" type="button">Fazer login</button>
                    </div>
                </div>
            </header>

            {/* ÁREA PRINCIPAL CENTRALIZADA */}
            <main className="main-content-agente">
                
                <h1 className="titulo-pagina">
                    Bem-vindo(a), junte-se ao Centro de Agentes Global do AscendMarket
                </h1>
                
                {/* FORMULÁRIO CENTRALIZADO */}
                <div className="formulario-container">
                    <h2 className="form-titulo">Preencha as Informações de Cadastro</h2>
                    
                    <form className="form-cadastro" onSubmit={handleSubmit}>
                        
                        {/* 1. PAÍS DA LOJA (SELECT) */}
                        <div className="input-grupo">
                            <label htmlFor="pais-loja">* País do imposto da loja</label>
                            <p className="input-subtitle">País não pode ser alterado após o registro</p>
                            <select id="pais-loja">
                                <option value="">Selecione</option>
                                <option value="BR">Brasil</option>
                                <option value="US">Estados Unidos</option>
                            </select>
                        </div>

                        {/* 2. CPF OU CNPJ (NOVO CAMPO) */}
                        <div className="input-grupo">
                            <label htmlFor="cpf-cnpj">* CPF ou CNPJ</label>
                            <input type="text" id="cpf-cnpj" placeholder="Por favor, insira o seu CPF ou CNPJ" required />
                        </div>

                        {/* 3. E-MAIL */}
                        <div className="input-grupo">
                            <label htmlFor="email">* E-mail <i className="fas fa-info-circle"></i></label>
                            <input type="email" id="email" placeholder="Por favor escreva o email como comunicável." required />
                            
                            {/* Campo de Verificação de E-mail (Código) */}
                            <div className="input-verificacao">
                                <input type="text" placeholder="Por favor, insira o código de verificação de e-mail enviado" required />
                                <button type="button" className="btn-enviar-codigo" onClick={handleEnviarCodigo}>Enviar</button>
                            </div>
                        </div>

                        {/* 4. SENHA */}
                        <div className="input-grupo">
                            <label htmlFor="senha">* Defina uma senha de conta</label>
                            <div className="input-senha">
                                <input 
                                    type={senhaVisivel ? 'text' : 'password'} 
                                    id="senha" 
                                    placeholder="Por favor, insira a senha" 
                                    required
                                />
                                <i 
                                    className={`fas ${senhaVisivel ? 'fa-eye-slash' : 'fa-eye'} icone-senha`} 
                                    onClick={() => togglePasswordVisibility('senha')}
                                ></i>
                            </div>
                        </div>

                        {/* 5. CONFIRMAR SENHA */}
                        <div className="input-grupo">
                            <div className="input-senha">
                                <input 
                                    type={confirmaVisivel ? 'text' : 'password'} 
                                    id="confirma-senha" 
                                    placeholder="Digite a senha novamente" 
                                    required
                                />
                                <i 
                                    className={`fas ${confirmaVisivel ? 'fa-eye-slash' : 'fa-eye'} icone-senha`} 
                                    onClick={() => togglePasswordVisibility('confirma-senha')}
                                ></i>
                            </div>
                        </div>

                        {/* BOTÃO CRIAR (Registrar-se) */}
                        <button type="submit" className="btn-criar">
                            Criar
                        </button>
                    </form>
                </div>
                
            </main>
        </div>
    );
}

export default CadastroAgentePage;