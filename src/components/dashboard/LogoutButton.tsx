import React from 'react';
import { LogOut } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useNotificationContext } from '../../contexts/NotificationContext';

export default function LogoutButton() {
  const { isAdmin, logout } = useAdmin();
  const { showNotification } = useNotificationContext();

  if (!isAdmin) return null;

  const handleLogout = () => {
    logout();
    showNotification('success', 'Successfully logged out');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  );
}