// CompliancePressureMeter.jsx — Countdown bar for critical/emergence hosts
import { motion } from 'framer-motion';
import { VeinCard } from '../ui/VeinCard';
import { Clock } from 'lucide-react';

function getPressureColor(value) {
  if (value > 70) return '#EF4444';
  if (value > 40) return '#F59E0B';
  return '#45D9C4';
}

export function CompliancePressureMeter({ host }) {
  const val = Math.max(0, Math.min(100, host.compliancePressure || 0));
  const color = getPressureColor(val);
  const isEmergency = host.status === 'critical' || host.status === 'emergence';
  const timeLabel = !isEmergency
    ? 'NOMINAL STATUS'
    : val <= 0
    ? 'PATHOLOGY CRITICAL LIMIT'
    : `${Math.round(val)}% TIME REMAINING`;

  return (
    <VeinCard status={host.status} style={{ padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Clock size={13} color={color} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.08em', flex: 1 }}>
          BIOMEMBRANE INSTABILITY ACCELERATION
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color,
          ...(val <= 0 ? { animation: 'compliance-blink 0.8s ease-in-out infinite' } : {}),
        }}>
          {timeLabel}
        </div>
      </div>

      {/* Track */}
      <div style={{
        height: '8px', borderRadius: '4px',
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden', position: 'relative',
      }}>
        <motion.div
          animate={{ width: `${val}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: '4px',
            boxShadow: `0 0 10px ${color}55`,
            position: 'relative',
          }}
        >
          {/* Shimmer pulse */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
              background: `linear-gradient(90deg, transparent, ${color}50, transparent)`,
              width: '40%',
            }}
          />
        </motion.div>
      </div>

      {val <= 0 && (
        <div style={{
          marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: '#EF4444', textAlign: 'center', letterSpacing: '0.1em',
          animation: 'compliance-blink 0.8s ease-in-out infinite',
        }}>
          ⚠ PATHOLOGY ALERT ACTIVATED — SURGICAL EXTRACTION RECOMMENDED
        </div>
      )}
    </VeinCard>
  );
}
