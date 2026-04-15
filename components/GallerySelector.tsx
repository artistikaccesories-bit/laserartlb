import React from 'react';

interface GallerySelectorProps {
    onSelectCategory: (category: 'keychains') => void;
}

const GallerySelector: React.FC<GallerySelectorProps> = ({ onSelectCategory }) => {
    const categories = [
        {
            id: 'keychains',
            title: 'Custom Keychains',
            description: 'Precision laser-engraved stainless steel accessories.',
            image: '/images/product2.jpg', // Spotify Keychain
            action: 'View Collection',
            available: true
        }
    ];

    return (
        <section id="gallery-selector" className="py-24 bg-deep-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black font-heading text-white mb-6 tracking-tighter uppercase">
                        Curated <span className="text-zinc-500">Galleries</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Explore our specialized collections. Each piece is crafted with surgical precision.
                    </p>
                </div>

                <div className="flex justify-center relative z-10">
                    <div className="w-full max-w-sm">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => cat.available && onSelectCategory(cat.id as any)}
                            className={`group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 transition-all duration-500 ${cat.available ? 'cursor-pointer hover:border-white/30 hover:scale-[1.02]' : 'opacity-60 cursor-not-allowed'}`}
                        >
                            <div className="absolute inset-0 bg-zinc-900">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/20 to-transparent"></div>
                            </div>

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="mb-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${cat.available ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-700'}`}>
                                        {cat.available ? 'Available' : 'Coming Soon'}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black font-heading text-white mb-2 uppercase italic leading-none">{cat.title}</h3>
                                <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{cat.description}</p>

                                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${cat.available ? 'text-white group-hover:translate-x-2' : 'text-zinc-600'} transition-all duration-300`}>
                                    {cat.action}
                                    {cat.available && (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GallerySelector;
