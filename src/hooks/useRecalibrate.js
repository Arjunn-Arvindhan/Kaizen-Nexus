// useRecalibrate.js — handles the Recalibrate quick action
import { useState, useCallback } from 'react';

export function useRecalibrate(updateHost, setToast) {
  const [recalibrating, setRecalibrating] = useState(false);

  const recalibrate = useCallback((host) => {
    if (recalibrating) return;
    setRecalibrating(true);

    setTimeout(() => {
      const roll = Math.random();
      let outcome, message;

      if (roll < 0.33) {
        // Stabilized
        outcome = 'stabilized';
        message = 'RECALIBRATION SUCCESSFUL — Host downgraded to WATCH status. Fusion integrity improving.';
        updateHost(host.id, h => ({
          ...h,
          status: 'watch',
          fusionIntegrity: Math.min(100, h.fusionIntegrity + 15),
          complianceStatus: 'Under Review',
          compliancePressure: 0,
          sedated: false,
          lockdown: false,
        }));
      } else if (roll < 0.66) {
        // Partial
        outcome = 'partial';
        message = 'PARTIAL RESPONSE — Emergence state persists. Fusion integrity improved marginally. Continue monitoring.';
        updateHost(host.id, h => ({
          ...h,
          fusionIntegrity: Math.min(100, h.fusionIntegrity + 8),
        }));
      } else {
        // Worsened
        outcome = 'worsened';
        message = 'RECALIBRATION FAILED — Host condition deteriorated. Status elevated to CRITICAL. Compliance alerted.';
        updateHost(host.id, h => ({
          ...h,
          status: 'critical',
          fusionIntegrity: Math.max(5, h.fusionIntegrity - 10),
          complianceStatus: 'Critical Flag',
          compliancePressure: 80,
        }));
      }

      setToast({ message, outcome });
      setRecalibrating(false);
    }, 1600);
  }, [recalibrating, updateHost, setToast]);

  return { recalibrating, recalibrate };
}
