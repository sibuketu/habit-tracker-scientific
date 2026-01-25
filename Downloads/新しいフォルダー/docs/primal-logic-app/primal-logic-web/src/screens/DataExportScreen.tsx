/**
 * CarnivoreOS - 繝・・繧ｿ繧ｨ繧ｯ繧ｹ繝昴・繝育判髱｢
 *
 * GDPR蟇ｾ蠢懶ｼ壹Θ繝ｼ繧ｶ繝ｼ繝・・繧ｿ縺ｮ繧ｨ繧ｯ繧ｹ繝昴・繝域ｩ溯・
 */

import { useState } from 'react';
import { getDailyLogs } from '../utils/storage';
import { logError } from '../utils/errorHandler';
import './DataExportScreen.css';

export default function DataExportScreen() {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    setExported(false);

    try {
      // 蜈ｨ縺ｦ縺ｮ繝・・繧ｿ繧貞叙蠕・      const logs = await getDailyLogs();
      const userProfile = localStorage.getItem('primal_logic_user_profile');
      const settings = localStorage.getItem('primal_logic_settings');

      // 繧ｨ繧ｯ繧ｹ繝昴・繝医ョ繝ｼ繧ｿ繧呈ｧ狗ｯ・      const exportData = {
        exportDate: new Date().toISOString(),
        version: '1.0',
        userProfile: userProfile ? JSON.parse(userProfile) : null,
        settings: settings ? JSON.parse(settings) : null,
        dailyLogs: logs,
      };

      // JSON繝輔ぃ繧､繝ｫ縺ｨ縺励※繝繧ｦ繝ｳ繝ｭ繝ｼ繝・      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `primal-logic-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExported(true);
    } catch (error) {
      logError(error, { component: 'DataExportScreen', action: 'handleExport' });
      alert('繝・・繧ｿ縺ｮ繧ｨ繧ｯ繧ｹ繝昴・繝医↓螟ｱ謨励＠縺ｾ縺励◆');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="data-export-screen">
      <div className="data-export-container">
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'settings' }));
          }}
          className="data-export-back-button"
        >
          竊・險ｭ螳壹↓謌ｻ繧・        </button>
        <h1 className="data-export-title">繝・・繧ｿ繧ｨ繧ｯ繧ｹ繝昴・繝・/h1>
        <p className="data-export-description">
          縺ゅ↑縺溘・繝・・繧ｿ繧谷SON蠖｢蠑上〒繝繧ｦ繝ｳ繝ｭ繝ｼ繝峨〒縺阪∪縺吶・          縺薙ｌ縺ｫ縺ｯ縲・｣滉ｺ玖ｨ倬鹸縲√・繝ｭ繝輔ぃ繧､繝ｫ諠・ｱ縲∬ｨｭ螳壹↑縺ｩ縺悟性縺ｾ繧後∪縺吶・        </p>

        <button onClick={handleExport} disabled={exporting} className="data-export-button">
          {exporting ? '繧ｨ繧ｯ繧ｹ繝昴・繝井ｸｭ...' : '繝・・繧ｿ繧偵お繧ｯ繧ｹ繝昴・繝・}
        </button>

        {exported && (
          <div className="data-export-success">笨・繝・・繧ｿ縺ｮ繧ｨ繧ｯ繧ｹ繝昴・繝医′螳御ｺ・＠縺ｾ縺励◆</div>
        )}

        <div className="data-export-info">
          <h3>繧ｨ繧ｯ繧ｹ繝昴・繝医＆繧後ｋ繝・・繧ｿ</h3>
          <ul>
            <li>繝励Ο繝輔ぃ繧､繝ｫ諠・ｱ・域ｧ蛻･縲∝ｹｴ鮨｢縲∽ｽ馴㍾縺ｪ縺ｩ・・/li>
            <li>鬟滉ｺ玖ｨ倬鹸・亥・螻･豁ｴ・・/li>
            <li>譌･險・/li>
            <li>菴馴㍾繝ｻ菴楢р閧ｪ邇・・險倬鹸</li>
            <li>繧｢繝励Μ險ｭ螳・/li>
          </ul>
        </div>
      </div>
    </div>
  );
}

