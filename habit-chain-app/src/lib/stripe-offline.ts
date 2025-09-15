// オフライン対応のStripeモック
export const mockStripe = {
  redirectToCheckout: async (options: any) => {
    console.log('Mock Stripe Checkout:', options);
    
    // モック決済処理
    return new Promise((resolve) => {
      setTimeout(() => {
        // 成功をシミュレート
        alert('決済が完了しました！（モック）\n実際の決済ではStripe Checkoutにリダイレクトされます。');
        resolve({ error: null });
      }, 1000);
    });
  }
};

export const loadStripeOffline = async (publishableKey?: string) => {
  // オフライン時はモックを返す
  console.log('Loading Stripe in offline mode (mock)');
  return mockStripe;
};

// 決済セッション作成のモック
export const createMockCheckoutSession = async (data: any) => {
  console.log('Creating mock checkout session:', data);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `mock_session_${Date.now()}`,
        url: 'mock://checkout'
      });
    }, 500);
  });
};

// 顧客ポータルのモック
export const createMockPortalSession = async () => {
  console.log('Creating mock portal session');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: 'mock://portal'
      });
    }, 500);
  });
};

