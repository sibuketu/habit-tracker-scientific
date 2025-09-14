'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, Plus, X, Trophy, Clock, Target, Zap } from 'lucide-react';
import { useMiniAppStore } from '@/store';
import { TimeAttackChain } from '@/types';

interface TimeAttackChainMiniAppProps {
  onClose: () => void;
  habitId: string;
}

export default function TimeAttackChainMiniApp({ onClose, habitId }: TimeAttackChainMiniAppProps) {
  const { timeAttackChains, addTimeAttackChain, updateTimeAttackChain } = useMiniAppStore();
  const [currentChain, setCurrentChain] = useState<TimeAttackChain | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChainName, setNewChainName] = useState('');
  const [newChainDescription, setNewChainDescription] = useState('');
  const [targetTimes, setTargetTimes] = useState<number[]>([]);

  // 既存のチェーンを取得または新規作成
  useEffect(() => {
    const existingChain = timeAttackChains.find(chain => 
      chain.habit_id === habitId && chain.is_active
    );
    
    if (existingChain) {
      setCurrentChain(existingChain);
    } else {
      // デフォルトのチェーンを作成
      const defaultChain: TimeAttackChain = {
        id: `chain-${habitId}-${Date.now()}`,
        user_id: 'current-user',
        habit_id: habitId,
        chain_name: 'デフォルトチェーン',
        description: '基本的なタイムアタックチェーン',
        target_times: [30, 60, 90, 120], // 30秒、1分、1分30秒、2分
        best_times: [],
        attempts: 0,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      addTimeAttackChain(defaultChain);
      setCurrentChain(defaultChain);
    }
  }, [habitId, timeAttackChains, addTimeAttackChain]);

  // タイマーの更新
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime]);

  const startChain = () => {
    setIsRunning(true);
    setStartTime(new Date());
    setCurrentStep(0);
    setElapsedTime(0);
  };

  const pauseChain = () => {
    setIsRunning(false);
  };

  const resumeChain = () => {
    if (startTime) {
      const pausedElapsed = elapsedTime;
      setStartTime(new Date(Date.now() - pausedElapsed * 1000));
      setIsRunning(true);
    }
  };

  const stopChain = () => {
    if (currentChain && startTime) {
      const finalTime = elapsedTime;
      const newBestTimes = [...currentChain.best_times];
      
      if (currentStep < currentChain.target_times.length) {
        newBestTimes[currentStep] = finalTime;
      }
      
      updateTimeAttackChain(currentChain.id, {
        best_times: newBestTimes,
        attempts: currentChain.attempts + 1,
        updated_at: new Date().toISOString(),
      });
    }
    
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setCurrentStep(0);
  };

  const resetChain = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentChain && currentStep < currentChain.target_times.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const createNewChain = () => {
    if (newChainName.trim() && targetTimes.length > 0) {
      const newChain: TimeAttackChain = {
        id: `chain-${habitId}-${Date.now()}`,
        user_id: 'current-user',
        habit_id: habitId,
        chain_name: newChainName.trim(),
        description: newChainDescription.trim(),
        target_times: targetTimes,
        best_times: [],
        attempts: 0,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      addTimeAttackChain(newChain);
      setCurrentChain(newChain);
      setShowCreateModal(false);
      setNewChainName('');
      setNewChainDescription('');
      setTargetTimes([]);
    }
  };

  const addTargetTime = () => {
    setTargetTimes([...targetTimes, 30]);
  };

  const updateTargetTime = (index: number, value: number) => {
    const newTimes = [...targetTimes];
    newTimes[index] = value;
    setTargetTimes(newTimes);
  };

  const removeTargetTime = (index: number) => {
    setTargetTimes(targetTimes.filter((_, i) => i !== index));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const getCurrentTargetTime = () => {
    return currentChain ? currentChain.target_times[currentStep] : 0;
  };

  const getCurrentBestTime = () => {
    return currentChain ? currentChain.best_times[currentStep] : null;
  };

  const isStepCompleted = () => {
    return currentChain && currentChain.best_times[currentStep] !== undefined;
  };

  if (!currentChain) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">チェーンを準備中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">⏱️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">タイムアタックチェーン</h2>
              <p className="text-sm text-gray-400">{currentChain.chain_name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <X size={16} className="text-gray-300" />
          </button>
        </div>

        {/* 現在のステップ */}
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              ステップ {currentStep + 1} / {currentChain.target_times.length}
            </h3>
            <div className="text-4xl font-bold text-orange-400 mb-2">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-sm text-gray-400">
              目標: {formatTime(getCurrentTargetTime())}
            </div>
          </div>

          {/* 進捗バー */}
          <div className="w-full bg-gray-600 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min((elapsedTime / getCurrentTargetTime()) * 100, 100)}%` 
              }}
            ></div>
          </div>

          {/* コントロールボタン */}
          <div className="flex justify-center space-x-3">
            {!isRunning ? (
              <button
                onClick={startChain}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Play size={20} />
                <span>開始</span>
              </button>
            ) : (
              <>
                <button
                  onClick={pauseChain}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                >
                  <Pause size={20} />
                  <span>一時停止</span>
                </button>
                <button
                  onClick={stopChain}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <Square size={20} />
                  <span>終了</span>
                </button>
              </>
            )}
            
            {!isRunning && elapsedTime > 0 && (
              <button
                onClick={resumeChain}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Play size={20} />
                <span>再開</span>
              </button>
            )}
            
            <button
              onClick={resetChain}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <RotateCcw size={20} />
              <span>リセット</span>
            </button>
          </div>
        </div>

        {/* チェーン全体の進捗 */}
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">チェーン進捗</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentChain.target_times.map((targetTime, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  index === currentStep && isRunning
                    ? 'border-orange-500 bg-orange-500 bg-opacity-10'
                    : isStepCompleted()
                    ? 'border-green-500 bg-green-500 bg-opacity-10'
                    : index < currentStep
                    ? 'border-gray-500 bg-gray-500 bg-opacity-10'
                    : 'border-gray-600 bg-gray-600 bg-opacity-10'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-white mb-1">
                    ステップ {index + 1}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    目標: {formatTime(targetTime)}
                  </div>
                  {currentChain.best_times[index] !== undefined ? (
                    <div className="text-green-400 font-semibold">
                      <Trophy size={16} className="inline mr-1" />
                      {formatTime(currentChain.best_times[index])}
                    </div>
                  ) : (
                    <div className="text-gray-500">未達成</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 統計情報 */}
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">統計</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {currentChain.attempts}
              </div>
              <div className="text-sm text-gray-400">総試行回数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {currentChain.best_times.filter(time => time !== undefined).length}
              </div>
              <div className="text-sm text-gray-400">完了ステップ</div>
            </div>
          </div>
        </div>

        {/* 新しいチェーン作成ボタン */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>新しいチェーンを作成</span>
        </button>

        {/* 新規チェーン作成モーダル */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">新しいチェーンを作成</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    チェーン名
                  </label>
                  <input
                    type="text"
                    value={newChainName}
                    onChange={(e) => setNewChainName(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="例: 朝のルーティーン"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    説明（任意）
                  </label>
                  <textarea
                    value={newChainDescription}
                    onChange={(e) => setNewChainDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="チェーンの説明を入力..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    目標時間（秒）
                  </label>
                  <div className="space-y-2">
                    {targetTimes.map((time, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={time}
                          onChange={(e) => updateTargetTime(index, parseInt(e.target.value) || 0)}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="1"
                        />
                        <button
                          onClick={() => removeTargetTime(index)}
                          className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addTargetTime}
                      className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>目標時間を追加</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={createNewChain}
                  disabled={!newChainName.trim() || targetTimes.length === 0}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
