/**
 * Primal Logic - Argument Card Component (Web版)
 * 
 * 3-tier情報表示: Level 1 (Glance) → Level 2 (Explanation) → Level 3 (Source)
 * Phase 3: The Logic Shield
 */

import { useState } from 'react';
import type { ArgumentCard as ArgumentCardType } from '../data/argumentCards';
import './ArgumentCard.css';

interface ArgumentCardProps {
  card: ArgumentCardType;
  onClose: () => void;
}

export default function ArgumentCard({ card, onClose }: ArgumentCardProps) {
  const [level, setLevel] = useState<1 | 2 | 3>(1);

  const getVerdictColor = () => {
    switch (card.verdict) {
      case 'trash':
        return '#FF3B30';
      case 'sufficient':
        return '#34C759';
      case 'precious':
        return '#FF9500';
      case 'safe':
        return '#007AFF';
      default:
        return '#666';
    }
  };

  return (
    <div className="argument-card-overlay" onClick={onClose}>
      <div className="argument-card-container" onClick={(e) => e.stopPropagation()}>
        <div className="argument-card-header">
          <h2 className="argument-card-title">
            {card.emoji} {card.topic}
          </h2>
          <button className="argument-card-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="argument-card-content">
          {/* Level 1: Glance */}
          {level >= 1 && (
            <div className="argument-card-level">
              <div className="argument-card-level-label">レベル1: 概要</div>
              <div
                className="argument-card-level-card"
                style={{ borderLeftColor: getVerdictColor() }}
              >
                <div className="argument-card-level1-text">{card.level1}</div>
              </div>
            </div>
          )}

          {/* Level 2: Explanation */}
          {level >= 2 && (
            <div className="argument-card-level">
              <div className="argument-card-level-label">レベル2: 詳細説明</div>
              <div
                className="argument-card-level-card"
                style={{ borderLeftColor: getVerdictColor() }}
              >
                <div className="argument-card-level2-text">{card.level2}</div>
              </div>
            </div>
          )}

          {/* Level 3: Source - 削除（3枚目を消す） */}
          
          {/* Expand Button */}
          {level < 2 && (
            <button
              className="argument-card-expand-button"
              style={{ backgroundColor: getVerdictColor() }}
              onClick={() => setLevel((prev) => (prev + 1) as 1 | 2)}
            >
              詳細説明を見る →
            </button>
          )}

          {/* Verdict Badge */}
          <div
            className="argument-card-verdict-badge"
            style={{ backgroundColor: getVerdictColor() }}
          >
            判定: {card.emoji} {card.verdict === 'trash' ? '不要' : card.verdict === 'sufficient' ? '十分' : card.verdict === 'precious' ? '重要' : '安全'}
          </div>
        </div>
      </div>
    </div>
  );
}

