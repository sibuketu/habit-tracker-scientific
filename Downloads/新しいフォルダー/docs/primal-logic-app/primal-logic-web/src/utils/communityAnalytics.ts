/**
 * Community Analytics - コミュニティ刁E��ユーチE��リチE��
 *
 * ユーザーのログチE�Eタから実践チE�Eタを�E极E */

import type { DailyLog } from '../types/index';
import { getDailyLogs } from './storage';

export interface CommunityStats {
  totalDays: number;
  violationDays: number;
  violationRate: number;
  averageProtein: number;
  averageFat: number;
  averageSodium: number;
  averageMagnesium: number;
  longestStreak: number;
  currentStreak: number;
}

export interface PatternAnalysis {
  symptomNutritionCorrelation: Array<{
    symptom: string;
    nutrient: string;
    correlation: number;
    insight: string;
  }>;
  violationRecoveryPattern: {
    averageRecoveryDays: number;
    mostEffectiveActions: string[];
  };
}

/**
 * ユーザーの統計情報を計箁E */
export async function calculateCommunityStats(): Promise<CommunityStats> {
  const logs = await getDailyLogs();

  if (logs.length === 0) {
    return {
      totalDays: 0,
      violationDays: 0,
      violationRate: 0,
      averageProtein: 0,
      averageFat: 0,
      averageSodium: 0,
      averageMagnesium: 0,
      longestStreak: 0,
      currentStreak: 0,
    };
  }

  const violationDays = logs.filter((log) => log.calculatedMetrics?.hasViolation).length;
  const totalDays = logs.length;
  const violationRate = totalDays > 0 ? (violationDays / totalDays) * 100 : 0;

  // 栁E��素の平坁E��を計箁E  let totalProtein = 0;
  let totalFat = 0;
  let totalSodium = 0;
  let totalMagnesium = 0;
  let validDays = 0;

  logs.forEach((log) => {
    if (log.calculatedMetrics) {
      totalProtein += log.calculatedMetrics.proteinTotal || 0;
      totalFat += log.calculatedMetrics.fatTotal || 0;
      totalSodium += log.calculatedMetrics.sodiumTotal || 0;
      totalMagnesium += log.calculatedMetrics.magnesiumTotal || 0;
      validDays++;
    }
  });

  const averageProtein = validDays > 0 ? totalProtein / validDays : 0;
  const averageFat = validDays > 0 ? totalFat / validDays : 0;
  const averageSodium = validDays > 0 ? totalSodium / validDays : 0;
  const averageMagnesium = validDays > 0 ? totalMagnesium / validDays : 0;

  // 連続記録を計算（違反なし�E連続日数�E�E  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = sortedLogs.length - 1; i >= 0; i--) {
    const log = sortedLogs[i];
    if (!log.calculatedMetrics?.hasViolation) {
      tempStreak++;
      if (i === sortedLogs.length - 1) {
        currentStreak = tempStreak;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return {
    totalDays,
    violationDays,
    violationRate: Math.round(violationRate * 10) / 10,
    averageProtein: Math.round(averageProtein * 10) / 10,
    averageFat: Math.round(averageFat * 10) / 10,
    averageSodium: Math.round(averageSodium * 10) / 10,
    averageMagnesium: Math.round(averageMagnesium * 10) / 10,
    longestStreak,
    currentStreak,
  };
}

/**
 * パターン刁E���E�日記と栁E��素の相関など�E�E */
export async function analyzePatterns(): Promise<PatternAnalysis> {
  const logs = await getDailyLogs();

  // 日記から症状を抽出�E�完�E実裁E���E�E  const symptomKeywords = [
    '下痢',
    '便私E,
    '頭痁E,
    '疲労',
    '関節痁E,
    'こ�Eら返り',
    '不眠',
    '吐き氁E,
    'めまぁE,
    '動悸',
    '息刁E��',
    '冷え性',
    'むくみ',
    '乾燥',
    '肌荒めE,
    '抜け毁E,
    '口冁E��',
    '目の疲めE,
    '肩こり',
    '腰痁E,
    '生理痁E,
    'PMS',
    'イライラ',
    '不宁E,
    'ぁE��',
    '雁E��力低丁E,
    '記�E力低丁E,
    '食欲不振',
    '過飁E,
    '甘いも�Eが欲しい',
    '塩刁E��欲しい',
    '筋肉痁E,
    'けいれん',
    'し�EめE,
    '感覚異常',
    '睡眠の質が悪ぁE,
    '早朝覚�E',
    '夜中に目が覚めめE,
    '悪夢',
    '朝起きるのが辛い',
    '午後�E眠氁E,
    '食後�E眠氁E,
    '低血糖症状',
    '手�E霁E��',
    '発汁E,
    '冷めE��E,
  ];
  const nutrientMap: Record<string, string> = {
    下痢: '脂質',
    便私E 'マグネシウム',
    頭痁E 'ナトリウム',
    疲労: 'タンパク質',
    関節痁E 'オメガ3',
    こ�Eら返り: 'マグネシウム',
    不眠: 'マグネシウム',
    吐き氁E 'ナトリウム',
    めまぁE 'ナトリウム',
    動悸: 'マグネシウム',
    息刁E��: '鉁E�E',
    冷え性: 'タンパク質',
    むくみ: 'ナトリウム',
    乾燥: '脂質',
    肌荒めE 'ビタミンA',
    抜け毁E 'タンパク質',
    口冁E��: 'ビタミンB12',
    目の疲めE 'ビタミンA',
    肩こり: 'マグネシウム',
    腰痁E 'マグネシウム',
    生理痁E 'オメガ3',
    PMS: 'マグネシウム',
    イライラ: 'マグネシウム',
    不宁E 'マグネシウム',
    ぁE��: 'オメガ3',
    雁E��力低丁E 'タンパク質',
    記�E力低丁E 'タンパク質',
    食欲不振: 'タンパク質',
    過飁E 'タンパク質',
    甘いも�Eが欲しい: 'タンパク質',
    塩刁E��欲しい: 'ナトリウム',
    筋肉痁E 'マグネシウム',
    けいれん: 'マグネシウム',
    し�EめE 'ビタミンB12',
    感覚異常: 'ビタミンB12',
    睡眠の質が悪ぁE 'マグネシウム',
    早朝覚�E: 'マグネシウム',
    夜中に目が覚めめE 'マグネシウム',
    悪夢: 'マグネシウム',
    朝起きるのが辛い: 'ナトリウム',
    午後�E眠氁E 'タンパク質',
    食後�E眠氁E 'タンパク質',
    低血糖症状: 'タンパク質',
    手�E霁E��: 'ナトリウム',
    発汁E 'ナトリウム',
    冷めE��E 'ナトリウム',
  };

  const correlations: PatternAnalysis['symptomNutritionCorrelation'] = [];

  symptomKeywords.forEach((symptom) => {
    const nutrient = nutrientMap[symptom] || '';
    const logsWithSymptom = logs.filter((log) => log.diary && log.diary.includes(symptom));

    if (logsWithSymptom.length > 0) {
      correlations.push({
        symptom,
        nutrient,
        correlation: logsWithSymptom.length / logs.length,
        insight: `${symptom}が記録された日は${logsWithSymptom.length}日�E��E体�E${Math.round((logsWithSymptom.length / logs.length) * 100)}%�E�`,
      });
    }
  });

  // 違反からの回復パターン
  const violationLogs = logs.filter((log) => log.calculatedMetrics?.hasViolation);
  const recoveryDays: number[] = [];

  // 違反からの回復パターンを�E析！E4-48時間の遁E��反応を老E�E�E�E  for (let i = 0; i < logs.length - 1; i++) {
    const currentLog = logs[i];

    if (currentLog.calculatedMetrics?.hasViolation) {
      // 違反があった日から、回復した日までの日数を計箁E      for (let j = i + 1; j < Math.min(i + 3, logs.length); j++) {
        const nextLog = logs[j];
        if (!nextLog.calculatedMetrics?.hasViolation) {
          const daysToRecovery = j - i;
          recoveryDays.push(daysToRecovery);
          break; // 最初�E回復日を記録
        }
      }
    }
  }

  const averageRecoveryDays =
    recoveryDays.length > 0 ? recoveryDays.reduce((a, b) => a + b, 0) / recoveryDays.length : 0;

  return {
    symptomNutritionCorrelation: correlations,
    violationRecoveryPattern: {
      averageRecoveryDays: Math.round(averageRecoveryDays * 10) / 10,
      mostEffectiveActions: ['16時間ファスチE��ング', '脂質を減らぁE, '塩刁E��増やぁE],
    },
  };
}

/**
 * チE�Eタエクスポ�Eト（専門医相諁E���E�E */
export async function exportDataForConsultation(): Promise<string> {
  const logs = await getDailyLogs();
  const stats = await calculateCommunityStats();
  const patterns = await analyzePatterns();

  const exportData = {
    stats,
    patterns,
    recentLogs: logs.slice(0, 30).map((log) => ({
      date: log.date,
      violation: log.calculatedMetrics?.hasViolation || false,
      protein: log.calculatedMetrics?.proteinTotal || 0,
      fat: log.calculatedMetrics?.fatTotal || 0,
      sodium: log.calculatedMetrics?.sodiumTotal || 0,
      magnesium: log.calculatedMetrics?.magnesiumTotal || 0,
      diary: log.diary || '',
    })),
  };

  return JSON.stringify(exportData, null, 2);
}

