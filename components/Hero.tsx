
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
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-deep-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_80%)]"></div>

        {/* Animated Glow Orbs - Monochrome */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-float opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Customer Counter */}
        <div className="flex items-center gap-4 mb-10 bg-glass-black border border-white/5 p-2 pr-6 rounded-full w-fit mx-auto backdrop-blur-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex -space-x-4">
            {[
              'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=150&auto=format&fit=crop', // Man with glasses
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop', // Business woman
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop', // Man portrait
              'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=150&auto=format&fit=crop'  // Smiling man
            ].map((src, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-deep-black bg-zinc-800 overflow-hidden ring-2 ring-white/10">
                <img src={src} alt={`Customer ${i + 1}`} fetchpriority="high" loading="eager" decoding="async" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-left pl-2">
            <span className="block text-white text-sm font-bold"><span className="text-white">{count}+</span> Happy</span>
            <span className="block text-zinc-500 text-[10px] tracking-wider uppercase">Customers</span>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-[9rem] font-black mb-6 md:mb-8 tracking-tighter leading-[0.9] font-heading text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          CRAFT YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-white to-zinc-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">LEGACY.</span>
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed tracking-tight font-medium animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Premium stainless steel engraving for those who value permanence. <br className="hidden md:block" />
          <span className="text-white font-bold">Keychains • Accessories • Gifts</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={onExplore}
            className="group relative px-8 py-4 md:px-12 md:py-5 overflow-hidden rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Start Creating</span>
          </button>

          <button
            onClick={() => {
              const element = document.getElementById('gallery-selector');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 md:px-12 md:py-5 rounded-full border border-zinc-800 text-zinc-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm hover:border-white hover:text-black hover:bg-white transition-all duration-300"
          >
            View Gallery
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </div>
  );
};

export default Hero;
