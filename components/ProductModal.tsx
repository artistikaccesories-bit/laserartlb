
import React, { useState, useEffect } from 'react';
import { Product } from '../types.ts';

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product, frontText: string, backText: string | undefined, isDoubleSided: boolean, isGiftBox: boolean) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    const [isDoubleSided, setIsDoubleSided] = useState(false);
    const [isGiftBox, setIsGiftBox] = useState(false);
    const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');
    const [stock, setStock] = useState(0);
    const [isAnimatingStock, setIsAnimatingStock] = useState(false);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const displayImages = product.images && product.images.length > 0 ? product.images : [product.image];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setCurrentImageIndex(0);

            // Stock Logic
            const storageKey = `stock_${product.id}`;
            const storedStock = localStorage.getItem(storageKey);
            let currentStock = storedStock ? parseInt(storedStock, 10) : 9;

            // Chance to decrement
            const shouldDecrement = Math.random() > 0.6; // 40% chance to decrement
            if (shouldDecrement && currentStock > 2) {
                const newStock = currentStock - 1;
                // Delay setting the new stock slightly to allow the modal to open first, preserving the "old" number briefly for effect
                // But since we want to show the transition, we set initial state to old, then update.
                setStock(currentStock);

                setTimeout(() => {
                    setIsAnimatingStock(true);
                    setStock(newStock);
                    localStorage.setItem(storageKey, newStock.toString());
                    setTimeout(() => setIsAnimatingStock(false), 500); // Reset animation state
                }, 500); // Wait 500ms after open to drop the number
            } else {
                setStock(currentStock);
                // If it was undefined (first visit), save the default 9
                if (!storedStock) {
                    localStorage.setItem(storageKey, '9');
                }
            }

        } else {
            document.body.style.overflow = 'unset';
            // Reset state on close
            setTimeout(() => {
                setFrontText('');
                setBackText('');
                setIsDoubleSided(false);
                setIsGiftBox(false);
                setObjectFit('cover');
                setCurrentImageIndex(0);
                setIsAnimatingStock(false);
            }, 300);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, product]);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Min swipe distance required (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }
        if (isRightSwipe) {
            setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
        }
    };

    if (!isOpen) return null;

    const handleSubmit = () => {
        onAddToCart(product, frontText, isDoubleSided ? backText : undefined, isDoubleSided, isGiftBox);
        onClose();
    };

    const totalPrice = product.price + (isDoubleSided ? 5 : 0) + (isGiftBox ? 2 : 0);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-auto animate-in fade-in zoom-in-95 duration-300">

                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white md:hidden"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Image Section */}
                <div
                    className="w-full md:w-1/2 h-64 md:h-auto md:aspect-auto relative bg-zinc-900 flex items-center justify-center overflow-hidden group/image flex-shrink-0 touch-pan-y"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <img
                        src={displayImages[currentImageIndex]}
                        alt={product.name}
                        loading="eager"
                        // @ts-ignore
                        fetchPriority="high"
                        className={`w-full h-full transition-all duration-500 ${objectFit === 'contain' ? 'object-contain p-4' : 'object-cover'}`}
                    />

                    {/* Navigation Arrows */}
                    {displayImages.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors z-20 opacity-0 group-hover/image:opacity-100"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors z-20 opacity-0 group-hover/image:opacity-100"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {displayImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Zoom Toggle Controls */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/image:opacity-100 transition-opacity z-10">
                        <button
                            onClick={(e) => { e.stopPropagation(); setObjectFit('contain'); }}
                            className={`p-2 rounded-full backdrop-blur-md border border-white/10 ${objectFit === 'contain' ? 'bg-white text-black' : 'bg-black/50 text-white'}`}
                            title="Fit Image"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setObjectFit('cover'); }}
                            className={`p-2 rounded-full backdrop-blur-md border border-white/10 ${objectFit === 'cover' ? 'bg-white text-black' : 'bg-black/50 text-white'}`}
                            title="Fill Area"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>


                {/* Content Section */}
                <div className="w-full md:w-1/2 flex-1 p-6 md:p-12 flex flex-col overflow-y-auto custom-scrollbar bg-zinc-950/50 min-h-0 relative z-10">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black font-heading silver-gradient mb-1 md:mb-2">{product.name}</h2>
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{product.category} Series</p>
                                {product.originalPrice && (
                                    <span className="text-xs text-black font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded">Sale</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase tracking-widest">
                                    Only <span className={`inline-block transition-transform duration-500 ${isAnimatingStock ? 'scale-150 text-red-400' : 'scale-100 text-orange-500'}`}>{stock}</span> left 🔥
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 mt-4">
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                                    5 people have this in their cart
                                </p>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    12 people viewed this in the last hour
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors">
                            <svg className="w-6 h-6 text-zinc-500 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="space-y-8 flex-grow">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 md:mb-3">Description</h3>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                Customization
                            </h3>

                            {/* Front Side */}
                            <div>
                                <label className="text-[10px] uppercase font-bold text-zinc-500 mb-2 block">Front Side Engraving</label>
                                <input
                                    type="text"
                                    placeholder="Text, Name, Date..."
                                    value={frontText}
                                    onChange={(e) => setFrontText(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors"
                                />
                            </div>

                            {/* Double Sided Toggle */}
                            <div>
                                <label className="flex items-center gap-3 cursor-pointer group/check select-none">
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${isDoubleSided ? 'bg-white border-white' : 'border-zinc-700 group-hover/check:border-zinc-500 bg-black'}`}>
                                        {isDoubleSided && <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isDoubleSided}
                                        onChange={(e) => setIsDoubleSided(e.target.checked)}
                                    />
                                    <div>
                                        <span className={`text-xs font-bold uppercase tracking-wide transition-colors ${isDoubleSided ? 'text-white' : 'text-zinc-500 group-hover/check:text-zinc-400'}`}>Double Sided Engraving</span>
                                        {isDoubleSided && <span className="ml-2 text-[10px] font-black bg-white text-black px-1.5 py-0.5 rounded">+$5</span>}
                                    </div>
                                </label>
                            </div>

                            {/* Gift Box Toggle */}
                            <div>
                                <label className="flex items-center gap-3 cursor-pointer group/check select-none">
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${isGiftBox ? 'bg-white border-white' : 'border-zinc-700 group-hover/check:border-zinc-500 bg-black'}`}>
                                        {isGiftBox && <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isGiftBox}
                                        onChange={(e) => setIsGiftBox(e.target.checked)}
                                    />
                                    <div>
                                        <span className={`text-xs font-bold uppercase tracking-wide transition-colors ${isGiftBox ? 'text-white' : 'text-zinc-500 group-hover/check:text-zinc-400'}`}>Premium Gift Box</span>
                                        {isGiftBox && <span className="ml-2 text-[10px] font-black bg-white text-black px-1.5 py-0.5 rounded">+$2</span>}
                                    </div>
                                </label>
                            </div>

                            {/* Back Side - Conditional */}
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isDoubleSided ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <label className="text-[10px] uppercase font-bold text-zinc-500 mb-2 block">Back Side Engraving</label>
                                <input
                                    type="text"
                                    placeholder="Text for the back..."
                                    value={backText}
                                    onChange={(e) => setBackText(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between gap-6">
                        <div className="flex flex-col">
                            <span className="text-zinc-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Total Price</span>
                            <span className="text-2xl md:text-3xl font-black text-white">${totalPrice}</span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="flex-grow py-4 md:py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 md:gap-3 group/btn silver-glow"
                        >
                            Add to Cart
                            <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
