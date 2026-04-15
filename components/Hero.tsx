import React, { useState, useEffect } from 'react';
import ParticlesBackground from './ParticlesBackground';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 500;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[95vh] flex items-center overflow-hidden bg-deep-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_90%)]"></div>

        {/* Animated Glow Orbs - Modern Monochrome */}
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-float opacity-40"></div>
        <div className="absolute -bottom-40 -left-20 w-[700px] h-[700px] bg-white/5 rounded-full blur-[160px] animate-float opacity-30" style={{ animationDelay: '3s' }}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Animated Customer Counter */}
        <div className="flex items-center gap-4 mb-12 bg-white/5 border border-white/10 p-2 pr-6 rounded-full w-fit mx-auto backdrop-blur-xl animate-slide-up shadow-[0_0_30px_rgba(255,255,255,0.05)]" style={{ animationDelay: '0.1s' }}>
          <div className="flex -space-x-4">
            {[
              'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=150&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=150&auto=format&fit=crop'
            ].map((src, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-deep-black overflow-hidden ring-1 ring-white/20">
                <img src={src} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-left pl-2">
            <span className="block text-white text-sm font-bold tracking-tight"><span className="text-white">{count}+</span> Happy</span>
            <span className="block text-zinc-500 text-[10px] tracking-widest uppercase font-black">LaserArt Owners</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-[7rem] lg:text-[8rem] font-black mb-8 md:mb-12 tracking-tighter leading-[0.85] font-heading animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <span className="block text-zinc-600">CRAFT YOUR</span>
          <span className="premium-gradient">LEGACY.</span>
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed tracking-tight font-medium animate-slide-up flex flex-col gap-2" style={{ animationDelay: '0.3s' }}>
          <span>Premium stainless steel engraving for those who value permanence.</span>
          <span className="text-white/80 font-bold bg-white/5 py-1 px-4 rounded-full w-fit mx-auto border border-white/5 backdrop-blur-sm mt-2">
            Keychains • Accessories • Custom Gifts
          </span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 animate-slide-up pb-32" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={onExplore}
            className="group relative w-full sm:w-auto px-8 py-4 md:px-14 md:py-6 overflow-hidden rounded-full bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] md:text-sm hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 w-full h-full bg-zinc-200 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <span className="relative z-10 transition-colors duration-500">Start Creating</span>
          </button>

          <button
            onClick={() => {
              const element = document.getElementById('gallery-selector');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 md:px-14 md:py-6 rounded-full border border-zinc-800 text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:border-white hover:text-white transition-all duration-500 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10">View Gallery</span>
          </button>
        </div>
      </div>

      {/* Floating Scroll Indicator - Hidden on Mobile */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-pointer" onClick={onExplore}>
        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
