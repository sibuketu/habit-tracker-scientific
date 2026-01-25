/**
 * Notification Manager
 */

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  type?: 'info' | 'warning' | 'success' | 'error';
}

const STORAGE_KEY = 'carnivos_notifications';

const getStoredNotifications = (): NotificationItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveNotifications = (notifications: NotificationItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  // Dispatch event for UI updates
  window.dispatchEvent(new Event('notificationsUpdated'));
};

export function getNotificationPermission(): 'granted' | 'denied' | 'default' {
  if (!('Notification' in window)) return 'denied';
  return Notification.permission;
}

export function getUnreadNotificationCount(): number {
  return getStoredNotifications().filter(n => !n.read).length;
}

export function getNotificationHistory(): NotificationItem[] {
  return getStoredNotifications().sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function markNotificationAsRead(id: string) {
  const notifications = getStoredNotifications();
  const updated = notifications.map(n =>
    n.id === id ? { ...n, read: true } : n
  );
  saveNotifications(updated);
}

export function markAllNotificationsAsRead() {
  const notifications = getStoredNotifications();
  const updated = notifications.map(n => ({ ...n, read: true }));
  saveNotifications(updated);
}

export function deleteNotification(id: string) {
  const notifications = getStoredNotifications();
  const updated = notifications.filter(n => n.id !== id);
  saveNotifications(updated);
}

export async function sendLocalNotification(title: string, body: string, type: NotificationItem['type'] = 'info') {
  // 1. Add to local history
  const newNotification: NotificationItem = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title,
    body,
    timestamp: new Date().toISOString(),
    read: false,
    type
  };

  const notifications = getStoredNotifications();
  saveNotifications([newNotification, ...notifications]);

  // 2. Send actual browser notification if permitted
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, { body });
    }
  }
}

export function scheduleNotification(title: string, body: string, delayMs: number) {
  setTimeout(() => {
    sendLocalNotification(title, body);
  }, delayMs);
}
