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
	const [showAgentSelection, setShowAgentSelection] = useState(false);
	const [selectedAgent, setSelectedAgent] = useState(null);
	const [showSuccessToast, setShowSuccessToast] = useState(false);
	const [showCartToast, setShowCartToast] = useState(false);
	const [cartToastMessage, setCartToastMessage] = useState('');
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

	// NEW: Lista de agentes disponíveis
	const availableAgents = [
		{ id: 'ag1', name: 'Carlos Silva', location: 'São Paulo, SP', commission: 5, rating: 4.8, orders: 120 },
		{ id: 'ag2', name: 'Maria Santos', location: 'Rio de Janeiro, RJ', commission: 7, rating: 4.9, orders: 85 },
		{ id: 'ag3', name: 'João Pedro', location: 'Belo Horizonte, MG', commission: 6, rating: 4.7, orders: 95 },
		{ id: 'ag4', name: 'Ana Costa', location: 'Brasília, DF', commission: 8, rating: 5.0, orders: 150 },
		{ id: 'ag5', name: 'Pedro Oliveira', location: 'Curitiba, PR', commission: 5.5, rating: 4.6, orders: 67 }
	];

	useEffect(() => {
		if (savedCards.length > 0 && !savedCards.find(c => c.id === selectedCardId)) {
			setSelectedCardId(savedCards[0].id);
		}
	}, [savedCards, selectedCardId]);

	// block body scroll while modal open and close modal with Esc
	useEffect(() => {
		if (!showCheckout && !showAgentSelection) {
			document.body.style.overflow = '';
			return;
		}
		document.body.style.overflow = 'hidden';
		const onKey = (e) => {
			if (e.key === 'Escape') {
				if (showAgentSelection) closeAgentSelection();
				else if (showCheckout) closeCheckout();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [showCheckout, showAgentSelection, processingPayment]);

	if (!product) {
		return (
			<div style={{ padding: 20 }}>
				<h2>Produto não selecionado</h2>
				<p>Selecione um produto na página de produtos.</p>
				<button onClick={() => navigate('/produtos')} className="botao principal">Ir para Produtos</button>
			</div>
		);
	}

	// CHANGED: usa preço promocional se for uma promoção
	const basePrice = product.isPromo ? product.promoPrice : product.price;
	const unitPrice = Number(String(basePrice).replace(',', '.')) || 0;
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
		setShowAgentSelection(true);
	};

	const closeAgentSelection = () => {
		setShowAgentSelection(false);
		setSelectedAgent(null);
	};

	const confirmAgentPurchase = () => {
		if (!selectedAgent) {
			alert('Selecione um agente para continuar.');
			return;
		}
		// Fecha o modal e mostra notificação de sucesso
		setShowAgentSelection(false);
		setShowSuccessToast(true);
		
		// Esconde a notificação após 4 segundos e redireciona
		setTimeout(() => {
			setShowSuccessToast(false);
			navigate('/produtos');
		}, 4000);
	};

	const calculateAgentTotal = (agent) => {
		const commissionAmount = total * (agent.commission / 100);
		return total + commissionAmount;
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

	const addToCart = () => {
		try {
			console.log('=== INICIANDO ADIÇÃO AO CARRINHO ===');
			
			const cartData = localStorage.getItem('cart');
			console.log('1. Dados atuais do localStorage:', cartData);
			
			const cart = cartData ? JSON.parse(cartData) : [];
			console.log('2. Carrinho parseado:', cart);
			
			const cartItem = {
				id: `${product.id}-${Date.now()}`,
				productId: product.id,
				name: product.name,
				image: product.image,
				price: unitPrice,
				description: product.description,
				quantity: qty,
				isPromo: product.isPromo || false,
				originalPrice: product.originalPrice,
				discount: product.discount
			};
			
			console.log('3. Item a ser adicionado:', cartItem);
			
			cart.push(cartItem);
			console.log('4. Carrinho após push:', cart);
			
			const cartString = JSON.stringify(cart);
			console.log('5. String a ser salva:', cartString);
			
			localStorage.setItem('cart', cartString);
			
			const verificacao = localStorage.getItem('cart');
			console.log('6. Verificação após salvar:', verificacao);
			
			window.dispatchEvent(new Event('storage'));
			window.dispatchEvent(new Event('cart-updated'));
			console.log('7. Eventos disparados');
			
			console.log('=== ADIÇÃO CONCLUÍDA ===');
			
			// Mostra o toast notification
			setCartToastMessage(`${qty} ${qty === 1 ? 'item adicionado' : 'itens adicionados'} ao carrinho!`);
			setShowCartToast(true);
			
			// Esconde após 4 segundos
			setTimeout(() => {
				setShowCartToast(false);
			}, 4000);
		} catch (error) {
			console.error('ERRO ao adicionar ao carrinho:', error);
			setCartToastMessage('Erro ao adicionar item ao carrinho.');
			setShowCartToast(true);
			setTimeout(() => setShowCartToast(false), 4000);
		}
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
								<h2 style={{ marginTop: 0, color: '#fff' }}>{product.name}</h2>
								
								{/* CHANGED: mostra badge e preço original se for promoção */}
								{product.isPromo && (
									<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
										<span style={{
											background: '#fff',
											color: '#000',
											padding: '4px 10px',
											borderRadius: 4,
											fontSize: 13,
											fontWeight: 700
										}}>
											-{product.discount}% OFF
										</span>
										<span style={{ 
											fontSize: 16, 
											color: '#ccc', 
											textDecoration: 'line-through' 
										}}>
											R$ {Number(product.originalPrice).toFixed(2)}
										</span>
									</div>
								)}
								
								<p style={{ fontSize: 20, fontWeight: 700, color: product.isPromo ? '#fff' : '#fff' }}>
									R$ {Number(unitPrice).toFixed(2)}
								</p>

								<div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
									<label style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#fff' }}>
										Quantidade:
										<input
											type="number"
											min="1"
											value={qty}
											onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
											style={{ width: 90, padding: 8, borderRadius: 6, border: '1px solid #ddd', background: '#fff', color: '#000' }}
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

									<button 
										onClick={addToCart}
										className="botao principal" 
										style={{ background: '#1f4588ff', color: '#fff' }}
									>
										🛒 Adicionar ao Carrinho
									</button>

									<button onClick={() => navigate('/produtos')} className="botao secundario">
										Cancelar / Voltar
									</button>

									<button onClick={handleAgentPurchase} className="botao principal" style={{ background: '#0a74ffa4' }}>
										Comprar com Agente
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

			{/* NEW: Agent Selection Modal */}
			{showAgentSelection && (
				<div
					onClick={closeAgentSelection}
					style={{
						position: 'fixed',
						inset: 0,
						background: 'rgba(0,0,0,0.5)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 2001,
						padding: 20
					}}
					role="dialog"
					aria-modal="true"
				>
					<div
						onClick={(e) => e.stopPropagation()}
						style={{
							width: '100%',
							maxWidth: 700,
							maxHeight: '90vh',
							background: '#fff',
							borderRadius: 12,
							padding: 24,
							overflowY: 'auto',
							boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
							<h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#000' }}>Selecione um Agente</h2>
							<button
								onClick={closeAgentSelection}
								style={{
									background: 'transparent',
									border: 'none',
									fontSize: 28,
									cursor: 'pointer',
									padding: 0,
									lineHeight: 1,
									color: '#666'
								}}
							>
								×
							</button>
						</div>

						<div style={{ 
							background: '#f5f5f5', 
							padding: 16, 
							borderRadius: 8, 
							marginBottom: 20,
							border: '1px solid #e0e0e0'
						}}>
							<div style={{ fontSize: 14, color: '#000000ff', marginBottom: 8 }}>Resumo do Pedido</div>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
								<span style={{ fontWeight: 600, color: '#1a0aacff' }}>{product.name}</span>
								<span style={{ color: '#000000ff' }}>R$ {(unitPrice * qty).toFixed(2)}</span>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666' }}>
								<span style={{ color: '#000000ff' }}>Quantidade: {qty}</span>
								<span style={{ color: '#000000ff' }}>Frete: R$ {shippingFee.toFixed(2)}</span>
							</div>
							<div style={{ 
								borderTop: '1px solid #ddd', 
								marginTop: 8, 
								paddingTop: 8,
								display: 'flex',
								justifyContent: 'space-between',
								fontWeight: 700
							}}>
								<span style={{ color: '#000000ff' }}>Subtotal</span>
								<span style={{ color: '#000000ff' }}>R$ {total.toFixed(2)}</span>
							</div>
						</div>

						<div style={{ marginBottom: 16 }}>
							<h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#000000ff' }}>Agentes Disponíveis</h3>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
								{availableAgents.map(agent => {
									const agentTotal = calculateAgentTotal(agent);
									const commissionAmount = agentTotal - total;
									const isSelected = selectedAgent?.id === agent.id;

									return (
										<div
											key={agent.id}
											onClick={() => setSelectedAgent(agent)}
											style={{
												padding: 16,
												border: isSelected ? '2px solid #000' : '1px solid #e0e0e0',
												borderRadius: 8,
												background: isSelected ? '#f5f5f5' : '#fff',
												cursor: 'pointer',
												transition: 'all 0.2s ease',
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center'
											}}
											onMouseEnter={(e) => {
												if (!isSelected) e.currentTarget.style.background = '#fafafa';
											}}
											onMouseLeave={(e) => {
												if (!isSelected) e.currentTarget.style.background = '#fff';
											}}
										>
											<div style={{ flex: 1 }}>
												<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
													<div style={{
														width: 40,
														height: 40,
														borderRadius: '50%',
														background: '#667eea',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														color: '#fff',
														fontWeight: 700,
														fontSize: 16
													}}>
														{agent.name.charAt(0)}
													</div>
													<div>
														<div style={{ fontWeight: 700, fontSize: 15, color: '#000000ff' }}>{agent.name}</div>
														<div style={{ fontSize: 12, color: '#000000ff', display: 'flex', alignItems: 'center', gap: 4 }}>
															📍 {agent.location}
														</div>
													</div>
												</div>
												<div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#666', marginLeft: 48 }}>
													<span>⭐ {agent.rating}</span>
													<span>📦 {agent.orders} pedidos</span>
												</div>
											</div>
											<div style={{ textAlign: 'right' }}>
												<div style={{ 
													fontSize: 13, 
													color: '#fff',
													background: '#000',
													padding: '4px 8px',
													borderRadius: 4,
													marginBottom: 6,
													fontWeight: 600
												}}>
													+{agent.commission}% comissão
												</div>
												<div style={{ fontSize: 11, color: '#000000ff', marginBottom: 2 }}>
													+R$ {commissionAmount.toFixed(2)}
												</div>
												<div style={{ fontWeight: 700, color: '#000000ff', fontSize: 16 }}>
													R$ {agentTotal.toFixed(2)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{selectedAgent && (
							<div style={{
								background: '#f0f9ff',
								border: '1px solid #0ea5e9',
								borderRadius: 8,
								padding: 16,
								marginBottom: 16
							}}>
								<div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#0c4a6e' }}>
									💡 Sobre o agente selecionado
								</div>
								<div style={{ fontSize: 13, color: '#0c4a6e', lineHeight: 1.6 }}>
									<p style={{ margin: '0 0 8px 0' }}>
										<strong>{selectedAgent.name}</strong> intermediará sua compra e receberá uma comissão de <strong>{selectedAgent.commission}%</strong>.
									</p>
									<p style={{ margin: 0 }}>
										O agente entrará em contato para finalizar os detalhes e garantir a melhor experiência de compra.
									</p>
								</div>
							</div>
						)}

						<div style={{ display: 'flex', gap: 12 }}>
							<button
								onClick={confirmAgentPurchase}
								disabled={!selectedAgent}
								style={{
									flex: 1,
									padding: 14,
									background: selectedAgent ? '#000' : '#ddd',
									color: selectedAgent ? '#fff' : '#999',
									border: 'none',
									borderRadius: 8,
									cursor: selectedAgent ? 'pointer' : 'not-allowed',
									fontWeight: 600,
									fontSize: 15,
									transition: 'background 0.2s ease'
								}}
								onMouseEnter={(e) => {
									if (selectedAgent) e.currentTarget.style.background = '#333';
								}}
								onMouseLeave={(e) => {
									if (selectedAgent) e.currentTarget.style.background = '#000';
								}}
							>
								Confirmar com Agente
							</button>
							<button
								onClick={closeAgentSelection}
								style={{
									padding: '14px 24px',
									background: '#fff',
									border: '1px solid #ddd',
									borderRadius: 8,
									cursor: 'pointer',
									fontWeight: 600,
									fontSize: 15
								}}
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}

			{/* NEW: Success Toast Notification */}
			{showSuccessToast && (
				<div					style={{						position: 'fixed',						top: 24,						right: 24,						width: 380,						background: '#000',						color: '#fff',						borderRadius: 8,						padding: '20px 24px',						boxShadow: '0 10px 40px rgba(0,0,0,0.3)',						zIndex: 10000,						display: 'flex',						flexDirection: 'column',						gap: 12,						animation: 'slideIn 0.3s ease-out'					}}				>					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>						<div style={{							width: 48,							height: 48,							borderRadius: '50%',							background: '#fff',							display: 'flex',							alignItems: 'center',							justifyContent: 'center',							fontSize: 24						}}>							✓						</div>						<div style={{ flex: 1 }}>							<div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>								Compra Solicitada com Sucesso!							</div>							<div style={{ fontSize: 13, opacity: 0.9 }}>								{selectedAgent && `${selectedAgent.name} entrará em contato em breve`}							</div>						</div>						<button							onClick={() => setShowSuccessToast(false)}							style={{								background: 'transparent',								border: 'none',								color: '#fff',								fontSize: 24,								cursor: 'pointer',								padding: 0,								lineHeight: 1,								opacity: 0.7							}}							onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}							onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}						>							×						</button>					</div>										{selectedAgent && (						<div style={{							paddingTop: 12,							borderTop: '1px solid #333',							fontSize: 12,							opacity: 0.8,							display: 'flex',							justifyContent: 'space-between'						}}>							<span>Comissão do agente: {selectedAgent.commission}%</span>							<span>📍 {selectedAgent.location}</span>						</div>					)}					<div style={{						position: 'absolute',						bottom: 0,						left: 0,						height: 3,						background: '#fff',						width: '100%',						animation: 'progress 4s linear'					}} />				</div>			)}

			{/* NEW: Cart Toast Notification */}
			{showCartToast && (
				<div
					style={{
						position: 'fixed',
						top: 24,
						right: 24,
						width: 380,
						background: '#000',
						color: '#fff',
						borderRadius: 8,
						padding: '20px 24px',
						boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
						zIndex: 10000,
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						animation: 'slideIn 0.3s ease-out'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<div style={{
							width: 48,
							height: 48,
							borderRadius: '50%',
							background: '#fff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 24
						}}>
							🛒
						</div>
						<div style={{ flex: 1 }}>
							<div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
								Item Adicionado ao Carrinho!
							</div>
							<div style={{ fontSize: 13, opacity: 0.9 }}>
								{cartToastMessage}
							</div>
						</div>
						<button
							onClick={() => setShowCartToast(false)}
							style={{
								background: 'transparent',
								border: 'none',
								color: '#fff',
								fontSize: 24,
								cursor: 'pointer',
								padding: 0,
								lineHeight: 1,
								opacity: 0.7
							}}
							onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
							onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
						>
							×
						</button>
					</div>
					
					<div style={{
						paddingTop: 12,
						borderTop: '1px solid #333',
						display: 'flex',
						gap: 8
					}}>
						<button
							onClick={() => {
								setShowCartToast(false);
								navigate('/carrinho');
							}}
							style={{
								flex: 1,
								padding: '8px 16px',
								background: '#fff',
								color: '#000',
								border: 'none',
								borderRadius: 4,
								cursor: 'pointer',
								fontWeight: 600,
								fontSize: 13,
								transition: 'opacity 0.2s ease'
							}}
							onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
							onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
						>
							Ver Carrinho
						</button>
						<button
							onClick={() => setShowCartToast(false)}
							style={{
								flex: 1,
								padding: '8px 16px',
								background: 'transparent',
								color: '#fff',
								border: '1px solid #fff',
								borderRadius: 4,
								cursor: 'pointer',
								fontWeight: 600,
								fontSize: 13,
								transition: 'opacity 0.2s ease'
							}}
							onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
							onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
						>
							Continuar Comprando
						</button>
					</div>

					<div style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						height: 3,
						background: '#fff',
						width: '100%',
						animation: 'progress 4s linear'
					}} />
				</div>
			)}

			<style>{`				@keyframes slideIn {					from {						transform: translateX(100%);						opacity: 0;					}					to {						transform: translateX(0);						opacity: 1;					}				}								@keyframes progress {					from {						width: 100%;					}					to {						width: 0%;					}				}
			`}</style>
		</div>
	);
}
