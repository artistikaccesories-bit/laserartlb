import { useState, useEffect } from 'react';
import type { } from 'react/jsx-runtime';
import { LogOut, Shield, Info, ExternalLink, Truck, Save, Loader2 } from 'lucide-react';
import { db, doc, getDoc, setDoc } from '../utils/firebase';

interface SettingsScreenProps {
    onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onLogout }) => {
    const [standardDelivery, setStandardDelivery] = useState('4');
    const [expressDelivery, setExpressDelivery] = useState('6');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!db) return;
        getDoc(doc(db, 'settings', 'delivery')).then(snap => {
            if (snap.exists()) {
                const data = snap.data();
                setStandardDelivery(data.standard.toString());
                setExpressDelivery(data.express.toString());
            }
        });
    }, []);

    const handleSaveDelivery = async () => {
        if (!db) return;
        setSaving(true);
        try {
            await setDoc(doc(db, 'settings', 'delivery'), {
                standard: parseFloat(standardDelivery),
                express: parseFloat(expressDelivery),
                updatedAt: new Date()
            });
            alert("Delivery prices updated across the website!");
        } catch (error) {
            console.error(error);
            alert("Failed to update delivery prices.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="screen">
            <div className="screen-header">
                <div>
                    <h1 className="screen-title">Settings</h1>
                    <p className="screen-subtitle">App configuration</p>
                </div>
            </div>

            <div className="settings-list">
                <div className="settings-section">
                    <p className="settings-section__label">Shop Settings</p>
                    <div className="settings-card">
                        <div className="settings-card__header">
                            <Truck size={18} className="settings-card__icon" />
                            <p className="settings-card__title">Delivery Pricing ($)</p>
                        </div>
                        <div className="settings-card__body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Standard</label>
                                    <input type="number" value={standardDelivery} onChange={e => setStandardDelivery(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Express</label>
                                    <input type="number" value={expressDelivery} onChange={e => setExpressDelivery(e.target.value)} />
                                </div>
                            </div>
                            <button className="save-settings-btn" onClick={handleSaveDelivery} disabled={saving}>
                                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                {saving ? 'Saving...' : 'Update All Delivery Prices'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <p className="settings-section__label">Security</p>

                    <div className="settings-item">
                        <div className="settings-item__left">
                            <Shield size={18} className="settings-item__icon settings-item__icon--blue" />
                            <div>
                                <p className="settings-item__title">Password Protection</p>
                                <p className="settings-item__sub">SHA-256 hashed · Lockout after 3 attempts</p>
                            </div>
                        </div>
                        <span className="settings-item__badge settings-item__badge--green">Active</span>
                    </div>
                </div>

                <div className="settings-section">
                    <p className="settings-section__label">Database</p>

                    <a
                        href="https://console.firebase.google.com/project/laserart-2eca0"
                        target="_blank"
                        rel="noreferrer"
                        className="settings-item settings-item--link"
                    >
                        <div className="settings-item__left">
                            <ExternalLink size={18} className="settings-item__icon settings-item__icon--orange" />
                            <div>
                                <p className="settings-item__title">Firebase Console</p>
                                <p className="settings-item__sub">laserart-2eca0</p>
                            </div>
                        </div>
                        <span className="settings-item__arrow">→</span>
                    </a>
                </div>

                <div className="settings-section">
                    <p className="settings-section__label">About</p>

                    <div className="settings-item">
                        <div className="settings-item__left">
                            <Info size={18} className="settings-item__icon" />
                            <div>
                                <p className="settings-item__title">LaserArt Admin</p>
                                <p className="settings-item__sub">Version 1.0.0 · Built with React + Capacitor</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="logout-btn" onClick={onLogout}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SettingsScreen;
