import React, { useState } from 'react';

interface BarcodeScannerModalProps {
  onDetected: (code: string) => void;
  onClose: () => void;
}

export default function BarcodeScannerModal({ onDetected, onClose }: BarcodeScannerModalProps) {
  const [inputCode, setInputCode] = useState('');

  const handleSimulate = () => {
    if (inputCode) onDetected(inputCode);
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{
        background: '#1f1f22', padding: '24px', borderRadius: '16px', maxWidth: '400px', width: '90%'
      }}>
        <h2>Scanner (Simulation)</h2>
        <p>Web camera access requires secure context (HTTPS) and permissions. For this demo, please enter a barcode manually.</p>

        <input
          type="text"
          placeholder="Enter barcode..."
          value={inputCode}
          onChange={e => setInputCode(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#333', border: '1px solid #555', color: 'white' }}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, background: '#555' }}>Cancel</button>
          <button onClick={handleSimulate} style={{ flex: 1 }}>Scan</button>
        </div>
      </div>
    </div>
  );
}
