/**
 * CarnivoreOS - If-Thenルール画面
 *
 * 条件に応じた�E動アクションを設定（例：外食時、糖質摂取時など�E�E */

import { useState, useEffect } from 'react';
import { useTranslation } from '../utils/i18n';

interface IfThenRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
}

// 条件のプリセチE��
const CONDITION_PRESETS = [
  { id: 'eating_out', label: '外食を記録した晁E, value: 'eating_out' },
  { id: 'carbs_20g', label: '糖質めE0g以上摂取した時', value: 'carbs_20g' },
  { id: 'carbs_10g', label: '糖質めE0g以上摂取した時', value: 'carbs_10g' },
  { id: 'low_fat', label: '脂質ぁE0g以下�E時（脂質不足警告！E, value: 'low_fat' },
  { id: 'custom', label: 'カスタム条件�E�封E��実裁E��E, value: 'custom', disabled: true },
];

// アクションのプリセチE��
const ACTION_PRESETS = [
  { id: 'suggest_recovery', label: 'リカバリープロトコルを提桁E, value: 'suggest_recovery' },
  { id: 'auto_recovery', label: 'リカバリープロトコルを�E動生戁E, value: 'auto_recovery' },
  { id: 'send_notification', label: '通知を送る', value: 'send_notification' },
  { id: 'prompt_log', label: '記録を俁E��', value: 'prompt_log' },
  { id: 'custom', label: 'カスタムアクション�E�封E��実裁E��E, value: 'custom', disabled: true },
];

export default function IfThenRulesScreen() {
  const { t } = useTranslation();
  const [rules, setRules] = useState<IfThenRule[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRule, setEditingRule] = useState<IfThenRule | null>(null);

  // フォーム用のstate
  const [formName, setFormName] = useState('');
  const [formCondition, setFormCondition] = useState('');
  const [formAction, setFormAction] = useState('');
  const [formError, setFormError] = useState('');

  // ルールを読み込む
  useEffect(() => {
    const savedRules = localStorage.getItem('primal_logic_if_then_rules');
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    } else {
      // チE��ォルトルール
      const defaultRules: IfThenRule[] = [
        {
          id: '1',
          name: '外食時',
          condition: '外食を記録した晁E,
          action: 'リカバリープロトコルを提桁E,
          enabled: true,
        },
        {
          id: '2',
          name: '糖質摂取晁E,
          condition: '糖質めE0g以上摂取した時',
          action: 'リカバリープロトコルを�E動生戁E,
          enabled: true,
        },
      ];
      setRules(defaultRules);
      localStorage.setItem('primal_logic_if_then_rules', JSON.stringify(defaultRules));
    }
  }, []);

  // ルールを保孁E  const saveRules = (newRules: IfThenRule[]) => {
    setRules(newRules);
    localStorage.setItem('primal_logic_if_then_rules', JSON.stringify(newRules));
  };

  // ルールの有効/無効を�Eり替ぁE  const toggleRule = (id: string) => {
    const newRules = rules.map((rule) =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    );
    saveRules(newRules);
  };

  // ルールを削除
  const deleteRule = (id: string) => {
    if (window.confirm('こ�Eルールを削除しますか�E�E)) {
      const newRules = rules.filter((rule) => rule.id !== id);
      saveRules(newRules);
    }
  };

  // ルール編雁E��開姁E  const startEditRule = (rule: IfThenRule) => {
    setEditingRule(rule);
    setFormName(rule.name);
    setFormCondition(rule.condition);
    setFormAction(rule.action);
    setFormError('');
    setShowAddModal(true);
  };

  // フォームをリセチE��
  const resetForm = () => {
    setFormName('');
    setFormCondition('');
    setFormAction('');
    setFormError('');
    setEditingRule(null);
    setShowAddModal(false);
  };

  // ルールを保存（新規作�Eまた�E編雁E��E  const handleSaveRule = () => {
    // バリチE�Eション
    if (!formName.trim()) {
      setFormError('ルール名を入力してください');
      return;
    }
    if (!formCondition) {
      setFormError('条件を選択してください');
      return;
    }
    if (!formAction) {
      setFormError('アクションを選択してください');
      return;
    }

    // 条件とアクションのラベルを取征E    const conditionLabel =
      CONDITION_PRESETS.find((c) => c.value === formCondition)?.label || formCondition;
    const actionLabel = ACTION_PRESETS.find((a) => a.value === formAction)?.label || formAction;

    if (editingRule) {
      // 編雁E��ーチE      const newRules = rules.map((rule) =>
        rule.id === editingRule.id
          ? { ...rule, name: formName.trim(), condition: conditionLabel, action: actionLabel }
          : rule
      );
      saveRules(newRules);
    } else {
      // 新規作�EモーチE      const newRule: IfThenRule = {
        id: Date.now().toString(),
        name: formName.trim(),
        condition: conditionLabel,
        action: actionLabel,
        enabled: true,
      };
      saveRules([...rules, newRule]);
    }

    resetForm();
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          ⚙︁EIf-Thenルール
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          条件に応じた�E動アクションを設定できます。例：外食時、糖質摂取時など
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
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
                >
                  <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => startEditRule(rule)}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {rule.name} ✏︁E                    </h3>
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
                        padding: '0.5rem 1rem',
                        minHeight: '44px',
                        minWidth: '44px',
                        backgroundColor: rule.enabled ? '#10b981' : '#e5e7eb',
                        color: rule.enabled ? 'white' : '#6b7280',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        touchAction: 'manipulation',
                      }}
                    >
                      {rule.enabled ? 'ON' : 'OFF'}
                    </button>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        minHeight: '44px',
                        minWidth: '44px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        touchAction: 'manipulation',
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
          minHeight: '44px',
          backgroundColor: '#b91c1c',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          touchAction: 'manipulation',
        }}
      >
        + 新しいルールを追加
      </button>

      {/* 追加/編雁E��ーダル */}
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
            padding: '1rem',
          }}
          onClick={resetForm}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1rem' }}>
              {editingRule ? 'ルールを編雁E : '新しいルールを追加'}
            </h2>

            {/* エラーメチE��ージ */}
            {formError && (
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  fontSize: '14px',
                }}
              >
                {formError}
              </div>
            )}

            {/* ルール名�E劁E*/}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                }}
              >
                ルール吁E<span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="侁E 外食時の対忁E
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  minHeight: '44px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  touchAction: 'manipulation',
                }}
              />
            </div>

            {/* 条件選抁E*/}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                }}
              >
                条件 <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {CONDITION_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => !preset.disabled && setFormCondition(preset.value)}
                    disabled={preset.disabled}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      minHeight: '44px',
                      backgroundColor: formCondition === preset.value ? '#fef3c7' : '#f9fafb',
                      border: `2px solid ${formCondition === preset.value ? '#fbbf24' : '#e5e7eb'}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      textAlign: 'left',
                      cursor: preset.disabled ? 'not-allowed' : 'pointer',
                      opacity: preset.disabled ? 0.5 : 1,
                      fontWeight: formCondition === preset.value ? '600' : '400',
                      touchAction: 'manipulation',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* アクション選抁E*/}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                }}
              >
                アクション <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {ACTION_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => !preset.disabled && setFormAction(preset.value)}
                    disabled={preset.disabled}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      minHeight: '44px',
                      backgroundColor: formAction === preset.value ? '#dcfce7' : '#f9fafb',
                      border: `2px solid ${formAction === preset.value ? '#10b981' : '#e5e7eb'}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      textAlign: 'left',
                      cursor: preset.disabled ? 'not-allowed' : 'pointer',
                      opacity: preset.disabled ? 0.5 : 1,
                      fontWeight: formAction === preset.value ? '600' : '400',
                      touchAction: 'manipulation',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ボタン */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={resetForm}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  minHeight: '44px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                }}
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveRule}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  minHeight: '44px',
                  backgroundColor: '#b91c1c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                }}
              >
                {editingRule ? '更新' : '追加'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 戻る�Eタン */}
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => {
            const event = new CustomEvent('navigateToScreen', { detail: 'labs' });
            window.dispatchEvent(event);
          }}
          style={{
            width: '100%',
            padding: '0.75rem',
            minHeight: '44px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
        >
          戻めE        </button>
      </div>
    </div>
  );
}

