'use client';

import React, { useState } from 'react';
import { 
  Gift, 
  Star, 
  Trophy, 
  Target, 
  Clock, 
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';

interface RewardSystemProps {
  streakDays: number;
  pbCount: number;
  recordCount: number;
  onRewardClaimed: (rewardId: string) => void;
}

interface CustomReward {
  id: string;
  title: string;
  description: string;
  condition: {
    type: 'streak_days' | 'pb_update' | 'record_count' | 'custom';
    value: number;
    description: string;
  };
  reward: string;
  isClaimed: boolean;
  claimedAt?: string;
  isActive: boolean;
}

const RewardSystem: React.FC<RewardSystemProps> = ({
  streakDays,
  pbCount,
  recordCount,
  onRewardClaimed
}) => {
  const [showCustomRewardModal, setShowCustomRewardModal] = useState(false);
  const [customRewards, setCustomRewards] = useState<CustomReward[]>([
    {
      id: '1',
      title: 'ゲーム時間延長',
      description: '30分間ゲームを楽しむ',
      condition: {
        type: 'streak_days',
        value: 7,
        description: '7日連続達成'
      },
      reward: 'ゲーム時間を30分増やす',
      isClaimed: false,
      isActive: true
    },
    {
      id: '2',
      title: 'スイーツ購入',
      description: '好きなスイーツを買う',
      condition: {
        type: 'pb_update',
        value: 1,
        description: 'PB更新'
      },
      reward: 'スイーツを300円以内で買う',
      isClaimed: false,
      isActive: true
    }
  ]);

  const [newReward, setNewReward] = useState({
    title: '',
    description: '',
    conditionType: 'streak_days' as 'streak_days' | 'pb_update' | 'record_count' | 'custom',
    conditionValue: 1,
    reward: ''
  });

  const checkRewardEligibility = (reward: CustomReward) => {
    switch (reward.condition.type) {
      case 'streak_days':
        return streakDays >= reward.condition.value;
      case 'pb_update':
        return pbCount >= reward.condition.value;
      case 'record_count':
        return recordCount >= reward.condition.value;
      default:
        return false;
    }
  };

  const claimReward = (rewardId: string) => {
    setCustomRewards(prev => prev.map(reward => 
      reward.id === rewardId 
        ? { ...reward, isClaimed: true, claimedAt: new Date().toISOString() }
        : reward
    ));
    onRewardClaimed(rewardId);
  };

  const addCustomReward = () => {
    if (newReward.title && newReward.reward) {
      const reward: CustomReward = {
        id: Date.now().toString(),
        title: newReward.title,
        description: newReward.description,
        condition: {
          type: newReward.conditionType,
          value: newReward.conditionValue,
          description: getConditionDescription(newReward.conditionType, newReward.conditionValue)
        },
        reward: newReward.reward,
        isClaimed: false,
        isActive: true
      };
      
      setCustomRewards(prev => [...prev, reward]);
      setNewReward({
        title: '',
        description: '',
        conditionType: 'streak_days',
        conditionValue: 1,
        reward: ''
      });
      setShowCustomRewardModal(false);
    }
  };

  const getConditionDescription = (type: string, value: number) => {
    switch (type) {
      case 'streak_days':
        return `${value}日連続達成`;
      case 'pb_update':
        return 'PB更新';
      case 'record_count':
        return `${value}回記録`;
      default:
        return 'カスタム条件';
    }
  };

  const getConditionIcon = (type: string) => {
    switch (type) {
      case 'streak_days':
        return <Clock className="text-blue-400" size={16} />;
      case 'pb_update':
        return <Trophy className="text-yellow-400" size={16} />;
      case 'record_count':
        return <Target className="text-green-400" size={16} />;
      default:
        return <Star className="text-purple-400" size={16} />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white tracking-wide flex items-center space-x-2">
          <Gift className="text-yellow-400" size={20} />
          <span>ご褒美システム</span>
        </h2>
        <button
          onClick={() => setShowCustomRewardModal(true)}
          className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* 現在の統計 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-700 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-400">{streakDays}</div>
          <div className="text-xs text-gray-400">連続日数</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-yellow-400">{pbCount}</div>
          <div className="text-xs text-gray-400">PB更新</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-400">{recordCount}</div>
          <div className="text-xs text-gray-400">記録回数</div>
        </div>
      </div>

      {/* カスタムご褒美一覧 */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">あなたのご褒美</h3>
        {customRewards.map((reward) => {
          const isEligible = checkRewardEligibility(reward);
          const canClaim = isEligible && !reward.isClaimed && reward.isActive;

          return (
            <div
              key={reward.id}
              className={`p-3 rounded-lg border transition-all ${
                reward.isClaimed
                  ? 'bg-green-900 border-green-500 opacity-75'
                  : canClaim
                  ? 'bg-blue-900 border-blue-500'
                  : 'bg-gray-700 border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white font-medium text-sm">{reward.title}</h4>
                    {getConditionIcon(reward.condition.type)}
                  </div>
                  <p className="text-gray-300 text-xs mb-1">{reward.description}</p>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-gray-400">条件:</span>
                    <span className={`${
                      isEligible ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {reward.condition.description}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs mt-1">
                    <span className="text-gray-400">ご褒美:</span>
                    <span className="text-yellow-400">{reward.reward}</span>
                  </div>
                  {reward.isClaimed && reward.claimedAt && (
                    <div className="text-xs text-green-400 mt-1">
                      獲得済み: {new Date(reward.claimedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div className="ml-3">
                  {reward.isClaimed ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : canClaim ? (
                    <button
                      onClick={() => claimReward(reward.id)}
                      className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                    >
                      <Gift size={16} />
                    </button>
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                      <AlertCircle className="text-gray-400" size={16} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* カスタムご褒美追加モーダル */}
      {showCustomRewardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">新しいご褒美を追加</h3>
              <button
                onClick={() => setShowCustomRewardModal(false)}
                className="w-8 h-8 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">タイトル</label>
                <input
                  type="text"
                  value={newReward.title}
                  onChange={(e) => setNewReward(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="例: ゲーム時間延長"
                  className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">説明</label>
                <input
                  type="text"
                  value={newReward.description}
                  onChange={(e) => setNewReward(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="例: 30分間ゲームを楽しむ"
                  className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">達成条件</label>
                <select
                  value={newReward.conditionType}
                  onChange={(e) => setNewReward(prev => ({ 
                    ...prev, 
                    conditionType: e.target.value as 'streak_days' | 'pb_update' | 'record_count' | 'custom' 
                  }))}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 mb-2"
                >
                  <option value="streak_days">連続日数</option>
                  <option value="pb_update">PB更新</option>
                  <option value="record_count">記録回数</option>
                  <option value="custom">カスタム</option>
                </select>
                
                {(newReward.conditionType === 'streak_days' || newReward.conditionType === 'record_count') && (
                  <input
                    type="number"
                    value={newReward.conditionValue}
                    onChange={(e) => setNewReward(prev => ({ ...prev, conditionValue: parseInt(e.target.value) || 1 }))}
                    placeholder="数値"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">ご褒美の内容</label>
                <input
                  type="text"
                  value={newReward.reward}
                  onChange={(e) => setNewReward(prev => ({ ...prev, reward: e.target.value }))}
                  placeholder="例: ゲーム時間を30分増やす"
                  className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600"
                />
                <p className="text-gray-400 text-xs mt-1">
                  具体的で実行可能なご褒美を設定してください
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCustomRewardModal(false)}
                className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={addCustomReward}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                追加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ヒント */}
      <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="text-blue-400 mt-0.5" size={16} />
          <div className="text-xs text-gray-300">
            <p className="font-medium mb-1">ご褒美設定のコツ:</p>
            <ul className="space-y-1 text-gray-400">
              <li>• 具体的で実行可能なご褒美にしましょう</li>
              <li>• 金額や時間には上限を設けましょう</li>
              <li>• 達成条件は段階的に設定しましょう</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardSystem;