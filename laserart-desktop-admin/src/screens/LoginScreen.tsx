import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Lock, Zap } from 'lucide-react';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [locked, setLocked] = useState(false);
    const [lockTimer, setLockTimer] = useState(0);
    const [shake, setShake] = useState(false);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const hashPassword = async (pwd: string): Promise<string> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(pwd);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 600);
    };

    const startLockout = () => {
        let seconds = 30;
        setLocked(true);
        setLockTimer(seconds);
        timerRef.current = setInterval(() => {
            seconds--;
            setLockTimer(seconds);
            if (seconds <= 0) {
                clearInterval(timerRef.current!);
                setLocked(false);
                setAttempts(0);
                setError('');
            }
        }, 1000);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (locked || loading) return;
        setLoading(true);
        const hash = await hashPassword(password);
        const h1 = import.meta.env.VITE_ADMIN_HASH_1;
        const h2 = import.meta.env.VITE_ADMIN_HASH_2;

        if ((h1 && hash === h1) || (h2 && hash === h2)) {
            setError('');
            onLogin();
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            triggerShake();
            setPassword('');
            if (newAttempts >= 3) {
                setError('Too many attempts. Locked for 30 seconds.');
                startLockout();
            } else {
                setError(`Invalid password. ${3 - newAttempts} attempt(s) remaining.`);
            }
        }
        setLoading(false);
    };

    return (
        <div className="login-screen">
            <div className="login-bg-glow" />

            <div className={`login-card ${shake ? 'shake' : ''}`}>
                <div className="login-logo">
                    <div className="login-logo-icon">
                        <Zap size={28} strokeWidth={2.5} />
                    </div>
                </div>

                <h1 className="login-title">LASERART</h1>
                <p className="login-subtitle">Admin Dashboard</p>

                <div className="login-lock-icon">
                    <Lock size={16} />
                    <span>Restricted Access</span>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="login-input-wrap">
                        <input
                            id="admin-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => { setPassword(e.target.value); setError(''); }}
                            className="login-input"
                            placeholder="Enter password"
                            disabled={locked}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="login-eye-btn"
                            onClick={() => setShowPassword(v => !v)}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && (
                        <p className="login-error">{error}</p>
                    )}

                    {locked && (
                        <div className="login-lockout">
                            🔒 Retry in {lockTimer}s
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={locked || loading || !password}
                    >
                        {loading ? (
                            <span className="login-spinner" />
                        ) : (
                            'Unlock Dashboard'
                        )}
                    </button>
                </form>

                <p className="login-version">v1.0.0 · LaserArt Admin</p>
            </div>
        </div>
    );
};

export default LoginScreen;
