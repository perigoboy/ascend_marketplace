import React, { useState, useRef, useEffect } from 'react';

export default function ChatDeAgente({ onClose, isMinimized, onToggleMinimize }) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Sou seu agente de compras. Como posso ajudar?', sender: 'agent', time: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  
  // NEW: estado para posição e arrasto
  const [position, setPosition] = useState({ x: window.innerWidth - 400, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // NEW: handlers para arrastar
  const handleMouseDown = (e) => {
    if (e.target.closest('.chat-header')) {
      setIsDragging(true);
      const rect = chatRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Limita para não sair da tela
      const maxX = window.innerWidth - 380;
      const maxY = window.innerHeight - 520;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      time: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simula resposta do agente após 1s
    setTimeout(() => {
      const agentMsg = {
        id: Date.now() + 1,
        text: `Recebi sua mensagem: "${text}". Um agente responderá em breve!`,
        sender: 'agent',
        time: new Date()
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 280,
          background: '#000',
          borderRadius: 8,
          padding: '12px 16px',
          boxShadow: '0 4px 12px rgba(57, 57, 57, 0.3)',
          cursor: 'pointer',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff',
          fontWeight: 600,
          border: '1px solid #333'
        }}
        onClick={onToggleMinimize}
      >
        <span>💬 Chat com Agente</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: 20,
            cursor: 'pointer',
            padding: 0,
            marginLeft: 8
          }}
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <div
      ref={chatRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 380,
        height: 520,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        overflow: 'hidden',
        border: '1px solid #000',
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Header */}
      <div
        className="chat-header"
        onMouseDown={handleMouseDown}
        style={{
          background: '#000',
          color: '#fff',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #333',
          cursor: 'grab',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#fff',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20
            }}
          >
            👔
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Agente de Compras</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Online</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onToggleMinimize}
            style={{
              background: 'transparent',
              border: '1px solid #000000ff',
              color: '#fff',
              width: 32,
              height: 32,
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            _
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #000000ff',
              color: '#fff',
              width: 32,
              height: 32,
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            ×
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                padding: '10px 14px',
                borderRadius: 8,
                background: msg.sender === 'user' ? '#000' : '#f5f5f5',
                color: msg.sender === 'user' ? '#fff' : '#000',
                border: msg.sender === 'user' ? 'none' : '1px solid #e0e0e0',
                wordWrap: 'break-word'
              }}
            >
              {msg.text}
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#999',
                marginTop: 4,
                paddingLeft: 4,
                paddingRight: 4
              }}
            >
              {msg.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: 16,
          borderTop: '1px solid #e0e0e0',
          background: '#fff',
          display: 'flex',
          gap: 8
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 4,
            border: '1px solid #ddd',
            outline: 'none',
            fontSize: 14
          }}
          onFocus={(e) => e.target.style.borderColor = '#000'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          style={{
            padding: '10px 18px',
            borderRadius: 4,
            background: inputText.trim() ? '#000' : '#e0e0e0',
            color: inputText.trim() ? '#fff' : '#999',
            border: 'none',
            cursor: inputText.trim() ? 'pointer' : 'not-allowed',
            fontWeight: 600,
            fontSize: 14,
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (inputText.trim()) e.currentTarget.style.background = '#333';
          }}
          onMouseLeave={(e) => {
            if (inputText.trim()) e.currentTarget.style.background = '#000';
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
