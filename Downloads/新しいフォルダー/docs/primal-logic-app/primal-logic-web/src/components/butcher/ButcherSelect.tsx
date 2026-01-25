import React from 'react';
import './ButcherSelect.css';

interface ButcherSelectProps {
  onSelect: (partId: string) => void;
}

const MEAT_PARTS = [
  { id: 'ribeye', label: 'Ribeye', icon: '🥩' },
  { id: 'liver', label: 'Liver', icon: '🩸' },
  { id: 'eggs', label: 'Eggs', icon: '🥚' },
  { id: 'ground_beef', label: 'Ground Beef', icon: '🥘' },
  { id: 'tallow', label: 'Tallow', icon: '🧈' },
  { id: 'salmon', label: 'Salmon', icon: '🐟' },
];

export default function ButcherSelect({ onSelect }: ButcherSelectProps) {
  return (
    <div className="butcher-select-container">
      <h3>Quick Add</h3>
      <div className="butcher-grid">
        {MEAT_PARTS.map(part => (
          <button
            key={part.id}
            className="butcher-item"
            onClick={() => onSelect(part.id)}
          >
            <span className="butcher-icon">{part.icon}</span>
            <span className="butcher-label">{part.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
