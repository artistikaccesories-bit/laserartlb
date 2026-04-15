import React, { useState, useEffect } from 'react';

interface ExitIntentPopupProps {
    cartItemsCount: number;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ cartItemsCount }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [historyPushed, setHistoryPushed] = useState(false);

    // Push a dummy history state so the first "Back" button press gets caught
    useEffect(() => {
        if (cartItemsCount > 0 && !hasTriggered && !historyPushed) {
            window.history.pushState({ exitIntentHook: true }, '');
            setHistoryPushed(true);
        }
    }, [cartItemsCount, hasTriggered, historyPushed]);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleMouseLeave = (e: MouseEvent) => {
            // Check if mouse leaves through the top of the viewport (Desktop)
            if (e.clientY <= 0 && cartItemsCount > 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        const handleScroll = () => {
            // Detect fast upward scroll on mobile
            const currentScrollY = window.scrollY;
            if (lastScrollY - currentScrollY > 50 && cartItemsCount > 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
            lastScrollY = currentScrollY;
        };

        const handleVisibilityChange = () => {
            // Detect switching tabs or minimizing the browser (Mobile/Desktop)
            if (document.hidden && cartItemsCount > 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        const handlePopState = () => {
            // Detect mobile "Back" button press
            if (cartItemsCount > 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        // Add event listeners
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [cartItemsCount, hasTriggered]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-md w-full p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">

                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-3xl font-black font-heading tracking-tighter uppercase mb-2">Wait!</h3>
                <h4 className="text-xl font-bold text-zinc-400 mb-6">Don't leave your masterpiece behind.</h4>

                <p className="text-zinc-300 text-sm mb-8 leading-relaxed">
                    You have <span className="font-bold text-white">{cartItemsCount}</span> item(s) waiting in your cart. Complete your order now and enjoy <strong>10% OFF</strong> your entire purchase.
                </p>

                <div className="bg-zinc-900 border border-white/20 rounded-xl p-4 mb-8">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Use Promo Code</p>
                    <p className="text-2xl font-black font-mono tracking-widest text-white">COMEBACK10</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            // Copy code or just close and let them use it
                            navigator.clipboard.writeText("COMEBACK10");
                            setIsVisible(false);
                            alert("Promo code COMEBACK10 copied to clipboard!");
                        }}
                        className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98]"
                    >
                        Claim 10% Off
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-zinc-500 text-xs font-bold uppercase tracking-widest py-2 hover:text-white transition-colors"
                    >
                        No thanks, I'll pay full price
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExitIntentPopup;
