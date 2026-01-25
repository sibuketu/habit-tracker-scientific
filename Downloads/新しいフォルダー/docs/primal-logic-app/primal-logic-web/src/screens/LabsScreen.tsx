/**
 * Labs Screen - "Other (Labs)" Screen
 *
 * Experimental features and extras
 */

import { useState, useEffect } from 'react';
import { getRandomTip, TIPS_DATA, type Tip } from '../data/tips';
import { calculateStreak, type StreakData } from '../utils/streakCalculator';
import { useTranslation } from '../utils/i18n';
import { useSettings } from '../hooks/useSettings';
import './LabsScreen.css';

export default function LabsScreen() {
  const { t } = useTranslation();
  const { tipsEnabled } = useSettings();
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);

  // Load streak data
  useEffect(() => {
    const loadStreakData = async () => {
      const data = await calculateStreak();
      setStreakData(data);
    };
    loadStreakData();
  }, []);

  // Load random tip
  useEffect(() => {
    if (tipsEnabled) {
      const tip = getRandomTip();
      setCurrentTip(tip);
    }
  }, [tipsEnabled]);

  const handleViewTipList = () => {
    window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'knowledge' }));
  };

  return (
    <div className="labs-screen-container">
      <h1>Labs 🧪</h1>
      <p>Experimental features and data analysis tools.</p>

      {/* Tip Card */}
      {tipsEnabled && currentTip && (
        <div className="labs-card">
          <h2>💡 Tip</h2>
          <p>{currentTip.content}</p>
          <button className="labs-tip-button" onClick={handleViewTipList}>
            View Tip List
          </button>
        </div>
      )}

      <div className="labs-card">
        <h2>🔥 Streak Analytics</h2>
        {streakData ? (
          <div>
            <p>Current Streak: <strong>{streakData.currentStreak} days</strong></p>
            <p>Longest Streak: <strong>{streakData.longestStreak} days</strong></p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="labs-card">
        <h2>🧬 Bio-Hacking Tools</h2>
        <p>Coming soon: Detailed blood work analysis and trend tracking.</p>
      </div>
    </div>
  );
}
