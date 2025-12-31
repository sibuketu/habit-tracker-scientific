import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getDailyLogs, getDailyLogByDate, saveDailyLog } from '../utils/storage';
import { calculateAllMetrics } from '../utils/nutrientCalculator';
import { useTranslation } from '../utils/i18n';
import { logError, getUserFriendlyErrorMessage } from '../utils/errorHandler';
import type { DailyLog } from '../types';
import './DiaryScreen.css';

type DiaryScreenProps = {
  onBack: () => void;
};

export default function DiaryScreen({ onBack }: DiaryScreenProps) {
  const { t } = useTranslation();
  const { dailyLog, userProfile, loadTodayLog } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const [diary, setDiary] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const [logs, setLogs] = useState<Array<{ date: string; diary?: string }>>([]);
  const [isSaving, setIsSaving] = useState(false);

  const loadHistoryLogs = async () => {
    try {
      const allLogs = await getDailyLogs();
      setLogs(allLogs.filter(log => log.diary && log.diary.trim().length > 0));
    } catch (error) {
      logError(error, { component: 'DiaryScreen', action: 'loadDiaryEntries' });
    }
  };

  useEffect(() => {
    loadHistoryLogs();
  }, []);

  useEffect(() => {
    const loadDateLog = async () => {
      try {
        const log = await getDailyLogByDate(selectedDate);
        if (log?.diary !== undefined) {
          setDiary(log.diary || '');
        } else {
          setDiary('');
        }
      } catch (error) {
        logError(error, { component: 'DiaryScreen', action: 'loadDateLog' });
        setDiary('');
      }
    };
    loadDateLog();
  }, [selectedDate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const existingLog = await getDailyLogByDate(selectedDate);
      const logToSave: DailyLog = existingLog || {
        date: selectedDate,
        status: {
          sleepScore: 80,
          sunMinutes: 30,
          activityLevel: 'moderate',
        },
        fuel: [],
        calculatedMetrics: calculateAllMetrics([], userProfile || undefined),
      };
      
      const savedLog: DailyLog = {
        ...logToSave,
        diary: diary.trim(),
      };
      
      await saveDailyLog(savedLog);
      await loadHistoryLogs();
      
      if (selectedDate === today) {
        await loadTodayLog();
        window.dispatchEvent(new CustomEvent('dailyLogUpdated'));
      }
    } catch (error) {
      logError(error, { component: 'DiaryScreen', action: 'handleSave' });
      alert(getUserFriendlyErrorMessage(error) || t('diary.saveFailed'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="diary-screen-container">
      <div className="diary-screen-content">
        <div className="diary-screen-header">
          <button onClick={onBack} className="back-button">
            ←
          </button>
          <h1 className="diary-screen-title">{t('diary.title')}</h1>
        </div>

        <div className="diary-screen-date-selector">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="diary-screen-date-input"
          />
        </div>

        <div className="diary-screen-input-section">
          <textarea
            className="diary-screen-textarea"
            value={diary}
            onChange={(e) => setDiary(e.target.value)}
            onBlur={handleSave}
            placeholder={t('diary.placeholder')}
            rows={10}
          />
          <button
            onClick={handleSave}
            className="diary-screen-save-button"
            disabled={isSaving}
          >
            {isSaving ? t('diary.saving') : t('diary.save')}
          </button>
        </div>

        <div className="diary-screen-history">
          <h2 className="diary-screen-history-title">{t('diary.pastDiary')}</h2>
          <div className="diary-screen-history-list">
            {logs.map((log) => (
              <div
                key={log.date}
                className="diary-screen-history-item"
                onClick={() => setSelectedDate(log.date)}
              >
                <div className="diary-screen-history-date">{log.date}</div>
                <div className="diary-screen-history-preview">
                  {log.diary?.substring(0, 100)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

