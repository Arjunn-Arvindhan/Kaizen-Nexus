// Toast.jsx — Outcome notification banner
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

const OUTCOME_STYLES = {
  stabilized: {
    border: 'rgba(69,217,196,0.6)',
    glow: 'rgba(69,217,196,0.3)',
    icon: CheckCircle,
    iconColor: '#45D9C4',
    label: 'RECALIBRATION SUCCESSFUL',
  },
  partial: {
    border: 'rgba(245,158,11,0.6)',
    glow: 'rgba(245,158,11,0.3)',
    icon: AlertTriangle,
    iconColor: '#F59E0B',
    label: 'PARTIAL RESPONSE',
  },
  worsened: {
    border: 'rgba(239,68,68,0.6)',
    glow: 'rgba(239,68,68,0.3)',
    icon: XCircle,
    iconColor: '#EF4444',
    label: 'RECALIBRATION FAILED',
  },
};

export function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onDismiss, 5000);
    return () => clearTimeout(id);
  }, [toast, onDismiss]);

  const style = toast ? OUTCOME_STYLES[toast.outcome] : null;
  const Icon = style?.icon;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: '#0d1a21',
            border: `1px solid ${style.border}`,
            borderRadius: '12px',
            padding: '16px 24px',
            maxWidth: '520px',
            width: '90vw',
            boxShadow: `0 0 30px ${style.glow}`,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <Icon size={22} color={style.iconColor} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: style.iconColor, fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              {style.label}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: 1.4 }}>
              {toast.message}
            </div>
          </div>
          <button
            onClick={onDismiss}
            style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', padding: 0, flexShrink: 0 }}
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
