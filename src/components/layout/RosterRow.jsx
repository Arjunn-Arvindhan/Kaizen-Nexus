// RosterRow.jsx — A single host row in the Host Roster
import { motion } from 'framer-motion';
import { Activity, Zap, Brain, Layers, Leaf } from 'lucide-react';

const STATUS_CONFIG = {
  stable:    { color: '#45D9C4', label: 'STABLE',    bg: 'rgba(69,217,196,0.08)' },
  watch:     { color: '#F59E0B', label: 'WATCH',     bg: 'rgba(245,158,11,0.1)' },
  critical:  { color: '#EF4444', label: 'CRITICAL',  bg: 'rgba(239,68,68,0.1)' },
  emergence: { color: '#B58BFF', label: 'EMERGENCE', bg: 'rgba(181,139,255,0.1)' },
};

const SYMBIONT_ICONS = {
  'Coral-Vascular':    { icon: Activity, color: '#45D9C4' },
  'Mycelial-Neural':   { icon: Brain,    color: '#B58BFF' },
  'Crystalline-Reflex':{ icon: Layers,   color: '#7DD3FC' },
  'Vine-Cognitive':    { icon: Leaf,     color: '#86EFAC' },
};

const SHORT_TYPE = {
  'Coral-Vascular':    'CORAL-V',
  'Mycelial-Neural':   'MYCEL-N',
  'Crystalline-Reflex':'CRYST-R',
  'Vine-Cognitive':    'VINE-C',
};

const STATUS_ONE_LINER = {
  stable:    'All parameters nominal',
  watch:     'Minor deviation — monitoring',
  critical:  'Integration degrading — intervention pending',
  emergence: 'Classification undefined — Pathology flagged',
};

export function RosterRow({ host, selected, onClick }) {
  const sc = STATUS_CONFIG[host.status];
  const sym = SYMBIONT_ICONS[host.symbiontType];
  const SymIcon = sym.icon;
  const isUnstable = host.status === 'emergence' || host.status === 'critical';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className={isUnstable ? 'glitch' : ''}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 14px',
        borderRadius: '10px',
        marginBottom: '4px',
        cursor: 'pointer',
        background: selected ? sc.bg : 'transparent',
        border: selected
          ? `1px solid ${sc.color}44`
          : '1px solid transparent',
        boxShadow: selected ? `0 0 12px ${sc.color}22` : 'none',
        transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ background: sc.bg, border: `1px solid ${sc.color}33` }}
    >
      {/* Left status stripe */}
      <div style={{
        width: '3px', height: '36px', borderRadius: '2px',
        background: sc.color,
        flexShrink: 0,
        boxShadow: `0 0 8px ${sc.color}`,
        animation: host.status === 'emergence'
          ? 'pulse-glow-alert 2s ease-in-out infinite'
          : host.status === 'critical'
          ? 'pulse-glow-critical 1.5s ease-in-out infinite'
          : undefined,
      }} />

      {/* Symbiont icon */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: `${sym.color}15`,
        border: `1px solid ${sym.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <motion.div
          animate={
            host.status === 'emergence'
              ? { rotate: 360, scale: [1, 1.15, 1] }
              : host.status === 'critical'
              ? { x: [0, -1.2, 1.2, -1.2, 1.2, 0], scale: [1, 1.1, 1] }
              : { scale: [1, 1.06, 1] }
          }
          transition={{
            repeat: Infinity,
            duration: host.status === 'emergence' ? 5 : host.status === 'critical' ? 0.35 : 2.5,
            ease: 'linear',
          }}
          style={{ display: 'flex' }}
        >
          <SymIcon size={13} color={sym.color} />
        </motion.div>
      </div>

      {/* Name + status */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {host.name}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {STATUS_ONE_LINER[host.status]}
        </div>
      </div>

      {/* Right: type tag + status label */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px', color: sym.color,
          background: `${sym.color}15`, borderRadius: '4px', padding: '1px 5px',
          letterSpacing: '0.05em',
        }}>
          {SHORT_TYPE[host.symbiontType]}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          color: sc.color, letterSpacing: '0.08em',
        }}>
          {sc.label}
        </span>
      </div>
    </motion.div>
  );
}
