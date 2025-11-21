import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CompraDeProdutos() {
	const location = useLocation();
	const navigate = useNavigate();
	const product = location.state || null;
	const [qty, setQty] = useState(1);
	const [loading, setLoading] = useState(false);

	// NEW: checkout modal / address / cards state
	const [showCheckout, setShowCheckout] = useState(false);
	const [processingPayment, setProcessingPayment] = useState(false);
	const [address, setAddress] = useState({
		street: '',
		number: '',
		city: '',
		state: '',
		zip: ''
	});
	const [addressErrors, setAddressErrors] = useState({});

	// CHANGED: make cards state editable and initialize selection safely
	const initialCards = [
		{ id: 'c1', label: 'Cartão virtual de crédito XXX-029-XXX', type: 'Crédito' },
		{ id: 'c2', label: 'Cartão débito XXX-512-XXX', type: 'Débito' }
	];
	const [savedCards, setSavedCards] = useState(initialCards);
	const [selectedCardId, setSelectedCardId] = useState(initialCards[0]?.id || null);

	// NEW: small flow to add a card (for testing/demo)
	const [showAddCard, setShowAddCard] = useState(false);
	const [newCardLabel, setNewCardLabel] = useState('');
	const [newCardType, setNewCardType] = useState('Crédito');

	useEffect(() => {
		if (savedCards.length > 0 && !savedCards.find(c => c.id === selectedCardId)) {
			setSelectedCardId(savedCards[0].id);
		}
	}, [savedCards, selectedCardId]);

	// block body scroll while modal open and close modal with Esc
	useEffect(() => {
		if (!showCheckout) {
			document.body.style.overflow = '';
			return;
		}
		document.body.style.overflow = 'hidden';
		const onKey = (e) => {
			if (e.key === 'Escape') closeCheckout();
		};
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [showCheckout, processingPayment]);

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

	// CHANGE: abrir modal de checkout em vez de comprar direto
	const handleConfirm = () => {
		// ensure a card is selected when opening
		if (!selectedCardId && savedCards.length > 0) setSelectedCardId(savedCards[0].id);
		setShowCheckout(true);
	};

	const handleAgentPurchase = () => {
		navigate('/agente', { state: { product, qty } });
	};

	// NEW: validação simples do endereço
	function validateAddress(addr) {
		const errs = {};
		if (!addr.street) errs.street = 'Rua é obrigatória';
		if (!addr.number) errs.number = 'Número é obrigatório';
		if (!addr.city) errs.city = 'Cidade é obrigatória';
		if (!addr.state) errs.state = 'Estado é obrigatório';
		if (!addr.zip) errs.zip = 'CEP é obrigatório';
		return errs;
	}

	// NEW: adicionar cartão rápido (demo)
	const addCard = () => {
		const label = newCardLabel.trim();
		if (!label) return;
		const id = `c${Date.now()}`;
		const card = { id, label, type: newCardType };
		setSavedCards(prev => [...prev, card]);
		setSelectedCardId(id);
		setNewCardLabel('');
		setNewCardType('Crédito');
		setShowAddCard(false);
	};

	// NEW: confirmar pagamento simulado (exige seleção de cartão)
	const confirmPayment = () => {
		const errs = validateAddress(address);
		setAddressErrors(errs);
		if (Object.keys(errs).length > 0) return;

		if (!selectedCardId) {
			// mínimo feedback quando não há cartão selecionado
			alert('Selecione um cartão para efetuar o pagamento.');
			return;
		}

		setProcessingPayment(true);
		// Simula processamento e finaliza compra
		setTimeout(() => {
			setProcessingPayment(false);
			setShowCheckout(false);
			// opcional: guardar endereço / pedido...
			navigate('/produtos');
		}, 1200);
	};

	const closeCheckout = () => {
		if (processingPayment) return;
		setShowCheckout(false);
		setAddressErrors({});
		setShowAddCard(false);
	};

	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffffff' }}>
			<div style={{ padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1300, margin: '0 auto', width: '100%' }}>
				<button onClick={() => navigate('/produtos')} className="botao secundario">← Voltar</button>
				<div style={{ fontWeight: 700, color: '#000000c0' }}>Finalizar Compra</div>
				<div />
			</div>

			<main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 24 }}>
				<div style={{ width: '100%', maxWidth: 1300, display: 'flex', gap: 28 }}>
					{/* Conteúdo principal */}
					<section style={{ flex: 1, background: '#000000ff', borderRadius: 12, padding: 20, boxShadow: '0 6px 20px rgba(16,24,40,0.06)' }}>
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
									<button
										onClick={handleConfirm}
										className="botao principal"
										style={{ background: '#ffffff', color: '#111' }}
										disabled={loading}
									>
										{loading ? 'Processando...' : `Comprar (${qty})`}
									</button>

									<button onClick={handleAgentPurchase} className="botao principal" style={{ background: '#0a74ffa4' }}>
										Comprar com Agente
									</button>

									<button onClick={() => navigate('/produtos')} className="botao secundario">
										Cancelar / Voltar
									</button>
								</div>

								<div style={{ marginTop: 18, color: '#ffffffc0' }}>
									<div style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Descrição do Produto</div>
									<p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{product.description || 'Sem descrição disponível.'}</p>
								</div>
							</div>
						</div>
					</section>

					{/* Painel de Taxas e Entrega */}
					<aside style={{ width: 340, alignSelf: 'flex-start' }}>
						<div style={{ 
							position: 'sticky', 
							top: 24, 
							background: '#fff', 
							padding: 18, 
							borderRadius: 12, 
							border: '1px solid #000000ff', 
							boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
							color: '#000' /* <-- FORÇA fonte preta na caixa */
						}}>
							<h3 style={{ marginTop: 0 }}>Taxas e Entrega</h3>

							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
								<div>Subtotal ({qty}×)</div>
								<div>R$ {(unitPrice * qty).toFixed(2)}</div>
							</div>

							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
								<div>Taxa de envio</div>
								<div>R$ {shippingFee.toFixed(2)}</div>
							</div>

							<div style={{ borderTop: '1px dashed #ffffffff', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
								<div>Total</div>
								<div>R$ {total.toFixed(2)}</div>
							</div>

							<div style={{ marginTop: 12, fontSize: 13, color: '#000' /* <-- alterado para preto */ }}>
								<p style={{ margin: 0 }}>
									Entrega estimada: 3–7 dias úteis para produtos nacionais.
								</p>
								<p style={{ marginTop: 8 }}>
									Tarifas adicionais podem se aplicar para regiões remotas. O agente pode oferecer frete reduzido sob solicitação e negociação a parte.
								</p>
							</div>
						</div>
					</aside>
				</div>
			</main>

			{/* NEW: Checkout modal / slide-up */}
			{showCheckout && (
				<div
					// wrapper captures clicks on backdrop
					onClick={closeCheckout}
					style={{
						position: 'fixed', inset: 0, display: 'flex', alignItems: 'flex-end',
						justifyContent: 'center', zIndex: 2000
					}}
					role="dialog"
					aria-modal="true"
				>
					{/* backdrop (visual) */}
					<div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
					{/* modal content - stopPropagation to avoid accidental backdrop close */}
					<div
						onClick={(e) => e.stopPropagation()}
						style={{
							width: '100%', maxWidth: 760, background: '#000000ff', borderTopLeftRadius: 12, borderTopRightRadius: 12,
							padding: 18, boxShadow: '0 -8px 30px rgba(0, 0, 0, 1)', margin: '0 12px 12px', position: 'relative'
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
							<strong>Finalizar compra — Endereço e Pagamento</strong>
							<button onClick={closeCheckout} className="botao secundario" style={{ padding: '6px 10px' }}>Fechar</button>
						</div>

						<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
							{/* Address form */}
							<div style={{ flex: 1, minWidth: 280 }}>
								<div style={{ fontWeight: 700, marginBottom: 8 }}>Endereço de entrega</div>
								<div style={{ display: 'grid', gap: 8 }}>
									<input placeholder="Rua" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} style={{ padding: 8 }} />
									{addressErrors.street && <div style={{ color: 'red', fontSize: 12 }}>{addressErrors.street}</div>}

									<input placeholder="Número" value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} style={{ padding: 8 }} />
									{addressErrors.number && <div style={{ color: 'red', fontSize: 12 }}>{addressErrors.number}</div>}

									<input placeholder="Cidade" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} style={{ padding: 8 }} />
									{addressErrors.city && <div style={{ color: 'red', fontSize: 12 }}>{addressErrors.city}</div>}

									<div style={{ display: 'flex', gap: 8 }}>
										<input placeholder="Estado" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} style={{ padding: 8, flex: 1 }} />
										<input placeholder="CEP" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} style={{ padding: 8, width: 120 }} />
									</div>
									{addressErrors.state && <div style={{ color: 'red', fontSize: 12 }}>{addressErrors.state}</div>}
									{addressErrors.zip && <div style={{ color: 'red', fontSize: 12 }}>{addressErrors.zip}</div>}
								</div>
							</div>

							{/* Saved cards */}
							<div style={{ width: 320, minWidth: 280 }}>
								<div style={{ fontWeight: 700, marginBottom: 8 }}>Cartões salvos</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
									{savedCards.map(card => (
										<label key={card.id} style={{
											display: 'flex', alignItems: 'center', justifyContent: 'space-between',
											padding: 10, borderRadius: 8, border: selectedCardId === card.id ? '2px solid #0a74ff' : '1px solid #ffffffff'
										}}>
											<div>
												<div style={{ fontWeight: 600 }}>{card.label}</div>
												<div style={{ fontSize: 12, color: '#ffffffff' }}>{card.type}</div>
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

								{/* Add card quick flow */}
								{!showAddCard ? (
									<div style={{ marginTop: 8 }}>
										<button onClick={() => setShowAddCard(true)} className="botao secundario" style={{ width: '100%' }}>Adicionar cartão</button>
									</div>
								) : (
									<div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
										<input placeholder="Descrição do cartão (ex: crédito virtual)" value={newCardLabel} onChange={(e) => setNewCardLabel(e.target.value)} style={{ padding: 8 }} />
										<select value={newCardType} onChange={(e) => setNewCardType(e.target.value)} style={{ padding: 8 }}>
											<option>Crédito</option>
											<option>Débito</option>
										</select>
										<div style={{ display: 'flex', gap: 8 }}>
											<button onClick={addCard} className="botao principal" style={{ flex: 1 }}>Salvar cartão</button>
											<button onClick={() => { setShowAddCard(false); setNewCardLabel(''); }} className="botao secundario">Cancelar</button>
										</div>
									</div>
								)}

								<div style={{ marginTop: 12 }}>
									<div style={{ fontSize: 13, color: '#ffffffff' }}>Total a pagar</div>
									<div style={{ fontWeight: 700, fontSize: 18 }}>R$ {total.toFixed(2)}</div>
								</div>

								<div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
									<button
										onClick={confirmPayment}
										className="botao principal"
										/* changed: fundo branco e texto preto */
										style={{ flex: 1, background: '#ffffff', color: '#111' }}
										disabled={processingPayment}
									>
										{processingPayment ? 'Processando pagamento...' : 'Confirmar pagamento'}
									</button>
								</div>
							</div>
						</div>

						<div style={{ marginTop: 12, fontSize: 13, color: '#ffffffff' }}>
							Ao confirmar a cobrança no cartão selecionado será feita e o pedido será finalizado.
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
