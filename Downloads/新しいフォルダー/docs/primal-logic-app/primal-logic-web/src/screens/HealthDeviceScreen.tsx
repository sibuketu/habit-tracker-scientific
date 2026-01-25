/**
 * CarnivoreOS - Health Device Screen
 *
 * 繧ｦ繧ｧ繧｢繝ｩ繝悶Ν繝・ヰ繧､繧ｹ騾｣謳ｺ逕ｻ髱｢
 *
 * 豕ｨ諢・ Web繧｢繝励Μ縺ｧ縺ｯ逶ｴ謗･逧・↑騾｣謳ｺ縺ｯ髮｣縺励＞縺溘ａ縲∵焔蜍募・蜉帶ｩ溯・繧呈署萓・ */

import { useState, useEffect } from 'react';
import { saveHealthData, getHealthData, type HealthData } from '../utils/healthDeviceSync';
import { getGoogleFitData, type GoogleFitData } from '../utils/googleFitService';
import { useTranslation } from '../utils/i18n';
import { logError } from '../utils/errorHandler';
import './HealthDeviceScreen.css';

interface HealthDeviceScreenProps {
  onBack: () => void;
}

export default function HealthDeviceScreen({ onBack }: HealthDeviceScreenProps) {
  const { t } = useTranslation();
  const today = new Date().toISOString().split('T')[0];
  const [healthData, setHealthData] = useState<HealthData>(() => {
    const todayData = getHealthData(today);
    return todayData[0] || { date: today };
  });
  const [saved, setSaved] = useState(false);
  const [isLoadingGoogleFit, setIsLoadingGoogleFit] = useState(false);
  const [googleFitData, setGoogleFitData] = useState<GoogleFitData | null>(null);

  useEffect(() => {
    const todayData = getHealthData(today);
    if (todayData[0]) {
      setHealthData(todayData[0]);
    }
  }, [today]);

  // Google Fit縺九ｉ繝・・繧ｿ繧貞叙蠕暦ｼ亥・蝗槭Ο繝ｼ繝画凾・・  useEffect(() => {
    const loadGoogleFitData = async () => {
      setIsLoadingGoogleFit(true);
      try {
        const data = await getGoogleFitData(today);
        if (data) {
          setGoogleFitData(data);
          // Google Fit繝・・繧ｿ繧檀ealthData縺ｫ蜿肴丐
          setHealthData((prev) => ({
            ...prev,
            steps: data.steps,
            heartRate: data.heartRate,
            activeMinutes: data.activeMinutes,
            caloriesBurned: data.caloriesBurned,
          }));
        }
      } catch (error) {
        // 繧ｨ繝ｩ繝ｼ縺ｯ辟｡隕厄ｼ域焔蜍募・蜉帙↓繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ・・        if (import.meta.env.DEV) {
          console.log('Google Fit data fetch failed:', error);
        }
      } finally {
        setIsLoadingGoogleFit(false);
      }
    };
    loadGoogleFitData();
  }, [today]);

  const handleSave = () => {
    try {
      saveHealthData(healthData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      logError(error, { component: 'HealthDeviceScreen', action: 'handleSave' });
      alert('繝・・繧ｿ縺ｮ菫晏ｭ倥↓螟ｱ謨励＠縺ｾ縺励◆');
    }
  };

  return (
    <div className="health-device-screen">
      <div className="health-device-container">
        <button onClick={onBack} className="health-device-back-button">
          竊・謌ｻ繧・        </button>
        <h1 className="health-device-title">蛛･蠎ｷ繝・ヰ繧､繧ｹ騾｣謳ｺ</h1>
        <p className="health-device-description">
          Web繧｢繝励Μ縺ｧ縺ｯ逶ｴ謗･逧・↑騾｣謳ｺ縺ｯ髮｣縺励＞縺溘ａ縲∵焔蜍輔〒蜈･蜉帙〒縺阪∪縺吶・          蟆・擂逧・↓繝｢繝舌う繝ｫ繧｢繝励Μ・・xpo・峨〒Apple Health縲；oogle Fit縺ｨ縺ｮ騾｣謳ｺ繧貞ｮ溯｣・ｺ亥ｮ壹〒縺吶・        </p>
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={async () => {
              setIsLoadingGoogleFit(true);
              try {
                const data = await getGoogleFitData(today);
                if (data) {
                  setGoogleFitData(data);
                  setHealthData({
                    steps: data.steps,
                    heartRate: data.heartRate,
                    activeMinutes: data.activeMinutes,
                    caloriesBurned: data.caloriesBurned,
                  });
                }
              } catch (error) {
                // 繧ｨ繝ｩ繝ｼ縺ｯ辟｡隕・              } finally {
                setIsLoadingGoogleFit(false);
              }
            }}
            disabled={isLoadingGoogleFit}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoadingGoogleFit ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
            }}
          >
            {isLoadingGoogleFit ? '隱ｭ縺ｿ霎ｼ縺ｿ荳ｭ...' : '売 Google Fit縺九ｉ蜿門ｾ・}
          </button>
          {googleFitData && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              Google Fit繝・・繧ｿ繧貞叙蠕励＠縺ｾ縺励◆
            </div>
          )}
        </div>

        <div className="health-device-form">
          <div className="health-device-input-group">
            <label className="health-device-label">
              豁ｩ謨ｰ
              <input
                type="number"
                value={healthData.steps || ''}
                onChange={(e) =>
                  setHealthData({
                    ...healthData,
                    steps: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                placeholder="萓・ 10000"
                min="0"
                className="health-device-input"
              />
            </label>
          </div>

          <div className="health-device-input-group">
            <label className="health-device-label">
              蠢・牛謨ｰ (bpm)
              <input
                type="number"
                value={healthData.heartRate || ''}
                onChange={(e) =>
                  setHealthData({
                    ...healthData,
                    heartRate: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                placeholder="萓・ 70"
                min="0"
                max="220"
                className="health-device-input"
              />
            </label>
          </div>

          <div className="health-device-input-group">
            <label className="health-device-label">
              豢ｻ蜍墓凾髢・(蛻・
              <input
                type="number"
                value={healthData.activeMinutes || ''}
                onChange={(e) =>
                  setHealthData({
                    ...healthData,
                    activeMinutes: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                placeholder="萓・ 30"
                min="0"
                className="health-device-input"
              />
            </label>
          </div>

          <div className="health-device-input-group">
            <label className="health-device-label">
              豸郁ｲｻ繧ｫ繝ｭ繝ｪ繝ｼ (kcal)
              <input
                type="number"
                value={healthData.caloriesBurned || ''}
                onChange={(e) =>
                  setHealthData({
                    ...healthData,
                    caloriesBurned: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                placeholder="萓・ 200"
                min="0"
                className="health-device-input"
              />
            </label>
          </div>

          <button onClick={handleSave} className="health-device-save-button">
            {saved ? '笨・菫晏ｭ倥＠縺ｾ縺励◆' : '菫晏ｭ・}
          </button>
        </div>

        <div className="health-device-info">
          <h3>蟆・擂螳溯｣・ｺ亥ｮ・/h3>
          <ul>
            <li>Apple Health騾｣謳ｺ・・OS・・/li>
            <li>Google Fit騾｣謳ｺ・・ndroid・・/li>
            <li>閾ｪ蜍輔ョ繝ｼ繧ｿ蜷梧悄</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

