import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Eye, Dna, CheckCircle2 } from 'lucide-react';

export default function LoginConsole({ onLogin }) {
  const [scanState, setScanState] = useState('idle'); // idle, scanning, success, dna-matching, booting
  const [scanProgress, setScanProgress] = useState(0);
  const [decryptText, setDecryptText] = useState('SYSTEM SECURE // AWAITING RETINAL CALIBRATION');
  const [dnaPairsMatched, setDnaPairsMatched] = useState(0);
  const [dnaLines, setDnaLines] = useState([]);
  const [loadingStep, setLoadingStep] = useState(0);

  // Retinal scanner simulation
  const startScan = () => {
    if (scanState !== 'idle') return;
    setScanState('scanning');
    setScanProgress(0);
    setDecryptText('INITIATING BIO-SPECTRA RETINAL SCAN...');
  };

  useEffect(() => {
    let interval;
    if (scanState === 'scanning') {
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState('success');
            setDecryptText('RETINA OK // INITIATING GESTATION SYNC...');
            setTimeout(() => {
              setScanState('dna-matching');
            }, 800);
            return 100;
          }
          return prev + 4;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [scanState]);

  // DNA sequencing transition phase
  useEffect(() => {
    let interval;
    if (scanState === 'dna-matching') {
      const bases = ['A-T', 'G-C', 'C-G', 'T-A'];
      let paired = 0;
      setDecryptText('LOADING INCUBATOR GENE STRANDS...');

      interval = setInterval(() => {
        if (paired >= 16) {
          clearInterval(interval);
          setScanState('booting');
          setDecryptText('CHAMBER SYNTAX OK // LAUNCHING WORKSPACE...');
          setTimeout(() => {
            initiateBoot();
          }, 400);
        } else {
          paired += 1;
          setDnaPairsMatched(paired);
          const basePick = bases[paired % 4];
          setDnaLines(prev => [
            ...prev.slice(-3),
            `STRAND-${(paired * 42).toString(16).toUpperCase()} // INDEX ${basePick} ... LOADED [OK]`
          ]);
        }
      }, 120);
    }
    return () => clearInterval(interval);
  }, [scanState]);

  // System loader phase
  const initiateBoot = () => {
    setTimeout(() => {
      setLoadingStep(1);
    }, 500);
    setTimeout(() => {
      setLoadingStep(2);
    }, 1000);
    setTimeout(() => {
      setLoadingStep(3);
    }, 1500);
    setTimeout(() => {
      onLogin();
    }, 2200);
  };

  // Helper values for rendering double helix
  const helixNodes = 16;
  const helixWidth = 440;
  const helixHeight = 160;

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: '#04070a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      color: '#F2FBFA',
    }}>
      {/* Scanline CRT overlay */}
      <div className="scanline-overlay" />

      {/* Cyber Decorators */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(69,217,196,0.3)', pointerEvents: 'none' }}>
        SEC-ID // SYSTEM-NEXUS-NODE-091
      </div>
      <div style={{ position: 'absolute', bottom: '24px', right: '24px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(69,217,196,0.3)', pointerEvents: 'none' }}>
        AMAR-CONSOLE-AUTH // GESTATION MONITOR
      </div>

      <AnimatePresence mode="wait">
        
        {/* Phase 1: Retinal authentication gateway */}
        {(scanState === 'idle' || scanState === 'scanning' || scanState === 'success') && (
          <motion.div
            key="login-auth"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '400px', background: '#0c161c', border: '1px solid rgba(69, 217, 196, 0.18)',
              borderRadius: '20px', padding: '32px', boxShadow: '0 0 50px rgba(69, 217, 196, 0.04)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
              position: 'relative',
            }}
          >
            {/* Corner Bracket Decorators */}
            <div style={{ position: 'absolute', top: 12, left: 12, width: 14, height: 14, borderTop: '2px solid #45D9C4', borderLeft: '2px solid #45D9C4' }} />
            <div style={{ position: 'absolute', top: 12, right: 12, width: 14, height: 14, borderTop: '2px solid #45D9C4', borderRight: '2px solid #45D9C4' }} />
            <div style={{ position: 'absolute', bottom: 12, left: 12, width: 14, height: 14, borderBottom: '2px solid #45D9C4', borderLeft: '2px solid #45D9C4' }} />
            <div style={{ position: 'absolute', bottom: 12, right: 12, width: 14, height: 14, borderBottom: '2px solid #45D9C4', borderRight: '2px solid #45D9C4' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: '#45D9C4', letterSpacing: '0.12em' }}>NEXUS SYSTEM INTERFACE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(242,251,250,0.4)', letterSpacing: '0.06em', marginTop: '4px' }}>
                BIOMETRIC COMPLIANCE GATEWAY // LEVEL-4 AUTH
              </div>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(69, 217, 196, 0.1)',
              borderRadius: '8px', padding: '10px 14px', width: '100%', textAlign: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: scanState === 'success' ? '#45D9C4' : scanState === 'scanning' ? '#B58BFF' : 'rgba(242,251,250,0.65)',
            }}>
              {decryptText}
            </div>

            {/* Glowing scan ring button */}
            <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                style={{
                  position: 'absolute', width: '170px', height: '170px', borderRadius: '50%',
                  border: '1.2px dashed rgba(69,217,196,0.22)',
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                style={{
                  position: 'absolute', width: '146px', height: '146px', borderRadius: '50%',
                  border: '1.5px solid transparent', borderTopColor: '#B58BFF', borderBottomColor: '#45D9C4',
                  opacity: scanState === 'scanning' ? 0.8 : 0.25,
                }}
              />

              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(69,217,196,0.3)' }}
                whileTap={{ scale: 0.96 }}
                onClick={startScan}
                disabled={scanState === 'scanning'}
                style={{
                  width: '110px', height: '110px', borderRadius: '50%',
                  background: scanState === 'scanning' ? 'rgba(69,217,196,0.06)' : 'rgba(69,217,196,0.12)',
                  border: `2px solid ${scanState === 'success' ? '#45D9C4' : 'rgba(69,217,196,0.45)'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden', outline: 'none',
                }}
              >
                <AnimatePresence mode="wait">
                  {scanState === 'scanning' ? (
                    <motion.div
                      key="scanning-laser"
                      style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <motion.div
                        animate={{ y: ['-10%', '110%', '-10%'] }}
                        transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
                        style={{
                          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                          background: '#45D9C4', boxShadow: '0 0 10px #45D9C4',
                        }}
                      />
                      <Eye size={36} color="#45D9C4" opacity={0.3} />
                    </motion.div>
                  ) : (
                    <Eye size={36} color="#45D9C4" />
                  )}
                </AnimatePresence>
              </motion.button>

              <div style={{
                position: 'absolute', bottom: '-8px',
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: scanState === 'scanning' ? '#B58BFF' : '#45D9C4',
                letterSpacing: '0.04em',
              }}>
                {scanState === 'scanning' ? `SCANNING ${scanProgress}%` : 'HOLD TO AUTHENTICATE'}
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(242,251,250,0.3)', textAlign: 'center' }}>
              NEXUS CORE LAB TELEMETRY SHIELD ENGAGED
            </div>
          </motion.div>
        )}

        {/* Phase 2: DNA Match double-helix sequencing transition */}
        {scanState === 'dna-matching' && (
          <motion.div
            key="dna-transition"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.35 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '640px', background: '#0b1319', border: '1px solid rgba(181, 139, 255, 0.25)',
              borderRadius: '24px', padding: '36px', boxShadow: '0 0 80px rgba(181, 139, 255, 0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: '#B58BFF', letterSpacing: '0.15em', textAlign: 'center' }}>
                SYNCHRONIZING INCUBATOR GENE PATHWAYS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(242,251,250,0.4)', textAlign: 'center', marginTop: '4px' }}>
                LOADING GESTATION GENE STRANDS // STABILIZING VECTOR BASES
              </div>
            </div>

            {/* SVG Double Helix Sequence */}
            <div style={{ width: '100%', height: `${helixHeight}px`, background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="100%" viewBox={`0 0 ${helixWidth} ${helixHeight}`}>
                {/* Horizontal reference baseline */}
                <line x1="20" y1={helixHeight/2} x2={helixWidth-20} y2={helixHeight/2} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 4" />

                {Array.from({ length: helixNodes }).map((_, i) => {
                  const x = 30 + (i / (helixNodes - 1)) * (helixWidth - 60);
                  const angle = (i * 0.7);
                  const y1 = helixHeight / 2 + Math.sin(angle) * 35;
                  const y2 = helixHeight / 2 - Math.sin(angle) * 35;
                  
                  const isMatched = i < dnaPairsMatched;
                  const strokeCol = isMatched ? '#45D9C4' : 'rgba(255,255,255,0.06)';
                  const leftColor = isMatched ? '#45D9C4' : 'rgba(255,255,255,0.15)';
                  const rightColor = isMatched ? '#B58BFF' : 'rgba(255,255,255,0.15)';

                  return (
                    <g key={i}>
                      {/* Connecting vertical nucleotide bar */}
                      <line
                        x1={x} y1={y1} x2={x} y2={y2}
                        stroke={strokeCol}
                        strokeWidth={isMatched ? 1.5 : 1}
                        style={{ transition: 'stroke 0.2s' }}
                      />

                      {/* Left Helix Node */}
                      <circle
                        cx={x} cy={y1} r={isMatched ? 4.5 : 3}
                        fill={leftColor}
                        style={{ filter: isMatched ? 'drop-shadow(0 0 4px #45D9C4)' : 'none', transition: 'all 0.2s' }}
                      />

                      {/* Right Helix Node */}
                      <circle
                        cx={x} cy={y2} r={isMatched ? 4.5 : 3}
                        fill={rightColor}
                        style={{ filter: isMatched ? 'drop-shadow(0 0 4px #B58BFF)' : 'none', transition: 'all 0.2s' }}
                      />
                    </g>
                  );
                })}
              </svg>

              <div style={{
                position: 'absolute', top: '10px', right: '12px',
                fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#45D9C4',
              }}>
                COHERENCE: {((dnaPairsMatched / 16) * 100).toFixed(0)}%
              </div>
            </div>

            {/* Running DNA matching lines */}
            <div style={{
              width: '100%', display: 'flex', flexDirection: 'column', gap: '4px',
              background: 'rgba(0,0,0,0.4)', padding: '12px 16px', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.04)', height: '76px',
            }}>
              {dnaLines.map((line, idx) => (
                <div key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#86EFAC' }}>
                  &gt;&gt; {line}
                </div>
              ))}
              {dnaLines.length === 0 && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(242,251,250,0.3)', textAlign: 'center', paddingTop: '16px' }}>
                  CALIBRATING SPECTRUM SEQUENCER...
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Phase 3: Console secure boot loader */}
        {scanState === 'booting' && (
          <motion.div
            key="boot-screen"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '380px', display: 'flex', flexDirection: 'column', gap: '16px',
              fontFamily: 'var(--font-mono)', fontSize: '11px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={14} className="animate-spin" color="#45D9C4" />
              <span style={{ color: '#45D9C4', fontWeight: 600 }}>SECURE BOOT INTERFACE INITIATED...</span>
            </div>

            <div style={{
              display: 'flex', flexDirection: 'column', gap: '8px',
              background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: loadingStep >= 1 ? '#45D9C4' : 'rgba(242,251,250,0.25)' }}>
                {loadingStep >= 1 ? <CheckCircle2 size={13} /> : <span style={{ width: 13, height: 13, border: '1px solid currentColor', borderRadius: '50%' }} />}
                <span>DECRYPTING CNS KEYMAPS...</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: loadingStep >= 2 ? '#45D9C4' : 'rgba(242,251,250,0.25)' }}>
                {loadingStep >= 2 ? <CheckCircle2 size={13} /> : <span style={{ width: 13, height: 13, border: '1px solid currentColor', borderRadius: '50%' }} />}
                <span>SYNCING SYMBIONT GESTATION CHAMBERS...</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: loadingStep >= 3 ? '#45D9C4' : 'rgba(242,251,250,0.25)' }}>
                {loadingStep >= 3 ? <CheckCircle2 size={13} /> : <span style={{ width: 13, height: 13, border: '1px solid currentColor', borderRadius: '50%' }} />}
                <span>ESTABLISHING COMPLIANCE DATA-LINK...</span>
              </div>
            </div>

            <div style={{ color: 'rgba(242,251,250,0.35)', textAlign: 'center', fontSize: '9px' }}>
              SYNTH-MEDIC CONSOLE LOADED // WELCOME BACK REYES
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
