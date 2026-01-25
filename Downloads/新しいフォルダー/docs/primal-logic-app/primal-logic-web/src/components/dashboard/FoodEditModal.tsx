
import React, { useState } from 'react';
import type { FoodItem } from '../../types/index';

interface FoodEditModalProps {
  foodItem: FoodItem;
  onSave: (food: FoodItem) => void;
  onClose: () => void;
}

export default function FoodEditModal({ foodItem, onSave, onClose }: FoodEditModalProps) {
  const [editedFood, setEditedFood] = useState({ ...foodItem });

  const handleChange = (field: keyof FoodItem, value: any) => {
    setEditedFood(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{
        background: '#1f1f22', padding: '24px', borderRadius: '16px', maxWidth: '400px', width: '90%'
      }}>
        <h2>Edit Food</h2>

        <div style={{ marginBottom: '16px' }}>
          <label>Name</label>
          <input
            value={editedFood.name}
            onChange={e => handleChange('name', e.target.value)}
            style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #555', color: 'white' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <label>Weight (g)</label>
            <input
              type="number"
              value={editedFood.weight || ''}
              onChange={e => handleChange('weight', parseFloat(e.target.value))}
              style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #555', color: 'white' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, background: '#555' }}>Cancel</button>
          <button onClick={() => onSave(editedFood)} style={{ flex: 1 }}>Save</button>
        </div>
      </div>
    </div>
  );
}
