import React, { useState, useEffect } from 'react';

export default function FastingTimer() {
  const [fastingHours, setFastingHours] = useState(0);
  const [isFasting, setIsFasting] = useState(true);

  useEffect(() => {
    // Mock timer logic
    const interval = setInterval(() => {
      setFastingHours(prev => prev + 0.01); // Simulated fast update
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fasting-timer" style={{
      background: '#1f1f22', padding: '16px', borderRadius: '12px', textAlign: 'center', marginBottom: '16px'
    }}>
      <div style={{ fontSize: '14px', color: '#a1a1aa' }}>Fasting Timer</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
        {Math.floor(fastingHours)}h {Math.floor((fastingHours % 1) * 60)}m
      </div>
      <button
        onClick={() => setIsFasting(!isFasting)}
        style={{ marginTop: '8px', padding: '6px 16px', fontSize: '14px' }}
      >
        {isFasting ? 'Stop Fasting' : 'Start Fasting'}
      </button>
    </div>
  );
}
