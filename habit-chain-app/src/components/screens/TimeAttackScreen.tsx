'use client';

import { useState, useEffect } from 'react';
import { useTimeAttackStore, useHabitsStore } from '@/store';
import { Habit } from '@/types';
import { Play, Square, Flag, CheckCircle } from 'lucide-react';

const TimeAttackScreen = () => {
  const { 
    state, 
    currentHabit, 
    startTimeAttack, 
    stopTimeAttack, 
    addSplitTime, 
    setAlternative, 
    resetTimeAttack 
  } = useTimeAttackStore();
  
  const { activeHabits } = useHabitsStore();
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showAlternativeModal, setShowAlternativeModal] = useState(false);

  // タイマー効果
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isRunning) {
      interval = setInterval(() => {
        // 経過時間を更新（実際の実装ではより精密に）
        // ここでは簡易版として実装
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [state.isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (selectedHabit) {
      setShowAlternativeModal(true);
    }
  };

  const handleAlternativeChoice = (isAlternative: boolean) => {
    setAlternative(isAlternative);
    startTimeAttack(selectedHabit!);
    setShowAlternativeModal(false);
  };

  const handleStop = () => {
    stopTimeAttack();
    // ここで記録を保存する処理を追加
    resetTimeAttack();
  };

  const getTimeDifference = () => {
    const diff = state.elapsedTime - state.targetTime;
    return {
      value: Math.abs(diff),
      isOver: diff > 0,
      isUnder: diff < 0,
    };
  };

  const timeDiff = getTimeDifference();

  if (!selectedHabit && !currentHabit) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">タイムアタック</h1>
          <p className="text-gray-600 mt-1">習慣を選択して開始しましょう</p>
        </div>

        <div className="space-y-3">
          {activeHabits.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>まだ習慣が設定されていません</p>
              <p className="text-sm mt-1">習慣設定から新しい習慣を追加しましょう</p>
            </div>
          ) : (
            activeHabits.map((habit) => (
              <button
                key={habit.id}
                onClick={() => setSelectedHabit(habit)}
                className="w-full p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="font-medium text-gray-900">
                  {habit.if_condition} → {habit.then_action}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  目標時間: {formatTime(habit.target_duration_seconds)}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">タイムアタック</h1>
        {currentHabit && (
          <p className="text-gray-600 mt-1">
            {currentHabit.if_condition} → {currentHabit.then_action}
          </p>
        )}
      </div>

      {/* Timer Display */}
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="grid grid-cols-3 gap-4 text-center">
          {/* Time Difference */}
          <div className={`p-4 rounded-lg ${
            timeDiff.isOver ? 'bg-red-50 border-red-200' : 
            timeDiff.isUnder ? 'bg-green-50 border-green-200' : 
            'bg-gray-50 border-gray-200'
          } border`}>
            <div className={`text-2xl font-bold ${
              timeDiff.isOver ? 'text-red-600' : 
              timeDiff.isUnder ? 'text-green-600' : 
              'text-gray-600'
            }`}>
              {timeDiff.isOver ? '+' : timeDiff.isUnder ? '-' : ''}{formatTime(timeDiff.value)}
            </div>
            <div className="text-sm text-gray-600">差分</div>
          </div>

          {/* Elapsed Time */}
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-3xl font-bold text-blue-600">
              {formatTime(state.elapsedTime)}
            </div>
            <div className="text-sm text-gray-600">経過時間</div>
          </div>

          {/* Target Time */}
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">
              {formatTime(state.targetTime)}
            </div>
            <div className="text-sm text-gray-600">目標時間</div>
          </div>
        </div>
      </div>

      {/* Split Times */}
      {state.splitTimes.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h3 className="font-medium text-gray-900 mb-3">スプリット記録</h3>
          <div className="space-y-2">
            {state.splitTimes.map((time, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm text-gray-600">スプリット {index + 1}</span>
                <span className="font-medium text-gray-900">{formatTime(time)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!state.isRunning ? (
          <button
            onClick={handleStart}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
          >
            <Play size={20} className="mr-2" />
            開始
          </button>
        ) : (
          <>
            {/* 一時停止機能は要件により削除 */}
            <button
              onClick={addSplitTime}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              <Flag size={20} className="mr-2" />
              スプリット
            </button>
            <button
              onClick={handleStop}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center"
            >
              <Square size={20} className="mr-2" />
              終了
            </button>
          </>
        )}
      </div>

      {/* Alternative Action Modal */}
      {showAlternativeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              実行方法を選択
            </h3>
            <p className="text-gray-600 mb-6">
              通常通り実行しますか？それとも代替行動を実行しますか？
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleAlternativeChoice(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                通常通り実行
              </button>
              <button
                onClick={() => handleAlternativeChoice(true)}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                代替行動を実行
              </button>
              <button
                onClick={() => setShowAlternativeModal(false)}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alternative Action Indicator */}
      {state.isAlternative && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle size={20} className="text-orange-600 mr-2" />
            <span className="text-orange-800 font-medium">代替行動で実行中</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeAttackScreen;
