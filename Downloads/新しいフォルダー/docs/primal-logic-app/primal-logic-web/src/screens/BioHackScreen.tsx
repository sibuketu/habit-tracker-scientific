/**
 * BioHack Screen - Bio-Hack Terminal蟆ら畑逕ｻ髱｢
 */

import { useTranslation } from '../utils/i18n';
import BioHackDashboard from '../components/dashboard/BioHackDashboard';

export default function BioHackScreen() {
  const { t } = useTranslation();

  return (
    <div
      className="biohack-screen-container"
      style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}
    >
      {/* 謌ｻ繧九・繧ｿ繝ｳ */}
      <button
        onClick={() => {
          const event = new CustomEvent('navigateToScreen', { detail: 'labs' });
          window.dispatchEvent(event);
        }}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e5e7eb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }}
      >
        竊・縺昴・莉悶↓謌ｻ繧・      </button>

      {/* Bio-Hack Dashboard */}
      <BioHackDashboard />
    </div>
  );
}

