// HostRoster.jsx — Scrollable left panel with sorted host list
import { useState, useMemo } from 'react';
import { Users } from 'lucide-react';
import { RosterRow } from './RosterRow';

const STATUS_ORDER = { emergence: 0, critical: 1, watch: 2, stable: 3 };

export function HostRoster({ hosts, selectedId, onSelect }) {
  const [doctorFilter, setDoctorFilter] = useState('ALL');

  // Filter list by selected clinician
  const filteredHosts = useMemo(() => {
    if (doctorFilter === 'ALL') return hosts;
    return hosts.filter(h => h.assignedDoctor === doctorFilter);
  }, [hosts, doctorFilter]);

  const sorted = useMemo(() =>
    [...filteredHosts].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]),
    [filteredHosts]
  );

  return (
    <aside style={{
      width: '260px',
      minWidth: '220px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(69,217,196,0.1)',
      background: 'rgba(8,16,21,0.7)',
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 14px 10px',
        display: 'flex', alignItems: 'center', gap: '8px',
        flexShrink: 0,
      }}>
        <Users size={14} color="#45D9C4" />
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(242,251,250,0.5)', letterSpacing: '0.1em' }}>
          HOST ROSTER
        </span>
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: '#45D9C4', background: 'rgba(69,217,196,0.1)',
          borderRadius: '6px', padding: '1px 7px',
        }}>
          {filteredHosts.length}
        </span>
      </div>

      {/* Clinician Caseload Dropdown Filter */}
      <div style={{ padding: '0 14px 12px', borderBottom: '1px solid rgba(69,217,196,0.1)', flexShrink: 0 }}>
        <select
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          style={{
            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(69,217,196,0.2)',
            borderRadius: '6px', padding: '5px 8px', fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: '#45D9C4', outline: 'none', cursor: 'pointer',
          }}
        >
          <option value="ALL" style={{ background: '#0d1a21', color: '#F2FBFA' }}>ALL BIOMEDICS</option>
          <option value="Dr. Ama Reyes" style={{ background: '#0d1a21', color: '#F2FBFA' }}>DR. AMA REYES</option>
          <option value="Dr. Caleb Vance" style={{ background: '#0d1a21', color: '#F2FBFA' }}>DR. CALEB VANCE</option>
          <option value="Dr. Elena Rostova" style={{ background: '#0d1a21', color: '#F2FBFA' }}>DR. ELENA ROSTOVA</option>
        </select>
      </div>

      {/* Status summary bar */}
      <div style={{
        padding: '8px 14px',
        borderBottom: '1px solid rgba(69,217,196,0.07)',
        display: 'flex', gap: '6px',
        flexShrink: 0,
      }}>
        {[
          { key: 'emergence', color: '#B58BFF', label: 'EMG' },
          { key: 'critical',  color: '#EF4444', label: 'CRT' },
          { key: 'watch',     color: '#F59E0B', label: 'WCH' },
          { key: 'stable',    color: '#45D9C4', label: 'STB' },
        ].map(({ key, color, label }) => {
          const count = filteredHosts.filter(h => h.status === key).length;
          return (
            <div key={key} style={{
              flex: 1, textAlign: 'center',
              background: `${color}10`, borderRadius: '6px', padding: '3px 0',
              border: `1px solid ${color}25`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color }}>{count}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: `${color}99`, letterSpacing: '0.06em' }}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Scrollable list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
        {sorted.map(host => (
          <RosterRow
            key={host.id}
            host={host}
            selected={host.id === selectedId}
            onClick={() => onSelect(host.id)}
          />
        ))}
      </div>
    </aside>
  );
}
