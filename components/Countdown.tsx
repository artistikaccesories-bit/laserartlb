
import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Set target date to next Sunday at midnight or similar, or just 3 days from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        targetDate.setHours(23, 59, 59);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white text-black py-2 px-4 text-center font-black tracking-widest text-xs uppercase flex items-center justify-center gap-4 overflow-hidden whitespace-nowrap">
            <div className="animate-pulse">Flash Sale Ending In:</div>
            <div className="flex gap-2 font-mono">
                <span className="bg-black text-white px-2 py-0.5 rounded">{timeLeft.days}d</span>
                <span className="bg-black text-white px-2 py-0.5 rounded">{timeLeft.hours}h</span>
                <span className="bg-black text-white px-2 py-0.5 rounded">{timeLeft.minutes}m</span>
                <span className="bg-black text-white px-2 py-0.5 rounded">{timeLeft.seconds}s</span>
            </div>
            <div className="hidden sm:block opacity-50">Limited Stock Available</div>
        </div>
    );
};

export default Countdown;
