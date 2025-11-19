// src/components/ChatPopup.jsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:4000");

export default function ChatPopup({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const [userId, setUserId] = useState(null);
  const boxRef = useRef(null);

  useEffect(() => {
    // cria id único na sessão
    let stored = sessionStorage.getItem("chatUserId");
    if (!stored) {
      stored = Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem("chatUserId", stored);
    }
    setUserId(stored);

    // recebe mensagens
    socket.on("receiveMessage", (m) => {
      setMessages(prev => [...prev, m]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  if (!open) return null; // não renderiza se estiver fechado

  const send = () => {
    if (!msgInput.trim()) return;

    const message = {
      userId,
      text: msgInput,
      ts: Date.now(),
    };

    socket.emit("sendMessage", message);
    setMsgInput("");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.window}>
        <div style={styles.header}>
          <span>💬 Chat Rápido</span>
          <button onClick={onClose} style={styles.closeBtn}>✖</button>
        </div>

        <div ref={boxRef} style={styles.messages}>
          {messages.map((m, i) => {
            const mine = m.userId === userId;
            return (
              <div key={i} style={{
                display: "flex",
                justifyContent: mine ? "flex-end" : "flex-start"
              }}>
                <div style={{
                  background: mine ? "#DCF8C6" : "#FFF",
                  padding: "8px 12px",
                  marginBottom: 10,
                  borderRadius: 10,
                  maxWidth: "70%",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}>
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={msgInput}
            onChange={e => setMsgInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Digite sua mensagem..."
          />
          <button style={styles.sendBtn} onClick={send}>➤</button>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS --- //
const styles = {
  overlay: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    zIndex: 99999,
  },
  window: {
    width: 300,
    height: 400,
    background: "#fafafa",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  header: {
    background: "#128C7E",
    padding: "10px",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: 16
  },
  messages: {
    flex: 1,
    padding: 10,
    overflowY: "auto",
    background: "#e5ddd5"
  },
  inputArea: {
    display: "flex",
    padding: 10,
    background: "#fff"
  },
  input: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  sendBtn: {
    marginLeft: 6,
    borderRadius: "50%",
    width: 40,
    height: 40,
    border: "none",
    background: "#128C7E",
    color: "white",
    cursor: "pointer",
    fontSize: 18
  }
};
