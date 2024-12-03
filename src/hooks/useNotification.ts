import { useState, useCallback } from 'react';

interface NotificationState {
  type: 'success' | 'error';
  message: string;
  isVisible: boolean;
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationState>({
    type: 'success',
    message: '',
    isVisible: false,
  });

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({
      type,
      message,
      isVisible: true,
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
}