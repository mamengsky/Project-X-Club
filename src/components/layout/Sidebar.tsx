import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Download, 
  DollarSign, 
  ShoppingCart,
  Vault,
  Users,
  Shield,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { MenuItem } from '../../types';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useAdmin } from '../../contexts/AdminContext';

const getMenuItems = (isAdmin: boolean): MenuItem[] => {
  const baseItems = [
    { title: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
    { title: 'Deposit Item', icon: 'Upload', path: '/deposit' },
    { title: 'Withdraw Item', icon: 'Download', path: '/withdraw' },
    { title: 'Sales', icon: 'DollarSign', path: '/sales' },
    { title: 'Purchases', icon: 'ShoppingCart', path: '/purchases' },
    { title: 'Member Safe', icon: 'Vault', path: '/member-safe' },
  ];

  const adminItems = [
    { title: 'Members', icon: 'Users', path: '/members' },
    { title: "Boss's Safe", icon: 'Shield', path: '/boss-safe' },
    { title: 'Office Money', icon: 'Building2', path: '/office-money' },
  ];

  return isAdmin ? [...baseItems, ...adminItems] : baseItems;
};

const iconComponents: { [key: string]: React.ComponentType } = {
  LayoutDashboard,
  Upload,
  Download,
  DollarSign,
  ShoppingCart,
  Vault,
  Users,
  Shield,
  Building2,
};

export default function Sidebar() {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAdmin();

  const menuItems = getMenuItems(isAdmin);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarClasses = `
    fixed left-0 top-0 h-screen bg-gray-900 text-white p-4 border-r border-purple-900/20
    transition-all duration-300 z-50
    ${isMobile ? (isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full') : 'w-64'}
  `;

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-900 rounded-lg text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      <div className={sidebarClasses}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            X CLUB
          </h1>
          <p className="text-xs text-gray-400 mt-1">Exclusive • Mysterious • Elite</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = iconComponents[item.icon];
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-900/20 text-purple-400'
                    : 'hover:bg-purple-900/10 text-gray-400 hover:text-purple-400'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}