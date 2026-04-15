import React, { useEffect, useState } from 'react';
import type { } from 'react/jsx-runtime';
import { db, collection, query, orderBy, limit, onSnapshot, doc, deleteDoc, getDocs } from '../utils/firebase';
import { Search, Trash2, AlertTriangle } from 'lucide-react';

interface Visit {
    id: string;
    time: string;
    device: string;
    location: string;
    pages: string;
    duration: string;
}

const VisitorLogScreen: React.FC = () => {
    const [visits, setVisits] = useState<Visit[]>([]);
    const [filtered, setFiltered] = useState<Visit[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [confirmClear, setConfirmClear] = useState(false);

    useEffect(() => {
        if (!db) {
            const mock: Visit[] = [
                { id: '1', time: 'Just now', device: 'Mobile 📱', location: 'Beirut, LB', pages: 'Home, Keychains', duration: '5m' },
                { id: '2', time: '2h ago', device: 'Desktop 💻', location: 'Tripoli, LB', pages: 'Custom Preview', duration: '12m' },
                { id: '3', time: 'Yesterday', device: 'Tablet 📱', location: 'Zahlé, LB', pages: 'Services', duration: '3m' },
            ];
            setVisits(mock);
            setFiltered(mock);
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'visitors'), orderBy('timestamp', 'desc'), limit(200));
        const unsub = onSnapshot(q, snapshot => {
            const now = new Date();
            const result: Visit[] = [];

            snapshot.forEach(d => {
                const data = d.data();
                const date = data.timestamp ? data.timestamp.toDate() : new Date();
                const diffMs = now.getTime() - date.getTime();
                const diffMin = Math.floor(diffMs / 60000);
                const timeStr = diffMin < 1 ? 'Just now'
                    : diffMin < 60 ? `${diffMin}m ago`
                        : diffMin < 1440 ? `${Math.floor(diffMin / 60)}h ago`
                            : date.toLocaleDateString();

                result.push({
                    id: d.id,
                    time: timeStr,
                    device: data.device || 'Unknown',
                    location: `${data.location?.city || 'Unknown'}, ${data.location?.country || '??'}`,
                    pages: data.pagesViewed ? data.pagesViewed.join(', ') : 'Home',
                    duration: data.durationSec ? `${Math.floor(data.durationSec / 60)}m ${data.durationSec % 60}s` : '—',
                });
            });

            setVisits(result);
            setFiltered(result);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    useEffect(() => {
        if (!search.trim()) {
            setFiltered(visits);
        } else {
            const s = search.toLowerCase();
            setFiltered(visits.filter(v =>
                v.location.toLowerCase().includes(s) ||
                v.device.toLowerCase().includes(s) ||
                v.pages.toLowerCase().includes(s)
            ));
        }
    }, [search, visits]);

    const deleteVisit = async (id: string) => {
        if (!db) return;
        try {
            await deleteDoc(doc(db, 'visitors', id));
        } catch (err) {
            console.error(err);
        }
    };

    const clearAll = async () => {
        if (!db) return;
        try {
            const snapshot = await getDocs(collection(db, 'visitors'));
            await Promise.all(snapshot.docs.map(d => deleteDoc(doc(db, 'visitors', d.id))));
        } catch (err) {
            console.error(err);
        }
        setConfirmClear(false);
    };

    return (
        <div className="screen">
            <div className="screen-header">
                <div>
                    <h1 className="screen-title">Visitor Log</h1>
                    <p className="screen-subtitle">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
                </div>
                <button className="danger-btn" onClick={() => setConfirmClear(true)}>
                    <Trash2 size={14} /> Clear All
                </button>
            </div>

            <div className="search-bar">
                <Search size={14} className="search-bar__icon" />
                <input
                    type="text"
                    placeholder="Search by city, device, page..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-bar__input"
                />
            </div>

            {confirmClear && (
                <div className="confirm-dialog">
                    <AlertTriangle size={20} className="confirm-dialog__icon" />
                    <p>Delete ALL {visits.length} records? This cannot be undone.</p>
                    <div className="confirm-dialog__actions">
                        <button className="confirm-dialog__cancel" onClick={() => setConfirmClear(false)}>Cancel</button>
                        <button className="confirm-dialog__confirm" onClick={clearAll}>Delete All</button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loading-state"><div className="spinner" /><p>Loading records...</p></div>
            ) : filtered.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-state__title">{search ? 'No results' : 'No records yet'}</p>
                </div>
            ) : (
                <div className="log-list">
                    {filtered.map(v => (
                        <div key={v.id} className="log-item">
                            <div className="log-item__main">
                                <div className="log-item__top">
                                    <span className="log-item__time">{v.time}</span>
                                    <span className="log-item__device">{v.device}</span>
                                </div>
                                <p className="log-item__location">📍 {v.location}</p>
                                <p className="log-item__pages">Pages: {v.pages}</p>
                                <p className="log-item__duration">Duration: {v.duration}</p>
                            </div>
                            <button
                                className="log-item__delete"
                                onClick={() => deleteVisit(v.id)}
                                title="Delete record"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VisitorLogScreen;
