import { useState, useMemo } from 'react';
import { useLiveData } from './hooks/useLiveData';
import { Topbar } from './components/layout/Topbar';
import { HostRoster } from './components/layout/HostRoster';
import { HostPanel } from './components/panels/HostPanel';
import IncubationLabVault3D from './components/panels/IncubationLabVault3D';
import { Toast } from './components/ui/Toast';
import LoginConsole from './components/auth/LoginConsole';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { hosts, updateHost } = useLiveData();
  const [selectedHostId, setSelectedHostId] = useState('host-0'); // Sable Orin is host-0 (emergence)
  const [toast, setToast] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('telemetry'); // telemetry | lab

  const selectedHost = useMemo(() => {
    return hosts.find(h => h.id === selectedHostId) || hosts[0];
  }, [hosts, selectedHostId]);

  const handleSelectHost = (id) => {
    setSelectedHostId(id);
  };

  const handleDismissToast = () => {
    setToast(null);
  };

  if (!isAuthenticated) {
    return <LoginConsole onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      background: 'var(--bg-base)',
      color: 'var(--color-text)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Scanline CRT overlay for aesthetic */}
      <div className="scanline-overlay" />

      {/* Topbar */}
      <Topbar
        hosts={hosts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedHost={selectedHost}
      />

      {/* Main Workspace */}
      <div style={{
        display: 'flex',
        flex: 1,
        marginTop: '56px', // height of Topbar
        height: 'calc(100vh - 56px)',
        overflow: 'hidden',
      }}>
        {/* Host Roster (Left panel) */}
        <HostRoster
          hosts={hosts}
          selectedId={selectedHostId}
          onSelect={handleSelectHost}
        />

        {/* Selected Host Details (Main grid on right) */}
        <main style={{
          flex: 1,
          height: '100%',
          overflow: 'hidden',
          background: 'rgba(8,16,21,0.3)',
          position: 'relative',
        }}>
          <AnimatePresence mode="wait">
            {selectedHost ? (
              activeTab === 'telemetry' ? (
                <HostPanel
                  key={selectedHost.id}
                  host={selectedHost}
                  updateHost={updateHost}
                  setToast={setToast}
                />
              ) : (
                <IncubationLabVault3D
                  key={`lab-${selectedHost.id}`}
                  host={selectedHost}
                  hosts={hosts}
                  onSelect={handleSelectHost}
                />
              )
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--color-text-dim)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                }}
              >
                SELECT A HOST FROM THE ROSTER TO INITIATE SYNC
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Toast Alert Notifications */}
      <Toast toast={toast} onDismiss={handleDismissToast} />
    </div>
  );
}

export default App;
