import React, { useEffect, useState } from 'react';
import { db, collection, query, orderBy, limit, onSnapshot } from '../utils/firebase';
import { Wifi, Smartphone, Monitor, Tablet, MapPin } from 'lucide-react';

interface LiveVisitor {
    id: string;
    device: string;
    location: string;
    pages: string;
    duration: string;
    cartCount: number;
    lastActive: string;
    ip?: string;
}

const DeviceIcon = ({ device }: { device: string }) => {
    const d = (device || '').toLowerCase();
    if (d.includes('mobile')) return <Smartphone size={14} />;
    if (d.includes('tablet')) return <Tablet size={14} />;
    return <Monitor size={14} />;
};

const LiveVisitorsScreen: React.FC = () => {
    const [visitors, setVisitors] = useState<LiveVisitor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            // Mock data
            setVisitors([
                { id: '1', device: 'Mobile 📱', location: 'Beirut, LB', pages: 'Home, Keychains', duration: '2m', cartCount: 2, lastActive: 'Just now' },
                { id: '2', device: 'Desktop 💻', location: 'Tripoli, LB', pages: 'Custom Preview', duration: '5m', cartCount: 0, lastActive: '1m ago' },
            ]);
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'visitors'), orderBy('lastActive', 'desc'), limit(100));
        const unsub = onSnapshot(q, snapshot => {
            const now = new Date();
            const live: LiveVisitor[] = [];

            snapshot.forEach(d => {
                const data = d.data();
                
                // Safe date conversion
                const getSafeDate = (val: any) => {
                    if (val && typeof val.toDate === 'function') return val.toDate();
                    if (val && val.seconds) return new Date(val.seconds * 1000);
                    if (val instanceof Date) return val;
                    return new Date();
                };

                const lastActiveDate = getSafeDate(data.lastActive);
                const diffMs = now.getTime() - lastActiveDate.getTime();
                const isLive = data.isActive === true && diffMs < 3 * 60 * 1000;

                if (isLive) {
                    const diffSec = Math.floor(diffMs / 1000);
                    const lastActiveStr = diffSec < 60 ? `${diffSec}s ago` : `${Math.floor(diffSec / 60)}m ago`;
                    live.push({
                        id: d.id,
                        device: data.device || 'Unknown',
                        location: `${data.location?.city || 'Unknown'}, ${data.location?.country || '??'}`,
                        pages: data.pagesViewed ? data.pagesViewed.join(' → ') : 'Home',
                        duration: data.durationSec ? `${Math.floor(data.durationSec / 60)}m ${data.durationSec % 60}s` : 'Active',
                        cartCount: data.activeCartCount || 0,
                        lastActive: lastActiveStr,
                        ip: data.ip || undefined,
                    });
                }
            });

            setVisitors(live);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return (
        <div className="screen">
            <div className="screen-header">
                <div>
                    <h1 className="screen-title">Live Visitors</h1>
                    <p className="screen-subtitle">{visitors.length} online right now</p>
                </div>
                <div className="live-badge">
                    <span className="live-dot" />
                    LIVE
                </div>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner" />
                    <p>Connecting to Firebase...</p>
                </div>
            ) : visitors.length === 0 ? (
                <div className="empty-state">
                    <Wifi size={40} className="empty-state__icon" />
                    <p className="empty-state__title">No one online</p>
                    <p className="empty-state__sub">Visitors will appear here when active</p>
                </div>
            ) : (
                <div className="visitor-list">
                    {visitors.map(v => (
                        <div key={v.id} className="visitor-card">
                            <div className="visitor-card__header">
                                <div className="visitor-card__device">
                                    <DeviceIcon device={v.device} />
                                    <span>{v.device}</span>
                                </div>
                                <div className="visitor-status">
                                    <span className="live-dot live-dot--sm" />
                                    <span className="visitor-status__time">{v.lastActive}</span>
                                </div>
                            </div>

                            <div className="visitor-card__location">
                                <MapPin size={12} />
                                <span>{v.location}</span>
                                {v.ip && <span className="visitor-card__ip">· {v.ip}</span>}
                            </div>

                            <div className="visitor-card__pages">
                                <span className="visitor-card__label">Pages:</span>
                                <span className="visitor-card__pages-text">{v.pages}</span>
                            </div>

                            <div className="visitor-card__footer">
                                <span className="visitor-card__duration">⏱ {v.duration}</span>
                                {v.cartCount > 0 && (
                                    <span className="visitor-card__cart">
                                        🛒 {v.cartCount} item{v.cartCount > 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LiveVisitorsScreen;
