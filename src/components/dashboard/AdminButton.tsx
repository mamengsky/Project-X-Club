import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import AdminPanel from './AdminPanel';
import { useAdmin } from '../../contexts/AdminContext';

export default function AdminButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAdmin();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Shield className="w-5 h-5" />
        <span>{isAdmin ? 'Admin Panel' : 'Login as Admin'}</span>
      </button>

      <AdminPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}