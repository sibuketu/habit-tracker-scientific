import { useState, useEffect, useRef } from 'react';
import {
  getNotificationPermission,
  getUnreadNotificationCount,
  getNotificationHistory,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  type NotificationItem,
} from '../utils/notificationManager';
import { useTranslation } from '../utils/i18n';

interface NotificationDropdownProps {
  onNavigateToSettings?: () => void;
}

export default function NotificationDropdown({ onNavigateToSettings }: NotificationDropdownProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<'granted' | 'denied' | 'default'>('default');
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationHistory, setNotificationHistory] = useState<NotificationItem[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNotificationStatus = () => {
      try {
        setLoadError(null);
        setNotificationPermission(getNotificationPermission());
        setUnreadCount(getUnreadNotificationCount());
        setNotificationHistory(getNotificationHistory());
      } catch (error) {
        console.error('Failed to load notification status:', error);
        setLoadError(t('home.notificationLoadError') || 'Failed to load notifications. Please try again.');
      }
    };

    loadNotificationStatus();

    window.addEventListener('notificationsUpdated', loadNotificationStatus);

    return () => {
      window.removeEventListener('notificationsUpdated', loadNotificationStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setNotificationHistory((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
      );
    }
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    setUnreadCount(0);
    setNotificationHistory((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
    setNotificationHistory((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => {
      const deleted = notificationHistory.find((n) => n.id === id);
      return deleted && !deleted.read ? Math.max(0, prev - 1) : prev;
    });
  };

  const handleRequestPermission = async () => {
    const { requestNotificationPermission } = await import('../utils/defrostReminder');
    const permission = await requestNotificationPermission();
    if (permission) {
      setNotificationPermission('granted');
      localStorage.setItem('settings_notification_enabled', JSON.stringify(true));
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* ベルアイコン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          padding: '0.5rem',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          color: '#a1a1aa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#a1a1aa';
        }}
        title={t('home.notifications')}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: '700',
              minWidth: '18px',
              textAlign: 'center',
              transform: 'translate(25%, -25%)',
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '0.5rem',
            backgroundColor: '#18181b',
            border: '1px solid #27272a',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            width: '320px',
            maxHeight: '400px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          {/* ヘッダー */}
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid #27272a',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>
              {t('home.notifications')}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'transparent',
                  border: '1px solid #27272a',
                  borderRadius: '4px',
                  color: '#a1a1aa',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {t('home.markAllRead')}
              </button>
            )}
          </div>

          {/* 通知一覧 */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '300px',
            }}
          >
            {loadError ? (
              <div
                style={{
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  color: '#ef4444',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '0.5rem' }}>⚠️</div>
                <div style={{ fontSize: '14px', marginBottom: '1rem' }}>{loadError}</div>
                <button
                  onClick={() => {
                    setLoadError(null);
                    try {
                      setNotificationPermission(getNotificationPermission());
                      setUnreadCount(getUnreadNotificationCount());
                      setNotificationHistory(getNotificationHistory());
                    } catch (error) {
                      console.error('Failed to retry loading notification status:', error);
                      setLoadError(t('home.notificationLoadError') || 'Failed to load notifications. Please try again.');
                    }
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {t('common.retry') || 'Retry'}
                </button>
              </div>
            ) : notificationPermission !== 'granted' ? (
              <div
                style={{
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  color: '#a1a1aa',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '0.5rem' }}>🔔</div>
                <div style={{ fontSize: '14px', marginBottom: '1rem' }}>
                  {notificationPermission === 'denied'
                    ? t('home.notificationDeniedDesc')
                    : t('home.notificationDesc')}
                </div>
                {notificationPermission !== 'denied' && (
                  <button
                    onClick={handleRequestPermission}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {t('home.enableNotifications')}
                  </button>
                )}
                {notificationPermission === 'denied' && onNavigateToSettings && (
                  <button
                    onClick={onNavigateToSettings}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {t('home.openSettings')}
                  </button>
                )}
              </div>
            ) : notificationHistory.length === 0 ? (
              <div
                style={{
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  color: '#a1a1aa',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '0.5rem' }}>🔔</div>
                <div style={{ fontSize: '14px' }}>{t('home.noNotifications')}</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {notificationHistory.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: notification.read ? '#18181b' : '#1e3a5f',
                      borderBottom: '1px solid #27272a',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = notification.read ? '#27272a' : '#2a4a6f';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = notification.read ? '#18181b' : '#1e3a5f';
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: notification.read ? '400' : '600',
                            color: '#ffffff',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {notification.title}
                        </div>
                        {notification.body && (
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#a1a1aa',
                              marginBottom: '0.25rem',
                            }}
                          >
                            {notification.body}
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#6b7280',
                          }}
                        >
                          {new Date(notification.timestamp).toLocaleString('ja-JP', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        style={{
                          padding: '0.25rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#6b7280',
                          cursor: 'pointer',
                          fontSize: '16px',
                        }}
                        title={t('common.delete')}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
