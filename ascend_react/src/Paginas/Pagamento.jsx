import React from "react";
import '../styles/pagamento.css'; // arquivo de estilos separado

function PagamentoPage() {

return (
<div className="container">
<h1 className="titulo">Pagamento</h1>

 {/* Bônus */}
  <div className="card">
    <div className="card-header">
      <h2>Bônus</h2>
      <p>As informações de pagamento são criptografadas</p>
    </div>
    <div className="bonus-content">
      <div className="bonus-info">
        <p className="bonus-label">Saldo bônus</p>
        <h3 className="bonus-total">R$0,00</h3>
      </div>
      <div className="bonus-status">
        <p>Disponível: R$0,00</p>
        <p>Pendente: R$0,00</p>
      </div>
    </div>
  </div>

  {/* FAQ */}
  <div className="card">
    <div className="card-header">
      <h2>FAQ</h2>
    </div>
    <div className="faq-content">
      <div className="faq-item">
        <div>
          <p className="faq-title">Como usar?</p>
          <p className="faq-text">
            Você pode usar seu bônus para pagar total ou parcialmente seus
            pedidos.
          </p>
        </div>
        <button>Ver mais</button>
      </div>

      <div className="faq-item">
        <div>
          <p className="faq-title">Can I switch my fast refund bonus?</p>
          <p className="faq-text">
            Desde que certos critérios sejam cumpridos, você pode trocar o
            bônus de reembolso rápido pelo reembolso original.
          </p>
        </div>
        <button>Ver mais</button>
      </div>

      <div className="faq-item">
        <div>
          <p className="faq-title">
            Por que não consigo ver meu bônus no checkout?
          </p>
          <p className="faq-text">
            Clique em “Ver mais” para ver os possíveis motivos.
          </p>
        </div>
        <button>Ver mais</button>
      </div>
    </div>
  </div>

  {/* Pagamento */}
  <div className="card">
    <div className="card-header">
      <h2>Pagamento</h2>
    </div>
    <div className="payment-item">
      <div>
        <p className="payment-title">Mastercard</p>
        <p className="payment-subtitle">**** 5388</p>
      </div>
      <button>Transação de cartão</button>
    </div>
  </div>
</div>


);
}

export default PagamentoPage;