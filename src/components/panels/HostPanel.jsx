// HostPanel.jsx — Main grid for selected host, all panels assembled
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

import { FusionIntegrityGauge }     from './FusionIntegrityGauge';
import { BioSyncGraph }             from './BioSyncGraph';
import { CognitionDriftRadar }      from './CognitionDriftRadar';
import { GenomeMap }                from './GenomeMap';
import { InteriorView }             from './InteriorView';
import { IncidentFeed }             from './IncidentFeed';
import { ComplianceBadge }          from './ComplianceBadge';
import { CompliancePressureMeter }  from './CompliancePressureMeter';
import { QuickActions }             from './QuickActions';
import SpecimenContainment          from './SpecimenContainment';
import OrganismHeart3D              from './OrganismHeart3D';
import SpecimenIncubator3D          from './SpecimenIncubator3D';
import GeneSequencer                from './GeneSequencer';
import TissueScanner                from './TissueScanner';
import { useRecalibrate }           from '../../hooks/useRecalibrate';

const STATUS_LABELS = {
  stable:    { label: 'STABLE',    color: '#45D9C4' },
  watch:     { label: 'WATCH',     color: '#F59E0B' },
  critical:  { label: 'CRITICAL',  color: '#EF4444' },
  emergence: { label: 'EMERGENCE', color: '#B58BFF' },
};

const SYMBIONT_TAG_COLOR = {
  'Coral-Vascular':     '#45D9C4',
  'Mycelial-Neural':    '#B58BFF',
  'Crystalline-Reflex': '#7DD3FC',
  'Vine-Cognitive':     '#86EFAC',
};

export function HostPanel({ host, updateHost, setToast }) {
  const [activePanelTab, setActivePanelTab] = useState('console'); // console, genome, interior
  const { recalibrating, recalibrate } = useRecalibrate(updateHost, setToast);

  const sc = STATUS_LABELS[host.status];
  const symColor = SYMBIONT_TAG_COLOR[host.symbiontType];

  const handleSedate = useCallback(() => {
    updateHost(host.id, h => ({
      ...h,
      sedated: true,
      fusionIntegrity: Math.max(10, h.fusionIntegrity - 4),
    }));
    setToast({ message: `Neuro-chemical sedation protocol initiated for ${host.name}. Organism metabolic activity decreased.`, outcome: 'partial' });
  }, [host.id, host.name, updateHost, setToast]);

  const handleExtract = useCallback(() => {
    updateHost(host.id, h => ({
      ...h,
      lockdown: true,
      complianceStatus: 'Critical Flag',
      compliancePressure: 100,
    }));
    setToast({ message: `Emergency surgical extraction protocol engaged for ${host.name}. Gestation chamber lockdown active.`, outcome: 'worsened' });
  }, [host.id, host.name, updateHost, setToast]);

  const handleFlag = useCallback(() => {
    updateHost(host.id, h => ({
      ...h,
      complianceStatus: 'Under Review',
    }));
    setToast({ message: `${host.name} flagged for cytological pathology review.`, outcome: 'partial' });
  }, [host.id, host.name, updateHost, setToast]);

  const handleRecalib = useCallback(() => recalibrate(host), [host, recalibrate]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={host.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          height: '100%', overflow: 'hidden', position: 'relative',
        }}
      >
        {/* Critical compliance lockdown overlay */}
        {host.lockdown && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 100,
            background: 'rgba(239, 68, 68, 0.15)',
            backdropFilter: 'blur(6px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #EF4444',
            padding: '24px',
          }}>
            <motion.div
              animate={{ scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              style={{
                background: '#0d1a21', border: '1px solid #EF4444',
                borderRadius: '16px', padding: '32px', maxWidth: '420px', textAlign: 'center',
                boxShadow: '0 0 30px rgba(239,68,68,0.3)',
              }}
            >
              <ShieldAlert size={48} color="#EF4444" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600, color: '#EF4444', letterSpacing: '0.08em', marginBottom: '8px' }}>
                CRITICAL GESTATION LOCKDOWN
              </h3>
              <p style={{ fontSize: '12px', color: 'rgba(242,251,250,0.8)', lineHeight: 1.4, marginBottom: '20px' }}>
                Surgical extraction protocol has been activated for <strong>{host.name}</strong>. Gestation sensors are locked down to prevent biological tissue rejection.
              </p>
              
              {/* Progress bar countdown */}
              <div style={{ background: 'rgba(255,255,255,0.06)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 60, ease: 'linear' }}
                  style={{ height: '100%', background: '#EF4444' }}
                />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#EF4444' }}>
                SURGICAL EXTRACTION ETA: 60 SECONDS
              </div>
              
              <button
                onClick={() => {
                  updateHost(host.id, h => ({ ...h, lockdown: false, status: 'watch', compliancePressure: 0 }));
                  setToast({ message: 'Emergency extraction aborted. Gestation console unlocked.', outcome: 'stabilized' });
                }}
                style={{
                  marginTop: '20px', background: 'rgba(239,68,68,0.1)', border: '1px solid #EF4444',
                  borderRadius: '8px', padding: '6px 14px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#EF4444',
                }}
              >
                ABORT SURGICAL EXTRACTION
              </button>
            </motion.div>
          </div>
        )}

        {/* ── Host Header ── */}
        <div style={{
          padding: '14px 20px 12px',
          borderBottom: '1px solid rgba(69,217,196,0.15)',
          display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0,
          background: 'rgba(8, 16, 21, 0.6)',
        }}>
          {/* Status dot */}
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 10, height: 10, borderRadius: '50%', background: sc.color, boxShadow: `0 0 10px ${sc.color}`, flexShrink: 0 }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
                {host.name}
              </h2>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', color: symColor,
                background: `${symColor}15`, border: `1px solid ${symColor}30`,
                borderRadius: '5px', padding: '1px 7px',
              }}>
                {host.symbiontType}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', color: sc.color,
                letterSpacing: '0.1em', fontWeight: 600,
              }}>
                {sc.label}
              </span>
              <ComplianceBadge host={host} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)', marginTop: '3px' }}>
              ID: {host.id.toUpperCase()} · Memb: {host.fusionIntegrity}% · Instability: {host.compliancePressure.toFixed(0)}%
            </div>
          </div>

          {/* ── Tabs Selector matching user image specs ── */}
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {[
              { id: 'console',  label: 'CONSOLE' },
              { id: 'genome',   label: '3D GENOME' },
              { id: 'interior', label: '3D INTERIOR' },
            ].map((tab) => {
              const active = activePanelTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePanelTab(tab.id)}
                  style={{
                    background: active ? 'rgba(69,217,196,0.12)' : 'transparent',
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
        </div>

        {/* ── Main Scrollable Content ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            
            {/* Tab 1: CONSOLE GRID (3-row structure) */}
            {activePanelTab === 'console' && (
              <motion.div
                key="console-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {/* Row 1: Gauge (40%) and Vital Oscilloscope (60%) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
                  <div style={{ gridColumn: 'span 5' }}>
                    <FusionIntegrityGauge host={host} />
                  </div>
                  <div style={{ gridColumn: 'span 7' }}>
                    <BioSyncGraph host={host} />
                  </div>
                </div>

                {/* Row 2: Instability (33%), Radar (33%), Quick Actions Grid (33%) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <CompliancePressureMeter host={host} />
                  <CognitionDriftRadar host={host} />
                  <QuickActions
                    host={host}
                    recalibrating={recalibrating}
                    onRecalibrate={handleRecalib}
                    onSedate={handleSedate}
                    onExtract={handleExtract}
                    onFlag={handleFlag}
                  />
                </div>

                {/* Row 3: Full-width Incident Log */}
                <div style={{ width: '100%' }}>
                  <IncidentFeed host={host} />
                </div>
              </motion.div>
            )}

            {/* Tab 2: 3D GENOME */}
            {activePanelTab === 'genome' && (
              <motion.div
                key="genome-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-4"
              >
                <div>
                  <GenomeMap host={host} />
                </div>
                <div className="flex flex-col gap-4">
                  <GeneSequencer host={host} />
                  <TissueScanner host={host} />
                </div>
              </motion.div>
            )}

            {/* Tab 3: 3D INTERIOR */}
            {activePanelTab === 'interior' && (
              <motion.div
                key="interior-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-[6.2fr_3.8fr] gap-4"
                style={{ minHeight: '520px' }}
              >
                <div style={{ position: 'relative', height: '100%', minHeight: '480px' }}>
                  <InteriorView host={host} onClose={() => setActivePanelTab('console')} />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <OrganismHeart3D host={host} />
                    <SpecimenIncubator3D host={host} />
                  </div>
                  <SpecimenContainment host={host} />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
