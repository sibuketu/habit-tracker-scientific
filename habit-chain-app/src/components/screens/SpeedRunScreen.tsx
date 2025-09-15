'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { useNavigationStore } from '@/store';

interface SpeedRunScreenProps {}

interface SpeedRunStep {
  id: string;
  name: string;
  targetTime: number; // 秒
  bestTime?: number; // 秒
  currentTime?: number; // 秒
  isCompleted: boolean;
  isActive: boolean;
}

const SpeedRunScreen: React.FC<SpeedRunScreenProps> = () => {
  const { setCurrentTab } = useNavigationStore();
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [steps, setSteps] = useState<SpeedRunStep[]>([
    {
      id: '1',
      name: 'ベッドから起き上がる',
      targetTime: 30,
      bestTime: 25,
      isCompleted: false,
      isActive: false
    },
    {
      id: '2',
      name: 'カーテンを開ける',
      targetTime: 15,
      bestTime: 12,
      isCompleted: false,
      isActive: false
    },
    {
      id: '3',
      name: '水を一杯飲む',
      targetTime: 45,
      bestTime: 38,
      isCompleted: false,
      isActive: false
    },
    {
      id: '4',
      name: '深呼吸を3回する',
      targetTime: 60,
      bestTime: 52,
      isCompleted: false,
      isActive: false
    },
    {
      id: '5',
      name: '今日の目標を確認',
      targetTime: 30,
      bestTime: 28,
      isCompleted: false,
      isActive: false
    }
  ]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // タイマーの更新
  useEffect(() => {
    if (isRunning && startTime) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
        
        // 現在のステップの時間を更新
        setSteps(prev => prev.map((step, index) => {
          if (index === currentStepIndex && step.isActive) {
            return { ...step, currentTime: elapsed };
          }
          return step;
        }));
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, startTime, currentStepIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeDifference = (current: number, target: number) => {
    const diff = current - target;
    return diff > 0 ? `+${formatTime(diff)}` : `${formatTime(Math.abs(diff))}`;
  };

  const startSpeedRun = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(new Date());
      setElapsedTime(0);
      
      // 最初のステップをアクティブにする
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        isActive: index === 0
      })));
    }
  };

  const pauseSpeedRun = () => {
    setIsRunning(false);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      // 現在のステップを完了にする
      setSteps(prev => prev.map((step, index) => {
        if (index === currentStepIndex) {
          return { ...step, isCompleted: true, isActive: false };
        }
        return step;
      }));

      // 次のステップをアクティブにする
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        isActive: index === nextIndex
      })));

      // タイマーをリセット
      setElapsedTime(0);
      setStartTime(new Date());
    } else {
      // 最後のステップを完了にする
      setSteps(prev => prev.map((step, index) => {
        if (index === currentStepIndex) {
          return { ...step, isCompleted: true, isActive: false };
        }
        return step;
      }));
      setIsRunning(false);
    }
  };

  const resetSpeedRun = () => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setElapsedTime(0);
    setStartTime(null);
    setSteps(prev => prev.map(step => ({
      ...step,
      isCompleted: false,
      isActive: false,
      currentTime: undefined
    })));
  };

  const getStepStatusColor = (step: SpeedRunStep, index: number) => {
    if (step.isCompleted) return 'bg-green-600';
    if (step.isActive) return 'bg-blue-600';
    if (index < currentStepIndex) return 'bg-gray-600';
    return 'bg-gray-700';
  };

  const getStepBorderColor = (step: SpeedRunStep, index: number) => {
    if (step.isCompleted) return 'border-green-500';
    if (step.isActive) return 'border-blue-500';
    if (index < currentStepIndex) return 'border-gray-500';
    return 'border-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={() => setCurrentTab('home')}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <h1 className="text-xl font-bold text-white tracking-wide">朝起きたら スピードラン</h1>
          <div className="w-8"></div>
        </div>
        <p className="text-gray-300 text-sm font-medium">
          If-Then Planning: 朝7時に目覚ましが鳴ったら
        </p>
      </div>

      {/* 操作ガイド */}
      <div className="px-4 mb-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Space: Start/Split</span>
            <span>R: Reset</span>
          </div>
        </div>
      </div>

      {/* ステップ一覧 */}
      <div className="px-4 mb-6">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg border-2 transition-all ${getStepBorderColor(step, index)} ${getStepStatusColor(step, index)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.isCompleted ? 'bg-green-500' : step.isActive ? 'bg-blue-500' : 'bg-gray-600'
                  }`}>
                    {step.isCompleted ? '✓' : index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{step.name}</h3>
                    <div className="flex items-center space-x-4 text-xs text-gray-300 mt-1">
                      <div className="flex items-center space-x-1">
                        <Target size={12} />
                        <span>目標: {formatTime(step.targetTime)}</span>
                      </div>
                      {step.bestTime && (
                        <div className="flex items-center space-x-1">
                          <Zap size={12} />
                          <span>PB: {formatTime(step.bestTime)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-mono text-white">
                    {step.isActive && step.currentTime !== undefined 
                      ? formatTime(step.currentTime)
                      : '--:--'
                    }
                  </div>
                  {step.isActive && step.currentTime !== undefined && (
                    <div className={`text-xs font-mono ${
                      step.currentTime <= step.targetTime ? 'text-green-400' : 'text-red-400'
                    }`}>
                      差分: {getTimeDifference(step.currentTime, step.targetTime)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* コントロールボタン */}
      <div className="px-4 pb-6">
        <div className="flex space-x-4">
          {/* スタート/ストップボタン */}
          <button
            onClick={isRunning ? pauseSpeedRun : startSpeedRun}
            className={`flex-1 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${
              isRunning 
                ? 'bg-yellow-600 hover:bg-yellow-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isRunning ? (
              <>
                <Pause size={20} />
                <span>ストップ</span>
              </>
            ) : (
              <>
                <Play size={20} />
                <span>スタート</span>
              </>
            )}
          </button>

          {/* 次のステップボタン */}
          {isRunning && (
            <button
              onClick={nextStep}
              className="px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <span>次のステップ</span>
            </button>
          )}

          {/* リセットボタン */}
          <button
            onClick={resetSpeedRun}
            className="px-6 py-4 bg-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* 統計情報 */}
      <div className="px-4 pb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-3">統計情報</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {steps.filter(step => step.isCompleted).length}
              </div>
              <div className="text-xs text-gray-400">完了ステップ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {steps.filter(step => step.isCompleted && step.currentTime && step.currentTime <= step.targetTime).length}
              </div>
              <div className="text-xs text-gray-400">目標達成</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedRunScreen;

