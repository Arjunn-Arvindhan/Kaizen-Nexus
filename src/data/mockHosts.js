// mockHosts.js — NEXUS Synth-Medic Console
// 25 host objects mapped exactly to the required organic roster

const ROSTER_SPEC = [
  { name: 'Sable Orin', status: 'emergence', symbiontType: 'Coral-Vascular', complianceStatus: 'Critical Flag' },
  { name: 'Cael Morrow', status: 'emergence', symbiontType: 'Mycelial-Neural', complianceStatus: 'Critical Flag' },
  { name: 'Zephyr Quinn', status: 'emergence', symbiontType: 'Vine-Cognitive', complianceStatus: 'Critical Flag' },
  { name: 'Indra Voss', status: 'critical', symbiontType: 'Crystalline-Reflex', complianceStatus: 'Critical Flag' },
  { name: 'Mira Thane', status: 'watch', symbiontType: 'Coral-Vascular', complianceStatus: 'Under Review' },
  { name: 'Dax Okafor', status: 'watch', symbiontType: 'Mycelial-Neural', complianceStatus: 'Under Review' },
  { name: 'Lyra Shen', status: 'watch', symbiontType: 'Crystalline-Reflex', complianceStatus: 'Under Review' },
  { name: 'Reef Nakamura', status: 'watch', symbiontType: 'Vine-Cognitive', complianceStatus: 'Under Review' },
  { name: 'Haze Velasco', status: 'watch', symbiontType: 'Coral-Vascular', complianceStatus: 'Under Review' },
  { name: 'Fen Adisa', status: 'watch', symbiontType: 'Mycelial-Neural', complianceStatus: 'Under Review' },
  { name: 'Nova Beltre', status: 'stable', symbiontType: 'Crystalline-Reflex', complianceStatus: 'Approved' },
  { name: 'Soren Faas', status: 'stable', symbiontType: 'Vine-Cognitive', complianceStatus: 'Approved' },
  { name: 'Isla Kwan', status: 'stable', symbiontType: 'Coral-Vascular', complianceStatus: 'Approved' },
  { name: 'Thorn Bauer', status: 'stable', symbiontType: 'Mycelial-Neural', complianceStatus: 'Approved' },
  { name: 'Cassiel Park', status: 'stable', symbiontType: 'Crystalline-Reflex', complianceStatus: 'Approved' },
  { name: 'Wren Solano', status: 'stable', symbiontType: 'Vine-Cognitive', complianceStatus: 'Approved' },
  { name: 'Atlas Diallo', status: 'stable', symbiontType: 'Coral-Vascular', complianceStatus: 'Approved' },
  { name: 'Echo Pham', status: 'stable', symbiontType: 'Mycelial-Neural', complianceStatus: 'Approved' },
  { name: 'Vesper Nkosi', status: 'stable', symbiontType: 'Crystalline-Reflex', complianceStatus: 'Approved' },
  { name: 'Crest Yuen', status: 'stable', symbiontType: 'Vine-Cognitive', complianceStatus: 'Approved' },
  { name: 'Aura Fenn', status: 'stable', symbiontType: 'Coral-Vascular', complianceStatus: 'Approved' },
  { name: 'Lux Medina', status: 'stable', symbiontType: 'Mycelial-Neural', complianceStatus: 'Approved' },
  { name: 'Rho Castillo', status: 'stable', symbiontType: 'Crystalline-Reflex', complianceStatus: 'Approved' },
  { name: 'Tide Arora', status: 'stable', symbiontType: 'Vine-Cognitive', complianceStatus: 'Approved' },
  { name: 'Blaze Osei', status: 'stable', symbiontType: 'Coral-Vascular', complianceStatus: 'Approved' },
];

function generateBioSyncHistory(status) {
  const baseHR = status === 'emergence' ? 95 : status === 'critical' ? 88 : 72;
  const baseNS = status === 'emergence' ? 85 : status === 'critical' ? 70 : 62;
  const points = [];
  const now = Date.now();
  for (let i = 29; i >= 0; i--) {
    const jitter = status === 'stable' ? 3 : status === 'watch' ? 6 : 12;
    points.push({
      timestamp: now - i * 2000,
      heartRate: Math.round(baseHR + (Math.random() - 0.5) * jitter),
      neuralSync: Math.round(baseNS + (Math.random() - 0.5) * jitter),
    });
  }
  return points;
}

function generateCognitionDrift(status) {
  const base = status === 'stable' ? 82 : status === 'watch' ? 68 : status === 'critical' ? 50 : 38;
  const rand = (offset = 15) => Math.max(10, Math.min(100, base + Math.round((Math.random() - 0.5) * offset * 2)));
  return {
    memoryStability: rand(),
    moodStability: rand(),
    impulseControl: rand(),
    identityContinuity: rand(),
  };
}

function generateCognitionSnapshot(current) {
  return {
    memoryStability: Math.min(100, current.memoryStability + Math.round(Math.random() * 18 + 5)),
    moodStability: Math.min(100, current.moodStability + Math.round(Math.random() * 15 + 5)),
    impulseControl: Math.min(100, current.impulseControl + Math.round(Math.random() * 20 + 5)),
    identityContinuity: Math.min(100, current.identityContinuity + Math.round(Math.random() * 22 + 8)),
  };
}

function generateGenomeNodes(symbiontType, status) {
  const nodeCount = 6 + Math.floor(Math.random() * 5);
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      id: `node-${i}`,
      label: `${symbiontType.split('-')[0][0]}${i + 1}`,
      x: 80 + Math.random() * 340,
      y: 60 + Math.random() * 260,
      stable: status === 'stable' ? true : Math.random() > 0.35,
      connections: [],
    });
  }
  for (let i = 0; i < nodes.length; i++) {
    const possibleTargets = nodes
      .map((n, idx) => idx)
      .filter(idx => idx !== i && !nodes[i].connections.includes(`node-${idx}`));
    const count = 1 + Math.floor(Math.random() * 2);
    for (let c = 0; c < count && possibleTargets.length; c++) {
      const pick = possibleTargets.splice(Math.floor(Math.random() * possibleTargets.length), 1)[0];
      nodes[i].connections.push(`node-${pick}`);
    }
  }
  return nodes;
}

function generateIncidents(status) {
  const severities = ['low', 'medium', 'high', 'critical'];
  const descriptions = {
    low: [
      'Minor spike in neural oscillation — self-corrected',
      'Micro-rejection event, resolved under 30s',
      'Symbiont dormancy lag — 4.2 seconds',
      'Heart rate deviation outside baseline window',
    ],
    medium: [
      'Elevated cortisol interference pattern detected',
      'Partial neural sync desynchronization — 12% loss',
      'Identity continuity dip below 60% threshold',
      'Impulse override episode — duration 8.3s',
    ],
    high: [
      'Symbiont membrane expansion beyond host boundary',
      'Neural override pulse — host unresponsive for 22s',
      'Memory continuity breach — fragmentation detected',
      'Mood instability cascade — 3 sequential episodes',
    ],
    critical: [
      'Full identity blur event — emergency sedation administered',
      'Organ rejection sequence initiated — contained',
      'Emergence threshold crossed — Compliance notified',
      'Neural override — host motor function compromised',
    ],
  };

  const count = status === 'stable' ? 2 : status === 'watch' ? 4 : 8;
  const incidents = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const hoursAgo = Math.random() * 72;
    const sev = status === 'stable'
      ? severities[Math.floor(Math.random() * 2)]
      : status === 'watch'
      ? severities[Math.floor(Math.random() * 3)]
      : severities[Math.floor(Math.random() * 4)];
    incidents.push({
      id: `inc-${i}`,
      timestamp: now - hoursAgo * 3600 * 1000,
      description: descriptions[sev][Math.floor(Math.random() * descriptions[sev].length)],
      severity: sev,
    });
  }
  return incidents.sort((a, b) => b.timestamp - a.timestamp);
}

function buildHostFromSpec(spec, index) {
  const { name, status, symbiontType, complianceStatus } = spec;

  const fusionIntegrity = {
    stable: 82 + Math.floor(Math.random() * 18),
    watch: 52 + Math.floor(Math.random() * 18),
    critical: 22 + Math.floor(Math.random() * 18),
    emergence: 35 + Math.floor(Math.random() * 25),
  }[status];

  // Specific overrides for seed drama
  let finalIntegrity = fusionIntegrity;
  if (name === 'Zephyr Quinn') finalIntegrity = 18; // Very low integrity emergence

  const compliancePressure = {
    stable: 0,
    watch: 0,
    critical: 75 + Math.floor(Math.random() * 15),
    emergence: 80 + Math.floor(Math.random() * 15),
  }[status];

  const cognitionDrift = generateCognitionDrift(status);

  // Assign doctor based on index
  // 0-8: Dr. Ama Reyes
  // 9-16: Dr. Caleb Vance
  // 17-24: Dr. Elena Rostova
  const assignedDoctor = 
    index < 9 ? 'Dr. Ama Reyes' :
    index < 17 ? 'Dr. Caleb Vance' :
    'Dr. Elena Rostova';

  return {
    id: `host-${index}`,
    name,
    symbiontType,
    status,
    fusionIntegrity: finalIntegrity,
    bioSync: generateBioSyncHistory(status),
    cognitionDrift,
    cognitionDriftSnapshot: generateCognitionSnapshot(cognitionDrift),
    genomeNodes: generateGenomeNodes(symbiontType, status),
    incidents: generateIncidents(status),
    complianceStatus,
    compliancePressure,
    sedated: false,
    lockdown: false,
    assignedDoctor,
  };
}

// Build exact 25 hosts list
export const INITIAL_HOSTS = ROSTER_SPEC.map((spec, idx) => buildHostFromSpec(spec, idx));

export function createNewBioSyncPoint(lastPoint, status) {
  const jitter = status === 'stable' ? 3 : status === 'watch' ? 6 : 12;
  return {
    timestamp: Date.now(),
    heartRate: Math.max(55, Math.min(140, lastPoint.heartRate + Math.round((Math.random() - 0.5) * jitter))),
    neuralSync: Math.max(30, Math.min(100, lastPoint.neuralSync + Math.round((Math.random() - 0.5) * jitter))),
  };
}
