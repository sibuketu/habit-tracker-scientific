'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw, Clock, Target, Lightbulb, X } from 'lucide-react';

type ScreenState = 'idle' | 'running' | 'finished';

export default function TimeAttackScreen() {
  const [screenState, setScreenState] = useState<ScreenState>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [splits, setSplits] = useState<number[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showTipModal, setShowTipModal] = useState(false);
  const [currentTip, setCurrentTip] = useState<{
    title: string;
    content: {
      effect: string;
      tip: string;
      pitfall: string;
      trivia: string;
      source: string;
    };
  } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const tasks = [
    { id: 1, name: 'ベッドから起き上がる', targetTime: 10 }, // 10秒
    { id: 2, name: 'カーテンを開けて日光を浴びる', targetTime: 15 }, // 15秒
    { id: 3, name: 'コップ1杯の水を飲む', targetTime: 20 }, // 20秒
    { id: 4, name: '軽いストレッチ (5分)', targetTime: 300 }, // 5分 = 300秒
    { id: 5, name: '朝食を食べる', targetTime: 600 }, // 10分 = 600秒
  ];

  const formatTime = (totalSeconds: number) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00.00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 100);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  const formatTimeSimple = (totalSeconds: number) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (screenState === 'running') {
      const startTime = Date.now() - elapsedSeconds * 1000;
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((Date.now() - startTime) / 1000);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [screenState]);

  const handleStart = () => {
    setElapsedSeconds(0);
    setSplits([]);
    setCurrentTaskIndex(0);
    setScreenState('running');
  };

  const handleSplit = () => {
    if (screenState === 'running') {
      setSplits(prev => [...prev, elapsedSeconds]);
      setCurrentTaskIndex(prev => prev + 1);
    }
  };

  const handleStop = () => {
    setScreenState('finished');
  };

  const handleReset = () => {
    setScreenState('idle');
    setElapsedSeconds(0);
    setSplits([]);
    setCurrentTaskIndex(0);
  };

  // 電球の説明データ
  const tipData = {
    'streak': {
      title: '累計差分（目標−経過の合計）',
      content: {
        tip: '1. 合計で緑ならOK（途中赤でも挽回可）。\n2. 週単位で差分トレンドを観察。\n3. 目標は現実的に（Ver更新で調整）。',
        effect: '(1) 合計差分は全体最適を促す。\n\n(2) 部分失敗を取り戻せる余白を与える。\n\n(3) 長期的な傾向が見えることで調整が容易になる。',
        pitfall: '非現実的な目標設定で常に赤→動機低下。\n細かい誤差に囚われる。',
        trivia: '長距離走も総合ペースで観ると挽回設計がしやすい。',
        source: 'Zimmerman（自己調整学習）'
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

  const getCurrentTaskTime = () => {
    if (splits.length === 0) return elapsedSeconds;
    return elapsedSeconds - splits[splits.length - 1];
  };

  const getTotalTargetTime = () => {
    return tasks.reduce((sum, task) => sum + task.targetTime, 0);
  };

  const getDifference = () => {
    const targetTime = getTotalTargetTime();
    return elapsedSeconds - targetTime;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* グリッドパターン背景 */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10 px-4 pt-4 pb-6">
                  {/* ヘッダー */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <h1 className="text-2xl font-bold">朝起きたら スピードラン</h1>
                      <button
                        onClick={() => handleTipClick('streak')}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <Lightbulb size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-green-200">If-Then Planning: 朝7時に目覚ましが鳴ったら</p>
                  </div>

        {/* タスクリスト */}
        <div className="space-y-3 mb-6">
          {tasks.map((task, index) => {
            const isCompleted = index < splits.length;
            const isCurrent = index === currentTaskIndex && screenState === 'running';
            const splitTime = index > 0 ? splits[index - 1] : 0;
            const currentTime = index < splits.length ? splits[index] : elapsedSeconds;
            const taskTime = currentTime - splitTime;
            
            // 差分計算（目標 - 経過時間）
            const difference = task.targetTime - taskTime;
            const isAhead = difference >= 0; // 早い（緑）or 遅い（赤）

            return (
              <div
                key={task.id}
                className={`bg-gray-800 rounded-xl p-3 flex items-center justify-between ${
                  isCurrent ? 'ring-2 ring-green-400' : ''
                } ${isCompleted ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {task.id}
                  </div>
                  <span className="text-sm font-medium">{task.name}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* 左: 差分（目標 - 経過時間） */}
                  <div className="text-right">
                    <div className="text-xs text-green-200">差分</div>
                    <div className={`text-sm font-mono ${isAhead ? 'text-green-400' : 'text-red-400'}`}>
                      {index < splits.length ? (isAhead ? '+' : '') + formatTimeSimple(Math.abs(difference)) : '--:--'}
                    </div>
                  </div>
                  
                  {/* 中央: 経過時間（個別） */}
                  <div className="text-right">
                    <div className="text-xs text-green-200">経過</div>
                    <div className="text-sm font-mono">
                      {index < splits.length ? formatTime(taskTime) : '--:--.--'}
                    </div>
                  </div>
                  
                  {/* 右: 目標タイム（個別） */}
                  <div className="text-right">
                    <div className="text-xs text-green-200">目標</div>
                    <div className="text-sm font-mono">{formatTimeSimple(task.targetTime)}</div>
                  </div>
                  
                  {isCurrent && screenState === 'running' && (
                    <button
                      onClick={handleSplit}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Split
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* メインタイマーとコントロール */}
        <div className="space-y-4">
          {/* メインタイマー */}
          <div className="text-center">
            <div className="text-4xl font-mono font-bold">{formatTime(elapsedSeconds)}</div>
            <div className="text-xs text-green-200 mt-1">目標タイムとの差</div>
            <div className="text-sm font-mono">
              {getDifference() >= 0 ? '+' : ''}{formatTimeSimple(Math.abs(getDifference()))}
            </div>
          </div>

          {/* 操作ボタン */}
          <div className="flex justify-center space-x-3">
            {screenState === 'idle' && (
              <button
                onClick={handleStart}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <Play size={20} />
                <span>Start</span>
              </button>
            )}

            {screenState === 'running' && (
              <>
                <button
                  onClick={handleSplit}
                  className="bg-blue-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <Clock size={20} />
                  <span>Split</span>
                </button>
                <button
                  onClick={handleStop}
                  className={`${
                    currentTaskIndex + 1 === tasks.length 
                      ? 'bg-purple-500 hover:bg-purple-600' 
                      : 'bg-orange-500 hover:bg-orange-600'
                  } text-white px-4 py-3 rounded-xl font-bold transition-colors flex items-center space-x-2`}
                >
                  <Square size={20} />
                  <span>
                    {currentTaskIndex + 1 === tasks.length 
                      ? 'ラストスパート！' 
                      : `途中クリア (${currentTaskIndex + 1}/${tasks.length})`
                    }
                  </span>
                </button>
              </>
            )}

            {screenState === 'finished' && (
              <div className="text-center space-y-3">
                {splits.length === tasks.length && (
                  <div className="text-4xl mb-2 animate-bounce">
                    🎆🎇✨🎊🎉
                  </div>
                )}
                <div className={`text-lg font-semibold ${
                  splits.length === tasks.length 
                    ? 'text-yellow-300 animate-pulse' 
                    : 'text-green-300'
                }`}>
                  {splits.length === tasks.length 
                    ? '🎉 完全クリア！お疲れ様でした！' 
                    : splits.length === tasks.length - 1
                    ? '🏁 ラストスパート完了！'
                    : `途中クリア (${splits.length}/${tasks.length})`
                  }
                </div>
                {splits.length === tasks.length && (
                  <div className="text-sm text-yellow-200">
                    ✨ 全てのタスクを完了しました！素晴らしいです！
                  </div>
                )}
                <button
                  onClick={handleReset}
                  className={`${
                    splits.length === tasks.length 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center space-x-2`}
                >
                  <RotateCcw size={20} />
                  <span>Reset</span>
                </button>
              </div>
            )}
          </div>

          {/* 項目時間 */}
          <div className="text-center">
            <div className="text-xs text-green-200">項目時</div>
            <div className="text-lg font-mono">{formatTimeSimple(getCurrentTaskTime())}</div>
          </div>
        </div>

        {/* キーボードショートカット */}
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs">
          <div>Space: Start/Split</div>
          <div>R: Reset</div>
        </div>
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