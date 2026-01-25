/**
 * CarnivoreOS - Symptom Checker (繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ)
 *
 * 繧ｫ繝ｼ繝九・繧｢螳溯ｷｵ荳ｭ縺ｮ逞・憾繧偵メ繧ｧ繝・け縺励∝ｯｾ蜃ｦ豕輔ｒ謠先｡医☆繧九さ繝ｳ繝昴・繝阪Φ繝・ */

import { useState } from 'react';
import { REMEDY_LOGIC, type RemedyItem } from '../../data/remedyLogic';
import './SymptomChecker.css';

export default function SymptomChecker() {
  const [selectedSymptom, setSelectedSymptom] = useState<RemedyItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSymptomClick = (remedy: RemedyItem) => {
    setSelectedSymptom(remedy);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSymptom(null);
  };

  return (
    <>
      <div className="symptom-checker-section">
        <h3 className="symptom-checker-title">抽 菴楢ｪｿ縺ｯ縺ｩ縺・ｼ・/h3>
        <p className="symptom-checker-subtitle">逞・憾繧帝∈繧薙〒蟇ｾ蜃ｦ豕輔ｒ遒ｺ隱・/p>
        <div className="symptom-buttons">
          {REMEDY_LOGIC.map((remedy) => (
            <button
              key={remedy.symptom}
              className="symptom-button"
              onClick={() => handleSymptomClick(remedy)}
            >
              {remedy.symptom}
            </button>
          ))}
        </div>
      </div>

      {/* 繝｢繝ｼ繝繝ｫ */}
      {showModal && selectedSymptom && (
        <div className="symptom-modal-overlay" onClick={closeModal}>
          <div className="symptom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="symptom-modal-close" onClick={closeModal}>
              ﾃ・            </button>
            <h2 className="symptom-modal-title">{selectedSymptom.symptom}</h2>

            <div className="symptom-modal-section">
              <h3 className="symptom-modal-section-title">剥 閠・∴繧峨ｌ繧句次蝗</h3>
              <ul className="symptom-modal-list">
                {selectedSymptom.possibleCauses.map((cause, idx) => (
                  <li key={idx}>{cause}</li>
                ))}
              </ul>
            </div>

            <div className="symptom-modal-section">
              <h3 className="symptom-modal-section-title">笨・蟇ｾ蜃ｦ豕・/h3>
              <ul className="symptom-modal-list">
                {selectedSymptom.remedies.map((remedy, idx) => (
                  <li key={idx}>{remedy}</li>
                ))}
              </ul>
            </div>

            <div className="symptom-modal-section">
              <h3 className="symptom-modal-section-title">答 繝ｭ繧ｸ繝・け</h3>
              <p className="symptom-modal-logic">{selectedSymptom.logic}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

