
import React from 'react';

interface PortraitSilhouettesProps {
    onBack: () => void;
}

const PortraitSilhouettes: React.FC<PortraitSilhouettesProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-deep-black text-white pt-24 pb-12 px-4 relative flex flex-col items-center justify-center">

            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-28 left-4 md:left-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                <span className="text-sm font-bold uppercase tracking-widest">Back</span>
            </button>

            <div className="max-w-2xl text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                    <svg className="w-10 h-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>

                <h1 className="text-4xl md:text-6xl font-black font-heading text-white mb-6 uppercase tracking-tighter">
                    Portrait <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-white">Silhouettes</span>
                </h1>

                <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                    We are currently perfecting the process of turning your cherished photos into permanent metal art.
                    <br className="hidden md:block" />
                    This collection will launch soon.
                </p>

                <div className="inline-block px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Coming Soon
                </div>
            </div>
        </div>
    );
};

export default PortraitSilhouettes;
