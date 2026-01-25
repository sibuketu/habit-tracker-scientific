import React from 'react';

interface TransitionGuideModalProps {
  onClose: () => void;
}

export default function TransitionGuideModal({ onClose }: TransitionGuideModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: '#1f1f22', padding: '24px', borderRadius: '16px', maxWidth: '500px', width: '90%'
      }}>
        <h2>Transition Guide</h2>
        <p>Adapting to zero-carb takes time. Here are the phases:</p>
        <ul>
          <li><strong>Phase 1: Carb Withdrawal</strong> - Fatigue, cravings (Day 1-3)</li>
          <li><strong>Phase 2: Keto Flu</strong> - Electrolyte imbalance (Day 4-14)</li>
          <li><strong>Phase 3: Fat Adaptation</strong> - Energy returning (Week 3-4)</li>
          <li><strong>Phase 4: Optimization</strong> - Stable energy (Month 2+)</li>
        </ul>
        <button onClick={onClose} style={{ marginTop: '16px', width: '100%' }}>Got it</button>
      </div>
    </div>
  );
}
