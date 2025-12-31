# 新機能実装提案: Bio-Tuner / Hybrid AI / Data-Driven Consultation

## 概要
Geminiとの会話で出た3つの差別化機能の実装提案。既存のPrimal Logicアプリに統合するための具体的な実装方法を提示します。

---

## 1. Bio-Tuner (排泄データによる脂質調整ロジック)

### 1.1 データモデルの変更

#### DailyStatus型の拡張 (`src/types/index.ts`)

```typescript
export interface DailyStatus {
  sleepScore: number; // 0-100
  sunMinutes: number;
  activityLevel: 'high' | 'low' | 'moderate';
  stressLevel?: 'low' | 'medium' | 'high';
  // 🔥 新規追加
  bowelMovement?: {
    status: 'normal' | 'constipated' | 'loose' | 'watery'; // デフォルト: 'normal'
    bristolScale?: number; // 1-7 (オプション、詳細記録用)
    notes?: string; // メモ（オプション）
  };
}
```

#### Supabaseスキーマの更新 (`supabase_schema.sql`)

```sql
-- daily_logsテーブルのstatusカラムは既にJSONBなので、追加カラムは不要
-- 既存のstatus JSONBに新しいフィールドを追加するだけでOK

-- ただし、インデックス追加の場合は以下を実行:
-- CREATE INDEX IF NOT EXISTS idx_daily_logs_bowel_movement 
-- ON daily_logs USING GIN ((status->'bowelMovement'));
```

#### ストレージ型定義の更新 (`src/types/supabase.ts`)

```typescript
export interface DailyLogRow {
  // ... 既存フィールド
  status: {
    sleep_score: number;
    sun_minutes: number;
    activity_level: 'high' | 'moderate' | 'low';
    stress_level?: 'low' | 'medium' | 'high';
    // 🔥 新規追加
    bowel_movement?: {
      status: 'normal' | 'constipated' | 'loose' | 'watery';
      bristol_scale?: number;
      notes?: string;
    };
  };
  // ... 残りのフィールド
}
```

### 1.2 UI実装（InputScreen / HomeScreen）

#### InputScreenに排泄記録セクションを追加

```typescript
// src/screens/InputScreen.tsx に追加

const [bowelMovement, setBowelMovement] = useState<{
  status: 'normal' | 'constipated' | 'loose' | 'watery';
  bristolScale?: number;
  notes?: string;
}>({
  status: 'normal', // 🔥 デフォルトで「正常」を設定（ワンタップ完了）
});

// UIコンポーネント
<div className="input-screen-section">
  <label className="input-screen-label">排泄記録（オプション）</label>
  <div className="input-screen-button-row">
    <button
      className={`input-screen-level-button ${bowelMovement.status === 'normal' ? 'active' : ''}`}
      onClick={() => setBowelMovement({ status: 'normal' })}
    >
      正常
    </button>
    <button
      className={`input-screen-level-button ${bowelMovement.status === 'constipated' ? 'active' : ''}`}
      onClick={() => setBowelMovement({ status: 'constipated' })}
    >
      硬い/出ない
    </button>
    <button
      className={`input-screen-level-button ${bowelMovement.status === 'loose' ? 'active' : ''}`}
      onClick={() => setBowelMovement({ status: 'loose' })}
    >
      緩い
    </button>
    <button
      className={`input-screen-level-button ${bowelMovement.status === 'watery' ? 'active' : ''}`}
      onClick={() => setBowelMovement({ status: 'watery' })}
    >
      水状
    </button>
  </div>
</div>
```

### 1.3 脂質調整ロジック実装

#### 新しいユーティリティファイル: `src/utils/bioTuner.ts`

```typescript
/**
 * Bio-Tuner: 排泄データに基づく脂質調整ロジック
 */

export interface BioTunerInput {
  previousDayFatTotal: number; // 前日の脂質摂取量(g)
  bowelMovementStatus: 'normal' | 'constipated' | 'loose' | 'watery';
}

export interface BioTunerOutput {
  recommendedFatTotal: number; // 推奨脂質摂取量(g)
  adjustmentPercentage: number; // 調整率(%)
  notification?: {
    message: string;
    priority: 'info' | 'warning' | 'important';
  };
}

/**
 * 脂質調整を計算
 */
export function calculateFatAdjustment(input: BioTunerInput): BioTunerOutput {
  const { previousDayFatTotal, bowelMovementStatus } = input;
  
  let adjustmentPercentage = 0;
  let notification: BioTunerOutput['notification'] | undefined;

  switch (bowelMovementStatus) {
    case 'constipated':
      // 便秘 → 脂質+10%
      adjustmentPercentage = 10;
      notification = {
        message: `前日の排泄が「硬い/出ない」でした。脂質目標を+10%に調整しました（${previousDayFatTotal}g → ${Math.round(previousDayFatTotal * 1.1)}g）`,
        priority: 'important',
      };
      break;
    
    case 'loose':
      // 緩い → 脂質-5%（便秘ほど大きく調整しない）
      adjustmentPercentage = -5;
      notification = {
        message: `前日の排泄が「緩い」でした。脂質目標を-5%に調整しました（${previousDayFatTotal}g → ${Math.round(previousDayFatTotal * 0.95)}g）`,
        priority: 'info',
      };
      break;
    
    case 'watery':
      // 水状 → 脂質-10%
      adjustmentPercentage = -10;
      notification = {
        message: `前日の排泄が「水状」でした。脂質目標を-10%に調整しました（${previousDayFatTotal}g → ${Math.round(previousDayFatTotal * 0.9)}g）`,
        priority: 'warning',
      };
      break;
    
    case 'normal':
    default:
      // 正常 → 調整なし
      adjustmentPercentage = 0;
      break;
  }

  const recommendedFatTotal = Math.round(
    previousDayFatTotal * (1 + adjustmentPercentage / 100)
  );

  return {
    recommendedFatTotal,
    adjustmentPercentage,
    notification,
  };
}

/**
 * 前日のログから脂質調整を取得（HomeScreenで使用）
 */
export async function getFatAdjustmentForToday(): Promise<BioTunerOutput | null> {
  const { getDailyLogs } = await import('./storage');
  const logs = await getDailyLogs();
  
  // 昨日の日付を取得
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  const yesterdayLog = logs.find(log => log.date === yesterdayStr);
  
  if (!yesterdayLog || !yesterdayLog.status.bowelMovement) {
    return null; // 前日の記録がない、または排泄記録がない場合
  }

  const fatTotal = yesterdayLog.calculatedMetrics.fatTotal || 0;
  
  return calculateFatAdjustment({
    previousDayFatTotal: fatTotal,
    bowelMovementStatus: yesterdayLog.status.bowelMovement.status,
  });
}
```

### 1.4 HomeScreenへの統合

```typescript
// src/screens/HomeScreen.tsx に追加

import { useEffect, useState } from 'react';
import { getFatAdjustmentForToday } from '../utils/bioTuner';

// コンポーネント内
const [fatAdjustment, setFatAdjustment] = useState<BioTunerOutput | null>(null);

useEffect(() => {
  // 毎日チェック（前日の排泄データに基づく）
  getFatAdjustmentForToday().then(adjustment => {
    if (adjustment && adjustment.notification) {
      setFatAdjustment(adjustment);
      // 通知を表示（例: バナー形式）
    }
  });
}, []);

// UI: 通知バナーの表示
{fatAdjustment?.notification && (
  <div className={`bio-tuner-notification ${fatAdjustment.notification.priority}`}>
    <p>{fatAdjustment.notification.message}</p>
    <button onClick={() => setFatAdjustment(null)}>閉じる</button>
  </div>
)}
```

---

## 2. Hybrid AI Assistant (情報源の動的切り替え)

### 2.1 設定データの追加

#### useSettingsフックの拡張 (`src/hooks/useSettings.ts`)

```typescript
export const useSettings = () => {
  // ... 既存の設定
  
  const [aiMode, setAiMode] = useState<'purist' | 'realist'>(() => {
    const saved = localStorage.getItem('settings_ai_mode');
    return saved ? JSON.parse(saved) : 'purist'; // デフォルト: Purist
  });

  const setAiModeValue = (mode: 'purist' | 'realist') => {
    setAiMode(mode);
    localStorage.setItem('settings_ai_mode', JSON.stringify(mode));
  };

  return {
    // ... 既存の返り値
    aiMode,
    setAiMode: setAiModeValue,
  };
};
```

### 2.2 AI Serviceの拡張

#### `src/services/aiService.ts` に新機能を追加

```typescript
/**
 * AIモード: Purist vs Realist
 */
export type AIMode = 'purist' | 'realist';

/**
 * コミュニティデータ取得（Realistモード用）
 */
async function getCommunityData(): Promise<string> {
  // 将来的にSupabaseからユーザー投稿データを取得
  // 現時点では空文字列（実装は後回し）
  return '';
}

/**
 * AIチャット（モード対応版）
 */
export async function chatWithAI(
  userMessage: string,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [],
  enableVerification: boolean = false,
  enableCitations: boolean = true,
  mode: AIMode = 'purist' // 🔥 新規パラメータ
): Promise<string> {
  // ... 既存のコード
  
  // 🔥 モードに応じたコンテキストを追加
  let modeContext = '';
  
  if (mode === 'purist') {
    modeContext = `
【情報源モード: Purist】
以下の情報源のみを参照してください：
- Carnivore推奨医師（Ken Berry, Shawn Baker等）の医学的エビデンス・発言
- 科学的文献（Stefansson, Cahill等の研究）
- カーニボアダイエットの理論的根拠

【コミュニティデータは使用しない】
ユーザー投稿や実践者の体験談は参照しません。
`;
  } else if (mode === 'realist') {
    const communityData = await getCommunityData();
    modeContext = `
【情報源モード: Realist】
以下の情報源を参照してください：
- Carnivore推奨医師の医学的エビデンス・発言（Puristと同じ）
- 科学的文献（Puristと同じ）
- 🔥 コミュニティ実践データ（ユーザー投稿、成功事例、トラブルシューティング）

【コミュニティデータの使用例】
「マクドナルドで何を頼む？」→ 実践者の選択肢（例：プレーンバーガー、パテのみ等）を提示可能
「外食時の対処法」→ コミュニティの実践知を参考に回答
`;
  }

  // プロンプトにmodeContextを追加
  const prompt = `<system_prompt>
  ${modeContext}
  ${expertContext}
  // ... 既存のプロンプト
</system_prompt>`;
  
  // ... 残りの処理
}
```

### 2.3 SettingsScreenにUIを追加

```typescript
// src/screens/SettingsScreen.tsx

const { aiMode, setAiMode } = useSettings();

// UIコンポーネント
<div className="settings-screen-section">
  <h2 className="settings-screen-section-title">AIアシスタント設定</h2>
  <div className="settings-screen-switch-row">
    <div className="settings-screen-switch-label-group">
      <label className="settings-screen-switch-label">AIモード</label>
      <div className="settings-screen-switch-description">
        Purist: 専門家エビデンスのみ / Realist: コミュニティ実践データも含む
      </div>
    </div>
    <div className="settings-screen-button-row">
      <button
        className={`settings-screen-option-button ${aiMode === 'purist' ? 'active' : ''}`}
        onClick={() => setAiMode('purist')}
      >
        Purist
      </button>
      <button
        className={`settings-screen-option-button ${aiMode === 'realist' ? 'active' : ''}`}
        onClick={() => setAiMode('realist')}
      >
        Realist
      </button>
    </div>
  </div>
</div>
```

### 2.4 AISpeedDialコンポーネントの更新

```typescript
// src/components/dashboard/AISpeedDial.tsx

import { useSettings } from '../../hooks/useSettings';

// コンポーネント内
const { aiMode } = useSettings();

const handleSendChatMessage = async () => {
  // ... 既存のコード
  
  const assistantMessage = await chatWithAI(
    userMessage, 
    chatMessages, 
    false, 
    true,
    aiMode // 🔥 モードを渡す
  );
  
  // ... 残りの処理
};
```

---

## 3. Data-Driven Consultation (専門医向けカルテ共有)

### 3.1 データ集約ユーティリティ

#### `src/utils/consultationData.ts`

```typescript
/**
 * 医師向けカルテデータ生成
 */

import type { DailyLog } from '../types';
import { getDailyLogs } from './storage';

export interface ConsultationData {
  userProfile: {
    age: number;
    gender: 'male' | 'female';
    weight: number;
    height: number;
    // ... その他のプロフィール情報
  };
  last30Days: {
    date: string;
    fatTotal: number;
    proteinTotal: number;
    netCarbs: number;
    bowelMovement?: {
      status: 'normal' | 'constipated' | 'loose' | 'watery';
    };
    weight?: number; // 体重記録があれば
  }[];
  trends: {
    averageFat: number;
    averageProtein: number;
    averageCarbs: number;
    bowelMovementFrequency: {
      normal: number;
      constipated: number;
      loose: number;
      watery: number;
    };
    weightTrend?: 'increasing' | 'decreasing' | 'stable';
  };
}

/**
 * 直近30日間のデータを集約
 */
export async function generateConsultationData(): Promise<ConsultationData | null> {
  const { getUserProfile } = await import('./storage');
  const userProfile = await getUserProfile();
  const logs = await getDailyLogs();
  
  if (!userProfile) {
    return null;
  }

  // 直近30日間のログを取得
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentLogs = logs
    .filter(log => {
      const logDate = new Date(log.date);
      return logDate >= thirtyDaysAgo && logDate <= now;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  // 集計
  const last30DaysData = recentLogs.map(log => ({
    date: log.date,
    fatTotal: log.calculatedMetrics.fatTotal || 0,
    proteinTotal: log.calculatedMetrics.proteinTotal || 0,
    netCarbs: log.calculatedMetrics.netCarbs || 0,
    bowelMovement: log.status.bowelMovement,
    // weight: 体重記録があれば追加（将来拡張）
  }));

  // トレンド計算
  const averageFat = last30DaysData.reduce((sum, d) => sum + d.fatTotal, 0) / last30DaysData.length;
  const averageProtein = last30DaysData.reduce((sum, d) => sum + d.proteinTotal, 0) / last30DaysData.length;
  const averageCarbs = last30DaysData.reduce((sum, d) => sum + d.netCarbs, 0) / last30DaysData.length;

  const bowelMovementFrequency = {
    normal: last30DaysData.filter(d => d.bowelMovement?.status === 'normal').length,
    constipated: last30DaysData.filter(d => d.bowelMovement?.status === 'constipated').length,
    loose: last30DaysData.filter(d => d.bowelMovement?.status === 'loose').length,
    watery: last30DaysData.filter(d => d.bowelMovement?.status === 'watery').length,
  };

  return {
    userProfile: {
      age: userProfile.age || 0,
      gender: userProfile.gender,
      weight: userProfile.weight || 0,
      height: userProfile.height || 0,
      // ... その他のプロフィール情報
    },
    last30Days: last30DaysData,
    trends: {
      averageFat,
      averageProtein,
      averageCarbs,
      bowelMovementFrequency,
    },
  };
}
```

### 3.2 カルテダッシュボード画面の作成

#### `src/screens/ConsultationDashboardScreen.tsx`

```typescript
/**
 * 医師向けカルテダッシュボード
 */

import { useEffect, useState } from 'react';
import { generateConsultationData, type ConsultationData } from '../utils/consultationData';
import './ConsultationDashboardScreen.css';

export default function ConsultationDashboardScreen() {
  const [data, setData] = useState<ConsultationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateConsultationData().then(consultationData => {
      setData(consultationData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!data) {
    return <div>データが見つかりませんでした</div>;
  }

  return (
    <div className="consultation-dashboard">
      <h1>患者カルテ（直近30日間）</h1>
      
      {/* 基本情報 */}
      <section className="consultation-section">
        <h2>基本情報</h2>
        <div className="consultation-info-grid">
          <div>年齢: {data.userProfile.age}歳</div>
          <div>性別: {data.userProfile.gender === 'male' ? '男性' : '女性'}</div>
          <div>体重: {data.userProfile.weight}kg</div>
          <div>身長: {data.userProfile.height}cm</div>
        </div>
      </section>

      {/* 栄養素トレンド */}
      <section className="consultation-section">
        <h2>栄養素平均値（30日間）</h2>
        <div className="consultation-metrics">
          <div>脂質: {data.trends.averageFat.toFixed(1)}g/日</div>
          <div>タンパク質: {data.trends.averageProtein.toFixed(1)}g/日</div>
          <div>炭水化物: {data.trends.averageCarbs.toFixed(1)}g/日</div>
        </div>
      </section>

      {/* 排泄状況 */}
      <section className="consultation-section">
        <h2>排泄状況（30日間）</h2>
        <div className="consultation-bowel-stats">
          <div>正常: {data.trends.bowelMovementFrequency.normal}日</div>
          <div>便秘: {data.trends.bowelMovementFrequency.constipated}日</div>
          <div>緩い: {data.trends.bowelMovementFrequency.loose}日</div>
          <div>水状: {data.trends.bowelMovementFrequency.watery}日</div>
        </div>
      </section>

      {/* 日次データテーブル */}
      <section className="consultation-section">
        <h2>日次データ</h2>
        <table className="consultation-table">
          <thead>
            <tr>
              <th>日付</th>
              <th>脂質(g)</th>
              <th>タンパク質(g)</th>
              <th>炭水化物(g)</th>
              <th>排泄</th>
            </tr>
          </thead>
          <tbody>
            {data.last30Days.map(day => (
              <tr key={day.date}>
                <td>{day.date}</td>
                <td>{day.fatTotal.toFixed(1)}</td>
                <td>{day.proteinTotal.toFixed(1)}</td>
                <td>{day.netCarbs.toFixed(1)}</td>
                <td>
                  {day.bowelMovement?.status === 'normal' && '正常'}
                  {day.bowelMovement?.status === 'constipated' && '便秘'}
                  {day.bowelMovement?.status === 'loose' && '緩い'}
                  {day.bowelMovement?.status === 'watery' && '水状'}
                  {!day.bowelMovement && '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 共有ボタン（将来拡張: PDF出力、URL共有など） */}
      <button className="consultation-share-button">
        カルテを共有
      </button>
    </div>
  );
}
```

### 3.3 チャット画面への統合

#### AISpeedDialコンポーネントにカルテ共有ボタンを追加

```typescript
// src/components/dashboard/AISpeedDial.tsx

import { useState } from 'react';
import ConsultationDashboardScreen from '../../screens/ConsultationDashboardScreen';

// コンポーネント内
const [showConsultationDashboard, setShowConsultationDashboard] = useState(false);

// UI: カルテ共有ボタンを追加
<button 
  className="consultation-share-button"
  onClick={() => setShowConsultationDashboard(true)}
>
  医師にカルテを共有
</button>

{showConsultationDashboard && (
  <div className="consultation-modal">
    <button onClick={() => setShowConsultationDashboard(false)}>閉じる</button>
    <ConsultationDashboardScreen />
  </div>
)}
```

---

## 実装の優先順位

### Phase 1: Bio-Tuner（最優先）
1. `DailyStatus`型の拡張
2. `InputScreen`に排泄記録UI追加
3. `bioTuner.ts`ユーティリティ実装
4. `HomeScreen`に通知表示

### Phase 2: Hybrid AI Assistant
1. `useSettings`フックの拡張
2. `aiService.ts`にモード対応追加
3. `SettingsScreen`にUI追加
4. `AISpeedDial`コンポーネント更新

### Phase 3: Data-Driven Consultation
1. `consultationData.ts`ユーティリティ実装
2. `ConsultationDashboardScreen`コンポーネント作成
3. チャット画面への統合

---

## 注意事項

1. **Bio-Tuner**: 調整率（+10%, -10%など）は、実データに基づいて後から最適化が必要
2. **Hybrid AI**: Realistモードのコミュニティデータ取得は、現時点では空実装。将来的にSupabaseテーブル（`user_posts`, `community_data`など）が必要
3. **Consultation Dashboard**: 体重データの取得は、現時点では`UserProfile`から取得する前提。将来は`DailyLog`に体重フィールドを追加することを推奨

