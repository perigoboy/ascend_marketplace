import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CarrinhoDeCompras() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Dados de checkout
  const [address, setAddress] = useState({ street: '', number: '', city: '', state: '', zip: '' });
  const [addressErrors, setAddressErrors] = useState({});
  const [selectedCardId, setSelectedCardId] = useState('c1');
  const [savedCards] = useState([
    { id: 'c1', label: 'Cartão virtual de crédito XXX-029-XXX', type: 'Crédito' },
    { id: 'c2', label: 'Cartão débito XXX-512-XXX', type: 'Débito' }
  ]);

  // Carrega itens do localStorage
  useEffect(() => {
    const loadCart = () => {
      console.log('=== CARREGANDO CARRINHO ===');
      const cartData = localStorage.getItem('cart');
      console.log('1. Raw data do localStorage:', cartData);
      
      if (!cartData) {
        console.log('2. Nenhum dado encontrado no localStorage');
        setCartItems([]);
        return;
      }
      
      try {
        const items = JSON.parse(cartData);
        console.log('2. Items parseados:', items);
        console.log('3. Número de items:', items.length);
        setCartItems(items);
        console.log('4. State atualizado');
      } catch (error) {
        console.error('Erro ao parsear carrinho:', error);
        setCartItems([]);
      }
      
      console.log('=== CARREGAMENTO CONCLUÍDO ===');
    };
    
    // Carrega imediatamente
    loadCart();
    
    // Adiciona listeners
    const handleStorageChange = () => {
      console.log('Storage event detectado');
      loadCart();
    };
    
    const handleCartUpdate = () => {
      console.log('Cart-updated event detectado');
      loadCart();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleCartUpdate);
    
    // Adiciona um timer para forçar recarregamento após 500ms
    const timer = setTimeout(() => {
      console.log('Timer: Forçando recarregamento...');
      loadCart();
    }, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleCartUpdate);
      clearTimeout(timer);
    };
  }, []);

  // Salva no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateShipping = () => {
    const base = 9.9;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return parseFloat((base + 2.5 * (totalItems - 1)).toFixed(2));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(String(item.price).replace(',', '.')) || 0;
    return sum + (price * item.quantity);
  }, 0);

  const shipping = cartItems.length > 0 ? calculateShipping() : 0;
  const total = subtotal + shipping;

  const validateAddress = (addr) => {
    const errs = {};
    if (!addr.street) errs.street = 'Rua é obrigatória';
    if (!addr.number) errs.number = 'Número é obrigatório';
    if (!addr.city) errs.city = 'Cidade é obrigatória';
    if (!addr.state) errs.state = 'Estado é obrigatório';
    if (!addr.zip) errs.zip = 'CEP é obrigatório';
    return errs;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    setShowCheckout(true);
  };

  const confirmPayment = () => {
    const errs = validateAddress(address);
    setAddressErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      setShowCheckout(false);
      clearCart();
      alert('Pedido realizado com sucesso!');
      navigate('/produtos');
    }, 1500);
  };

  const closeCheckout = () => {
    if (processingPayment) return;
    setShowCheckout(false);
    setAddressErrors({});
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
          ← Continuar Comprando
        </button>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#000' }}>Carrinho de Compras</h1>
        <div style={{ width: 150 }} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: 24 }}>
        {cartItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px',
            color: '#999'
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <h2 style={{ fontSize: 24, fontWeight: 600, color: '#000', marginBottom: 8 }}>
              Seu carrinho está vazio
            </h2>
            <p style={{ marginBottom: 24, color: '#666' }}>Adicione produtos para começar suas compras</p>
            <button
              onClick={() => navigate('/produtos')}
              style={{
                background: '#000',
                color: '#fff',
                border: 'none',
                padding: '12px 32px',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 15
              }}
            >
              Ver Produtos
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 32 }}>
            {/* Lista de Produtos */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {cartItems.map((item) => {
                  const price = Number(String(item.price).replace(',', '.')) || 0;
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: 16,
                        padding: 16,
                        border: '1px solid #e0e0e0',
                        borderRadius: 8,
                        background: '#fafafa'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'contain',
                          background: '#fff',
                          borderRadius: 4,
                          border: '1px solid #e0e0e0'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600, color: '#000' }}>
                          {item.name}
                        </h3>
                        <p style={{ margin: '0 0 12px 0', fontSize: 13, color: '#666' }}>
                          {item.description?.slice(0, 80)}...
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{
                                width: 28,
                                height: 28,
                                border: '1px solid #ddd',
                                background: '#fff',
                                borderRadius: 4,
                                cursor: 'pointer',
                                fontWeight: 600,
                                color: '#000'
                              }}
                            >
                              −
                            </button>
                            <span style={{ minWidth: 30, textAlign: 'center', fontWeight: 600, color: '#000' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{
                                width: 28,
                                height: 28,
                                border: '1px solid #ddd',
                                background: '#fff',
                                borderRadius: 4,
                                cursor: 'pointer',
                                fontWeight: 600,
                                color: '#000'
                              }}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#999',
                              cursor: 'pointer',
                              fontSize: 13,
                              textDecoration: 'underline'
                            }}
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: '#000' }}>
                          R$ {(price * item.quantity).toFixed(2)}
                        </div>
                        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                          R$ {price.toFixed(2)} cada
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={clearCart}
                style={{
                  marginTop: 16,
                  background: 'transparent',
                  border: '1px solid #ddd',
                  padding: '8px 16px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  color: '#666',
                  fontSize: 13
                }}
              >
                Limpar Carrinho
              </button>
            </div>

            {/* Resumo do Pedido */}
            <div style={{ width: 340 }}>
              <div style={{
                position: 'sticky',
                top: 24,
                border: '1px solid #000',
                borderRadius: 8,
                padding: 20,
                background: '#fafafa'
              }}>
                <h2 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700, color: '#000' }}>
                  Resumo do Pedido
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#000' }}>
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#000' }}>
                    <span>Frete</span>
                    <span>R$ {shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid #ddd',
                  paddingTop: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 20,
                  color: '#000'
                }}>
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 15,
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#000'}
                >
                  Finalizar Compra
                </button>

                <div style={{ marginTop: 16, fontSize: 12, color: '#666', lineHeight: 1.5 }}>
                  <p style={{ margin: 0 }}>✓ Entrega em 3-7 dias úteis</p>
                  <p style={{ margin: '4px 0 0 0' }}>✓ Frete grátis acima de R$ 200</p>
                  <p style={{ margin: '4px 0 0 0' }}>✓ Devolução grátis em 30 dias</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div
          onClick={closeCheckout}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: 20
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 600,
              background: '#fff',
              borderRadius: 8,
              padding: 24,
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#000' }}>Finalizar Compra</h2>
              <button
                onClick={closeCheckout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1,
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            {/* Endereço */}
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#000' }}>Endereço de Entrega</h3>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <input
                    placeholder="Rua *"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4, color: '#000' }}
                  />
                  {addressErrors.street && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{addressErrors.street}</div>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <input
                      placeholder="Número *"
                      value={address.number}
                      onChange={(e) => setAddress({ ...address, number: e.target.value })}
                      style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4, color: '#000' }}
                    />
                    {addressErrors.number && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{addressErrors.number}</div>}
                  </div>
                  <div>
                    <input
                      placeholder="CEP *"
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4, color: '#000' }}
                    />
                    {addressErrors.zip && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{addressErrors.zip}</div>}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                  <div>
                    <input
                      placeholder="Cidade *"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4, color: '#000' }}
                    />
                    {addressErrors.city && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{addressErrors.city}</div>}
                  </div>
                  <div>
                    <input
                      placeholder="Estado *"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4, color: '#000' }}
                    />
                    {addressErrors.state && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{addressErrors.state}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#000' }}>Forma de Pagamento</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {savedCards.map(card => (
                  <label
                    key={card.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 12,
                      border: selectedCardId === card.id ? '2px solid #000' : '1px solid #ddd',
                      borderRadius: 4,
                      cursor: 'pointer',
                      background: selectedCardId === card.id ? '#f5f5f5' : '#fff'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#000' }}>{card.label}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{card.type}</div>
                    </div>
                    <input
                      type="radio"
                      name="card"
                      value={card.id}
                      checked={selectedCardId === card.id}
                      onChange={() => setSelectedCardId(card.id)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Resumo Final */}
            <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#000' }}>
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#000' }}>
                <span>Frete</span>
                <span>R$ {shipping.toFixed(2)}</span>
              </div>
              <div style={{
                borderTop: '1px solid #ddd',
                paddingTop: 8,
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 18,
                fontWeight: 700,
                color: '#000'
              }}>
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={confirmPayment}
              disabled={processingPayment}
              style={{
                width: '100%',
                padding: 14,
                background: processingPayment ? '#999' : '#000',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: processingPayment ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: 15
              }}
            >
              {processingPayment ? 'Processando...' : 'Confirmar Pagamento'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
