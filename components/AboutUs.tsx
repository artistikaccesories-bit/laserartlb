
import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <section className="py-24 px-4 bg-deep-black border-t border-white/5 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none animate-pulse opacity-20"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-8 uppercase tracking-tighter leading-none">
                            About <span className="text-zinc-500">Us</span>
                        </h2>

                        <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
                            <p>
                                At <span className="text-white font-bold">LASERARTLB</span>, we specialize in high-precision <span className="text-white">laser engraving services in Lebanon</span>.
                                We transform premium stainless steel into personalized masterpieces, offering a wide range of custom gifts and accessories.
                            </p>
                            <p>
                                From <span className="text-white">custom car silhouettes</span> of your favorite McLaren or Porsche to <span className="text-white">personalized keychains</span> and pet tags, precise craftsmanship is at our core.
                                Founded in Beirut, we are dedicated to creating durable, elegant, and unique metal art that tells your story.
                            </p>

                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mt-8 backdrop-blur-sm">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4">Our Expertise</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                        <span><span className="text-white font-bold">Custom Laser Engraving</span> — Precision marking on metal.</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                                        <span><span className="text-white font-bold">Car Wall Art</span> — Detailed metal silhouettes of iconic cars.</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                                        <span><span className="text-white font-bold">Personalized Gifts</span> — Unique keychains, tags, and accessories in Lebanon.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-white/10 rounded-[3rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700"></div>
                        <div className="aspect-square rounded-[3rem] overflow-hidden glass border-white/10 relative">
                            <img
                                src="/images/logo.webp"
                                alt="LaserArtLB - Custom Laser Engraving Lebanon"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-105 grayscale hover:grayscale-0"
                            />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -left-6 bg-deep-black/90 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 shadow-2xl">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Est. 2024 • Beirut, Lebanon</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
