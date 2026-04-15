
import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'keychains' | 'customize') => void;
  onServicesClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onServicesClick }) => {
  return (
    <footer className="bg-black py-24 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        <div className="text-center md:text-left">
          <span className="text-xl font-black tracking-widest font-heading silver-gradient mb-6 block">LASERARTLB</span>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed font-medium">
            Lebanon's premier studio for precision stainless steel laser engraving and bespoke silhouette cutting.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-600">
              <li><button onClick={() => onNavigate('keychains')} className="hover:text-white transition-colors">Keychains</button></li>
              <li><button onClick={onServicesClick} className="hover:text-white transition-colors">Services</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-600">
              <li><a href="https://instagram.com/laserart.lb" target="_blank" className="hover:text-white transition-colors">Instagram: laserart.lb</a></li>
              <li><a href="https://wa.me/96181388115" target="_blank" className="hover:text-white transition-colors">WhatsApp: +961 81 388 115</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center md:text-right">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold mb-6">Studio Hours</h4>
          <p className="text-sm font-medium text-zinc-600">Mon — Fri: 09:00 — 18:00</p>
          <p className="text-sm font-medium text-zinc-600">Sat: 10:00 — 14:00</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.2em] text-zinc-700 gap-6">
        <p>© 2024 LASERARTLB • LEBANON</p>
        <div className="flex gap-12">
          <a href="https://instagram.com/laserart.lb" target="_blank" className="hover:text-white transition-colors cursor-pointer">INSTAGRAM</a>
          <a href="https://wa.me/96181388115" target="_blank" className="hover:text-white transition-colors cursor-pointer">WHATSAPP</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
