import { SupportedLocale } from '../lib/i18n';

export interface Translations {
  // ナビゲーション
  nav: {
    home: string;
    record: string;
    settings: string;
    timeAttack: string;
    routine: string;
  };
  
  // ホーム画面
  home: {
    title: string;
    welcomeMessage: string;
    startRoutine: string;
    viewResults: string;
  };
  
  // ルーティーン
  routine: {
    title: string;
    weeklySchedule: string;
    thisWeek: string;
    addRoutine: string;
    editRoutine: string;
    deleteRoutine: string;
    copyMondayToOthers: string;
    copyWeeklyToThisWeek: string;
    colorExplanation: string;
    tapToEdit: string;
  };
  
  // カテゴリ
  categories: {
    existing: string;
    new: string;
    schedule: string;
    fun: string;
    custom1: string;
    custom2: string;
    custom3: string;
    custom4: string;
  };
  
  // 時間
  time: {
    timeRange: string;
    startTime: string;
    endTime: string;
  };
  
  // 曜日
  weekdays: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  
  // 共通
  common: {
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    add: string;
    day: string;
  };
}

export const translations: Record<SupportedLocale, Translations> = {
  fr: {
    nav: {
      home: 'Accueil',
      record: 'Enregistrement',
      settings: 'Paramètres',
      timeAttack: 'Course de Vitesse',
      routine: 'Routine'
    },
    home: {
      title: 'Chaîne d\'Habitudes',
      welcomeMessage: 'Bienvenue dans votre application de routines',
      startRoutine: 'Commencer la Routine',
      viewResults: 'Voir les Résultats Détaillés'
    },
    routine: {
      title: 'Ma Routine',
      weeklySchedule: 'Planning Hebdomadaire',
      thisWeek: 'Cette Semaine',
      addRoutine: 'Ajouter une Routine',
      editRoutine: 'Modifier la Routine',
      deleteRoutine: 'Supprimer la Routine',
      copyMondayToOthers: 'Copier Lundi vers Autres Jours',
      copyWeeklyToThisWeek: 'Copier la Semaine Habituelle',
      colorExplanation: 'Explication des Couleurs',
      tapToEdit: 'Appuyez pour Modifier'
    },
    categories: {
      existing: 'Habitudes Existantes',
      new: 'Nouvelles Habitudes',
      schedule: 'Planification',
      fun: 'Divertissement',
      custom1: 'Personnalisé 1',
      custom2: 'Personnalisé 2',
      custom3: 'Personnalisé 3',
      custom4: 'Personnalisé 4'
    },
    time: {
      timeRange: 'Plage Horaire',
      startTime: 'Heure de Début',
      endTime: 'Heure de Fin'
    },
    weekdays: {
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche'
    },
    common: {
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      day: 'Jour'
    }
  },
  
  de: {
    nav: {
      home: 'Startseite',
      record: 'Aufzeichnung',
      settings: 'Einstellungen',
      timeAttack: 'Schnelllauf',
      routine: 'Routine'
    },
    home: {
      title: 'Gewohnheitskette',
      welcomeMessage: 'Willkommen in Ihrer Routine-App',
      startRoutine: 'Routine Starten',
      viewResults: 'Detaillierte Ergebnisse Anzeigen'
    },
    routine: {
      title: 'Meine Routine',
      weeklySchedule: 'Wochenplan',
      thisWeek: 'Diese Woche',
      addRoutine: 'Routine Hinzufügen',
      editRoutine: 'Routine Bearbeiten',
      deleteRoutine: 'Routine Löschen',
      copyMondayToOthers: 'Montag zu Anderen Tagen Kopieren',
      copyWeeklyToThisWeek: 'Gewöhnliche Woche Kopieren',
      colorExplanation: 'Farben Erklärung',
      tapToEdit: 'Tippen zum Bearbeiten'
    },
    categories: {
      existing: 'Bestehende Gewohnheiten',
      new: 'Neue Gewohnheiten',
      schedule: 'Terminplanung',
      fun: 'Vergnügen',
      custom1: 'Benutzerdefiniert 1',
      custom2: 'Benutzerdefiniert 2',
      custom3: 'Benutzerdefiniert 3',
      custom4: 'Benutzerdefiniert 4'
    },
    time: {
      timeRange: 'Zeitbereich',
      startTime: 'Startzeit',
      endTime: 'Endzeit'
    },
    weekdays: {
      monday: 'Montag',
      tuesday: 'Dienstag',
      wednesday: 'Mittwoch',
      thursday: 'Donnerstag',
      friday: 'Freitag',
      saturday: 'Samstag',
      sunday: 'Sonntag'
    },
    common: {
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      add: 'Hinzufügen',
      day: 'Tag'
    }
  },
  
  en: {
    nav: {
      home: 'Home',
      record: 'Record',
      settings: 'Settings',
      timeAttack: 'Speed Running',
      routine: 'Routine'
    },
    home: {
      title: 'Habit Chain',
      welcomeMessage: 'Welcome to your routine app',
      startRoutine: 'Start Routine',
      viewResults: 'View Detailed Results'
    },
    routine: {
      title: 'My Routine',
      weeklySchedule: 'Weekly Schedule',
      thisWeek: 'This Week',
      addRoutine: 'Add Routine',
      editRoutine: 'Edit Routine',
      deleteRoutine: 'Delete Routine',
      copyMondayToOthers: 'Copy Monday to Other Days',
      copyWeeklyToThisWeek: 'Copy Regular Week',
      colorExplanation: 'Color Explanation',
      tapToEdit: 'Tap to Edit'
    },
    categories: {
      existing: 'Existing Habits',
      new: 'New Habits',
      schedule: 'Schedule',
      fun: 'Fun',
      custom1: 'Custom 1',
      custom2: 'Custom 2',
      custom3: 'Custom 3',
      custom4: 'Custom 4'
    },
    time: {
      timeRange: 'Time Range',
      startTime: 'Start Time',
      endTime: 'End Time'
    },
    weekdays: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    },
    common: {
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      day: 'Day'
    }
  },
  
  ja: {
    nav: {
      home: 'ホーム',
      record: '記録',
      settings: '設定',
      timeAttack: 'タイムアタック',
      routine: 'ルーティーン'
    },
    home: {
      title: '習慣チェーン',
      welcomeMessage: 'ルーティーンアプリへようこそ',
      startRoutine: 'ルーティーンを開始',
      viewResults: '詳細結果を見る'
    },
    routine: {
      title: 'Myルーティーン',
      weeklySchedule: '週間スケジュール',
      thisWeek: '今週',
      addRoutine: 'ルーティーンを追加',
      editRoutine: 'ルーティーン編集',
      deleteRoutine: 'ルーティーンを削除',
      copyMondayToOthers: '月曜日を他の曜日にコピー',
      copyWeeklyToThisWeek: '普段の1週間をコピー',
      colorExplanation: '色分けの説明',
      tapToEdit: 'タップで編集'
    },
    categories: {
      existing: '既存の習慣',
      new: '新しい習慣',
      schedule: '予定',
      fun: '楽しみ',
      custom1: 'カスタム1',
      custom2: 'カスタム2',
      custom3: 'カスタム3',
      custom4: 'カスタム4'
    },
    time: {
      timeRange: '時間範囲',
      startTime: '開始時間',
      endTime: '終了時間'
    },
    weekdays: {
      monday: '月',
      tuesday: '火',
      wednesday: '水',
      thursday: '木',
      friday: '金',
      saturday: '土',
      sunday: '日'
    },
    common: {
      cancel: 'キャンセル',
      save: '保存',
      delete: '削除',
      edit: '編集',
      add: '追加',
      day: '曜日'
    }
  },
  
  zh: {
    nav: {
      home: '首页',
      record: '记录',
      settings: '设置',
      timeAttack: '速度跑',
      routine: '例行程序'
    },
    home: {
      title: '习惯链',
      welcomeMessage: '欢迎使用您的例行程序应用',
      startRoutine: '开始例行程序',
      viewResults: '查看详细结果'
    },
    routine: {
      title: '我的例行程序',
      weeklySchedule: '周计划',
      thisWeek: '本周',
      addRoutine: '添加例行程序',
      editRoutine: '编辑例行程序',
      deleteRoutine: '删除例行程序',
      copyMondayToOthers: '将周一复制到其他日子',
      copyWeeklyToThisWeek: '复制常规周',
      colorExplanation: '颜色说明',
      tapToEdit: '点击编辑'
    },
    categories: {
      existing: '现有习惯',
      new: '新习惯',
      schedule: '计划',
      fun: '娱乐',
      custom1: '自定义1',
      custom2: '自定义2',
      custom3: '自定义3',
      custom4: '自定义4'
    },
    time: {
      timeRange: '时间范围',
      startTime: '开始时间',
      endTime: '结束时间'
    },
    weekdays: {
      monday: '周一',
      tuesday: '周二',
      wednesday: '周三',
      thursday: '周四',
      friday: '周五',
      saturday: '周六',
      sunday: '周日'
    },
    common: {
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      add: '添加',
      day: '天'
    }
  }
};
