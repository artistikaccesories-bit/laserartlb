import React, { useEffect, useState } from 'react';
import { db, collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from '../utils/firebase';
import { ShoppingBag, Clock, CheckCircle, XCircle, Phone, MapPin, Smartphone } from 'lucide-react';

interface Order {
    id: string;
    orderId: string;
    items: any[];
    total: number;
    subtotal: number;
    deliveryType: string;
    status: 'pending' | 'completed' | 'cancelled';
    timestamp: any;
    device: string;
    location?: any;
}

const OrdersScreen: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) return;
        const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'), limit(100));
        const unsub = onSnapshot(q, (snapshot) => {
            const items: Order[] = [];
            snapshot.forEach(doc => {
                items.push({ id: doc.id, ...doc.data() } as Order);
            });
            setOrders(items);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const updateOrderStatus = async (id: string, status: string) => {
        if (!db) return;
        try {
            await updateDoc(doc(db, 'orders', id), { status });
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '—';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
        return date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className="screen animate-in fade-in">
            <div className="screen-header">
                <div>
                    <h1 className="screen-title flex items-center gap-3">
                        <div className="p-2 bg-blue-dim text-blue rounded-xl">
                            <ShoppingBag size={22} />
                        </div>
                        Orders
                    </h1>
                    <p className="screen-subtitle">{orders.length} total orders recorded</p>
                </div>
            </div>

            {loading ? (
                <div className="loading-state h-[40vh]">
                    <div className="spinner" />
                    <p>Fetching orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="empty-state h-[40vh]">
                    <ShoppingBag size={48} className="text-text-muted mb-4" />
                    <p className="empty-state__title">No orders yet</p>
                    <p className="empty-state__sub">Orders will appear here when customers checkout.</p>
                </div>
            ) : (
                <div className="visitor-list">
                    {orders.map(o => (
                        <div key={o.id} className="visitor-card glass-card">
                            <div className="visitor-card__header">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-blue uppercase tracking-wider">{o.orderId}</span>
                                    <span className="text-[10px] text-text-secondary">{formatDate(o.timestamp)}</span>
                                </div>
                                <div className={`status-badge ${o.status}`}>
                                    {o.status === 'pending' && <Clock size={10} />}
                                    {o.status === 'completed' && <CheckCircle size={10} />}
                                    {o.status === 'cancelled' && <XCircle size={10} />}
                                    <span className="capitalize">{o.status}</span>
                                </div>
                            </div>

                            <div className="order-items p-3 bg-black/20 rounded-xl my-3 border border-white/5">
                                {o.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-xs mb-1 last:mb-0">
                                        <span className="text-text-secondary">
                                            <strong className="text-white">{item.quantity}x</strong> {item.name}
                                        </span>
                                        <span className="font-bold text-white">${item.price * item.quantity}</span>
                                    </div>
                                ))}
                                <div className="border-t border-white/5 mt-2 pt-2 flex justify-between font-black">
                                    <span className="text-text-secondary text-[10px] uppercase">Total</span>
                                    <span className="text-green">${o.total}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-[11px] mb-4 opacity-70">
                                <div className="flex items-center gap-1">
                                    <Smartphone size={12} />
                                    {o.device}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    {o.location?.city || 'Unknown'}, {o.location?.country || '??'}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {o.status === 'pending' && (
                                    <>
                                        <button 
                                            className="action-btn action-btn--green flex-1"
                                            onClick={() => updateOrderStatus(o.id, 'completed')}
                                        >
                                            <CheckCircle size={14} /> Done
                                        </button>
                                        <button 
                                            className="action-btn action-btn--red"
                                            onClick={() => updateOrderStatus(o.id, 'cancelled')}
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </>
                                )}
                                {o.status !== 'pending' && (
                                    <button 
                                        className="action-btn action-btn--outline flex-1"
                                        onClick={() => updateOrderStatus(o.id, 'pending')}
                                    >
                                        <Clock size={14} /> Mark Pending
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersScreen;
