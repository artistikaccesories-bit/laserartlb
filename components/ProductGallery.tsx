
import React, { useState, useEffect } from 'react';
import { Product } from '../types.ts';
import ProductModal from './ProductModal.tsx';
import { sendDiscordMessage } from '../src/utils/discord.ts';
// import { PRODUCTS } from '../src/data/products.ts'; // dynamic now

interface ProductGalleryProps {
  products: Product[];
  onAddToCart: (p: Product, frontText: string, backText: string | undefined, isDoubleSided: boolean, isGiftBox: boolean) => void;
  onBack?: () => void;
  selectedProduct?: Product | null;
  onSelectProduct?: (product: Product | null) => void;
}

export const ProductCard: React.FC<{ product: Product, onClick: () => void }> = ({ product, onClick }) => {
  const images = product.images || [product.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div onClick={onClick} className="group cursor-pointer relative">
      <div className="absolute -inset-0.5 bg-white rounded-[2rem] opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
      <div className="relative aspect-square bg-zinc-900/50 backdrop-blur-sm overflow-hidden mb-6 border border-white/5 rounded-[2rem] transition-all duration-500 group-hover:border-white/20">
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent z-10 opacity-60"></div>

        <img
          src={images[currentImageIndex]}
          alt={product.name}
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-in-out"
        />

        <div className="absolute bottom-6 left-6 z-20 w-[calc(100%-3rem)]">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-widest block mb-2">{product.category}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </div>
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute top-4 right-4 z-20 flex gap-1">
            {images.map((_, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/40'}`} />
            ))}
          </div>
        )}

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Quick View
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start px-2">
        <div>
          <h3 className="text-lg md:text-2xl font-black font-heading text-white mb-2 group-hover:text-zinc-300 transition-all duration-300">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.isBestSeller && (
              <span className="text-[9px] text-black font-bold uppercase tracking-wider bg-white px-2 py-1 rounded-sm">Best Seller</span>
            )}
            {product.originalPrice && (
              <span className="text-[9px] text-white font-bold uppercase tracking-wider bg-zinc-800 px-2 py-1 rounded-sm border border-white/20">Sale</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          {product.originalPrice && (
            <span className="text-xs text-zinc-600 line-through mb-0.5">${product.originalPrice}</span>
          )}
          <span className={`font-mono text-xl font-bold ${product.originalPrice ? 'text-white' : 'text-zinc-300 group-hover:text-white transition-colors'}`}>${product.price}</span>
        </div>
      </div>
    </div>
  );
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ products, onAddToCart, onBack, selectedProduct: propSelectedProduct, onSelectProduct }) => {
  const [localSelectedProduct, setLocalSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');

  // Use prop if provided, otherwise fallback to local state (backward compatibility)
  const selectedProduct = propSelectedProduct !== undefined ? propSelectedProduct : localSelectedProduct;
  const handleProductSelect = (product: Product | null) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      setLocalSelectedProduct(product);
    }
  };

  const filteredProducts = products.filter(p => !activeSearch || p.name.toLowerCase().includes(activeSearch.toLowerCase()) || p.category.toLowerCase().includes(activeSearch.toLowerCase()));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    setActiveSearch(query);

    // Only notify if no results found, and it's a new query
    if (query && query !== lastSearchedQuery) {
      setLastSearchedQuery(query);
      const tempFiltered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));
      if (tempFiltered.length === 0) {
        sendDiscordMessage(`🔍 **Empty Search:** "${query}" returned no results. Make it?`);
      }
    }
  };

  return (
    <div id="product-gallery" className="py-24 px-4 max-w-7xl mx-auto relative">
      {onBack && (
        <button
          onClick={onBack}
          className="md:hidden fixed top-28 left-4 z-50 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-black/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>
      )}

      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 relative z-10">
        <div className="w-full md:w-auto">
          <h2 className="text-3xl md:text-7xl font-black font-heading tracking-tighter text-white mb-4 md:mb-6 leading-none uppercase">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">COLLECTION</span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-sm md:text-lg leading-relaxed font-light mb-6 md:mb-8">
            Precision-engineered artifacts. Choose your canvas.
          </p>
          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-grow bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button type="submit" className="bg-white text-black font-bold uppercase tracking-widest text-[10px] md:text-xs px-5 md:px-6 py-3 md:py-3 rounded-full hover:bg-zinc-200 transition-colors">
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-500 mt-6 md:mt-0">
          <span className="text-white">{filteredProducts.length} Variants</span>
          <div className="h-px w-12 bg-zinc-800"></div>
          <span>2024 Series</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 relative z-10">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => handleProductSelect(product)} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center relative z-10 glass rounded-[2rem] mt-8">
          <svg className="w-16 h-16 text-zinc-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 14v-2m0 0V8m0 2h2m-2 0H8" /></svg>
          <h3 className="text-3xl font-black font-heading text-white mb-4 uppercase">Didn't find what you're looking for?</h3>
          <p className="text-zinc-400 max-w-lg mb-8">
            We specialize in custom creations. Let us know what you want to engrave, and we'll make it happen.
          </p>
          <a
            href={`https://wa.me/96181388115?text=${encodeURIComponent(`Hi! I couldn't find exactly what I was looking for. Can you make something custom related to "${activeSearch}"?`)}`}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 group"
          >
            Request Custom Design
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" /></svg>
          </a>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => handleProductSelect(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default ProductGallery;
