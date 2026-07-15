// useLiveData.js — drives all live simulation for the NEXUS console
import { useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_HOSTS, createNewBioSyncPoint } from '../data/mockHosts';

const BIOSYNC_INTERVAL = 2000;       // push new BioSync point every 2s
const COMPLIANCE_TICK_INTERVAL = 5000; // tick compliance pressure every 5s
const BIOSYNC_WINDOW = 30;            // rolling window size

export function useLiveData() {
  const [hosts, setHosts] = useState(() => INITIAL_HOSTS);
  const hostsRef = useRef(hosts);
  hostsRef.current = hosts;

  // BioSync stream
  useEffect(() => {
    const id = setInterval(() => {
      setHosts(prev =>
        prev.map(host => {
          const last = host.bioSync[host.bioSync.length - 1];
          let newPoint;
          if (host.sedated) {
            newPoint = {
              timestamp: Date.now(),
              heartRate: Math.max(30, Math.min(36, (last?.heartRate || 33) + Math.round((Math.random() - 0.5) * 2))),
              neuralSync: Math.max(8, Math.min(13, (last?.neuralSync || 10) + Math.round((Math.random() - 0.5) * 1.5))),
            };
          } else {
            newPoint = createNewBioSyncPoint(last, host.status);
          }
          const updated = [...host.bioSync, newPoint];
          return {
            ...host,
            // Mirror back live heartRate directly to the object level for 3D visualization access
            heartRate: newPoint.heartRate,
            bioSync: updated.length > BIOSYNC_WINDOW ? updated.slice(-BIOSYNC_WINDOW) : updated,
          };
        })
      );
    }, BIOSYNC_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Compliance pressure countdown
  useEffect(() => {
    const id = setInterval(() => {
      setHosts(prev =>
        prev.map(host => {
          if (host.status !== 'critical' && host.status !== 'emergence') return host;
          const decrement = host.status === 'emergence' ? 1.5 : 1;
          return {
            ...host,
            compliancePressure: Math.max(0, host.compliancePressure - decrement),
          };
        })
      );
    }, COMPLIANCE_TICK_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Subtle watch→critical escalation
  useEffect(() => {
    const id = setInterval(() => {
      setHosts(prev =>
        prev.map(host => {
          if (host.status !== 'watch' || host.fusionIntegrity > 40) return host;
          if (Math.random() < 0.08) {
            return {
              ...host,
              status: 'critical',
              complianceStatus: 'Under Review',
              compliancePressure: 60 + Math.floor(Math.random() * 20),
            };
          }
          return host;
        })
      );
    }, 10000);
    return () => clearInterval(id);
  }, []);

  const updateHost = useCallback((id, updater) => {
    setHosts(prev => prev.map(h => (h.id === id ? updater(h) : h)));
  }, []);

  return { hosts, setHosts, updateHost };
}
