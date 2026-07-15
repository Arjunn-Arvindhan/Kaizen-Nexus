// FusionIntegrityGauge.jsx — Radial gauge 0-100%
import { PieChart, Pie, Cell } from 'recharts';
import { VeinCard } from '../ui/VeinCard';

function getColor(value) {
  if (value >= 70) return '#45D9C4';
  if (value >= 45) return '#F59E0B';
  if (value >= 25) return '#EF4444';
  return '#B58BFF';
}

function getGlowColor(value) {
  if (value >= 70) return 'rgba(69,217,196,0.5)';
  if (value >= 45) return 'rgba(245,158,11,0.5)';
  if (value >= 25) return 'rgba(239,68,68,0.5)';
  return 'rgba(181,139,255,0.6)';
}

export function FusionIntegrityGauge({ host }) {
  const value = host.fusionIntegrity;
  const color = getColor(value);
  const glowColor = getGlowColor(value);

  const data = [
    { value: value },
    { value: 100 - value },
  ];

  return (
    <VeinCard status={host.status} style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', letterSpacing: '0.1em', marginBottom: '4px' }}>
        BIOMEMBRANE COMPATIBILITY
      </div>

      <div style={{ position: 'relative', width: 160, height: 100 }}>
        <PieChart width={160} height={110}>
          {/* Background arc */}
          <Pie
            data={[{ value: 100 }]}
            cx={80} cy={90}
            startAngle={180} endAngle={0}
            innerRadius={55} outerRadius={72}
            dataKey="value"
          >
            <Cell fill="rgba(255,255,255,0.04)" />
          </Pie>
          {/* Value arc */}
          <Pie
            data={data}
            cx={80} cy={90}
            startAngle={180} endAngle={0}
            innerRadius={55} outerRadius={72}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={color} style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }} />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>

        {/* Centre readout */}
        <div style={{
          position: 'absolute', bottom: 8, left: 0, right: 0,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 600,
            color,
            textShadow: `0 0 16px ${glowColor}`,
            lineHeight: 1,
          }}>
            {value}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)', letterSpacing: '0.05em' }}>
            %
          </div>
        </div>
      </div>

      {/* Status label */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px',
        color: color, letterSpacing: '0.1em', marginTop: '2px',
      }}>
        {value >= 70 ? 'NOMINAL' : value >= 45 ? 'DEGRADED' : value >= 25 ? 'CRITICAL' : 'COLLAPSE RISK'}
      </div>
    </VeinCard>
  );
}
