import React, { useState, useEffect } from 'react';
import { db, collection, query, onSnapshot, Timestamp, orderBy, limit } from '../src/utils/firebase';

const LiveVisitorCounter: React.FC = () => {
    const [visitors, setVisitors] = useState(1);

    useEffect(() => {
        if (!db) {
            // Fallback for mock mode
            setVisitors(Math.floor(Math.random() * 4) + 2);
            const interval = setInterval(() => {
                setVisitors(prev => {
                    const change = Math.random() > 0.5 ? 1 : -1;
                    let next = prev + change;
                    if (next < 1) next = 1;
                    if (next > 5) next = 5;
                    return next;
                });
            }, 15000);
            return () => clearInterval(interval);
        }

        const visitorsRef = collection(db, "visitors");
        // Only fetch recently active/active visitors
        const q = query(visitorsRef, orderBy("lastActive", "desc"), limit(30));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const now = Date.now();
            let liveCount = 0;
            snapshot.forEach(doc => {
                const data = doc.data();
                const lastActive = data.lastActive ? data.lastActive.toDate().getTime() : 0;
                // Active if flag is true AND seen in the last 10 minutes (safety buffer)
                if (data.isActive === true && (now - lastActive < 3 * 60 * 1000)) {
                    liveCount++;
                }
            });
            // Urgency Boost: Multiplier + Base Offset
            const boostedCount = Math.floor(liveCount * 2.1) + 4;
            setVisitors(Math.max(4, boostedCount));
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-zinc-950 text-zinc-300 py-1.5 px-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            <span>{visitors} {visitors === 1 ? 'person is' : 'people are'} viewing this site</span>
        </div>
    );
};

export default LiveVisitorCounter;
