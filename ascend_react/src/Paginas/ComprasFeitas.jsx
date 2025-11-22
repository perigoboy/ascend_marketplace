import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FoneOuvido from '../assets/image/Fone de ouvido blue.png';
import smartwatchinteligente from '../assets/image/smartwatch inteligente.png';
import travesseirowifi from '../assets/image/travesseiro wi-fi.png';
import Purificador_ar from '../assets/image/Purificador_ar.png';
import Chapeuminiventilador from '../assets/image/Chapeu mini-ventilador.png';

export default function ComprasFeitas() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('comprados');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [orders, setOrders] = useState({
    comprados: [
      { 
        id: 'P001', 
        product: 'Fone de ouvido Bluetooth', 
        date: '2024-01-15', 
        price: 89.99, 
        quantity: 1,
        image: FoneOuvido,
        status: 'Aguardando envio'
      }
    ],
    em_transito: [
      {
        id: 'P002',
        product: 'Smartwatch Inteligente',
        date: '2024-01-10',
        price: 119.99,
        quantity: 1,
        image: smartwatchinteligente,
        estimatedDelivery: '2024-01-25',
        trackingSteps: [
          { status: 'Pedido confirmado', date: '2024-01-10 14:30', completed: true },
          { status: 'Em separação', date: '2024-01-11 09:15', completed: true },
          { status: 'Despachado', date: '2024-01-12 16:45', completed: true },
          { status: 'Em trânsito', date: '2024-01-13 08:00', completed: true },
          { status: 'Saiu para entrega', date: '', completed: false },
          { status: 'Entregue', date: '', completed: false }
        ]
      },
      {
        id: 'P003',
        product: 'Travesseiro Wi-Fi',
        date: '2024-01-12',
        price: 109.99,
        quantity: 2,
        image: travesseirowifi,
        estimatedDelivery: '2024-01-28',
        trackingSteps: [
          { status: 'Pedido confirmado', date: '2024-01-12 11:20', completed: true },
          { status: 'Em separação', date: '2024-01-13 10:00', completed: true },
          { status: 'Despachado', date: '', completed: false },
          { status: 'Em trânsito', date: '', completed: false },
          { status: 'Saiu para entrega', date: '', completed: false },
          { status: 'Entregue', date: '', completed: false }
        ]
      }
    ],
    recebidos: [
      {
        id: 'P004',
        product: 'Purificador de ar',
        date: '2024-01-05',
        price: 78.80,
        quantity: 1,
        image: Purificador_ar,
        deliveredDate: '2024-01-12',
        rated: false
      },
      {
        id: 'P005',
        product: 'Chapéu mini-ventilador',
        date: '2024-01-01',
        price: 149.99,
        quantity: 1,
        image: Chapeuminiventilador,
        deliveredDate: '2024-01-08',
        rated: true,
        rating: 5
      }
    ]
  });

  const tabs = [
    { key: 'comprados', label: 'Comprados', count: orders.comprados.length },
    { key: 'em_transito', label: 'Em Trânsito', count: orders.em_transito.length },
    { key: 'recebidos', label: 'Recebidos', count: orders.recebidos.length }
  ];

  const openRatingModal = (order) => {
    setSelectedOrder(order);
    setRating(0);
    setHoverRating(0);
    setComment('');
    setShowRatingModal(true);
  };

  const closeRatingModal = () => {
    setShowRatingModal(false);
    setSelectedOrder(null);
    setRating(0);
    setHoverRating(0);
    setComment('');
  };

  const submitRating = () => {
    if (rating === 0) {
      alert('Por favor, selecione uma classificação.');
      return;
    }

    // Atualiza o pedido com a avaliação
    setOrders(prev => ({
      ...prev,
      recebidos: prev.recebidos.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, rated: true, rating, comment } 
          : order
      )
    }));

    closeRatingModal();
  };

  const renderTrackingTimeline = (steps) => (
    <div style={{ marginTop: 16, paddingLeft: 16 }}>
      {steps.map((step, index) => (
        <div key={index} style={{ display: 'flex', gap: 12, marginBottom: 16, position: 'relative' }}>
          {/* Timeline line */}
          {index < steps.length - 1 && (
            <div style={{
              position: 'absolute',
              left: 9,
              top: 24,
              width: 2,
              height: 32,
              background: step.completed ? '#000' : '#e0e0e0'
            }} />
          )}
          
          {/* Circle indicator */}
          <div style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: step.completed ? '#000' : '#fff',
            border: `2px solid ${step.completed ? '#000' : '#e0e0e0'}`,
            flexShrink: 0,
            marginTop: 2
          }} />
          
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontWeight: step.completed ? 600 : 400, 
              color: step.completed ? '#000' : '#999',
              fontSize: 14
            }}>
              {step.status}
            </div>
            {step.date && (
              <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                {step.date}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    const currentOrders = orders[activeTab];

    if (currentOrders.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#999' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#000', marginBottom: 8 }}>
            Nenhum pedido encontrado
          </h3>
          <p>Você ainda não tem pedidos nesta categoria</p>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {currentOrders.map((order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              padding: 20,
              background: '#fafafa'
            }}
          >
            <div style={{ display: 'flex', gap: 16, marginBottom: activeTab === 'em_transito' ? 16 : 0 }}>
              <img
                src={order.image}
                alt={order.product}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #e0e0e0'
                }}
              />
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600, color: '#000' }}>
                      {order.product}
                    </h3>
                    <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>
                      Pedido #{order.id} • {order.quantity}x unidade(s)
                    </div>
                    <div style={{ fontSize: 13, color: '#666' }}>
                      Data da compra: {new Date(order.date).toLocaleDateString('pt-BR')}
                    </div>
                    
                    {activeTab === 'em_transito' && order.estimatedDelivery && (
                      <div style={{ 
                        marginTop: 8, 
                        fontSize: 13, 
                        color: '#000',
                        fontWeight: 600
                      }}>
                        Previsão de entrega: {new Date(order.estimatedDelivery).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    
                    {activeTab === 'recebidos' && order.deliveredDate && (
                      <div style={{ marginTop: 8, fontSize: 13, color: '#000', fontWeight: 600 }}>
                        Entregue em: {new Date(order.deliveredDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#000' }}>
                      R$ {(order.price * order.quantity).toFixed(2)}
                    </div>
                    {activeTab === 'comprados' && order.status && (
                      <div style={{ 
                        marginTop: 8,
                        fontSize: 12,
                        color: '#666',
                        padding: '4px 8px',
                        background: '#fff',
                        borderRadius: 4,
                        border: '1px solid #ddd'
                      }}>
                        {order.status}
                      </div>
                    )}
                  </div>
                </div>

                {activeTab === 'recebidos' && (
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    {!order.rated ? (
                      <button
                        style={{
                          padding: '8px 16px',
                          background: '#000',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontSize: 13,
                          fontWeight: 600
                        }}
                        onClick={() => openRatingModal(order)}
                      >
                        Avaliar produto
                      </button>
                    ) : (
                      <div style={{ 
                        fontSize: 13, 
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        {'⭐'.repeat(order.rating)} Avaliado
                      </div>
                    )}
                    <button
                      style={{
                        padding: '8px 16px',
                        background: '#fff',
                        color: '#000',
                        border: '1px solid #ddd',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600
                      }}
                    >
                      Comprar novamente
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tracking timeline for em_transito */}
            {activeTab === 'em_transito' && order.trackingSteps && (
              <div style={{ 
                borderTop: '1px solid #e0e0e0', 
                paddingTop: 16,
                marginTop: 16
              }}>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 600, 
                  marginBottom: 12,
                  color: '#000'
                }}>
                  Rastreamento do pedido
                </div>
                {renderTrackingTimeline(order.trackingSteps)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid #e0e0e0',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={() => navigate('/produtos')}
          style={{
            background: 'transparent',
            border: '1px solid #000',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 600,
            color: '#000'
          }}
        >
          ← Voltar
        </button>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#000' }}>Minhas Compras</h1>
        <div style={{ width: 100 }} />
      </div>

      {/* Tabs */}
      <div style={{
        borderBottom: '1px solid #e0e0e0',
        background: '#fafafa',
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '16px 24px',
                background: activeTab === tab.key ? '#fff' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid #000' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === tab.key ? 700 : 400,
                fontSize: 15,
                color: activeTab === tab.key ? '#000' : '#666',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: 24 }}>
        {renderContent()}
      </div>

      {/* Rating Modal */}
      {showRatingModal && selectedOrder && (
        <div
          onClick={closeRatingModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: 20
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 500,
              background: '#fff',
              borderRadius: 12,
              padding: 32,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: '0 0 8px 0', fontSize: 24, fontWeight: 700, color: '#000' }}>
                Avaliar Produto
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
                {selectedOrder.product}
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 8, 
              marginBottom: 24 
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: 48,
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'transform 0.2s ease',
                    transform: (hoverRating >= star || rating >= star) ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  <span style={{ 
                    color: (hoverRating >= star || rating >= star) ? '#FFD700' : '#e0e0e0',
                    textShadow: (hoverRating >= star || rating >= star) ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                  }}>
                    ★
                  </span>
                </button>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 14, color: '#666', fontWeight: 600 }}>
                {rating === 0 ? 'Selecione uma classificação' :
                 rating === 1 ? 'Muito ruim' :
                 rating === 2 ? 'Ruim' :
                 rating === 3 ? 'Regular' :
                 rating === 4 ? 'Bom' :
                 'Excelente'}
              </span>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 600, 
                fontSize: 14, 
                color: '#000' 
              }}>
                Comentário (opcional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Conte-nos sobre sua experiência com este produto..."
                style={{
                  width: '100%',
                  minHeight: 100,
                  padding: 12,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 14,
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={submitRating}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: rating > 0 ? '#000' : '#ddd',
                  color: rating > 0 ? '#fff' : '#999',
                  border: 'none',
                  borderRadius: 8,
                  cursor: rating > 0 ? 'pointer' : 'not-allowed',
                  fontWeight: 600,
                  fontSize: 15,
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (rating > 0) e.currentTarget.style.background = '#333';
                }}
                onMouseLeave={(e) => {
                  if (rating > 0) e.currentTarget.style.background = '#000';
                }}
              >
                Enviar Avaliação
              </button>
              <button
                onClick={closeRatingModal}
                style={{
                  padding: '14px 24px',
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#666'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
