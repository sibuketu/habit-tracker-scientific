import React, { useState } from 'react';
import { createSubscription } from '../../lib/stripe';
import { useTranslation } from '../../hooks/useTranslation';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleSubscribe = async (priceId: string, planName: string) => {
    try {
      setLoading(planName);
      await createSubscription(priceId, email || undefined);
    } catch (error) {
      console.error('Subscription error:', error);
      alert('サブスクリプションの作成に失敗しました。');
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-200">プレミアムプラン</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">メールアドレス（任意）</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full text-sm bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          {/* Premium プラン */}
          <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-4 border border-green-500">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-white">Premium プラン</h4>
              <span className="text-2xl font-bold text-green-400">¥4,500</span>
            </div>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              <li>• 全機能へのアクセス</li>
              <li>• 無制限のルーティーン</li>
              <li>• 詳細な統計データ</li>
              <li>• プライオリティサポート</li>
              <li>• データ同期</li>
              <li>• 早期アクセス機能</li>
            </ul>
            <button
              onClick={() => handleSubscribe('price_premium', 'premium')}
              disabled={loading === 'premium'}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {loading === 'premium' ? '処理中...' : '月額¥4,500で始める'}
            </button>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
          >
            {t.common.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
