/**
 * CarnivoreOS - 繝輔ぅ繝ｼ繝峨ヰ繝・け・井ｽ懊ｊ逶ｴ縺暦ｼ・ *
 * - 譌ｧ: mailto騾∽ｿ｡ + 繝ｭ繝ｼ繧ｫ繝ｫ菫晏ｭ假ｼ井ｸｭ騾泌濠遶ｯ・・ * - 譁ｰ: n8n webhook縺ｸPOST縺ｧ騾∽ｿ｡
 */

import { useCallback, useEffect, useState } from 'react';
import FeedbackDialog from '../components/common/FeedbackDialog';

export default function FeedbackScreen() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // 逕ｻ髱｢縺ｫ譚･縺溘ｉ蜊ｳ繝繧､繧｢繝ｭ繧ｰ繧帝幕縺・    setOpen(true);
  }, []);

  const closeAndBack = useCallback(() => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'settings' }));
  }, []);

  return (
    <div style={{ flex: 1, background: 'var(--color-bg-primary)' }}>
      <FeedbackDialog open={open} onClose={closeAndBack} />
      {!open && (
        <div style={{ padding: 16 }}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            縺疲э隕九・繝舌げ蝣ｱ蜻翫ｒ髢九￥
          </button>
        </div>
      )}
    </div>
  );
}

