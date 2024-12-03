import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function Layout() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className={`flex-1 p-4 sm:p-6 lg:p-8 ${isMobile ? '' : 'ml-64'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}