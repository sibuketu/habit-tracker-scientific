import React, { useState } from 'react';
import { redirectToCustomerPortal } from '../../lib/stripe';
import SubscriptionModal from './SubscriptionModal';

interface SubscriptionButtonProps {
  isSubscribed?: boolean;
  className?: string;
}

export default function SubscriptionButton({ isSubscribed = false, className = '' }: SubscriptionButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (isSubscribed) {
      // 既にサブスクライブしている場合は管理画面へ
      try {
        await redirectToCustomerPortal();
      } catch (error) {
        console.error('Failed to redirect to customer portal:', error);
        alert('サブスクリプション管理画面へのアクセスに失敗しました。');
      }
    } else {
      // サブスクライブしていない場合はモーダルを表示
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
          isSubscribed
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
        } ${className}`}
      >
        {isSubscribed ? 'サブスクリプション管理' : 'プレミアムプラン'}
      </button>
      
      <SubscriptionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}
