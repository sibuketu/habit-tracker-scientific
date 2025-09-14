'use client';

import React, { useState } from 'react';
import { Plus, Clock, Target, Archive, Save, Trash2, Edit3, Lightbulb, X, Calendar, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import SubscriptionButton from '../subscription/SubscriptionButton';
import LanguageSelector from '../common/LanguageSelector';

interface Habit {
  id: string;
  version: string;
  ifCondition: string;
  thenAction: string; // 後方互換性のため残す
  thenActions: string[]; // 複数のThen行動をサポート
  durationMinutes: number;
  durationSeconds: number;
  alternativeActions: string[];
  bigGoal: string;
  isUnlocked: boolean;
  createdAt: string;
}

export default function HabitSettingScreen() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      version: '1.0',
      ifCondition: '朝7時に目覚ましが鳴ったら',
      thenAction: 'ベッドから起き上がる',
      thenActions: ['ベッドから起き上がる'],
      durationMinutes: 0,
      durationSeconds: 10,
      alternativeActions: ['5分後に起きる', '水を飲んでから起きる'],
      bigGoal: '健康的な生活リズムを確立して、仕事の効率を上げたい',
      isUnlocked: true,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      version: '1.0',
      ifCondition: '朝食が終わったら',
      thenAction: '英語の単語を覚える',
      thenActions: ['英語の単語を覚える', '音読練習をする'],
      durationMinutes: 10,
      durationSeconds: 0,
      alternativeActions: ['単語帳を開く', '前日の復習をする'],
      bigGoal: 'TOEIC800点を取って、将来の就職活動に活かしたい',
      isUnlocked: true,
      createdAt: '2024-01-02',
    },
    {
      id: '3',
      version: '1.0',
      ifCondition: '夕食後に食器を洗い終わったら',
      thenAction: '読書をする',
      thenActions: ['読書をする', '本の感想をメモする'],
      durationMinutes: 30,
      durationSeconds: 0,
      alternativeActions: ['本を開いて1ページだけ読む', '読書アプリで要約を読む'],
      bigGoal: '年間50冊の読書を通して、幅広い知識と教養を身につけたい',
      isUnlocked: true,
      createdAt: '2024-01-03',
    },
    {
      id: '4',
      version: '1.0',
      ifCondition: '学校から帰宅したら',
      thenAction: '筋トレをする',
      thenActions: ['腕立て伏せ20回', '腹筋30回', 'スクワット15回'],
      durationMinutes: 15,
      durationSeconds: 0,
      alternativeActions: ['ストレッチだけする', '散歩に行く', 'ヨガ動画を見る'],
      bigGoal: '体力をつけて、部活動や勉強に集中できる体を作りたい',
      isUnlocked: true,
      createdAt: '2024-01-04',
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    ifCondition: '',
    thenAction: '',
    thenActions: [''],
    thenActionsWithRecordType: [{ action: '', recordType: 'time-attack' as 'simple' | 'time-attack' | 'score-attack', targetDuration: 30 }],
    alternativeActions: [''],
    bigGoal: '',
  });

  const [unlockedFeatures, setUnlockedFeatures] = useState({
    alternativeActions: true,
  });

  const [showTipModal, setShowTipModal] = useState(false);
  const [currentTip, setCurrentTip] = useState<{
    title: string;
    content: {
      effect: string;
      tip: string;
      pitfall: string;
      trivia: string;
      moreTrivia: string;
      source: string;
    };
  } | null>(null);
  const [showMoreTrivia, setShowMoreTrivia] = useState(false);
  const [showRoutineSelector, setShowRoutineSelector] = useState(false);

  // サブ機能全体の折りたたみ状態
  const [subFeaturesExpanded, setSubFeaturesExpanded] = useState(false);

  // ドラッグ&ドロップ状態
  const [dragState, setDragState] = useState({
    isDragging: false,
    draggedIndex: -1,
    dragOverIndex: -1,
  });

  // Myルーティーンのサンプルデータ
  const routineItems = [
    '朝7時に目覚ましが鳴ったら',
    '朝コーヒーを飲んだ後',
    '歯磨きをした後',
    '帰宅して靴を脱いだ直後',
    'お風呂に入った後',
    '夕食を食べた後',
    'ベッドに入る前',
    'スマホを見た後',
    'トイレに行った後',
    '洗顔をした後'
  ];

  // Then行動の順序入れ替え関数
  const moveThenAction = (index: number, direction: 'up' | 'down') => {
    const newActions = [...formData.thenActionsWithRecordType];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newActions.length) {
      [newActions[index], newActions[targetIndex]] = [newActions[targetIndex], newActions[index]];
      setFormData(prev => ({ ...prev, thenActionsWithRecordType: newActions }));
    }
  };

  // サブ機能全体の折りたたみトグル関数
  const toggleSubFeatures = () => {
    setSubFeaturesExpanded(prev => !prev);
  };

  // ドラッグ&ドロップハンドラー
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragState({
      isDragging: true,
      draggedIndex: index,
      dragOverIndex: -1,
    });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragState(prev => ({
      ...prev,
      dragOverIndex: index,
    }));
  };

  const handleDragLeave = () => {
    setDragState(prev => ({
      ...prev,
      dragOverIndex: -1,
    }));
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const { draggedIndex } = dragState;
    
    if (draggedIndex !== -1 && draggedIndex !== dropIndex) {
      const newActions = [...formData.thenActionsWithRecordType];
      const draggedItem = newActions[draggedIndex];
      
      // ドラッグされたアイテムを削除
      newActions.splice(draggedIndex, 1);
      // 新しい位置に挿入
      newActions.splice(dropIndex, 0, draggedItem);
      
      setFormData(prev => ({ ...prev, thenActionsWithRecordType: newActions }));
    }
    
    setDragState({
      isDragging: false,
      draggedIndex: -1,
      dragOverIndex: -1,
    });
  };

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      draggedIndex: -1,
      dragOverIndex: -1,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      version: '1.0',
      ifCondition: formData.ifCondition,
      thenAction: formData.thenActions[0] || formData.thenAction, // 後方互換性
      thenActions: formData.thenActions.filter(action => action.trim()),
      durationMinutes: formData.durationMinutes,
      durationSeconds: formData.durationSeconds,
      alternativeActions: unlockedFeatures.alternativeActions ? formData.alternativeActions.filter(action => action.trim()) : [],
      bigGoal: formData.bigGoal,
      isUnlocked: true,
      createdAt: new Date().toISOString(),
    };

    if (editingId) {
      setHabits(prev => prev.map(habit => 
        habit.id === editingId 
          ? { ...newHabit, id: editingId, version: (parseFloat(habit.version) + 0.1).toFixed(1) }
          : habit
      ));
      setEditingId(null);
    } else {
      setHabits(prev => [newHabit, ...prev]);
    }
    
    // フォームリセット
    setFormData({
      ifCondition: '',
      thenAction: '',
      thenActions: [''],
      thenActionsWithRecordType: [{ action: '', recordType: 'time-attack', targetDuration: 30 }],
      alternativeActions: [''],
      bigGoal: '',
    });
    setIsAdding(false);
  };

  const handleEdit = (habit: Habit) => {
    setFormData({
      ifCondition: habit.ifCondition,
      thenAction: habit.thenAction,
      thenActions: habit.thenActions?.length > 0 ? habit.thenActions : [habit.thenAction || ''],
      thenActionsWithRecordType: habit.thenActions?.length > 0 
        ? habit.thenActions.map(action => ({ action, recordType: 'time-attack' as const, targetDuration: 30 }))
        : [{ action: habit.thenAction || '', recordType: 'time-attack' as const, targetDuration: 30 }],
      alternativeActions: habit.alternativeActions.length > 0 ? habit.alternativeActions : [''],
      bigGoal: habit.bigGoal,
    });
    setEditingId(habit.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const addAlternativeAction = () => {
    setFormData(prev => ({
      ...prev,
      alternativeActions: [...prev.alternativeActions, '']
    }));
  };

  const updateAlternativeAction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      alternativeActions: prev.alternativeActions.map((action, i) => 
        i === index ? value : action
      )
    }));
  };

  const removeAlternativeAction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      alternativeActions: prev.alternativeActions.filter((_, i) => i !== index)
    }));
  };


  const formatDuration = (minutes: number, seconds: number) => {
    if (minutes > 0) {
      return `${minutes}分${seconds > 0 ? `${seconds}秒` : ''}`;
    }
    return `${seconds}秒`;
  };

  // 電球の説明データ
  const tipData = {
    'if-condition': {
      title: 'If-Thenプランニング ★★★',
      content: {
        tip: '1. **Ifは可能な限り具体的に**\n「朝起きたら」ではなく「歯磨きを終えたら」のように、既存の行動に結びつける。\n2. **Thenは小さな行動から始める**\nいきなり10kmランではなく「靴を履く」など最小単位。\n3. **Myルーティーンで既存習慣を確認**\n普段の行動を黒、新習慣を緑にして紐付けると自然に始めやすい。',
        effect: '1. 曖昧さをなくすと「今やるかどうか」で迷わなくなる。\n2. 小さな行動からなら成功体験が積みやすく、失敗による挫折も減る。\n3. 既存習慣をトリガーにすると脳が自動的に反応する。',
        pitfall: 'Ifが抽象的すぎると効果が出ない。\nThenを大きくしすぎると途中で挫折する。\n条件を増やしすぎると「条件の渋滞」で混乱する。',
        trivia: '狩猟採集時代から人は「音がしたら逃げる」「赤い実を見たら採る」といったIf-Then型反応で生き延びてきた。\nオリンピック選手も「靴紐を結んだら集中モードに入る」とルーチン化している。',
        moreTrivia: '1. 大学生を対象にした実験では、If-Thenを決めた群の達成率が **39% → 91%** に上昇。\n\n2. 困難状況（うつ病患者群）では、If-Then計画ありで **80%達成、なし0%**。\n\n3. ベートーヴェンは作曲前にコーヒー豆を毎回60粒数えるというIf-Thenルーティンを持っていたと伝えられています。\n\n4. マイクロソフトの創業者ビル・ゲイツも「目を閉じて本を読み始める」というIf-Then行動で集中を高めていたと語っています。',
        source: 'Gollwitzer（実行意図）\nWood & Neal（文脈手がかり研究）'
      }
    },
    'then-action': {
      title: 'ミニ習慣化 ★★★',
      content: {
        tip: '1. **最小行動に縮める**（腕立て1回、歯1本だけフロス）。\n2. **やりすぎ歓迎ルール**を明文化する。',
        effect: '1. 小さな行動なら「できない理由」が消える。\n2. 成功体験を積み重ねると自然に自動化される。',
        pitfall: '無意味感を感じやすい → 「やりすぎ歓迎」で克服。',
        trivia: '武道の小作法やフットインザドアも「小さな一歩」から大きな流れを作る知恵だった。',
        moreTrivia: '1. ミニ習慣を導入した群は32週後に平均体重が **-3.8kg**。\n\n2. 大きな山を登るときも「3合目」「5合目」と区切ることで、心理的に楽になり、途中でやめても前進感を持てます。\n\n3. 工学のプロジェクト管理でも「モジュール化」が鉄則。人の行動も細分化すると成功確率が上がります。\n\n4. 日本の茶道も「一連の流れを細かく分解」して稽古を積む伝統があります。',
        source: 'Locke & Latham（目標設定理論）'
      }
    },
    'duration': {
      title: '一貫性と頻度 ★★★',
      content: {
        tip: '1. **同じ時間・場所で繰り返す**（文脈手がかりの強化）。\n2. **頻度を優先**（完璧より継続）。\n3. **小さな一貫性**から始める。',
        effect: '1. 文脈が一致すると脳が自動的に反応する。\n2. 頻度が高ければ質は後からついてくる。\n3. 小さな一貫性が大きな習慣の土台になる。',
        pitfall: '完璧主義で頻度が下がる。\n時間にこだわりすぎて柔軟性を失う。',
        trivia: '朝のルーティーンが儀式化すると、迷いがゼロに近づきます。',
        moreTrivia: '1. 朝の儀式が決まっている人は「迷いゼロ」で1日を始められます。起床後の一連動作が、最強の集中ブースターです。\n\n2. 武士の鍛錬では「同じ時間に起き、同じ型を繰り返す」ことが心身の安定を生んでいました。\n\n3. ローマの兵士は「太陽が昇ったら行軍」と時間で行動を切っていました。\n\n4. スティーブ・ジョブズは毎朝同じ服装で登場し、時間と決断コストを削っていました。',
        source: 'Lally（習慣形成の文脈一致研究）'
      }
    },
    'alternative-actions': {
      title: '環境デザイン ★★★',
      content: {
        tip: '1. 良い行動の摩擦を下げる（机に本を置く、玄関に靴を出す）。\n2. 悪い行動の摩擦を上げる（お菓子を買わない、通知を切る）。\n3. 習慣化したい行動を「視界に入る場所」に置く。',
        effect: '1. 人は意志力ではなく環境手がかりに強く反応する。\n2. 見えるものが行動を誘発するため、自動的に習慣が回る。',
        pitfall: '制約が強すぎると反発を招く。\n少し不便にするくらいが最適。',
        trivia: '冷蔵庫の配置や机上の小物だけで選択が変わる。引越しや転職は「環境リセット」で習慣を切り替える好機でもある。',
        moreTrivia: '1. 病院の飲料配置変更で、水の選択が **+25.8%**、ソーダは **-11.4%** に。\n\n2. プロは"最悪のケース"を常に想定して動きます。準備があるから崩れません。\n\n3. 軍隊は「代替ルート」を必ず用意し、詰みを防ぎます。\n\n4. 登山家は「悪天候時の短縮ルート」を事前に決めて挑みます。',
        source: 'コーピングプラン研究（実行意図の拡張）'
      }
    },
    'big-goal': {
      title: '報酬とドーパミン ★★★',
      content: {
        tip: '1. 行動直後に小さな報酬を与える（効果音・アニメーション）。\n2. 「やるべき」と「やりたい」を束ねる（誘惑バンドル）。\n3. ご褒美は連鎖の最後に置く。',
        effect: '1. 脳は「直後の快」に強く反応し、行動を強化する。\n2. 報酬と行動が結びつくことで「またやりたい」が自然に生まれる。',
        pitfall: '外的報酬に依存しすぎると、報酬がないとやらなくなる。',
        trivia: '修行や祭礼にも「苦の後に喜び」を置く設計がある。ガチャ文化も予測不能報酬でドーパミンを刺激している。',
        moreTrivia: '1. 音声小説をジムでのみ解禁した群は、通所頻度が **+51%**。\n\n2. 行動も"バージョニング"で進化させる時代です。\n\n3. ソフトウェアは小刻みなバージョンアップで安定性を高めてきました。\n\n4. スポーツの練習も「メニューを微調整」することで持続可能になります。',
        source: 'PDCAサイクル\n自己調整学習研究'
      }
    }
  };

  const handleTipClick = (tipKey: keyof typeof tipData) => {
    setCurrentTip(tipData[tipKey]);
    setShowTipModal(true);
  };

  const closeTipModal = () => {
    setShowTipModal(false);
    setCurrentTip(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-6">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">**習慣設定**</h1>
          <div className="flex gap-3">
            <LanguageSelector />
            <SubscriptionButton />
          </div>
        </div>
        <p className="text-gray-400">If-Then条件で習慣を設定し、バージョン管理で分析</p>
      </div>


      {/* アンロック機能説明 */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-2">**アンロック機能**</h3>
        <div className="flex items-center space-x-2 text-sm">
          <Archive className="w-4 h-4 text-purple-400" />
          <span className={unlockedFeatures.alternativeActions ? 'text-green-400' : 'text-gray-500'}>
            代替行動 {unlockedFeatures.alternativeActions ? '✅' : '🔒'}
          </span>
        </div>
      </div>

      {/* 習慣追加ボタン */}
      <div className="mb-6">
        <button
          onClick={() => setIsAdding(true)}
          className="w-12 h-12 flex items-center justify-center"
        >
          <span className="text-lg">➕</span>
        </button>
      </div>

      {/* 習慣追加/編集フォーム */}
      {isAdding && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? '**習慣を編集**' : '**習慣を追加**'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 必須項目 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-400">**必須項目**</h4>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    **If（既存習慣から選択 or 自由入力）**
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowRoutineSelector(!showRoutineSelector)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="Myルーティーンから選択"
                  >
                    <Calendar size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTipClick('if-condition')}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Lightbulb size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.ifCondition}
                  onChange={(e) => setFormData(prev => ({ ...prev, ifCondition: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例: 朝7時に目覚ましが鳴ったら、お腹が空いたら、疲れたら"
                  required
                />
                
                {/* Myルーティーン選択モーダル */}
                {showRoutineSelector && (
                  <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">Myルーティーンから選択:</p>
                    <div className="space-y-1">
                      {routineItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, ifCondition: item }));
                            setShowRoutineSelector(false);
                          }}
                          className="w-full text-left p-2 text-sm text-gray-300 hover:bg-gray-600 rounded transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowRoutineSelector(false)}
                      className="mt-2 text-xs text-gray-400 hover:text-gray-300"
                    >
                      閉じる
                    </button>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    **Then（行動内容）**
                  </label>
                  <button
                    type="button"
                    onClick={() => handleTipClick('then-action')}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Lightbulb size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.thenActionsWithRecordType.map((item, index) => (
                    <div 
                      key={index} 
                      className={`bg-gray-700 bg-opacity-30 border border-gray-500 rounded-lg p-4 transition-all duration-200 ${
                        dragState.draggedIndex === index 
                          ? 'opacity-50 scale-95 bg-blue-500 bg-opacity-20' 
                          : dragState.dragOverIndex === index 
                          ? 'bg-green-500 bg-opacity-20 scale-105' 
                          : 'hover:bg-gray-600 hover:bg-opacity-50'
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="space-y-3">
                        {/* 上部：ドラッグハンドル、順序入れ替え、削除ボタン */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {/* ドラッグハンドル */}
                            <div className="cursor-move text-gray-400 hover:text-white transition-colors">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="9" cy="5" r="1"/>
                                <circle cx="15" cy="5" r="1"/>
                                <circle cx="9" cy="12" r="1"/>
                                <circle cx="15" cy="12" r="1"/>
                                <circle cx="9" cy="19" r="1"/>
                                <circle cx="15" cy="19" r="1"/>
                              </svg>
              </div>

                            {/* 順序入れ替えボタン */}
                            <div className="flex space-x-1">
                              <button
                                type="button"
                                onClick={() => moveThenAction(index, 'up')}
                                disabled={index === 0}
                                className={`p-1 rounded transition-colors ${
                                  index === 0 
                                    ? 'text-gray-600 cursor-not-allowed' 
                                    : 'text-gray-400 hover:text-white hover:bg-gray-600'
                                }`}
                              >
                                <ChevronUp size={14} />
                              </button>
                  <button
                    type="button"
                                onClick={() => moveThenAction(index, 'down')}
                                disabled={index === formData.thenActionsWithRecordType.length - 1}
                                className={`p-1 rounded transition-colors ${
                                  index === formData.thenActionsWithRecordType.length - 1 
                                    ? 'text-gray-600 cursor-not-allowed' 
                                    : 'text-gray-400 hover:text-white hover:bg-gray-600'
                                }`}
                              >
                                <ChevronDown size={14} />
                  </button>
                </div>
                          </div>

                          {/* 削除ボタン */}
                          {formData.thenActionsWithRecordType.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newActions = formData.thenActionsWithRecordType.filter((_, i) => i !== index);
                                setFormData(prev => ({ ...prev, thenActionsWithRecordType: newActions }));
                              }}
                              className="text-gray-400 hover:text-red-400 transition-colors p-1"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                        
                        {/* 行動内容入力 */}
                    <input
                          type="text"
                          value={item.action}
                          onChange={(e) => {
                            const newActions = [...formData.thenActionsWithRecordType];
                            newActions[index] = { ...newActions[index], action: e.target.value };
                            setFormData(prev => ({ ...prev, thenActionsWithRecordType: newActions }));
                            
                            // 入力開始時に新しい入力欄を追加
                            if (e.target.value.length > 0 && index === formData.thenActionsWithRecordType.length - 1) {
                              setFormData(prev => ({ ...prev, thenActionsWithRecordType: [...newActions, { action: '', recordType: 'time-attack', targetDuration: 30 }] }));
                            }
                          }}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder={index === 0 ? "例: 10キロ走る" : "次の行動を入力..."}
                          required={index === 0}
                        />
                        
                        {/* 記録方式選択と所要時間 */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400 whitespace-nowrap">記録方式:</span>
                            <select
                              value={item.recordType}
                              onChange={(e) => {
                                const newActions = [...formData.thenActionsWithRecordType];
                                newActions[index] = { 
                                  ...newActions[index], 
                                  recordType: e.target.value as 'simple' | 'time-attack' | 'score-attack',
                                  targetDuration: e.target.value === 'simple' ? 0 : newActions[index].targetDuration || 30
                                };
                                setFormData(prev => ({ ...prev, thenActionsWithRecordType: newActions }));
                              }}
                              className="bg-gray-800 border border-gray-600 rounded-lg px-2 py-1 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="simple">単純記録</option>
                              <option value="time-attack">タイムアタック</option>
                              <option value="score-attack">スコアアタック</option>
                            </select>
                  </div>
                          
                          {/* 所要時間入力（タイムアタック・スコアアタックの場合） */}
                          {(item.recordType === 'time-attack' || item.recordType === 'score-attack') && (
                            <div className="flex items-center space-x-1">
                    <input
                      type="number"
                                min="1"
                                value={item.targetDuration}
                                onChange={(e) => {
                                  const newActions = [...formData.thenActionsWithRecordType];
                                  newActions[index] = { ...newActions[index], targetDuration: parseInt(e.target.value) || 0 };
                                  setFormData(prev => ({ ...prev, thenActionsWithRecordType: newActions }));
                                }}
                                className="w-12 bg-gray-800 border border-gray-600 rounded-lg px-2 py-1 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <span className="text-xs text-gray-400">分</span>
                            </div>
                          )}
                        </div>
                        
                        {/* 説明テキスト */}
                        <div className="text-xs text-gray-400">
                          {item.recordType === 'simple' && '✅ やることだけ記録'}
                          {item.recordType === 'time-attack' && '⏱️ 目標時間内で完了を競う'}
                          {item.recordType === 'score-attack' && '🎯 固定時間で成果を競う'}
                        </div>
                      </div>
                  </div>
                  ))}
                </div>
              </div>

              {/* サブ機能全体の折りたたみボタン */}
              <div className="border border-purple-500 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={toggleSubFeatures}
                  className="w-full bg-purple-900 bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-400">
                      <Target size={20} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-purple-400">
                        **サブ機能**
                      </h3>
                      <p className="text-sm text-gray-400">
                        所要時間・代替行動・大目標
                      </p>
                    </div>
                  </div>
                  <div className="text-purple-400 transition-transform duration-300">
                    {subFeaturesExpanded ? (
                      <ChevronDown size={24} />
                    ) : (
                      <ChevronRight size={24} />
                    )}
            </div>
                </button>
                
                {/* サブ機能の内容（展開時） */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  subFeaturesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-4 space-y-6 bg-gray-800">

                    {/* 代替行動セクション */}
                    {unlockedFeatures.alternativeActions && (
                      <div className="bg-gray-700 bg-opacity-30 border border-gray-500 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <label className="block text-sm font-medium text-green-300">
                      **予測イレギュラー（代替行動設定）**
                    </label>
                          </div>
                    <button
                      type="button"
                      onClick={() => handleTipClick('alternative-actions')}
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <Lightbulb size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.alternativeActions.map((action, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={action}
                          onChange={(e) => updateAlternativeAction(index, e.target.value)}
                                className="flex-1 bg-gray-800 border border-gray-500 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="代替行動を入力..."
                        />
                        <button
                          type="button"
                          onClick={() => removeAlternativeAction(index)}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAlternativeAction}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>代替行動を追加</span>
                    </button>
                  </div>
                        <div className="mt-2 text-xs text-gray-400">
                          🔄 代替案があると継続率が向上します
                </div>
              </div>
            )}

                    {/* 大目標セクション */}
                    <div className="bg-gray-700 bg-opacity-30 border border-gray-500 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <label className="block text-sm font-medium text-orange-300">
                  **大目標欄**
                </label>
                        </div>
                <button
                  type="button"
                  onClick={() => handleTipClick('big-goal')}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Lightbulb size={16} />
                </button>
              </div>
              <textarea
                value={formData.bigGoal}
                onChange={(e) => setFormData(prev => ({ ...prev, bigGoal: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-500 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="なぜその習慣に挑戦するか（例: 痩せて海に行きたい、健康的な生活リズムを確立したい）"
              />
                      <div className="mt-2 text-xs text-gray-400">
                        💡 明確な目標があると習慣化の成功率が3倍になります
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>**保存**</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ifCondition: '',
                    thenAction: '',
                    thenActions: [''],
                    thenActionsWithRecordType: [{ action: '', recordType: 'time-attack', targetDuration: 30 }],
                    alternativeActions: [''],
                    bigGoal: '',
                  });
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 習慣リスト */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">**設定済み習慣**</h2>
        
        {habits.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">まだ習慣が設定されていません</p>
            <p className="text-sm text-gray-500 mt-2">最初の習慣を設定してみましょう</p>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => (
              <div key={habit.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        **{habit.ifCondition}** → **{(habit.thenActions && habit.thenActions.length > 0) ? habit.thenActions.join(' → ') : habit.thenAction}**
                      </h3>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Ver.{habit.version}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {formatDuration(habit.durationMinutes, habit.durationSeconds)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Archive className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          代替: {habit.alternativeActions.length}個
                        </span>
                      </div>
                    </div>

                    {habit.bigGoal && (
                      <div className="bg-gray-700 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-300">
                          <span className="font-semibold">大目標:</span> {habit.bigGoal}
                        </p>
                      </div>
                    )}

                    {habit.alternativeActions.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-400 mb-2">代替行動:</p>
                        <div className="space-y-1">
                          {habit.alternativeActions.map((action, index) => (
                            <div key={index} className="text-sm text-gray-300 bg-gray-700 rounded px-3 py-1">
                              • {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(habit)}
                      className="w-8 h-8 flex items-center justify-center"
                    >
                      <span className="text-lg">✏️</span>
                    </button>
                    <button
                      onClick={() => handleDelete(habit.id)}
                      className="w-8 h-8 flex items-center justify-center"
                    >
                      <span className="text-lg">🗑️</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 電球モーダル */}
      {showTipModal && currentTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-yellow-400 flex items-center space-x-2">
                <Lightbulb size={20} />
                <span>{currentTip.title}</span>
              </h3>
              <button
                onClick={closeTipModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**実践のコツ**</p>
                <p className="text-sm text-gray-300 whitespace-pre-line">{currentTip.content.tip}</p>
              </div>
              
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**なぜ効果的か**</p>
                <p className="text-sm text-gray-300 whitespace-pre-line">{currentTip.content.effect}</p>
              </div>
              
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**落とし穴**</p>
                <p className="text-sm text-gray-300 whitespace-pre-line">{currentTip.content.pitfall}</p>
              </div>
              
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**余談（もっと見る）**</p>
                <p className="text-sm text-gray-300">{currentTip.content.trivia}</p>
                <button
                  onClick={() => setShowMoreTrivia(!showMoreTrivia)}
                  className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  {showMoreTrivia ? '閉じる' : 'もっと見る'}
                </button>
                {showMoreTrivia && (
                  <div className="mt-3 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 whitespace-pre-line">{currentTip.content.moreTrivia}</p>
                  </div>
                )}
              </div>
              
              <div>
                <p className="font-semibold text-yellow-300 mb-2">**効果の裏付け（参考）**</p>
                <p className="text-xs text-gray-400">{currentTip.content.source}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeTipModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}