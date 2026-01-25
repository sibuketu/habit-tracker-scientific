import { useState, useEffect } from 'react';
import './DisclaimerModal.css';

interface DisclaimerModalProps {
  onAgree: () => void;
}

export default function DisclaimerModal({ onAgree }: DisclaimerModalProps) {
  const [canAgree, setCanAgree] = useState(false);

  // Prevent instant clicking (force read time)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanAgree(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-content">
        <h2 className="disclaimer-title">⚠️ DISCLAIMER</h2>

        <div className="disclaimer-body">
          <p>
            <strong>This app is NOT a doctor.</strong>
          </p>
          <p>
            CarnivOS provides data tracking and analysis based on nutritional logic, but it does not
            provide medical advice, diagnosis, or treatment.
          </p>
          <p>
            The "Recovery Protocol" and "Bio-Tuner" are algorithmic suggestions based on user input
            and generic metabolic principles. They should not replace professional medical
            consultation.
          </p>
          <p>
            Always consult with a qualified healthcare professional before making significant changes
            to your diet or lifestyle, especially if you have existing health conditions.
          </p>
        </div>

        <div className="disclaimer-footer">
          <button
            className="disclaimer-agree-button"
            onClick={onAgree}
            disabled={!canAgree}
            style={{ opacity: canAgree ? 1 : 0.5 }}
          >
            {canAgree ? 'I Understand & Agree' : 'Please read...'}
          </button>
        </div>
      </div>
    </div>
  );
}
