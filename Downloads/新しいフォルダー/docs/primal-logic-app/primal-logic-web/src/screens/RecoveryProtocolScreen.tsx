/**
 * Primal Logic - Recovery Protocol Screen (Web版)
 * 
 * Phase 4: Recovery Protocol詳細画面、編集UI、SET PROTOCOLボタン
 */

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { RecoveryProtocol, TodoItem } from '../types';
import { calculateTargetFastEnd } from '../utils/recoveryAlgorithm';
import { scheduleDefrostReminder, hasMeatInPlan } from '../utils/defrostReminder';
import { addProtocolToTomorrowLog } from '../utils/tomorrowLog';
import { logError, getUserFriendlyErrorMessage } from '../utils/errorHandler';
import './RecoveryProtocolScreen.css';

interface RecoveryProtocolScreenProps {
  protocol: RecoveryProtocol;
  onClose: () => void;
  onSetProtocol: (protocol: RecoveryProtocol) => void;
}

export default function RecoveryProtocolScreen({
  protocol,
  onClose,
  onSetProtocol,
}: RecoveryProtocolScreenProps) {
  const { dailyLog, saveDailyLog, loadDailyLog } = useApp();
  const [fastingHours, setFastingHours] = useState(protocol.fastingTargetHours);

  const handleSetProtocol = async () => {
    const updatedProtocol: RecoveryProtocol = {
      ...protocol,
      fastingTargetHours: fastingHours,
      targetFastEnd: calculateTargetFastEnd(fastingHours),
    };

    try {
      // Add protocol to tomorrow's log
      await addProtocolToTomorrowLog(updatedProtocol);

      // Also set in current log (for display)
      onSetProtocol(updatedProtocol);

      // Schedule defrost reminder if meat is in plan
      if (hasMeatInPlan(updatedProtocol)) {
        const meatItem = updatedProtocol.dietRecommendations
          ?.find((rec) => rec.toLowerCase().includes('ribeye') || rec.toLowerCase().includes('meat'))
          ?.split(' ')
          .find((word) => word.toLowerCase().includes('ribeye') || word.toLowerCase().includes('beef')) || 'meat';
        
        await scheduleDefrostReminder(meatItem);
      }

      alert(
        `✅ プロトコル設定完了\nリカバリープロトコルが明日のログに追加されました。\n断食: ${fastingHours}時間${hasMeatInPlan(updatedProtocol) ? '\n解凍リマインダーを今夜8時に設定しました。' : ''}`
      );
      onClose();
    } catch (error) {
      logError(error, { component: 'RecoveryProtocolScreen', action: 'handleSetProtocol' });
      alert(getUserFriendlyErrorMessage(error) || 'エラー: プロトコルの設定に失敗しました。再度お試しください。');
    }
  };

  return (
    <div className="recovery-protocol-overlay" onClick={onClose}>
      <div className="recovery-protocol-container" onClick={(e) => e.stopPropagation()}>
        <div className="recovery-protocol-header">
          <h2 className="recovery-protocol-title">リカバリープロトコル</h2>
          <button className="recovery-protocol-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="recovery-protocol-content">
          <div className="recovery-protocol-section">
            <h3 className="recovery-protocol-section-title">違反タイプ</h3>
            <div className="recovery-protocol-violation-type">
              {protocol.violationType.replace('_', ' ').toUpperCase()}
            </div>
          </div>

          <div className="recovery-protocol-section">
            <h3 className="recovery-protocol-section-title">断食時間</h3>
            <div className="recovery-protocol-fasting-row">
              <input
                type="number"
                className="recovery-protocol-fasting-input"
                value={fastingHours.toString()}
                onChange={(e) => setFastingHours(Number(e.target.value) || 16)}
              />
              <span className="recovery-protocol-fasting-label">時間</span>
            </div>
            <div className="recovery-protocol-fasting-hint">
              目標断食終了時刻: {calculateTargetFastEnd(fastingHours)}
            </div>
          </div>

          {protocol.activities && protocol.activities.length > 0 && (
            <div className="recovery-protocol-section">
              <h3 className="recovery-protocol-section-title">推奨アクティビティ</h3>
              {protocol.activities.map((activity, index) => (
                <div key={index} className="recovery-protocol-list-item">
                  <span className="recovery-protocol-list-bullet">•</span>
                  <span className="recovery-protocol-list-text">{activity}</span>
                </div>
              ))}
            </div>
          )}

          {protocol.dietRecommendations && protocol.dietRecommendations.length > 0 && (
            <div className="recovery-protocol-section">
              <h3 className="recovery-protocol-section-title">食事の推奨事項</h3>
              {protocol.dietRecommendations.map((rec, index) => (
                <div key={index} className="recovery-protocol-list-item">
                  <span className="recovery-protocol-list-bullet">•</span>
                  <span className="recovery-protocol-list-text">{rec}</span>
                </div>
              ))}
            </div>
          )}

          {protocol.supplements && protocol.supplements.length > 0 && (
            <div className="recovery-protocol-section">
              <h3 className="recovery-protocol-section-title">サプリメント（任意）</h3>
              {protocol.supplements.map((supp, index) => (
                <div key={index} className="recovery-protocol-list-item">
                  <span className="recovery-protocol-list-bullet">•</span>
                  <span className="recovery-protocol-list-text">{supp}</span>
                </div>
              ))}
            </div>
          )}

          {protocol.warnings && protocol.warnings.length > 0 && (
            <div className="recovery-protocol-warning-section">
              <h3 className="recovery-protocol-warning-title">⚠️ 警告</h3>
              {protocol.warnings.map((warning, index) => (
                <div key={index} className="recovery-protocol-list-item">
                  <span className="recovery-protocol-list-bullet">⚠️</span>
                  <span className="recovery-protocol-warning-text">{warning}</span>
                </div>
              ))}
            </div>
          )}

          {/* Recovery Quest: Todoリスト */}
          {protocol.todos && protocol.todos.length > 0 && (
            <div className="recovery-protocol-section">
              <h3 className="recovery-protocol-section-title">📋 実行すべきタスク</h3>
              {protocol.todos.map((todo) => (
                <div
                  key={todo.id}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: todo.isCompleted ? '#f0fdf4' : '#fef3c7',
                    border: `1px solid ${todo.isCompleted ? '#86efac' : '#fbbf24'}`,
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={async (e) => {
                      // Todoの完了状態を更新
                      const updatedTodos = protocol.todos?.map(t => 
                        t.id === todo.id ? { ...t, isCompleted: e.target.checked } : t
                      ) || [];
                      
                      // Recovery Protocolを更新
                      const updatedProtocol: RecoveryProtocol = {
                        ...protocol,
                        todos: updatedTodos,
                      };
                      
                      // 現在のログに反映
                      if (dailyLog) {
                        const updatedLog: DailyLog = {
                          ...dailyLog,
                          recoveryProtocol: updatedProtocol,
                        };
                        await saveDailyLog(updatedLog);
                        loadDailyLog(new Date().toISOString().split('T')[0]);
                      }
                    }}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: todo.isCompleted ? '#166534' : '#92400e' }}>
                      {todo.title}
                    </div>
                    {todo.description && (
                      <div style={{ fontSize: '12px', color: todo.isCompleted ? '#16a34a' : '#78350f' }}>
                        {todo.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="recovery-protocol-set-button" onClick={handleSetProtocol}>
            プロトコルを設定
          </button>

          <div className="recovery-protocol-footer-note">
            このプロトコルは明日のログに追加され、今夜8時に解凍リマインダーが設定されます。
          </div>
        </div>
      </div>
    </div>
  );
}

