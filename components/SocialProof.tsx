import React from 'react';

const SocialProof: React.FC = () => {
    // Array of distinct aesthetic product images to serve as Instagram-style proof
    const images = [
        '/images/product2.jpg',
        '/images/qrect.jpeg',
        '/images/p5.jpg.jpg',
        '/images/hamd.jpeg',
        '/images/product7.jpeg',
        '/images/product3.jpg'
    ];

    return (
        <section className="py-24 bg-deep-black border-t border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tighter uppercase leading-none mb-4">
                        Spotted In <br /><span className="text-zinc-500">The Wild.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg font-light max-w-md">
                        Join hundreds of clients carrying a piece of LaserArtLB. Tag us to be featured.
                    </p>
                </div>
                <a
                    href="https://www.instagram.com/laserartlb/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 group text-white font-bold uppercase tracking-widest text-xs border border-white/20 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    <span>@laserartlb</span>
                </a>
            </div>

            {/* Seamless scrolling grid approach or just a nice static grid for CSS simplicity. Let's use a nice responsive grid. */}
            <div className="w-full relative z-10 px-0 md:px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-4">
                    {images.map((src, i) => (
                        <div key={i} className="aspect-square relative overflow-hidden group bg-zinc-900 rounded-none md:rounded-2xl cursor-pointer">
                            <img
                                src={src}
                                alt={`Customer feature ${i}`}
                                loading="lazy"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />
                            {/* Instagram hover overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
                                <svg className="w-8 h-8 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Soft bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
        </section>
    );
};

export default SocialProof;
