// CognitionDriftRadar.jsx — Radar chart with current + 3-day-ago snapshot overlay
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { VeinCard } from '../ui/VeinCard';

export function CognitionDriftRadar({ host }) {
  const cd = host.cognitionDrift;
  const snap = host.cognitionDriftSnapshot;

  const axes = [
    { key: 'memoryStability',    label: 'MEM' },
    { key: 'moodStability',      label: 'MOOD' },
    { key: 'impulseControl',     label: 'IMPULSE' },
    { key: 'identityContinuity', label: 'IDENTITY' },
  ];

  const currentData = axes.map(a => ({ subject: a.label, current: cd[a.key], snapshot: snap[a.key] }));

  const radarColor = host.status === 'emergence' ? '#B58BFF'
    : host.status === 'critical' ? '#EF4444'
    : host.status === 'watch'    ? '#F59E0B'
    : '#45D9C4';

  return (
    <VeinCard status={host.status} style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
          NEURAL COHERENCE & IDENTITY BALANCE
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: 10, height: 2, background: radarColor }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(242,251,250,0.4)' }}>NOW</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: 10, height: 2, background: radarColor, opacity: 0.3, borderStyle: 'dashed' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(242,251,250,0.4)' }}>3D AGO</span>
          </div>
        </div>
      </div>

      <div style={{ height: 190 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={currentData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <PolarGrid stroke="rgba(255,255,255,0.07)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'rgba(242,251,250,0.45)', fontWeight: 500 }}
            />
            {/* 3-day snapshot (faded) */}
            <Radar
              name="snapshot"
              dataKey="snapshot"
              stroke={radarColor}
              fill={radarColor}
              fillOpacity={0.06}
              strokeOpacity={0.25}
              strokeWidth={1}
              strokeDasharray="4 3"
            />
            {/* Current */}
            <Radar
              name="current"
              dataKey="current"
              stroke={radarColor}
              fill={radarColor}
              fillOpacity={0.18}
              strokeOpacity={0.9}
              strokeWidth={2}
              style={{ filter: `drop-shadow(0 0 6px ${radarColor}66)` }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Numeric readout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '4px' }}>
        {axes.map(a => {
          const val = cd[a.key];
          const delta = val - snap[a.key];
          return (
            <div key={a.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-dim)' }}>{a.label}</span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: radarColor }}>{val}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: delta < 0 ? '#EF4444' : '#45D9C4' }}>
                  {delta > 0 ? '+' : ''}{delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </VeinCard>
  );
}
