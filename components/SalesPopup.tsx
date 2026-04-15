
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../src/data/products';

const locations = ['Beirut', 'Jounieh', 'Byblos', 'Sidon', 'Tripoli', 'Zahle', 'Nabatieh', 'Tyre', 'Baalbek'];
const products = PRODUCTS.map(p => p.name);

const SalesPopup: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [currentSale, setCurrentSale] = useState({ location: '', product: '' });

    useEffect(() => {
        const showPopup = () => {
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            const randomProduct = products[Math.floor(Math.random() * products.length)];

            setCurrentSale({ location: randomLocation, product: randomProduct });
            setVisible(true);

            setTimeout(() => {
                setVisible(false);
            }, 5000); // Show for 5 seconds
        };

        // Initial delay
        const initialTimer = setTimeout(showPopup, 10000);

        // Repeat every 30-45 seconds
        const interval = setInterval(() => {
            showPopup();
        }, Math.random() * 15000 + 30000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-6 left-6 z-[200] animate-in slide-in-from-left duration-500">
            <div className="bg-white text-black p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-zinc-200 min-w-[280px]">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Recent Purchase</p>
                    <p className="text-sm font-bold">
                        Someone from <span className="text-black">{currentSale.location}</span>
                    </p>
                    <p className="text-xs text-zinc-600">
                        just ordered a <span className="font-semibold">{currentSale.product}</span>
                    </p>
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-2 right-2 text-zinc-300 hover:text-zinc-500"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
};

export default SalesPopup;
