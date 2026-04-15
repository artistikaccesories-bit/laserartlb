
import React from 'react';

interface CarTeaserProps {
    onExplore: () => void;
}

const CarTeaser: React.FC<CarTeaserProps> = ({ onExplore }) => {
    return (
        <section className="py-24 bg-deep-black relative overflow-hidden border-t border-white/5">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="w-full md:w-1/2 text-left">
                        <span className="text-zinc-500 font-bold tracking-[0.3em] text-xs uppercase mb-4 block animate-pulse">Signature Global Series</span>
                        <h2 className="text-5xl md:text-7xl font-black font-heading text-white mb-6 tracking-tighter leading-none">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">SILHOUETTE</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 drop-shadow-xl">PROJECT</span>
                        </h2>
                        <div className="h-1 w-24 bg-white mb-8 rounded-full"></div>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-md mb-8 font-light">
                            We translate automotive passion into permanent wall art.
                            Laser-cut steel profiles of iconic machines, finished to perfection.
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <span className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Sizes</span>
                                <span className="block text-white font-mono text-xl">50cm - 90cm</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <span className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Starting At</span>
                                <span className="block text-white font-mono text-xl font-bold">$50</span>
                            </div>
                        </div>

                        <button
                            onClick={onExplore}
                            className="group relative px-8 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            <div className="absolute inset-0 bg-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 transition-colors duration-300">Configure Your Car</span>
                        </button>
                    </div>

                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-video bg-zinc-900 rounded-[2rem] border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)]" onClick={onExplore}>
                            {/* Grid overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                            <div className="absolute inset-0 bg-[url('/images/car.jpeg')] bg-cover bg-center opacity-40 transition-all duration-700"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/50 to-transparent"></div>

                            <div className="relative z-10 text-center transform group-hover:scale-105 transition-transform duration-500">
                                <div className="w-20 h-20 mx-auto mb-4 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-colors duration-300">
                                    <svg className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
                                </div>
                                <span className="text-white/50 font-black uppercase tracking-[0.5em] text-sm group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">Start Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarTeaser;
