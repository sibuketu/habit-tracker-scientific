import React from 'react';
import type { FoodItem } from '../types/index';

interface PhotoAnalysisModalProps {
  onAnalysisComplete: (foods: FoodItem[]) => void;
  onClose: () => void;
}

export default function PhotoAnalysisModal({ onAnalysisComplete, onClose }: PhotoAnalysisModalProps) {
  const handleSimulate = () => {
    // Mock data
    const mockFoods: FoodItem[] = [
      { id: 'mock_steak', name: 'AI Detected Steak', protein: 50, fat: 40, carbs: 0, calories: 560, portion: 200, unit: 'g' }
    ];
    onAnalysisComplete(mockFoods);
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{
        background: '#1f1f22', padding: '24px', borderRadius: '16px', maxWidth: '400px', width: '90%'
      }}>
        <h2>Photo Analysis</h2>
        <p>Take a photo of your meal to auto-log.</p>
        <button onClick={handleSimulate} style={{ width: '100%', marginBottom: '12px' }}>Simulate Analysis</button>
        <button onClick={onClose} style={{ width: '100%', background: '#555' }}>Cancel</button>
      </div>
    </div>
  );
}
