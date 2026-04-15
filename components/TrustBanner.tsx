import React from 'react';

const TrustBanner: React.FC = () => {
    return (
        <div className="w-full bg-white text-black py-2 relative overflow-hidden flex items-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="flex animate-marquee whitespace-nowrap min-w-full">
                {[...Array(2)].map((_, arrayIndex) => (
                    <div key={arrayIndex} className="flex items-center justify-around w-full shrink-0">
                        <div className="flex items-center gap-2 px-8 min-w-max">
                            <span className="text-xl">🔒</span>
                            <span className="font-bold text-xs md:text-sm uppercase tracking-widest whitespace-nowrap">100% Secure Checkout</span>
                        </div>
                        <div className="flex items-center gap-2 px-8 min-w-max">
                            <span className="text-xl">✨</span>
                            <span className="font-bold text-xs md:text-sm uppercase tracking-widest whitespace-nowrap">Premium Stainless Steel</span>
                        </div>
                        <div className="flex items-center gap-2 px-8 min-w-max">
                            <span className="text-xl">🚚</span>
                            <span className="font-bold text-xs md:text-sm uppercase tracking-widest whitespace-nowrap">Fast Delivery Across Lebanon</span>
                        </div>
                        <div className="flex items-center gap-2 px-8 min-w-max">
                            <span className="text-xl">💎</span>
                            <span className="font-bold text-xs md:text-sm uppercase tracking-widest whitespace-nowrap">Permanent Laser Engraving</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustBanner;
