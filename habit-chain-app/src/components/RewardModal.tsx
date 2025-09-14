'use client';

import React, { useEffect, useState } from 'react';
import { Award, Trophy, Star, Gift, X, Volume2, VolumeX } from 'lucide-react';

interface Reward {
  id: string;
  type: 'streak' | 'pb' | 'record' | 'custom';
  title: string;
  description: string;
  icon: string;
  isClaimed: boolean;
  claimedAt?: string;
}

interface RewardModalProps {
  rewards: Reward[];
  isOpen: boolean;
  onClose: () => void;
  onClaim: (rewardId: string) => void;
}

export default function RewardModal({ rewards, isOpen, onClose, onClaim }: RewardModalProps) {
  const [currentRewardIndex, setCurrentRewardIndex] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen && rewards.length > 0) {
      setCurrentRewardIndex(0);
      setShowAnimation(true);
      
      // 効果音再生（実際の実装では音声ファイルを再生）
      if (isSoundEnabled) {
        console.log('🎵 ご褒美獲得音を再生');
      }
    }
  }, [isOpen, rewards.length, isSoundEnabled]);

  const currentReward = rewards[currentRewardIndex];

  const handleClaim = () => {
    onClaim(currentReward.id);
    
    // 次のご褒美があるかチェック
    if (currentRewardIndex < rewards.length - 1) {
      setCurrentRewardIndex(prev => prev + 1);
      setShowAnimation(true);
      
      // 次のご褒美の効果音
      if (isSoundEnabled) {
        console.log('🎵 次のご褒美音を再生');
      }
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    setShowAnimation(false);
    setTimeout(() => {
      onClose();
      setCurrentRewardIndex(0);
    }, 300);
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'streak':
        return <Trophy className="w-16 h-16 text-yellow-400" />;
      case 'pb':
        return <Star className="w-16 h-16 text-blue-400" />;
      case 'record':
        return <Award className="w-16 h-16 text-green-400" />;
      default:
        return <Gift className="w-16 h-16 text-purple-400" />;
    }
  };

  const getRewardColor = (type: string) => {
    switch (type) {
      case 'streak':
        return 'from-yellow-600 to-orange-600';
      case 'pb':
        return 'from-blue-600 to-cyan-600';
      case 'record':
        return 'from-green-600 to-emerald-600';
      default:
        return 'from-purple-600 to-pink-600';
    }
  };

  if (!isOpen || !currentReward) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-gray-900 rounded-2xl p-8 max-w-md w-full transform transition-all duration-500 ${
        showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {currentRewardIndex + 1} / {rewards.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isSoundEnabled ? (
                <Volume2 className="w-5 h-5 text-gray-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* ご褒美内容 */}
        <div className="text-center">
          {/* アイコン */}
          <div className="mb-6">
            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getRewardColor(currentReward.type)} flex items-center justify-center mb-4 animate-pulse`}>
              {getRewardIcon(currentReward.type)}
            </div>
          </div>

          {/* タイトル */}
          <h2 className="text-3xl font-bold text-white mb-4">
            **{currentReward.title}**
          </h2>

          {/* 説明 */}
          <p className="text-lg text-gray-300 mb-8">
            {currentReward.description}
          </p>

          {/* 獲得ボタン */}
          <button
            onClick={handleClaim}
            className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r ${getRewardColor(currentReward.type)} hover:scale-105 hover:shadow-lg`}
          >
            **ご褒美を獲得！**
          </button>

          {/* 進捗バー */}
          {rewards.length > 1 && (
            <div className="mt-6">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${getRewardColor(currentReward.type)} transition-all duration-500`}
                  style={{ width: `${((currentRewardIndex + 1) / rewards.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

