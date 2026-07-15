// BioSyncGraph.jsx — Dual-line scrolling chart: heartRate + neuralSync
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { VeinCard } from '../ui/VeinCard';

function formatTs(ts) {
  const d = new Date(ts);
  return `${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#0d1a21', border: '1px solid rgba(69,217,196,0.3)',
      borderRadius: '8px', padding: '8px 12px',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(242,251,250,0.4)', marginBottom: '4px' }}>
        {label}
      </div>
      {payload.map(p => (
        <div key={p.name} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: p.color }}>
          {p.name === 'heartRate' ? 'HR' : 'NS'}: {p.value}
        </div>
      ))}
    </div>
  );
};

export function BioSyncGraph({ host }) {
  const isUnstable = host.status !== 'stable';
  const glitchClass = isUnstable ? 'glitch' : '';

  return (
    <VeinCard status={host.status} style={{ padding: '24px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
          CARDIO-SYNAPTIC RESONANCE
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: 18, height: 2, background: '#45D9C4', borderRadius: 1 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(242,251,250,0.45)' }}>HEART RATE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: 18, height: 2, background: '#B58BFF', borderRadius: 1 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(242,251,250,0.45)' }}>NEURAL SYNC</span>
          </div>
        </div>
      </div>

      <div className={glitchClass} style={{ height: 140 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={host.bioSync} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTs}
              tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'rgba(242,251,250,0.3)' }}
              interval="preserveStartEnd"
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            />
            <YAxis
              domain={[40, 120]}
              tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'rgba(242,251,250,0.3)' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="#45D9C4"
              strokeWidth={isUnstable ? 1.5 : 2}
              dot={false}
              isAnimationActive={false}
              strokeDasharray={isUnstable ? '4 2' : undefined}
              style={{ filter: 'drop-shadow(0 0 4px rgba(69,217,196,0.5))' }}
            />
            <Line
              type="monotone"
              dataKey="neuralSync"
              stroke="#B58BFF"
              strokeWidth={isUnstable ? 1.5 : 2}
              dot={false}
              isAnimationActive={false}
              strokeDasharray={isUnstable ? '4 2' : undefined}
              style={{ filter: 'drop-shadow(0 0 4px rgba(181,139,255,0.5))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Live readings */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
        {[
          { label: 'HEART RATE', key: 'heartRate', unit: 'bpm', color: '#45D9C4' },
          { label: 'NEURAL SYNC', key: 'neuralSync', unit: '%', color: '#B58BFF' },
        ].map(({ label, key, unit, color }) => {
          const last = host.bioSync[host.bioSync.length - 1];
          return (
            <div key={key}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-dim)', letterSpacing: '0.08em', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 600, color, textShadow: `0 0 10px ${color}88` }}>
                {last?.[key] ?? '—'}<span style={{ fontSize: '10px', fontWeight: 400, marginLeft: '2px', color: `${color}88` }}>{unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </VeinCard>
  );
}
