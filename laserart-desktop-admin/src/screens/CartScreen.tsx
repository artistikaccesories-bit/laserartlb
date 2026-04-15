import React, { useEffect, useState } from 'react';
import { db, collection, query, orderBy, limit, getDocs } from '../utils/firebase';
import { ShoppingCart, MapPin, Smartphone, ArrowLeft, RefreshCw } from 'lucide-react';

interface CartVisitor {
    id: string;
    device: string;
    location: string;
    cartCount: number;
    cartItems: string;
    time: string;
}

const CartScreen: React.FC = () => {
    const [carts, setCarts] = useState<CartVisitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalValue, setTotalValue] = useState(0);

    const fetchCarts = async () => {
        setLoading(true);
        if (!db) {
            setCarts([
                { id: '1', device: 'Mobile 📱', location: 'Beirut, LB', cartCount: 2, cartItems: 'Keychain × 2', time: '5m ago' },
                { id: '2', device: 'Desktop 💻', location: 'Jounieh, LB', cartCount: 1, cartItems: 'Custom Frame × 1', time: '12m ago' },
            ]);
            setLoading(false);
            return;
        }

        try {
            const visitorsRef = collection(db, 'visitors');
            const q = query(visitorsRef, orderBy('timestamp', 'desc'), limit(150));
            const snapshot = await getDocs(q);
            const result: CartVisitor[] = [];
            let total = 0;

            snapshot.forEach(d => {
                try {
                    const data = d.data();
                    // Filter: only show active sessions with items in cart
                    if (data.activeCartCount && Number(data.activeCartCount) > 0) {
                        
                        // Safe date conversion
                        const getSafeDate = (val: any) => {
                            if (val && typeof val.toDate === 'function') return val.toDate();
                            if (val && val.seconds) return new Date(val.seconds * 1000);
                            if (val instanceof Date) return val;
                            return new Date();
                        };

                        const date = getSafeDate(data.timestamp);
                        const diffMs = new Date().getTime() - date.getTime();
                        const diffMin = Math.floor(diffMs / 60000);
                        const timeStr = diffMin < 1 ? 'Just now' : diffMin < 60 ? `${diffMin}m ago` : `${Math.floor(diffMin / 60)}h ago`;

                        // SAFE CART ITEMS STRING
                        let cartItemsStr = '';
                        if (typeof data.cartItems === 'string') {
                            cartItemsStr = data.cartItems;
                        } else if (Array.isArray(data.cartItems)) {
                            cartItemsStr = data.cartItems.map((item: any) => 
                                typeof item === 'string' ? item : (item.name || 'Item')
                            ).join(', ');
                        } else if (data.cartItems && typeof data.cartItems === 'object') {
                            cartItemsStr = JSON.stringify(data.cartItems);
                        } else {
                            cartItemsStr = `${data.activeCartCount} item(s) detected`;
                        }

                        result.push({
                            id: d.id,
                            device: String(data.device || 'Unknown Device'),
                            location: data.location ? `${data.location.city || 'Unknown'}, ${data.location.country || '??'}` : 'Unknown Location',
                            cartCount: Number(data.activeCartCount) || 0,
                            cartItems: cartItemsStr,
                            time: timeStr,
                        });

                        total += (Number(data.activeCartCount) || 0);
                    }
                } catch (eachErr) {
                    console.error("Error processing visitor doc:", d.id, eachErr);
                }
            });

            setCarts(result);
            setTotalValue(total);
        } catch (err) {
            console.error("Firestore query error:", err);
            setCarts([]);
        }
        setLoading(false);
    };

    useEffect(() => { fetchCarts(); }, []);

    return (
        <div className="screen animate-in fade-in duration-500">
            <div className="screen-header">
                <div>
                    <h1 className="screen-title flex items-center gap-3">
                        <div className="p-2 bg-yellow-dim text-yellow rounded-xl">
                            <ShoppingCart size={22} />
                        </div>
                        Cart Activity
                    </h1>
                    <p className="screen-subtitle">{carts.length} active sessions with items</p>
                </div>
                <button 
                  className="refresh-btn flex items-center gap-2" 
                  onClick={fetchCarts}
                  disabled={loading}
                >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    {loading ? 'Updating...' : 'Refresh'}
                </button>
            </div>

            <div className="glass-panel p-4 mb-6 rounded-2xl border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-dim flex items-center justify-center text-blue">
                        <ShoppingCart size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Potential Orders</p>
                        <p className="text-xl font-black text-white">{totalValue} Items</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Carts Found</p>
                    <p className="text-xl font-black text-white">{carts.length}</p>
                </div>
            </div>

            {loading ? (
                <div className="loading-state h-[40vh]">
                    <div className="spinner" />
                    <p>Scanning for active carts...</p>
                </div>
            ) : carts.length === 0 ? (
                <div className="empty-state h-[40vh] border border-dashed border-border rounded-3xl">
                    <div className="p-6 bg-surface-2 rounded-full mb-4">
                         <ShoppingCart size={48} className="text-text-muted" />
                    </div>
                    <p className="empty-state__title">No items in carts</p>
                    <p className="empty-state__sub">Activity will appear here once visitors start shopping</p>
                </div>
            ) : (
                <div className="visitor-list">
                    {carts.map(c => (
                        <div key={c.id} className="visitor-card glass-card hover:translate-y-[-2px] transition-transform">
                            <div className="visitor-card__header">
                                <div className="visitor-card__device">
                                    <Smartphone size={14} className="text-blue" />
                                    <span>{c.device}</span>
                                </div>
                                <span className="cart-badge shadow-lg shadow-yellow/10">🛒 {c.cartCount} items</span>
                            </div>

                            <div className="visitor-card__location">
                                <MapPin size={12} className="text-red" />
                                <span>{c.location}</span>
                            </div>

                            <div className="visitor-card__pages p-3 bg-black/20 rounded-xl border border-white/5 mt-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1 h-3 bg-yellow rounded-full" />
                                    <span className="text-[10px] uppercase font-bold text-yellow/80">Cart Contents</span>
                                </div>
                                <span className="visitor-card__pages-text font-medium">{c.cartItems}</span>
                            </div>

                            <div className="visitor-card__footer mt-3 pt-3 border-t border-white/5">
                                <span className="visitor-card__duration flex items-center gap-1.5 opacity-60">
                                   <RefreshCw size={10} /> {c.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartScreen;
