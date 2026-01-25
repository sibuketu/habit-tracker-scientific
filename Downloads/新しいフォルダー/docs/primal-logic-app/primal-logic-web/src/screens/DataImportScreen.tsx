/**
 * CarnivoreOS - 繝・・繧ｿ繧､繝ｳ繝昴・繝育判髱｢
 *
 * 繝・・繧ｿ縺ｮ繝舌ャ繧ｯ繧｢繝・・縺ｨ蠕ｩ蜈・ｩ溯・
 */

import { useState, useRef } from 'react';
import { getDailyLogs, saveDailyLog, saveUserProfile } from '../utils/storage';
import { logError } from '../utils/errorHandler';
import './DataImportScreen.css';

interface DataImportScreenProps {
  onBack: () => void;
}

export default function DataImportScreen({ onBack }: DataImportScreenProps) {
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert('繝輔ぃ繧､繝ｫ繧帝∈謚槭＠縺ｦ縺上□縺輔＞');
      return;
    }

    setImporting(true);
    setImported(false);
    setError(null);

    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      // 繝舌・繧ｸ繝ｧ繝ｳ繝√ぉ繝・け
      if (!importData.version) {
        throw new Error('辟｡蜉ｹ縺ｪ繝・・繧ｿ蠖｢蠑上〒縺・);
      }

      // 譌｢蟄倥ョ繝ｼ繧ｿ縺ｮ繝舌ャ繧ｯ繧｢繝・・・育｢ｺ隱搾ｼ・      if (
        !window.confirm(
          '譌｢蟄倥・繝・・繧ｿ繧剃ｸ頑嶌縺阪＠縺ｾ縺吶°・歃n・域耳螂ｨ: 蜈医↓繧ｨ繧ｯ繧ｹ繝昴・繝医＠縺ｦ繝舌ャ繧ｯ繧｢繝・・繧貞叙縺｣縺ｦ縺上□縺輔＞・・
        )
      ) {
        setImporting(false);
        return;
      }

      // 繝ｦ繝ｼ繧ｶ繝ｼ繝励Ο繝輔ぃ繧､繝ｫ繧偵う繝ｳ繝昴・繝・      if (importData.userProfile) {
        await saveUserProfile(importData.userProfile);
      }

      // 險ｭ螳壹ｒ繧､繝ｳ繝昴・繝・      if (importData.settings) {
        localStorage.setItem('primal_logic_settings', JSON.stringify(importData.settings));
      }

      // 譌･谺｡繝ｭ繧ｰ繧偵う繝ｳ繝昴・繝・      if (importData.dailyLogs && Array.isArray(importData.dailyLogs)) {
        for (const log of importData.dailyLogs) {
          await saveDailyLog(log);
        }
      }

      setImported(true);
      alert('繝・・繧ｿ縺ｮ繧､繝ｳ繝昴・繝医′螳御ｺ・＠縺ｾ縺励◆');
      // 逕ｻ髱｢繧偵Μ繝ｭ繝ｼ繝峨＠縺ｦ繝・・繧ｿ繧貞渚譏
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      logError(error, { component: 'DataImportScreen', action: 'handleImport' });
      setError('繝・・繧ｿ縺ｮ繧､繝ｳ繝昴・繝医↓螟ｱ謨励＠縺ｾ縺励◆縲ゅヵ繧｡繧､繝ｫ蠖｢蠑上ｒ遒ｺ隱阪＠縺ｦ縺上□縺輔＞縲・);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="data-import-screen">
      <div className="data-import-container">
        <button onClick={onBack} className="data-import-back-button">
          竊・險ｭ螳壹↓謌ｻ繧・        </button>
        <h1 className="data-import-title">繝・・繧ｿ繧､繝ｳ繝昴・繝・/h1>
        <p className="data-import-description">
          繧ｨ繧ｯ繧ｹ繝昴・繝医＠縺櫟SON繝輔ぃ繧､繝ｫ繧帝∈謚槭＠縺ｦ縲√ョ繝ｼ繧ｿ繧貞ｾｩ蜈・〒縺阪∪縺吶・        </p>

        <div className="data-import-form">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={() => {
              // 繝輔ぃ繧､繝ｫ驕ｸ謚樊凾縺ｮ蜃ｦ逅・・handleImport縺ｧ陦後≧
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="data-import-select-button"
          >
            繝輔ぃ繧､繝ｫ繧帝∈謚・          </button>
          {fileInputRef.current?.files?.[0] && (
            <p style={{ fontSize: '14px', color: '#78716c', marginTop: '0.5rem' }}>
              驕ｸ謚樔ｸｭ: {fileInputRef.current.files[0].name}
            </p>
          )}

          <button
            onClick={handleImport}
            disabled={importing || !fileInputRef.current?.files?.[0]}
            className="data-import-button"
          >
            {importing ? '繧､繝ｳ繝昴・繝井ｸｭ...' : '繝・・繧ｿ繧偵う繝ｳ繝昴・繝・}
          </button>
        </div>

        {imported && <div className="data-import-success">笨・繝・・繧ｿ縺ｮ繧､繝ｳ繝昴・繝医′螳御ｺ・＠縺ｾ縺励◆</div>}

        {error && <div className="data-import-error">笞・・{error}</div>}

        <div className="data-import-info">
          <h3>豕ｨ諢丈ｺ矩・/h3>
          <ul>
            <li>繧､繝ｳ繝昴・繝亥燕縺ｫ譌｢蟄倥ョ繝ｼ繧ｿ縺ｮ繧ｨ繧ｯ繧ｹ繝昴・繝医ｒ謗ｨ螂ｨ縺励∪縺・/li>
            <li>譌｢蟄倥・繝・・繧ｿ縺ｯ荳頑嶌縺阪＆繧後∪縺・/li>
            <li>繧ｨ繧ｯ繧ｹ繝昴・繝医＠縺櫟SON繝輔ぃ繧､繝ｫ縺ｮ縺ｿ繧､繝ｳ繝昴・繝亥庄閭ｽ縺ｧ縺・/li>
          </ul>
        </div>
      </div>
    </div>
  );
}

