import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CompraDeProdutos() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state || null;
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Produto não selecionado</h2>
        <p>Selecione um produto na página de produtos.</p>
        <button onClick={() => navigate('/produtos')} className="botao principal">Ir para Produtos</button>
      </div>
    );
  }

  const unitPrice = Number(String(product.price).replace(',', '.')) || 0;
  const shippingFee = calculateShippingFee(unitPrice, qty);
  const total = (unitPrice * qty) + shippingFee;

  function calculateShippingFee(price, quantity) {
    const base = 9.9;
    const perItem = 2.5;
    return parseFloat((base + perItem * (quantity - 1)).toFixed(2));
  }

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/produtos');
    }, 800);
  };

  const handleAgentPurchase = () => {
    navigate('/agente', { state: { product, qty } });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f6f7fb' }}>
      <div style={{ padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1300, margin: '0 auto', width: '100%' }}>
        <button onClick={() => navigate('/produtos')} className="botao secundario">← Voltar</button>
        <div style={{ fontWeight: 700 }}>Finalizar Compra</div>
        <div />
      </div>

      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 1300, display: 'flex', gap: 28 }}>
          {/* Conteúdo principal */}
          <section style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 6px 20px rgba(16,24,40,0.06)' }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ flex: '0 0 48%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', maxWidth: 560, height: 'auto', objectFit: 'contain', borderRadius: 8, background: '#fff' }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ marginTop: 0 }}>{product.name}</h2>
                <p style={{ fontSize: 20, fontWeight: 700 }}>R$ {Number(unitPrice).toFixed(2)}</p>

                <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    Quantidade:
                    <input
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                      style={{ width: 90, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
                    />
                  </label>
                </div>

                <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={handleConfirm} className="botao principal" disabled={loading}>
                    {loading ? 'Processando...' : `Comprar (${qty})`}
                  </button>

                  <button onClick={handleAgentPurchase} className="botao principal" style={{ background: '#0a74ff' }}>
                    Comprar com Agente
                  </button>

                  <button onClick={() => navigate('/produtos')} className="botao secundario">
                    Cancelar / Voltar
                  </button>
                </div>

                <div style={{ marginTop: 18, color: '#666' }}>
                  <small>Detalhes do produto e política de devolução podem ser exibidos aqui.</small>
                </div>
              </div>
            </div>
          </section>

          {/* Painel de Taxas e Entrega */}
          <aside style={{ width: 340, alignSelf: 'flex-start' }}>
            <div style={{ position: 'sticky', top: 24, background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #eee', boxShadow: '0 6px 20px rgba(16,24,40,0.04)' }}>
              <h3 style={{ marginTop: 0 }}>Taxas e Entrega</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>Subtotal ({qty}×)</div>
                <div>R$ {(unitPrice * qty).toFixed(2)}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>Taxa de envio</div>
                <div>R$ {shippingFee.toFixed(2)}</div>
              </div>

              <div style={{ borderTop: '1px dashed #ddd', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <div>Total</div>
                <div>R$ {total.toFixed(2)}</div>
              </div>

              <div style={{ marginTop: 12, fontSize: 13, color: '#444' }}>
                <p style={{ margin: 0 }}>
                  Entrega estimada: 3–7 dias úteis.
                </p>
                <p style={{ marginTop: 8 }}>
                  Tarifas adicionais podem se aplicar para regiões remotas. O agente pode oferecer frete reduzido sob solicitação.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
