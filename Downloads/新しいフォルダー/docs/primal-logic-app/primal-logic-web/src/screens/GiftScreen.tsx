/**
 * CarnivoreOS - Gift Screen
 *
 * ギフト購入画面: お��投げめE+ メチE��ージ入劁E */

import { useState, useEffect } from 'react';
import { useTranslation } from '../utils/i18n';
import { logError, getUserFriendlyErrorMessage } from '../utils/errorHandler';
import { isSupabaseAvailable, supabase } from '../lib/supabaseClient';
import { httpsCallable } from 'firebase/functions';
import { functions, auth } from '../lib/firebaseClient';
import { signInAnonymously } from 'firebase/auth';
import './GiftScreen.css';

interface GiftScreenProps {
  onBack: () => void;
}

interface GiftData {
  totalAmount: number;
  newUserCount: number;
  discountPerUser: number;
}

interface GiftMessage {
  id: string;
  message: string;
  isPublic: boolean;
  createdAt: string;
  userId: string;
  likes?: number;
  replies?: GiftReply[];
  userLiked?: boolean;
}

interface GiftReply {
  id: string;
  messageId: string;
  userId: string;
  replyText: string;
  createdAt: string;
}

// Supabase giftsチE�Eブルの型定義
interface SupabaseGift {
  id: string;
  user_id: string;
  amount: number;
  month: string;
  message?: string | null;
  is_public?: boolean | null;
  created_at: string;
  likes?: number;
  replies?: GiftReply[];
}

export default function GiftScreen({ onBack }: GiftScreenProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [giftData, setGiftData] = useState<GiftData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [myMessages, setMyMessages] = useState<GiftMessage[]>([]);
  const [publicMessages, setPublicMessages] = useState<GiftMessage[]>([]);
  const [giftAmount, setGiftAmount] = useState<number>(1350); // 9ドル = 紁E350冁E��Eドル=150冁E��算！E  const [giftMode, setGiftMode] = useState<'amount' | 'people'>('people'); // 'amount': 金額指宁E 'people': 人数持E��（デフォルチE 人数持E��で利他性を刺激�E�E  const [giftPeopleCount, setGiftPeopleCount] = useState<number>(1.0); // 何人刁E��るか（小数対応！E  const [replyingTo, setReplyingTo] = useState<string | null>(null); // 返信対象のメチE��ージID
  const [replyText, setReplyText] = useState<string>(''); // 返信チE��スチE  const MONTHLY_PRICE = 1350; // 1ヶ月�Eの価格�E�Eドル = 紁E350冁E��E
  // ギフトチE�Eタを取征E  useEffect(() => {
    loadGiftData();
    loadMessages();
  }, []);

  const loadGiftData = async () => {
    try {
      if (!isSupabaseAvailable()) {
        // モチE��チE�Eタ�E�開発用�E�E        setGiftData({
          totalAmount: 50000,
          newUserCount: 20,
          discountPerUser: 2500,
        });
        return;
      }

      const today = new Date();
      // 月�E形弁E '2025-01' (YYYY-MM)
      const monthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthStartStr = monthStart.toISOString().split('T')[0];

      // 今月のGift総額を取征E      const { data: gifts, error: giftsError } = await supabase
        .from('gifts')
        .select('amount')
        .eq('month', monthStr);

      if (giftsError) throw giftsError;

      const totalAmount = gifts?.reduce((sum, g) => sum + g.amount, 0) || 0;

      // 今月の新規ユーザー数を取征E      const { data: newUsers, error: newUsersError } = await supabase
        .from('user_profiles')
        .select('id')
        .gte('created_at', monthStartStr + 'T00:00:00.000Z')
        .lt(
          'created_at',
          new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().split('T')[0] +
            'T00:00:00.000Z'
        );

      if (newUsersError) throw newUsersError;

      const newUserCount = newUsers?.length || 0;
      const discountPerUser = newUserCount > 0 ? Math.floor(totalAmount / newUserCount) : 0;

      setGiftData({
        totalAmount,
        newUserCount,
        discountPerUser,
      });
    } catch (error) {
      logError(error, { action: 'loadGiftData' });
      // エラー時�EモチE��チE�Eタを表示
      setGiftData({
        totalAmount: 50000,
        newUserCount: 20,
        discountPerUser: 2500,
      });
    }
  };

  const loadMessages = async () => {
    try {
      if (!isSupabaseAvailable()) {
        // モチE��チE�Eタ�E�開発用�E�E        const mockMyMessages: GiftMessage[] = [
          {
            id: 'm1',
            message:
              'カーニ�EアダイエチE��を始めるあなたを応援してぁE��す！一緒に健康な体を目持E��ましょぁE��E,
            isPublic: true,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            userId: 'local',
            likes: 12,
            replies: [
              {
                id: 'r1',
                messageId: 'm1',
                userId: 'user2',
                replyText: 'ありがとぁE��ざいます！E��張ります！E,
                createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
              },
            ],
            userLiked: false,
          },
          {
            id: 'm2',
            message: '初月は大変ですが、乗り越えれ�E素晴らしぁE��界が征E��てぁE��す、E,
            isPublic: false,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            userId: 'local',
            likes: 0,
            replies: [],
            userLiked: false,
          },
        ];
        const mockPublicMessages: GiftMessage[] = [
          {
            id: 'p1',
            message: 'ようこそ�E�一緒に健康になりましょぁE��E,
            isPublic: true,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            userId: 'user1',
            likes: 25,
            replies: [
              {
                id: 'r2',
                messageId: 'p1',
                userId: 'user3',
                replyText: 'ありがとぁE��ざいます！E,
                createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
              },
            ],
            userLiked: true,
          },
          {
            id: 'p2',
            message: '肉�E最高�E薬です、E,
            isPublic: true,
            createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            userId: 'user2',
            likes: 18,
            replies: [],
            userLiked: false,
          },
          {
            id: 'p3',
            message: '迷ったら肉を食べよう�E�E,
            isPublic: true,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            userId: 'user3',
            likes: 15,
            replies: [
              {
                id: 'r3',
                messageId: 'p3',
                userId: 'user4',
                replyText: 'そ�E通りです！E,
                createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
              },
            ],
            userLiked: false,
          },
          {
            id: 'm1',
            message:
              'カーニ�EアダイエチE��を始めるあなたを応援してぁE��す！一緒に健康な体を目持E��ましょぁE��E,
            isPublic: true,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            userId: 'local',
            likes: 12,
            replies: [
              {
                id: 'r1',
                messageId: 'm1',
                userId: 'user2',
                replyText: 'ありがとぁE��ざいます！E��張ります！E,
                createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
              },
            ],
            userLiked: false,
          },
        ];
        setMyMessages(mockMyMessages);
        setPublicMessages(mockPublicMessages);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // 自刁E�EメチE��ージを取得！EiftsチE�Eブルから、messageフィールドが存在するも�Eのみ�E�E      // 注愁E is_publicフィールドが存在しなぁE��合�E、messageフィールド�Eみで判宁E      const { data: myGifts, error: myGiftsError } = await supabase
        .from('gifts')
        .select('id, message, is_public, created_at')
        .eq('user_id', user.id)
        .not('message', 'is', null)
        .order('created_at', { ascending: false });

      if (myGiftsError) {
        logError(myGiftsError, { action: 'loadMessages', type: 'myMessages' });
      }

      // GiftMessage形式に変換
      const myMsgs: GiftMessage[] = (myGifts || []).map((g: SupabaseGift) => ({
        id: g.id,
        message: g.message || '',
        isPublic: g.is_public !== undefined ? g.is_public : true, // チE��ォルト�E公閁E        createdAt: g.created_at || new Date().toISOString(),
        userId: user.id,
      }));
      setMyMessages(myMsgs);

      // 公開メチE��ージを取得！EiftsチE�Eブルから、is_public=trueかつmessageが存在するも�Eのみ�E�E      // 注愁E is_publicフィールドが存在しなぁE��合�E、�EてのメチE��ージを�E開として扱ぁE      const { data: publicGifts, error: publicGiftsError } = await supabase
        .from('gifts')
        .select('id, message, is_public, created_at, user_id')
        .not('message', 'is', null)
        .order('created_at', { ascending: false })
        .limit(50);

      if (publicGiftsError) {
        logError(publicGiftsError, { action: 'loadMessages', type: 'publicMessages' });
      }

      // GiftMessage形式に変換�E�Es_publicがtrueのも�Eのみ、また�Eis_publicフィールドが存在しなぁE��合�E全て�E�E      // ぁE��ね数と返信を取得！Eupabaseから取得！E      const currentUserId = user?.id || '';

      const publicMsgs: GiftMessage[] = await Promise.all(
        (publicGifts || [])
          .filter((g: SupabaseGift) => g.is_public === undefined || g.is_public === true)
          .map(async (g: SupabaseGift) => {
            // ぁE��ね数を取得！Eift_likesチE�Eブルから�E�E            const { count: likesCount } = await supabase
              .from('gift_likes')
              .select('*', { count: 'exact', head: true })
              .eq('gift_id', g.id);

            // 現在のユーザーがいぁE�EしてぁE��か確誁E            const { data: userLike } = await supabase
              .from('gift_likes')
              .select('id')
              .eq('gift_id', g.id)
              .eq('user_id', currentUserId)
              .single();

            // 返信を取得！Eift_repliesチE�Eブルから�E�E            const { data: repliesData } = await supabase
              .from('gift_replies')
              .select('*')
              .eq('message_id', g.id)
              .order('created_at', { ascending: true });

            const replies: GiftReply[] = (repliesData || []).map((r: any) => ({
              id: r.id,
              messageId: r.message_id,
              userId: r.user_id,
              replyText: r.reply_text,
              createdAt: r.created_at,
            }));

            return {
              id: g.id,
              message: g.message || '',
              isPublic: true,
              createdAt: g.created_at || new Date().toISOString(),
              userId: g.user_id || '',
              likes: likesCount || 0,
              replies,
              userLiked: !!userLike,
            };
          })
      );
      setPublicMessages(publicMsgs);
    } catch (error) {
      logError(error, { action: 'loadMessages' });
    }
  };

  // 実際の購入金額を計箁E  const calculatePurchaseAmount = (): number => {
    if (giftMode === 'amount') {
      return giftAmount;
    } else {
      return Math.round(giftPeopleCount * MONTHLY_PRICE);
    }
  };

  const handlePurchase = async () => {
    if (isLoading) return;

    const purchaseAmount = calculatePurchaseAmount();
    if (purchaseAmount <= 0) {
      alert('金額を入力してください');
      return;
    }

    setIsLoading(true);
    try {
      // Stripe決済�E琁E��環墁E��数が設定されてぁE��場合�Eみ実行！E      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      if (stripeKey && typeof window !== 'undefined' && (window as any).Stripe) {
        try {
          // Firebase Auth�E�匿名認証�E�E          if (auth && !auth.currentUser) {
            await signInAnonymously(auth);
          }

          // Firebase Functions経由でStripe Checkout Sessionを作�E
          if (functions) {
            const currentUrl = window.location.origin;
            const successUrl = `${currentUrl}/?payment_success=true&giftMode=${giftMode}`;
            const cancelUrl = `${currentUrl}/?payment_cancel=true`;

            const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');
            const result = await createCheckoutSession({
              amount: purchaseAmount,
              currency: 'jpy',
              metadata: {
                giftMode,
                message: message.trim() || null,
                isPublic: isPublicMessage,
              },
              successUrl,
              cancelUrl,
            });

            const data = result.data as { sessionId?: string; url?: string };

            if (data.url) {
              // Stripe CheckoutにリダイレクチE              window.location.href = data.url;
              return;
            } else if (data.sessionId) {
              // sessionIdが返された場合�EStripe.jsでリダイレクチE              const stripe = (window as any).Stripe(stripeKey);
              await stripe.redirectToCheckout({ sessionId: data.sessionId });
              return;
            }
          }
        } catch (error) {
          logError(error, { action: 'handlePurchase', step: 'stripeCheckout' });
          // Stripe決済に失敗した場合�E、モチE��処琁E��フォールバック
        }
      }

      // Stripe決済が利用できなぁE��合、また�E失敗した場合�EモチE��処琁E      if (import.meta.env.DEV) {
        alert(t('gift.purchaseSuccess'));
      } else {
        alert('決済機�Eは現在準備中です。しばらくお征E��ください、E);
        return;
      }

      // ギフト購入とメチE��ージを保孁E      if (isSupabaseAvailable()) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const today = new Date();
          const monthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

          // giftsチE�Eブルに購入惁E��とメチE��ージを保孁E          // 注愁E giftsチE�Eブルにis_publicフィールドが存在しなぁE��合�E、messageフィールド�Eみ保孁E          const giftData: Partial<SupabaseGift> & {
            user_id: string;
            amount: number;
            month: string;
            payment_provider?: string;
            transaction_id?: string | null;
          } = {
            user_id: user.id,
            amount: purchaseAmount,
            month: monthStr,
            payment_provider: stripeKey ? 'stripe' : 'mock',
            transaction_id: stripeKey
              ? null
              : `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          };

          if (message.trim()) {
            giftData.message = message.trim();
            // is_publicフィールドが存在する場合�Eみ追加
            // チE�Eタベ�Eススキーマに応じて調整が忁E��E            giftData.is_public = isPublic;
          }

          await supabase.from('gifts').insert(giftData);
        }
      } else {
        // ローカルストレージに保存（開発用�E�E        if (message.trim()) {
          // ローカルストレージに保存（開発用�E�E          const messages = JSON.parse(localStorage.getItem('primal_logic_gift_messages') || '[]');
          messages.push({
            id: Date.now().toString(),
            message: message.trim(),
            isPublic,
            createdAt: new Date().toISOString(),
            userId: 'local',
          });
          localStorage.setItem('primal_logic_gift_messages', JSON.stringify(messages));
        }

        setMessage('');
        loadMessages();
      }

      // ギフトチE�Eタを�E読み込み
      loadGiftData();
    } catch (error) {
      logError(error, { action: 'handlePurchase', amount: purchaseAmount });
      const errorMessage = getUserFriendlyErrorMessage(error);
      alert(`${t('common.error')}: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gift-screen-container">
      <div className="gift-screen-content">
        <div className="screen-header">
          <button className="back-button" onClick={onBack} aria-label={t('common.back')}>
            ↁE          </button>
          <h1 className="screen-header-title">{t('gift.title')}</h1>
        </div>

        <div className="gift-screen-section">
          <h2 className="gift-screen-subtitle">{t('gift.subtitle')}</h2>
          <p className="gift-screen-description">{t('gift.description')}</p>

          {giftData && (
            <div className="gift-status-card">
              <h3 className="gift-status-title">{t('gift.currentStatus')}</h3>
              <div className="gift-status-item">
                <span className="gift-status-label">{t('gift.totalAmount')}</span>
                <span className="gift-status-value">¥{giftData.totalAmount.toLocaleString()}</span>
              </div>
              <div className="gift-status-item">
                <span className="gift-status-label">{t('gift.newUsers')}</span>
                <span className="gift-status-value">
                  {giftData.newUserCount}
                  {t('gift.people')}
                </span>
              </div>
              <div className="gift-status-item">
                <span className="gift-status-label">{t('gift.discountPerUser')}</span>
                <span className="gift-status-value">
                  {t('gift.currency')}
                  {giftData.discountPerUser.toLocaleString()}
                  {t('gift.perPerson')}
                </span>
              </div>
            </div>
          )}

          {/* Gift購入方式選抁E*/}
          <div className="gift-purchase-mode-section">
            <div className="gift-mode-toggle">
              <button
                className={`gift-mode-button ${giftMode === 'amount' ? 'active' : ''}`}
                onClick={() => setGiftMode('amount')}
              >
                {t('gift.modeAmount')}
              </button>
              <button
                className={`gift-mode-button ${giftMode === 'people' ? 'active' : ''}`}
                onClick={() => setGiftMode('people')}
              >
                {t('gift.modePeople')}
              </button>
            </div>

            {giftMode === 'people' ? (
              <div className="gift-people-input-section">
                <label className="gift-people-label">{t('gift.peopleLabel')}</label>
                <input
                  type="number"
                  className="gift-people-input"
                  value={giftPeopleCount}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0.1;
                    setGiftPeopleCount(Math.max(0.1, value));
                  }}
                  min="0.1"
                  step="0.1"
                />
                <p className="gift-people-hint">
                  {t('gift.peopleHint')} {giftPeopleCount.toFixed(1)}
                  {t('gift.amountPeopleEquivalent')} = {t('gift.currency')}
                  {Math.round(giftPeopleCount * MONTHLY_PRICE).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="gift-amount-input-section">
                <label className="gift-amount-label">{t('gift.amountLabel')}</label>
                <input
                  type="number"
                  className="gift-amount-input"
                  value={giftAmount || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? 0 : parseInt(e.target.value) || 0;
                    setGiftAmount(value);
                  }}
                  onBlur={(e) => {
                    // フォーカスが外れた時に0の場合�E最小値に設宁E                    if (giftAmount === 0 || giftAmount < 1) {
                      setGiftAmount(1350);
                    }
                  }}
                  min="1"
                  step="1"
                  placeholder="1350"
                />
                <p className="gift-amount-hint">
                  {t('gift.amountHint')}
                  {giftAmount > 0 && (
                    <span className="gift-amount-people-equivalent">
                      �E�紁E{(giftAmount / MONTHLY_PRICE).toFixed(1)}
                      {t('gift.amountPeopleEquivalent')}�E�E                    </span>
                  )}
                </p>
              </div>
            )}

            <div className="gift-purchase-summary">
              <p className="gift-purchase-amount">
                {t('gift.total')}: {t('gift.currency')}
                {calculatePurchaseAmount().toLocaleString()}
              </p>
            </div>
          </div>

          <div className="gift-message-section">
            <label className="gift-message-label">{t('gift.messageLabel')}</label>
            <textarea
              className="gift-message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('gift.messagePlaceholder')}
              maxLength={200}
              rows={4}
            />
            <div className="gift-message-privacy">
              <label className="gift-message-privacy-label">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <span>
                  {t('gift.messagePrivacy')}:{' '}
                  {isPublic ? t('gift.messagePublic') : t('gift.messagePrivate')}
                </span>
              </label>
            </div>
          </div>

          <button
            className="gift-purchase-button"
            onClick={handlePurchase}
            disabled={isLoading || calculatePurchaseAmount() <= 0}
          >
            {isLoading
              ? t('common.loading')
              : `${t('gift.currency')}${calculatePurchaseAmount().toLocaleString()} ${t('gift.sendGift')}`}
          </button>

          <p className="gift-purchase-note">{t('gift.purchaseNote')}</p>

          <button
            className="gift-view-messages-button"
            onClick={() => setShowMessages(!showMessages)}
          >
            {t('gift.viewPastMessages')}
          </button>

          {showMessages && (
            <div className="gift-messages-modal">
              <div className="gift-messages-header">
                <h2>{t('gift.viewPastMessages')}</h2>
                <button
                  className="gift-messages-close-button-header"
                  onClick={() => setShowMessages(false)}
                  aria-label={t('common.close')}
                >
                  ÁE                </button>
              </div>
              <div className="gift-messages-content">
                <h3>{t('gift.myMessages')}</h3>
                {t('gift.myMessagesDescription') && (
                  <p className="gift-messages-description">{t('gift.myMessagesDescription')}</p>
                )}
                {myMessages.length === 0 ? (
                  <p>{t('gift.noMessages')}</p>
                ) : (
                  <div className="gift-messages-list">
                    {myMessages.map((msg) => (
                      <div key={msg.id} className="gift-message-item">
                        <p>{msg.message}</p>
                        <div className="gift-message-actions">
                          <button
                            className={`gift-message-like-button ${msg.userLiked ? 'liked' : ''}`}
                            onClick={async () => {
                              const updatedMessages = myMessages.map((m) =>
                                m.id === msg.id
                                  ? {
                                      ...m,
                                      likes: (m.likes || 0) + (m.userLiked ? -1 : 1),
                                      userLiked: !m.userLiked,
                                    }
                                  : m
                              );
                              setMyMessages(updatedMessages);
                            }}
                          >
                            {msg.userLiked ? '❤�E�E : '🤁E} {msg.likes || 0}
                          </button>
                          <button
                            className="gift-message-reply-button"
                            onClick={() => {
                              setReplyingTo(msg.id);
                              setReplyText('');
                            }}
                          >
                            💬 {t('gift.reply')}{' '}
                            {msg.replies && msg.replies.length > 0 && `(${msg.replies.length})`}
                          </button>
                        </div>
                        {msg.replies && msg.replies.length > 0 && (
                          <div className="gift-message-replies">
                            {msg.replies.map((reply) => (
                              <div key={reply.id} className="gift-reply-item">
                                <p>{reply.replyText}</p>
                                <span className="gift-reply-meta">
                                  {new Date(reply.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {replyingTo === msg.id && (
                          <div className="gift-reply-input">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={t('gift.replyPlaceholder')}
                              rows={2}
                            />
                            <div className="gift-reply-actions">
                              <button
                                onClick={async () => {
                                  const newReply: GiftReply = {
                                    id: Date.now().toString(),
                                    messageId: msg.id,
                                    userId: 'current-user',
                                    replyText: replyText.trim(),
                                    createdAt: new Date().toISOString(),
                                  };
                                  const updatedMessages = myMessages.map((m) =>
                                    m.id === msg.id
                                      ? { ...m, replies: [...(m.replies || []), newReply] }
                                      : m
                                  );
                                  setMyMessages(updatedMessages);
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                disabled={!replyText.trim()}
                              >
                                {t('common.send')}
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                              >
                                {t('common.cancel')}
                              </button>
                            </div>
                          </div>
                        )}
                        <span className="gift-message-meta">
                          {msg.isPublic ? t('gift.messagePublic') : t('gift.messagePrivate')} •{' '}
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <h3 style={{ marginTop: '2rem' }}>{t('gift.communityMessages')}</h3>
                {t('gift.communityMessagesDescription') && (
                  <p className="gift-messages-description">
                    {t('gift.communityMessagesDescription')}
                  </p>
                )}
                {publicMessages.length === 0 ? (
                  <p>{t('gift.noMessages')}</p>
                ) : (
                  <div className="gift-messages-list">
                    {publicMessages.map((msg) => (
                      <div key={msg.id} className="gift-message-item">
                        <p>{msg.message}</p>
                        <div className="gift-message-actions">
                          <button
                            className={`gift-message-like-button ${msg.userLiked ? 'liked' : ''}`}
                            onClick={async () => {
                              // ぁE��ね機�Eを実裁E                              if (!isSupabaseAvailable()) {
                                alert('ぁE��ね機�Eはログインが忁E��でぁE);
                                return;
                              }

                              const {
                                data: { user },
                              } = await supabase.auth.getUser();
                              if (!user) {
                                alert('ログインが忁E��でぁE);
                                return;
                              }

                              try {
                                if (msg.userLiked) {
                                  // ぁE��ねを削除
                                  await supabase
                                    .from('gift_likes')
                                    .delete()
                                    .eq('gift_id', msg.id)
                                    .eq('user_id', user.id);
                                } else {
                                  // ぁE��ねを追加
                                  await supabase.from('gift_likes').insert({
                                    gift_id: msg.id,
                                    user_id: user.id,
                                  });
                                }

                                // メチE��ージ一覧を�E読み込み
                                loadMessages();
                              } catch (error) {
                                logError(error, { action: 'handleLike', messageId: msg.id });
                                alert('ぁE��ねの処琁E��失敗しました');
                              }
                            }}
                          >
                            {msg.userLiked ? '❤�E�E : '🤁E} {msg.likes || 0}
                          </button>
                          <button
                            className="gift-message-reply-button"
                            onClick={() => {
                              setReplyingTo(msg.id);
                              setReplyText('');
                            }}
                          >
                            💬 {t('gift.reply')}{' '}
                            {msg.replies && msg.replies.length > 0 && `(${msg.replies.length})`}
                          </button>
                        </div>
                        {msg.replies && msg.replies.length > 0 && (
                          <div className="gift-message-replies">
                            {msg.replies.map((reply) => (
                              <div key={reply.id} className="gift-reply-item">
                                <p>{reply.replyText}</p>
                                <span className="gift-reply-meta">
                                  {new Date(reply.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {replyingTo === msg.id && (
                          <div className="gift-reply-input">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={t('gift.replyPlaceholder')}
                              rows={2}
                            />
                            <div className="gift-reply-actions">
                              <button
                                onClick={async () => {
                                  // 返信を保孁E                                  const {
                                    data: { user },
                                  } = await supabase.auth.getUser();
                                  if (!user) {
                                    alert('ログインが忁E��でぁE);
                                    return;
                                  }

                                  try {
                                    await supabase.from('gift_replies').insert({
                                      message_id: msg.id,
                                      user_id: user.id,
                                      reply_text: replyText.trim(),
                                    });

                                    // メチE��ージ一覧を�E読み込み
                                    loadMessages();
                                    setReplyingTo(null);
                                    setReplyText('');
                                  } catch (error) {
                                    logError(error, { action: 'handleReply', messageId: msg.id });
                                    alert('返信の保存に失敗しました');
                                  }

                                  return; // 処琁E��亁E                                  const updatedMessages = publicMessages.map((m) =>
                                    m.id === msg.id
                                      ? { ...m, replies: [...(m.replies || []), newReply] }
                                      : m
                                  );
                                  setPublicMessages(updatedMessages);
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                disabled={!replyText.trim()}
                              >
                                {t('common.send')}
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                              >
                                {t('common.cancel')}
                              </button>
                            </div>
                          </div>
                        )}
                        <span className="gift-message-meta">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

