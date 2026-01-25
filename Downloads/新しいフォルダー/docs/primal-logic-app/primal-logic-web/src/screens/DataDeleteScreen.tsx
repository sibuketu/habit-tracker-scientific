/**
 * CarnivoreOS - 繝・・繧ｿ蜑企勁逕ｻ髱｢
 *
 * GDPR蟇ｾ蠢懶ｼ壹Θ繝ｼ繧ｶ繝ｼ繝・・繧ｿ縺ｮ蜑企勁讖溯・
 */

import { useState } from 'react';
import { supabase, isSupabaseAvailable } from '../lib/supabaseClient';
import { logError, getUserFriendlyErrorMessage } from '../utils/errorHandler';
import './DataDeleteScreen.css';

export default function DataDeleteScreen() {
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== '蜑企勁') {
      alert('縲悟炎髯､縲阪→蜈･蜉帙＠縺ｦ縺上□縺輔＞');
      return;
    }

    if (!confirm('譛ｬ蠖薙↓蜈ｨ縺ｦ縺ｮ繝・・繧ｿ繧貞炎髯､縺励∪縺吶°・溘％縺ｮ謫堺ｽ懊・蜿悶ｊ豸医○縺ｾ縺帙ｓ縲・)) {
      return;
    }

    setDeleting(true);

    try {
      // 繝ｭ繝ｼ繧ｫ繝ｫ繧ｹ繝医Ξ繝ｼ繧ｸ縺ｮ繝・・繧ｿ繧貞炎髯､
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith('primal_logic_')) {
          localStorage.removeItem(key);
        }
      });

      // Supabase縺ｮ繝・・繧ｿ繧貞炎髯､・郁ｪ崎ｨｼ貂医∩繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ蝣ｴ蜷茨ｼ・      if (isSupabaseAvailable() && supabase) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          // 繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ繝・・繧ｿ繧貞炎髯､・亥ｰ・擂逧・↓螳溯｣・ｼ・          // await supabase.from('daily_logs').delete().eq('user_id', session.user.id);
          // await supabase.from('user_profiles').delete().eq('user_id', session.user.id);

          // 繝ｭ繧ｰ繧｢繧ｦ繝茨ｼ医い繧ｫ繧ｦ繝ｳ繝亥炎髯､縺ｯ繧ｵ繝ｼ繝舌・蛛ｴ縺ｧ螳溯｣・′蠢・ｦ・ｼ・          await supabase.auth.signOut();
        }
      }

      setDeleted(true);

      // 3遘貞ｾ後↓繝壹・繧ｸ繧偵Μ繝ｭ繝ｼ繝・      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      logError(error, { component: 'DataDeleteScreen', action: 'handleDelete' });
      alert(getUserFriendlyErrorMessage(error) || '繝・・繧ｿ縺ｮ蜑企勁縺ｫ螟ｱ謨励＠縺ｾ縺励◆');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="data-delete-screen">
      <div className="data-delete-container">
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'settings' }));
          }}
          className="data-delete-back-button"
        >
          竊・險ｭ螳壹↓謌ｻ繧・        </button>
        <h1 className="data-delete-title">繝・・繧ｿ蜑企勁</h1>
        <div className="data-delete-warning">
          <h2>笞・・隴ｦ蜻・/h2>
          <p>縺薙・謫堺ｽ懊ｒ螳溯｡後☆繧九→縲∽ｻ･荳九・繝・・繧ｿ縺悟ｮ悟・縺ｫ蜑企勁縺輔ｌ縺ｾ縺呻ｼ・/p>
          <ul>
            <li>蜈ｨ縺ｦ縺ｮ鬟滉ｺ玖ｨ倬鹸</li>
            <li>繝励Ο繝輔ぃ繧､繝ｫ諠・ｱ</li>
            <li>譌･險・/li>
            <li>菴馴㍾繝ｻ菴楢р閧ｪ邇・・險倬鹸</li>
            <li>繧｢繝励Μ險ｭ螳・/li>
            <li>繧｢繧ｫ繧ｦ繝ｳ繝域ュ蝣ｱ・郁ｪ崎ｨｼ貂医∩繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ蝣ｴ蜷茨ｼ・/li>
          </ul>
          <p className="data-delete-warning-strong">縺薙・謫堺ｽ懊・蜿悶ｊ豸医○縺ｾ縺帙ｓ縲・/p>
        </div>

        <div className="data-delete-confirm">
          <label htmlFor="confirm-input" className="data-delete-label">
            蜑企勁繧堤｢ｺ隱阪☆繧九↓縺ｯ縲√悟炎髯､縲阪→蜈･蜉帙＠縺ｦ縺上□縺輔＞・・          </label>
          <input
            id="confirm-input"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="data-delete-input"
            placeholder="蜑企勁"
          />
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting || confirmText !== '蜑企勁'}
          className="data-delete-button"
        >
          {deleting ? '蜑企勁荳ｭ...' : '蜈ｨ縺ｦ縺ｮ繝・・繧ｿ繧貞炎髯､'}
        </button>

        {deleted && (
          <div className="data-delete-success">
            笨・繝・・繧ｿ縺ｮ蜑企勁縺悟ｮ御ｺ・＠縺ｾ縺励◆縲ゅ・繝ｼ繧ｸ繧偵Μ繝ｭ繝ｼ繝峨＠縺ｾ縺・..
          </div>
        )}
      </div>
    </div>
  );
}

