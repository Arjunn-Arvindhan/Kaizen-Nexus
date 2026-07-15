// IncidentFeed.jsx — Scrollable 72-hour incident log
import { VeinCard } from '../ui/VeinCard';
import { AlertTriangle, Info, AlertOctagon, Zap } from 'lucide-react';

const SEV_CONFIG = {
  low:      { color: '#45D9C4', bg: 'rgba(69,217,196,0.08)',  icon: Info,         label: 'LOW'      },
  medium:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  icon: AlertTriangle, label: 'MED'     },
  high:     { color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   icon: AlertOctagon, label: 'HIGH'     },
  critical: { color: '#B58BFF', bg: 'rgba(181,139,255,0.1)',  icon: Zap,          label: 'CRIT'     },
};

function formatTimestamp(ts) {
  const d = new Date(ts);
  const now = Date.now();
  const diffH = Math.round((now - ts) / (1000 * 60 * 60));
  const timeStr = d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  return `${diffH}h ago · ${timeStr}`;
}

export function IncidentFeed({ host }) {
  return (
    <VeinCard status={host.status} style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
          PATHOLOGICAL ANOMALIES LOG · LAST 72H
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: host.status === 'emergence' ? '#B58BFF' : 'var(--color-text-dim)',
        }}>
          {host.incidents.length} events
        </span>
      </div>

      <div style={{ overflowY: 'auto', maxHeight: '220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {host.incidents.length === 0 && (
          <div style={{ color: 'var(--color-text-dim)', fontSize: '12px', padding: '16px 0', textAlign: 'center' }}>
            No incidents recorded
          </div>
        )}
        {host.incidents.map(inc => {
          const sc = SEV_CONFIG[inc.severity] || SEV_CONFIG.low;
          const Icon = sc.icon;
          return (
            <div key={inc.id} style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start',
              padding: '8px 10px',
              background: sc.bg,
              borderRadius: '8px',
              borderLeft: `3px solid ${sc.color}`,
            }}>
              <Icon size={13} color={sc.color} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-dim)', marginBottom: '3px' }}>
                  {formatTimestamp(inc.timestamp)}
                  <span style={{ marginLeft: '8px', color: sc.color, fontWeight: 600 }}>[{sc.label}]</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text)', lineHeight: 1.4 }}>
                  {inc.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </VeinCard>
  );
}
