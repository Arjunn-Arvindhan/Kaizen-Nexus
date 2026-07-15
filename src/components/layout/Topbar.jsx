// Topbar.jsx — Fixed top bar with shift status, alert count, Dr. Ama's ID
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Shield, Radio } from 'lucide-react';

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const DOCTOR_DETAILS = {
  'Dr. Ama Reyes': { title: 'LEAD SYNTH-MEDIC', shift: 'SHIFT A' },
  'Dr. Caleb Vance': { title: 'NEURO-BIOLOGIST', shift: 'SHIFT B' },
  'Dr. Elena Rostova': { title: 'XENO-GENETICIST', shift: 'SHIFT C' },
};

export function Topbar({ hosts, activeTab, onTabChange, selectedHost }) {
  const alertCount = hosts.filter(h => h.status === 'critical' || h.status === 'emergence' || h.status === 'watch').length;
  const emergenceCount = hosts.filter(h => h.status === 'emergence').length;
  const criticalCount = hosts.filter(h => h.status === 'critical').length;

  const now = new Date();

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '56px',
      background: 'rgba(8,16,21,0.95)',
      borderBottom: '1px solid rgba(69,217,196,0.15)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: '20px',
      boxShadow: '0 2px 20px rgba(69,217,196,0.06)',
    }}>
      {/* Logo / System name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <Activity size={20} color="#45D9C4" />
        </motion.div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600,
          color: '#45D9C4', letterSpacing: '0.08em',
        }}>
          NEXUS
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(242,251,250,0.4)', letterSpacing: '0.06em' }}>
          SYNTH-MEDIC CONSOLE
        </span>
      </div>

      {/* Live indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#45D9C4' }}
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(69,217,196,0.7)', letterSpacing: '0.1em' }}>
          LIVE
        </span>
      </div>

      {/* Shift clock */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(242,251,250,0.45)', marginLeft: 4, flexShrink: 0 }}>
        2091-07-15 · {formatTime(now)} UTC+8
      </div>

      {/* Spacer to push tabs to center */}
      <div style={{ flex: 1 }} />

      {/* Central View Switches */}
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        {[
          { id: 'telemetry', label: 'BIOLOGICAL TELEMETRY' },
          { id: 'lab',       label: 'GESTATION CHAMBER VISUALS' },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                background: active ? 'rgba(69,217,196,0.1)' : 'transparent',
                border: `1px solid ${active ? '#45D9C4' : 'rgba(255,255,255,0.08)'}`,
                color: active ? '#45D9C4' : 'rgba(242,251,250,0.5)',
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.08em', borderRadius: '6px', padding: '6px 14px',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: active ? '0 0 10px rgba(69,217,196,0.25)' : 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Spacer to push alert badges to right */}
      <div style={{ flex: 1 }} />

      {/* Alert badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {emergenceCount > 0 && (
          <motion.div
            className="pulse-alert"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(181,139,255,0.15)',
              border: '1px solid rgba(181,139,255,0.5)',
              borderRadius: '8px', padding: '4px 10px',
              fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#B58BFF',
            }}
          >
            <Radio size={13} />
            {emergenceCount} EMERGENCE
          </motion.div>
        )}

        {criticalCount > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.45)',
            borderRadius: '8px', padding: '4px 10px',
            fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EF4444',
          }}>
            <AlertTriangle size={13} />
            {criticalCount} CRITICAL
          </div>
        )}

        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(69,217,196,0.08)',
          border: '1px solid rgba(69,217,196,0.2)',
          borderRadius: '8px', padding: '4px 10px',
          fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(242,251,250,0.6)',
        }}>
          <Activity size={12} />
          {alertCount} ALERTS
        </div>
      </div>

      {/* Doctor caseload ID Badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px',
        padding: '6px 14px',
        background: 'rgba(69,217,196,0.07)',
        border: '1px solid rgba(69,217,196,0.2)',
        borderRadius: '10px',
        flexShrink: 0,
      }}>
        <Shield size={14} color="#45D9C4" />
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text)' }}>
            {selectedHost?.assignedDoctor || 'Dr. Ama Reyes'}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(242,251,250,0.45)', letterSpacing: '0.05em' }}>
            {(DOCTOR_DETAILS[selectedHost?.assignedDoctor] || DOCTOR_DETAILS['Dr. Ama Reyes']).title} · {(DOCTOR_DETAILS[selectedHost?.assignedDoctor] || DOCTOR_DETAILS['Dr. Ama Reyes']).shift}
          </div>
        </div>
      </div>
    </header>
  );
}
