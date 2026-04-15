import { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import LiveVisitorsScreen from './screens/LiveVisitorsScreen';
import CartScreen from './screens/CartScreen';
import OrdersScreen from './screens/OrdersScreen';
import InventoryScreen from './screens/InventoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';
import './index.css';

type Tab = 'dashboard' | 'live' | 'carts' | 'orders' | 'inventory' | 'settings';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const handleLogout = () => {
    setAuthenticated(false);
    setActiveTab('dashboard');
  };

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardScreen />;
      case 'live': return <LiveVisitorsScreen />;
      case 'carts': return <CartScreen />;
      case 'orders': return <OrdersScreen />;
      case 'inventory': return <InventoryScreen />;
      case 'settings': return <SettingsScreen onLogout={handleLogout} />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <div className="app">
      <div className="app-bg-glow" />
      <main className="app__main">
        {renderScreen()}
      </main>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

export default App;
