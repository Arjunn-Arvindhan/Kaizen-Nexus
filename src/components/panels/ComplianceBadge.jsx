// ComplianceBadge.jsx — Small status tag near top of host panel
import { Shield, ShieldAlert, ShieldX } from 'lucide-react';
import { motion } from 'framer-motion';

const BADGE_CONFIG = {
  'Approved':       { color: '#45D9C4', bg: 'rgba(69,217,196,0.12)',  border: 'rgba(69,217,196,0.4)',  icon: Shield,      blink: false },
  'Under Review':   { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.4)',  icon: ShieldAlert, blink: false },
  'Critical Flag':  { color: '#B58BFF', bg: 'rgba(181,139,255,0.12)', border: 'rgba(181,139,255,0.5)', icon: ShieldX,     blink: true  },
};

const LABEL_MAPPING = {
  'Approved': 'BIO-APPROVED',
  'Under Review': 'PATHOLOGY REVIEW',
  'Critical Flag': 'CRITICAL MUTATION',
};

export function ComplianceBadge({ host }) {
  const cfg = BADGE_CONFIG[host.complianceStatus] || BADGE_CONFIG['Approved'];
  const Icon = cfg.icon;

  return (
    <motion.div
      className={cfg.blink ? 'compliance-blink' : ''}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '5px 12px',
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: '8px',
        boxShadow: `0 0 10px ${cfg.bg}`,
      }}
    >
      <Icon size={13} color={cfg.color} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: cfg.color, letterSpacing: '0.08em', fontWeight: 600 }}>
        {(LABEL_MAPPING[host.complianceStatus] || host.complianceStatus).toUpperCase()}
      </span>
    </motion.div>
  );
}
