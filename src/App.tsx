import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import MemberSafe from './pages/MemberSafe';
import BossSafe from './pages/BossSafe';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import OfficeMoney from './pages/OfficeMoney';
import { NotificationProvider } from './contexts/NotificationContext';
import { AdminProvider } from './contexts/AdminContext';

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/member-safe" element={<MemberSafe />} />
          <Route path="/boss-safe" element={<BossSafe />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/office-money" element={<OfficeMoney />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AdminProvider>
  );
}