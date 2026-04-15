import React from 'react';

const TrustBadges: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-deep-black relative">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {/* Quality */}
                    <div className="glass p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-300 text-center group">
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white text-white group-hover:text-black">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                        </div>
                        <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight mb-3">Premium Quality</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">Crafted from high-grade stainless steel that resists rust, fading, and tarnish forever.</p>
                    </div>

                    {/* Speed */}
                    <div className="glass p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-300 text-center group">
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white text-white group-hover:text-black">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight mb-3">Fast Production</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">Your custom orders are engraved, polished, and shipped to your door within 48 hours.</p>
                    </div>

                    {/* Trust */}
                    <div className="glass p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-300 text-center group">
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white text-white group-hover:text-black">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                        </div>
                        <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight mb-3">Trusted by Lebanese</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">Join hundreds of satisfied customers across Lebanon who have trusted us with their gifts.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
