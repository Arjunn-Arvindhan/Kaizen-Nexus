// QuickActions.jsx — Four action buttons, Recalibrate only for emergence
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Scissors, Flag, RefreshCw } from 'lucide-react';

export function QuickActions({ host, recalibrating, onRecalibrate, onSedate, onExtract, onFlag }) {
  const isEmergence = host.status === 'emergence';

  const baseBtn = {
    display: 'flex', alignItems: 'center', gap: '7px',
    padding: '9px 16px', borderRadius: '9px',
    fontSize: '12px', fontWeight: 500,
    border: '1px solid',
    transition: 'all 0.2s',
    flexShrink: 0,
  };

  return (
    <div style={{
      padding: '14px 16px',
      background: 'rgba(8,16,21,0.8)',
      borderTop: '1px solid rgba(69,217,196,0.1)',
      display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-dim)', letterSpacing: '0.1em', flexBasis: '100%', marginBottom: '2px' }}>
        THERAPEUTIC CLINICAL INTERVENTIONS · {host.name}
      </div>

      {/* Sedate Fusion */}
      <motion.button
        whileHover={{ scale: 1.04, boxShadow: '0 0 16px rgba(69,217,196,0.3)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onSedate}
        style={{
          ...baseBtn,
          background: 'rgba(69,217,196,0.1)',
          borderColor: 'rgba(69,217,196,0.3)',
          color: '#45D9C4',
        }}
      >
        <Pill size={14} /> Neuro-Chemical Sedation
      </motion.button>

      {/* Schedule Extraction */}
      <motion.button
        whileHover={{ scale: 1.04, boxShadow: '0 0 16px rgba(239,68,68,0.3)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onExtract}
        style={{
          ...baseBtn,
          background: 'rgba(239,68,68,0.08)',
          borderColor: 'rgba(239,68,68,0.3)',
          color: '#EF4444',
        }}
      >
        <Scissors size={14} /> Surgical Extraction
      </motion.button>

      {/* Flag for Review */}
      <motion.button
        whileHover={{ scale: 1.04, boxShadow: '0 0 16px rgba(245,158,11,0.3)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onFlag}
        style={{
          ...baseBtn,
          background: 'rgba(245,158,11,0.08)',
          borderColor: 'rgba(245,158,11,0.3)',
          color: '#F59E0B',
        }}
      >
        <Flag size={14} /> Flag Mutation Warning
      </motion.button>

      {/* Recalibrate — emergence only */}
      <AnimatePresence>
        {isEmergence && (
          <motion.button
            key="recalibrate"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileHover={!recalibrating ? { scale: 1.04, boxShadow: '0 0 20px rgba(181,139,255,0.5)' } : {}}
            whileTap={!recalibrating ? { scale: 0.97 } : {}}
            onClick={() => !recalibrating && onRecalibrate()}
            disabled={recalibrating}
            style={{
              ...baseBtn,
              background: recalibrating ? 'rgba(181,139,255,0.06)' : 'rgba(181,139,255,0.15)',
              borderColor: recalibrating ? 'rgba(181,139,255,0.2)' : 'rgba(181,139,255,0.6)',
              color: '#B58BFF',
              boxShadow: recalibrating ? 'none' : '0 0 12px rgba(181,139,255,0.25)',
              opacity: recalibrating ? 0.7 : 1,
              position: 'relative',
              overflow: 'hidden',
              cursor: recalibrating ? 'not-allowed' : 'pointer',
            }}
          >
            <motion.div
              animate={recalibrating ? { rotate: 360 } : { rotate: 0 }}
              transition={recalibrating ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
            >
              <RefreshCw size={14} />
            </motion.div>
            {recalibrating ? 'Processing...' : 'Synaptic Calibration'}

            {/* Shimmer on processing */}
            {recalibrating && (
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', top: 0, bottom: 0, left: 0,
                  width: '50%',
                  background: 'linear-gradient(90deg, transparent, rgba(181,139,255,0.2), transparent)',
                }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
