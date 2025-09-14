'use client';

import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, Gift, Calendar, Target, Clock } from 'lucide-react';
import RewardModal from './RewardModal';

interface Reward {
  id: string;
  type: 'streak' | 'pb' | 'record' | 'custom';
  title: string;
  description: string;
  icon: string;
  isClaimed: boolean;
  claimedAt?: string;
  nextRewardDate?: string;
}

interface RewardSystemProps {
  streakDays: number;
  pbCount: number;
  recordCount: number;
  onRewardClaimed: (rewardId: string) => void;
}

export default function RewardSystem({ streakDays, pbCount, recordCount, onRewardClaimed }: RewardSystemProps) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingRewards, setPendingRewards] = useState<Reward[]>([]);

  // ご褒美テンプレート
  const rewardTemplates = [
    // 連続日数
    { type: 'streak' as const, days: 10, title: '連続10日達成！', description: '素晴らしい継続力です！' },
    { type: 'streak' as const, days: 20, title: '連続20日達成！', description: '習慣が定着してきました！' },
    { type: 'streak' as const, days: 30, title: '連続30日達成！', description: '完璧な習慣化です！' },
    { type: 'streak' as const, days: 50, title: '連続50日達成！', description: '驚異的な継続力！' },
    { type: 'streak' as const, days: 100, title: '連続100日達成！', description: '伝説の継続者！' },
    
    // PB更新
    { type: 'pb' as const, title: 'PB更新！', description: '新しい自己ベストを記録しました！' },
    
    // 記録連続
    { type: 'record' as const, days: 7, title: '記録7日連続！', description: '毎日の記録が習慣化されました！' },
    { type: 'record' as const, days: 14, title: '記録14日連続！', description: '記録の達人です！' },
    { type: 'record' as const, days: 30, title: '記録30日連続！', description: '記録のマスター！' },
  ];

  // ご褒美条件チェック
  useEffect(() => {
    const newRewards: Reward[] = [];
    
    // 連続日数チェック
    rewardTemplates
      .filter(template => template.type === 'streak')
      .forEach(template => {
        if (streakDays >= template.days! && !rewards.some(r => r.title === template.title)) {
          newRewards.push({
            id: `streak-${template.days}`,
            type: 'streak',
            title: template.title,
            description: template.description,
            icon: '🏆',
            isClaimed: false,
          });
        }
      });

    // PB更新チェック
    if (pbCount > 0 && !rewards.some(r => r.type === 'pb' && !r.isClaimed)) {
      newRewards.push({
        id: `pb-${Date.now()}`,
        type: 'pb',
        title: 'PB更新！',
        description: '新しい自己ベストを記録しました！',
        icon: '⭐',
        isClaimed: false,
      });
    }

    // 記録連続チェック
    rewardTemplates
      .filter(template => template.type === 'record')
      .forEach(template => {
        if (recordCount >= template.days! && !rewards.some(r => r.title === template.title)) {
          newRewards.push({
            id: `record-${template.days}`,
            type: 'record',
            title: template.title,
            description: template.description,
            icon: '📝',
            isClaimed: false,
          });
        }
      });

    if (newRewards.length > 0) {
      setPendingRewards(newRewards);
      setShowModal(true);
    }
  }, [streakDays, pbCount, recordCount]);

  const handleClaim = (rewardId: string) => {
    setRewards(prev => prev.map(reward => 
      reward.id === rewardId 
        ? { ...reward, isClaimed: true, claimedAt: new Date().toISOString() }
        : reward
    ));
    
    onRewardClaimed(rewardId);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPendingRewards([]);
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'streak':
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 'pb':
        return <Star className="w-6 h-6 text-blue-400" />;
      case 'record':
        return <Award className="w-6 h-6 text-green-400" />;
      default:
        return <Gift className="w-6 h-6 text-purple-400" />;
    }
  };

  const getNextReward = (type: string) => {
    switch (type) {
      case 'streak':
        if (streakDays < 10) return '連続10日';
        if (streakDays < 20) return '連続20日';
        if (streakDays < 30) return '連続30日';
        if (streakDays < 50) return '連続50日';
        if (streakDays < 100) return '連続100日';
        return '全て達成済み';
      case 'record':
        if (recordCount < 7) return '記録7日連続';
        if (recordCount < 14) return '記録14日連続';
        if (recordCount < 30) return '記録30日連続';
        return '全て達成済み';
      default:
        return '次のご褒美';
    }
  };

  return (
    <div className="space-y-6">
      {/* ご褒美システムヘッダー */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">**ご褒美システム**</h2>
        <p className="text-gray-400 mb-6">
          達成条件を満たしたら必ずモーダル演出。同時達成はキューで順次表示。
        </p>

        {/* 現在の進捗 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{streakDays}日</div>
            <div className="text-sm text-gray-400">連続日数</div>
            <div className="text-xs text-gray-500 mt-1">
              次: {getNextReward('streak')}
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <Star className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{pbCount}回</div>
            <div className="text-sm text-gray-400">PB更新</div>
            <div className="text-xs text-gray-500 mt-1">
              次: 新しいPB
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{recordCount}日</div>
            <div className="text-sm text-gray-400">記録連続</div>
            <div className="text-xs text-gray-500 mt-1">
              次: {getNextReward('record')}
            </div>
          </div>
        </div>
      </div>

      {/* ご褒美テンプレート */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">**ご褒美テンプレート**</h3>
        
        <div className="space-y-4">
          {/* 連続日数 */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>連続日数</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[10, 20, 30, 50, 100].map(days => (
                <div
                  key={days}
                  className={`p-3 rounded-lg text-center ${
                    streakDays >= days
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  <div className="font-bold">{days}日</div>
                  <div className="text-xs">
                    {streakDays >= days ? '達成済み' : '未達成'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PB更新 */}
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>PB更新</span>
            </h4>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span>自己ベスト更新</span>
                <span className="text-blue-400 font-semibold">
                  {pbCount > 0 ? '達成済み' : '未達成'}
                </span>
              </div>
            </div>
          </div>

          {/* 記録連続 */}
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>記録連続</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[7, 14, 30].map(days => (
                <div
                  key={days}
                  className={`p-3 rounded-lg text-center ${
                    recordCount >= days
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  <div className="font-bold">{days}日</div>
                  <div className="text-xs">
                    {recordCount >= days ? '達成済み' : '未達成'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ご褒美モーダル */}
      <RewardModal
        rewards={pendingRewards}
        isOpen={showModal}
        onClose={handleModalClose}
        onClaim={handleClaim}
      />
    </div>
  );
}

