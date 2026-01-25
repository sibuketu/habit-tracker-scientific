/**
 * CarnivoreOS - Error Handling Utility
 *
 * Unified error handling and user-friendly error messages
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Log error to console (and potentially external service)
 */
export function logError(error: any, context?: Record<string, any>) {
  // In development, log to console
  console.error('App Error:', error);
  if (context) {
    console.error('Context:', context);
  }

  // In production, this would send to Sentry/LogRocket etc.
}

/**
 * Get user friendly error message based on error type
 */
export function getUserFriendlyErrorMessage(error: any): string {
  if (typeof error === 'string') return error;

  if (error instanceof AppError) {
    return error.message;
  }

  // Common error patterns
  const msg = error?.message || '';

  if (msg.includes('Network Error') || msg.includes('Failed to fetch')) {
    return 'ネットワーク接続を確認してください';
  }

  if (msg.includes('401') || msg.includes('Unauthorized')) {
    return '認証が必要です。再度ログインしてください。';
  }

  if (msg.includes('403') || msg.includes('Forbidden')) {
    return 'アクセス権限がありません';
  }

  if (msg.includes('429')) {
    return 'リクエスト過多です。しばらく待ってから再試行してください';
  }

  return '予期せぬエラーが発生しました';
}
