
import React from 'react';
import { CartItem } from '../types.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  total: number;
  subtotal: number;
  deliveryType: 'pickup' | 'standard' | 'express';
  setDeliveryType: (type: 'pickup' | 'standard' | 'express') => void;
  onCheckout: () => void;
  costs: { standard: number; express: number };
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  total,
  subtotal,
  deliveryType,
  setDeliveryType,
  onCheckout,
  costs
}) => {
  const [promoCode, setPromoCode] = React.useState('');
  const [discountApplied, setDiscountApplied] = React.useState(false);
  const [promoError, setPromoError] = React.useState('');

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'LASER20') {
      setDiscountApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code');
      setDiscountApplied(false);
    }
  };

  const discountAmount = discountApplied ? subtotal * 0.20 : 0;
  const deliveryCost = deliveryType === 'express' ? costs.express : deliveryType === 'standard' ? costs.standard : 0;
  const finalTotal = subtotal - discountAmount + deliveryCost;

  const handleCheckoutWithPromo = () => {
    // Re-construct the checkout message to include discount
    const itemsList = cart.map(item => {
      const extras = [];
      if (item.isDoubleSided) extras.push('Double Sided (+$5)');
      if (item.isGiftBox) extras.push('Gift Box (+$2)');
      if (item.frontText) extras.push(`Front: "${item.frontText}"`);
      if (item.backText) extras.push(`Back: "${item.backText}"`);

      const extraStr = extras.length > 0 ? ` [${extras.join(', ')}]` : '';
      const unitPrice = item.price + (item.isDoubleSided ? 5 : 0) + (item.isGiftBox ? 2 : 0);
      return `• ${item.quantity}x ${item.name}${extraStr} - $${unitPrice * item.quantity}`;
    }).join('\n');

    const deliveryInfo = deliveryType === 'express' ? `🚀 Express (48h) - $${costs.express}` : deliveryType === 'standard' ? `🚚 Standard - $${costs.standard}` : '🏠 Pickup - $0';

    let message = `*LASERARTLB - NEW ORDER*\n\n*Items:*\n${itemsList}\n\n*Delivery:* ${deliveryInfo}`;

    if (discountApplied) {
      message += `\n*Subtotal:* $${subtotal}\n*Discount (LASER20):* -$${discountAmount.toFixed(2)}`;
    }

    message += `\n*Total:* $${finalTotal.toFixed(2)}\n\n*Customer Request:* I've confirmed my order via the website.`;

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { value: finalTotal, currency: 'USD' });
    }

    window.open(`https://wa.me/96181388115?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-zinc-950/90 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
          <h2 className="text-xl font-black font-heading text-white">YOUR CART ({cart.reduce((a, b) => a + b.quantity, 0)})</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6 text-zinc-500 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <svg className="w-16 h-16 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="text-zinc-500 font-bold text-lg">YOUR VAULT IS EMPTY</p>
              <button onClick={onClose} className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-zinc-200 transition-colors">
                Start Creating
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.internalId} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 relative group">
                  <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm text-white pr-2">{item.name}</h3>
                    <p className="font-mono text-sm text-white font-bold">${(item.price + (item.isDoubleSided ? 5 : 0) + (item.isGiftBox ? 2 : 0)) * item.quantity}</p>
                  </div>

                  {/* Customization Details */}
                  <div className="space-y-1 mb-3">
                    {item.isDoubleSided && (
                      <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        Double Sided (+$5)
                      </p>
                    )}
                    {item.isGiftBox && (
                      <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                        Gift Box (+$2)
                      </p>
                    )}
                    {item.frontText && (
                      <p className="text-[10px] text-zinc-500">
                        Front: "<span className="text-zinc-300">{item.frontText}</span>"
                      </p>
                    )}
                    {item.backText && (
                      <p className="text-[10px] text-zinc-500">
                        Back: "<span className="text-zinc-300">{item.backText}</span>"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-black/40 rounded-lg px-2 py-1 border border-white/10">
                      <button onClick={() => updateQuantity(item.internalId, -1)} className="text-zinc-500 hover:text-white transition-colors w-4 text-center">-</button>
                      <span className="text-xs font-mono w-4 text-center text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.internalId, 1)} className="text-zinc-500 hover:text-white transition-colors w-4 text-center">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.internalId)} className="text-[10px] uppercase font-bold text-zinc-600 hover:text-white transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6 bg-black/40">
          <div className="space-y-3 mb-6">

            {/* Promo Code Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white flex-grow focus:outline-none focus:border-white/30 uppercase placeholder:text-zinc-700 transition-colors"
              />
              <button
                onClick={handleApplyPromo}
                disabled={!promoCode || discountApplied}
                className="px-4 py-2 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {discountApplied ? 'APPLIED' : 'APPLY'}
              </button>
            </div>
            {promoError && <p className="text-zinc-400 text-xs mb-2">{promoError}</p>}
            {discountApplied && <p className="text-white text-xs mb-2">Discount Applied: 20% OFF</p>}


            <div className="flex justify-between text-xs text-zinc-500 uppercase font-bold tracking-wider">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discountApplied && (
              <div className="flex justify-between text-xs text-white uppercase font-bold tracking-wider">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider block mb-2">Delivery Method</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`text-[10px] py-2 px-1 border rounded transition-all ${deliveryType === 'pickup' ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                >
                  Pickup
                  <span className="block opacity-60">Free</span>
                </button>
                <button
                  onClick={() => setDeliveryType('standard')}
                  className={`text-[10px] py-2 px-1 border rounded transition-all ${deliveryType === 'standard' ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                >
                  Standard
                  <span className="block opacity-60">${costs.standard}</span>
                </button>
                <button
                  onClick={() => setDeliveryType('express')}
                  className={`text-[10px] py-2 px-1 border rounded transition-all ${deliveryType === 'express' ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                >
                  Express
                  <span className="block opacity-60">${costs.express}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-between text-lg font-black font-heading text-white pt-4 border-t border-white/10">
              <span>Total</span>
              <span className="text-white">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckoutWithPromo}
            disabled={cart.length === 0}
            className="group relative w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-sm rounded-xl overflow-hidden hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 transition-colors duration-300 flex items-center justify-center gap-2">
              Secure Checkout
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default CartDrawer;
