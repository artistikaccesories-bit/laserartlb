
import React, { useState } from 'react';
import { generateDesignIdea } from '../services/gemini';
import { DesignConcept } from '../types';

const AICustomizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<DesignConcept | null>(null);
  const [error, setError] = useState('');

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    try {
      const result = await generateDesignIdea(prompt);
      setConcept(result);
    } catch (err) {
      setError('Unable to reach studio. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center py-24 px-4 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
            <svg className="w-3 h-3 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM15.657 14.243a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z" /></svg>
            Design Intelligence Studio
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 font-heading silver-gradient tracking-tight leading-tight">CRAFT YOUR <br />LEGACY.</h2>
          <p className="text-zinc-500 text-sm md:text-lg max-w-lg mx-auto leading-relaxed">Describe your vision or the person you're gifting to. Our AI will conceptualize a premium steel engraving for you.</p>
        </div>

        <form onSubmit={handleConsult} className="relative mb-20">
          <div className="glass rounded-[2rem] p-3 flex flex-col md:flex-row gap-3 border-white/10 group focus-within:border-white/30 transition-all duration-500">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A graduation gift..."
              className="flex-grow bg-transparent px-6 md:px-8 py-4 md:py-5 outline-none text-white placeholder:text-zinc-700 text-base md:text-lg font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black font-black uppercase tracking-widest text-[10px] md:text-xs px-10 md:px-12 py-4 md:py-5 rounded-2xl hover:bg-zinc-200 transition-all disabled:opacity-50 min-w-[150px] md:min-w-[200px] flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : 'Generate Vision'}
            </button>
          </div>
          {error && <p className="text-zinc-400 mt-6 text-center text-sm font-bold tracking-widest">{error}</p>}
        </form>

        {concept && (
          <div className="glass rounded-[2.5rem] p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <span className="text-zinc-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Design Blueprint</span>
                <h4 className="text-2xl md:text-4xl font-black mb-6 md:mb-8 font-heading">{concept.conceptName}</h4>

                <div className="space-y-10">
                  <div>
                    <label className="text-zinc-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest block mb-2">Engraving Text</label>
                    <p className="text-lg md:text-2xl text-white font-heading italic tracking-tight">"{concept.engravingText}"</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Recommended Material</label>
                      <p className="text-white font-bold">{concept.materialSuggestion}</p>
                    </div>
                    <div>
                      <label className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Typography</label>
                      <p className="text-white font-bold">{concept.recommendedFont}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-white/5 border border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_100%)]"></div>
                  <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 silver-glow">
                    <svg className="w-8 h-8 text-white opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  </div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Engraving Mockup</p>
                  <p className="font-heading text-xl text-zinc-300">[{concept.engravingText}]</p>
                </div>

                <a
                  href={`https://wa.me/96181388115?text=I'm interested in the "${concept.conceptName}" design: ${concept.engravingText}`}
                  target="_blank"
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-200 transition-all text-center flex items-center justify-center gap-2 group/cta"
                >
                  Order This Concept
                  <svg className="w-4 h-4 transform group-hover/cta:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" /></svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICustomizer;
