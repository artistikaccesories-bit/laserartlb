import React, { useState } from 'react';

const SHAPES = [
    { id: 'rectangle', name: 'Rectangle', svg: <rect x="15" y="25" width="70" height="50" rx="4" /> },
    { id: 'circle', name: 'Circle', svg: <circle cx="50" cy="50" r="35" /> },
    { id: 'heart', name: 'Heart', svg: <path d="M 50,35 a 15,15 0 0 1 30,0 c 0,20 -30,40 -30,40 c 0,0 -30,-20 -30,-40 a 15,15 0 0 1 30,0 z" /> },
    { id: 'bone', name: 'Bone', svg: <path d="M30,35 C20,25 10,40 20,50 C10,60 20,75 30,65 L70,65 C80,75 90,60 80,50 C90,40 80,25 70,35 Z" /> },
];

const FONTS = [
    { id: 'outfit', name: 'Modern', family: "'Outfit', sans-serif" },
    { id: 'dancing', name: 'Script', family: "'Dancing Script', cursive" },
    { id: 'cinzel', name: 'Classic', family: "'Cinzel', serif" },
    { id: 'comic', name: 'Casual', family: "'Comic Neue', cursive" },
    { id: 'elite', name: 'Typewriter', family: "'Special Elite', system-ui" },
];

interface CustomPreviewProps {
    deliveryCosts?: { standard: number; express: number };
}

const CustomPreview: React.FC<CustomPreviewProps> = ({ deliveryCosts }) => {
    const [previewText, setPreviewText] = useState('YOUR NAME');
    const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
    const [selectedFont, setSelectedFont] = useState(FONTS[0]);
    const [addGiftBox, setAddGiftBox] = useState(false);
    const [deliveryType, setDeliveryType] = useState<'pickup' | 'standard' | 'express'>('standard');

    const costs = deliveryCosts || { standard: 4, express: 6 };
    const basePrice = 10;
    const giftBoxPrice = 2;
    const deliveryCost = deliveryType === 'express' ? costs.express : deliveryType === 'standard' ? costs.standard : 0;
    const totalPrice = basePrice + (addGiftBox ? giftBoxPrice : 0) + deliveryCost;

    const handleOrder = () => {
        const deliveryInfo = deliveryType === 'express' ? `Express (48h) - $${costs.express}` : deliveryType === 'standard' ? `Standard - $${costs.standard}` : 'Pickup - $0';
        const message = `Hi LaserArtLB! I want a custom keychain:\n\n*Text:* ${previewText || 'YOUR NAME'}\n*Shape:* ${selectedShape.name}\n*Font:* ${selectedFont.name}\n*Gift Box:* ${addGiftBox ? 'Yes (+$2)' : 'No'}\n*Delivery:* ${deliveryInfo}\n*Total:* $${totalPrice}\n\n*Customer Request:* I'm ready to order my custom design.`;
        const whatsappUrl = `https://wa.me/96181388115?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="py-24 px-4 relative bg-black border-t border-white/5 overflow-hidden">
            {/* Dynamic Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">

                {/* Configuration Panel */}
                <div className="flex-1 w-full text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        Live Preview Studio
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-6 uppercase tracking-tighter leading-none">
                        Design Your <br className="hidden md:block" />
                        <span className="text-zinc-500">Masterpiece.</span>
                    </h2>

                    <div className="flex flex-col gap-6 max-w-md mx-auto md:mx-0">
                        {/* Text Input */}
                        <div>
                            <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Engraving Text</label>
                            <input
                                type="text"
                                maxLength={20}
                                value={previewText}
                                onChange={(e) => setPreviewText(e.target.value)}
                                placeholder="ENTER TEXT HERE"
                                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 transition-all font-heading tracking-widest"
                            />
                        </div>

                        {/* Shape Selection */}
                        <div>
                            <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Choose Shape</label>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {SHAPES.map(shape => (
                                    <button
                                        key={shape.id}
                                        onClick={() => setSelectedShape(shape)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${selectedShape.id === shape.id ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/30'}`}
                                    >
                                        {shape.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Font Selection */}
                        <div>
                            <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Choose Font</label>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {FONTS.map(font => (
                                    <button
                                        key={font.id}
                                        onClick={() => setSelectedFont(font)}
                                        style={{ fontFamily: font.family }}
                                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${selectedFont.id === font.id ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/30'}`}
                                    >
                                        {font.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Upgrades */}
                        <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/5 p-4 rounded-xl cursor-pointer hover:border-white/20 transition-all" onClick={() => setAddGiftBox(!addGiftBox)}>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${addGiftBox ? 'bg-white border-white text-black' : 'border-white/30'}`}>
                                {addGiftBox && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-sm font-bold">Premium Gift Box</p>
                                <p className="text-zinc-500 text-xs">Aesthetic unboxing experience (+${giftBoxPrice})</p>
                            </div>
                        </div>

                        {/* Delivery */}
                        <div>
                            <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Delivery Method</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setDeliveryType('pickup')}
                                    className={`flex-1 min-w-[30%] py-3 px-2 border rounded-xl transition-all text-[10px] md:text-xs font-bold uppercase tracking-wider ${deliveryType === 'pickup' ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                                >
                                    Pickup
                                    <span className="block text-[9px] opacity-70 mt-1">$0</span>
                                </button>
                                <button
                                    onClick={() => setDeliveryType('standard')}
                                    className={`flex-1 min-w-[30%] py-3 px-2 border rounded-xl transition-all text-[10px] md:text-xs font-bold uppercase tracking-wider ${deliveryType === 'standard' ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                                >
                                    Standard
                                    <span className="block text-[9px] opacity-70 mt-1">${costs.standard}</span>
                                </button>
                                <button
                                    onClick={() => setDeliveryType('express')}
                                    className={`flex-1 min-w-[30%] py-3 px-2 border rounded-xl transition-all text-[10px] md:text-xs font-bold uppercase tracking-wider ${deliveryType === 'express' ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                                >
                                    Express
                                    <span className="block text-[9px] opacity-70 mt-1">${costs.express}</span>
                                </button>
                            </div>
                        </div>

                        {/* Order Button */}
                        <button
                            onClick={handleOrder}
                            className="w-full mt-2 bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            <span>Order Now</span>
                            <span className="w-1 h-1 rounded-full bg-black/30"></span>
                            <span>${totalPrice}</span>
                        </button>
                    </div>
                </div>

                {/* Preview Display */}
                <div className="flex-1 w-full flex justify-center lg:justify-end mt-10 md:mt-0">
                    <div className="relative w-full max-w-[400px] aspect-square bg-zinc-900/50 rounded-full flex items-center justify-center p-8 border border-white/5 shadow-[0_0_50px_rgba(255,255,255,0.02)] group transition-all duration-700 hover:border-white/10">
                        {/* The animated steel background */}
                        <div className="relative w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl">

                            <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] drop-shadow-2xl overflow-visible">
                                <defs>
                                    <linearGradient id="steel" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#e4e4e7" />
                                        <stop offset="30%" stopColor="#a1a1aa" />
                                        <stop offset="50%" stopColor="#f4f4f5" />
                                        <stop offset="70%" stopColor="#71717a" />
                                        <stop offset="100%" stopColor="#d4d4d8" />
                                    </linearGradient>

                                    <filter id="shadow">
                                        <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.5" />
                                    </filter>
                                </defs>

                                <g fill="url(#steel)" filter="url(#shadow)" stroke="#d4d4d8" strokeWidth="0.5">
                                    {selectedShape.svg}
                                    {/* Hole for keychain ring */}
                                    {selectedShape.id === 'rectangle' && <circle cx="25" cy="50" r="3.5" fill="#18181b" stroke="none" />}
                                    {selectedShape.id === 'circle' && <circle cx="50" cy="25" r="3.5" fill="#18181b" stroke="none" />}
                                    {selectedShape.id === 'heart' && <circle cx="50" cy="27" r="3.5" fill="#18181b" stroke="none" />}
                                    {selectedShape.id === 'bone' && <circle cx="20" cy="50" r="3.5" fill="#18181b" stroke="none" />}
                                </g>

                                {/* Render Text inside SVG for perfect centering */}
                                <text
                                    x="50%"
                                    y="50%"
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    fill="#27272a"
                                    style={{
                                        fontFamily: selectedFont.family,
                                        fontSize: previewText.length > 10 ? '8px' : '12px',
                                        fontWeight: 'bold',
                                        textShadow: '0.5px 0.5px 0px rgba(255,255,255,0.4)',
                                    }}
                                >
                                    {previewText || 'YOUR NAME'}
                                </text>
                            </svg>

                            {/* Silver reflection sweep overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1500ms] pointer-events-none rounded-full overflow-hidden"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomPreview;
