import React, { useEffect, useState } from 'react';
import { db, collection, query, orderBy, limit, onSnapshot } from '../utils/firebase';
import { Users, ShoppingCart, TrendingUp, Smartphone, MapPin, Activity } from 'lucide-react';

interface Stats {
    totalVisitors: number;
    todayVisitors: number;
    activeCarts: number;
    liveVisitors: number;
    topDevice: string;
    topCity: string;
    hourlyDistribution: Record<number, number>;
}

const DashboardScreen: React.FC = () => {
    const [stats, setStats] = useState<Stats>({
        totalVisitors: 0, todayVisitors: 0, activeCarts: 0,
        liveVisitors: 0, topDevice: '—', topCity: '—', hourlyDistribution: {}
    });
    const [lastUpdate, setLastUpdate] = useState<string>('');

    useEffect(() => {
        if (!db) return;
        const visitorsRef = collection(db, 'visitors');
        const q = query(visitorsRef, orderBy('timestamp', 'desc'), limit(200));

        const unsub = onSnapshot(q, (snapshot) => {
            const now = new Date();
            let todayCount = 0, activeCarts = 0, liveVisitors = 0;
            const hourlyData: Record<number, number> = {};
            const topCities: Record<string, number> = {};
            const topDevices: Record<string, number> = {};

            snapshot.forEach(d => {
                const data = d.data();
                
                // Safe date conversion
                const getSafeDate = (val: any) => {
                    if (val && typeof val.toDate === 'function') return val.toDate();
                    if (val && val.seconds) return new Date(val.seconds * 1000);
                    if (val instanceof Date) return val;
                    return new Date();
                };

                const date = getSafeDate(data.timestamp);
                const isToday = date.toDateString() === now.toDateString();
                if (isToday) {
                    todayCount++;
                    const hour = date.getHours();
                    hourlyData[hour] = (hourlyData[hour] || 0) + 1;
                }
                const lastActive = getSafeDate(data.lastActive || data.timestamp);
                const isLive = data.isActive === true && (now.getTime() - lastActive.getTime()) < 3 * 60 * 1000;
                if (isLive) {
                    liveVisitors++;
                    if (data.activeCartCount > 0) activeCarts++;
                }
                const city = data.location?.city || 'Unknown';
                topCities[city] = (topCities[city] || 0) + 1;
                const device = data.device || 'Unknown';
                topDevices[device] = (topDevices[device] || 0) + 1;
            });

            const topCity = Object.keys(topCities).sort((a, b) => topCities[b] - topCities[a])[0] || '—';
            const topDevice = Object.keys(topDevices).sort((a, b) => topDevices[b] - topDevices[a])[0] || '—';

            setStats({ totalVisitors: snapshot.size, todayVisitors: todayCount, activeCarts, liveVisitors, topDevice, topCity, hourlyDistribution: hourlyData });
            setLastUpdate(now.toLocaleTimeString());
        });

        return () => unsub();
    }, []);

    const distValues = Object.values(stats.hourlyDistribution) as number[];
    const maxCount = Math.max(...distValues, 1);

    return (
        <div className="screen">
            <div className="screen-header">
                <div>
                    <h1 className="screen-title">Dashboard</h1>
                    {lastUpdate && <p className="screen-subtitle">Updated {lastUpdate}</p>}
                </div>
                <div className="live-badge">
                    <span className="live-dot" />
                    LIVE
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card stat-card--red">
                    <div className="stat-card__label">
                        <Activity size={12} />
                        Live Online
                    </div>
                    <div className="stat-card__value">{stats.liveVisitors}</div>
                    <div className="stat-pulse" />
                </div>

                <div className="stat-card stat-card--green">
                    <div className="stat-card__label">
                        <TrendingUp size={12} />
                        Today
                    </div>
                    <div className="stat-card__value">+{stats.todayVisitors}</div>
                </div>

                <div className="stat-card stat-card--yellow">
                    <div className="stat-card__label">
                        <ShoppingCart size={12} />
                        Active Carts
                    </div>
                    <div className="stat-card__value">{stats.activeCarts}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card__label">
                        <Users size={12} />
                        Total Visitors
                    </div>
                    <div className="stat-card__value">{stats.totalVisitors}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card__label">
                        <Smartphone size={12} />
                        Top Device
                    </div>
                    <div className="stat-card__value stat-card__value--sm">{stats.topDevice}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card__label">
                        <MapPin size={12} />
                        Top City
                    </div>
                    <div className="stat-card__value stat-card__value--sm">{stats.topCity}</div>
                </div>
            </div>

            {/* Hourly Chart */}
            <div className="chart-card">
                <div className="chart-card__header">
                    <h2 className="chart-card__title">Today's Traffic</h2>
                    <span className="chart-card__label">by hour</span>
                </div>
                <div className="chart-bars">
                    {Array.from({ length: 24 }).map((_, i) => {
                        const count = stats.hourlyDistribution[i] || 0;
                        const height = Math.max(4, (count / maxCount) * 100);
                        const isNow = new Date().getHours() === i;
                        return (
                            <div key={i} className="chart-bar-wrap">
                                {count > 0 && (
                                    <span className="chart-bar-tooltip">{count}</span>
                                )}
                                <div
                                    className={`chart-bar ${isNow ? 'chart-bar--active' : count > 0 ? 'chart-bar--filled' : ''}`}
                                    style={{ height: `${height}%` }}
                                />
                                <span className={`chart-bar-label ${isNow ? 'chart-bar-label--active' : ''}`}>
                                    {i === 0 ? '12a' : i === 12 ? '12p' : i > 12 ? `${i - 12}p` : `${i}a`}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="activity-feed">
                <div className="section-header">
                    <h3 className="section-title">Live Activity</h3>
                    <div className="activity-ring" />
                </div>
                <div className="feed-items">
                    {stats.totalVisitors > 0 ? (
                        <div className="feed-item">
                            <div className="feed-item__dot" />
                            <div className="feed-item__text">
                                System ready. Monitoring <strong>{stats.liveVisitors}</strong> live sessions.
                            </div>
                        </div>
                    ) : (
                        <div className="feed-item opacity-50">
                            <div className="feed-item__dot grayscale" />
                            <div className="feed-item__text">Waiting for traffic data...</div>
                        </div>
                    )}
                    {stats.activeCarts > 0 && (
                        <div className="feed-item feed-item--yellow">
                            <div className="feed-item__dot" />
                            <div className="feed-item__text">
                                <strong>{stats.activeCarts}</strong> customers currently have items in their carts.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;
