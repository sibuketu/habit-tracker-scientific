import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/i18n';

export default function RecoveryProtocolScreen() {
  const { t } = useTranslation();
  const { setRecoveryProtocol } = useApp();
  const [active, setActive] = useState(false);

  const handleActivate = () => {
    setActive(true);
    setRecoveryProtocol({
      isActive: true,
      stage: 'rest',
      startedAt: new Date().toISOString(),
      recommendations: ['Hydrate', 'Salt', 'Rest'],
    });
    alert('Recovery Protocol Activated');
  };

  return (
    <div className="recovery-screen">
      <h2>🚑 Recovery Protocol</h2>
      <p>Feeling off? Activate the protocol to get back on track.</p>
      <button
        onClick={handleActivate}
        disabled={active}
        style={{ opacity: active ? 0.5 : 1 }}
      >
        {active ? 'Protocol Active' : 'Activate Protocol'}
      </button>
    </div>
  );
}
