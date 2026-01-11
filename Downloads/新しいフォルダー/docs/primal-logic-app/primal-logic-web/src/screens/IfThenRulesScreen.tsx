/**
 * Primal Logic - If-Thenルール画面
 *
 * 条件に応じた自動アクションを設定（例：外食時、糖質摂取時など）
 */

import { useState, useEffect } from 'react';
import { useTranslation } from '../utils/i18n';

interface IfThenRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
}

export default function IfThenRulesScreen() {
  const { t } = useTranslation();
  const [rules, setRules] = useState<IfThenRule[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRule, setEditingRule] = useState<IfThenRule | null>(null);

  // ルールを読み込む
  useEffect(() => {
    const savedRules = localStorage.getItem('primal_logic_if_then_rules');
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    } else {
      // デフォルトルール
      const defaultRules: IfThenRule[] = [
        {
          id: '1',
          name: '外食時',
          condition: '外食を記録した時',
          action: 'リカバリープロトコルを提案',
          enabled: true,
        },
        {
          id: '2',
          name: '糖質摂取時',
          condition: '糖質を20g以上摂取した時',
          action: 'リカバリープロトコルを自動生成',
          enabled: true,
        },
      ];
      setRules(defaultRules);
      localStorage.setItem('primal_logic_if_then_rules', JSON.stringify(defaultRules));
    }
  }, []);

  // ルールを保存
  const saveRules = (newRules: IfThenRule[]) => {
    setRules(newRules);
    localStorage.setItem('primal_logic_if_then_rules', JSON.stringify(newRules));
  };

  // ルールの有効/無効を切り替え
  const toggleRule = (id: string) => {
    const newRules = rules.map((rule) =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    );
    saveRules(newRules);
  };

  // ルールを削除
  const deleteRule = (id: string) => {
    if (window.confirm('このルールを削除しますか？')) {
      const newRules = rules.filter((rule) => rule.id !== id);
      saveRules(newRules);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          ⚙️ If-Thenルール
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          条件に応じた自動アクションを設定できます。例：外食時、糖質摂取時など
        </p>
      </div>

      {/* ルール一覧 */}
      <div style={{ marginBottom: '2rem' }}>
        {rules.length === 0 ? (
          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
            }}
          >
            <p style={{ fontSize: '14px', color: '#6b7280' }}>ルールがありません</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {rules.map((rule) => (
              <div
                key={rule.id}
                style={{
                  padding: '1rem',
                  backgroundColor: rule.enabled ? '#fef3c7' : '#f9fafb',
                  borderRadius: '8px',
                  border: `1px solid ${rule.enabled ? '#fbbf24' : '#e5e7eb'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {rule.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>条件:</strong> {rule.condition}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>
                      <strong>アクション:</strong> {rule.action}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      onClick={() => toggleRule(rule.id)}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: rule.enabled ? '#10b981' : '#e5e7eb',
                        color: rule.enabled ? 'white' : '#6b7280',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      {rule.enabled ? 'ON' : 'OFF'}
                    </button>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 追加ボタン */}
      <button
        onClick={() => setShowAddModal(true)}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: '#b91c1c',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        + 新しいルールを追加
      </button>

      {/* 追加/編集モーダル */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => {
            setShowAddModal(false);
            setEditingRule(null);
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '500px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1rem' }}>
              {editingRule ? 'ルールを編集' : '新しいルールを追加'}
            </h2>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '1rem' }}>
              現在は実装中です。今後、条件とアクションを設定できるようになります。
            </p>
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingRule(null);
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* 戻るボタン */}
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => {
            const event = new CustomEvent('navigateToScreen', { detail: 'labs' });
            window.dispatchEvent(event);
          }}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          戻る
        </button>
      </div>
    </div>
  );
}

